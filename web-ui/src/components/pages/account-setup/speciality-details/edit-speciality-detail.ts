import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import moment from 'moment';
import { NotificationsService } from 'angular2-notifications';
import { ErrorMessageFormatter } from '../../../../utils/ErrorMessageFormatter';
import { SpecialityStore } from '../../../../stores/speciality-store';
import { SpecialityDetail } from '../../../../models/speciality-details';
import { Speciality } from '../../../../models/speciality';
import { SpecialityDetailsStore } from '../../../../stores/speciality-details-store';
import { AppValidators } from '../../../../utils/AppValidators';

import { NotificationsStore } from '../../../../stores/notifications-store';
import { Notification } from '../../../../models/notification';

@Component({
    selector: 'edit-speciality-details',
    templateUrl: 'templates/pages/account-setup/speciality-details/edit-speciality-detail.html',
    providers: [FormBuilder]
})


export class EditSpecialityDetailsComponent {
    speciality = new Speciality({});
    specialityDetail = new SpecialityDetail({});
    isSpecialityDetailSaveInProgress = false;
    // specialities: Observable<List<Speciality>>;
    specialities: Speciality[];
    specialityDetailForm: FormGroup;
    specialityDetailFormControls: any;
    options = {
        timeOut: 3000,
        showProgressBar: true,
        pauseOnHover: false,
        clickToClose: false
    };
    specialityDetailJS;

    constructor(
        public _route: ActivatedRoute,
        public _router: Router,
        private fb: FormBuilder,
        private _notificationsStore: NotificationsStore,
        private _notificationsService: NotificationsService,
        private _specialityDetailsStore: SpecialityDetailsStore,
        private _specialityStore: SpecialityStore
    ) {
        // this.specialities = this._specialityStore.specialities;

        this._route.params.subscribe((routeParams: any) => {
            let specialityDetailId: number = parseInt(routeParams.id);
            let result = this._specialityDetailsStore.fetchSpecialityDetailById(specialityDetailId);
            result.subscribe(
                (specialityDetail: any) => {
                    this.specialityDetail = specialityDetail;
                    this.speciality = specialityDetail.specialty;
                    this.specialityDetailJS = this.specialityDetail.toJS();
                },
                (error) => {
                    this._router.navigate(['/speciality-details']);
                },
                () => {
                });
        });
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
            id: this.specialityDetail.id,
            ReevalDays: parseInt(specialityDetailFormValues.ReevalDays),
            reevalvisitCount: parseInt(specialityDetailFormValues.reevalvisitCount),
            initialDays: parseInt(specialityDetailFormValues.initialDays),
            initialvisitCount: parseInt(specialityDetailFormValues.initialvisitCount),
            isnitialEvaluation: parseInt(specialityDetailFormValues.isInitialEvaluation) ? true : false,
            include1500: parseInt(specialityDetailFormValues.include1500) ? true : false,
            allowmultipleVisit: parseInt(specialityDetailFormValues.allowMultipleVisit) ? true : false,
            maxReval: parseInt(specialityDetailFormValues.maxReval),
            specialty: new Speciality({
                id: parseInt(specialityDetailFormValues.associatedSpeciality)
            })
        });

        this.isSpecialityDetailSaveInProgress = true;
        let result: Observable<SpecialityDetail>;

        result = this._specialityDetailsStore.updateSpecialityDetail(specialityDetail);
        result.subscribe(
            (response: SpecialityDetail) => {
                let notification = new Notification({
                    'title': 'Speciality Details updated successfully!',
                    'type': 'SUCCESS',
                    'createdAt': moment()
                });
                this._notificationsStore.addNotification(notification);
                this._router.navigate(['../../'], { relativeTo: this._route });
            },
            (error) => {
                let errString = 'Unable to update Speciality Details.';
                let notification = new Notification({
                    'title': ErrorMessageFormatter.getErrorMessages(error, errString),
                    'type': 'ERROR',
                    'createdAt': moment()
                });
                this.isSpecialityDetailSaveInProgress = false;
                this._notificationsStore.addNotification(notification);
            },
            () => {
                this.isSpecialityDetailSaveInProgress = false;
            });
    }
}