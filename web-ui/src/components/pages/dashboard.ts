import {Component} from '@angular/core';
import {Router} from '@angular/router';

import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';
import {UsersService} from '../../services/users-service';
import {SessionStore} from '../../stores/session-store';
import {UsersStore} from '../../stores/users-store';
import {AccountDetail} from '../../models/account-details';
import {NotificationsService} from 'angular2-notifications';

@Component({
    selector: 'dashboard',
    templateUrl: 'templates/pages/dashboard.html',
})

export class DashboardComponent {
 data: any;
 users: AccountDetail[];

   constructor(
        private _router: Router,
        private _usersStore: UsersStore,
        private _usersService: UsersService,
        private _sessionStore: SessionStore,
        private _notificationsService: NotificationsService
     ) {
         let accountId = this._sessionStore.session.account_id;
        let result = this._usersService.getUsers(accountId);
        let users = this._usersStore.users;

        // result.subscribe(
        //     (response) => {
                this.data = {
                    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                    // labels: response,
                    datasets: [
                        {
                            label: 'Users',
                            backgroundColor: '#42A5F5',
                            borderColor: '#1E88E5',
                            data: [65, 59, 80, 81, 56, 55, 40]
                            // data: response
                        }
                    ]
                };
            // });
       }
}