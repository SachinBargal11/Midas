import { Component, OnInit, ElementRef } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { SessionStore } from '../../../commons/stores/session-store';
import { AppValidators } from '../../../commons/utils/AppValidators';
import { StatesStore } from '../../../commons/stores/states-store';
import { LocationDetails } from '../../../medical-provider/locations/models/location-details';
import { LocationsStore } from '../../../medical-provider/locations/stores/locations-store';
import { Employer } from '../../patients/models/employer';
import { EmployerStore } from '../../patients/stores/employer-store';
import { CasesStore } from '../../cases/stores/case-store';
import { Case } from '../models/case';
import * as moment from 'moment';
import * as _ from 'underscore';
import { ProgressBarService } from '../../../commons/services/progress-bar-service';
import { ErrorMessageFormatter } from '../../../commons/utils/ErrorMessageFormatter';
import { NotificationsStore } from '../../../commons/stores/notifications-store';
import { Notification } from '../../../commons/models/notification';
import { NotificationsService } from 'angular2-notifications';

@Component({
    selector: 'case-basic',
    templateUrl: './case-basic.html'
})

export class CaseBasicComponent implements OnInit {
    caseDetail: Case;
    caseform: FormGroup;
    caseformControls;
    locations: LocationDetails[];
    employers: Employer[];
    isSaveProgress = false;
    caseId: number;
    patientId: number;

    constructor(
        private fb: FormBuilder,
        private _router: Router,
        public _route: ActivatedRoute,
        private _statesStore: StatesStore,
        private _notificationsStore: NotificationsStore,
        private _progressBarService: ProgressBarService,
        private _sessionStore: SessionStore,
        private _locationsStore: LocationsStore,
        private _employerStore: EmployerStore,
        private _casesStore: CasesStore,
        private _notificationsService: NotificationsService,
        private _elRef: ElementRef
    ) {
        this._route.parent.parent.params.subscribe((routeParams: any) => {
            this.patientId = parseInt(routeParams.patientId, 10);
        });
        this._route.parent.params.subscribe((routeParams: any) => {
            this.caseId = parseInt(routeParams.caseId, 10);
            this._progressBarService.show();
            let result = this._casesStore.fetchCaseById(this.caseId);
            result.subscribe(
                (caseDetail: Case) => {
                    this.caseDetail = caseDetail;
                },
                (error) => {
                    this._router.navigate(['../'], { relativeTo: this._route });
                    this._progressBarService.hide();
                },
                () => {
                    this._progressBarService.hide();
                });

        });
        this.caseform = this.fb.group({
            caseName: [''],
            // patientId: ['', Validators.required],
            caseTypeId: [''],
            carrierCaseNo: [''],
            locationId: ['', Validators.required],
            patientEmpInfoId: ['', Validators.required],
            caseStatusId: ['', Validators.required],
            attorneyId: [''],
            caseStatus: [''],
            transportation: [1, Validators.required],
        });

        this.caseformControls = this.caseform.controls;
    }

    ngOnInit() {
        this._locationsStore.getLocations()
            .subscribe(locations => this.locations = locations);
        this._employerStore.getEmployers(this.patientId)
            .subscribe(employers => this.employers = employers);
    }

    saveCase() {
        this.isSaveProgress = true;
        let caseFormValues = this.caseform.value;
        let result;
        let caseDetailJS = this.caseDetail.toJS();
        let caseDetail: Case = new Case(_.extend(caseDetailJS, {
            caseName: caseFormValues.caseName,
            caseTypeId: caseFormValues.caseTypeId,
            carrierCaseNo: caseFormValues.carrierCaseNo,
            locationId: parseInt(caseFormValues.locationId, 10),
            patientEmpInfoId: caseFormValues.patientEmpInfoId,
            caseStatusId: caseFormValues.caseStatusId,
            attorneyId: caseFormValues.attorneyId,
            caseStatus: caseFormValues.caseStatus,
            transportation: caseFormValues.transportation,
            updateByUserID: this._sessionStore.session.account.user.id,
            updateDate: moment()
        }));

        this._progressBarService.show();
        result = this._casesStore.addCase(caseDetail);
        result.subscribe(
            (response) => {
                let notification = new Notification({
                    'title': 'Patient added successfully!',
                    'type': 'SUCCESS',
                    'createdAt': moment()
                });
                this._notificationsStore.addNotification(notification);
                this._router.navigate(['../../'], { relativeTo: this._route });
            },
            (error) => {
                let errString = 'Unable to add patient.';
                let notification = new Notification({
                    'messages': ErrorMessageFormatter.getErrorMessages(error, errString),
                    'type': 'ERROR',
                    'createdAt': moment()
                });
                this.isSaveProgress = false;
                this._notificationsStore.addNotification(notification);
                this._notificationsService.error('Oh No!', ErrorMessageFormatter.getErrorMessages(error, errString));
                this._progressBarService.hide();
            },
            () => {
                this.isSaveProgress = false;
                this._progressBarService.hide();
            });

    }

}
