import { Component, OnInit, ElementRef } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AppValidators } from '../../../utils/AppValidators';
import { Company } from '../../../models/company';
import { LocationsStore } from '../../../stores/locations-store';
import { LocationDetails } from '../../../models/location-details';
import { Location } from '../../../models/location';
import { Contact } from '../../../models/contact';
import { Address } from '../../../models/address';
import { SessionStore } from '../../../stores/session-store';
import { NotificationsStore } from '../../../stores/notifications-store';
import { Notification } from '../../../models/notification';
import moment from 'moment';
import { StatesStore } from '../../../stores/states-store';
import { StateService } from '../../../services/state-service';
import { LocationType } from '../../../models/enums/location-type';

@Component({
    selector: 'basic',
    templateUrl: 'templates/pages/location-management/basic.html',
    providers: [StateService, StatesStore, FormBuilder],
})

export class BasicComponent implements OnInit {
    locationType: any;
    states: any[];
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
        private _elRef: ElementRef
    ) {
        this._route.parent.params.subscribe((params: any) => {
            let locationId = parseInt(params.locationId);
            let result = this._locationsStore.fetchLocationById(locationId);
            result.subscribe(
                (locationDetails: LocationDetails) => {
                    this.locationDetails = locationDetails;
                    this.locationType = LocationType[locationDetails.location.locationType];
                },
                (error) => {
                    this._router.navigate(['/medical-provider/locations']);
                },
                () => {
                });

        });
        // this.id = parentActivatedRoute.params.map(routeParams => routeParams.id);
        this.basicform = this.fb.group({
            officeName: ['', Validators.required],
            address: [''],
            city: ['', Validators.required],
            state: ['', Validators.required],
            zipcode: ['', Validators.required],
            officePhone: ['', [Validators.required, AppValidators.mobileNoValidator]],
            fax: ['', Validators.required],
            officeType: ['', Validators.required]
        });

        this.basicformControls = this.basicform.controls;
    }

    ngOnInit() {
    }


    save() {
        let userId = this._sessionStore.session.user.id;
        let basicformValues = this.basicform.value;
        let basicInfo = new LocationDetails({
            location: new Location({
                id: this.locationDetails.location.id,
                name: basicformValues.officeName,
                locationType: parseInt(basicformValues.officeType),
                updateByUserID: userId
            }),
            company: new Company({
                id: this.locationDetails.company.id
                // id: 1
            }),
            contact: new Contact({
                faxNo: basicformValues.fax,
                workPhone: basicformValues.officePhone,
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
                this._router.navigate(['/medical-provider/locations']);
            },
            (error) => {
                let notification = new Notification({
                    'title': 'Unable to update location.',
                    'type': 'ERROR',
                    'createdAt': moment()
                });
                this._notificationsStore.addNotification(notification);
            },
            () => {
                this.isSaveProgress = false;
            });
    }

}
