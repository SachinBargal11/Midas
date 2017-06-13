import { Component, OnInit, ElementRef } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
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
    selector: 'case-basic-label',
    templateUrl: './case-basic-label.html'
})

export class CaseBasicLabelComponent implements OnInit {
    caseDetail: Case;
    caseform: FormGroup;
    caseformControls;
    locations: LocationDetails[];
    attorneys: Attorney[];
    employer: Employer;
    patient: Patient;
    isSaveProgress = false;
    caseId: number;
    caseStatusId: number;
    patientId: number;
    patientName: string;
    // transportation: any;
    attorneyId: number = 0;
    constructor(
        private fb: FormBuilder,
        private _router: Router,
        public _route: ActivatedRoute,
        private _statesStore: StatesStore,
        private _notificationsStore: NotificationsStore,
        private _progressBarService: ProgressBarService,
        public sessionStore: SessionStore,
        private _locationsStore: LocationsStore,
        private _employerStore: EmployerStore,
        private _patientStore: PatientsStore,
        private _attorneyMasterStore: AttorneyMasterStore,
        private _casesStore: CasesStore,
        private _notificationsService: NotificationsService,
        private _elRef: ElementRef
    ) {
        this._route.parent.params.subscribe((routeParams: any) => {
            this.caseId = parseInt(routeParams.caseId, 10);
        });
        this._route.parent.parent.params.subscribe((routeParams: any) => {
            this.patientId = parseInt(routeParams.patientId, 10);
            this._progressBarService.show();
            let fetchPatient = this._patientStore.fetchPatientById(this.patientId);
            let fetchlocations = this._locationsStore.getLocations();
            let fetchEmployer = this._employerStore.getCurrentEmployer(this.patientId);
            let fetchAttorneys = this._attorneyMasterStore.getAttorneyMasters();
            let fetchCaseDetail = this._casesStore.fetchCaseById(this.caseId);

            Observable.forkJoin([fetchPatient, fetchlocations, fetchEmployer, fetchAttorneys, fetchCaseDetail])
                .subscribe(
                (results) => {
                    this.patient = results[0];
                    this.patientName = this.patient.user.firstName + ' ' + this.patient.user.lastName;
                    this.locations = results[1];
                    this.employer = results[2];
                    this.attorneys = results[3];
                    this.caseDetail = results[4];
                },
                (error) => {
                    this._router.navigate(['../'], { relativeTo: this._route });
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
