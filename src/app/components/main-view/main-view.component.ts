import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TaskGroup } from '../../models/taskGroup.model';
import { SharingService } from '../../services/sharing.service';
import { RestApiService } from '../../services/rest-api.service';
import { TranslateService } from '@ngx-translate/core';
import { ViewChild } from '@angular/core';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { UserTask } from '../../models/UserTask.model';
import {Settings} from '../../settings';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.css']
})
export class MainViewComponent implements OnInit {

  public taskGroupList: TaskGroup[];
  public taskGroup: TaskGroup;
  public selectedTaskGroup: any;
  public selectedTaskGroupIndex: number;
  public userTasks: UserTask[];

  constructor(
    private sharingService: SharingService,
    private restApiService: RestApiService,
    private translate: TranslateService,
    private router: Router,
    private ngxSmartModalService: NgxSmartModalService
  )
  {
  }

  ngOnInit() {
    this.taskGroupList = new Array<any>();
    this.taskGroup = new TaskGroup();
    this.userTasks = new Array<UserTask>();
    this.selectedTaskGroupIndex = 0;
    this.initView();
  }

  initView() {
    this.restApiService.getTaskGroupList(Settings.URL + '/taskGroupList').subscribe((response) => {
      response.forEach((taskGr, index) => {
        if(index === 0) {
          this.selectedTaskGroup = taskGr;
        }
        this.taskGroupList.push(taskGr);
      });
    });
  }

  getTaskGroupListHandler() {
    this.taskGroupList.length = 0;
    this.restApiService.getTaskGroupList(Settings.URL + '/taskGroupList').subscribe((response) => {
      response.forEach((taskGr, index) => {
        if(index === 0) {
          this.selectedTaskGroup = taskGr;
        }
        this.taskGroupList.push(taskGr);
      });
    });
  }

  removeTaskGroupClickHandler(taskGroup: TaskGroup) {
    this.sharingService.setSelectedTaskGroup(taskGroup);
    this.ngxSmartModalService.getModal("removalConfirmationModal").open();
  }

  editTaskGroupClickHandler(taskGroup: TaskGroup) {
    this.sharingService.setSelectedTaskGroup(taskGroup);
    this.sharingService.route("edition");
  }

  createTaskGroupClickHandler() {
    let newTaskGroup = new TaskGroup();
    newTaskGroup = {
      "name": "newTaskGroup",
      "userTasks": []
    };
    newTaskGroup["id"] = newTaskGroup["name"];
    this.selectedTaskGroup = newTaskGroup;
    this.restApiService.createTaskGroup(Settings.URL + '/taskGroupList/', this.selectedTaskGroup).subscribe((resp) => {
      this.taskGroupList.length = 0;
      this.restApiService.getTaskGroupList(Settings.URL + '/taskGroupList').subscribe((response) => {
        response.forEach((taskGr, index) => {
          if(index === 0) {
            this.selectedTaskGroup = taskGr;
          }
          this.taskGroupList.push(taskGr);
        });
        this.sharingService.setSelectedTaskGroup(this.selectedTaskGroup);
        this.sharingService.route('edition');
      });
    })
    this.sharingService.setSelectedTaskGroup(this.selectedTaskGroup);
    this.sharingService.route("edition");
  }

  removeSelectedTaskGroupConfirmHandler(selectedTaskGroupName) {
    this.restApiService.removeTaskGroup(Settings.URL + '/taskGroupList/' + selectedTaskGroupName).subscribe((response) => {
      this.restApiService.getTaskGroupList(Settings.URL + '/taskGroupList').subscribe((resp) => {
        this.getTaskGroupListHandler();
        this.ngxSmartModalService.getModal("removalConfirmationModal").close();
      });
    });
  }

  closeModalHandler() {
    this.ngxSmartModalService.getModal("removalConfirmationModal").close();
  }

  selectRow(taskGroupSelectedIndex, taskGroupSelected) {
    this.selectedTaskGroupIndex = taskGroupSelectedIndex;
    this.selectedTaskGroup = taskGroupSelected;
  }

}
