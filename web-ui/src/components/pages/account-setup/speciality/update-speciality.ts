import { Component, OnInit, ElementRef } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { SpecialityStore } from '../../../../stores/speciality-store';
import { Speciality } from '../../../../models/speciality';
import { SessionStore } from '../../../../stores/session-store';
import { NotificationsStore } from '../../../../stores/notifications-store';
import { Notification } from '../../../../models/notification';
import moment from 'moment';

@Component({
    selector: 'update-speciality',
    templateUrl: 'templates/pages/account-setup/speciality/update-speciality.html',
    providers: [FormBuilder]
})

export class UpdateSpecialityComponent implements OnInit {
    speciality = new Speciality({});
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
        private _route: ActivatedRoute,
        private _notificationsStore: NotificationsStore,
        private _sessionStore: SessionStore,
        private _elRef: ElementRef
    ) {
        this._route.params.subscribe((routeParams: any) => {
            let specialityId: number = parseInt(routeParams.id);
            let result = this._specialityStore.fetchSpecialityById(specialityId);
            result.subscribe(
                (speciality: Speciality) => {
                    this.speciality = speciality;
                },
                (error) => {
                    this._router.navigate(['/account-setup/specialities']);
                },
                () => {
                });
        });

        this.specialityform = this.fb.group({
            name: ['', Validators.required],
            specialityCode: ['', Validators.required],
            isunitApply: ['']
        });

        this.specialityformControls = this.specialityform.controls;
    }

    ngOnInit() {
    }


    updateSpeciality() {
        let specialityformValues = this.specialityform.value;
        let speciality = new Speciality({
            id: this.speciality.id,
            name: specialityformValues.name,
            specialityCode: specialityformValues.specialityCode,
            isunitApply: specialityformValues.isunitApply
        });
        this.isSaveSpecialityProgress = true;
        let result;

        result = this._specialityStore.updateSpeciality(speciality);
        result.subscribe(
            (response) => {
                let notification = new Notification({
                    'title': 'Speciality updated successfully!',
                    'type': 'SUCCESS',
                    'createdAt': moment()
                });
                this._notificationsStore.addNotification(notification);
                this._router.navigate(['/account-setup/specialities']);
            },
            (error) => {
                let notification = new Notification({
                    'title': 'Unable to update Speciality.',
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
