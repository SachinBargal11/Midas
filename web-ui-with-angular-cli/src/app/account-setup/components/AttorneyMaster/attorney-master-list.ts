import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
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
       attorney: Attorney[];
       companyId: number;
       patientId: number;

    constructor(
        private _router: Router,
        public  _route: ActivatedRoute,
        private _attorneyMasterStore: AttorneyMasterStore,
        private _notificationsStore: NotificationsStore,
        private _progressBarService: ProgressBarService,
        private _notificationsService: NotificationsService,
        private _sessionStore: SessionStore
    ) {
       
    }

    ngOnInit() {
        this.loadAttorney();
    }

    loadAttorney() {
        this._progressBarService.show();
        this._attorneyMasterStore.getAttorneyMasters()
            .subscribe(attorneys => {
                this.attorney = attorneys;
            },
            (error) => {
                this._progressBarService.hide();
            },
            () => {
                this._progressBarService.hide();
            });
    }

    deleteAttorneys() {
        
    }

}