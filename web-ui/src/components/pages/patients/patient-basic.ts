import {Component, OnInit, ElementRef} from '@angular/core';
import {Validators, FormGroup, FormBuilder} from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';
import {AppValidators} from '../../../utils/AppValidators';
import {SessionStore} from '../../../stores/session-store';
import {NotificationsStore} from '../../../stores/notifications-store';
import {Notification} from '../../../models/notification';
import moment from 'moment';
import {StatesStore} from '../../../stores/states-store';
import {StateService} from '../../../services/state-service';

@Component({
    selector: 'basic',
    templateUrl: 'templates/pages/patients/patient-basic.html',
    providers: [FormBuilder],
})

export class PatientBasicComponent implements OnInit {
    options = {
        timeOut: 3000,
        showProgressBar: true,
        pauseOnHover: false,
        clickToClose: false
    };
    basicform: FormGroup;
    basicformControls;
    isSaveProgress = false;

    constructor(
        private fb: FormBuilder,
        private _router: Router,
        public _route: ActivatedRoute,
        private _notificationsStore: NotificationsStore,
        private _sessionStore: SessionStore,
        private _elRef: ElementRef
    ) {
        this._route.params.subscribe((routeParams: any) => {
            console.log(routeParams.locationName);
        });
        this.basicform = this.fb.group({
                primaryProvider: ['', Validators.required],
                firstName: ['', Validators.required],
                lastName: ['', Validators.required],
                title: ['', Validators.required],
                homecellPhone: ['', Validators.required],
                cellphone: ['', Validators.required],
                email: ['', [Validators.required, AppValidators.emailValidator]],
                photo: ['']
            });

        this.basicformControls = this.basicform.controls;
    }

    ngOnInit() {
    }


    save() {
    }

}
