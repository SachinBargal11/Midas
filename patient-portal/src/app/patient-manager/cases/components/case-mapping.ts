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
import { Adjuster } from '../../patients/models/adjuster';
import { AdjusterMasterStore } from '../../patients/stores/adjuster-store';
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
    selectedInsurances: any;
    // selectedInsurances: string[] = [];
    selectedInsurance: string[] = [];
    adjusters: Adjuster[] = [];

    constructor(
        private fb: FormBuilder,
        private _router: Router,
       public notificationsStore: NotificationsStore,
        public sessionStore: SessionStore,
        private _insuranceMappingStore: InsuranceMappingStore,
        private _casesStore: CasesStore,
        private _insuranceStore: InsuranceStore,
        private _adjusterMasterStore: AdjusterMasterStore,
        public progressBarService: ProgressBarService,
        private _notificationsService: NotificationsService,
        private _route: ActivatedRoute
    ) {
        this._route.parent.params.subscribe((routeParams: any) => {
            this.caseId = parseInt(routeParams.caseId);
        });
        // this._route.parent.parent.params.subscribe((routeParams: any) => {
        //     this.patientId = parseInt(routeParams.patientId);
            this.patientId = this.sessionStore.session.user.id;
            this.progressBarService.show();

            let fetchInsuranceMappings = this._insuranceMappingStore.getInsuranceMappings(this.caseId);
            let fetchInsurances = this._insuranceStore.getInsurances(this.patientId);
            let fetchAdjusters = this._adjusterMasterStore.getAdjusterMasters();

            Observable.forkJoin([fetchInsurances, fetchInsuranceMappings, fetchAdjusters])
                .subscribe((results) => {
                    let insurances = results[0];
                    let mappedInsurances: Mapping[] = results[1].mappings;
                    this.adjusters = results[2];

                    this.adjustersArr = _.map(this.adjusters, (currentAdjuster: Adjuster) => {
                        return {
                            label: `${currentAdjuster.firstName} - ${currentAdjuster.lastName}`,
                            value: currentAdjuster.id.toString()
                        };
                    });
                    let insuranceDetails = _.map(insurances, (currentInsurance: Insurance) => {
                        this.addMappingDetails();
                        return _.extend(currentInsurance);
                    });
                    this.insurances = insuranceDetails.reverse();
                    // this.insurancesArr = _.map(this.insurances, (currentInsurance: Insurance) => {
                    //     return {
                    //         label: `${currentInsurance.insuranceCompanyCode} - ${currentInsurance.policyHoldersName}`,
                    //         value: currentInsurance.id.toString()
                    //     };
                    // });
                    // this.selectedInsurances = _.map(mappedInsurances, (currentInsurance: any) => {
                    //     return currentInsurance.patientInsuranceInfo.id.toString();
                    // });
                },
                (error) => {
                    this._router.navigate(['../../'], { relativeTo: this._route });
                    this.progressBarService.hide();
                },
                () => {
                    this.progressBarService.hide();
                });
        // });

        this.caseMapForm = this.fb.group({
            mappingDetails: this.fb.array([
            ])
        });

        this.caseMapFormControls = this.caseMapForm.controls;
    }

    ngOnInit() {
    }
    initMappingDetails(): FormGroup {
        return this.fb.group({
            insurance: [],
            adjuster: []
        });
    }
    addMappingDetails(): void {
        const control: FormArray = <FormArray>this.caseMapForm.controls['mappingDetails'];
        control.push(this.initMappingDetails());
    }

    getMappingDetails() {
        let caseMapFormValues = this.caseMapForm.value;
        let mappingDetails: any[] = [];
        for (let mappingDetail of caseMapFormValues.mappingDetails) {
            let mapping = new Mapping({
                patientInsuranceInfo: {
                    id: mappingDetail.insurance
                },
                adjusterMaster: {
                    id: mappingDetail.adjuster
                }
            });
            mappingDetails.push(mapping);
        }
        return mappingDetails;
    }
    save() {
        this.selectedInsurances;
        let caseMapFormValues = this.caseMapForm.value;
        // let mappings = [];
        // let insurance = caseMapFormValues.insurance;
        // let adjuster = caseMapFormValues.adjuster;
        // for (let i = 0; i < insurance.length; ++i) {
        //     mappings.push({
        //         patientInsuranceInfo: {
        //             'id': parseInt(insurance)
        //         },
        //         adjusterMaster: {
        //             'id': parseInt(adjuster)
        //         }
        //     });
        // }
        let mappings = this.getMappingDetails();
        let insuranceMapping = new InsuranceMapping({
            caseId: this.caseId,
            mappings: mappings
        });
        this.progressBarService.show();
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
                this.notificationsStore.addNotification(notification);
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
                this.notificationsStore.addNotification(notification);
                this._notificationsService.error('Oh No!', ErrorMessageFormatter.getErrorMessages(error, errString));
                this.progressBarService.hide();
            },
            () => {
                this.isSaveProgress = false;
                this.progressBarService.hide();
            });

    }

}
