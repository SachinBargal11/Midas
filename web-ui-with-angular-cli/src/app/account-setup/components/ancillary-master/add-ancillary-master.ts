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
import { AncillaryMasterStore } from '../../stores/ancillary-store';
import { AncillaryMaster } from '../../models/ancillary-master';
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
    selector: 'add-ancillary',
    templateUrl: './add-ancillary-master.html'
})

export class AddAncillaryComponent implements OnInit {
    ancillaryform: FormGroup;
    ancillaryformControls;
    @Input() inputCancel: number;
    @Output() closeDialogBox: EventEmitter<any> = new EventEmitter();
    isSaveProgress = false;
    allProviders: Account[];
    currentProviderId: number = 0;
    medicalProviderMode = '1';
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
        private _ancillaryMasterStore: AncillaryMasterStore,
        public _route: ActivatedRoute,

    ) {
        this.ancillaryform = this.fb.group({
            companyName: ['', [Validators.required]],
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            phoneNo: ['', [Validators.required, AppValidators.mobileNoValidator]],
            companyType: ['', Validators.required],
            email: ['', [Validators.required, AppValidators.emailValidator]]

        });

        this.ancillaryformControls = this.ancillaryform.controls;
    }

    ngOnInit() {
        console.log(this.inputCancel);
        this.loadAllAncillaries();
    }

    loadAllAncillaries() {
        // this._progressBarService.show();
        this._ancillaryMasterStore.getAllAncillaries()
            .subscribe((allProviders: Account[]) => {
                this.allProviders = allProviders;
            },
            (error) => {
                // this._progressBarService.hide();
            },
            () => {
                // this._progressBarService.hide();
            });
    }

    selectProviders(event) {
        let currentProviderId = parseInt(event.target.value);
        this.currentProviderId = currentProviderId;
    }

    assignMedicalProvider() {
        if (this.currentProviderId !== 0) {
            let result;
            result = this._ancillaryMasterStore.assignProviders(this.currentProviderId);
            result.subscribe(
                (response) => {
                    let notification = new Notification({
                        'title': 'Ancillary Servicer assigned successfully!',
                        'type': 'SUCCESS',
                        'createdAt': moment()
                    });
                    this._notificationsStore.addNotification(notification);
                    this.loadAllAncillaries();
                    this.currentProviderId = 0;
                    // this._router.navigate(['/account-setup/medical-provider-master']);
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
                    let errString = 'Unable to assign Ancillary Service.';
                    let notification = new Notification({
                        'messages': ErrorMessageFormatter.getErrorMessages(error, errString),
                        'type': 'ERROR',
                        'createdAt': moment()
                    });
                    this._notificationsStore.addNotification(notification);
                    this._notificationsService.error('Oh No!', ErrorMessageFormatter.getErrorMessages(error, errString));
                },
                () => {
                });

        } else {
            let notification = new Notification({
                'title': 'Select Ancillary Service to assign to company',
                'type': 'ERROR',
                'createdAt': moment()
            });
            this._notificationsStore.addNotification(notification);
            this._notificationsService.error('Oh No!', 'select provider to assign to company');
        }
    }

    closeDialog() {
        this.closeDialogBox.emit();
    }
    saveAncillary() {
        this.isSaveProgress = true;
        let ancillaryformValues = this.ancillaryform.value;
        let result;
        let provider = {
            company: {
                Id: this._sessionStore.session.currentCompany.id
            },
            signUp: {
                user: {
                    userType: UserType.ANCILLARY,
                    userName: this.ancillaryform.value.email,
                    firstName: this.ancillaryform.value.firstName,
                    lastName: this.ancillaryform.value.lastName
                },
                contactInfo: {
                    cellPhone: this.ancillaryform.value.phoneNo.replace(/\-/g, ''),
                    emailAddress: this.ancillaryform.value.email,
                    preferredCommunication: 1
                },
                role: {
                    name: 'Admin',
                    roleType: 'Admin',
                    status: 'active'
                },
                company: {
                    name: this.ancillaryform.value.companyName,
                    companyType: this.ancillaryform.value.companyType,
                    createByUserID: this._sessionStore.session.account.user.id
                }
            }
        };
        this._progressBarService.show();
        result = this._ancillaryMasterStore.addAncillary(provider);
        result.subscribe(
            (response) => {
                let notification = new Notification({
                    'title': 'Ancillary Service has been registered successfully!',
                    'type': 'SUCCESS',
                    'createdAt': moment()
                });
                this._notificationsStore.addNotification(notification);
                this._notificationsService.success('Welcome!', 'Ancillary Service has been registered successfully!.');
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
                let errString = 'Unable to Register Ancillary Service.';
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

