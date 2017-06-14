import { CaseLabel } from '../models/case-label';
import { Component, OnInit, ElementRef } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { SessionStore } from '../../../commons/stores/session-store';
import { AppValidators } from '../../../commons/utils/AppValidators';
import { CasesStore } from '../../cases/stores/case-store';
import * as moment from 'moment';
import * as _ from 'underscore';
import { ProgressBarService } from '../../../commons/services/progress-bar-service';
import { ErrorMessageFormatter } from '../../../commons/utils/ErrorMessageFormatter';
import { NotificationsStore } from '../../../commons/stores/notifications-store';
import { Notification } from '../../../commons/models/notification';
import { NotificationsService } from 'angular2-notifications';


@Component({
    selector: 'case-basic-label',
    templateUrl: './case-basic-label.html'
})

export class CaseBasicLabelComponent implements OnInit {
    caseId: number;
    caseLabel: CaseLabel;

    constructor(
        private fb: FormBuilder,
        private _router: Router,
        public _route: ActivatedRoute,
        private _notificationsStore: NotificationsStore,
        private _progressBarService: ProgressBarService,
        public sessionStore: SessionStore,
        private _casesStore: CasesStore,
        private _notificationsService: NotificationsService,
        private _elRef: ElementRef
    ) {
        this._route.parent.params.subscribe((routeParams: any) => {
            this.caseId = parseInt(routeParams.caseId, 10);
            this._progressBarService.show();
            let result = this._casesStore.getCaseReadOnly(this.caseId);
            result.subscribe(
                (caseLabel: CaseLabel) => {
                    this.caseLabel = caseLabel;
                },
                (error) => {
                    this._router.navigate(['../../']);
                    this._progressBarService.hide();
                },
                () => {
                    this._progressBarService.hide();
                });
        });

    }

    ngOnInit() {
    }
}
