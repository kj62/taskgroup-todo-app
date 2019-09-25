import { Component, OnInit } from '@angular/core';
import { SharingService } from '../../services/sharing.service';
import { TaskGroup } from '../../models/taskGroup.model';

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.css']
})
export class MainViewComponent implements OnInit {

  constructor(private sharingService: SharingService) { }

  ngOnInit() {
  }

  removeTaskGroupClickHandler(taskGroupElement: TaskGroup) {

  }

  editTaskGroupClickHandler(taskGroupElement: TaskGroup) {

  }

  createTaskGroupClickHandler() {

  }

  removeTaskConfirmation() {

  }

  removeTaskCancellation() {

  }

}
