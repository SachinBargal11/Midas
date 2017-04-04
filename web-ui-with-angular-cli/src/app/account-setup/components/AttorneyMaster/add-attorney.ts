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
// import { PatientsStore } from '../stores/PatientsStore';

@Component({
    selector: 'add-attorney',
    templateUrl: './add-attorney.html'
})


export class AddAttorneyComponent implements OnInit {
    states: any[];
    Cities: any[];
    minDate: Date;
    maxDate: Date;
    patientId: number;
    selectedCity = 0;
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
        private _attorneyMasterStore: AttorneyMasterStore,
        private _elRef: ElementRef
    ) {

          this._sessionStore.userCompanyChangeEvent.subscribe(() => {
            this._router.navigate(['/account-setup/attorney']);
        });

        this._route.parent.parent.params.subscribe((routeParams: any) => {
            this.patientId = parseInt(routeParams.patientId);
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
            attorneyalternateEmail:  ['', [AppValidators.emailValidator]],
            attorneyofficeExtension: [''],
            attorneypreferredcommunication: ['']
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
        this._statesStore.getStates()
            .subscribe(states => this.states = states);

    }

    selectState(event) {
        this.selectedCity = 0;
        let currentState = event.target.value;
        // this.loadCities(currentState);
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
            companyId: this._sessionStore.session.currentCompany.id,
            user: new User({
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
                    //officeExtension: attorneyformValues.officeExtension,
                    //alternateEmail: attorneyformValues.alternateEmail,
                    //preferredcommunication: attorneyformValues.preferredcommunication,
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
        result = this._attorneyMasterStore.addAttorney(attorney);
        result.subscribe(
            (response) => {
                let notification = new Notification({
                    'title': 'Attorney added successfully!',
                    'type': 'SUCCESS',
                    'createdAt': moment()
                });
                this._notificationsStore.addNotification(notification);
                this._router.navigate(['../'], { relativeTo: this._route });
            },
            (error) => {
                let errString = 'Unable to add attorney.';
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
