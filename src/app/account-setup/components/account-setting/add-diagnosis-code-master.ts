import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, PatternValidator } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { LazyLoadEvent, SelectItem } from 'primeng/primeng';
import { NotificationsStore } from '../../../commons/stores/notifications-store';
import { SessionStore } from '../../../commons/stores/session-store';
import { Notification } from '../../../commons/models/notification';
import * as moment from 'moment';
import * as _ from 'underscore';
import { Observable } from 'rxjs/Rx';
import { ProgressBarService } from '../../../commons/services/progress-bar-service';
import { NotificationsService } from 'angular2-notifications';
import { ErrorMessageFormatter } from '../../../commons/utils/ErrorMessageFormatter';
import { environment } from '../../../../environments/environment';
import { DiagnosisCode } from '../../../commons/models/diagnosis-code';
import { DiagnosisStore } from '../../../commons/stores/diagnosis-store';
import { DiagnosisCodeAdapter } from '../../../commons/services/adapters/diagnosis-code-adapter';
import { DiagnosisCodeMasterStore } from '../../../account-setup/stores/diagnosis-code-master-store';
import { ConfirmDialogModule, ConfirmationService } from 'primeng/primeng';

@Component({
    selector: 'add-diagnosis-code',
    templateUrl: './add-diagnosis-code-master.html'
})

export class AddDiagnosisCodeComponent implements OnInit {
    private _url: string = `${environment.SERVICE_BASE_URL}`;
    unamePattern = "^[a-zA-Z0-9 _-]+$";
    diagnosisCodesForm: FormGroup;
    diagnosisCodes: DiagnosisCode[];
    savedDiagnosis: DiagnosisCode[];
    selectedDiagnosisCodes: DiagnosisCode[] = [];
    selectedDiagnosisForCompanyStored: DiagnosisCode[];
    selectedDiagnosisForCompany: DiagnosisCode[];
    selectedDiagnosis: DiagnosisCode[];
    DiagnosisList: DiagnosisCode[] = [];
    selectedDiagnosisToDelete: DiagnosisCode[];
    diagnosisCodesArr: SelectItem[] = [];
    msg: string;
    arrAll: DiagnosisCode[];
    isSaveProgress = false;
    selDiagnosisCodes = [];
    codeform;
    selectedDiagnosisCode: DiagnosisCode[];
    isDeleteProgress: boolean = false;
    newDiagnosisTypeText = "";

    constructor(
        private _notificationsService: NotificationsService,
        private fb: FormBuilder,
        private _progressBarService: ProgressBarService,
        private _diagnosisStore: DiagnosisStore,
        private _sessionStore: SessionStore,
        private _diagnosisCodeMasterStore: DiagnosisCodeMasterStore,
        private _router: Router,
        public _route: ActivatedRoute,
        private _notificationsStore: NotificationsStore,
        private confirmationService: ConfirmationService,

    ) {
       
    }

    ngOnInit() {
        this.selectedDiagnosisCodes = [];
        this.loadAllDiagnosisCodes();
    }

    loadAllDiagnosisCodes() {
        this._progressBarService.show();
        let result = this._diagnosisStore.getAllDiagnosisCodes();
        result.subscribe((diagnosisCodes: DiagnosisCode[]) => {
            debugger;
            this.diagnosisCodesArr = _.map(diagnosisCodes, (currDiagnosis: DiagnosisCode) => {
                return {
                    label: `${currDiagnosis.diagnosisCodeText} - ${currDiagnosis.diagnosisCodeDesc}`,
                    value: currDiagnosis
                };
            })
        },
            (error) => {
                this._progressBarService.hide();
            },
            () => {
                this._progressBarService.hide();
            });
    }


   saveDiagnosisCodes() {
        let result;
        this.isSaveProgress = true;
        if(this.newDiagnosisTypeText.trim() != "" && this.newDiagnosisTypeText.trim() != undefined)
        {
        if (this.selectedDiagnosis != undefined   && this.selectedDiagnosis.length > 0) 
        {
            this.selectedDiagnosis.forEach(currentDiagnosis => {
                this.selDiagnosisCodes.push({
                    'diagnosisCodeID': currentDiagnosis.id,
                    'companyID': this._sessionStore.session.currentCompany.id,
                    'diagnosisTypeCompnayID': 0,
                    'diagnosisTypeText':this.newDiagnosisTypeText
                });
            });
                result = this._diagnosisCodeMasterStore.saveDiagnosisCodesToCompnay(this.selDiagnosisCodes,);
                result.subscribe(
                    (response) => {
                        let notification = new Notification({
                            'title': 'Diagnosis codes added successfully',
                            'type': 'SUCCESS',
                            'createdAt': moment()
                        });
                        this._notificationsStore.addNotification(notification);
                        this._notificationsService.success('Success!', 'Diagnosis codes added successfully');
                        this._router.navigate(['../'], { relativeTo: this._route });
                        },
                    (error) => {
                        this.isSaveProgress = false;
                        let errString = 'Unable to Save Diagnosis code .';
                        this._notificationsService.error('Oh No!', ErrorMessageFormatter.getErrorMessages(error, errString));
                    },
                    () => {
                        this.isSaveProgress = false;
                    });
           
        }
        else {
            debugger;
            this.isSaveProgress = false;
            let notification = new Notification({
                'title': 'Select record to save',
                'type': 'ERROR',
                'createdAt': moment()
            });
            this._notificationsStore.addNotification(notification);
            this._notificationsService.error('Oh No!', 'Select record to save');
        }
    }
    else {
        this.isSaveProgress = false;
        let notification = new Notification({
            'title': 'Enter group name to save',
            'type': 'ERROR',
            'createdAt': moment()
        });
        this._notificationsStore.addNotification(notification);
        this._notificationsService.error('Oh No!', 'Enter group name to save');
    }
 }

    reset() {
        this.diagnosisCodes = null;
        this.selectedDiagnosisCodes = [];
        this.newDiagnosisTypeText = "";
        this.loadAllDiagnosisCodes();
    }

    deleteDiagnosisCodeMappings() {
        if (this.selectedDiagnosisCodes.length > 0) {
            let diagnosisCodeIDs: number[] = _.map(this.selectedDiagnosisCodes, (currentDiagnosisCode: DiagnosisCode) => {
                return currentDiagnosisCode.id;
            });
            let diagnosisCodeDetails = _.filter(this.selectedDiagnosis, (currentDiagnosisCode: DiagnosisCode) => {
                return _.indexOf(diagnosisCodeIDs, currentDiagnosisCode.id) < 0 ? true : false;
            });

            this.selectedDiagnosis = diagnosisCodeDetails;
        } else {
            let notification = new Notification({
                'title': 'Select diagnosis to delete',
                'type': 'ERROR',
                'createdAt': moment()
            });
            this._notificationsStore.addNotification(notification);
            this._notificationsService.error('Oh No!', 'Select diagnosis to delete');
        }
    }
   
}