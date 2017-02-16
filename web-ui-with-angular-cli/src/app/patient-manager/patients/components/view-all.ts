import { Patient } from '../models/patient';
import { Employer } from '../models/employer';
import { FamilyMember } from '../models/family-member';
import { Component, OnInit, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { SessionStore } from '../../../commons/stores/session-store';
import { NotificationsStore } from '../../../commons/stores/notifications-store';
import { PatientsStore } from '../stores/patients-store';
import { EmployerStore } from '../stores/employer-store';
import { FamilyMemberStore } from '../stores/family-member-store';
import { AppValidators } from '../../../commons/utils/AppValidators';
import * as moment from 'moment';
import { ProgressBarService } from '../../../commons/services/progress-bar-service';
import { NotificationsService } from 'angular2-notifications';
import { Notification } from '../../../commons/models/notification';
import { ErrorMessageFormatter } from '../../../commons/utils/ErrorMessageFormatter';
import { User } from '../../../commons/models/user';
import * as _ from 'underscore';

@Component({
    selector: 'view-all',
    templateUrl: './view-all.html'
})

export class ViewAllComponent implements OnInit {
    patientId: number;
    patientInfo: Patient;
    familyMember:FamilyMember[];
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
        this._route.parent.params.subscribe((params: any) => {
            this.patientId = parseInt(params.patientId, 10);
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
                //
            let empResult = this._employerStore.getCurrentEmployer(this.patientId);
            empResult.subscribe(
                (employer: Employer) => {
                    this.employer = employer;
                },
                 (error) => {
                    this._router.navigate(['/patient-manager/patients']);
                    this._progressBarService.hide();
                },
                () => {
                    this._progressBarService.hide();
                });
                    
                //

                let familyResult = this._familyMemberStore.getFamilyMembers(this.patientId);
            familyResult.subscribe(
                (familyMember: FamilyMember[]) => {
                    this.familyMember = familyMember;
                     },
                (error) => {
                    this._router.navigate(['/patient-manager/patients']);
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