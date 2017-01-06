import { Component, OnInit, ElementRef } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorMessageFormatter } from '../../../../utils/ErrorMessageFormatter';
import { SpecialityStore } from '../../../../stores/speciality-store';
import { Speciality } from '../../../../models/speciality';
import { SessionStore } from '../../../../stores/session-store';
import { NotificationsStore } from '../../../../stores/notifications-store';
import { Notification } from '../../../../models/notification';
import moment from 'moment';
import { ProgressBarService } from '../../../../services/progress-bar-service';

@Component({
    selector: 'update-speciality',
    templateUrl: 'templates/pages/account-setup/speciality/update-speciality.html'
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
        private _progressBarService: ProgressBarService,
        private _elRef: ElementRef
    ) {
        this._route.params.subscribe((routeParams: any) => {
            let specialityId: number = parseInt(routeParams.id);
            this._progressBarService.show();
            let result = this._specialityStore.fetchSpecialityById(specialityId);
            result.subscribe(
                (speciality: Speciality) => {
                    this.speciality = speciality;
                },
                (error) => {
                    this._router.navigate(['/account-setup/specialities']);
                    this._progressBarService.hide();
                },
                () => {
                    this._progressBarService.hide();
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
        this._progressBarService.show();
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
                let errString = 'Unable to update Speciality.';
                let notification = new Notification({
                    'messages': ErrorMessageFormatter.getErrorMessages(error, errString),
                    'type': 'ERROR',
                    'createdAt': moment()
                });
                this.isSaveSpecialityProgress = false;
                this._notificationsStore.addNotification(notification);
                this._progressBarService.hide();
            },
            () => {
                this.isSaveSpecialityProgress = false;
                this._progressBarService.hide();
            });

    }

}
