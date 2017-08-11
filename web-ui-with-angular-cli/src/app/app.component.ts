import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { SessionStore } from './commons/stores/session-store';
import { NotificationsStore } from './commons/stores/notifications-store';
import { ProgressBarService } from './commons/services/progress-bar-service';
import { NotificationsService } from 'angular2-notifications';
// import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
// import { Keepalive } from '@ng-idle/keepalive';
import * as moment from 'moment';
import * as _ from 'underscore';
import { Notification } from './commons/models/notification';
import { PushNotification } from './commons/models/push-notification';
import { PushNotificationAdapter } from './commons/services/adapters/push-notification-adapter';
import { PushNotificationService } from './commons/services/push-notification-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  dateNow;
  options = {
    timeOut: 5000,
    showProgressBar: false,
    pauseOnHover: false,
    clickToClose: false
  };
  // idleState = 'Not started.';
  // timedOut = false;
  // lastPing?: Date = null;

  constructor(
    private _router: Router,
    public sessionStore: SessionStore,
    public notificationsStore: NotificationsStore,
    private _notificationsService: NotificationsService,
    private _pushNotificationService: PushNotificationService,
    public progressBarService: ProgressBarService,
    private cdRef: ChangeDetectorRef
    // private idle: Idle,
    // private keepalive: Keepalive

  ) {


    //   idle.setIdle(5);

    //   idle.setTimeout(5);

    //   idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

    //   idle.onIdleEnd.subscribe(() => this.idleState = 'No longer idle.');
    //   idle.onTimeout.subscribe(() => {
    //     this.idleState = 'Timed out!';
    //     this.timedOut = true;
    //     this.sessionStore.logout();
    //     this._router.navigate(['/account/login']);
    //   });
    //   idle.onIdleStart.subscribe(() => this.idleState = 'You\'ve gone idle!');
    //   idle.onTimeoutWarning.subscribe((countdown) => this.idleState = 'You will time out in ' + countdown + ' seconds!');

    //   // sets the ping interval to 15 seconds
    //   keepalive.interval(15);

    //   keepalive.onPing.subscribe(() => this.lastPing = new Date());

    //   this.reset();
    // }

    // reset() {
    //   this.idle.watch();
    //   this.idleState = 'Started.';
    //   this.timedOut = false;
  }

  ngOnInit() {

    this.sessionStore.authenticate().subscribe(
      (response) => {
        // let storedAccessToken: any = window.localStorage.getItem('token');
        // let accessToken = storedAccessToken.replace(/"/g, "");
        // let storedAccessToken: any = this.sessionStore.session.accessToken;
        // let accessToken = storedAccessToken.replace('bearer ', '');
        // // this.loadNotifictionHub(accessToken);
        // this._pushNotificationService.loadNotifictionHub(accessToken)
        //   .subscribe((data: PushNotification[]) => {
        //     let notifications: PushNotification[] = data;
        //     _.forEach(notifications, (currMessage: PushNotification) => {
        //       if (currMessage.isRead == true) {
        //         let notification = new Notification({
        //           'title': currMessage.message,
        //           'type': 'SUCCESS',
        //           'createdAt': moment(currMessage.notificationTime)
        //         });
        //         this.notificationsStore.addNotification(notification);
        //       }
        //     })
        //   },
        //   error => {
        //   })
      },
      error => {
        // this._router.navigate(['/account/login']);
      }
    );
    // this._specialityStore.getSpecialities();
    // this._statesStore.getStates();
  }

  // To remove Expression changed error
  ngAfterViewChecked() {
    // console.log( "! Expression has been changed !" );
    this.dateNow = new Date();
    this.cdRef.detectChanges();
  }

  // loadNotifictionHub(accessToken) {
  //       $.connection.hub.qs = { 'access_token': accessToken, 'application_name': 'Midas' };
  //       $.connection.hub.url = 'http://caserver:7011/signalr';
  //       $.connection.hub.logging = true;
  //       var notificationHub = $.connection.hub.proxies['notificationhub'];
  //       notificationHub.client.refreshNotification = function (data: PushNotification[]) {
  //         this.messages = _.map(data, (currData: any) => {
  //           return PushNotificationAdapter.parseResponse(currData);
  //         });
  //         _.forEach(this.messages, (currMessage: PushNotification) => {
  //           if (currMessage.isRead == true) {
  //             let notification = new Notification({
  //               'title': currMessage.message,
  //               'type': 'SUCCESS',
  //               'createdAt': moment(currMessage.notificationTime)
  //             });
  //             NotificationsStore.prototype.addNotification(notification);
  //           }
  //         })
  //       }
  //       $.connection.hub.start().done(function () {
  //         console.log('Notification hub started');
  //       });
  // }
}
