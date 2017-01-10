import { Observable } from 'rxjs/Rx';
import { ScheduleDetail } from '../../../models/schedule-detail';
import { ScheduleStore } from '../../../stores/schedule-store';
import { Component, OnInit, ElementRef } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorMessageFormatter } from '../../../utils/ErrorMessageFormatter';
import { SessionStore } from '../../../stores/session-store';
import { NotificationsStore } from '../../../stores/notifications-store';
import moment from 'moment';
import _ from 'underscore';
import { LocationsStore } from '../../../stores/locations-store';
import { LocationDetails } from '../../../models/location-details';
import { Schedule } from '../../../models/schedule';
import { Notification } from '../../../models/notification';
import { AppValidators } from '../../../utils/AppValidators';
import { ProgressBarService } from '../../../services/progress-bar-service';

@Component({
    selector: 'schedule',
    templateUrl: 'templates/pages/location-management/schedule.html'
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
    currentSchedule: Schedule = null;
    scheduleJS: any;
    locationDetails: LocationDetails;
    isInEditMode: boolean = false;
    saveAsNew: boolean = false;
    hightlightChange: boolean = false;


    constructor(
        private fb: FormBuilder,
        private _router: Router,
        public _route: ActivatedRoute,
        private _notificationsStore: NotificationsStore,
        private _sessionStore: SessionStore,
        private _locationsStore: LocationsStore,
        private _scheduleStore: ScheduleStore,
        private _progressBarService: ProgressBarService,
        private _elRef: ElementRef
    ) {

        this._route.parent.params.subscribe((params: any) => {
            let locationId = parseInt(params.locationId);
            this._progressBarService.show();
            let fetchSchedules = this._scheduleStore.getSchedules();
            let fetchLocation = this._locationsStore.getLocationById(locationId);

            Observable.forkJoin([fetchSchedules, fetchLocation])
                .subscribe((results) => {
                    this.locationDetails = results[1];
                    let scheduleId: number = this.locationDetails.schedule.id;
                    this._fetchScheduleWithDetails(scheduleId);
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
                    'messages': ErrorMessageFormatter.getErrorMessages(error, errString),
                    'type': 'ERROR',
                    'createdAt': moment()
                });
                this._notificationsStore.addNotification(notification);
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
                    'messages': ErrorMessageFormatter.getErrorMessages(error, errString),
                    'type': 'ERROR',
                    'createdAt': moment()
                });
                this._notificationsStore.addNotification(notification);
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
