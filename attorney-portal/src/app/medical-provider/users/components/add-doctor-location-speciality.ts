import { DoctorSpeciality } from '../models/doctor-speciality';
import { Observable } from 'rxjs/Rx';
import { Component, OnInit, ElementRef } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { SelectItem, LazyLoadEvent } from 'primeng/primeng';
import { ErrorMessageFormatter } from '../../../commons/utils/ErrorMessageFormatter';
import { AppValidators } from '../../../commons/utils/AppValidators';
import { DoctorLocationsStore } from '../stores/doctor-locations-store';
import { DoctorsStore } from '../stores/doctors-store';
import { DoctorLocationScheduleStore } from '../stores/doctor-location-schedule-store';
import { DoctorLocationSpecialityStore } from '../stores/doctor-location-speciality-store';
import { LocationDetails } from '../models/location-details';
import { DoctorLocationSchedule } from '../models/doctor-location-schedule';
import { DoctorLocationSpeciality } from '../models/doctor-location-speciality';
import { Location } from '../models/doctor-location';
import { Doctor } from '../models/doctor';
import { Speciality } from '../../../account-setup/models/speciality';
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
    selector: 'add-doctor-location-speciality',
    templateUrl: './add-doctor-location-speciality.html'
})

export class AddDoctorLocationSpecialityComponent implements OnInit {
    userId: number;
    scheduleId: number;
    locationId: number;
    selectedSpecialities: any[] = [];
    schedule: Schedule;
    selectedLocation;
    locations: LocationDetails[];
    doctorLocations: DoctorLocationSchedule[];
    locationsArr: SelectItem[] = [];
    selectedLocations: LocationDetails[] = [];

    datasource: LocationDetails[];
    totalRecords: number;
    assignSpecialityForm: FormGroup;
    assignSpecialityFormControls;
    isSaveProgress = false;

    constructor(
        private _statesStore: StatesStore,
        private fb: FormBuilder,
        private _router: Router,
        public _route: ActivatedRoute,
        private _notificationsStore: NotificationsStore,
        private _sessionStore: SessionStore,
        private _doctorLocationsStore: DoctorLocationsStore,
        private _doctorsStore: DoctorsStore,
        private _doctorLocationSpecialityStore: DoctorLocationSpecialityStore,
        private _doctorLocationScheduleStore: DoctorLocationScheduleStore,
        private _progressBarService: ProgressBarService,
        private _notificationsService: NotificationsService,
        private _elRef: ElementRef
    ) {
        this._route.parent.parent.parent.params.subscribe((routeParams: any) => {
            this.userId = parseInt(routeParams.userId);
        });
        this._route.parent.params.subscribe((routeParams: any) => {
            this.scheduleId = parseInt(routeParams.scheduleId);
        });
        this._progressBarService.show();
        let fetchDoctor = this._doctorsStore.fetchDoctorById(this.userId);
        let fetchDoctorSpecialities = this._doctorLocationSpecialityStore.getDoctorLocationSpecialityByDoctorId(this.userId);
        let fetchDoctorLocations = this._doctorLocationScheduleStore.getDoctorLocationSchedule(this.scheduleId);

        Observable.forkJoin([fetchDoctor, fetchDoctorSpecialities, fetchDoctorLocations])
            .subscribe((results) => {
                let doctor: Doctor = results[0];
                let doctorsSpeciality: DoctorSpeciality[] = doctor.doctorSpecialities;
                let doctorLocationSpeciality: DoctorLocationSpeciality[] = results[1];
                let doctorLocationSchedule: DoctorLocationSchedule = results[2];
                this.locationId = doctorLocationSchedule.location.location.id;
                let doctorLocationSpecialityIds: number[] = _.map(doctorLocationSpeciality, (currentDoctorLocationSpeciality: DoctorLocationSpeciality) => {
                    return currentDoctorLocationSpeciality.speciality.id;
                });
                this.selectedSpecialities = doctorLocationSpecialityIds;
                // let doctorsSpecialityIds: number[] = _.map(doctorsSpeciality, (currentDoctorSpeciality: any) => {
                //     return currentDoctorSpeciality.specialty.id;
                // });
                // this.selectedSpecialities = _.map(doctorsSpeciality, (currentDoctorsSpeciality: any) => {
                //     return currentDoctorsSpeciality.specialty.id.toString();
                // });
                // this.selectedSpecialities = _.union(doctorLocationSpecialityIds, doctorsSpecialityIds );
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
        this.assignSpecialityForm = this.fb.group({
            speciality: ['', Validators.required]
        });

        this.assignSpecialityFormControls = this.assignSpecialityForm.controls;
    }

    ngOnInit() {
    }

    save() {
        let assignSpecialityFormValues = this.assignSpecialityForm.value;
        // let selectedLocations = [];
        // assignSpecialityFormValues.location.forEach(location => {
        //     selectedLocations.push({ 'id': parseInt(location) });
        // });
        let basicInfo = [];
        this.selectedSpecialities.forEach(currentSpeciality => {
            basicInfo.push(
                {
                    doctor: {
                        id: this.userId
                    },
                    location: {
                        id: this.locationId
                    },
                    speciality: {
                        id: parseInt(currentSpeciality)
                    }
                });
        });
        this._progressBarService.show();
        this.isSaveProgress = true;
        let result;

        result = this._doctorLocationSpecialityStore.associateLocationToDoctors(basicInfo);
        result.subscribe(
            (response) => {
                let notification = new Notification({
                    'title': 'Speciality added successfully!',
                    'type': 'SUCCESS',
                    'createdAt': moment()
                });
                this._notificationsStore.addNotification(notification);
                this._router.navigate(['../../'], { relativeTo: this._route });
            },
            (error) => {
                let errString = 'Unable to add speciality.';
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
