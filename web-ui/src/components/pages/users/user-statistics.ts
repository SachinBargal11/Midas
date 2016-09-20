import {Component} from '@angular/core';
import {UsersService} from '../../../services/users-service';
import {SessionStore} from '../../../stores/session-store';
import {UsersStore} from '../../../stores/users-store';


@Component({
    selector: 'user-statistics',
    templateUrl: 'templates/pages/users/user-statistics.html'
})

export class UserStatisticsComponent {
    data: any;

    constructor(
        private _usersStore: UsersStore,
        private _usersService: UsersService,
        private _sessionStore: SessionStore
     ) {
        let accountId = this._sessionStore.session.account_id;
        let result = this._usersService.getUsers(accountId);

        result.subscribe(
            (response) => {
                this.data = {
                    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                    datasets: [
                        {
                            label: 'Users',
                            backgroundColor: '#42A5F5',
                            borderColor: '#1E88E5',
                            // data: [65, 59, 80, 81, 56, 55, 40]
                            data: response
                        }
                    ]
                };
            });
      }
}