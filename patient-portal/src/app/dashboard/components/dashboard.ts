import { Patient } from '../../account/models/patient';
import { Employer } from '../../account/models/employer';
import { FamilyMember } from '../../account/models/family-member';
import { Component, OnInit, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { SessionStore } from '../../commons/stores/session-store';
import { NotificationsStore } from '../../commons/stores/notifications-store';
import { PatientsStore } from '../../account/stores/patients-store';
import { EmployerStore } from '../../account/stores/employer-store';
import { FamilyMemberStore } from '../../account/stores/family-member-store';
import { AppValidators } from '../../commons/utils/AppValidators';
import * as moment from 'moment';
import { ProgressBarService } from '../../commons/services/progress-bar-service';
import { NotificationsService } from 'angular2-notifications';
import { Notification } from '../../commons/models/notification';
import { ErrorMessageFormatter } from '../../commons/utils/ErrorMessageFormatter';
import { User } from '../../commons/models/user';
import * as _ from 'underscore';

@Component({
    selector: 'dashboard',
    templateUrl: './dashboard.html',
})

export class DashboardComponent {
    patientId: number;
    patientInfo: Patient;
    familyMember: FamilyMember[];
    employer: Employer;
    dateOfFirstTreatment: string;
    dateOfBirth: string;
    constructor(
        private fb: FormBuilder,
        private _router: Router,
        public _route: ActivatedRoute,
        private _notificationsStore: NotificationsStore,
        private _sessionStore: SessionStore,
        private _progressBarService: ProgressBarService,
        private _notificationsService: NotificationsService,
        private _patientsStore: PatientsStore,
        private _familyMemberStore: FamilyMemberStore,
        private _employerStore: EmployerStore
    ) {
            this.patientId = this._sessionStore.session.user.id;
            this._progressBarService.show();
            let result = this._patientsStore.getPatientById(this.patientId);
            result.subscribe(
                (patient: Patient) => {
                    this.patientInfo = patient;
                    this.dateOfFirstTreatment = this.patientInfo.dateOfFirstTreatment.format('YYYY-MM-DD');
                    this.dateOfBirth = this.patientInfo.user.dateOfBirth.format('YYYY-MM-DD');
                     },
                (error) => {
                    this._router.navigate(['/patient-manager/patients']);
                    this._progressBarService.hide();
                },
                () => {
                    this._progressBarService.hide();
                });
    }
}