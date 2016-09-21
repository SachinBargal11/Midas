import {Component} from '@angular/core';
import {Router} from '@angular/router';

import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';
import 'chart.js';
import {UsersService} from '../../../services/users-service';
import {SessionStore} from '../../../stores/session-store';
import {UsersStore} from '../../../stores/users-store';
import {AccountDetail} from '../../../models/account-details';
import {NotificationsService} from 'angular2-notifications';


@Component({
    selector: 'user-statistics',
    templateUrl: 'templates/pages/users/user-statistics.html'
})

export class UserStatisticsComponent {
data: any;
options: any;
users: AccountDetail[];
usersLoading;
constructor(
    private _router: Router,
    private _usersStore: UsersStore,
    private _usersService: UsersService,
    private _sessionStore: SessionStore,
    private _notificationsService: NotificationsService
) {
    this.usersLoading = true;
    this._usersStore.getUsers().subscribe(users => {
        this.users = users;
        let groupedUsers: Array<any> = _.chain(this.users).groupBy(function (user) {
            return user.toJS().user.createDate.format('Do MMM YY');
        }).map(function (value: Array<any>, key: string) {
            return {
                x: moment(key, 'Do MMM YY'),
                y: value.length
            };
        })
        .value();
        this.data.datasets[0].data = groupedUsers;
    },
        null,
        () => {
            this.usersLoading = false;
        }
    );
    this.options = {
        scales: {
            xAxes: [{
                type: 'time',
                time: {
                    unit: 'week'
                }
            }]
        }
    };
    this.data = {
        datasets: [
            {
                label: 'Users',
                backgroundColor: '#42A5F5',
                borderColor: '#1E88E5',
                data: []
            }
        ]
    };
}
  newDate(days) {
    return moment().add(days, 'd');
  }
}