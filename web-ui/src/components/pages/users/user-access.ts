import {Component, OnInit, ElementRef} from '@angular/core';
import {Validators, FormGroup, FormBuilder} from '@angular/forms';
import {Router} from '@angular/router';
import {AppValidators} from '../../../utils/AppValidators';
import {SessionStore} from '../../../stores/session-store';
import {NotificationsStore} from '../../../stores/notifications-store';
import {Notification} from '../../../models/notification';
import moment from 'moment';
@Component({
    selector: 'access',
    templateUrl: 'templates/pages/users/user-access.html',
    providers: [FormBuilder],
})

export class UserAccessComponent implements OnInit {
    options = {
        timeOut: 3000,
        showProgressBar: true,
        pauseOnHover: false,
        clickToClose: false
    };
    accessform: FormGroup;
    accessformControls;
    isSaveProgress = false;

    constructor(
        private fb: FormBuilder,
        private _router: Router,
        private _notificationsStore: NotificationsStore,
        private _sessionStore: SessionStore,
        private _elRef: ElementRef
    ) {
        this.accessform = this.fb.group({
                role: ['']
            });

        this.accessformControls = this.accessform.controls;
    }

    ngOnInit() {
    }


    save() {
        let accessformValues = this.accessform.value;
    }

}
