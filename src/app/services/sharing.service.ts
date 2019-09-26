import { Injectable } from '@angular/core';
import { TaskGroup } from '../models/taskGroup.model';
import { EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { UserTask } from '../models/UserTask.model';

@Injectable({
  providedIn: 'root'
})
export class SharingService {
  private _taskGroupList: TaskGroup[];
  private _taskGroup: TaskGroup;
  private _selectedTaskGroup: TaskGroup;
  private _userTask: UserTask;
  private _routeStack: Array<any>;

  private taskGroupListChanged: EventEmitter<Array<TaskGroup>>;
  private taskGroupChanged: EventEmitter<TaskGroup>;
  private userTaskChanged: EventEmitter<UserTask>;

  constructor(
    private router: Router
  ) {
    this.taskGroupListChanged = new EventEmitter();
    this.taskGroupChanged = new EventEmitter();
    this.userTaskChanged = new EventEmitter();
    this._routeStack = [];
  }

  private setPreviousRoute(route: string) {
    const r = { path: route };
    this._routeStack.push(r);
  }

  private clearRouteStack() {
    this._routeStack.length = 0;
  }

  routeBack() {
    let { path } = this._routeStack.pop();
    if (!path) {
      path = '';
    }
    this.router.navigate([path]);
  }

  route(path) {
    this.setPreviousRoute(window.location.pathname);
    this.router.navigate([path]);
  }

  subscribeTaskGroupListChanged(callback) {
    return this.taskGroupListChanged.subscribe(callback);
  }

  subscribeTaskGroupChanged(callback) {
    return this.taskGroupChanged.subscribe(callback);
  }

  subscribeUserTaskChanged(callback) {
    return this.userTaskChanged.subscribe(callback);
  }

  getSelectedTaskGroup() {
    return this._selectedTaskGroup;
  }

  setSelectedTaskGroup(taskGroup) {
    this._selectedTaskGroup = taskGroup;
    this.taskGroupChanged.emit(taskGroup);
  }
}
