import { Component, OnInit } from '@angular/core';
import { SharingService } from '../../services/sharing.service';
import {TranslateService} from '@ngx-translate/core';
import { UserTask } from '../../models/UserTask.model';
import {FormControl, FormGroup, FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-edition-view',
  templateUrl: './edition-view.component.html',
  styleUrls: ['./edition-view.component.css']
})
export class EditionViewComponent implements OnInit {

  public userTasks: UserTask[];
  public userTaskForm: FormGroup;
  public name: FormControl;
  public deadline: FormControl;
  public userId: FormControl;
  public status: FormControl;
 
  constructor(
    private sharingService: SharingService,
    private translate: TranslateService,
    private formBuilder: FormBuilder
  )
  {
    this.name = new FormControl('');
    this.deadline = new FormControl('');
    this.userId = new FormControl('');
    this.status = new FormControl('');

    this.userTaskForm = formBuilder.group({
      name: this.name,
      deadline: this.deadline,
      userId: this.userId,
      status: this.status
    });
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

}
