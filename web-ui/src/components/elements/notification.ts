import {Component, OnInit} from '@angular/core';
import {NotificationsStore} from '../../stores/notifications-store';

@Component({
    selector: 'notification',
    templateUrl: 'templates/elements/notification.html'
})

export class NotificationComponent implements OnInit {

    constructor(
        private _notificationsStore: NotificationsStore
    ) {

    }

    ngOnInit() {

    }


}