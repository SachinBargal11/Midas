// import { Company } from '../../../models/company';
import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
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
                this.doctors = doctors;
                
            },
            (error) => {
            },
            () => {
            this._progressBarService.hide();
            });
    }
    // deleteUser() {
    //     if (this.selectedUsers !== undefined) {
    //         this.selectedUsers.forEach(currentUser => {
    //             this._progressBarService.show();
    //             let result;
    //             result = this._usersStore.deleteUser(currentUser);
    //             result.subscribe(
    //                 (response) => {
    //                     let notification = new Notification({
    //                         'title': 'User ' + currentUser.firstName + ' ' + currentUser.lastName + ' deleted successfully!',
    //                         'type': 'SUCCESS',
    //                         'createdAt': moment()
    //                     });
    //                     this.loadUsers();
    //                     this._notificationsStore.addNotification(notification);
    //                     this.selectedUsers = undefined;
    //                     // this.users.splice(this.users.indexOf(currentUser), 1);
    //                 },
    //                 (error) => {
    //                     let errString = 'Unable to delete user ' + currentUser.firstName + ' ' + currentUser.lastName;
    //                     let notification = new Notification({
    //                         'messages': ErrorMessageFormatter.getErrorMessages(error, errString),
    //                         'type': 'ERROR',
    //                         'createdAt': moment()
    //                     });
    //                     this._progressBarService.hide();
    //                     this._notificationsStore.addNotification(notification);
    //                     this._notificationsService.error('Oh No!', ErrorMessageFormatter.getErrorMessages(error, errString));
    //                 },
    //                 () => {
    //                     this._progressBarService.hide();
    //                 });
    //         });
    //     }
    //     else {
    //         let notification = new Notification({
    //             'title': 'select users to delete',
    //             'type': 'ERROR',
    //             'createdAt': moment()
    //         });
    //         this._notificationsStore.addNotification(notification);
    //         this._notificationsService.error('Oh No!', 'select users to delete');
    //     }
    // }
    onRowSelect(user) {
        this._router.navigate(['/medical-provider/users/' + user.id + '/basic']);
    }
}