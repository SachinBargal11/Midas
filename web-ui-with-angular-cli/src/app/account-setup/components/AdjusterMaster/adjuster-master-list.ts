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

    constructor(
        private _router: Router,
        public  _route: ActivatedRoute,
        private _adjusterMasterStore: AdjusterMasterStore,
        private _notificationsStore: NotificationsStore,
        private _progressBarService: ProgressBarService,
        private _notificationsService: NotificationsService,
        private _sessionStore: SessionStore
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
                this.adjusters = adjusters;
                // this.datasource = adjusters;
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
            if(this.datasource) {
                this.adjusters = this.datasource.slice(event.first, (event.first + event.rows));
            }
        }, 250);
    }

    deleteAdjusters() {
        
    }

}