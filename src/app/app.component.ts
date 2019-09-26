import { Component } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import { SharingService } from './services/sharing.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(
    private translate: TranslateService,
    private sharingService: SharingService)
  {
    this.translate.setDefaultLang('en');
    this.translate.use('en');
  }
}
