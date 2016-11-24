import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {Validators, FormGroup, FormBuilder} from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';
import {AppValidators} from '../../utils/AppValidators';
import {NotificationsService} from 'angular2-notifications';

import {AccountDetail} from '../../models/account-details';
import {User} from '../../models/user';
import {ContactInfo} from '../../models/contact';
import {Address} from '../../models/address';
import {Account} from '../../models/account';
import {UsersStore} from '../../stores/users-store';
import {UsersService} from '../../services/users-service';
import {SessionStore} from '../../stores/session-store';
import {AuthenticationService} from '../../services/authentication-service';

@Component({
    selector: 'change-password',
    templateUrl: 'templates/pages/change-password.html',
    providers: [FormBuilder, AuthenticationService, NotificationsService]
})

export class ChangePasswordComponent implements OnInit {
    accountDetail: AccountDetail;
    options = {
        timeOut: 3000,
        showProgressBar: true,
        pauseOnHover: false,
        clickToClose: false,
        maxLength: 10
    };
    changePassForm: FormGroup;
    changePassFormControls;
    isPassChangeInProgress;
    constructor(
        private location: Location,
        private fb: FormBuilder,
        private _router: Router,
        public _route: ActivatedRoute,
        private _usersStore: UsersStore,
        private _usersService: UsersService,
        private _authenticationService: AuthenticationService,
        private _notificationsService: NotificationsService,
        private _sessionStore: SessionStore
    ) {
        let userId: number = this._sessionStore.session.user.id;
        let result = this._usersService.getUser(userId);
        result.subscribe(
            (accountDetail: AccountDetail) => {
                this.accountDetail = accountDetail;
            },
            (error) => {
                this._router.navigate(['/users']);
            },
            () => {
            });

        this.changePassForm = this.fb.group({
        oldpassword: ['', Validators.required],
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required]
        }, { validator: AppValidators.matchingPasswords('password', 'confirmPassword') });

        this.changePassFormControls = this.changePassForm.controls;
    }

    ngOnInit() {
    }

    updatePassword() {
        let userDetail = new AccountDetail({
            account: new Account({
                id: this._sessionStore.session.account_id
            }),
            user: new User({
                id: this.accountDetail.user.id,
                firstName: this.accountDetail.user.firstName,
                middleName: this.accountDetail.user.middleName,
                lastName: this.accountDetail.user.lastName,
                userType: this.accountDetail.user.userType,
                userName: this.accountDetail.user.userName,
                password: this.changePassForm.value.password
            }),
            contactInfo: new ContactInfo({
                cellPhone: this.accountDetail.contactInfo.cellPhone,
                emailAddress: this.accountDetail.contactInfo.emailAddress,
                faxNo: this.accountDetail.contactInfo.faxNo,
                homePhone: this.accountDetail.contactInfo.homePhone,
                workPhone: this.accountDetail.contactInfo.workPhone,
            }),
            address: new Address({
                address1: this.accountDetail.address.address1,
                address2: this.accountDetail.address.address2,
                city: this.accountDetail.address.city,
                country: this.accountDetail.address.country,
                state: this.accountDetail.address.state,
                zipCode: this.accountDetail.address.zipCode,
            })
        });


        this.isPassChangeInProgress = true;
        let userName = this._sessionStore.session.user.userName;
        let oldpassword = this.changePassForm.value.oldpassword;

        // let result = this._sessionStore.authenticatePassword(userName, oldpassword);
        let result = this._authenticationService.authenticate(userName, oldpassword);
        result.subscribe(
            (response) => {
                this._usersStore.updatePassword(userDetail)
                    .subscribe(
                    (response) => {
                        this._notificationsService.success('Success', 'Password changed successfully!');
                        setTimeout(() => {
                            this._router.navigate(['/dashboard']);
                        }, 3000);
                    });
            },
            error => {
                this._notificationsService.error('Error!', 'Please enter old password correctly.');
            },
            () => {
                this.isPassChangeInProgress = false;
            });
    }

    goBack(): void {
    this.location.back();
  }

}