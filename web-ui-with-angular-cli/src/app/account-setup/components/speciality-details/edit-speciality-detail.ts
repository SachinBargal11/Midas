import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import * as moment from 'moment';
import { NotificationsService } from 'angular2-notifications';
import { ErrorMessageFormatter } from '../../../commons/utils/ErrorMessageFormatter';
import { SpecialityStore } from '../../stores/speciality-store';
import { SpecialityDetail } from '../../models/speciality-details';
import { Speciality } from '../../models/speciality';
import { SpecialityDetailsStore } from '../../stores/speciality-details-store';
import { AppValidators } from '../../../commons/utils/AppValidators';

import { NotificationsStore } from '../../../commons/stores/notifications-store';
import { Notification } from '../../../commons/models/notification';
import { ProgressBarService } from '../../../commons/services/progress-bar-service';
import { SessionStore } from '../../../commons/stores/session-store';

@Component({
    selector: 'edit-speciality-details',
    templateUrl: './edit-speciality-detail.html'
})


export class EditSpecialityDetailsComponent {
    specialityId: number;
    speciality: Speciality;
    associatedSpeciality: string;
    // mandatoryProcCode: boolean = false;
    specialityDetail: SpecialityDetail;
    isSpecialityDetailSaveInProgress = false;
    // specialities: Observable<List<Speciality>>;
    specialities: Speciality[];
    title: string;
    specialityDetailForm: FormGroup;
    specialityDetailFormControls: any;
    options = {
        timeOut: 3000,
        showProgressBar: true,
        pauseOnHover: false,
        clickToClose: false
    };
    specialityDetailJS: any = null;

    constructor(
        public _route: ActivatedRoute,
        public _router: Router,
        private fb: FormBuilder,
        private _notificationsStore: NotificationsStore,
        private _notificationsService: NotificationsService,
        private _specialityDetailsStore: SpecialityDetailsStore,
        private _progressBarService: ProgressBarService,
        public _sessionStore: SessionStore,
        private _specialityStore: SpecialityStore
    ) {
        // this.specialities = this._specialityStore.specialities;

        this._route.parent.params.subscribe((routeParams: any) => {
            this.specialityId = parseInt(routeParams.id, 10);
            this._progressBarService.show();
            this._specialityStore.fetchSpecialityById(this.specialityId)
                .subscribe(
                (speciality: Speciality) => {
                    this.speciality = speciality;
                    this.associatedSpeciality = speciality.name;
                },
                (error) => {
                    this._router.navigate(['/account-setup/specialities']);
                    this._progressBarService.hide();
                },
                () => {
                    this._progressBarService.hide();
                });
            let requestData = {
                company: {
                    id: this._sessionStore.session.currentCompany.id
                },
                specialty: {
                    id: this.specialityId
                }
            };
            let result = this._specialityDetailsStore.getSpecialityDetails(requestData);
            result.subscribe(
                (specialityDetail: SpecialityDetail) => {
                    this.specialityDetail = specialityDetail;
                    if (this.specialityDetail.id) {
                        this.specialityDetailJS = this.specialityDetail.toJS();
                        this.title = 'Edit Specialty Detail';
                        // this.mandatoryProcCode = this.specialityDetail.mandatoryProcCode;
                    } else {
                        this.title = 'Add Specialty Detail';
                        this.specialityDetailJS = new SpecialityDetail({});
                    }
                },
                (error) => {
                    this._router.navigate(['/account-setup/specialities']);
                    this._progressBarService.hide();
                },
                () => {
                    this._progressBarService.hide();
                });
        });
        this.specialityDetailForm = this.fb.group({
            initialCodes: [''],
            reevalCodes: [''],
            initialDays: [''],
            ReevalDays: [''],
            ReevalVisits: [''],
            initialVisits: [''],
            isInitialEvaluation: [''],
            include1500: [''],
            maxReval: [''],
            speciality: [{ value: '', disabled: true }],
            allowMultipleVisit: [''],
            // mandatoryProcCode: ['']
        });
        // this.specialityDetailForm = this.fb.group({
        //     initialCodes: [''],
        //     ReevalDays: ['', Validators.required],
        //     reevalvisitCount: ['', Validators.required],
        //     initialDays: ['', Validators.required],
        //     initialvisitCount: ['', Validators.required],
        //     maxReval: ['', Validators.required],
        //     isInitialEvaluation: [''],
        //     include1500: [''],
        //     speciality: [{ value: '', disabled: true }],
        //     allowMultipleVisit: ['']
        // });

        this.specialityDetailFormControls = this.specialityDetailForm.controls;
    }
    ngOnInit() {
        this._specialityStore.getSpecialities()
            .subscribe(specialities => { this.specialities = specialities; });
    }

    saveSpecialityDetail() {
        let specialityDetailFormValues = this.specialityDetailForm.value;
        let specialityDetail = new SpecialityDetail({
            // id: this.specialityDetail.id,
            ReevalDays: specialityDetailFormValues.ReevalDays,
            reevalvisitCount: specialityDetailFormValues.ReevalVisits,
            initialDays: specialityDetailFormValues.initialDays,
            initialvisitCount: specialityDetailFormValues.initialVisits,
            maxReval: specialityDetailFormValues.maxReval,
            isInitialEvaluation: parseInt(specialityDetailFormValues.isInitialEvaluation) ? true : false,
            associatedSpecialty: this.specialityId,
            include1500: parseInt(specialityDetailFormValues.include1500) ? true : false,
            allowmultipleVisit: parseInt(specialityDetailFormValues.allowMultipleVisit) ? true : false,
            InitialCode: specialityDetailFormValues.initialCodes,
            ReEvalCode: specialityDetailFormValues.reevalCodes,
            // mandatoryProcCode: specialityDetailFormValues.mandatoryProcCode,
            specialty: new Speciality({
                id: this.specialityId
            })

        });

        this._progressBarService.show();
        this.isSpecialityDetailSaveInProgress = true;
        let result: Observable<SpecialityDetail>;
        if (this.specialityDetail.id) {
            result = this._specialityDetailsStore.updateSpecialityDetail(specialityDetail, this.specialityDetail.id);
            result.subscribe(
                (response: SpecialityDetail) => {
                    let notification = new Notification({
                        'title': 'Specialty details updated successfully!',
                        'type': 'SUCCESS',
                        'createdAt': moment()
                    });
                    this._notificationsStore.addNotification(notification);
                    // this._router.navigate(['../../'], { relativeTo: this._route });
                    this._router.navigate(['/account-setup/specialities']);
                },
                (error) => {
                    let errString = 'Unable to update specialty details.';
                    let notification = new Notification({
                        'messages': ErrorMessageFormatter.getErrorMessages(error, errString),
                        'type': 'ERROR',
                        'createdAt': moment()
                    });
                    this.isSpecialityDetailSaveInProgress = false;
                    this._notificationsStore.addNotification(notification);
                    this._notificationsService.error('Oh No!', ErrorMessageFormatter.getErrorMessages(error, errString));
                    this._progressBarService.hide();
                },
                () => {
                    this.isSpecialityDetailSaveInProgress = false;
                    this._progressBarService.hide();
                });
        } else {
            result = this._specialityDetailsStore.addSpecialityDetail(specialityDetail);
            result.subscribe(
                (response: SpecialityDetail) => {
                    let notification = new Notification({
                        'title': 'Specialty details added successfully!',
                        'type': 'SUCCESS',
                        'createdAt': moment()
                    });
                    this._notificationsStore.addNotification(notification);
                    // this._router.navigate(['../../'], { relativeTo: this._route });
                    this._router.navigate(['/account-setup/specialities']);
                },
                (error) => {
                    let errString = 'Unable to add specialty details.';
                    let notification = new Notification({
                        'messages': ErrorMessageFormatter.getErrorMessages(error, errString),
                        'type': 'ERROR',
                        'createdAt': moment()
                    });
                    this.isSpecialityDetailSaveInProgress = false;
                    this._notificationsStore.addNotification(notification);
                    this._notificationsService.error('Oh No!', ErrorMessageFormatter.getErrorMessages(error, errString));
                    this._progressBarService.hide();
                },
                () => {
                    this.isSpecialityDetailSaveInProgress = false;
                    this._progressBarService.hide();
                });

        }
    }
}