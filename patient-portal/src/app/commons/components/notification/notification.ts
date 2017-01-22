import { Component, OnInit } from '@angular/core';
import { NotificationsStore } from '../../stores/notifications-store';

@Component({
    selector: 'notification',
    templateUrl: './notification.html'
})

export class NotificationComponent implements OnInit {

    constructor(
        private _notificationsStore: NotificationsStore
    ) {

    }

    ngOnInit() {

    }
    closeNotificaion() {
        this._notificationsStore.toggleVisibility();
    }


}