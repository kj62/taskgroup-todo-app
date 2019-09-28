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
  public selectedTaskGroup: TaskGroup;
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
    this.selectedTaskGroup = new TaskGroup();
    this.userTasks = new Array<UserTask>();
    this.selectedTaskGroupIndex = undefined;

    this.initView();
  }

  initView() {
    this.restApiService.getTaskGroupList(Settings.URL + '/taskGroupList').subscribe((response) => {
      response.forEach((taskGr) => {
        this.taskGroupList.push(taskGr);
      });
      console.log("Subs: " + JSON.stringify(response));
    });
  }

  removeTaskGroupClickHandler(taskGroup: TaskGroup) {
    this.ngxSmartModalService.getModal("removalConfirmationModal").open();
  }

  editTaskGroupClickHandler(taskGroup: TaskGroup) {
    this.sharingService.setSelectedTaskGroup(taskGroup);
    this.sharingService.route("edition");
  }

  createTaskGroupClickHandler() {
    this.sharingService.route("edition");
  }

  removeSelectedTaskGroupConfirmHandler(selectedTaskGroup) {
    console.log("TGSelected: " + selectedTaskGroup);
    this.restApiService.removeTaskGroup(Settings.URL + '/taskGroupList/' + selectedTaskGroup).subscribe((response) => {
      this.restApiService.getTaskGroupList(Settings.URL + '/taskGroupList').subscribe((response) => {
        // this.taskGroupList = response;
        console.log("Subs: " + JSON.stringify(response));
        this.ngxSmartModalService.getModal("removalConfirmationModal").close();
      });
    });
  }

  closeModalHandler() {
    this.ngxSmartModalService.getModal("removalConfirmationModal").close();
  }

  selectRow(taskGroupSelectedIndex) {
    this.selectedTaskGroupIndex = taskGroupSelectedIndex;
  }

}
