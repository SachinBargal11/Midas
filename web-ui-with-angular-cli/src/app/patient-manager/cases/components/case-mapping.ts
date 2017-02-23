import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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
import { Insurance } from '../../patients/models/insurance';
import { Adjuster } from '../../../account-setup/models/adjuster';
import { AdjusterMasterStore } from '../../../account-setup/stores/adjuster-store';
import { Notification } from '../../../commons/models/notification';
import * as moment from 'moment';
import * as _ from 'underscore';
import { ProgressBarService } from '../../../commons/services/progress-bar-service';
import { NotificationsService } from 'angular2-notifications';

@Component({
    selector: 'case-mapping',
    templateUrl: './case-mapping.html'
})

export class CaseMappingComponent implements OnInit {
    caseMapForm: FormGroup;
    caseMapFormControls: any;
    isSaveProgress = false;
    patientId: number;
    caseId: number;
    insurances: Insurance[] = [];
    insurancesArr: SelectItem[] = [];
    adjustersArr: SelectItem[];
    selectedInsurances: string[] = [];
    selectedInsurance: string[] = [];
    adjusters: Adjuster[] = [];

    constructor(
        private fb: FormBuilder,
        private _router: Router,
        private _notificationsStore: NotificationsStore,
        private _sessionStore: SessionStore,
        private _insuranceMappingStore: InsuranceMappingStore,
        private _casesStore: CasesStore,
        private _insuranceStore: InsuranceStore,
        private _adjusterMasterStore: AdjusterMasterStore,
        private _progressBarService: ProgressBarService,
        private _notificationsService: NotificationsService,
        private _route: ActivatedRoute
    ) {
        this._route.parent.params.subscribe((routeParams: any) => {
            this.caseId = parseInt(routeParams.caseId);
        });
        this._route.parent.parent.params.subscribe((routeParams: any) => {
            this.patientId = parseInt(routeParams.patientId);
            this._progressBarService.show();

            let fetchInsuranceMappings = this._insuranceMappingStore.getInsuranceMappings(this.caseId);
            let fetchInsurances = this._insuranceStore.getInsurances(this.patientId);
            let fetchAdjusters = this._adjusterMasterStore.getAdjusterMasters();

            Observable.forkJoin([fetchInsurances, fetchInsuranceMappings, fetchAdjusters])
                .subscribe((results) => {
                    this.insurances = results[0];
                    let mappedInsurances: InsuranceMapping = results[1];
                    this.adjusters = results[2];

                    this.adjustersArr = _.map(this.adjusters, (currentAdjuster: Adjuster) => {
                        return {
                            label: `${currentAdjuster.firstName} - ${currentAdjuster.lastName}`,
                            value: currentAdjuster.id.toString()
                        };
                    });
                    this.insurancesArr = _.map(this.insurances, (currentInsurance: Insurance) => {
                        return {
                            label: `${currentInsurance.insuranceCompanyCode} - ${currentInsurance.policyHoldersName}`,
                            value: currentInsurance.id.toString()
                        };
                    });
                        this.selectedInsurances = _.map(mappedInsurances.patientInsuranceInfos, (currentInsurance: Insurance) => {
                            return currentInsurance.id.toString();
                    });
                    // mappedInsurances.forEach(element => {
                    //      _.map(element.patientInsuranceInfos, (currentInsurance: Insurance) => {
                    //         return this.selectedInsurances.push(currentInsurance.id.toString());
                    //     });
                    // });
                },
                (error) => {
                    this._router.navigate(['../../'], { relativeTo: this._route });
                    this._progressBarService.hide();
                },
                () => {
                    this._progressBarService.hide();
                });
        });

        this.caseMapForm = this.fb.group({
            insurance: ['']
        });

        this.caseMapFormControls = this.caseMapForm.controls;
    }

    ngOnInit() {
    }

    save() {
        let caseMapFormValues = this.caseMapForm.value;
        let patientInsuranceInfos = [];
        let input = caseMapFormValues.insurance;
        for (let i = 0; i < input.length; ++i) {
            patientInsuranceInfos.push({ 'id': parseInt(input[i]) });
        }
        let insuranceMapping = new InsuranceMapping({
            caseId: this.caseId,
            patientInsuranceInfos: patientInsuranceInfos
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
                    this._router.navigate(['../../'], { relativeTo: this._route });
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
