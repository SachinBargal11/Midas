import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LazyLoadEvent } from 'primeng/primeng'
import { AddDocConsentStore } from '../stores/add-consent-form-store';
import { AddConsent } from '../models/add-consent-form';
import { NotificationsStore } from '../../../commons/stores/notifications-store';
import { Notification } from '../../../commons/models/notification';
import * as moment from 'moment';
import { ProgressBarService } from '../../../commons/services/progress-bar-service';
import { NotificationsService } from 'angular2-notifications';
import { ErrorMessageFormatter } from '../../../commons/utils/ErrorMessageFormatter';
import { ListDocConsentStore } from '../../consentForm/stores/list-consent-form-store';
import { ListConsent } from '../../consentForm/models/list-consent-form';



@Component({
    selector: 'list-consent-list',
    templateUrl: './list-consent-form.html'
})

export class ConsentDocListComponent implements OnInit {
    selectedConsentList: ListConsent[] = [];
    ListConsent: ListConsent[];
    caseId: number;
    datasource: ListConsent[];
    totalRecords: number;

    constructor(
        private _router: Router,
        public _route: ActivatedRoute,
        private _ListConsentStore: ListDocConsentStore,
       public notificationsStore: NotificationsStore,
        public progressBarService: ProgressBarService,
        private _notificationsService: NotificationsService
    ) {
        this._route.parent.parent.params.subscribe((routeParams: any) => {
            this.caseId = parseInt(routeParams.caseId, 10);
        });
    }

    ngOnInit() {
        this.loadConsentForm();
    }

    loadConsentForm() {
       
        this.progressBarService.show();
        this._ListConsentStore.getConsetForm(0)//this.caseId
            .subscribe(ListConsent => {
                this.ListConsent = ListConsent.reverse();
                // this.datasource = referringOffices.reverse();
                // this.totalRecords = this.datasource.length;
                // this.referringOffices = this.datasource.slice(0, 10);
            },
            (error) => {
                this.progressBarService.hide();
            },
            () => {
                this.progressBarService.hide();
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
            this.selectedConsentList.forEach(currentCase => {
                this.progressBarService.show();
                this._ListConsentStore.deleteConsetForm(currentCase)
                    .subscribe(
                    (response) => {
                        let notification = new Notification({
                            'title': 'record deleted successfully!',
                            'type': 'SUCCESS',
                            'createdAt': moment()

                        });
                        this.loadConsentForm();
                        this.notificationsStore.addNotification(notification);
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
                        this.progressBarService.hide();
                        this.notificationsStore.addNotification(notification);
                        this._notificationsService.error('Oh No!', ErrorMessageFormatter.getErrorMessages(error, errString));
                    },
                    () => {
                        this.progressBarService.hide();
                    });
            });
        } else {
            let notification = new Notification({
                'title': 'select record to delete',
                'type': 'ERROR',
                'createdAt': moment()
            });
            this.notificationsStore.addNotification(notification);
            this._notificationsService.error('Oh No!', 'select record to delete');
        }


    }

     DownloadPdf() {  

        
        this.progressBarService.show();
        this._ListConsentStore.DownloadConsentForm(this.caseId)
            .subscribe(document => {
                // this.document = document
            },
            (error) => {
                this.progressBarService.hide();
            },
            () => {
                this.progressBarService.hide();
            });
    }
}