import { ScheduleDetail } from '../../../models/schedule-detail';
import { ScheduleStore } from '../../../stores/schedule-store';
import { Component, OnInit, ElementRef } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorMessageFormatter } from '../../../utils/ErrorMessageFormatter';
import { SessionStore } from '../../../stores/session-store';
import { NotificationsStore } from '../../../stores/notifications-store';
import moment from 'moment';
import { LocationsStore } from '../../../stores/locations-store';
import { LocationDetails } from '../../../models/location-details';
import { Schedule } from '../../../models/schedule';
import { Notification } from '../../../models/notification';

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
    scheduleDetailJS: any = [];
    testDate = moment('11:00:00', 'hh:mm:ss').utc().toDate();
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
            console.log(this.testDate);
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
                                this.scheduleDetailJS.push(scheduleDetail.toJS());
                                this.addScheduleDetails(scheduleDetail);
                            }
                        });
                },
                (error) => {
                    this._router.navigate(['../'], { relativeTo: this._route });
                },
                () => {
                });
        });
        this.scheduleform = this.fb.group({
            schedule: [''],
            addAsNew: [''],
            name: ['', [Validators.required]],
            scheduleDetails: this.fb.array([
            ])
        });

        this.scheduleformControls = this.scheduleform.controls;
    }

    selectSchedule(event) {
        let scheduleId = event.target.value;
        this._scheduleStore.fetchScheduleById(scheduleId)
            .subscribe(
            (schedule: Schedule) => {
                this.scheduleJS = schedule.toJS();
                this.deleteScheduleDetails();
                for (let scheduleDetail of schedule.scheduleDetails) {
                    this.addScheduleDetails(scheduleDetail);
                }
            });
    }

    initScheduleDetails(scheduleDetail: ScheduleDetail): FormGroup {
        return this.fb.group({
            scheduleDetailId: [],
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

    deleteScheduleDetails() {
        const controls: FormArray = <FormArray>this.scheduleform.controls['scheduleDetails'];
        while (controls.length) {
            controls.removeAt(0);
        }
    }

    ngOnInit() {
        this._scheduleStore.getSchedules();
    }

    getScheduleDetails() {
        let scheduleFormValues = this.scheduleform.value;
        let scheduleDetails: ScheduleDetail[] = [];
        for (let scheduleDetail of scheduleFormValues.scheduleDetails) {
            let sd = new ScheduleDetail({
                id: scheduleFormValues.addAsNew ? 0 : scheduleDetail.scheduleDetailId,
                dayofWeek: scheduleDetail.dayofWeek,
                slotStart: scheduleDetail.scheduleStatus ? moment(scheduleDetail.slotStart) : null,
                slotEnd: scheduleDetail.scheduleStatus ? moment(scheduleDetail.slotEnd) : null,
                scheduleStatus: scheduleDetail.scheduleStatus,
            });
            scheduleDetails.push(sd);
        }
        return scheduleDetails;
    }

    submitSchedule() {
        let scheduleFormValues = this.scheduleform.value;
        if (scheduleFormValues.addAsNew) {
            this.saveAsNewSchedule();
        } else {
            this.updateSchedule();
        }
    }

    updateSchedule() {
        let scheduleFormValues = this.scheduleform.value;
        let scheduleDetails = this.getScheduleDetails();
        let schedule = new Schedule({
            name: scheduleFormValues.name,
            scheduleDetails: scheduleDetails,
            id: this.scheduleJS.id
        });
        this.isSaveProgress = true;
        let result;

        result = this._scheduleStore.updateSchedule(schedule, this.locationDetails);
        result.subscribe(
            (response) => {
                let notification = new Notification({
                    'title': 'Schedule updated successfully!',
                    'type': 'SUCCESS',
                    'createdAt': moment()
                });
                this._notificationsStore.addNotification(notification);
                this._router.navigate(['../'], { relativeTo: this._route });
            },
            (error) => {
                this.isSaveProgress = false;
                let errString = 'Unable to update Schedule.';
                let notification = new Notification({
                    'title': ErrorMessageFormatter.getErrorMessages(error, errString),
                    'type': 'ERROR',
                    'createdAt': moment()
                });
                this._notificationsStore.addNotification(notification);
            },
            () => {
                this.isSaveProgress = false;
            });
    }


    saveAsNewSchedule() {
        let scheduleFormValues = this.scheduleform.value;
        let scheduleDetails = this.getScheduleDetails();
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
                this._router.navigate(['../'], { relativeTo: this._route });
            },
            (error) => {
                this.isSaveProgress = false;
                let errString = 'Unable to add Schedule.';
                let notification = new Notification({
                    'title': ErrorMessageFormatter.getErrorMessages(error, errString),
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
