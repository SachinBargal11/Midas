import { Component, OnInit, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SessionStore } from '../../commons/stores/session-store';
import { NotificationsStore } from '../../commons/stores/notifications-store';
import * as _ from 'underscore';
import * as moment from 'moment';
import { DialogModule } from 'primeng/primeng';
import { FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';
import { ProgressBarService } from '../../commons/services/progress-bar-service';
import { Notification } from '../../commons/models/notification';
import { NotificationsService } from 'angular2-notifications';
import { ErrorMessageFormatter } from '../../commons/utils/ErrorMessageFormatter';
import { PushNotificationService } from '../../commons/services/push-notification-service';
import { SelectItem } from 'primeng/primeng';

@Component({
    selector: 'notification-subscription',
    templateUrl: './notification-subscription.html'
})

export class NotificationSubscriptionComponent implements OnInit {

    allGroupEvents: SelectItem[] = [];
    selectedGroupEvents: any[] = [];

    constructor(
        private _notificationsStore: NotificationsStore,
        public sessionStore: SessionStore,
        private _router: Router,
        private _fb: FormBuilder,
        private _progressBarService: ProgressBarService,
        private _notificationsService: NotificationsService,
        private _pushNotificationService: PushNotificationService,
        private _elRef: ElementRef

    ) {
    }

    ngOnInit() {
        this.loadAllGroupEvents();
    }

    loadAllGroupEvents() {
        this._pushNotificationService.getAllGroupEvents()
            .subscribe((groupEvents) => {
                this.allGroupEvents = groupEvents;
            })
    }

    subscribeNotificationEvents() {
        let result;
        let eventIds: number[] = [];
        if (this.selectedGroupEvents.length > 0) {
            eventIds = _.map(this.selectedGroupEvents, (currSelectedGroupEvent: any) => {
                return currSelectedGroupEvent.EventID;
            })
        }
        this._progressBarService.show();
        result = this._pushNotificationService.subscribeEvents(eventIds);
        result.subscribe(
            (response) => {
                let notification = new Notification({
                    'title': 'Notification settings saved successfully!',
                    'type': 'SUCCESS',
                    'createdAt': moment()
                });
                this._notificationsStore.addNotification(notification);
                this._router.navigate(['/dashboard']);
            },
            (error) => {
                let errString = 'Unable to save notification settings.';
                let notification = new Notification({
                    'messages': ErrorMessageFormatter.getErrorMessages(error, errString),
                    'type': 'ERROR',
                    'createdAt': moment()
                });
                this._notificationsStore.addNotification(notification);
                this._notificationsService.error('Oh No!', ErrorMessageFormatter.getErrorMessages(error, errString));
                this._progressBarService.hide();
            },
            () => {
                this._progressBarService.hide();
            });

    }
}
