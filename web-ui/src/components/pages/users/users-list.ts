// import { Company } from '../../../models/company';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ErrorMessageFormatter } from '../../../utils/ErrorMessageFormatter';
import { SessionStore } from '../../../stores/session-store';
import { UsersStore } from '../../../stores/users-store';
// import { Account } from '../../../models/account';
import { User } from '../../../models/user';
// import { UserRole } from '../../../models/user-role';
import { NotificationsStore } from '../../../stores/notifications-store';
import { Notification } from '../../../models/notification';
import moment from 'moment';
import { ProgressBarService } from '../../../services/progress-bar-service';

@Component({
    selector: 'users-list',
    templateUrl: 'templates/pages/users/users-list.html'
})


export class UsersListComponent implements OnInit {
    selectedUsers: User[];
    users: User[];
    constructor(
        private _router: Router,
        private _usersStore: UsersStore,
        private _notificationsStore: NotificationsStore,
        private _sessionStore: SessionStore,
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
            null,
            () => {
            this._progressBarService.hide();
            });
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
        }
    }
    onRowSelect(user) {
        this._router.navigate(['/medical-provider/users/' + user.id + '/basic']);
    }
}