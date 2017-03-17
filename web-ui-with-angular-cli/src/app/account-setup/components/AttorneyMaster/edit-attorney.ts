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

@Component({
    selector: 'edit-attorney',
    templateUrl: './edit-attorney.html'
})


export class EditAttorneyComponent implements OnInit {
    states: any[];
    cellPhone: string;
    faxNo: string;
    Cities: any[];
    attorney: Attorney;
    dateOfBirth: Date;
    minDate: Date;
    maxDate: Date;
    patientId: number;
    selectedCity='';
    isattorneyCitiesLoading = false;
    isSaveAttorneyProgress = false;


    attorneyform: FormGroup;
    attorneyformControls;
    isSaveProgress = false;
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

        this._route.parent.parent.params.subscribe((routeParams: any) => {
            this.patientId = parseInt(routeParams.patientId);
        });
        this._route.params.subscribe((routeParams: any) => {
            let attorneyId: number = parseInt(routeParams.id);
            this._progressBarService.show();
            let result = this._attorneyMasterStore.fetchAttorneyById(attorneyId);
            result.subscribe(
                (attorney: any) => {
                    
                    this.attorney = attorney.toJS();
                    this.dateOfBirth = this.attorney.user.dateOfBirth
                        ? this.attorney.user.dateOfBirth.toDate()
                        : null;
                    this.cellPhone = this._phoneFormatPipe.transform(this.attorney.user.contact.cellPhone);
                    this.faxNo = this._faxNoFormatPipe.transform(this.attorney.user.contact.faxNo);
                    this.selectedCity = attorney.user.address.city;
                    this.loadCities(attorney.user.address.state);
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
            firstname: ['', Validators.required],
            middlename: [''],
            lastname: ['', Validators.required],
            attorneyAddress: ['', Validators.required],
            dob: [''],
            gender: ['', Validators.required],
            attorneyAddress2: [''],
            attorneyState: [''],
            attorneyCity: [''],
            attorneyZipcode: [''],
            attorneyCountry: [''],
            attorneyEmail: ['', [Validators.required, AppValidators.emailValidator]],
            attorneyCellPhone: ['', [Validators.required, AppValidators.mobileNoValidator]],
            attorneyHomePhone: [''],
            attorneyWorkPhone: [''],
            attorneyFaxNo: [''],
        });


        this.attorneyformControls = this.attorneyform.controls;
    }
    ngOnInit() {
        let today = new Date();
        let currentDate = today.getDate();
        this.maxDate = new Date();
        this.maxDate.setDate(currentDate);
        this._statesStore.getStates()
            .subscribe(states => this.states = states);
        // this._statesStore.getStates()
        //     .subscribe(states => this.states = states);

        // this._statesStore.getStates()
        //     .subscribe(states => this.states = states);

    }

    selectState(event) {
        let currentState = event.target.value;
        if (currentState === this.attorney.user.address.state) {
            this.loadCities(currentState);
            this.selectedCity = this.attorney.user.address.city;
        } else {
            // this.loadCities(currentState);
            this.selectedCity = '';
        }
    }

    loadCities(stateName) {
        this.isattorneyCitiesLoading = true;
        if (stateName !== '') {
            this._statesStore.getCitiesByStates(stateName)
                .subscribe((cities) => { this.Cities = cities; },
                null,
                () => { this.isattorneyCitiesLoading = false; });
        } else {
            this.Cities = [];
            this.isattorneyCitiesLoading = false;
        }
    }


    save() {
        this.isSaveProgress = true;
        let attorneyformValues = this.attorneyform.value;
        let result;
        let attorney = new Attorney({
            id: this.attorney.id,
            companyId: this._sessionStore.session.currentCompany.id,
            user: new User({
                id: this.attorney.user.id,
                dateOfBirth: attorneyformValues.dob ? moment(attorneyformValues.dob) : null,
                firstName: attorneyformValues.firstname,
                middleName: attorneyformValues.middlename,
                lastName: attorneyformValues.lastname,
                userType: 3,
                userName: attorneyformValues.attorneyEmail,
                createByUserId: this._sessionStore.session.account.user.id,
                gender: attorneyformValues.gender,
                contact: new Contact({
                    cellPhone: attorneyformValues.attorneyCellPhone ? attorneyformValues.attorneyCellPhone.replace(/\-/g, '') : null,
                    emailAddress: attorneyformValues.attorneyEmail,
                    faxNo: attorneyformValues.attorneyFaxNo ? attorneyformValues.attorneyFaxNo.replace(/\-|\s/g, '') : null,
                    homePhone: attorneyformValues.attorneyHomePhone,
                    workPhone: attorneyformValues.attorneyWorkPhone,
                    createByUserId: this._sessionStore.session.account.user.id
                }),
                address: new Address({
                    address1: attorneyformValues.attorneyAddress,
                    address2: attorneyformValues.attorneyAddress2,
                    city: attorneyformValues.attorneyCity,
                    country: attorneyformValues.attorneyCountry,
                    state: attorneyformValues.attorneyState,
                    zipCode: attorneyformValues.attorneyZipcode,
                    createByUserId: this._sessionStore.session.account.user.id
                })
            })


        });
        this._progressBarService.show();
        result = this._attorneyMasterStore.updateAttorney(attorney);
        result.subscribe(
            (response) => {
                let notification = new Notification({
                    'title': 'Attorney updated successfully!',
                    'type': 'SUCCESS',
                    'createdAt': moment()
                });
                this._notificationsStore.addNotification(notification);
                this._router.navigate(['../../'], { relativeTo: this._route });
            },
            (error) => {
                let errString = 'Unable to updated attorney.';
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
