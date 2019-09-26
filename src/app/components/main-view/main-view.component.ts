import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TaskGroup } from '../../models/taskGroup.model';
import { SharingService } from '../../services/sharing.service';
import { TranslateService } from '@ngx-translate/core';
import { ViewChild } from '@angular/core';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { UserTask } from '../../models/UserTask.model';

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.css']
})
export class MainViewComponent implements OnInit {

  public taskGroupList: TaskGroup[];
  public taskGroup: TaskGroup;
  public userTasks: UserTask[];
  private subscriptionTaskGroupListChanged: any;
  private subscriptionTaskGroupChanged: any;

  constructor(
    private sharingService: SharingService,
    private translate: TranslateService,
    private router: Router,
    private ngxSmartModalService: NgxSmartModalService
  )
  {
  }

  ngOnInit() {
    this.userTasks = [
      {
        "name": "task1",
        "deadline": new Date(),
        "userId": "asadafafasf",
        "status": "New"
      },
      {
        "name": "task2",
        "deadline": new Date(),
        "userId": "fasf",
        "status": "New"
      }
    ];
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
    // TODO remove selected taskgroup
    this.ngxSmartModalService.getModal("removalConfirmationModal").close();
  }

  closeModalHandler() {
    this.ngxSmartModalService.getModal("removalConfirmationModal").close();
  }

}
