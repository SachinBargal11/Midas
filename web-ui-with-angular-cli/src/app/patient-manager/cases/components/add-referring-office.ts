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
import { Address } from '../../../commons/models/address';
import { ReferringOffice } from '../models/referring-office';
import { ReferringOfficeStore } from '../stores/referring-office-store';
import { PatientsStore } from '../../patients/stores/patients-store';
import { LocationDetails } from '../../../medical-provider/locations/models/location-details';
import { LocationsStore } from '../../../medical-provider/locations/stores/locations-store';
import { User } from '../../../commons/models/user';
import { UsersStore } from '../../../medical-provider/users/stores/users-store';

@Component({
    selector: 'add-referring-office',
    templateUrl: './add-referring-office.html'
})


export class AddReferringOfficeComponent implements OnInit {
    states: any[];
    cities: any[];
    caseId: number;
    selectedCity = 0;
    isCitiesLoading = false;
    locations: LocationDetails[];
    users: User[];
    referringOfficeform: FormGroup;
    referringOfficeformControls;
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
        private _referringOfficeStore: ReferringOfficeStore,
        private _patientsStore: PatientsStore,
        private _locationsStore: LocationsStore,
        private _usersStore: UsersStore,
        private _elRef: ElementRef
    ) {
        this._route.parent.parent.params.subscribe((routeParams: any) => {
            this.caseId = parseInt(routeParams.caseId, 10);
        });
        this.referringOfficeform = this.fb.group({
            refferingOfficeId: ['', Validators.required],
            refferingDoctorId: ['', Validators.required],
            npi: ['', Validators.required],
            isCurrentReffOffice: [1, Validators.required],
            address1: ['', Validators.required],
            address2: [''],
            state: [''],
            city: [''],
            zipcode: [''],
            country: ['']
        });

        this.referringOfficeformControls = this.referringOfficeform.controls;
    }
    ngOnInit() {
        this._statesStore.getStates()
            .subscribe(states => this.states = states);
        this._locationsStore.getLocations()
            .subscribe(locations => this.locations = locations);
        this._usersStore.getUsers()
            .subscribe((users) => {
                this.users = users;
                console.log(this.users[0].toJS());
            });
    }

    save() {
        this.isSaveProgress = true;
        let referringOfficeformValues = this.referringOfficeform.value;
        let result;
        let referringOffice = new ReferringOffice({
            caseId: this.caseId,
            refferingOfficeId: parseInt(referringOfficeformValues.refferingOfficeId, 10),
            refferingDoctorId: parseInt(referringOfficeformValues.refferingDoctorId, 10),
            npi: referringOfficeformValues.npi,
            isCurrentReffOffice: parseInt(referringOfficeformValues.isCurrentReffOffice, 10),
            addressInfo: new Address({
                address1: referringOfficeformValues.address1,
                address2: referringOfficeformValues.address2,
                city: referringOfficeformValues.city,
                country: referringOfficeformValues.state,
                state: referringOfficeformValues.state,
                zipCode: referringOfficeformValues.zipcode
            })
        });
        this._progressBarService.show();
        result = this._referringOfficeStore.addReferringOffice(referringOffice);
        result.subscribe(
            (response) => {
                let notification = new Notification({
                    'title': 'Referring Office added successfully!',
                    'type': 'SUCCESS',
                    'createdAt': moment()
                });
                this._notificationsStore.addNotification(notification);
                this._router.navigate(['../'], { relativeTo: this._route });
            },
            (error) => {
                let errString = 'Unable to add referring office.';
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
