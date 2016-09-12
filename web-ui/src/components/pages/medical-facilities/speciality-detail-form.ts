import {Component, OnInit, ElementRef, Input} from '@angular/core';
import {ROUTER_DIRECTIVES, Router, ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {List} from 'immutable';
import {FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES, Validators, FormControl, FormGroup, FormBuilder, AbstractControl} from '@angular/forms';
import {RadioButtonModule} from 'primeng/primeng';
import moment from 'moment';
import {MedicalFacilityService} from '../../../services/medical-facility-service';
import {MedicalFacilityStore} from '../../../stores/medical-facilities-store';
import {SessionStore} from '../../../stores/session-store';
import {SpecialityDetail} from '../../../models/speciality-details';
import {Speciality} from '../../../models/speciality';
import {MedicalFacilityDetail} from '../../../models/medical-facility-details';
import {SpecialityStore} from '../../../stores/speciality-store';
import {AppValidators} from '../../../utils/AppValidators';

import {NotificationsStore} from '../../../stores/notifications-store';
import {Notification} from '../../../models/notification';

@Component({
    selector: 'speciality-detail-form',
    templateUrl: 'templates/pages/medical-facilities/speciality-detail-form.html',
    directives: [FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES, ROUTER_DIRECTIVES],
    providers: [FormBuilder]
})


export class SpecialityDetailFormComponent {

    @Input() specialityDetail: SpecialityDetail;
    @Input() medicalFacilityDetail: MedicalFacilityDetail;
    private _specialityDetailJS = null;
    isSpecialityDetailSaveInProgress = false;
    get specialityDetailJS() {
        if (!this._specialityDetailJS) {
            this._specialityDetailJS = this.specialityDetail.toJS();
        }
        return this._specialityDetailJS;
    }

    specialities: Observable<List<Speciality>>;
    specialityDetailForm: FormGroup;
    specialityDetailFormControls;

    constructor(
        public _route: ActivatedRoute,
        public _router: Router,
        private fb: FormBuilder,
        private _notificationsStore: NotificationsStore,
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
            id: this.specialityDetail.id,
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
        let result;

        result = this._medicalFacilityStore.updateSpecialityDetail(specialityDetail, this.medicalFacilityDetail);
        result.subscribe(
            (response) => {
                let notification = new Notification({
                    'title': 'Speciality saved successfully!',
                    'type': 'SUCCESS',
                    'createdAt': moment()
                });
                this._notificationsStore.addNotification(notification);
                this._router.navigate(['/medical-facilities/' + this.medicalFacilityDetail.medicalfacility.id + '/specialities']);
            },
            (error) => {
                this.isSpecialityDetailSaveInProgress = false;
                let notification = new Notification({
                    'title': 'Unable to save Speciality.',
                    'type': 'ERROR',
                    'createdAt': moment()
                });
                this._notificationsStore.addNotification(notification);
            },
            () => {
                this.isSpecialityDetailSaveInProgress = false;
            });

    }
}