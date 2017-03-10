import { Observable } from 'rxjs/Rx';
import { ScheduleDetail } from '../../locations/models/schedule-detail';
import { ScheduleStore } from '../../locations/stores/schedule-store';
import { Component, OnInit, ElementRef } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorMessageFormatter } from '../../../commons/utils/ErrorMessageFormatter';
import { SessionStore } from '../../../commons/stores/session-store';
import { NotificationsStore } from '../../../commons/stores/notifications-store';
import * as moment from 'moment';
import * as _ from 'underscore';
import { DoctorLocationsStore } from '../stores/doctor-locations-store';
import { DoctorLocationScheduleStore } from '../stores/doctor-location-schedule-store';
import { DoctorsStore } from '../stores/doctors-store';
import { Doctor } from '../models/doctor';
import { DoctorLocationSchedule } from '../models/doctor-location-schedule';
import { LocationDetails } from '../models/location-details';
import { Schedule } from '../../locations/models/schedule';
import { Notification } from '../../../commons/models/notification';
import { AppValidators } from '../../../commons/utils/AppValidators';
import { ProgressBarService } from '../../../commons/services/progress-bar-service';
import { NotificationsService } from 'angular2-notifications';


@Component({
    selector: 'doctor-location-schedule',
    templateUrl: './doctor-location-schedule.html'
})

export class DoctorLocationScheduleComponent implements OnInit {
    schedules: Schedule[];
    userId: number;
    scheduleform: FormGroup;
    scheduleformControls;
    isSaveProgress = false;
    currentSchedule: Schedule = null;
    scheduleJS: any;
    doctorLocationScheduleDetail: DoctorLocationSchedule;
    locationDetails: LocationDetails;
    isInEditMode: boolean = false;
    saveAsNew: boolean = false;
    hightlightChange: boolean = false;
    isDefaultSchedule: boolean = false;


    constructor(
        private fb: FormBuilder,
        private _router: Router,
        public _route: ActivatedRoute,
        private _notificationsStore: NotificationsStore,
        private _sessionStore: SessionStore,
        private _doctorLocationsStore: DoctorLocationsStore,
        private _doctorLocationScheduleStore: DoctorLocationScheduleStore,
        private _doctorsStore: DoctorsStore,
        private _scheduleStore: ScheduleStore,
        private _progressBarService: ProgressBarService,
        private _notificationsService: NotificationsService,
        private _elRef: ElementRef
    ) {
        this._route.parent.parent.parent.params.subscribe((params: any) => {
            this.userId = parseInt(params.userId);
        });

        this._route.parent.params.subscribe((params: any) => {
            let scheduleId = parseInt(params.scheduleId, 10);
            this._progressBarService.show();
            let fetchSchedules = this._scheduleStore.getSchedules();
            let fetchDoctorLocationSchedule = this._doctorLocationScheduleStore.getDoctorLocationSchedule(scheduleId);

            Observable.forkJoin([fetchSchedules, fetchDoctorLocationSchedule])
                .subscribe((results) => {
                    this.doctorLocationScheduleDetail = results[1];
                    this._fetchScheduleWithDetails(this.doctorLocationScheduleDetail.schedule.id);
                },
                (error) => {
                    this._router.navigate(['../'], { relativeTo: this._route });
                    this._progressBarService.hide();
                },
                () => {
                    this._progressBarService.hide();
                });
        });
        this.scheduleform = this.fb.group({
            schedule: [],
            name: ['', [Validators.required]],
            scheduleDetails: this.fb.array([
            ])
        });

        this.scheduleformControls = this.scheduleform.controls;
    }

    private _fetchScheduleWithDetails(scheduleId: number): void {
        this._scheduleStore.fetchScheduleById(scheduleId)
            .subscribe(_.bind((schedule: Schedule) => {
                this.currentSchedule = schedule;
                if (this.currentSchedule.id === 1) {
                    this.isDefaultSchedule = true;
                } else {
                    this.isDefaultSchedule = false;
                }
                this.hightlightChange = true;
                setTimeout(() => {
                    this.hightlightChange = false;
                }, 1000);
            }, this));
    }

    private _populateScheduleDetailsInEditForm(): void {
        this.resetScheduleDetailsForm();
        let scheduleJS = _.extend(this.currentSchedule.toJS(), {
            scheduleDetails: _.map(this.currentSchedule.scheduleDetails, (scheduleDetail: ScheduleDetail) => {
                this.addScheduleDetails();
                return _.extend(scheduleDetail.toJS(), {
                    slotStart: scheduleDetail.slotStart.toDate(),
                    slotEnd: scheduleDetail.slotEnd.toDate()
                });
            })
        });
        if (this.saveAsNew) {
            scheduleJS.name = `${scheduleJS.name} - Copy`;
        }
        this.scheduleJS = scheduleJS;
    }

    enableSaveAsNew() {
        this.isInEditMode = true;
        this.saveAsNew = true;
        this._populateScheduleDetailsInEditForm();
    }

    enableEdit() {
        this.isInEditMode = true;
        this._populateScheduleDetailsInEditForm();
    }

    resetEditMode() {
        this.isInEditMode = false;
        this.saveAsNew = false;
    }

    selectSchedule(event) {
        let scheduleId = event.target.value;
        this._fetchScheduleWithDetails(scheduleId);
    }

    initScheduleDetails(): FormGroup {
        return this.fb.group({
            scheduleDetailId: [],
            dayofWeek: [],
            slotStart: [],
            slotEnd: [],
            scheduleStatus: []
        }, { validator: AppValidators.timeValidation('slotStart', 'slotEnd') });
    }

    addScheduleDetails(): void {
        const control: FormArray = <FormArray>this.scheduleform.controls['scheduleDetails'];
        control.push(this.initScheduleDetails());
    }

    resetScheduleDetailsForm() {
        const controls: FormArray = <FormArray>this.scheduleform.controls['scheduleDetails'];
        while (controls.length) {
            controls.removeAt(0);
        }
    }

    ngOnInit() {

        this._scheduleStore.getSchedulesByCompanyId()
            .subscribe((schedules) => {
                this.schedules = schedules;
            })

    }

    getScheduleDetails() {
        let scheduleFormValues = this.scheduleform.value;
        let scheduleDetails: ScheduleDetail[] = [];
        for (let scheduleDetail of scheduleFormValues.scheduleDetails) {
            let sd = new ScheduleDetail({
                id: this.saveAsNew ? 0 : scheduleDetail.scheduleDetailId,
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
        if (this.saveAsNew) {
            this.saveAsNewSchedule();
        } else {
            this.updateSchedule();
        }
    }

    // updateScheduleForLocation(schedule: Schedule) {
    //     return this._doctorLocationScheduleStore.updateScheduleForLocation(this.doctorLocationScheduleDetail, schedule);
    // }

    updateSchedule() {
        let scheduleFormValues = this.scheduleform.value;
        let scheduleDetails = this.getScheduleDetails();
        let schedule = new Schedule({
            name: scheduleFormValues.name,
            scheduleDetails: scheduleDetails,
            id: this.currentSchedule.id
        });
        this._progressBarService.show();
        this.isSaveProgress = true;
        let result;

        result = this._scheduleStore.updateSchedule(schedule).flatMap((schedule: Schedule) => {
            return this._doctorLocationScheduleStore.updateScheduleForLocation(this.doctorLocationScheduleDetail, schedule);
        });
        result.subscribe(
            (response) => {
                // this.updateScheduleForLocation(schedule);
                let notification = new Notification({
                    'title': 'Schedule updated successfully!',
                    'type': 'SUCCESS',
                    'createdAt': moment()
                });
                this._notificationsStore.addNotification(notification);
                this._router.navigate(['../../'], { relativeTo: this._route });
            },
            (error) => {
                this.isSaveProgress = false;
                let errString = 'Unable to update Schedule.';
                let notification = new Notification({
                    'messages': ErrorMessageFormatter.getErrorMessages(error, errString),
                    'type': 'ERROR',
                    'createdAt': moment()
                });
                this._notificationsStore.addNotification(notification);
                this._notificationsService.error('Oh No!', ErrorMessageFormatter.getErrorMessages(error, errString));
                this._progressBarService.hide();
            },
            () => {
                this.isSaveProgress = false;
                this._progressBarService.hide();
            });
    }


    saveAsNewSchedule() {
        let scheduleFormValues = this.scheduleform.value;
        let scheduleDetails = this.getScheduleDetails();
        let schedule = new Schedule({
            name: scheduleFormValues.name,
            scheduleDetails: scheduleDetails
        });
        this._progressBarService.show();
        this.isSaveProgress = true;
        let result;

        result = this._scheduleStore.addSchedule(schedule).flatMap((schedule: Schedule) => {
            return this._doctorLocationScheduleStore.updateScheduleForLocation(this.doctorLocationScheduleDetail, schedule);
        });
        result.subscribe(
            (response) => {
                // this.updateScheduleForLocation(schedule);
                let notification = new Notification({
                    'title': 'Schedule added successfully!',
                    'type': 'SUCCESS',
                    'createdAt': moment()
                });
                this._notificationsStore.addNotification(notification);
                this._router.navigate(['../../'], { relativeTo: this._route });
            },
            (error) => {
                this.isSaveProgress = false;
                let errString = 'Unable to add Schedule.';
                let notification = new Notification({
                    'messages': ErrorMessageFormatter.getErrorMessages(error, errString),
                    'type': 'ERROR',
                    'createdAt': moment()
                });
                this._notificationsStore.addNotification(notification);
                this._notificationsService.error('Oh No!', ErrorMessageFormatter.getErrorMessages(error, errString));
                this._progressBarService.hide();
            },
            () => {
                this.isSaveProgress = false;
                this._progressBarService.hide();
            });
    }

    enableAssign() {
        this._progressBarService.show();
        this.isSaveProgress = true;
        let result;

        result = this._doctorLocationScheduleStore.updateScheduleForLocation(this.doctorLocationScheduleDetail, this.currentSchedule);
        result.subscribe(
            (schedule) => {
                let notification = new Notification({
                    'title': 'Schedule updated successfully!',
                    'type': 'SUCCESS',
                    'createdAt': moment()
                });
                this._notificationsStore.addNotification(notification);
                // this._router.navigate(['../'], { relativeTo: this._route });
            },
            (error) => {
                this.isSaveProgress = false;
                let errString = 'Unable to update Schedule.';
                let notification = new Notification({
                    'messages': ErrorMessageFormatter.getErrorMessages(error, errString),
                    'type': 'ERROR',
                    'createdAt': moment()
                });
                this._notificationsStore.addNotification(notification);
                this._notificationsService.error('Oh No!', ErrorMessageFormatter.getErrorMessages(error, errString));
                this._progressBarService.hide();
            },
            () => {
                this.isSaveProgress = false;
                this._progressBarService.hide();
            });
    }


    getScheduleStatusLabel(scheduleStatus: number): string {
        return ScheduleDetail.getScheduleStatusLabel(scheduleStatus);
    }
}
