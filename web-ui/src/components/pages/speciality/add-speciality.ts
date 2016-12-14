import {Component, OnInit, ElementRef} from '@angular/core';
import {Router} from '@angular/router';
import {Validators, FormGroup, FormBuilder} from '@angular/forms';
import {SpecialityStore} from '../../../stores/speciality-store';
import {Speciality} from '../../../models/speciality';
import {SessionStore} from '../../../stores/session-store';
import {NotificationsStore} from '../../../stores/notifications-store';
import {Notification} from '../../../models/notification';
import moment from 'moment';

@Component({
    selector: 'add-speciality',
    templateUrl: 'templates/pages/speciality/add-speciality.html',
    providers: [FormBuilder]
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
        private _elRef: ElementRef
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
                this._router.navigate(['/specialities']);
            },
            (error) => {
                let notification = new Notification({
                    'title': 'Unable to add Speciality.',
                    'type': 'ERROR',
                    'createdAt': moment()
                });
                this._notificationsStore.addNotification(notification);
            },
            () => {
                this.isSaveSpecialityProgress = false;
            });

    }

}
