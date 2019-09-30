import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TaskGroup, User } from '../models/mainObjects.model';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharingService {
  private selectedTaskGroup: BehaviorSubject<TaskGroup>;
  private users: User[];

  constructor(
    private router: Router
  ) {
    this.selectedTaskGroup = new BehaviorSubject<TaskGroup>(null);
    this.users = [
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
