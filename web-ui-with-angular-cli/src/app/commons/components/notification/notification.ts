import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { NotificationsStore } from '../../stores/notifications-store';
import { Notification } from '../../models/notification';
import { SessionStore } from '../../stores/session-store';
import { IConnectionOptions, ISignalRConnection, SignalR, SignalRConfiguration, SignalRConnection } from 'ng2-signalr';
import { SignalRModule, BroadcastEventListener } from 'ng2-signalr';
import { Subscription } from 'rxjs/Subscription';
import * as moment from 'moment';
import * as _ from 'underscore';
import { PushNotification } from '../../models/push-notification';
import { PushNotificationAdapter } from '../../services/adapters/push-notification-adapter';
import { PushNotificationService } from '../../services/push-notification-service';

@Component({
    selector: 'notification',
    templateUrl: './notification.html',
    styleUrls: ['./notifications.scss']
})

export class NotificationComponent implements OnInit {
    messages: PushNotification[] = [];

    constructor(
        public notificationsStore: NotificationsStore,
        private _sessionStore: SessionStore,
        private _signalR: SignalR,
        private _route: ActivatedRoute,
        private _pushNotificationService: PushNotificationService
    ) {
    }

    ngOnInit() {
        let accessToken;
        if (this._sessionStore.session.accessToken) {
            accessToken = this._sessionStore.session.accessToken.replace('bearer ', '');
        } else {
            accessToken = window.localStorage.getItem('access_token');
        }
        if(accessToken) {
            this.loadNotifictionHub(accessToken);
        }
        // let storedAccessToken: any = window.localStorage.getItem('token');
        // let accessToken = storedAccessToken.replace(/"/g, "");
        // $.connection.hub.qs = { 'access_token': accessToken, 'application_name': 'Midas' };
        // $.connection.hub.url = 'http://caserver:7011/signalr';
        // $.connection.hub.logging = true;
        // var notificationHub = $.connection.hub.proxies['notificationhub'];
        // notificationHub.client.refreshNotification = function (data: PushNotification[]) {
        //     this.messages = _.map(data, (currData: any) => {
        //         return PushNotificationAdapter.parseResponse(currData);
        //     });
        //     _.forEach(this.messages, (currMessage: PushNotification) => {
        //             let notification = new Notification({
        //                 'messages': currMessage.message,
        //                 'type': 'SUCCESS',
        //                 'createdAt': moment(currMessage.notificationTime)
        //             });
        //             this.notificationsStore.addNotification(notification);
        //         })
        // }
        // $.connection.hub.start().done(function () {
        //     console.log('Notification hub started');
        // });
        // window.onbeforeunload = function (e) {
        //     $.connection.hub.stop();
        // };
    }

    loadNotifictionHub(accessToken) {
        this._pushNotificationService.loadNotifictionHub(accessToken)
            .subscribe((data: PushNotification[]) => {
                let notifications: PushNotification[] = data;
                _.forEach(notifications, (currMessage: PushNotification) => {
                    if (currMessage.isRead == true) {
                        let notification = new Notification({
                            'title': currMessage.message,
                            'type': 'SUCCESS',
                            'createdAt': moment(currMessage.notificationTime)
                        });
                        this.notificationsStore.addNotification(notification);
                    }
                })
            },
            error => {
            })
    }


    closeNotificaion() {
        this.notificationsStore.toggleVisibility();
    }
}