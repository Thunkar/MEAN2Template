import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AlertModule } from 'ngx-bootstrap';
import { NgsRevealModule } from 'ng2-scrollreveal';
import { ScrollSpyModule } from 'ng2-scrollspy';
import { Ng2PageScrollModule } from 'ng2-page-scroll';
import { AgmCoreModule } from 'angular2-google-maps/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { LandingComponent } from './landing/landing.component';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    LandingComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    NgsRevealModule.forRoot(), 
    ScrollSpyModule.forRoot(),
    Ng2PageScrollModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'yourapikey'
    }),
    AlertModule.forRoot()
  ],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }],
  bootstrap: [AppComponent]
})
export class AppModule { }
