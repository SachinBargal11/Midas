import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
import { DiagnosisStore } from '../../../commons/stores/diagnosis-store';
import { DiagnosisCode } from '../../../commons/models/diagnosis-code';
import { DiagnosisType } from '../../../commons/models/diagnosis-type';
import { DiagnosisCodeMasterStore } from '../../../account-setup/stores/diagnosis-code-master-store';
import { ConfirmDialogModule, ConfirmationService } from 'primeng/primeng';

@Component({
    selector: 'diagnosis-code-master',
    templateUrl: './diagnosis-code-master.html'
})

export class DiagnosisCodeMasterComponent implements OnInit {
    private _url: string = `${environment.SERVICE_BASE_URL}`;
    diagnosisCodeForm: FormGroup;
    diagCodes: DiagnosisCode[];
    savedDiagnosisCodes: DiagnosisCode[];
    selectedDiagnosisForCompany: DiagnosisCode[];
    selectedDiagnosisCodes: DiagnosisCode[];
    diagnosisTypes: DiagnosisType[];
    selectedDiagnosisCodesForCompanyStored: DiagnosisCode[];
    showAllDiagnosisCode = true;
    showPreDiagnosisCode = false;
    msg: string;
    isSaveProgress = false;
    codeform;
    isDeleteProgress: boolean = false;
    setpreffredMsg :string;
    setpreffredMsgIcon:string;
    selectedDiagnosisTypeCompnayID:number;
    selectedMode: number = 0;

    constructor(
        private _notificationsService: NotificationsService,
        private fb: FormBuilder,
        private _progressBarService: ProgressBarService,
        private _sessionStore: SessionStore,
        private _diagnosisStore: DiagnosisStore,
        private _diagnosisCodeMasterStore: DiagnosisCodeMasterStore,
        private _router: Router,
        public _route: ActivatedRoute,
        private _notificationsStore: NotificationsStore,
        private confirmationService: ConfirmationService,

    ) {

    }

    ngOnInit() {
        this.loadAllDiagnosisCodes();
        this.loadAllDiagnosisTypes();
    }

    loadAllDiagnosisTypes() {
        this._progressBarService.show();
        let result = this._diagnosisStore.getDiagnosisTypeByCompanyId();
        result.subscribe(
          (diagnosisTypes: DiagnosisType[]) => {
            this.diagnosisTypes = diagnosisTypes;
          },
          (error) => {
            this._progressBarService.hide();
          },
          () => {
            this._progressBarService.hide();
          });
      }

    loadAllDiagnosisCodes() {
        this._progressBarService.show();
        let result = this._diagnosisStore.getAllDiagnosisCodes();
        result.subscribe(
          (diagnosisCodes: DiagnosisCode[]) => {
            this.diagCodes = diagnosisCodes;
          },
          (error) => {
            this._progressBarService.hide();
          },
          () => {
            this._progressBarService.hide();
          });
      }

      loadDiagnosisCodesByCompanyId() {
        this._progressBarService.show();
        this._diagnosisCodeMasterStore.getDiagnosisCodeByCompanyId(this._sessionStore.session.currentCompany.id)
            .subscribe(diagnosisCode => {
                let diagnosisCodes = diagnosisCode;
                this.selectedDiagnosisForCompany = _.map(diagnosisCodes, (currentDiagnosisCode: DiagnosisCode) => {
                    return currentDiagnosisCode.toJS();
                })
                this.selectedDiagnosisCodesForCompanyStored = diagnosisCode.reverse();
                this.savedDiagnosisCodes = diagnosisCode.reverse();
            },
            (error) => {
                this._progressBarService.hide();
            },
            () => {
                this._progressBarService.hide();
            });
    }

    selectOption(event) {
        this.selectedDiagnosisCodes = [];
        this.selectedDiagnosisForCompany = [];
        if (event.target.value == '0') {
            this.selectedDiagnosisTypeCompnayID = 0;
            this.selectedMode = 0;
            this.loadDiagnosisCodesByCompanyId();
        } else  {
            this.selectedDiagnosisTypeCompnayID = parseInt(event.target.value);
            this.loadDiagnosisCodesByCompanyAndDiagnosisType(this.selectedDiagnosisTypeCompnayID);
        } 
        this.msg = '';
    }

    loadDiagnosisCodesByCompanyAndDiagnosisType(diagnosisTypeCompnayID: number) {
        this._progressBarService.show();
        this._diagnosisCodeMasterStore.getDiagnosisCodesByCompanyAndDiagnosisType(this._sessionStore.session.currentCompany.id, diagnosisTypeCompnayID)
            .subscribe(diagnosisCode => {
                let diagnosisCodes = diagnosisCode.reverse();
                this.selectedDiagnosisForCompany = _.map(diagnosisCodes, (currentDiagnosisCode: DiagnosisCode) => {
                    return currentDiagnosisCode.toJS();
                })
                this.selectedDiagnosisCodesForCompanyStored = diagnosisCode.reverse();
                this.savedDiagnosisCodes = diagnosisCode.reverse();
               
            },
            (error) => {
                this._progressBarService.hide();
            },
            () => {
                this._progressBarService.hide();
            });
    }

      showCPreffredDiagnosisCodes(){
          this.showAllDiagnosisCode = false;
          this.showPreDiagnosisCode = true;
          this.loadDiagnosisCodesByCompanyId();
      }

      showCAllDiagnosisCodes(){
        this.showAllDiagnosisCode = true;
        this.showPreDiagnosisCode = false;
        this.loadAllDiagnosisCodes();
    }


    deleteDiagnosisCodeMappings() {
        if (this.selectedDiagnosisCodes.length > 0) {
            this.confirmationService.confirm({
                message: 'Do you want to delete this record?',
                header: 'Delete Confirmation',
                icon: 'fa fa-trash',
                accept: () => {
                    this.selectedDiagnosisCodes.forEach(currentDiagnosisCode => {
                        this.isDeleteProgress = true;
                        this._progressBarService.show();
                        this._diagnosisCodeMasterStore.deleteDiagnosisCodeMapping(currentDiagnosisCode)
                            .subscribe(
                            (response) => {
                                let notification = new Notification({
                                    'title': 'Diagnosis code mapping deleted successfully!',
                                    'type': 'SUCCESS',
                                    'createdAt': moment()

                                });
                                this._notificationsStore.addNotification(notification);
                                if (this.selectedMode == 0) {
                                    this.loadDiagnosisCodesByCompanyId();
                                } else {
                                    this.loadDiagnosisCodesByCompanyAndDiagnosisType(this.selectedDiagnosisTypeCompnayID);
                                } 
                                this._notificationsStore.addNotification(notification);
                                this.selectedDiagnosisCodes = [];
                            },
                            (error) => {
                                let errString = 'Unable to delete diagnosis code mapping';
                                let notification = new Notification({
                                    'messages': ErrorMessageFormatter.getErrorMessages(error, errString),
                                    'type': 'ERROR',
                                    'createdAt': moment()
                                });
                                this.selectedDiagnosisCodes = [];
                                this._progressBarService.hide();
                                this.isDeleteProgress = false;
                                this._notificationsStore.addNotification(notification);
                                this._notificationsService.error('Oh No!', ErrorMessageFormatter.getErrorMessages(error, errString));
                            },
                            () => {
                                this.isDeleteProgress = false;
                                this._progressBarService.hide();
                            });
                    });
                }
            });
        } else {
            let notification = new Notification({
                'title': 'Select diagnosis code to delete',
                'type': 'ERROR',
                'createdAt': moment()
            });
            this._notificationsStore.addNotification(notification);
            this._notificationsService.error('Oh No!', 'Select diagnosis code to delete');
        }
    }
}