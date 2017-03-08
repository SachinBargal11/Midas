// import { Company } from '../../../models/company';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ErrorMessageFormatter } from '../../../commons/utils/ErrorMessageFormatter';
import { SessionStore } from '../../../commons/stores/session-store';
import { UsersStore } from '../stores/users-store';
// import { Account } from '../../../models/account';
import { User } from '../../../commons/models/user';
// import { UserRole } from '../../../commons/models/user-role';
import { NotificationsStore } from '../../../commons/stores/notifications-store';
import { Notification } from '../../../commons/models/notification';
import * as moment from 'moment';
import { ProgressBarService } from '../../../commons/services/progress-bar-service';
import { NotificationsService } from 'angular2-notifications';

@Component({
    selector: 'users-list',
    templateUrl: './users-list.html'
})


export class UsersListComponent implements OnInit {
    selectedUsers: User[];
    users: User[];
    user: User;
    role;
    constructor(
        private _router: Router,
        private _usersStore: UsersStore,
        private _notificationsStore: NotificationsStore,
        private _sessionStore: SessionStore,
        private _notificationsService: NotificationsService,
        private _progressBarService: ProgressBarService
    ) {
        this._sessionStore.userCompanyChangeEvent.subscribe(() => {
            this.loadUsers();
        });
    }
    ngOnInit() {
        this.loadUsers();
    }

    loadUsers() {
        this._progressBarService.show();
        this._usersStore.getUsers()
            .subscribe(users => {
                this.users = users;
            },
            (error) => {
            },
            () => {
                this._progressBarService.hide();
            });
    }
    editUser(user) {
        let userRoleFlag: number = 1;
        user.roles.forEach(role => {
            if (role.roleType === 3) {
                userRoleFlag = 2;
            }
        });
        this._router.navigate(['/medical-provider/users/' + user.id + '/' + userRoleFlag + '/basic']);
    }
    deleteUser() {
        if (this.selectedUsers !== undefined) {
            this.selectedUsers.forEach(currentUser => {
                this._progressBarService.show();
                let result;
                result = this._usersStore.deleteUser(currentUser);
                result.subscribe(
                    (response) => {
                        let notification = new Notification({
                            'title': 'User ' + currentUser.firstName + ' ' + currentUser.lastName + ' deleted successfully!',
                            'type': 'SUCCESS',
                            'createdAt': moment()
                        });
                        this.loadUsers();
                        this._notificationsStore.addNotification(notification);
                        this.selectedUsers = undefined;
                        // this.users.splice(this.users.indexOf(currentUser), 1);
                    },
                    (error) => {
                        let errString = 'Unable to delete user ' + currentUser.firstName + ' ' + currentUser.lastName;
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
                'title': 'select users to delete',
                'type': 'ERROR',
                'createdAt': moment()
            });
            this._notificationsStore.addNotification(notification);
            this._notificationsService.error('Oh No!', 'select users to delete');
        }
    }
    onRowSelect(user) {
        this._router.navigate(['/medical-provider/users/' + user.id + '/basic']);
    }
}