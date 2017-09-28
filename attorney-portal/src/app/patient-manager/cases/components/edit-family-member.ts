import { Component, OnInit, ElementRef } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { ErrorMessageFormatter } from '../../../commons/utils/ErrorMessageFormatter';
import { SessionStore } from '../../../commons/stores/session-store';
import { NotificationsStore } from '../../../commons/stores/notifications-store';
import { Notification } from '../../../commons/models/notification';
import * as moment from 'moment';
import { ProgressBarService } from '../../../commons/services/progress-bar-service';
import { AppValidators } from '../../../commons/utils/AppValidators';
import { FamilyMember } from '../models/family-member';
import { FamilyMemberStore } from '../stores/family-member-store';
import { PhoneFormatPipe } from '../../../commons/pipes/phone-format-pipe';
import { Case } from '../../cases/models/case';
import { CasesStore } from '../../cases/stores/case-store';

@Component({
    selector: 'edit-family-member',
    templateUrl: './edit-family-member.html'
})

export class EditFamilyMemberComponent implements OnInit {
    caseDetail: Case[];
    referredToMe: boolean = false;
    cellPhone: string;
    patientId: number;
    familyMemberForm: FormGroup;
    familyMemberFormControls;
    isSaveProgress = false;
    familyMember: FamilyMember;
    caseId: number;
    caseStatusId: number;

    constructor(
        private fb: FormBuilder,
        private _router: Router,
        public _route: ActivatedRoute,
        private _notificationsStore: NotificationsStore,
        private _progressBarService: ProgressBarService,
        private _notificationsService: NotificationsService,
        private _sessionStore: SessionStore,
        private _familyMemberStore: FamilyMemberStore,
        private _phoneFormatPipe: PhoneFormatPipe,
        private _elRef: ElementRef,
        private _casesStore: CasesStore
    ) {

        this._route.parent.parent.parent.params.subscribe((routeParams: any) => {
            this.patientId = parseInt(routeParams.patientId);
        });
        this._route.parent.parent.params.subscribe((routeParams: any) => {
            this.caseId = parseInt(routeParams.caseId);
            this._progressBarService.show();
            let caseResult = this._casesStore.getOpenCaseForPatient(this.patientId);
            caseResult.subscribe(
                (cases: Case[]) => {
                    this.caseDetail = cases;
                    if (this.caseDetail.length > 0) {
                        this.caseDetail[0].referral.forEach(element => {
                            if (element.referredToCompanyId == _sessionStore.session.currentCompany.id) {
                                this.referredToMe = true;
                            } else {
                                this.referredToMe = false;
                            }
                        })
                    } else {
                        this.referredToMe = false;
                    }

                    let result = this._casesStore.fetchCaseById(this.caseId);
                    result.subscribe(
                        (caseDetail: Case) => {
                            this.caseStatusId = caseDetail.caseStatusId;
                        });

                    this._route.params.subscribe((routeParams: any) => {
                        let familyMemberId: number = parseInt(routeParams.id);
                        let result = this._familyMemberStore.fetchFamilyMemberById(familyMemberId);
                        result.subscribe(
                            (familyMember: any) => {
                                this.familyMember = familyMember.toJS();
                                this.cellPhone = this._phoneFormatPipe.transform(this.familyMember.cellPhone);
                            },
                            (error) => {
                                this._router.navigate(['../../'], { relativeTo: this._route });
                            },
                            () => {
                            });
                    });

                },
                (error) => {
                    this._router.navigate(['../'], { relativeTo: this._route });
                    this._progressBarService.hide();
                },
                () => {
                    this._progressBarService.hide();
                });
        });
        this.familyMemberForm = this.fb.group({
            relationId: ['', Validators.required],
            firstName: ['', Validators.required],
            middleName: [''],
            lastName: ['', Validators.required],
            age: ['', Validators.required],
            races: ['', Validators.required],
            ethnicities: ['', Validators.required],
            gender: ['', Validators.required],
            cellPhone: ['', [Validators.required]],
            workPhone: ['', [AppValidators.numberValidator, Validators.maxLength(10)]],
            primaryContact: [''],
            alternateEmail: ['', [AppValidators.emailValidator]],
            officeExtension: ['', [AppValidators.numberValidator, Validators.maxLength(5)]],
            preferredCommunication: ['']
        });

        this.familyMemberFormControls = this.familyMemberForm.controls;
    }
    ngOnInit() {
    }

    save() {
        this.isSaveProgress = true;
        let familyMemberFormValues = this.familyMemberForm.value;
        let result;
        let familyMember = new FamilyMember({
            caseId: this.caseId,
            relationId: familyMemberFormValues.relationId,
            firstName: familyMemberFormValues.firstName,
            middleName: familyMemberFormValues.middleName,
            lastName: familyMemberFormValues.lastName,
            age: familyMemberFormValues.age,
            raceId: familyMemberFormValues.races,
            ethnicitiesId: familyMemberFormValues.ethnicities,
            genderId: familyMemberFormValues.gender,
            cellPhone: familyMemberFormValues.cellPhone ? familyMemberFormValues.cellPhone.replace(/\-/g, '') : null,
            workPhone: familyMemberFormValues.workPhone,
            // primaryContact: familyMemberFormValues.primaryContact,
            primaryContact: familyMemberFormValues.primaryContact ? familyMemberFormValues.primaryContact == '1' : true ? familyMemberFormValues.primaryContact == '0' : false,
            //officeExtension: familyMemberFormValues.officeExtension,
            //alternateEmail: familyMemberFormValues.alternateEmail,
            //preferredCommunication: familyMemberFormValues.preferredCommunication,   

        });
        this._progressBarService.show();
        result = this._familyMemberStore.updateFamilyMember(familyMember, this.familyMember.id);
        result.subscribe(
            (response) => {
                let notification = new Notification({
                    'title': 'Family member updated successfully!',
                    'type': 'SUCCESS',
                    'createdAt': moment()
                });
                this._notificationsStore.addNotification(notification);
                this._router.navigate(['../../'], { relativeTo: this._route });
            },
            (error) => {
                let errString = 'Unable to update family member.';
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
