import { Component, OnInit, ElementRef } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { SessionStore } from '../../../commons/stores/session-store';
import { Accident } from '../models/accident';
import { ErrorMessageFormatter } from '../../../commons/utils/ErrorMessageFormatter';
import { NotificationsStore } from '../../../commons/stores/notifications-store';
import { AppValidators } from '../../../commons/utils/AppValidators';
import { StatesStore } from '../../../commons/stores/states-store';
import { ProgressBarService } from '../../../commons/services/progress-bar-service';
import { NotificationsService } from 'angular2-notifications';
import { Notification } from '../../../commons/models/notification';
import * as moment from 'moment';
import { Address } from '../../../commons/models/address';
import * as _ from 'underscore';
import { CasesStore } from '../../cases/stores/case-store';
import { Case } from '../models/case';
import { environment } from '../../../../environments/environment';

@Component({
    selector: 'autoInformation',
    templateUrl: './autoInformation.html'
})

export class AutoInformationInfoComponent implements OnInit {
    caseId: number;
    constructor(
        private fb: FormBuilder,
        private _router: Router,
        public _route: ActivatedRoute,
        private _statesStore: StatesStore,
        private _notificationsStore: NotificationsStore,
        private _progressBarService: ProgressBarService,
        private _sessionStore: SessionStore,
        private _elRef: ElementRef,
        private _notificationsService: NotificationsService,
        private _casesStore: CasesStore,
    ) {
        this._route.parent.params.subscribe((routeParams: any) => {
            this.caseId = parseInt(routeParams.caseId, 10);
            //   this._progressBarService.show();
        });


    }
    ngOnInit() {
    }
}