import { Component, OnInit, OnDestroy } from '@angular/core';
import { SharingService } from '../../services/sharing.service';
import {TranslateService} from '@ngx-translate/core';
import { NgxSmartModalService } from 'ngx-smart-modal';
import {RestApiService} from '../../services/rest-api.service';
import {Settings} from '../../settings';
import {FormControl, FormGroup, FormBuilder, Validators} from '@angular/forms';
import { TaskGroup, UserTask, User } from '../../models/mainObjects.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edition-view',
  templateUrl: './edition-view.component.html',
  styleUrls: ['./edition-view.component.css']
})
export class EditionViewComponent implements OnInit, OnDestroy {

  public taskGroupSelected: TaskGroup;
  public taskGroupList: TaskGroup[];
  public updatedTask: UserTask;
  public userTaskForm: FormGroup;
  public name: FormControl;
  public deadline: FormControl;
  public status: FormControl;

  public validationErrorName: boolean;
  public validationErrorStatus: boolean;

  public users: User[];

  private subscription: Subscription;

  constructor(
    private sharingService: SharingService,
    private restApiService: RestApiService,
    private translate: TranslateService,
    private formBuilder: FormBuilder,
    private ngxSmartModalService: NgxSmartModalService
  )
  {
    this.name = new FormControl('', Validators.required);
    this.deadline = new FormControl('');
    this.status = new FormControl({value: 'New', disabled: true}, Validators.required);

    this.userTaskForm = formBuilder.group({
      name: this.name,
      deadline: this.deadline,
      status: this.status
    });
  }

  ngOnInit() {
    const unassignedUser: User = {
      "id": 0,
      "firstName": "",
      "lastName": ""
    };
    
    // join unassigned user with users array
    this.users = [unassignedUser].concat(this.sharingService.getUsers());
    this.taskGroupList = new Array<any>();
    this.updatedTask = null;
    this.validationErrorName = false;
    this.validationErrorStatus = false;
    this.subscription = this.sharingService.getSelectedTaskGroup().subscribe((response) => {
      this.taskGroupSelected = response;
    });
  }

  // add new task to selected task group from the form and refresh view - REST API

  addTask() {
    if(this.taskGroupSelected) {
      if(this.isFormValid()) {
        this.taskGroupSelected.userTasks.push(this.userTaskForm.getRawValue());
        this.restApiService.addTask(Settings.URL + '/taskGroupList/' + this.taskGroupSelected.id, this.taskGroupSelected)
        .subscribe((response) => {
          this.taskGroupList.length = 0;
          this.restApiService.getTaskGroupList(Settings.URL + '/taskGroupList').subscribe((resp) => {
            resp.forEach((taskGr: TaskGroup, index) => {
              this.taskGroupList.push(taskGr);
            });
          });
        });
      }
    }
  }

  // accept selected task edit and refresh view - REST API

  acceptEditionHandler(taskToEdit) {
    this.restApiService.updateTask(Settings.URL + '/taskGroupList/' + this.taskGroupSelected.id, this.taskGroupSelected)
    .subscribe((response) => {
        this.taskGroupList.length = 0;
        this.restApiService.getTaskGroupList(Settings.URL + '/taskGroupList').subscribe((resp) => {
          resp.forEach((taskGr: TaskGroup, index) => {
            this.taskGroupList.push(taskGr);
          });
          this.updatedTask = taskToEdit.name;
          this.ngxSmartModalService.getModal("updateConfirmationModal").open();
        });
      });
  }

  // remove selected task and refresh view - REST API

  removeTaskHandler(taskToRemove) {
    const remainingTasks = this.taskGroupSelected.userTasks.filter((userTask) => {
      return userTask.name !== taskToRemove.name;
    });
    this.taskGroupSelected.userTasks.length = 0;
    this.taskGroupSelected.userTasks = [].concat(remainingTasks);
    this.restApiService.removeTask(Settings.URL + '/taskGroupList/' + this.taskGroupSelected.id,
      this.taskGroupSelected).subscribe((response) => {
        this.taskGroupList.length = 0;
        this.restApiService.getTaskGroupList(Settings.URL + '/taskGroupList').subscribe((resp) => {
          resp.forEach((taskGr: TaskGroup, index) => {
            this.taskGroupList.push(taskGr);
          });
        });
      });
  }

  // edit task group name and refresh view - REST API

  onTaskGroupNameChange(evt) {
    this.taskGroupSelected.name = evt.target.taskGroupName.value;
    this.sharingService.setSelectedTaskGroup(this.taskGroupSelected);
    this.restApiService.updateTaskGroup(Settings.URL + '/taskGroupList/' + this.taskGroupSelected.id, this.taskGroupSelected)
    .subscribe((response) => {
      this.taskGroupList.length = 0;
      this.restApiService.getTaskGroupList(Settings.URL + '/taskGroupList').subscribe((resp) => {
        resp.forEach((taskGr: TaskGroup, index) => {
          this.taskGroupList.push(taskGr);
        });
        this.ngxSmartModalService.getModal("updateGroupConfirmationModal").open();
      });
    });
  }

  // That request would be used if json-server supported query parameters for DELETE method

  // removeTaskHandler(taskToRemove) {
  //   this.restApiService.removeTask(
  //     Settings.URL + '/taskGroupList?id=' +
  //     this.taskGroupSelected.name + "&userTasks.name=" + taskToRemove.name
  //   ).subscribe((response) => {
  //     this.restApiService.getTaskGroupList(Settings.URL + '/taskGroupList').subscribe((resp) => {
  //     });
  //   });
  // }

  // check if form is valid

  isFormValid() {
    if(this.userTaskForm.getRawValue()["name"] === "") {
      this.validationErrorName = true;
    }
    else{
      this.validationErrorName = false;
    }
    if(this.userTaskForm.getRawValue()["status"] === "") {
      this.validationErrorStatus = true;
    }
    else {
      this.validationErrorStatus = false;
    }
    if(this.validationErrorName || this.validationErrorStatus) {
      return false;
    }
    else {
      return true;
    }
  }

  goBack() {
    this.sharingService.route("/");
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
