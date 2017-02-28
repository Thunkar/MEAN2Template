import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgsRevealModule } from 'ng2-scrollreveal';
import { ScrollSpyModule } from 'ng2-scrollspy';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { LandingComponent } from './landing/landing.component';
import { RouterModule } from '@angular/router';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { Ng2PageScrollModule } from 'ng2-page-scroll';
import { FormsModule } from '@angular/forms';
import { AgmCoreModule } from 'angular2-google-maps/core';

@NgModule({
  imports: [BrowserModule,FormsModule, NgsRevealModule.forRoot(), ScrollSpyModule.forRoot(),
    Ng2PageScrollModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'yourapikey'
    }),
    RouterModule.forRoot([
      { path: '', component: LandingComponent }
    ])],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }],
  declarations: [AppComponent, NavComponent, LandingComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
