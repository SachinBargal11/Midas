// import { Company } from '../../../models/company';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LazyLoadEvent } from 'primeng/primeng'
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
import {ConfirmDialogModule,ConfirmationService} from 'primeng/primeng';

@Component({
    selector: 'users-list',
    templateUrl: './users-list.html'
})


export class UsersListComponent implements OnInit {
    selectedUsers: User[];
    users: User[];
    user: User;
    datasource: User[];
    totalRecords: number;
    role;
    isDeleteProgress: boolean = false;

    constructor(
        private _router: Router,
        private _usersStore: UsersStore,
        private _notificationsStore: NotificationsStore,
        private _sessionStore: SessionStore,
        private _notificationsService: NotificationsService,
        private _progressBarService: ProgressBarService,
        private confirmationService: ConfirmationService,
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
                this.users = users.reverse();
                // this.datasource = users.reverse();
                // this.totalRecords = this.datasource.length;
                // this.users = this.datasource.slice(0, 10);
            },
            (error) => {
                this._progressBarService.hide();
            },
            () => {
                this._progressBarService.hide();
            });
    }
    loadUsersLazy(event: LazyLoadEvent) {
        //in a real application, make a remote request to load data using state metadata from event
        //event.first = First row offset
        //event.rows = Number of rows per page
        //event.sortField = Field name to sort with
        //event.sortOrder = Sort order as number, 1 for asc and -1 for dec
        //filters: FilterMetadata object having field as key and filter value, filter matchMode as value

        //imitate db connection over a network
        setTimeout(() => {
            if (this.datasource) {
                this.users = this.datasource.slice(event.first, (event.first + event.rows));
            }
        }, 250);
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

    deleteUser(currentUser:User) {        
        this.confirmationService.confirm({
            message: 'Do you want to delete this record?',
            header: 'Delete Confirmation',
            icon: 'fa fa-trash',
            accept: () => {
                //this.selectedUsers.forEach(currentUser => {
                    this.isDeleteProgress = true;
                    this._progressBarService.show();
                    let result;                    
                    if (currentUser.userRole != 'Attorney') {
                        if(currentUser.userRole.match("Attorney"))
                        {
                            result = this._usersStore.disassociateUserWithCompany(this._sessionStore.session.currentCompany.id,currentUser.id);                                
                        }
                        else
                        {
                            result = this._usersStore.deleteUser(currentUser);
                        }
                        
                    } else if (currentUser.userRole == 'Attorney') {
                        result = this._usersStore.disassociateUserWithCompany(this._sessionStore.session.currentCompany.id,currentUser.id);
                    }
                    result.subscribe(
                        (response) => {                                
                            if(response.errorLevel == 2)
                            {
                                this.confirmationService.confirm({
                                    message: 'Future Appointments has been scheduled, Are you sure you want to cancel all the appointments',
                                    header: 'Delete Confirmation',
                                    icon: 'fa fa-trash',
                                    accept: () => {                         
                                        let result1;
                                        result1 = this._usersStore.disassociateUserWithCompanyandAppointment(this._sessionStore.session.currentCompany.id,currentUser.id);
                                        result1.subscribe(
                                            (response) => {
                                                let notification = new Notification({
                                                    'title': 'User ' + currentUser.firstName + ' ' + currentUser.lastName + ' deleted successfully!',
                                                    'type': 'SUCCESS',
                                                    'createdAt': moment()
                                                    });
                                                    this.loadUsers();
                                                    this._notificationsStore.addNotification(notification);
                                                    this.selectedUsers = undefined;
                                            },
                                            (error) => {
                                                let errString = 'Unable to delete user ' + currentUser.firstName + ' ' + currentUser.lastName;
                                                let notification = new Notification({
                                                    'messages': ErrorMessageFormatter.getErrorMessages(error, errString),
                                                    'type': 'ERROR',
                                                    'createdAt': moment()
                                                });
                                                this._progressBarService.hide();
                                                this.isDeleteProgress = false;
                                                this._notificationsStore.addNotification(notification);
                                                this._notificationsService.error('Oh No!', ErrorMessageFormatter.getErrorMessages(error, errString));                                                    
                                            },
                                            () => {
                                                this.isDeleteProgress = false;
                                                this._progressBarService.hide();
                                            });
    
                                    }});
                            }
                            else
                            {
                                let notification = new Notification({
                                    'title': 'User ' + currentUser.firstName + ' ' + currentUser.lastName + ' deleted successfully!',
                                    'type': 'SUCCESS',
                                    'createdAt': moment()
                                    });
                                    this.loadUsers();
                                    this._notificationsStore.addNotification(notification);
                                    this.selectedUsers = undefined;
                            }
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
                            this.isDeleteProgress = false;
                            this._notificationsStore.addNotification(notification);
                            this._notificationsService.error('Oh No!', ErrorMessageFormatter.getErrorMessages(error, errString));
                        },
                        () => {
                            this.isDeleteProgress = false;
                            this._progressBarService.hide();
                        });
                //});
            }
        });      
}
    onRowSelect(user) {
        this._router.navigate(['/medical-provider/users/' + user.id + '/basic']);
    }
}