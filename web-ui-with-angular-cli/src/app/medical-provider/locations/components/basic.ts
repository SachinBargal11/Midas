import { Component, OnInit, ElementRef } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorMessageFormatter } from '../../../commons/utils/ErrorMessageFormatter';
import { AppValidators } from '../../../commons/utils/AppValidators';
import { Company } from '../../../account/models/company';
import { LocationsStore } from '../stores/locations-store';
import { LocationDetails } from '../models/location-details';
import { Location } from '../models/location';
import { Contact } from '../../../commons/models/contact';
import { Address } from '../../../commons/models/address';
import { SessionStore } from '../../../commons/stores/session-store';
import { NotificationsStore } from '../../../commons/stores/notifications-store';
import { Notification } from '../../../commons/models/notification';
import * as moment from 'moment';
import { StatesStore } from '../../../commons/stores/states-store';
import { LocationType } from '../models/enums/location-type';
import { ProgressBarService } from '../../../commons/services/progress-bar-service';
import { NotificationsService } from 'angular2-notifications';
import * as _ from 'underscore';

@Component({
    selector: 'basic',
    templateUrl: './basic.html'
})

export class BasicComponent implements OnInit {
    locationType: any;
    states: any[];
    cities: any[];
    options = {
        timeOut: 3000,
        showProgressBar: true,
        pauseOnHover: false,
        clickToClose: false,
        maxLength: 10
    };
    basicform: FormGroup;
    basicformControls;
    isSaveProgress = false;
    isCitiesLoading = false;
    selectedCity;
    handicapRamp;
    stairsToOffice;
    publicTransportNearOffice;
    locationDetails: LocationDetails = new LocationDetails({
        location: new Location({}),
        company: new Company({}),
        contact: new Contact({}),
        address: new Address({})
    });

    constructor(
        private _statesStore: StatesStore,
        private fb: FormBuilder,
        private _router: Router,
        public _route: ActivatedRoute,
        private _notificationsStore: NotificationsStore,
        private _sessionStore: SessionStore,
        private _locationsStore: LocationsStore,
        private _progressBarService: ProgressBarService,
        private _notificationsService: NotificationsService,
        private _elRef: ElementRef
    ) {
        this._route.parent.params.subscribe((params: any) => {
            let locationId = parseInt(params.locationId, 10);
            this._progressBarService.show();
            let result = this._locationsStore.getLocationById(locationId);
            result.subscribe(
                (locationDetails: LocationDetails) => {
                    this.locationDetails = locationDetails;
                    this.locationType = LocationType[locationDetails.location.locationType];
                    this.handicapRamp = locationDetails.location.handicapRamp.toString();
                    this.stairsToOffice = locationDetails.location.stairsToOffice.toString();
                    this.publicTransportNearOffice = locationDetails.location.publicTransportNearOffice.toString();
                },
                (error) => {
                    this._router.navigate(['/medical-provider/locations']);
                    this._progressBarService.hide();
                },
                () => {
                    this._progressBarService.hide();
                });

        });
        // this.id = parentActivatedRoute.params.map(routeParams => routeParams.id);
        this.basicform = this.fb.group({
            officeName: ['', Validators.required],
            address: ['', Validators.required],
            city: ['', Validators.required],
            state: ['', Validators.required],
            zipcode: ['', Validators.required],
            officePhone: ['', [Validators.required, AppValidators.mobileNoValidator]],
            fax: [''],
            officeType: ['', Validators.required],
            handicapRamp: [''],
            stairsToOffice: [''],
            publicTransportNearOffice: ['']
        });

        this.basicformControls = this.basicform.controls;
    }

    ngOnInit() {
        this._statesStore.getStates()
            // .subscribe(states => this.states = states);
            .subscribe(states =>
            // this.states = states);
            {
                let defaultLabel: any[] = [{
                    label: '-Select State-',
                    value: ''
                }]
                let allStates = _.map(states, (currentState: any) => {
                    return {
                        label: `${currentState.statetext}`,
                        value: currentState.statetext
                    };
                })
                this.states = _.union(defaultLabel, allStates);
            },
            (error) => {
            },
            () => {

            });
    }

    save() {
        let userId = this._sessionStore.session.user.id;
        let basicformValues = this.basicform.value;
        let basicInfo = new LocationDetails({
            location: new Location({
                id: this.locationDetails.location.id,
                name: basicformValues.officeName,
                locationType: parseInt(basicformValues.officeType),
                handicapRamp: parseInt(basicformValues.handicapRamp),
                stairsToOffice: parseInt(basicformValues.stairsToOffice),
                publicTransportNearOffice: parseInt(basicformValues.publicTransportNearOffice),
                updateByUserID: userId
            }),
            company: new Company({
                id: this.locationDetails.company.id
            }),
            contact: new Contact({
                faxNo: basicformValues.fax ? basicformValues.fax.replace(/\-|\s/g, '') : null,
                workPhone: basicformValues.officePhone ? basicformValues.officePhone.replace(/\-/g, '') : null,
                updateByUserID: userId
            }),
            address: new Address({
                address1: basicformValues.address,
                city: basicformValues.city,
                state: basicformValues.state,
                zipCode: basicformValues.zipcode,
                updateByUserID: userId
            })
        });
        this._progressBarService.show();
        this.isSaveProgress = true;
        let result;

        result = this._locationsStore.updateLocation(basicInfo);
        result.subscribe(
            (response) => {
                let notification = new Notification({
                    'title': 'Location updated successfully!',
                    'type': 'SUCCESS',
                    'createdAt': moment()
                });
                this._notificationsStore.addNotification(notification);
                this._notificationsService.success('Success', 'Location updated successfully!');
                // this._router.navigate(['/medical-provider/locations']);
            },
            (error) => {
                let errString = 'Unable to update location.';
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
