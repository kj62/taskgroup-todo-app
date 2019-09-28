import { Component, OnInit, OnDestroy } from '@angular/core';
import { SharingService } from '../../services/sharing.service';
import {TranslateService} from '@ngx-translate/core';
import { UserTask } from '../../models/UserTask.model';
import {FormControl, FormGroup, FormBuilder, Validators} from '@angular/forms';
import { TaskGroup } from '../../models/taskGroup.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edition-view',
  templateUrl: './edition-view.component.html',
  styleUrls: ['./edition-view.component.css']
})
export class EditionViewComponent implements OnInit, OnDestroy {

  public taskGroupSelected: any;
  public userTasks: UserTask[];
  public userTaskForm: FormGroup;
  public name: FormControl;
  public deadline: FormControl;
  public userId: FormControl;
  public status: FormControl;

  private subscription: Subscription;

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
      this.taskGroupSelected = this.sharingService.getSelectedTaskGroup();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
