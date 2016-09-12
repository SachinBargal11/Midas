import {Component, OnInit, ElementRef, Input, Output, EventEmitter} from '@angular/core';
import {ROUTER_DIRECTIVES, Router, ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {List} from 'immutable';
import {FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES, Validators, FormControl, FormGroup, FormBuilder, AbstractControl} from '@angular/forms';
import {RadioButtonModule} from 'primeng/primeng';
import moment from 'moment';
import {SimpleNotificationsComponent, NotificationsService} from 'angular2-notifications';
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
    selector: 'add-speciality-details',
    templateUrl: 'templates/pages/medical-facilities/add-speciality-details.html',
    directives: [FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES, ROUTER_DIRECTIVES],
    providers: [FormBuilder]
})


export class AddSpecialityDetailComponent {

    @Input() medicalFacilityDetail: MedicalFacilityDetail;
    @Output() addSpecialityDetailSuccess = new EventEmitter();
    @Output() addSpecialityDetailError = new EventEmitter();

    private _specialityDetail: SpecialityDetail = new SpecialityDetail({});

    set specialityDetail(value: SpecialityDetail) {
        this._specialityDetail = value;
        this.specialityDetailForTemplate = this._specialityDetail.toJS();
    }
    specialityDetailForTemplate = this._specialityDetail.toJS();

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

        result = this._medicalFacilityStore.updateSpecialityDetail(specialityDetail, this.medicalFacilityDetail);
        result.subscribe(
            (response: SpecialityDetail) => {
                let notification = new Notification({
                    'title': 'Speciality added successfully!',
                    'type': 'SUCCESS',
                    'createdAt': moment()
                });
                this._notificationsStore.addNotification(notification);
                this.specialityDetailForm.reset();
                this.addSpecialityDetailSuccess.emit(response);
                _.defer(() => {
                    this.specialityDetail = new SpecialityDetail({});
                });
            },
            (error) => {
                this.isSpecialityDetailSaveInProgress = false;
                let notification = new Notification({
                    'title': 'Unable to add Speciality.',
                    'type': 'ERROR',
                    'createdAt': moment()
                });
                this._notificationsStore.addNotification(notification);
                this._notificationsService.error('Oh No!', 'Unable to add Speciality.');
                this.addSpecialityDetailError.emit(error);
            },
            () => {
                this.isSpecialityDetailSaveInProgress = false;
            });

    }
}