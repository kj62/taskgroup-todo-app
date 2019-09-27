import { Injectable } from '@angular/core';
import { TaskGroup } from '../models/taskGroup.model';
import { EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { UserTask } from '../models/UserTask.model';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharingService {
  private taskGroupList: Subject<TaskGroup[]>;
  private taskGroup: Subject<TaskGroup>;
  private selectedTaskGroup: Subject<TaskGroup>;
  private userTask: Subject<UserTask>;
  private routeStack: Array<any>;

  constructor(
    private router: Router
  ) {
    this.taskGroupList = new Subject<TaskGroup[]>();
    this.taskGroup = new Subject<TaskGroup>();
    this.selectedTaskGroup = new Subject<TaskGroup>();
    this.userTask = new Subject<UserTask>();
    this.routeStack = [];
  }

  private setPreviousRoute(route: string) {
    const r = { path: route };
    this.routeStack.push(r);
  }

  private clearRouteStack() {
    this.routeStack.length = 0;
  }

  routeBack() {
    let { path } = this.routeStack.pop();
    if (!path) {
      path = '';
    }
    this.router.navigate([path]);
  }

  route(path) {
    this.setPreviousRoute(window.location.pathname);
    this.router.navigate([path]);
  }

  getSelectedTaskGroup() {
    return this.selectedTaskGroup;
  }

  setSelectedTaskGroup(taskGroup) {
    this.selectedTaskGroup = taskGroup;
  }
}
