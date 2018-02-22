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
import { PushNotificationStore } from '../../commons/stores/push-notification-store';
import { PushNotification } from '../../commons/models/push-notification';
import { PushNotificationEvent } from '../../commons/models/push-notification-event';
import { SelectItem } from 'primeng/primeng';

@Component({
    selector: 'notification-subscription',
    templateUrl: './notification-subscription.html'
})

export class NotificationSubscriptionComponent implements OnInit {

    allGroupEvents: SelectItem[] = [];
    selectedGroupEvents: SelectItem[] = [];

    constructor(
        private _notificationsStore: NotificationsStore,
        public sessionStore: SessionStore,
        private _router: Router,
        private _fb: FormBuilder,
        private _progressBarService: ProgressBarService,
        private _notificationsService: NotificationsService,
        private _pushNotificationStore: PushNotificationStore,
        private _elRef: ElementRef

    ) {
    }

    ngOnInit() {
        this.loadAllGroupEvents();
        this.loadSavedSubscriptions();
    }

    loadAllGroupEvents() {
        this._pushNotificationStore.getAllGroupEvents()
            .subscribe((groupEvents: PushNotificationEvent[]) => {
                // this.allGroupEvents = groupEvents;
                this.allGroupEvents = _.map(groupEvents, (currentGroupEvent: PushNotificationEvent) => {
                    return {
                        label: `${currentGroupEvent.eventName}`,
                        value: currentGroupEvent.id
                    };
                });
            })
    }
    loadSavedSubscriptions() {
        this._pushNotificationStore.getSavedSubscriptionsByUsername(this.sessionStore.session.user.userName)
            .subscribe((groupEvents: PushNotificationEvent[]) => {
                // this.selectedGroupEvents = groupEvents;
                this.selectedGroupEvents = _.map(groupEvents, (currentGroupEvent: PushNotificationEvent) => {
                    return {
                        label: `${currentGroupEvent.eventName}`,
                        value: currentGroupEvent.id
                    };
                });
            })
    }

    subscribeNotificationEvents() {
        let result;
        let eventIds: number[] = [];
        if (this.selectedGroupEvents.length > 0) {
            eventIds = _.map(this.selectedGroupEvents, (currSelectedGroupEvent: any) => {
                return currSelectedGroupEvent.value;
            })
        }
        this._progressBarService.show();
        result = this._pushNotificationStore.subscribeEvents(eventIds);
        result.subscribe(
            (response) => {
                let notification = new Notification({
                    'title': 'Notification settings saved successfully!',
                    'type': 'SUCCESS',
                    'createdAt': moment()
                });
                this._notificationsStore.addNotification(notification);
                this._notificationsService.success('Success!', 'Notification settings saved successfully!');
                // this._router.navigate(['/dashboard']);
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
