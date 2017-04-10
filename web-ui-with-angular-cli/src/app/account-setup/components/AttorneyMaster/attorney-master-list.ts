import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LazyLoadEvent } from 'primeng/primeng'
import { AttorneyMasterStore } from '../../stores/attorney-store';
import { Attorney } from '../../models/attorney';
import { NotificationsStore } from '../../../commons/stores/notifications-store';
import { Notification } from '../../../commons/models/notification';
import * as moment from 'moment';
import { ProgressBarService } from '../../../commons/services/progress-bar-service';
import { NotificationsService } from 'angular2-notifications';
import { ErrorMessageFormatter } from '../../../commons/utils/ErrorMessageFormatter';
import { SessionStore } from '../../../commons/stores/session-store';

@Component({
    selector: 'attorney-master-list',
    templateUrl: './attorney-master-list.html'
})

export class AttorneyMasterListComponent implements OnInit {
    selectedAttorneys: Attorney[] = [];
    attorneys: Attorney[];
    datasource: Attorney[];
    totalRecords: number;
    companyId: number;
    patientId: number;
    isDeleteProgress: boolean = false;

    constructor(
        private _router: Router,
        public _route: ActivatedRoute,
        private _attorneyMasterStore: AttorneyMasterStore,
        private _notificationsStore: NotificationsStore,
        private _progressBarService: ProgressBarService,
        private _notificationsService: NotificationsService,
        private _sessionStore: SessionStore
    ) {

        this._sessionStore.userCompanyChangeEvent.subscribe(() => {
            this.loadAttorney();
        });

    }

    ngOnInit() {
        this.loadAttorney();
    }

    loadAttorney() {
        this._progressBarService.show();
        this._attorneyMasterStore.getAttorneyMasters()
            .subscribe(attorneys => {
                this.attorneys = attorneys.reverse();
                // this.datasource = attorneys.reverse();
                // this.totalRecords = this.datasource.length;
                // this.attorneys = this.datasource.slice(0, 10);
            },
            (error) => {
                this._progressBarService.hide();
            },
            () => {
                this._progressBarService.hide();
            });
    }

    loadAttorneysLazy(event: LazyLoadEvent) {
        setTimeout(() => {
            if (this.datasource) {
                this.attorneys = this.datasource.slice(event.first, (event.first + event.rows));
            }
        }, 250);
    }

    deleteAttorneys() {
        if (this.selectedAttorneys.length > 0) {
            this.selectedAttorneys.forEach(currentAttorney => {
                this.isDeleteProgress = true;
                this._progressBarService.show();
                let result;
                result = this._attorneyMasterStore.deleteAttorney(currentAttorney);
                result.subscribe(
                    (response) => {
                        let notification = new Notification({
                            'title': 'Attorney deleted successfully!',
                            'type': 'SUCCESS',
                            'createdAt': moment()
                        });
                        this.loadAttorney();
                        this._notificationsStore.addNotification(notification);
                        this.selectedAttorneys = [];
                    },
                    (error) => {
                        let errString = 'Unable to delete Attorney';
                        let notification = new Notification({
                            'messages': ErrorMessageFormatter.getErrorMessages(error, errString),
                            'type': 'ERROR',
                            'createdAt': moment()
                        });
                        this.selectedAttorneys = [];
                        this._progressBarService.hide();
                        this._notificationsStore.addNotification(notification);
                        this._notificationsService.error('Oh No!', ErrorMessageFormatter.getErrorMessages(error, errString));
                    },
                    () => {
                        this._progressBarService.hide();
                        this.isDeleteProgress = false;
                    });
            });
        } else {
            let notification = new Notification({
                'title': 'select attorney to delete',
                'type': 'ERROR',
                'createdAt': moment()
            });
            this._notificationsStore.addNotification(notification);
            this._notificationsService.error('Oh No!', 'select attorney to delete');
        }

    }

}