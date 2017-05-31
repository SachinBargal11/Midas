import { Component, OnInit, ElementRef, Input, Output, EventEmitter } from '@angular/core';
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
import { StatesStore } from '../../../commons/stores/states-store';
import { AttorneyMasterStore } from '../../stores/attorney-store';
import { Contact } from '../../../commons/models/contact';
import { Address } from '../../../commons/models/address';
import { Attorney } from '../../models/attorney';
import { User } from '../../../commons/models/user';
// import { PatientsStore } from '../stores/PatientsStore';
import { UserType } from '../../../commons/models/enums/user-type';

@Component({
    selector: 'add-attorney',
    templateUrl: './add-attorney.html'
})


export class AddAttorneyComponent implements OnInit {
    attorneyform: FormGroup;
    attorneyformControls;
    isSaveProgress = false;
    @Input() inputCancel: number;
    @Output() closeDialogBox: EventEmitter<any> = new EventEmitter();
    attorney: Attorney[];

    constructor(
        private fb: FormBuilder,
        private _router: Router,
        public _route: ActivatedRoute,
        private _statesStore: StatesStore,
        private _notificationsStore: NotificationsStore,
        private _progressBarService: ProgressBarService,
        private _notificationsService: NotificationsService,
        private _sessionStore: SessionStore,
        private _attorneyMasterStore: AttorneyMasterStore,
        private _elRef: ElementRef
    ) {

        this._sessionStore.userCompanyChangeEvent.subscribe(() => {
            this._router.navigate(['/account-setup/attorney']);
        });

        this.attorneyform = this.fb.group({
            companyName: ['', [Validators.required]],
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            taxId: ['', [Validators.required, Validators.maxLength(10)]],
            phoneNo: ['', [Validators.required, AppValidators.mobileNoValidator]],
            companyType: ['', Validators.required],
            email: ['', [Validators.required, AppValidators.emailValidator]],
            subscriptionPlan: ['', Validators.required]
        });

        this.attorneyformControls = this.attorneyform.controls;
    }
    ngOnInit() {
        console.log(this.inputCancel);
    }

    closeDialog() {
        this.closeDialogBox.emit();
    }

    saveAttorney() {
        this.isSaveProgress = true;
        let attorneyformValues = this.attorneyform.value;
        let result;
        let attorney = {
            company: {
                Id: this._sessionStore.session.currentCompany.id
            },
            signUp: {
                user: {
                    userType: UserType.STAFF,
                    userName: this.attorneyform.value.email,
                    firstName: this.attorneyform.value.firstName,
                    lastName: this.attorneyform.value.lastName
                },
                contactInfo: {
                    cellPhone: this.attorneyform.value.phoneNo.replace(/\-/g, ''),
                    emailAddress: this.attorneyform.value.email,
                    preferredCommunication: 1
                },
                role: {
                    name: 'Admin',
                    roleType: 'Admin',
                    status: 'active'
                },
                company: {
                    name: this.attorneyform.value.companyName,
                    taxId: this.attorneyform.value.taxId,
                    companyType: this.attorneyform.value.companyType,
                    subsCriptionType: this.attorneyform.value.subscriptionPlan,
                    createByUserID: this._sessionStore.session.account.user.id
                }
            }
        };
        result = this._attorneyMasterStore.addAttorney(attorney);
        result.subscribe(
            (response) => {
                this._notificationsService.success('Welcome!', 'Medical provider has been registered successfully!.');
                if (!this.inputCancel) {
                    setTimeout(() => {
                        this._router.navigate(['../'], { relativeTo: this._route });
                    }, 3000);
                }
                else {
                    this.closeDialog();
                }
            },
            (error) => {
                this.isSaveProgress = false;
                let errString = 'Unable to Register User.';
                this._notificationsService.error('Oh No!', ErrorMessageFormatter.getErrorMessages(error, errString));
            },
            () => {
                this.isSaveProgress = false;
            });


    }
}
