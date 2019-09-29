import { Component, OnInit, OnDestroy } from '@angular/core';
import { SharingService } from '../../services/sharing.service';
import {TranslateService} from '@ngx-translate/core';
import { NgxSmartModalService } from 'ngx-smart-modal';
import {RestApiService} from '../../services/rest-api.service';
import {Settings} from '../../settings';
import {FormControl, FormGroup, FormBuilder, Validators} from '@angular/forms';
import { TaskGroup, UserTask } from '../../models/mainObjects.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edition-view',
  templateUrl: './edition-view.component.html',
  styleUrls: ['./edition-view.component.css']
})
export class EditionViewComponent implements OnInit, OnDestroy {

  public taskGroupSelected: any;
  public taskGroupList: any;
  public updatedTask: string;
  public userTaskForm: FormGroup;
  public name: FormControl;
  public deadline: FormControl;
  public userId: FormControl;
  public status: FormControl;

  public validationErrorName: boolean;
  public validationErrorStatus: boolean;

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
    this.userId = new FormControl('');
    this.status = new FormControl({value: 'New', disabled: true}, Validators.required);

    this.userTaskForm = formBuilder.group({
      name: this.name,
      deadline: this.deadline,
      userId: this.userId,
      status: this.status
    });
  }

  ngOnInit() {
      this.taskGroupList = new Array<any>();
      this.updatedTask = "";
      this.validationErrorName = false;
      this.validationErrorStatus = false;
      this.subscription = this.sharingService.getSelectedTaskGroup().subscribe((response) => {
        this.taskGroupSelected = response;
      });
  }

  addTask() {
    if(this.taskGroupSelected) {
      if(this.isFormValid()) {
        this.taskGroupSelected.userTasks.push(this.userTaskForm.getRawValue());
        this.restApiService.addTask(Settings.URL + '/taskGroupList/' + this.taskGroupSelected.name, this.taskGroupSelected)
        .subscribe((response) => {
          this.taskGroupList.length = 0;
          this.restApiService.getTaskGroupList(Settings.URL + '/taskGroupList').subscribe((resp) => {
            resp.forEach((taskGr, index) => {
              this.taskGroupList.push(taskGr);
            });
          });
        });
      }
    }
  }

  acceptEditionHandler(taskToEdit) {
    this.restApiService.updateTask(Settings.URL + '/taskGroupList/' + this.taskGroupSelected.name,
      this.taskGroupSelected).subscribe((response) => {
        this.taskGroupList.length = 0;
        this.restApiService.getTaskGroupList(Settings.URL + '/taskGroupList').subscribe((resp) => {
          resp.forEach((taskGr, index) => {
            this.taskGroupList.push(taskGr);
          });
          this.updatedTask = taskToEdit.name;
          this.ngxSmartModalService.getModal("updateConfirmationModal").open();
        });
      });
  }

  removeTaskHandler(taskToRemove) {
    const remainingTasks = this.taskGroupSelected.userTasks.filter((userTask) => {
      return userTask.name !== taskToRemove.name;
    });
    this.taskGroupSelected.userTasks.length = 0;
    this.taskGroupSelected.userTasks = [].concat(remainingTasks);
    this.restApiService.removeTask(Settings.URL + '/taskGroupList/' + this.taskGroupSelected.name,
      this.taskGroupSelected).subscribe((response) => {
        this.taskGroupList.length = 0;
        this.restApiService.getTaskGroupList(Settings.URL + '/taskGroupList').subscribe((resp) => {
          resp.forEach((taskGr, index) => {
            this.taskGroupList.push(taskGr);
          });
        });
      });
  }

  onTaskGroupNameChange(evt) {
    this.taskGroupSelected.name = evt.target.taskGroupName.value;
    this.sharingService.setSelectedTaskGroup(this.taskGroupSelected);
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
