import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { List } from 'immutable';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import moment from 'moment';
import { NotificationsService } from 'angular2-notifications';
import { MedicalFacilityService } from '../../../services/medical-facility-service';
import { MedicalFacilityStore } from '../../../stores/medical-facilities-store';
import { SpecialityDetail } from '../../../models/speciality-details';
import { Speciality } from '../../../models/speciality';
import { MedicalFacilityDetail } from '../../../models/medical-facility-details';
import { SpecialityStore } from '../../../stores/speciality-store';
import { AppValidators } from '../../../utils/AppValidators';

import { NotificationsStore } from '../../../stores/notifications-store';
import { Notification } from '../../../models/notification';

@Component({
    selector: 'update-speciality-detail',
    templateUrl: 'templates/pages/medical-facilities/update-speciality-detail.html',
    providers: [FormBuilder]
})


export class UpdateSpecialityDetailComponent {

    @Input() medicalFacilityDetail: MedicalFacilityDetail;
    @Output() updateSpecialityDetailSuccess = new EventEmitter();
    @Output() updateSpecialityDetailError = new EventEmitter();

    private _specialityDetail: SpecialityDetail = null;

    @Input() set specialityDetail(value: SpecialityDetail) {
        if (value) {
            this._specialityDetail = value;
            this.specialityDetailForTemplate = this._specialityDetail.toJS();
        } else {
            this._specialityDetail = null;
            this.specialityDetailForTemplate = null;
        }
    }
    specialityDetailForTemplate = null;
    isSpecialityDetailSaveInProgress = false;
    specialities: Observable<List<Speciality>>;
    specialityDetailForm: FormGroup;
    specialityDetailFormControls: any;

    options = {
        timeOut: 3000,
        showProgressBar: true,
        pauseOnHover: false,
        clickToClose: false,
        maxLength: 10
    };

    constructor(
        public _route: ActivatedRoute,
        public _router: Router,
        private fb: FormBuilder,
        private _notificationsStore: NotificationsStore,
        private _notificationsService: NotificationsService,
        private _medicalFacilityService: MedicalFacilityService,
        private _medicalFacilityStore: MedicalFacilityStore,
        private _specialityStore: SpecialityStore
    ) {
        this.specialities = this._specialityStore.specialities;
        this.specialityDetailForm = this.fb.group({
            isUnitApply: [''],
            followUpDays: ['', Validators.required],
            followupTime: ['', Validators.required],
            initialDays: ['', Validators.required],
            initialTime: ['', Validators.required],
            isInitialEvaluation: [''],
            include1500: [''],
            associatedSpeciality: ['', [Validators.required, AppValidators.selectedValueValidator]],
            allowMultipleVisit: ['']
        });

        this.specialityDetailFormControls = this.specialityDetailForm.controls;
    }

    saveSpecialityDetail() {
        let specialityDetailFormValues = this.specialityDetailForm.value;
        let specialityDetail = new SpecialityDetail({
            id: this._specialityDetail.id,
            isUnitApply: parseInt(specialityDetailFormValues.isUnitApply),
            followUpDays: parseInt(specialityDetailFormValues.followUpDays),
            followupTime: parseInt(specialityDetailFormValues.followupTime),
            initialDays: parseInt(specialityDetailFormValues.initialDays),
            initialTime: parseInt(specialityDetailFormValues.initialTime),
            isInitialEvaluation: parseInt(specialityDetailFormValues.isInitialEvaluation),
            include1500: parseInt(specialityDetailFormValues.include1500),
            associatedSpeciality: parseInt(specialityDetailFormValues.associatedSpeciality),
            allowMultipleVisit: parseInt(specialityDetailFormValues.allowMultipleVisit)
        });
        this.isSpecialityDetailSaveInProgress = true;
        let result: Observable<SpecialityDetail>;

        // result = this._medicalFacilityStore.updateSpecialityDetail(specialityDetail, this.medicalFacilityDetail);
        result.subscribe(
            (response: SpecialityDetail) => {
                let notification = new Notification({
                    'title': 'Speciality Details added successfully!',
                    'type': 'SUCCESS',
                    'createdAt': moment()
                });
                this._notificationsStore.addNotification(notification);
                this.resetForm();
                this.updateSpecialityDetailSuccess.emit(response);
                this._router.navigate(['/account-setup/speciality-details']);
            },
            (error) => {
                this.isSpecialityDetailSaveInProgress = false;
                let notification = new Notification({
                    'title': 'Unable to update Speciality Details.',
                    'type': 'ERROR',
                    'createdAt': moment()
                });
                this._notificationsStore.addNotification(notification);
                this._notificationsService.error('Oh No!', 'Unable to update Speciality Details.');
                this.updateSpecialityDetailError.emit(error);
            },
            () => {
                this.isSpecialityDetailSaveInProgress = false;
            });

    }

    resetForm() {
        this.specialityDetailForm.reset();
        _.defer(() => {
            this.specialityDetail = this._specialityDetail;
        });
    }
}