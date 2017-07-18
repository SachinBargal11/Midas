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
                firstName: ['', Validators.required],
                middleName: [''],
                lastName: ['', Validators.required],
                age: ['', Validators.required],
                races: ['', Validators.required],
                ethnicities: ['', Validators.required],
                gender: ['', Validators.required],
                cellPhone: ['', [Validators.required, AppValidators.mobileNoValidator]],
                workPhone: [''],
                alternateEmail:  ['', [AppValidators.emailValidator]],
                officeExtension: [''],
                preferredCommunication: [''],
                primaryContact: ['1']
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
            // fullName: 'qwerty1',
            // fullName: familyMemberFormValues.fullName,
            firstName: familyMemberFormValues.firstName,
            // familyName: 'qwerty2',
             // familyName: familyMemberFormValues.familyName,
            middleName: familyMemberFormValues.middleName,
            lastName: familyMemberFormValues.lastName,
            // sufix: 'qwerty3',
            // sufix: familyMemberFormValues.suffix,
            // prefix: 'qwerty4',
            age: familyMemberFormValues.age,
            raceId: familyMemberFormValues.races,
            ethnicitiesId: familyMemberFormValues.ethnicities,
            genderId: familyMemberFormValues.gender,
            cellPhone: familyMemberFormValues.cellPhone ? familyMemberFormValues.cellPhone.replace(/\-/g, '') : null,
            workPhone: familyMemberFormValues.workPhone,
            //officeExtension: familyMemberFormValues.officeExtension,
            //alternateEmail: familyMemberFormValues.alternateEmail,
           //preferredCommunication: familyMemberFormValues.preferredCommunication,
            // primaryContact: parseInt(familyMemberFormValues.primaryContact)
            primaryContact: familyMemberFormValues.primaryContact ? familyMemberFormValues.primaryContact == '1' : true ? familyMemberFormValues.primaryContact == '0' : false,
        });
        this._progressBarService.show();
        result = this._familyMemberStore.addFamilyMember(familyMember);
        result.subscribe(
            (response) => {
                let notification = new Notification({
                    'title': 'Family member added successfully!',
                    'type': 'SUCCESS',
                    'createdAt': moment()
                });
                this._notificationsStore.addNotification(notification);
                this._router.navigate(['../'], { relativeTo: this._route });
            },
            (error) => {
                let errString = 'Unable to add Family member.';
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
