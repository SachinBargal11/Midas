import { Component, OnInit, ElementRef } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { SessionStore } from '../../../commons/stores/session-store';
import { AppValidators } from '../../../commons/utils/AppValidators';
import { StatesStore } from '../../../commons/stores/states-store';
import { LocationDetails } from '../../../medical-provider/locations/models/location-details';
import { LocationsStore } from '../../../medical-provider/locations/stores/locations-store';
import { Employer } from '../../patients/models/employer';
import { Patient } from '../../patients/models/patient';
import { PatientsStore } from '../../patients/stores/patients-store';
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
import { Attorney } from '../../../account-setup/models/attorney';
import { AttorneyMasterStore } from '../../../account-setup/stores/attorney-store';

@Component({
    selector: 'case-basic',
    templateUrl: './case-basic.html'
})

export class CaseBasicComponent implements OnInit {
    caseDetail: Case;
    caseform: FormGroup;
    caseformControls;
    locations: LocationDetails[];
    attorneys: Attorney[];
    employer: Employer;
    patient: Patient;
    isSaveProgress = false;
    caseId: number;
    patientId: number;
    patientName: string;

    constructor(
        private fb: FormBuilder,
        private _router: Router,
        public _route: ActivatedRoute,
        private _statesStore: StatesStore,
        private _notificationsStore: NotificationsStore,
        public progressBarService: ProgressBarService,
        public sessionStore: SessionStore,
        private _locationsStore: LocationsStore,
        private _employerStore: EmployerStore,
        private _patientStore: PatientsStore,
        private _attorneyMasterStore: AttorneyMasterStore,
        private _casesStore: CasesStore,
        private _notificationsService: NotificationsService,
        private _elRef: ElementRef
    ) {
        this.patientId = this.sessionStore.session.user.id;
        this.progressBarService.show();
        this._patientStore.fetchPatientById(this.patientId)
            .subscribe(
            (patient: Patient) => {
                this.patient = patient;
                this.patientName = patient.user.firstName + ' ' + patient.user.lastName;
            },
            (error) => {
                this._router.navigate(['../'], { relativeTo: this._route });
                this.progressBarService.hide();
            },
            () => {
                this.progressBarService.hide();
            });
        this._route.parent.params.subscribe((routeParams: any) => {
            this.caseId = parseInt(routeParams.caseId, 10);
            this.progressBarService.show();
            let result = this._casesStore.fetchCaseById(this.caseId);
            result.subscribe(
                (caseDetail: Case) => {
                    this.caseDetail = caseDetail;
                    // this._locationsStore.fetchLocationById(this.caseDetail.locationId)
                    // .subscribe(
                    //     (locationDetail: LocationDetails) => {
                    //         this.locationDetail = locationDetail;
                    //     });
                },
                (error) => {
                    this._router.navigate(['../'], { relativeTo: this._route });
                    this.progressBarService.hide();
                },
                () => {
                    this.progressBarService.hide();
                });

        });
        this.caseform = this.fb.group({
            // caseName: [''],
            patientId: [{ value: '', disabled: true }],
            caseTypeId: ['', Validators.required],
            carrierCaseNo: [''],
            locationId: ['', Validators.required],
            // patientEmpInfoId: ['', Validators.required],
            caseStatusId: ['', Validators.required],
            attorneyId: [''],
            // transportation: [true, Validators.required],
        });

        this.caseformControls = this.caseform.controls;
    }

    ngOnInit() {
        this._locationsStore.getLocations()
            .subscribe(locations => this.locations = locations);
        // this._employerStore.getCurrentEmployer(this.patientId)
        //     .subscribe(employer => this.employer = employer);
        // this._attorneyMasterStore.getAttorneyMasters()
        //     .subscribe(attorneys => this.attorneys = attorneys);
    }

    saveCase() {
        this.isSaveProgress = true;
        let caseFormValues = this.caseform.value;
        let result;
        let caseDetailJS = this.caseDetail.toJS();
        let caseDetail: Case = new Case(_.extend(caseDetailJS, {
            // caseName: caseFormValues.caseName,
            id: this.caseId,
            patientId: this.patientId,
            caseTypeId: caseFormValues.caseTypeId,
            carrierCaseNo: caseFormValues.carrierCaseNo,
            locationId: parseInt(caseFormValues.locationId, 10),
            patientEmpInfoId: (this.employer.id) ? this.employer.id : null,
            caseStatusId: caseFormValues.caseStatusId,
            attorneyId: caseFormValues.attorneyId,
            caseStatus: caseFormValues.caseStatusId,
            transportation: parseInt(caseFormValues.transportation) ? true : false,
            updateByUserID: this.sessionStore.session.account.user.id,
            updateDate: moment()
        }));

        this.progressBarService.show();
        result = this._casesStore.updateCase(caseDetail);
        result.subscribe(
            (response) => {
                let notification = new Notification({
                    'title': 'Case updated successfully!',
                    'type': 'SUCCESS',
                    'createdAt': moment()
                });
                this._notificationsStore.addNotification(notification);
                this._router.navigate(['../../'], { relativeTo: this._route });
                // this._router.navigate(['/patient-manager/cases']);
            },
            (error) => {
                let errString = 'Unable to update case.';
                let notification = new Notification({
                    'messages': ErrorMessageFormatter.getErrorMessages(error, errString),
                    'type': 'ERROR',
                    'createdAt': moment()
                });
                this.isSaveProgress = false;
                this._notificationsStore.addNotification(notification);
                this._notificationsService.error('Oh No!', ErrorMessageFormatter.getErrorMessages(error, errString));
                this.progressBarService.hide();
            },
            () => {
                this.isSaveProgress = false;
                this.progressBarService.hide();
            });

    }

}
