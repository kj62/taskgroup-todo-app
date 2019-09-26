import { Injectable } from '@angular/core';
import { TaskGroup } from '../models/taskGroup.model';
import { EventEmitter } from '@angular/core';
import { UserTask } from '../models/UserTask.model';

@Injectable({
  providedIn: 'root'
})
export class SharingService {
  private _taskGroupList: TaskGroup[];
  private _taskGroup: TaskGroup;
  private _userTask: UserTask;

  private taskGroupListChanged: EventEmitter<Array<TaskGroup>>;
  private taskGroupChanged: EventEmitter<TaskGroup>;
  private userTaskChanged: EventEmitter<UserTask>;

  constructor() {
    this.taskGroupListChanged = new EventEmitter();
    this.taskGroupChanged = new EventEmitter();
    this.userTaskChanged = new EventEmitter();
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
}
