import { Case } from '../models/case';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { SelectItem } from 'primeng/primeng';
import { ErrorMessageFormatter } from '../../../commons/utils/ErrorMessageFormatter';
import { AppValidators } from '../../../commons/utils/AppValidators';
import { SessionStore } from '../../../commons/stores/session-store';
import { NotificationsStore } from '../../../commons/stores/notifications-store';
import { CasesStore } from '../stores/case-store';
import { InsuranceMappingStore } from '../stores/insurance-mapping-store';
import { InsuranceStore } from '../../patients/stores/insurance-store';
import { InsuranceMapping } from '../models/insurance-mapping';
import { Mapping } from '../models/mapping';
import { Insurance } from '../../patients/models/insurance';
import { Adjuster } from '../../../account-setup/models/adjuster';
import { AdjusterMasterStore } from '../../../account-setup/stores/adjuster-store';
import { Notification } from '../../../commons/models/notification';
import * as moment from 'moment';
import * as _ from 'underscore';
import { ProgressBarService } from '../../../commons/services/progress-bar-service';
import { NotificationsService } from 'angular2-notifications';

@Component({
    selector: 'assign-insurance',
    templateUrl: './assign-insurance.html'
})

export class AssignInsuranceComponent implements OnInit {
    assignInsuranceForm: FormGroup;
    assignInsuranceFormControls: any;
    isSaveProgress = false;
    patientId: number;
    caseId: number;
    insurances: Insurance[] = [];
    insurancesArr: SelectItem[] = [];
    adjustersArr: SelectItem[];
    selectedInsurances: any;
    // selectedInsurances: string[] = [];
    selectedInsurance: string[] = [];
    adjusters: Adjuster[] = [];

    constructor(
        private fb: FormBuilder,
        private _router: Router,
        private _notificationsStore: NotificationsStore,
        public sessionStore: SessionStore,
        private _insuranceMappingStore: InsuranceMappingStore,
        private _casesStore: CasesStore,
        private _insuranceStore: InsuranceStore,
        private _adjusterMasterStore: AdjusterMasterStore,
        private _progressBarService: ProgressBarService,
        private _notificationsService: NotificationsService,
        private _route: ActivatedRoute
    ) {
        this._route.parent.parent.params.subscribe((routeParams: any) => {
            this.caseId = parseInt(routeParams.caseId);
        });
        this._route.parent.parent.parent.params.subscribe((routeParams: any) => {
            this.patientId =this.sessionStore.session.user.id;
            this._progressBarService.show();

            let fetchInsurances = this._insuranceStore.getInsurances(this.patientId);
            let fetchInsuranceMappings = this._insuranceMappingStore.getInsuranceMappings(this.caseId);

            Observable.forkJoin([fetchInsurances, fetchInsuranceMappings])
                .subscribe((results) => {
                    let insurances = results[0];
                    let mappedInsurances: Mapping[] = results[1].mappings;
                    let mappedInsuranceIds: number[] = _.map(mappedInsurances, (currentMapping: Mapping) => {
                        return currentMapping.patientInsuranceInfo.id;
                    });
                    let insuranceDetails = _.filter(insurances, (currentInsurance: Insurance) => {
                        return _.indexOf(mappedInsuranceIds, currentInsurance.id) < 0 ? true : false;
                    });
                    this.insurances = insuranceDetails.reverse();
                },
                (error) => {
                    // this._router.navigate(['../../'], { relativeTo: this._route });
                    this._progressBarService.hide();
                },
                () => {
                    this._progressBarService.hide();
                });
        });

        this.assignInsuranceForm = this.fb.group({
            insurances: ['']
        });

        this.assignInsuranceFormControls = this.assignInsuranceForm.controls;
    }

    ngOnInit() {
    }

    save() {
        this.selectedInsurances;
        let assignInsuranceFormValues = this.assignInsuranceForm.value;
        // let mappingDetails: any[] = [];
        // let mapping = new Mapping({
        //     patientInsuranceInfo: {
        //         id: mappingDetail.insurance
        //     },
        //     adjusterMaster: {
        //     }
        // });
        // mappingDetails.push(mapping);
        let mappings = [];
        let insurance: any[] = this.selectedInsurances;
        let adjuster = assignInsuranceFormValues.adjuster;
        insurance.forEach(currentInsurance => {
            mappings.push({
                patientInsuranceInfo: {
                    'id': parseInt(currentInsurance.id, 10)
                },
                adjusterMaster: {
                    // 'id': parseInt(adjuster)
                }
            });
        });
        let insuranceMapping = new InsuranceMapping({
            caseId: this.caseId,
            mappings: mappings
        });
        this._progressBarService.show();
        this.isSaveProgress = true;
        let result;

        result = this._insuranceMappingStore.addInsuranceMapping(insuranceMapping);
        result.subscribe(
            (response) => {
                let notification = new Notification({
                    'title': 'Insurance mapped successfully!',
                    'type': 'SUCCESS',
                    'createdAt': moment()
                });
                this._notificationsStore.addNotification(notification);
                this._router.navigate(['../'], { relativeTo: this._route });
            },
            (error) => {
                let errString = 'Unable to map insurance.';
                let notification = new Notification({
                    'messages': ErrorMessageFormatter.getErrorMessages(error, errString),
                    'type': 'ERROR',
                    'createdAt': moment()
                });
                this.isSaveProgress = false;
                this._notificationsStore.addNotification(notification);
                this._notificationsService.error('Oh No!', ErrorMessageFormatter.getErrorMessages(error, errString));
                this._progressBarService.hide();
            },
            () => {
                this.isSaveProgress = false;
                this._progressBarService.hide();
            });

    }

}
