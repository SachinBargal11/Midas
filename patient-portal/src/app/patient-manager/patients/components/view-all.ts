import { Patient } from '../models/patient';
//import { Employer } from '../models/employer';
import { FamilyMember } from '../models/family-member';
import { Component, OnInit, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { SessionStore } from '../../../commons/stores/session-store';
import { NotificationsStore } from '../../../commons/stores/notifications-store';
import { PatientsStore } from '../stores/patients-store';
//import { EmployerStore } from '../stores/employer-store';
// import { FamilyMemberStore } from '../stores/family-member-store';
import { AppValidators } from '../../../commons/utils/AppValidators';
import * as moment from 'moment';
import { ProgressBarService } from '../../../commons/services/progress-bar-service';
import { NotificationsService } from 'angular2-notifications';
import { Notification } from '../../../commons/models/notification';
import { ErrorMessageFormatter } from '../../../commons/utils/ErrorMessageFormatter';
import { User } from '../../../commons/models/user';
import { InsuranceStore } from '../stores/insurance-store';
import { Insurance } from '../models/insurance';
import { Contact } from '../../../commons/models/contact';
import { Address } from '../../../commons/models/address';
import * as _ from 'underscore';
import { DateFormatPipe } from '../../../commons/pipes/date-format-pipe';

@Component({
    selector: 'view-all',
    templateUrl: './view-all.html',
    styleUrls: ['../css/view-all.scss']
})

export class ViewAllComponent implements OnInit {
    patientId: number;
    patientInfo: Patient;
    // familyMember: FamilyMember[];
    socialMedia:any[];
    insurances: Insurance[];
    //   employer: Employer;
    dateOfFirstTreatment: string;
    dateOfBirth: string;
    noEmployer: string;
    noInsurances: string;
    noFamilyMember: string;



    constructor(
        private fb: FormBuilder,
        private _router: Router,
        private _dateFormatPipe: DateFormatPipe,
        public _route: ActivatedRoute,
        public notificationsStore: NotificationsStore,
        public sessionStore: SessionStore,
        public progressBarService: ProgressBarService,
        private _notificationsService: NotificationsService,
        private _patientsStore: PatientsStore,
        // private _familyMemberStore: FamilyMemberStore,
        // private _employerStore: EmployerStore,
        private _insuranceStore: InsuranceStore
    ) {
        // this._route.parent.params.subscribe((params: any) => {
        // this.patientId = parseInt(params.patientId, 10);
        this.patientId = this.sessionStore.session.user.id;
        this.progressBarService.show();
        let result = this._patientsStore.getPatientById(this.patientId);
        result.subscribe(
            (patient: Patient) => {
                this.patientInfo = patient;
                this.socialMedia = patient.socialMedia;
                this.dateOfFirstTreatment = this.patientInfo.dateOfFirstTreatment ?
                    this._dateFormatPipe.transform(this.patientInfo.dateOfFirstTreatment)
                    : null;
                this.dateOfBirth = this.patientInfo.user.dateOfBirth ?
                    this._dateFormatPipe.transform(this.patientInfo.user.dateOfBirth)
                    : null;
            },
            (error) => {
                this.progressBarService.hide();
            },
            () => {
                this.progressBarService.hide();
            });

        //
        // let empResult = this._employerStore.getCurrentEmployer(this.patientId);
        // empResult.subscribe(
        //     (employer: Employer) => {
        //         if (employer.id) {
        //             this.employer = employer;
        //         } else {
        //             this.noEmployer = 'No Employer available';

        //         }

        //     },
        //     (error) => {
        //         this.progressBarService.hide();
        //     },
        //     () => {
        //         this.progressBarService.hide();
        //     });

        //

        // let familyResult = this._familyMemberStore.getFamilyMembers(this.patientId);
        // familyResult.subscribe(
        //     (familyMember: FamilyMember[]) => {
        //         if (familyMember.length) {
        //             this.familyMember = familyMember;
        //         } else {
        //             this.noFamilyMember = 'No Family Member Available';
        //         }
        //     },
        //     (error) => {
        //         this.progressBarService.hide();
        //     },
        //     () => {
        //         this.progressBarService.hide();
        //     });

        // this.progressBarService.show();
        // this._insuranceStore.getInsurances(this.patientId)
        //     .subscribe(insurances => {
        //         if (insurances.length) {
        //             this.insurances = insurances;
        //         } else {
        //             this.noInsurances = 'No Insurance Information Available';
        //         }
        //     },
        //     (error) => {
        //         this.progressBarService.hide();
        //     },
        //     () => {
        //         this.progressBarService.hide();
        //     });

        // });


    }

    ngOnInit() {
    }

}
