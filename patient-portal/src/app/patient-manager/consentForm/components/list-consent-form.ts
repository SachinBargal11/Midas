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

@Component({
    selector: 'list-consent-list',
    templateUrl: './list-consent-form.html'
})

export class ConsentListComponent implements OnInit {
    selectedConsentList: AddConsent[] = [];
    AddConsent: AddConsent[];
    caseId: number;
    datasource: AddConsent[];
    totalRecords: number;

    constructor(
        private _router: Router,
        public _route: ActivatedRoute,
        private _AddConsentStore: AddConsentStore,
        private _notificationsStore: NotificationsStore,
        private _progressBarService: ProgressBarService,
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
        // this._progressBarService.show();
        // this._referringOfficeStore.getReferringOffices(this.caseId)
        //     .subscribe(referringOffices => {
        //         this.referringOffices = referringOffices.reverse();
        //         // this.datasource = referringOffices.reverse();
        //         // this.totalRecords = this.datasource.length;
        //         // this.referringOffices = this.datasource.slice(0, 10);
        //     },
        //     (error) => {
        //         this._progressBarService.hide();
        //     },
        //     () => {
        //         this._progressBarService.hide();
        //     });
    }
    loadConsentFormLazy(event: LazyLoadEvent) {
        setTimeout(() => {
            if (this.datasource) {
                this.AddConsent = this.datasource.slice(event.first, (event.first + event.rows));
            }
        }, 250);
    }

    deleteConsentForm() {


    }

}