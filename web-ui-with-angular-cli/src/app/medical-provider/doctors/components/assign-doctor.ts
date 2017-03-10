
import { Component, OnInit, ElementRef } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { SelectItem } from 'primeng/primeng';
import { ErrorMessageFormatter } from '../../../commons/utils/ErrorMessageFormatter';
import { AppValidators } from '../../../commons/utils/AppValidators';
import { DoctorsStore } from '../../users/stores/doctors-store';
// import { LocationDetails } from '../models/doctor-location-details';
import { Doctor } from '../../users/models/doctor';
import { Company } from '../../../account/models/company';
import { Contact } from '../../../commons/models/contact';
import { Address } from '../../../commons/models/address';
import { States } from '../../../commons/models/states';
import { Cities } from '../../../commons/models/cities';
import { SessionStore } from '../../../commons/stores/session-store';
import { NotificationsStore } from '../../../commons/stores/notifications-store';
import { Notification } from '../../../commons/models/notification';
import * as moment from 'moment';
import * as _ from 'underscore';
import { StatesStore } from '../../../commons/stores/states-store';
import { ProgressBarService } from '../../../commons/services/progress-bar-service';
import { NotificationsService } from 'angular2-notifications';
import { DoctorLocationScheduleStore } from '../../users/stores/doctor-location-schedule-store';
import { DoctorLocationSchedule } from '../../users/models/doctor-location-schedule';
import { LocationsStore } from '../../locations/stores/locations-store';
import { ScheduleStore } from '../../locations/stores/schedule-store';
import { LocationDetails } from '../../locations/models/location-details';
import { Schedule } from '../../locations/models/schedule';


@Component({
    selector: 'assign-doctor',
    templateUrl: './assign-doctor.html'
})

export class AssignDoctorComponent implements OnInit {
    locationId: number;
    schedule: Schedule;
    selectedLocation;
    doctors: Doctor[];
    doctorsArr: SelectItem[] = [];
    selectedDoctors: Doctor[] = [];
    currentSchedule: Schedule;
    location: LocationDetails;

    assigndoctorform: FormGroup;
    assigndoctorformControls;
    isSaveProgress = false;
    isCitiesLoading = false;

    constructor(
        private _statesStore: StatesStore,
        private fb: FormBuilder,
        private _router: Router,
        public _route: ActivatedRoute,
        private _notificationsStore: NotificationsStore,
        private _sessionStore: SessionStore,
        private _doctorsStore: DoctorsStore,
        private _scheduleStore: ScheduleStore,
        private _locationStore: LocationsStore,
        private _progressBarService: ProgressBarService,
        private _notificationsService: NotificationsService,
        private _elRef: ElementRef,
        private _doctorLocationScheduleStore: DoctorLocationScheduleStore,
    ) {
        this._route.parent.parent.params.subscribe((routeParams: any) => {
            this.locationId = parseInt(routeParams.locationId);
            this._progressBarService.show();
            this._locationStore.getLocationById(this.locationId)
                .subscribe(
                (data) => {
                    this.location = data;
                    let scheduleId: number = this.location.schedule.id;
                    this._fetchScheduleWithDetails(scheduleId);

                },
                (error) => {
                    this.doctors = [];
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
        });
        this._progressBarService.show();
        this._doctorsStore.getDoctors()
            .subscribe(
            (data) => {
                this.doctors = data;
                // this.doctorsArr = _.map(this.doctors, (currentDoctor: Doctor) => {
                //         return {
                //             label: `${currentDoctor.user.firstName} - ${currentDoctor.user.lastName}`,
                //             value: currentDoctor.id.toString()
                //         };
                //     });
            },
            (error) => {
                this.doctors = [];
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
        this.assigndoctorform = this.fb.group({
            doctors: ['', Validators.required]
        });

        this.assigndoctorformControls = this.assigndoctorform.controls;
    }

    private _fetchScheduleWithDetails(scheduleId: number): void {
        this._scheduleStore.fetchScheduleById(scheduleId)
            .subscribe(_.bind((schedule: Schedule) => {
                this.currentSchedule = schedule;

            }, this));
    }

    ngOnInit() {
    }

    save() {
        let assigndoctorformValues = this.assigndoctorform.value;
        let selectedDoctors = [];
        let basicInfo = [];
        this.selectedDoctors.forEach(element => {
            basicInfo.push(
                {
                    doctor: {
                        id: element.id
                    },
                    location: {
                        id: this.locationId
                    },
                    schedule: {
                        id: this.currentSchedule.id
                    }
                });
        });
        // let basicInfo = new DoctorLocationSchedule({
        //     doctor: {
        //         id: parseInt(assigndoctorformValues.doctors)
        //     },
        //     location: {
        //         id: this.locationId
        //     },
        //     schedule: {
        //         id: this.currentSchedule.id
        //     }
        // });
        this._progressBarService.show();
        this.isSaveProgress = true;
        let result;

        // result = this._doctorLocationScheduleStore.addDoctorLocationSchedule(basicInfo);
        result = this._doctorLocationScheduleStore.associateDoctorsToLocation(basicInfo);
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
