import { Company } from '../../../models/company';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionStore } from '../../../stores/session-store';
import { UsersStore } from '../../../stores/users-store';
import { Account } from '../../../models/account';
import { User } from '../../../models/user';
import { UserRole } from '../../../models/user-role';
import { NotificationsStore } from '../../../stores/notifications-store';
import { Notification } from '../../../models/notification';
import moment from 'moment';

@Component({
    selector: 'users-list',
    templateUrl: 'templates/pages/users/users-list.html'
})


export class UsersListComponent implements OnInit {
    selectedUsers: any[];
    users: Account[];
    usersLoading;
    cols: any[];
    isDeleteProgress = false;
    constructor(
        private _router: Router,
        private _usersStore: UsersStore,
        private _notificationsStore: NotificationsStore,
        private _sessionStore: SessionStore
    ) {
        this._sessionStore.userCompanyChangeEvent.subscribe(() => {
            this.loadUsers();
        });
    }
    ngOnInit() {
        this.loadUsers();
    }

    loadUsers() {
        this.usersLoading = true;
        this._usersStore.getUsers()
            .subscribe(users => {
                this.users = users;
            },
            null,
            () => {
                this.usersLoading = false;
            });
    }
    deleteUser() {
        if (this.selectedUsers !== undefined) {
            this.selectedUsers.forEach(user => {
                let userDetail = new Account({
                    company: new Company({
                        id: this._sessionStore.session.currentCompany.id
                    }),
                    user: new User({
                        id: user.id,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        userType: user.userType,
                        userName: user.userName,
                        isDeleted: 1
                    }),
                    role: new UserRole({
                        name: 'Doctor',
                        roleType: 'Admin',
                        status: 'active'
                    }),
                });
                this.isDeleteProgress = true;
                let result;

                result = this._usersStore.deleteUser(userDetail);
                result.subscribe(
                    (response) => {
                        let notification = new Notification({
                            'title': 'User ' + user.firstName + ' ' + user.lastName + ' deleted successfully!',
                            'type': 'SUCCESS',
                            'createdAt': moment()
                        });
                        this._notificationsStore.addNotification(notification);
                        this.users.splice(this.users.indexOf(user), 1);
                    },
                    (error) => {
                        let notification = new Notification({
                            'title': 'Unable to delete user ' + user.firstName + ' ' + user.lastName,
                            'type': 'ERROR',
                            'createdAt': moment()
                        });
                        this._notificationsStore.addNotification(notification);
                    },
                    () => {
                        this.isDeleteProgress = false;
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