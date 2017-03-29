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
import { PatientsStore } from '../stores/patients-store';
import { PhoneFormatPipe } from '../../../commons/pipes/phone-format-pipe';

@Component({
    selector: 'edit-family-member',
    templateUrl: './edit-family-member.html'
})


export class EditFamilyMemberComponent implements OnInit {
    cellPhone: string;
    patientId: number;
    familyMemberForm: FormGroup;
    familyMemberFormControls;
    isSaveProgress = false;
    familyMember: FamilyMember;

    constructor(
        private fb: FormBuilder,
        private _router: Router,
        public _route: ActivatedRoute,
        private _notificationsStore: NotificationsStore,
        private _progressBarService: ProgressBarService,
        private _notificationsService: NotificationsService,
        private _sessionStore: SessionStore,
        private _familyMemberStore: FamilyMemberStore,
        private _patientsStore: PatientsStore,
        private _phoneFormatPipe: PhoneFormatPipe,
        private _elRef: ElementRef
    ) {
        this.patientId = this._sessionStore.session.user.id;
        // this._route.parent.parent.params.subscribe((routeParams: any) => {
        //     this.patientId = parseInt(routeParams.patientId);
        // });
        this._route.params.subscribe((routeParams: any) => {
            let familyMemberId: number = parseInt(routeParams.id);
            this._progressBarService.show();
            let result = this._familyMemberStore.fetchFamilyMemberById(familyMemberId);
            result.subscribe(
                (familyMember: any) => {
                    this.familyMember = familyMember.toJS();
                    this.cellPhone = this._phoneFormatPipe.transform(this.familyMember.cellPhone);
                },
                (error) => {
                    // this._router.navigate(['../../'], { relativeTo: this._route });
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
            cellPhone: ['', [Validators.required, AppValidators.mobileNoValidator]],
            workPhone: [''],
            primaryContact: ['']
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
            patientId: this.patientId,
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
            primaryContact: familyMemberFormValues.primaryContact
        });
        this._progressBarService.show();
        result = this._familyMemberStore.updateFamilyMember(familyMember, this.familyMember.id);
        result.subscribe(
            (response) => {
                let notification = new Notification({
                    'title': 'Family Member updated successfully!',
                    'type': 'SUCCESS',
                    'createdAt': moment()
                });
                this._notificationsStore.addNotification(notification);
                this._router.navigate(['../../'], { relativeTo: this._route });
            },
            (error) => {
                let errString = 'Unable to update Family Member.';
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
