import { Component } from '@angular/core';
import { Router } from '@angular/router';
import moment from 'moment';
import { SessionStore } from '../../../stores/session-store';
import { UsersStore } from '../../../stores/users-store';
import { Account } from '../../../models/account';
import { DoctorsStore } from '../../../stores/doctors-store';
import { DoctorDetail } from '../../../models/doctor-details';
import { NotificationsService } from 'angular2-notifications';
import { ProgressBarService } from '../../../services/progress-bar-service';


@Component({
    selector: 'user-statistics',
    templateUrl: 'templates/pages/users/user-statistics.html'
})

export class UserStatisticsComponent {
    data: any;
    options: any;
    users: Account[];
    doctors: DoctorDetail[];
    constructor(
        private _router: Router,
        private _usersStore: UsersStore,
        private _doctorsStore: DoctorsStore,
        private _sessionStore: SessionStore,
        private _notificationsService: NotificationsService,
        private _progressBarService: ProgressBarService
    ) {
        this._progressBarService.start();
        // this._usersStore.getUsers().subscribe(users => {
        //     this.users = users;
        //     let groupedUsers: Array<any> = _.chain(this.users).groupBy(function (user) {
        //         return user.toJS().user.createDate.format('Do MMM YY');
        //     }).map(function (value: Array<any>, key: string) {
        //         return {
        //             x: moment(key, 'Do MMM YY'),
        //             y: value.length
        //         };
        //     })
        //     .value();
        //     this.data.datasets[0].data = groupedUsers;
        // },
        //     null,
        //     () => {
        //           this._progressBarService.stop();
        //     }
        // );
        this._progressBarService.start();
        // this._doctorsStore.getDoctors().subscribe(doctors => {
        //     this.doctors = doctors;
        //     let groupedDoctors: Array<any> = _.chain(this.doctors).groupBy(function (doctor) {
        //         return doctor.toJS().doctor.createDate.format('Do MMM YY');
        //     }).map(function (value: Array<any>, key: string) {
        //         return {
        //             x: moment(key, 'Do MMM YY'),
        //             y: value.length
        //         };
        //     })
        //     .value();
        //     this.data.datasets[1].data = groupedDoctors;
        // },
        //     null,
        //     () => {
        //         this._progressBarService.stop();
        //     }
        // );
        // this.options = {
        //     scales: {
        //         xAxes: [{
        //             type: 'time',
        //             time: {
        //                 unit: 'week'
        //             }
        //         }]
        //     },
        //     tooltips: {
        //             callbacks: {
        //                 title: function (tooltipItem, data) {
        //                     return tooltipItem[0].xLabel.format('Do MMM YY');
        //                 }
        //             }
        //         }

        // };
        // this.data = {
        //     datasets: [
        //         {
        //             label: 'Users',
        //             fill: false,
        //             borderColor: '#1E88E5',
        //             data: []
        //         },
        //         {
        //             label: 'Doctors',
        //             fill: false,
        //             borderColor: '#00BF03',
        //             data: []
        //         }
        //     ]
        // };
    }
    newDate(days) {
        return moment().add(days, 'd');
    }
}