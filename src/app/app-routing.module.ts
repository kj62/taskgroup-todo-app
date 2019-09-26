import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MainViewComponent } from './components/main-view/main-view.component';
import { EditionViewComponent } from './components/edition-view/edition-view.component';

const routes: Routes = [
  { path: '', component: MainViewComponent },
  { path: 'edition', component: EditionViewComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(
      routes
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
