import {Component, OnInit} from '@angular/core';
import {NotificationsStore} from '../../stores/notifications-store';
import Moment from 'moment';
import {TimeAgoPipe} from '../../pipes/time-ago-pipe';
import {ReversePipe} from '../../pipes/reverse-array-pipe';
import $ from 'jquery';

@Component({
    selector: 'notification',
    templateUrl: 'templates/elements/notification.html',
    pipes: [TimeAgoPipe, ReversePipe]
})

export class NotificationComponent implements OnInit {

    constructor(
        private _notificationsStore: NotificationsStore
    ) {
        console.log(this._notificationsStore.notifications);

    }

    ngOnInit() {

    }

    
}