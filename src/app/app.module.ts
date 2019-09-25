import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainViewComponent } from './main-view/main-view.component';
import { EditionViewComponent } from './components/edition-view/edition-view.component';

@NgModule({
  declarations: [
    AppComponent,
    MainViewComponent,
    EditionViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
