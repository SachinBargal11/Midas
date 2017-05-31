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
import { StatesStore } from '../../../commons/stores/states-store';
import { AttorneyMasterStore } from '../../stores/attorney-store';
import { Contact } from '../../../commons/models/contact';
import { Address } from '../../../commons/models/address';
import { Attorney } from '../../models/attorney';
import { User } from '../../../commons/models/user';
import { PhoneFormatPipe } from '../../../commons/pipes/phone-format-pipe';
import { FaxNoFormatPipe } from '../../../commons/pipes/faxno-format-pipe';
// import { PatientsStore } from '../stores/PatientsStore';
import { Signup } from '../../models/signup';
import { UserType } from '../../../commons/models/enums/user-type';
import { PrefferedProvider } from '../../models/preffered-provider';

@Component({
    selector: 'edit-attorney',
    templateUrl: './edit-attorney.html'
})


export class EditAttorneyComponent implements OnInit {

    attorneyform: FormGroup;
    attorneyformControls;
    isSaveProgress = false;
    attorney: Attorney;
    isRegistrationInProgress = false;

    constructor(
        private fb: FormBuilder,
        private _router: Router,
        public _route: ActivatedRoute,
        private _statesStore: StatesStore,
        private _notificationsStore: NotificationsStore,
        private _progressBarService: ProgressBarService,
        private _notificationsService: NotificationsService,
        private _sessionStore: SessionStore,
        private _phoneFormatPipe: PhoneFormatPipe,
        private _faxNoFormatPipe: FaxNoFormatPipe,
        private _attorneyMasterStore: AttorneyMasterStore,
        private _elRef: ElementRef
    ) {

        this._sessionStore.userCompanyChangeEvent.subscribe(() => {
            this._router.navigate(['/account-setup/attorney']);
        });


        this._route.params.subscribe((routeParams: any) => {
            let attorneyId: number = parseInt(routeParams.id);
            this._progressBarService.show();
            let result = this._attorneyMasterStore.fetchAttorneyById(attorneyId);
            result.subscribe(
                (attorney: Attorney) => {
                    this.attorney = attorney;
                },
                (error) => {
                    this._router.navigate(['../../'], { relativeTo: this._route });
                    this._progressBarService.hide();
                },
                () => {
                    this._progressBarService.hide();
                });
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

    }

    updateAttorney() {
        this.isSaveProgress = true;
        let attorneyformValues = this.attorneyform.value;
        let result;
        let attorney = new Attorney({
            id: this.attorney.id,
            companyId: this._sessionStore.session.currentCompany.id,
            prefAttorneyProviderId: this.attorney.prefAttorneyProviderId,

            signup: new Signup({
                company: {
                    id: this.attorney.signup.company.id,
                    name: this.attorneyform.value.companyName,
                    taxId: this.attorneyform.value.taxId,
                    companyType: this.attorneyform.value.companyType,
                    subsCriptionType: this.attorneyform.value.subscriptionPlan
                },
                user: {
                    id: this.attorney.signup.user.id,
                    userType: UserType.STAFF,
                    userName: this.attorneyform.value.email,
                    firstName: this.attorneyform.value.firstName,
                    lastName: this.attorneyform.value.lastName
                },
                contactInfo: {
                    id: this.attorney.signup.contactInfo.id,
                    cellPhone: this.attorneyform.value.phoneNo.replace(/\-/g, ''),
                    emailAddress: this.attorneyform.value.email,
                    preferredCommunication: 1
                }
            })
        });
        result = this._attorneyMasterStore.updateAttorney(attorney);
        result.subscribe(
            (response) => {
                this._notificationsService.success('Welcome!', 'Preffered attorney has been updated successfully!.');
                this._router.navigate(['../../'], { relativeTo: this._route });
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
