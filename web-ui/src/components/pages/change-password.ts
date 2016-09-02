import {Component, OnInit, ElementRef} from '@angular/core';
import {FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES, Validators, FormGroup, FormBuilder, AbstractControl} from '@angular/forms';
import {ROUTER_DIRECTIVES, Router, ActivatedRoute} from '@angular/router';
import {AppValidators} from '../../utils/AppValidators';
import {LoaderComponent} from '../elements/loader';
import {SimpleNotificationsComponent, NotificationsService} from 'angular2-notifications';

import {UserDetail} from '../../models/user-details';
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
    directives: [FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES, ROUTER_DIRECTIVES, LoaderComponent, SimpleNotificationsComponent],
    providers: [FormBuilder, AuthenticationService, NotificationsService]
})

export class ChangePasswordComponent implements OnInit {
    userDetail: UserDetail;
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
            // let result = this._usersStore.fetchUserById(userId);
            let result = this._usersService.getUser(userId);
            result.subscribe(
                (userDetail: UserDetail) => {
                   this.userDetail = userDetail;
                    this._usersStore.selectUser(userDetail);
                },
                (error) => {
                    this._router.navigate(['/users']);
                },
                () => {
                });

        this.changePassForm = this.fb.group({
        oldpassword: [''],
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required]
        }, { validator: AppValidators.matchingPasswords('password', 'confirmPassword') });

        this.changePassFormControls = this.changePassForm.controls;
}

    ngOnInit() {
            // let userId: number = this._sessionStore.session.user.id;
            // this._usersService.getUser(userId)
            //     .subscribe(
            //           userDetail => this.userDetail = userDetail,
            //          response => {
            //                if (response.status === 404) {
            //             this._router.navigate(['/dashboard']);
            //          }
            // });
    }

    updatePassword() {
        let userDetail = new UserDetail({
            account: new Account({
               id: this._sessionStore.session.account_id
            }),
            user: new User({
                id: this.userDetail.user.id,
                firstName: this.userDetail.user.firstName,
                middleName: this.userDetail.user.middleName,
                lastName: this.userDetail.user.lastName,
                userType: this.userDetail.user.userType,
                userName: this.userDetail.user.userName,
                password: this.changePassForm.value.password
            }),
            contactInfo: new ContactInfo({
                cellPhone: this.userDetail.contactInfo.cellPhone,
                emailAddress: this.userDetail.contactInfo.emailAddress,
                faxNo: this.userDetail.contactInfo.faxNo,
                homePhone: this.userDetail.contactInfo.homePhone,
                workPhone: this.userDetail.contactInfo.workPhone,
            }),
            address: new Address({
                address1: this.userDetail.address.address1,
                address2: this.userDetail.address.address2,
                city: this.userDetail.address.city,
                country: this.userDetail.address.country,
                state: this.userDetail.address.state,
                zipCode: this.userDetail.address.zipCode,
            })
        });


        this.isPassChangeInProgress = true;
        let userName = this._sessionStore.session.user.userName;
        let oldpassword = this.changePassForm.value.oldpassword;

        let result = this._sessionStore.authenticatePassword(userName, oldpassword);
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

            // let result = this._usersService.updatePassword(userDetail);
            // result.subscribe(
            // (response) => {
            //     this._notificationsService.success('Welcome!', 'Password changed suceessfully!');
            //     setTimeout(() => {
            //         this._router.navigate(['/dashboard']);
            //     }, 3000);
            // },
            // error => {
            //     this.isPassChangeInProgress = false;
            //     this._notificationsService.error('Oh No!', 'Unable to change password.');
            // },
            // () => {
            //     this.isPassChangeInProgress = false;
            // });
        }

}