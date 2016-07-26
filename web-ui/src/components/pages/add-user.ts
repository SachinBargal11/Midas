import {Component, OnInit, ElementRef} from '@angular/core';
import {FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES, Validators, FormGroup, FormBuilder, AbstractControl} from '@angular/forms';
import {ROUTER_DIRECTIVES, Router} from '@angular/router';
import {AppValidators} from '../../utils/AppValidators';
import {LoaderComponent} from '../elements/loader';
import {SubUsersStore} from '../../stores/sub-users-store';
import {SubUser} from '../../models/sub-user';
import $ from 'jquery';
import {SessionStore} from '../../stores/session-store';
import {NotificationsStore} from '../../stores/notifications-store';
import {Notification} from '../../models/notification';
import Moment from 'moment';

@Component({
    selector: 'sub-user',
    templateUrl: 'templates/pages/add-sub-user.html',
    directives: [FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES, ROUTER_DIRECTIVES, LoaderComponent]
})

export class AddUserComponent implements OnInit {
    subuser = new SubUser({
        'firstname': '',
        'lastname': '',
        'email': '',
        'mobileNo': '',
        'address': '',
        // 'dob': ''
    });
    options = {
        timeOut: 3000,
        showProgressBar: true,
        pauseOnHover: false,
        clickToClose: false,
        maxLength: 10
    };
    subuserform: FormGroup;
    subuserformControls;
    isSaveSubUserProgress = false;
    constructor(
        private fb: FormBuilder,
        private _router: Router,
        private _notificationsStore: NotificationsStore,
        private _sessionStore: SessionStore,
        private _subusersStore: SubUsersStore,
        private _elRef: ElementRef
    ) {
        this.subuserform = this.fb.group({
            firstname: ['', Validators.required],
            lastname: ['', Validators.required],
            email: ['', [Validators.required, AppValidators.emailValidator]],
            mobileNo: ['', [Validators.required, AppValidators.mobileNoValidator]],
            address: [''],
            // dob: ['', Validators.required]
        });
        this.subuserformControls = this.subuserform.controls;
    }

    ngOnInit() {
        
    }


    saveSubUser() {
        this.isSaveSubUserProgress = true;
        var result;
        var subuser = new SubUser({
            'firstname': this.subuserform.value.firstname,
            'lastname': this.subuserform.value.lastname,
            'email': this.subuserform.value.email,
            'mobileNo': this.subuserform.value.mobileNo,
            'address': this.subuserform.value.address,
            'createdUser': this._sessionStore.session.user.id
        });
        result = this._subusersStore.addSubUser(subuser);
        result.subscribe(
            (response) => {
                var notification = new Notification({
                    'title': 'User added successfully!',
                    'type': 'SUCCESS',
                    'createdAt': Moment()
                });
                this._notificationsStore.addNotification(notification);
                this._router.navigate(['/users/add']);
            },
            (error) => {
                var notification = new Notification({
                    'title': 'Unable to add user.',
                    'type': 'ERROR',
                    'createdAt': Moment()
                });
                this._notificationsStore.addNotification(notification);
            },
            () => {
                this.isSaveSubUserProgress = false;
            });

    }

}