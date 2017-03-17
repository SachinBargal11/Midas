// import { Company } from '../../../models/company';
import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { LazyLoadEvent } from 'primeng/primeng'
import { ErrorMessageFormatter } from '../../../commons/utils/ErrorMessageFormatter';
import { SessionStore } from '../../../commons/stores/session-store';
import { UsersStore } from '../../users/stores/users-store';
// import { Account } from '../../../models/account';
import { User } from '../../../commons/models/user';
// import { UserRole } from '../../../commons/models/user-role';
import { NotificationsStore } from '../../../commons/stores/notifications-store';
import { Notification } from '../../../commons/models/notification';
import * as moment from 'moment';
import { ProgressBarService } from '../../../commons/services/progress-bar-service';
import { NotificationsService } from 'angular2-notifications';
import { DoctorLocationScheduleStore } from '../../users/stores/doctor-location-schedule-store';
import { DoctorLocationSchedule } from '../../users/models/doctor-location-schedule';


@Component({
    selector: 'doctors-list',
    templateUrl: './doctors-list.html'
})


export class DoctorsListComponent implements OnInit {
    selectedDoctors: DoctorLocationSchedule[];
    doctors: DoctorLocationSchedule[];
    datasource: DoctorLocationSchedule[];
    totalRecords: number;
    locationId: number;
    constructor(
        private _router: Router,
        private _route: ActivatedRoute,
        private _usersStore: UsersStore,
        private _notificationsStore: NotificationsStore,
        private _sessionStore: SessionStore,
        private _notificationsService: NotificationsService,
        private _progressBarService: ProgressBarService,
        private _doctorLocationScheduleStore: DoctorLocationScheduleStore
    ) {
        this._sessionStore.userCompanyChangeEvent.subscribe(() => {
            this.loadDoctors();
        });
        this._route.parent.parent.params.subscribe((routeParams: any) => {
            this.locationId = parseInt(routeParams.locationId);
        })
    }
    ngOnInit() {
        this.loadDoctors();
    }

    loadDoctors() {
        this._progressBarService.show();
        this._doctorLocationScheduleStore.getDoctorLocationScheduleByLocationId(this.locationId)
            .subscribe(doctors => {
                this.doctors = doctors.reverse();
                // this.datasource = doctors.reverse();
                // this.totalRecords = this.datasource.length;
                // this.doctors = this.datasource.slice(0, 10);
                
            },
            (error) => {
            },
            () => {
            this._progressBarService.hide();
            });
    }
    
    loadDoctorsLazy(event: LazyLoadEvent) {
        setTimeout(() => {
            if(this.datasource) {
                this.doctors = this.datasource.slice(event.first, (event.first + event.rows));
            }
        }, 250);
    }

    deleteDoctors() {
        if (this.selectedDoctors !== undefined) {
            this.selectedDoctors.forEach(currentDoctor => {
                this._progressBarService.show();
                let result;
                result = this._doctorLocationScheduleStore.deleteDoctorLocationSchedule(currentDoctor);
                result.subscribe(
                    (response) => {
                        let notification = new Notification({
                            'title': 'Doctor deleted successfully!',
                            'type': 'SUCCESS',
                            'createdAt': moment()
                        });
                        this.loadDoctors();
                        this._notificationsStore.addNotification(notification);
                        this.selectedDoctors = undefined;
                        // this.users.splice(this.users.indexOf(currentUser), 1);
                    },
                    (error) => {
                        let errString = 'Unable to delete doctor ';
                        let notification = new Notification({
                            'messages': ErrorMessageFormatter.getErrorMessages(error, errString),
                            'type': 'ERROR',
                            'createdAt': moment()
                        });
                        this._progressBarService.hide();
                        this._notificationsStore.addNotification(notification);
                        this._notificationsService.error('Oh No!', ErrorMessageFormatter.getErrorMessages(error, errString));
                    },
                    () => {
                        this._progressBarService.hide();
                    });
            });
        }
        else {
            let notification = new Notification({
                'title': 'select doctor to delete',
                'type': 'ERROR',
                'createdAt': moment()
            });
            this._notificationsStore.addNotification(notification);
            this._notificationsService.error('Oh No!', 'select doctor to delete');
        }
    }
    
}