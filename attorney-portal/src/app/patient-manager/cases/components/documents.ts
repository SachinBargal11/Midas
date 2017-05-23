import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import * as _ from 'underscore';
import { BehaviorSubject } from 'rxjs';

import { PatientVisitsStore } from '../../patient-visit/stores/patient-visit-store';
import { PatientVisit } from '../../patient-visit/models/patient-visit';
import { NotificationsStore } from '../../../commons/stores/notifications-store';
import { Notification } from '../../../commons/models/notification';
import { Doctor } from '../../../medical-provider/users/models/doctor';
import { Room } from '../../../medical-provider/rooms/models/room';
import { DoctorsStore } from '../../../medical-provider/users/stores/doctors-store';
import { RoomsStore } from '../../../medical-provider/rooms/stores/rooms-store';
import { ProgressBarService } from '../../../commons/services/progress-bar-service';
import { NotificationsService } from 'angular2-notifications';
import { ScannerService } from '../../../commons/services/scanner-service';
import { ErrorMessageFormatter } from '../../../commons/utils/ErrorMessageFormatter';

@Component({
    selector: 'case-documents',
    templateUrl: './documents.html'
})

export class DocumentsUploadComponent implements OnInit {

    public scannerContainerId: string = `scanner_${moment().valueOf()}`;

    private _dwObject: any = null;

    constructor(
        private _router: Router,
        public _route: ActivatedRoute,
        private _patientVisitStore: PatientVisitsStore,
        private _notificationsStore: NotificationsStore,
        private _progressBarService: ProgressBarService,
        private _notificationsService: NotificationsService,
        private _scannerService: ScannerService,
        private _doctorsStore: DoctorsStore,
        private _roomsStore: RoomsStore,
    ) {
    }

    ngOnInit() {
    }

    ngOnDestroy() {
        this._scannerService.deleteWebTwain(this.scannerContainerId);
    }

    ngAfterViewInit() {
        _.defer(() => {
            this._scannerService.getWebTwain(this.scannerContainerId)
                .then((dwObject) => {
                    this._dwObject = dwObject;
                });
        });

    }

    AcquireImage() {
        if (this._dwObject) {
            this._dwObject.IfDisableSourceAfterAcquire = true;
            this._dwObject.SelectSource();
            this._dwObject.OpenSource();
            this._dwObject.AcquireImage();
        }
    }

}
