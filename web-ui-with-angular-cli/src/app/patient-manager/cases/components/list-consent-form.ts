import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LazyLoadEvent } from 'primeng/primeng'
import { AddConsentStore } from '../stores/add-consent-form-store';
import { AddConsent } from '../models/add-consent-form';
import { NotificationsStore } from '../../../commons/stores/notifications-store';
import { Notification } from '../../../commons/models/notification';
import * as moment from 'moment';
import { ProgressBarService } from '../../../commons/services/progress-bar-service';
import { NotificationsService } from 'angular2-notifications';
import { ErrorMessageFormatter } from '../../../commons/utils/ErrorMessageFormatter';
import { ListConsentStore } from '../../cases/stores/list-consent-form-store';
import { ListConsent } from '../../cases/models/list-consent-form';
import {ConfirmDialogModule,ConfirmationService} from 'primeng/primeng';
import { SessionStore } from '../../../commons/stores/session-store';

@Component({
    selector: 'list-consent-list',
    templateUrl: './list-consent-form.html'
})

export class ConsentListComponent implements OnInit {
    selectedConsentList: ListConsent[] = [];
    ListConsent: ListConsent[];
    caseId: number;
    datasource: ListConsent[];
    totalRecords: number;
    isDeleteProgress: boolean = false;
    companyId: number;
    constructor(
        private _router: Router,
        public _route: ActivatedRoute,
        private _ListConsentStore: ListConsentStore,
        private _notificationsStore: NotificationsStore,
        private _progressBarService: ProgressBarService,
        private _notificationsService: NotificationsService,
        private confirmationService: ConfirmationService,
         private _sessionStore: SessionStore,
    ) {
        this._route.parent.parent.params.subscribe((routeParams: any) => {
            this.caseId = parseInt(routeParams.caseId, 10);
            this.companyId = this._sessionStore.session.currentCompany.id;
        });
    }

    ngOnInit() {
        this.loadConsentForm();
    }

    loadConsentForm() {

        this._progressBarService.show();
        this._ListConsentStore.getConsetForm(this.caseId,this.companyId)
            .subscribe(ListConsent => {
                this.ListConsent = ListConsent.reverse();
                // this.datasource = referringOffices.reverse();
                // this.totalRecords = this.datasource.length;
                // this.referringOffices = this.datasource.slice(0, 10);
            },
            (error) => {
                this._progressBarService.hide();
            },
            () => {
                this._progressBarService.hide();
            });
    }
    loadConsentFormLazy(event: LazyLoadEvent) {
        setTimeout(() => {
            if (this.datasource) {
                this.ListConsent = this.datasource.slice(event.first, (event.first + event.rows));
            }
        }, 250);
    }

    deleteConsentForm() {
        if (this.selectedConsentList.length > 0) {
            this.confirmationService.confirm({
            message: 'Do you want to delete this record?',
            header: 'Delete Confirmation',
            icon: 'fa fa-trash',
            accept: () => {
            this.selectedConsentList.forEach(currentCase => {
                this.isDeleteProgress = true;
                this._progressBarService.show();
                this._ListConsentStore.deleteConsetForm(currentCase)
                    .subscribe(
                    (response) => {
                        let notification = new Notification({
                            'title': 'record deleted successfully!',
                            'type': 'SUCCESS',
                            'createdAt': moment()

                        });
                        this.loadConsentForm();
                        this._notificationsStore.addNotification(notification);
                        this.selectedConsentList = [];
                    },
                    (error) => {
                        let errString = 'Unable to delete record';
                        let notification = new Notification({
                            'messages': ErrorMessageFormatter.getErrorMessages(error, errString),
                            'type': 'ERROR',
                            'createdAt': moment()
                        });
                        this.selectedConsentList = [];
                        this._progressBarService.hide();
                        this.isDeleteProgress = false;
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
                'title': 'select record to delete',
                'type': 'ERROR',
                'createdAt': moment()
            });
            this._notificationsStore.addNotification(notification);
            this._notificationsService.error('Oh No!', 'select record to delete');
        }


    }

    DownloadPdf() {

        //window.open('http://midas.codearray.tk/midasapi/fileupload/download/86/0', '_blank', '');
        // window.location.assign('http://midas.codearray.tk/midasapi/fileupload/download/86/0');
        this._progressBarService.show();
        // window.location.assign(this._url + '/fileupload/download/' + this.caseId + '/' + 0);

        this._ListConsentStore.DownloadConsentForm(this.caseId)
            .subscribe(document => {
                // this.document = document

            },
            (error) => {
                this._progressBarService.hide();
            },
            () => {
                this._progressBarService.hide();
            });
    }
}