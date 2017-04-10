import { Component, OnInit } from '@angular/core';
import { NotificationsStore } from '../../stores/notifications-store';

@Component({
    selector: 'notification',
    templateUrl: './notification.html',
    styleUrls: ['./notifications.scss']
})

export class NotificationComponent implements OnInit {

    constructor(
        public notificationsStore: NotificationsStore
    ) {

    }

    ngOnInit() {

    }
    closeNotificaion() {
        this.notificationsStore.toggleVisibility();
    }


}