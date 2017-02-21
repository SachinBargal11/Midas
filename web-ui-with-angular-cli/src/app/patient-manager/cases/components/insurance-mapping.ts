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
import { Case } from '../models/case';
import { InsuranceMapping } from '../models/insurance-mapping';
import { Insurance } from '../../patients/models/insurance';
import { User } from '../../../commons/models/user';
import { Notification } from '../../../commons/models/notification';
import * as moment from 'moment';
import * as _ from 'underscore';
import { ProgressBarService } from '../../../commons/services/progress-bar-service';
import { NotificationsService } from 'angular2-notifications';

@Component({
    selector: 'insurance-map',
    templateUrl: './insurance-mapping.html'
})

export class InsuranceMapComponent implements OnInit {
    options = {
        timeOut: 3000,
        showProgressBar: true,
        pauseOnHover: false,
        clickToClose: false
    };
    insuranceMapform: FormGroup;
    insuranceMapformControls: any;
    isSaveProgress = false;
    user = new User({});
    patientId: number;
    caseId: number;
    insurances: Insurance[] = [];
    insurancesArr: SelectItem[] = [];
    selectedInsurances: string[] = [];

    constructor(
        private fb: FormBuilder,
        private _router: Router,
        private _notificationsStore: NotificationsStore,
        private _sessionStore: SessionStore,
        private _insuranceMappingStore: InsuranceMappingStore,
        private _casesStore: CasesStore,
        private _insuranceStore: InsuranceStore,
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

            Observable.forkJoin([fetchInsurances, fetchInsuranceMappings])
                .subscribe((results) => {
                    let insurances: Insurance[] = results[0];
                    let mappedInsurances: InsuranceMapping[] = results[1];

                    this.insurancesArr = _.map(insurances, (currentInsurance: Insurance) => {
                        return {
                            label: `${currentInsurance.insuranceCompanyCode} - ${currentInsurance.insuranceTypeLabel}`,
                            value: currentInsurance.id.toString()
                        };
                    });
                    for (let mappedInsurance of mappedInsurances) {
                        this.selectedInsurances = _.map(mappedInsurance.patientInsuranceInfos, (currentInsurance: Insurance) => {
                            return currentInsurance.id.toString();
                        });
                    }
                },
                (error) => {
                    this._router.navigate(['../../']);
                    this._progressBarService.hide();
                },
                () => {
                    this._progressBarService.hide();
                });
        });

        this.insuranceMapform = this.fb.group({
            insurance: ['']
        });

        this.insuranceMapformControls = this.insuranceMapform.controls;
    }

    ngOnInit() {
    }

    saveInsuranceMapping() {
        let insuranceMapformValues = this.insuranceMapform.value;
        let patientInsuranceInfos = [];
        let input = insuranceMapformValues.insurance;
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
                this._router.navigate(['/medical-provider/users']);
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
