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
import { PushNotificationStore } from '../../stores/push-notification-store';

@Component({
    selector: 'notification',
    templateUrl: './notification.html',
    styleUrls: ['./notifications.scss']
})

export class NotificationComponent implements OnInit {

    constructor(
        public notificationsStore: NotificationsStore,
        private _sessionStore: SessionStore,
        private _signalR: SignalR,
        private _route: ActivatedRoute,
        private _pushNotificationStore: PushNotificationStore
    ) {
    }

    ngOnInit() {
    }


    closeNotificaion() {
        this.notificationsStore.toggleVisibility();
    }
}