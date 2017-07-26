import { InputDecorator } from '@angular/core/src/metadata/directives';
import { Component, OnInit, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LazyLoadEvent } from 'primeng/primeng'
import { NotificationsStore } from '../../../commons/stores/notifications-store';
import { Notification } from '../../../commons/models/notification';
import * as moment from 'moment';
import { ProgressBarService } from '../../../commons/services/progress-bar-service';
import { NotificationsService } from 'angular2-notifications';
import { ErrorMessageFormatter } from '../../../commons/utils/ErrorMessageFormatter';
import { SessionStore } from '../../../commons/stores/session-store';
import { ConfirmDialogModule, ConfirmationService } from 'primeng/primeng';
import { MedicalProviderMasterStore } from '../../stores/medical-provider-master-store';
import { MedicalProviderMaster } from '../../models/medical-provider-master';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '../../../medical-provider/locations/models/location';
import { LocationDetails } from '../../../medical-provider/locations/models/location-details';
import { LocationsStore } from '../../../medical-provider/locations/stores/locations-store';
import { AppValidators } from '../../../commons/utils/AppValidators';
// import { AuthenticationService } from '../../../account/services/authentication-service';
// import { RegistrationService } from '../services/registration-service';
import { Company } from '../../../account/models/company';
import { Account } from '../../../account/models/account';
import { User } from '../../../commons/models/user';
import { UserRole } from '../../../commons/models/user-role';
import { UserType } from '../../../commons/models/enums/user-type';
import { Contact } from '../../../commons/models/contact';

@Component({
    selector: 'add-medical-provider',
    templateUrl: './add-medical-provider.html'
})

export class AddMedicalProviderComponent implements OnInit {
    providerform: FormGroup;
    providerformControls;
    @Input() inputCancel: number;
    @Output() closeDialogBox: EventEmitter<any> = new EventEmitter();
    isSaveProgress = false;
    constructor(
        private fb: FormBuilder,
        private _router: Router,
        private _notificationsStore: NotificationsStore,
        private _notificationsService: NotificationsService,
        private _sessionStore: SessionStore,
        // private _authenticationService: AuthenticationService,
        // private _registrationService: RegistrationService,
        private _elRef: ElementRef,
        private _progressBarService: ProgressBarService,
        private _medicalProviderMasterStore: MedicalProviderMasterStore,
        public _route: ActivatedRoute,

    ) {
        this.providerform = this.fb.group({
            companyName: ['', [Validators.required]],
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],          
            phoneNo: ['', [Validators.required, AppValidators.mobileNoValidator]],
            companyType: ['', Validators.required],
            email: ['', [Validators.required, AppValidators.emailValidator]]
           
        });

        this.providerformControls = this.providerform.controls;
    }

    ngOnInit() {
        console.log(this.inputCancel);
    }
    closeDialog() {
        this.closeDialogBox.emit();
    }
    saveMedicalProvider() {
        this.isSaveProgress = true;
        let providerformValues = this.providerform.value;
        let result;
        let provider = {
            company: {
                Id: this._sessionStore.session.currentCompany.id
            },
            signUp: {
                user: {
                    userType: UserType.STAFF,
                    userName: this.providerform.value.email,
                    firstName: this.providerform.value.firstName,
                    lastName: this.providerform.value.lastName
                },
                contactInfo: {
                    cellPhone: this.providerform.value.phoneNo.replace(/\-/g, ''),
                    emailAddress: this.providerform.value.email,
                    preferredCommunication: 1
                },
                role: {
                    name: 'Admin',
                    roleType: 'Admin',
                    status: 'active'
                },
                company: {
                    name: this.providerform.value.companyName,                
                    companyType: this.providerform.value.companyType,                 
                    createByUserID: this._sessionStore.session.account.user.id
                }
            }
        };
        this._progressBarService.show();
        result = this._medicalProviderMasterStore.addMedicalProvider(provider);
        result.subscribe(
            (response) => {
                let notification = new Notification({
                    'title': 'Medical provider has been registered successfully!',
                    'type': 'SUCCESS',
                    'createdAt': moment()
                });
                this._notificationsStore.addNotification(notification);
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
                let errString = 'Unable to register user.';
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
