import { Component, OnInit } from '@angular/core';
import { SharingService } from '../../services/sharing.service';

@Component({
  selector: 'app-edition-view',
  templateUrl: './edition-view.component.html',
  styleUrls: ['./edition-view.component.css']
})
export class EditionViewComponent implements OnInit {

  constructor(private sharingService: SharingService) { }

  ngOnInit() {
  }

}
