import { ScheduleDetail } from '../../../models/schedule-detail';
import { ScheduleStore } from '../../../stores/schedule-store';
import { Component, OnInit, ElementRef } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { SessionStore } from '../../../stores/session-store';
import { NotificationsStore } from '../../../stores/notifications-store';
import moment from 'moment';
import { LocationsStore } from '../../../stores/locations-store';
import { LocationDetails } from '../../../models/location-details';
import { Schedule } from '../../../models/schedule';
import { Notification } from '../../../models/notification';
import { Location } from '../../../models/location';

@Component({
    selector: 'schedule',
    templateUrl: 'templates/pages/location-management/schedule.html',
    providers: [FormBuilder],
})

export class ScheduleComponent implements OnInit {
    options = {
        timeOut: 3000,
        showProgressBar: true,
        pauseOnHover: false,
        clickToClose: false
    };
    scheduleform: FormGroup;
    scheduleformControls;
    isSaveProgress = false;
    scheduleJS: any;
    testDate = moment().toDate();
    locationDetails: LocationDetails;

    constructor(
        private fb: FormBuilder,
        private _router: Router,
        public _route: ActivatedRoute,
        private _notificationsStore: NotificationsStore,
        private _sessionStore: SessionStore,
        private _locationsStore: LocationsStore,
        private _scheduleStore: ScheduleStore,
        private _elRef: ElementRef
    ) {
        this._route.parent.params.subscribe((params: any) => {
            let locationId = parseInt(params.locationId);
            let result = this._locationsStore.fetchLocationById(locationId);
            result.subscribe(
                (locationDetails: LocationDetails) => {
                    this.locationDetails = locationDetails;
                    let scheduleId: number = locationDetails.schedule.id;
                    this._scheduleStore.fetchScheduleById(scheduleId)
                        .subscribe(
                        (schedule: Schedule) => {
                            this.scheduleJS = schedule.toJS();
                            for (let scheduleDetail of schedule.scheduleDetails) {
                                this.addScheduleDetails(scheduleDetail);
                            }
                        });
                },
                (error) => {
                    this._router.navigate(['/medical-provider/locations']);
                },
                () => {
                });
        });
        this.scheduleform = this.fb.group({
            name: ['', [Validators.required]],
            scheduleDetails: this.fb.array([
            ])
        });

        this.scheduleformControls = this.scheduleform.controls;
    }

    initScheduleDetails(scheduleDetail: ScheduleDetail): FormGroup {
        return this.fb.group({
            dayofWeek: [],
            slotStart: [''],
            slotEnd: [''],
            scheduleStatus: ['']
        });
    }

    addScheduleDetails(scheduleDetail: ScheduleDetail): void {
        const control: FormArray = <FormArray>this.scheduleform.controls['scheduleDetails'];
        control.push(this.initScheduleDetails(scheduleDetail));
    }

    ngOnInit() {
    }


    save() {
        let scheduleFormValues = this.scheduleform.value;
        let scheduleDetails: ScheduleDetail[] = [];
        for (let scheduleDetail of scheduleFormValues.scheduleDetails) {
            let sd = new ScheduleDetail({
                dayofWeek: scheduleDetail.dayofWeek,
                slotStart: moment(scheduleDetail.slotStart),
                slotEnd: moment(scheduleDetail.slotEnd),
                scheduleStatus: scheduleDetail.scheduleStatus,
            });
            scheduleDetails.push(sd);
        }
        let schedule = new Schedule({
            name: scheduleFormValues.name,
            scheduleDetails: scheduleDetails
        });

        this.isSaveProgress = true;
        let result;

        result = this._scheduleStore.addSchedule(schedule, this.locationDetails);
        result.subscribe(
            (response) => {
                let notification = new Notification({
                    'title': 'Schedule added successfully!',
                    'type': 'SUCCESS',
                    'createdAt': moment()
                });
                this._notificationsStore.addNotification(notification);
                // this._router.navigate(['/rooms']);
            },
            (error) => {
                this.isSaveProgress = false;
                let errorBody = JSON.parse(error._body);
                let errorString = 'Unable to add Schedule.';
                if (errorBody.errorLevel === 2) {
                    if (errorBody.errorMessage) {
                        errorString = errorBody.errorMessage;
                    }
                } else {
                    // errorString = errorBody.errorMessage;
                    errorString = 'Unable to add Schedule.';
                }
                let notification = new Notification({
                    'title': errorString,
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
