import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HttpModule, Http } from '@angular/http';

import { ConfigService, configServiceFactory } from './config-service';

import { AppRoutingModule } from './app.routes';
import { AppComponent } from './app.component';
import { NoContentComponent } from './no-content-component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NoContentComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: configServiceFactory,
      deps: [ConfigService],
      multi: true
    },
    ConfigService,
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
