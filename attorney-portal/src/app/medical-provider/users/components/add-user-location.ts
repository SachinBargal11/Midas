import { Observable } from 'rxjs/Rx';
import { Component, OnInit, ElementRef } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { SelectItem, LazyLoadEvent } from 'primeng/primeng';
import { ErrorMessageFormatter } from '../../../commons/utils/ErrorMessageFormatter';
import { AppValidators } from '../../../commons/utils/AppValidators';
import { DoctorLocationsStore } from '../stores/doctor-locations-store';
import { UserLocationScheduleStore } from '../stores/user-location-schedule-store';
import { LocationDetails } from '../models/location-details';
import { UserLocationSchedule } from '../models/user-location-schedule';
import { UserLocation } from '../models/user-location';
import { Company } from '../../../account/models/company';
import { Contact } from '../../../commons/models/contact';
import { Address } from '../../../commons/models/address';
import { States } from '../../../commons/models/states';
import { Cities } from '../../../commons/models/cities';
import { SessionStore } from '../../../commons/stores/session-store';
import { NotificationsStore } from '../../../commons/stores/notifications-store';
import { Notification } from '../../../commons/models/notification';
import { Schedule } from '../../rooms/models/rooms-schedule';
import * as moment from 'moment';
import * as _ from 'underscore';
import { StatesStore } from '../../../commons/stores/states-store';
import { ProgressBarService } from '../../../commons/services/progress-bar-service';
import { NotificationsService } from 'angular2-notifications';

@Component({
    selector: 'add-user-location',
    templateUrl: './add-user-location.html'
})

export class AddUserLocationComponent implements OnInit {
    userId: number;
    schedule: Schedule;
    selectedLocation;
    locations: LocationDetails[];
    attorneyLocations: UserLocationSchedule[];
    locationsArr: SelectItem[] = [];
    selectedLocations: LocationDetails[] = [];

    datasource: LocationDetails[];
    totalRecords: number;
    addlocationform: FormGroup;
    addlocationformControls;
    isSaveProgress = false;
    isCitiesLoading = false;

    constructor(
        private _statesStore: StatesStore,
        private fb: FormBuilder,
        private _router: Router,
        public _route: ActivatedRoute,
        private _notificationsStore: NotificationsStore,
        private _sessionStore: SessionStore,
        private _doctorLocationsStore: DoctorLocationsStore,
        private _userLocationScheduleStore: UserLocationScheduleStore,
        private _progressBarService: ProgressBarService,
        private _notificationsService: NotificationsService,
        private _elRef: ElementRef
    ) {
        this._route.parent.parent.params.subscribe((routeParams: any) => {
            this.userId = parseInt(routeParams.userId);
        });
        this._progressBarService.show();
        let fetchLocations = this._doctorLocationsStore.getLocations();
        let fetchAttorneyLocations = this._userLocationScheduleStore.getUserLocationScheduleByUserId(this.userId);

        Observable.forkJoin([fetchLocations, fetchAttorneyLocations])
            .subscribe((results) => {
                let locations: LocationDetails[] = results[0];
                let attorneyLocations: UserLocationSchedule[] = results[1];
                let userLocationIds: number[] = _.map(attorneyLocations, (currentUserLocation: UserLocationSchedule) => {
                    return currentUserLocation.location.location.id;
                });
                let locationDetails = _.filter(locations, (currentLocation: LocationDetails) => {
                    return _.indexOf(userLocationIds, currentLocation.location.id) < 0 ? true : false;
                });
                this.locations = locationDetails.reverse();
            },
            (error) => {
                this.locations = [];
                let notification = new Notification({
                    'title': error.message,
                    'type': 'ERROR',
                    'createdAt': moment()
                });
                this._notificationsStore.addNotification(notification);
                this._notificationsService.error('Oh No!', error.message);
                this._progressBarService.hide();
            },
            () => {
                this._progressBarService.hide();
            });
        
        this.addlocationform = this.fb.group({
            location: ['', Validators.required]
        });

        this.addlocationformControls = this.addlocationform.controls;
    }

    ngOnInit() {
    }

    loadLocationsLazy(event: LazyLoadEvent) {
        setTimeout(() => {
            if(this.datasource) {
                this.locations = this.datasource.slice(event.first, (event.first + event.rows));
            }
        }, 250);
    }
    selectLocation(event) {
        let currentLocation = event.target.value;
        this.loadSchedule(currentLocation);
    }
    loadSchedule(locationId) {
        this._doctorLocationsStore.getLocationById(locationId)
            .subscribe((location) => { this.schedule = location.schedule; });
    }

    save() {
        let addlocationformValues = this.addlocationform.value;
        let basicInfo = [];
        this.selectedLocations.forEach(element => {
            basicInfo.push(
                {
                    user: {
                        id: this.userId
                    },
                    location: {
                        id: element.location.id
                    },
                    schedule: {
                        id: element.schedule.id
                    }
                });
        });
        this._progressBarService.show();
        this.isSaveProgress = true;
        let result;

        result = this._userLocationScheduleStore.associateLocationsToUser(basicInfo);
        result.subscribe(
            (response) => {
                let notification = new Notification({
                    'title': 'Location added successfully!',
                    'type': 'SUCCESS',
                    'createdAt': moment()
                });
                this._notificationsStore.addNotification(notification);
                this._router.navigate(['../'], { relativeTo: this._route });
            },
            (error) => {
                let errString = 'Unable to add location.';
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
