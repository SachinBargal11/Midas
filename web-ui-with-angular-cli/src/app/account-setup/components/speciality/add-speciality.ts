import {Component, OnInit, ElementRef} from '@angular/core';
import {Router} from '@angular/router';
import {Validators, FormGroup, FormBuilder} from '@angular/forms';
import { ErrorMessageFormatter } from '../../../commons/utils/ErrorMessageFormatter';
import {SpecialityStore} from '../../stores/speciality-store';
import {Speciality} from '../../models/speciality';
import {SessionStore} from '../../../commons/stores/session-store';
import {NotificationsStore} from '../../../commons/stores/notifications-store';
import {Notification} from '../../../commons/models/notification';
import * as moment from 'moment';
import { ProgressBarService } from '../../../commons/services/progress-bar-service';
import { NotificationsService } from 'angular2-notifications';

@Component({
    selector: 'add-speciality',
    templateUrl: './add-speciality.html'
})

export class AddSpecialityComponent implements OnInit {
    speciality = new Speciality({});
    specialityJS;
    options = {
        timeOut: 3000,
        showProgressBar: true,
        pauseOnHover: false,
        clickToClose: false,
        maxLength: 10
    };
    specialityform: FormGroup;
    specialityformControls;
    isSaveSpecialityProgress = false;

    constructor(
        private _specialityStore: SpecialityStore,
        private fb: FormBuilder,
        private _router: Router,
        private _notificationsStore: NotificationsStore,
        private _sessionStore: SessionStore,
        private _elRef: ElementRef,
        private _notificationsService: NotificationsService,
        private _progressBarService: ProgressBarService
    ) {
        this.specialityJS = this.speciality.toJS();
        this.specialityform = this.fb.group({
                name: ['', Validators.required],
                specialityCode: ['', Validators.required],
                isunitApply: ['']
        });

        this.specialityformControls = this.specialityform.controls;
    }

    ngOnInit() {
    }


    saveSpeciality() {
        let specialityformValues = this.specialityform.value;
        let speciality = new Speciality({
                name: specialityformValues.name,
                specialityCode: specialityformValues.specialityCode,
                isunitApply: specialityformValues.isunitApply
        });
        this._progressBarService.show();
        this.isSaveSpecialityProgress = true;
        let result;

        result = this._specialityStore.addSpeciality(speciality);
        result.subscribe(
            (response) => {
                let notification = new Notification({
                    'title': 'Speciality added successfully!',
                    'type': 'SUCCESS',
                    'createdAt': moment()
                });
                this._notificationsStore.addNotification(notification);
                this._router.navigate(['/account-setup/specialities']);
            },
            (error) => {
                let errString = 'Unable to add Speciality.';
                let notification = new Notification({
                    'messages': ErrorMessageFormatter.getErrorMessages(error, errString),
                    'type': 'ERROR',
                    'createdAt': moment()
                });
                this.isSaveSpecialityProgress = false;
                this._notificationsStore.addNotification(notification);
                this._notificationsService.error('Oh No!', ErrorMessageFormatter.getErrorMessages(error, errString));
                this._progressBarService.hide();
            },
            () => {
                this.isSaveSpecialityProgress = false;
                this._progressBarService.hide();
            });

    }

}
