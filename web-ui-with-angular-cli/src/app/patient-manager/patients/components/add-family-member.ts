import { FamilyMember } from '../models/family-member';
import {Component, OnInit, ElementRef} from '@angular/core';
import { FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import * as moment from 'moment';
import { ErrorMessageFormatter } from '../../../commons/utils/ErrorMessageFormatter';
import {SessionStore} from '../../../commons/stores/session-store';
import {NotificationsStore} from '../../../commons/stores/notifications-store';
import { ProgressBarService } from '../../../commons/services/progress-bar-service';
import { Notification } from '../../../commons/models/notification';
import { AppValidators } from '../../../commons/utils/AppValidators';
import { StatesStore } from '../../../commons/stores/states-store';
import { FamilyMemberStore } from '../stores/family-member-store';

@Component({
    selector: 'add-family-member',
    templateUrl: './add-family-member.html'
})


export class AddFamilyMemberComponent implements OnInit {
    isCitiesLoading = false;
    patientId: number;

    familyMemberForm: FormGroup;
    familyMemberFormControls;
    isSaveProgress = false;
    constructor(
        private fb: FormBuilder,
        private _router: Router,
        public _route: ActivatedRoute,
        private _progressBarService: ProgressBarService,
        private _notificationsService: NotificationsService,
        private _statesStore: StatesStore,
        private _notificationsStore: NotificationsStore,
        private _sessionStore: SessionStore,
        private _familyMemberStore: FamilyMemberStore,
        private _elRef: ElementRef
    ) {
        this._route.parent.parent.params.subscribe((routeParams: any) => {
            this.patientId = parseInt(routeParams.patientId);
        });
        this.familyMemberForm = this.fb.group({
                relationId: ['', Validators.required],
                fullName: ['', Validators.required],
                familyName: ['', Validators.required],
                prefix: ['', Validators.required],
                suffix: ['', Validators.required],
                age: ['', Validators.required],
                races: ['', Validators.required],
                ethnicities: ['', Validators.required],
                gender: ['', Validators.required],
                cellPhone: ['', [Validators.required, AppValidators.mobileNoValidator]],
                workPhone: [''],
                primaryContact: [1]
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
            fullName: familyMemberFormValues.fullName,
            familyName: familyMemberFormValues.familyName,
            prefix: familyMemberFormValues.prefix,
            sufix: familyMemberFormValues.suffix,
            age: familyMemberFormValues.age,
            raceId: familyMemberFormValues.races,
            ethnicitiesId: familyMemberFormValues.ethnicities,
            genderId: familyMemberFormValues.gender,
            cellPhone: familyMemberFormValues.cellPhone ? familyMemberFormValues.cellPhone.replace(/\-/g, '') : null,
            workPhone: familyMemberFormValues.workPhone,
            primaryContact: familyMemberFormValues.primaryContact
        });
        this._progressBarService.show();
        result = this._familyMemberStore.addFamilyMember(familyMember);
        result.subscribe(
            (response) => {
                let notification = new Notification({
                    'title': 'Family Member added successfully!',
                    'type': 'SUCCESS',
                    'createdAt': moment()
                });
                this._notificationsStore.addNotification(notification);
                this._router.navigate(['../'], { relativeTo: this._route });
            },
            (error) => {
                let errString = 'Unable to add Family Member.';
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
