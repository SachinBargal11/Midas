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
import {ConfirmDialogModule,ConfirmationService} from 'primeng/primeng';

@Component({
    selector: 'insurance-mapping',
    templateUrl: './insurance-mapping.html'
})

export class InsuranceMappingComponent implements OnInit {
    patientId: number;
    caseId: number;
    insurances: Insurance[] = [];
    // insurances: Insurance[] = [];
    insurancesArr: SelectItem[] = [];
    adjustersArr: SelectItem[];
    insuranceMapping: InsuranceMapping[];
    selectedInsurances: InsuranceMapping[];
    // selectedInsurances: string[] = [];
    selectedInsurance: string[] = [];
    adjusters: Adjuster[] = [];
    isDeleteProgress: boolean = false;
    caseStatusId: number;

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
        private _route: ActivatedRoute,
        private confirmationService: ConfirmationService,
    ) {
        this._route.parent.params.subscribe((routeParams: any) => {
            this.caseId = parseInt(routeParams.caseId);
            let result = this._casesStore.fetchCaseById(this.caseId);
            result.subscribe(
                (caseDetail: Case) => {
                    this.caseStatusId = caseDetail.caseStatusId;
                },
                (error) => {
                    this._router.navigate(['../'], { relativeTo: this._route });
                    this._progressBarService.hide();
                },
                  () => {
                    this._progressBarService.hide();
                });
            
        });
        this._route.parent.parent.params.subscribe((routeParams: any) => {
            this.patientId = parseInt(routeParams.patientId);
            this._progressBarService.show();

            let fetchInsuranceMappings = this._insuranceMappingStore.getInsuranceMappings(this.caseId);
            let fetchInsurances = this._insuranceStore.getInsurances(this.patientId);
            let fetchAdjusters = this._adjusterMasterStore.getAdjusterMasters();

            Observable.forkJoin([fetchInsurances, fetchInsuranceMappings, fetchAdjusters])
                .subscribe((results) => {
                    let insurances = results[0];
                    this.insuranceMapping = results[1];
                    let mappings: Mapping[] = results[1].mappings;
                    this.adjusters = results[2];

                    this.adjustersArr = _.map(this.adjusters, (currentAdjuster: Adjuster) => {
                        return {
                            label: `${currentAdjuster.firstName} - ${currentAdjuster.lastName}`,
                            value: currentAdjuster.id.toString()
                        };
                    });

                    let insuranceDetails: Insurance[] = _.map(mappings, (currentInsurance: any) => {
                        return currentInsurance.patientInsuranceInfo;
                    });
                    insuranceDetails.forEach(insurance => {
                        this._insuranceStore.fetchInsuranceById(insurance.id)
                            .subscribe((insurance: Insurance) => {
                                this.insurances.push(insurance);
                            });
                    });
                    // this.insurances = insuranceDetails.reverse();
                    // this.insurances = mappings.reverse();
                },
                (error) => {
                    this._progressBarService.hide();
                },
                () => {
                    this._progressBarService.hide();
                });
        });
    }

    ngOnInit() {
    }

    deleteInsurance() {
        if (this.selectedInsurances !== undefined) {
            this.confirmationService.confirm({
            message: 'Do you want to delete this record?',
            header: 'Delete Confirmation',
            icon: 'fa fa-trash',
            accept: () => {
            this.selectedInsurances.forEach(currentInsurance => {
                let mappings = [];
                let insurance: any[] = this.selectedInsurances;
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
                this.isDeleteProgress = true;
                let result;
                result = this._insuranceMappingStore.deleteInsuranceMapping(insuranceMapping);
                result.subscribe(
                    (response) => {
                        let notification = new Notification({
                            'title': 'Insurance deleted successfully!',
                            'type': 'SUCCESS',
                            'createdAt': moment()
                        });
                        // this.loadPatients();
                        this._notificationsStore.addNotification(notification);
                        this.selectedInsurances = [];
                    },
                    (error) => {
                        let errString = 'Unable to delete insurance ';
                        let notification = new Notification({
                            'messages': ErrorMessageFormatter.getErrorMessages(error, errString),
                            'type': 'ERROR',
                            'createdAt': moment()
                        });
                        this.selectedInsurances = [];
                        this._progressBarService.hide();
                        this.isDeleteProgress = false;
                        this._notificationsStore.addNotification(notification);
                        this._notificationsService.error('Oh No!', ErrorMessageFormatter.getErrorMessages(error, errString));
                    },
                    () => {
                        this._progressBarService.hide();
                        this.isDeleteProgress = false;
                    });
            });
            }
            });
        } else {
            let notification = new Notification({
                'title': 'Select insurances to delete',
                'type': 'ERROR',
                'createdAt': moment()
            });
            this._notificationsStore.addNotification(notification);
            this._notificationsService.error('Oh No!', 'Select insurances to delete');
        }
    }

}
