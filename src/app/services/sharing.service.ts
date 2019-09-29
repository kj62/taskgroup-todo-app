import { Injectable } from '@angular/core';
import { TaskGroup } from '../models/taskGroup.model';
import { EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { UserTask } from '../models/UserTask.model';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharingService {
  private taskGroupList: BehaviorSubject<TaskGroup[]>;
  private taskGroup: BehaviorSubject<TaskGroup>;
  private selectedTaskGroup: BehaviorSubject<TaskGroup>;
  private userTask: BehaviorSubject<UserTask>;

  constructor(
    private router: Router
  ) {
    this.taskGroupList = new BehaviorSubject<TaskGroup[]>(null);
    this.taskGroup = new BehaviorSubject<TaskGroup>(null);
    this.selectedTaskGroup = new BehaviorSubject<TaskGroup>(null);
    this.userTask = new BehaviorSubject<UserTask>(null);
  }

  route(path) {
    this.router.navigate([path]);
  }

  getSelectedTaskGroup(): Observable<any> {
    return this.selectedTaskGroup.asObservable();
  }

  setSelectedTaskGroup(taskGroup) {
    this.selectedTaskGroup.next(taskGroup);
  }
}
