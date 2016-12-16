import { Component, OnInit, ElementRef } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { SessionStore } from '../../../stores/session-store';
import { NotificationsStore } from '../../../stores/notifications-store';
import { Notification } from '../../../models/notification';
import moment from 'moment';
import { LocationsStore } from '../../../stores/locations-store';
import { LocationsService } from '../../../services/locations-service';
import { LocationDetails } from '../../../models/location-details';
import { Schedule } from '../../../models/schedule';
import { ScheduleDetails } from '../../../models/schedule-details';

@Component({
    selector: 'schedule',
    templateUrl: 'templates/pages/location-management/schedule.html',
    providers: [FormBuilder],
})

export class ScheduleComponent implements OnInit {
    monday = new ScheduleDetails({});
    tuesday = new ScheduleDetails({});
    wednesday = new ScheduleDetails({});
    thursday = new ScheduleDetails({});
    friday = new ScheduleDetails({});
    saturday = new ScheduleDetails({});
    sunday = new ScheduleDetails({});
    locationDetails = new LocationDetails({});
    scheduleDetails = new ScheduleDetails({});
    scheduleId: any;
    options = {
        timeOut: 3000,
        showProgressBar: true,
        pauseOnHover: false,
        clickToClose: false
    };
    scheduleform: FormGroup;
    scheduleformControls;
    isSaveProgress = false;
    scheduleDetailsJS;

    constructor(
        private fb: FormBuilder,
        private _router: Router,
        public _route: ActivatedRoute,
        private _notificationsStore: NotificationsStore,
        private _sessionStore: SessionStore,
        private _locationsStore: LocationsStore,
        private _locationsService: LocationsService,
        private _elRef: ElementRef
    ) {
        this._route.parent.params.subscribe((params: any) => {
            let locationId = parseInt(params.locationId);
            let result = this._locationsStore.fetchLocationById(locationId);
            result.subscribe(
                (locationDetails: LocationDetails) => {
                    this.locationDetails = locationDetails;
                    // let scheduleId: number = locationDetails.location.schedule.id;
                    let scheduleId = 1;
                    this._locationsService.getSchedule(scheduleId)
                        .subscribe(
                        (schedule: Schedule) => {
                            this.scheduleDetails = schedule.scheduleDetails;
                            // this.scheduleDetailsJS = this.scheduleDetails.toJS();
                            this.monday = this.scheduleDetails[0];
                            this.tuesday = this.scheduleDetails[1];
                            this.wednesday = this.scheduleDetails[2];
                            this.thursday = this.scheduleDetails[3];
                            this.friday = this.scheduleDetails[4];
                            this.saturday = this.scheduleDetails[5];
                            this.sunday = this.scheduleDetails[6];
                        });
                },
                (error) => {
                    this._router.navigate(['/medical-provider/locations']);
                },
                () => {
                });
        });
        this.scheduleform = this.fb.group({
            sundayFrom: [''],
            sundayTo: [''],
            sunday: [''],
            mondayFrom: [''],
            mondayTo: [''],
            monday: [''],
            tuesdayFrom: [''],
            tuesdayTo: [''],
            tuesday: [''],
            wednesdayFrom: [''],
            wednesdayTo: [''],
            wednesday: [''],
            thursdayFrom: [''],
            thursdayTo: [''],
            thursday: [''],
            fridayFrom: [''],
            fridayTo: [''],
            friday: [''],
            saturdayFrom: [''],
            saturdayTo: [''],
            saturday: [''],
        });
        this.scheduleformControls = this.scheduleform.controls;
    }

    ngOnInit() {
    }


    save() {
    }

}
