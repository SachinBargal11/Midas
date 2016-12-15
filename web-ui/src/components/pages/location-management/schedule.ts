import {Component, OnInit, ElementRef} from '@angular/core';
import {Validators, FormGroup, FormBuilder} from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';
import {SessionStore} from '../../../stores/session-store';
import {NotificationsStore} from '../../../stores/notifications-store';
import {Notification} from '../../../models/notification';
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
                    let scheduleId: number = locationDetails.location.schedule.id;
                    this._locationsService.getSchedule(scheduleId)
                            .subscribe(
                                (schedule: Schedule) =>{
                                    this.scheduleDetails = schedule.scheduleDetails;
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
                ThursdayFrom: [''],
                ThursdayTo: [''],
                Thursday: [''],
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
