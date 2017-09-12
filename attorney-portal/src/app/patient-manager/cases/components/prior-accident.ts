import { Component, OnInit, ElementRef } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { SessionStore } from '../../../commons/stores/session-store';
import { Accident } from '../models/accident';
import { ErrorMessageFormatter } from '../../../commons/utils/ErrorMessageFormatter';
import { NotificationsStore } from '../../../commons/stores/notifications-store';
import { AppValidators } from '../../../commons/utils/AppValidators';
import { StatesStore } from '../../../commons/stores/states-store';
import { ProgressBarService } from '../../../commons/services/progress-bar-service';
import { NotificationsService } from 'angular2-notifications';
import { Notification } from '../../../commons/models/notification';
import * as moment from 'moment';
import { Address } from '../../../commons/models/address';
import { AccidentStore } from '../stores/accident-store';
import { PatientsStore } from '../../patients/stores/patients-store';
import * as _ from 'underscore';
import { CasesStore } from '../../cases/stores/case-store';
import { Case } from '../models/case';
import { environment } from '../../../../environments/environment';
import { AccidentTreatment } from '../models/accident-treatment';
import { AccidentWitness } from '../models/accident-witness';
import { PriorAccident } from '../models/prior-accident';

@Component({
    selector: 'prior-accident',
    templateUrl: './prior-accident.html'
})

export class PriorAccidentComponent implements OnInit {
    priorAccident: PriorAccident;

    patientId: number;
    patientTypeId: string;
    caseId: number;
    prioraccidentform: FormGroup;
    prioraccidentformControls;
    isSaveProgress = false;
    caseDetail: Case;
    caseStatusId: number;
    caseViewedByOriginator: boolean = false;

    isAccidentBefore = '0';
    isLawsuitOrWorkersComp = '0';
    isPhysicalComplaints = '0';

    isAccidentBeforeLabel = '0';
    isLawsuitOrWorkersCompLabel = '0';
    isPhysicalComplaintsLabel = '0';

    constructor(
        private fb: FormBuilder,
        private _router: Router,
        public _route: ActivatedRoute,
        private _accidentStore: AccidentStore,
        private _notificationsStore: NotificationsStore,
        private _progressBarService: ProgressBarService,
        private _sessionStore: SessionStore,
        private _elRef: ElementRef,
        private _notificationsService: NotificationsService,
        private _casesStore: CasesStore,
    ) {
        this._route.parent.params.subscribe((routeParams: any) => {
            this.caseId = parseInt(routeParams.caseId, 10);
            this._progressBarService.show();
            let result = this._accidentStore.getPriorAccidentByCaseId(this.caseId);
            result.subscribe(
                (data: PriorAccident[]) => {
                    if (data.length > 0 && data[0].id) {
                        this.priorAccident = data[0];
                        this.isAccidentBefore = String(this.priorAccident.accidentBefore) ? '1' : '0';
                        this.isLawsuitOrWorkersComp = String(this.priorAccident.lawsuitWorkerCompBefore) ? '1' : '0';
                        this.isPhysicalComplaints = String(this.priorAccident.physicalComplaintsBefore) ? '1' : '0';

                        this.isAccidentBeforeLabel = this.priorAccident.accidentBefore ? 'Yes' : 'No';
                        this.isLawsuitOrWorkersCompLabel = this.priorAccident.lawsuitWorkerCompBefore ? 'Yes' : 'No';
                        this.isPhysicalComplaintsLabel = this.priorAccident.physicalComplaintsBefore ? 'Yes' : 'No';
                    } else {
                        this.priorAccident = new PriorAccident({});
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

        this._route.parent.params.subscribe((routeParams: any) => {
            this.caseId = parseInt(routeParams.caseId, 10);
            this._progressBarService.show();
            let result = this._casesStore.fetchCaseById(this.caseId);
            result.subscribe(
                (caseDetail: Case) => {
                    if (caseDetail.orignatorCompanyId != _sessionStore.session.currentCompany.id) {
                        this.caseViewedByOriginator = false;
                    } else {
                        this.caseViewedByOriginator = true;
                    }
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

        this.prioraccidentform = this.fb.group({
            isAccidentBefore: [''],
            previusAccidentDescription: [''],
            isLawsuitOrWorkersComp: [''],
            lawsuitOrWorkersCompDescription: [''],
            isPhysicalComplaints: [''],
            physicalComplaintDescription: [''],
            otherInfo: ['']
        });
        this.prioraccidentformControls = this.prioraccidentform.controls;
    }

    ngOnInit() {
    }

    save() {
        this.isSaveProgress = true;
        let prioraccidentformValues = this.prioraccidentform.value;
        let addResult;
        let result;
        if (this.priorAccident.id) {
            let priorAccidentJS = this.priorAccident.toJS();
            let priorAccident = new PriorAccident(_.extend(priorAccidentJS, {
                caseId: this.caseId,
                accidentBefore: parseInt(prioraccidentformValues.isAccidentBefore),
                accidentBeforeExplain: prioraccidentformValues.previusAccidentDescription,
                lawsuitWorkerCompBefore: parseInt(prioraccidentformValues.isLawsuitOrWorkersComp),
                lawsuitWorkerCompBeforeExplain: prioraccidentformValues.lawsuitOrWorkersCompDescription,
                physicalComplaintsBefore: parseInt(prioraccidentformValues.isPhysicalComplaints),
                physicalComplaintsBeforeExplain: prioraccidentformValues.physicalComplaintDescription,
                otherInformation: prioraccidentformValues.otherInfo
            }));
            this._progressBarService.show();
            result = this._accidentStore.savePriorAccident(priorAccident);
            result.subscribe(
                (response) => {
                    let notification = new Notification({
                        'title': 'Prior accident/injuries information updated successfully!',
                        'type': 'SUCCESS',
                        'createdAt': moment()
                    });
                    this._notificationsStore.addNotification(notification);
                    // this._router.navigate(['../../'], { relativeTo: this._route });
                    this._notificationsService.success('Success!', 'Prior accident/injuries information updated successfully');
                },
                (error) => {
                    let errString = 'Unable to update prior accident/injuries information.';
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

        else {
            let priorAccident = new PriorAccident({
                caseId: this.caseId,
                accidentBefore: parseInt(prioraccidentformValues.isAccidentBefore),
                accidentBeforeExplain: prioraccidentformValues.previusAccidentDescription,
                lawsuitWorkerCompBefore: parseInt(prioraccidentformValues.isLawsuitOrWorkersComp),
                lawsuitWorkerCompBeforeExplain: prioraccidentformValues.lawsuitOrWorkersCompDescription,
                physicalComplaintsBefore: parseInt(prioraccidentformValues.isPhysicalComplaints),
                physicalComplaintsBeforeExplain: prioraccidentformValues.physicalComplaintDescription,
                otherInformation: prioraccidentformValues.otherInfo
            });
            this._progressBarService.show();
            addResult = this._accidentStore.savePriorAccident(priorAccident);
            addResult.subscribe(
                (response) => {
                    let notification = new Notification({
                        'title': 'Prior accident/injuries information added successfully!',
                        'type': 'SUCCESS',
                        'createdAt': moment()
                    });
                    this._notificationsStore.addNotification(notification);
                    this._router.navigate(['/patient-manager/patients']);
                },
                (error) => {
                    let errString = 'Unable to add prior accident/injuries information.';
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

}

