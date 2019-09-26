import { Component, OnInit } from '@angular/core';
import { SharingService } from '../../services/sharing.service';
import {TranslateService} from '@ngx-translate/core';
import { UserTask } from '../../models/UserTask.model';

@Component({
  selector: 'app-edition-view',
  templateUrl: './edition-view.component.html',
  styleUrls: ['./edition-view.component.css']
})
export class EditionViewComponent implements OnInit {

  public userTasks: UserTask[];

  constructor(
    private sharingService: SharingService,
    private translate: TranslateService
  )
  {
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
