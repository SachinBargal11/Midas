import { Observable } from 'rxjs/Rx';
import { Component, OnInit, ElementRef } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { SelectItem, LazyLoadEvent } from 'primeng/primeng';
import { ErrorMessageFormatter } from '../../../commons/utils/ErrorMessageFormatter';
import { AppValidators } from '../../../commons/utils/AppValidators';
import { DoctorLocationsStore } from '../stores/doctor-locations-store';
import { DoctorLocationScheduleStore } from '../stores/doctor-location-schedule-store';
import { LocationDetails } from '../models/location-details';
import { DoctorLocationSchedule } from '../models/doctor-location-schedule';
import { Location } from '../models/doctor-location';
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
    selector: 'add-doctor-location',
    templateUrl: './add-doctor-location.html'
})

export class AddDoctorLocationComponent implements OnInit {
    userId: number;
    schedule: Schedule;
    selectedLocation;
    locations: LocationDetails[];
    doctorLocations: DoctorLocationSchedule[];
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
        private _doctorLocationScheduleStore: DoctorLocationScheduleStore,
        private _progressBarService: ProgressBarService,
        private _notificationsService: NotificationsService,
        private _elRef: ElementRef
    ) {
        this._route.parent.parent.params.subscribe((routeParams: any) => {
            this.userId = parseInt(routeParams.userId);
        });
        this._progressBarService.show();
        let fetchLocations = this._doctorLocationsStore.getLocations();
        let fetchDoctorLocations = this._doctorLocationScheduleStore.getDoctorLocationScheduleByDoctorId(this.userId);

        Observable.forkJoin([fetchLocations, fetchDoctorLocations])
            .subscribe((results) => {
                let locations: LocationDetails[] = results[0];
                let doctorLocations: DoctorLocationSchedule[] = results[1];
                let doctorLocationIds: number[] = _.map(doctorLocations, (currentDoctorLocation: DoctorLocationSchedule) => {
                    return currentDoctorLocation.location.location.id;
                });
                let locationDetails = _.filter(locations, (currentLocation: LocationDetails) => {
                    return _.indexOf(doctorLocationIds, currentLocation.location.id) < 0 ? true : false;
                });
                this.locations = locationDetails.reverse();
                // let locationDetails = _.filter(locations, (currentLocation: LocationDetails) => {
                //     return _.indexOf(doctorLocationIds, currentLocation.location.id) < 0 ? true : false;
                // });
                // this.datasource = locationDetails.reverse();
                // this.totalRecords = this.datasource.length;
                // this.locations = this.datasource.slice(0, 10);
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
        // this._doctorLocationsStore.getLocations()
        //     .subscribe(
        //     (data) => {
        //         this.locations = data;
        //     },
        //     (error) => {
        //         this.locations = [];
        //         let notification = new Notification({
        //             'title': error.message,
        //             'type': 'ERROR',
        //             'createdAt': moment()
        //         });
        //         this._notificationsStore.addNotification(notification);
        //         this._notificationsService.error('Oh No!', error.message);
        //         this._progressBarService.hide();
        //     },
        //     () => {
        //         this._progressBarService.hide();
        //     });
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
        // let selectedLocations = [];
        // addlocationformValues.location.forEach(location => {
        //     selectedLocations.push({ 'id': parseInt(location) });
        // });
        let basicInfo = [];
        this.selectedLocations.forEach(element => {
            basicInfo.push(
                {
                    doctor: {
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
        // let basicInfo = new DoctorLocationSchedule({
        //     doctor: {
        //         id: this.userId
        //     },
        //     location: {
        //         id: parseInt(addlocationformValues.location)
        //     },
        //     schedule: {
        //         id: this.schedule.id
        //     }
        // });
        this._progressBarService.show();
        this.isSaveProgress = true;
        let result;

        result = this._doctorLocationScheduleStore.associateLocationsToDoctor(basicInfo);
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
