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
    insurancesArr: SelectItem[] = [];
    adjustersArr: SelectItem[];
    insuranceMapping: InsuranceMapping;
    selectedInsurances: InsuranceMapping[];
    selectedInsurance: string[] = [];
    adjusters: Adjuster[] = [];
    isDeleteProgress: boolean = false;
    caseStatusId: number;
    caseDetail: Case;
    insurance: boolean = false;

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
                    this.caseDetail = caseDetail;
                    this.caseStatusId = caseDetail.caseStatusId;
                    if (caseDetail.orignatorCompanyId == _sessionStore.session.currentCompany.id) {
                        this.insurance = true;
                    } else {
                        this.insurance = false;
                    }
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
                fetchInsuranceMappings.subscribe((result) => {
                    this.insuranceMapping = result;
                    this.insurances = _.map(this.insuranceMapping.mappings, (currentMapping: any) => {
                        return currentMapping.patientInsuranceInfo;
                    });
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
                        let errString = 'Unable to delete Insurance ';
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
                'title': 'select Insurances to delete',
                'type': 'ERROR',
                'createdAt': moment()
            });
            this._notificationsStore.addNotification(notification);
            this._notificationsService.error('Oh No!', 'select Insurances to delete');
        }
    }

}
