import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LazyLoadEvent } from 'primeng/primeng'
import { AdjusterMasterStore } from '../../stores/adjuster-store';
import { Adjuster } from '../../models/adjuster';
import { NotificationsStore } from '../../../commons/stores/notifications-store';
import { Notification } from '../../../commons/models/notification';
import * as moment from 'moment';
import { ProgressBarService } from '../../../commons/services/progress-bar-service';
import { NotificationsService } from 'angular2-notifications';
import { ErrorMessageFormatter } from '../../../commons/utils/ErrorMessageFormatter';
import { SessionStore } from '../../../commons/stores/session-store';
import {ConfirmDialogModule,ConfirmationService} from 'primeng/primeng';


@Component({
    selector: 'adjuster-master-list',
    templateUrl: './adjuster-master-list.html'
})

export class AdjusterMasterListComponent implements OnInit {
    selectedAdjusters: Adjuster[] = [];
    adjusters: Adjuster[];
    datasource: Adjuster[];
    totalRecords: number;
    companyId: number;
    patientId: number;
    isDeleteProgress: boolean = false;

    constructor(
        private _router: Router,
        public _route: ActivatedRoute,
        private _adjusterMasterStore: AdjusterMasterStore,
        private _notificationsStore: NotificationsStore,
        private _progressBarService: ProgressBarService,
        private _notificationsService: NotificationsService,
        private _sessionStore: SessionStore,
        private confirmationService: ConfirmationService,
    ) {

        this._sessionStore.userCompanyChangeEvent.subscribe(() => {
            this.loadAdjuster();
        });


        this._route.parent.parent.params.subscribe((routeParams: any) => {
            this.patientId = parseInt(routeParams.patientId, 10);
        });
    }

    ngOnInit() {
        this.loadAdjuster();
    }

    loadAdjuster() {
        this._progressBarService.show();
        this._adjusterMasterStore.getAdjusterMasters()
            .subscribe(adjusters => {
                this.adjusters = adjusters.reverse();
                // this.datasource = adjusters.reverse();
                // this.totalRecords = this.datasource.length;
                // this.adjusters = this.datasource.slice(0, 10);
            },
            (error) => {
                this._progressBarService.hide();
            },
            () => {
                this._progressBarService.hide();
            });
    }

    loadAdjustersLazy(event: LazyLoadEvent) {
        setTimeout(() => {
            if (this.datasource) {
                this.adjusters = this.datasource.slice(event.first, (event.first + event.rows));
            }
        }, 250);
    }

    deleteAdjusterMaster() {
        if (this.selectedAdjusters.length > 0) {
            this.confirmationService.confirm({
            message: 'Do you want to delete this record?',
            header: 'Delete Confirmation',
            icon: 'fa fa-trash',
            accept: () => {

            this.selectedAdjusters.forEach(CurrentAdjuster => {
                this.isDeleteProgress = true;
                this._progressBarService.show();
                let result;
                result = this._adjusterMasterStore.deleteAdjuster(CurrentAdjuster);
                result.subscribe(
                    (response) => {

                        let notification = new Notification(
                            {
                                'title': 'Adjuster deleted successfully!',
                                'type': 'SUCCESS',
                                'createdAt': moment()
                            });
                        this.loadAdjuster();
                        this._notificationsStore.addNotification(notification);
                        this.selectedAdjusters = [];
                        // this._notificationsService.error('','Adjuster deleted successfully!');

                    },
                    (error) => {
                        let errString = 'Unable to delete Adjuster';
                        let notification = new Notification({
                            'messages': ErrorMessageFormatter.getErrorMessages(error, errString),
                            'type': 'ERROR',
                            'createdAt': moment()
                        });
                        this.selectedAdjusters = [];
                        this._progressBarService.hide();
                        this._notificationsStore.addNotification(notification);
                        this._notificationsService.error('Oh No!', ErrorMessageFormatter.getErrorMessages(error, errString));
                    },
                    () => {
                        this.isDeleteProgress = false;
                        this._progressBarService.hide();
                    });
            });
            }
            });
        } else {
            let notification = new Notification({
                'title': 'select Adjuster to delete',
                'type': 'ERROR',
                'createdAt': moment()
            });
            this._notificationsStore.addNotification(notification);
            this._notificationsService.error('Oh No!', 'select adjuster to delete');
        }
    }

}