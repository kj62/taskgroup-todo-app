import { Injectable } from '@angular/core';
import { TaskGroup } from '../models/taskGroup.model';

@Injectable({
  providedIn: 'root'
})
export class SharingService {
  taskGroupList: TaskGroup[];

  constructor() { }
}
