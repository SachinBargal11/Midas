import { Component, OnInit, ElementRef } from '@angular/core';
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
import { UserType } from '../../../commons/models/enums/user-type';
import { PrefferedProvider } from '../../models/preffered-provider';
import { PhoneFormatPipe } from '../../../commons/pipes/phone-format-pipe';
import { FaxNoFormatPipe } from '../../../commons/pipes/faxno-format-pipe';
import { Signup } from '../../models/signup';
@Component({
    selector: 'edit-medical-provider',
    templateUrl: './edit-medical-provider.html'
})

export class EditMedicalProviderComponent implements OnInit {
    providerform: FormGroup;
    providerformControls;
    isRegistrationInProgress = false;
    medicalProviderMaster: MedicalProviderMaster;
    isSaveProgress = false;
    medicalProviderId: number;
    companyName: string;
    constructor(
        private fb: FormBuilder,
        private _router: Router,
        private _notificationsStore: NotificationsStore,
        private _notificationsService: NotificationsService,
        private _sessionStore: SessionStore,
        public _route: ActivatedRoute,
        private _progressBarService: ProgressBarService,
        // private _authenticationService: AuthenticationService,
        // private _registrationService: RegistrationService,
        private _elRef: ElementRef,
        private _medicalProviderMasterStore: MedicalProviderMasterStore,

    ) {
        this._sessionStore.userCompanyChangeEvent.subscribe(() => {
            this._router.navigate(['/account-setup/medical-provider-master']);
        });

        this._route.params.subscribe((routeParams: any) => {
            this.medicalProviderId = parseInt(routeParams.id);
            this._progressBarService.show();
            let result = this._medicalProviderMasterStore.fetchMedicalProviderById(this.medicalProviderId);
            result.subscribe(
                (medicalProviderMaster: MedicalProviderMaster) => {
                    this.medicalProviderMaster = medicalProviderMaster;

                },
                (error) => {
                    this._router.navigate(['../'], { relativeTo: this._route });
                    this._progressBarService.hide();
                },
                () => {
                    this._progressBarService.hide();
                });
        });

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

    }

    updateMedicalProvider() {
        this.isSaveProgress = true;
        let providerformValues = this.providerform.value;
        let result;
        let provider = new MedicalProviderMaster({
            id: this.medicalProviderId,
            prefMedProviderId: this.medicalProviderMaster.prefMedProviderId,
            companyId: this._sessionStore.session.currentCompany.id,
            isCreated: this.medicalProviderMaster.isCreated,
            signup: new Signup({
                company: {
                    id: this.medicalProviderMaster.signup.company.id,
                    name: this.providerform.value.companyName,
                    companyType: this.providerform.value.companyType
                },
                user: {
                    id: this.medicalProviderMaster.signup.user.id,
                    userType: UserType.STAFF,
                    userName: this.providerform.value.email,
                    firstName: this.providerform.value.firstName,
                    lastName: this.providerform.value.lastName
                },
                contactInfo: {
                    id: this.medicalProviderMaster.signup.contactInfo.id,
                    cellPhone: this.providerform.value.phoneNo.replace(/\-/g, ''),
                    emailAddress: this.providerform.value.email,
                    preferredCommunication: 1
                }
            })
        });
        this._progressBarService.show();
        result = this._medicalProviderMasterStore.updateMedicalProvider(provider);
        result.subscribe(
            (response) => {
                let notification = new Notification({
                    'title': 'Medical provider has been updated successfully!',
                    'type': 'SUCCESS',
                    'createdAt': moment()
                });
                this._notificationsStore.addNotification(notification);
                this._notificationsService.success('Success!', 'Medical provider has been updated successfully!.');
                this._router.navigate(['../../'], { relativeTo: this._route });
            },
            (error) => {
                let errString = 'Unable to update User.';
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
