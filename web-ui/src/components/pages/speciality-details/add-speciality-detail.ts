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
    // specialities: Observable<List<Speciality>>;
    specialities: Speciality[];
    specialityDetailForm: FormGroup;
    specialityDetailFormControls: any;
    specialityDetail = new SpecialityDetail({});
    specialityDetailJS;

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
        this.specialityDetailJS = this.specialityDetail.toJS();
        // this.specialities = this._specialityStore.specialities;
        this.specialityDetailForm = this.fb.group({
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
    ngOnInit() {
        this._specialityStore.getSpecialities()
            .subscribe(specialities => { this.specialities = specialities; });
    }

    saveSpecialityDetail() {
        let specialityDetailFormValues = this.specialityDetailForm.value;
        let specialityDetail = new SpecialityDetail({
            ReevalDays: parseInt(specialityDetailFormValues.ReevalDays),
            reevalvisitCount: parseInt(specialityDetailFormValues.reevalvisitCount),
            initialDays: parseInt(specialityDetailFormValues.initialDays),
            initialvisitCount: parseInt(specialityDetailFormValues.initialvisitCount),
            isnitialEvaluation: parseInt(specialityDetailFormValues.isInitialEvaluation),
            include1500: parseInt(specialityDetailFormValues.include1500),
            allowmultipleVisit: parseInt(specialityDetailFormValues.allowMultipleVisit),
            maxReval: parseInt(specialityDetailFormValues.maxReval),
            specialty: new Speciality({            
            	id: parseInt(specialityDetailFormValues.associatedSpeciality)
            }),
            company: new Company ({            
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
                this._router.navigate(['/speciality-details']);

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