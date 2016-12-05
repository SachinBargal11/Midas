import {Component, Input, Output, EventEmitter} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {List} from 'immutable';
import {Validators, FormGroup, FormBuilder} from '@angular/forms';
import moment from 'moment';
import {NotificationsService} from 'angular2-notifications';
import {SpecialityStore} from '../../../stores/speciality-store';
import {SpecialityDetail} from '../../../models/speciality-details';
import {Speciality} from '../../../models/speciality';
import { Company }  from '../../../models/company';
import {SpecialityDetailsStore} from '../../../stores/speciality-details-store';
import {AppValidators} from '../../../utils/AppValidators';

import {NotificationsStore} from '../../../stores/notifications-store';
import {Notification} from '../../../models/notification';

@Component({
    selector: 'add-speciality-details',
    templateUrl: 'templates/pages/speciality-details/add-speciality-detail.html',
    providers: [FormBuilder]
})


export class AddSpecialityDetailsComponent {
    isSpecialityDetailSaveInProgress = false;
    specialities: Observable<List<Speciality>>;
    specialityDetailForm: FormGroup;
    specialityDetailFormControls: any;

    options = {
        timeOut: 3000,
        showProgressBar: true,
        pauseOnHover: false,
        clickToClose: false
    };

    constructor(
        public _route: ActivatedRoute,
        public _router: Router,
        private fb: FormBuilder,
        private _notificationsStore: NotificationsStore,
        private _notificationsService: NotificationsService,
        private _specialityDetailsStore: SpecialityDetailsStore,
        private _specialityStore: SpecialityStore
    ) {
        this.specialities = this._specialityStore.specialities;
        this.specialityDetailForm = this.fb.group({
            isUnitApply: [''],
            ReevalDays: ['', Validators.required],
            reevalvisitCount: ['', Validators.required],
            initialDays: ['', Validators.required],
            initialvisitCount: ['', Validators.required],
            maxReval: ['', Validators.required],
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
            // isUnitApply: parseInt(specialityDetailFormValues.isUnitApply),
            ReevalDays: parseInt(specialityDetailFormValues.ReevalDays),
            reevalvisitCount: parseInt(specialityDetailFormValues.reevalvisitCount),
            initialDays: parseInt(specialityDetailFormValues.initialDays),
            initialvisitCount: parseInt(specialityDetailFormValues.initialvisitCount),
            isInitialEvaluation: parseInt(specialityDetailFormValues.isInitialEvaluation),
            include1500: parseInt(specialityDetailFormValues.include1500),
            allowmultipleVisit: parseInt(specialityDetailFormValues.allowMultipleVisit),
            maxReval: parseInt(specialityDetailFormValues.maxReval),
            Specialty: new Speciality({            
            	id: parseInt(specialityDetailFormValues.associatedSpeciality)
            }),
            Company: new Company ({            
            	id:1
            })
        });
        this.isSpecialityDetailSaveInProgress = true;
        let result: Observable<SpecialityDetail>;

        result = this._specialityDetailsStore.addSpecialityDetail(specialityDetail);
        result.subscribe(
            (response: SpecialityDetail) => {
                let notification = new Notification({
                    'title': 'Speciality Details added successfully!',
                    'type': 'SUCCESS',
                    'createdAt': moment()
                });
                this._notificationsStore.addNotification(notification);
                this._router.navigate(['/specialitydetails']);

            },
            (error) => {
                let notification = new Notification({
                    'title': 'Unable to add Speciality Details.',
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