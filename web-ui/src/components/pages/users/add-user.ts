import { Component, OnInit, ElementRef } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AppValidators } from '../../../utils/AppValidators';
import { ErrorMessageFormatter } from '../../../utils/ErrorMessageFormatter';
import { UsersStore } from '../../../stores/users-store';
import { User } from '../../../models/user';
import { UsersService } from '../../../services/users-service';
// import { Account } from '../../../models/account';
// import { Company } from '../../../models/company';
// import { UserRole } from '../../../models/user-role';
import { Contact } from '../../../models/contact';
import { Address } from '../../../models/address';
import { SessionStore } from '../../../stores/session-store';
import { NotificationsStore } from '../../../stores/notifications-store';
import { Notification } from '../../../models/notification';
import moment from 'moment';
import { StatesStore } from '../../../stores/states-store';
import { ProgressBarService } from '../../../services/progress-bar-service';

@Component({
    selector: 'add-user',
    templateUrl: 'templates/pages/users/add-user.html'
})

export class AddUserComponent implements OnInit {
    states: any[];
    options = {
        timeOut: 3000,
        showProgressBar: true,
        pauseOnHover: false,
        clickToClose: false,
        maxLength: 10
    };
    userform: FormGroup;
    userformControls;
    isSaveUserProgress = false;

    constructor(
        private _statesStore: StatesStore,
        private _userService: UsersService,
        private fb: FormBuilder,
        private _router: Router,
        private _notificationsStore: NotificationsStore,
        private _sessionStore: SessionStore,
        private _usersStore: UsersStore,
        private _progressBarService: ProgressBarService,
        private _elRef: ElementRef
    ) {
        this.userform = this.fb.group({
            userInfo: this.fb.group({
                firstname: ['', Validators.required],
                lastname: ['', Validators.required],
                userType: ['', Validators.required]
            }),
            contact: this.fb.group({
                email: ['', [Validators.required, AppValidators.emailValidator]],
                cellPhone: ['', [Validators.required, AppValidators.mobileNoValidator]],
                homePhone: [''],
                workPhone: [''],
                faxNo: ['']
            }),
            address: this.fb.group({
                address1: [''],
                address2: [''],
                city: [''],
                zipCode: [''],
                state: [''],
                country: ['']
            })
            // userRole: this.fb.group({
            //     role: ['', Validators.required]
            // })
        });

        this.userformControls = this.userform.controls;
    }

    ngOnInit() {
        // this._stateService.getStates()
        //     .subscribe(states => this.states = states);
    }


    saveUser() {
        let userFormValues = this.userform.value;
        let userDetail = new User({
            firstName: userFormValues.userInfo.firstname,
            lastName: userFormValues.userInfo.lastname,
            userType: parseInt(userFormValues.userInfo.userType),
            userName: userFormValues.contact.email,
            contact: new Contact({
                cellPhone: userFormValues.contact.cellPhone ? userFormValues.contact.cellPhone.replace(/\-/g, '') : null,
                emailAddress: userFormValues.contact.email,
                faxNo: userFormValues.contact.faxNo ? userFormValues.contact.faxNo.replace(/\-|\s/g, '') : null,
                homePhone: userFormValues.contact.homePhone,
                workPhone: userFormValues.contact.workPhone,
            }),
            address: new Address({
                address1: userFormValues.address.address1,
                address2: userFormValues.address.address2,
                city: userFormValues.address.city,
                country: userFormValues.address.country,
                state: userFormValues.address.state,
                zipCode: userFormValues.address.zipCode,
            })
        });
        this._progressBarService.show();
        this.isSaveUserProgress = true;
        let result;

        result = this._usersStore.addUser(userDetail);
        result.subscribe(
            (response) => {
                let notification = new Notification({
                    'title': 'User added successfully!',
                    'type': 'SUCCESS',
                    'createdAt': moment()
                });
                this._notificationsStore.addNotification(notification);
                this._router.navigate(['/medical-provider/users']);
            },
            (error) => {
                let errString = 'Unable to add User.';
                let notification = new Notification({
                    'messages': ErrorMessageFormatter.getErrorMessages(error, errString),
                    'type': 'ERROR',
                    'createdAt': moment()
                });
                this.isSaveUserProgress = false;
                this._notificationsStore.addNotification(notification);
                this._progressBarService.hide();
            },
            () => {
                this.isSaveUserProgress = false;
                this._progressBarService.hide();
            });

    }

}
