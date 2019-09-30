import { Injectable } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { UserTask, TaskGroup, User } from '../models/mainObjects.model';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharingService {
  private taskGroupList: BehaviorSubject<TaskGroup[]>;
  private taskGroup: BehaviorSubject<TaskGroup>;
  private selectedTaskGroup: BehaviorSubject<TaskGroup>;
  private userTask: BehaviorSubject<UserTask>;
  private users: User[] = [
    {
        "id": 1,
        "firstName": "Krystian",
        "lastName": "Nowak"
    },
    {
        "id": 2,
        "firstName": "Maciej",
        "lastName": "Kowalski"
    },
    {
        "id": 3,
        "firstName": "Zbigniew",
        "lastName": "Czajka"
    }
  ];

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

  getUsers(): Array<User> {
    return this.users;
  }

  getSelectedTaskGroup(): Observable<any> {
    return this.selectedTaskGroup.asObservable();
  }

  setSelectedTaskGroup(taskGroup) {
    this.selectedTaskGroup.next(taskGroup);
  }
}
