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
import { AncillaryMasterStore } from '../../stores/ancillary-store';
import { AncillaryMaster } from '../../models/ancillary-master';
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
    selector: 'edit-ancillary',
    templateUrl: './edit-ancillary-master.html'
})

export class EditAncillaryComponent implements OnInit {
    ancillaryform: FormGroup;
    ancillaryformControls;
    isRegistrationInProgress = false;
    ancillaryMaster: AncillaryMaster;
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
        private _ancillaryMasterStore: AncillaryMasterStore,

    ) {
        this._sessionStore.userCompanyChangeEvent.subscribe(() => {
            this._router.navigate(['/account-setup/medical-provider-master']);
        });

        this._route.params.subscribe((routeParams: any) => {
            this.medicalProviderId = parseInt(routeParams.id);
            this._progressBarService.show();
            let result = this._ancillaryMasterStore.fetchMedicalProviderById(this.medicalProviderId);
            result.subscribe(
                (ancillaryMaster: AncillaryMaster) => {
                    this.ancillaryMaster = ancillaryMaster;

                },
                (error) => {
                    this._router.navigate(['../'], { relativeTo: this._route });
                    this._progressBarService.hide();
                },
                () => {
                    this._progressBarService.hide();
                });
        });

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

    }

    updateAncillary() {
        this.isSaveProgress = true;
        let ancillaryformValues = this.ancillaryform.value;
        let result;
        let provider = new AncillaryMaster({
            id: this.medicalProviderId,
            prefMedProviderId: this.ancillaryMaster.prefMedProviderId,
            companyId: this._sessionStore.session.currentCompany.id,
            isCreated: this.ancillaryMaster.isCreated,
            signup: new Signup({
                company: {
                    id: this.ancillaryMaster.signup.company.id,
                    name: this.ancillaryform.value.companyName,
                    companyType: this.ancillaryform.value.companyType
                },
                user: {
                    id: this.ancillaryMaster.signup.user.id,
                    userType: UserType.ANCILLARY,
                    userName: this.ancillaryform.value.email,
                    firstName: this.ancillaryform.value.firstName,
                    lastName: this.ancillaryform.value.lastName
                },
                contactInfo: {
                    id: this.ancillaryMaster.signup.contactInfo.id,
                    cellPhone: this.ancillaryform.value.phoneNo.replace(/\-/g, ''),
                    emailAddress: this.ancillaryform.value.email,
                    preferredCommunication: 1
                }
            })
        });
        this._progressBarService.show();
        result = this._ancillaryMasterStore.updateAncillary(provider);
        result.subscribe(
            (response) => {
                let notification = new Notification({
                    'title': 'Ancillary Service has been updated successfully!',
                    'type': 'SUCCESS',
                    'createdAt': moment()
                });
                this._notificationsStore.addNotification(notification);
                this._notificationsService.success('Welcome!', 'Ancillary Service has been updated successfully!.');
                this._router.navigate(['../../'], { relativeTo: this._route });
            },
            (error) => {
                let errString = 'Unable to update Ancillary Service.';
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
