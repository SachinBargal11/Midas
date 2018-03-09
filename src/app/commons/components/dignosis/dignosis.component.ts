import { Data } from '@angular/router';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import * as moment from 'moment';
import * as _ from 'underscore';
import { NotificationsService } from 'angular2-notifications';
import { SelectItem, ConfirmDialogModule, ConfirmationService } from 'primeng/primeng';
import { Notification } from '../../models/notification';
import { NotificationsStore } from '../../stores/notifications-store';
import { ProgressBarService } from '../../services/progress-bar-service';
import { DiagnosisCode } from '../../models/diagnosis-code';
import { DiagnosisType } from '../../models/diagnosis-type';
import { DiagnosisStore } from '../../stores/diagnosis-store';
import { PatientVisit } from '../../../patient-manager/patient-visit/models/patient-visit';
import { SessionStore } from '../../stores/session-store';
import { DiagnosisCodeMasterStore } from '../../../account-setup/stores/diagnosis-code-master-store';

@Component({
  selector: 'app-dignosis',
  templateUrl: './dignosis.component.html',
  styleUrls: ['./dignosis.component.scss']
})
export class DignosisComponent implements OnInit {
  dignosisForm: FormGroup;
  diagnosisTypes: DiagnosisType[];
  selectedDiagnosisType: DiagnosisType;
  diagCodes: DiagnosisCode[];
  diagnosisCodesArr: DiagnosisCode[];
  diagnosisCodesCompArr: DiagnosisCode[];
  codes: SelectItem[] = [];
  selectedDiagnosisCodes: DiagnosisCode[];
  selectedDiagnosis: DiagnosisCode[];
  selectedDiagnosisForCompany: DiagnosisCode[];
  showAllDiagnosisCode = false;
  showPreDiagnosisCode = true;
  msg: string;
  isSaveProgress = false;
  isDeleteProgress: boolean = false;
  setpreffredMsg :string;
  setpreffredMsgIcon:string;
  selectedDiagnosisTypeCompnayID:number;
  selectedMode: number = 0;

  @Input() selectedVisit: PatientVisit;
  @Input() routeFrom: number;
  @Output() save: EventEmitter<DiagnosisCode[]> = new EventEmitter();
  @Output() uploadError: EventEmitter<Error> = new EventEmitter();

  constructor(
    private _notificationsService: NotificationsService,
    private fb: FormBuilder,
    private _notificationsStore: NotificationsStore,
    private _progressBarService: ProgressBarService,
    private _diagnosisStore: DiagnosisStore,
    private _confirmationService: ConfirmationService,
    public sessionStore: SessionStore,
    private _diagnosisCodeMasterStore: DiagnosisCodeMasterStore
  ) {
    // this.dignosisForm = this.fb.group({
    //   dignosisCode: ['', Validators.required]
    // });
  }

  ngOnInit() {
    this.routeFrom;
    this.loadAllDiagnosisCodes();
    //this.loadDiagnosisCodesByCompanyId();
    this. loadAllDiagnosisTypes();
    this.selectedDiagnosisCodes = this.selectedVisit.patientVisitDiagnosisCodes;
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
    result.subscribe((diagnosisCodes: DiagnosisCode[]) => {
        this.diagCodes = diagnosisCodes;
        let diagnosisCodeIds: number[] = _.map(this.selectedDiagnosisCodes, (currentProcedure: DiagnosisCode) => {
                       return currentProcedure.diagnosisCodeId;
               });
       let diganosisDetails = _.filter(this.diagCodes, (currentDiagnosis: DiagnosisCode) => {
                        return _.indexOf(diagnosisCodeIds, currentDiagnosis.diagnosisCodeId) < 0 ? true : false;
                   });

       this.diagnosisCodesArr =  diganosisDetails;          
                      
       /* this.diagnosisCodesArr = _.map(diganosisDetails, (currDiagnosis: DiagnosisCode) => {
            return {
                label: `${currDiagnosis.diagnosisCodeText} - ${currDiagnosis.diagnosisCodeDesc}`,
                value: currDiagnosis
            };
        })*/
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
  let result1 = this._diagnosisCodeMasterStore.getDiagnosisCodeByCompanyId(this.sessionStore.session.currentCompany.id);
  result1.subscribe((diagnosisCodes: DiagnosisCode[]) => {

     this.diagCodes = diagnosisCodes;
     let diagnosisCodeIds: number[] = _.map(this.selectedDiagnosisCodes, (currentProcedure: DiagnosisCode) => {
                    return currentProcedure.diagnosisCodeId;
            });
    let diganosisDetails = _.filter(this.diagCodes, (currentDiagnosis: DiagnosisCode) => {
                     return _.indexOf(diagnosisCodeIds, currentDiagnosis.diagnosisCodeId) < 0 ? true : false;
                });

     this.diagnosisCodesCompArr = diganosisDetails;
    /*this.diagnosisCodesCompArr = _.map(diganosisDetails, (currDiagnosis: DiagnosisCode) => {
        return {
            label: `${currDiagnosis.diagnosisCodeText} - ${currDiagnosis.diagnosisCodeDesc}`,
            value: currDiagnosis
        };
    })*/
},
    (error) => {
        this._progressBarService.hide();
    },
    () => {
        this._progressBarService.hide();
    });
}
  
selectOption(event) {
  this.selectedDiagnosisForCompany = [];
  if (event.target.value == '0') {
      this.selectedDiagnosisTypeCompnayID = 0;
      this.selectedMode = 0;
      //this.loadDiagnosisCodesByCompanyId();
  } else  {
      this.selectedDiagnosisTypeCompnayID = parseInt(event.target.value);
      this.loadDiagnosisCodesByCompanyAndDiagnosisType(this.selectedDiagnosisTypeCompnayID);
  } 
  this.msg = '';
}

loadDiagnosisCodesByCompanyAndDiagnosisType(diagnosisTypeCompnayID: number) {
  this._progressBarService.show();
  let result2 = this._diagnosisCodeMasterStore.getDiagnosisCodesByCompanyAndDiagnosisType(this.sessionStore.session.currentCompany.id, diagnosisTypeCompnayID);
  result2.subscribe((diagnosisCodes: DiagnosisCode[]) => {
    this.diagCodes = diagnosisCodes;
    debugger;
    let diagnosisCodeIds: number[] = _.map(this.selectedDiagnosisCodes, (currentProcedure: DiagnosisCode) => {
                   return currentProcedure.diagnosisCodeId;
           });
   let diganosisDetails = _.filter(this.diagCodes, (currentDiagnosis: DiagnosisCode) => {
                    return _.indexOf(diagnosisCodeIds, currentDiagnosis.diagnosisCodeId) < 0 ? true : false;
               });

   this.diagnosisCodesCompArr =   diganosisDetails;        
    /*this.diagnosisCodesCompArr = _.map(diganosisDetails, (currDiagnosis: DiagnosisCode) => {
        return {
            label: `${currDiagnosis.diagnosisCodeText} - ${currDiagnosis.diagnosisCodeDesc}`,
            value: currDiagnosis
        };
    })*/
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
  //this.loadDiagnosisCodesByCompanyId();
}

showCAllDiagnosisCodes(){
this.showAllDiagnosisCode = true;
this.showPreDiagnosisCode = false;
this.loadAllDiagnosisCodes();
}


  saveDiagnosisCodes() {
      if(this.selectedDiagnosisCodes.length > 0)
      {
        this.save.emit(this.selectedDiagnosisCodes);
        this.showAllDiagnosisCode = false;
        this.showPreDiagnosisCode = true;
        if(this.selectedDiagnosisTypeCompnayID != 0)
        {
            this.loadDiagnosisCodesByCompanyAndDiagnosisType(this.selectedDiagnosisTypeCompnayID);
        }
        else{
            this.diagnosisCodesCompArr = [];
        }
        this.loadAllDiagnosisCodes();
      }
      else
      {
        let errString = 'Please select diagnosis code to save .';
        this._notificationsService.error('Oh No!', errString);
      }
  
  }

  deleteDiagnosis() {
    let diagnosisCodeIds: number[] = _.map(this.selectedDiagnosis, (currentDiagnosisCode: DiagnosisCode) => {
      return currentDiagnosisCode.diagnosisCodeId;
    });
    let diagnosisCodeDetails = _.filter(this.selectedDiagnosisCodes, (currentDiagnosisCode: DiagnosisCode) => {
      return _.indexOf(diagnosisCodeIds, currentDiagnosisCode.diagnosisCodeId) < 0 ? true : false;
    });
    this.selectedDiagnosisCodes = diagnosisCodeDetails;
    if(this.selectedDiagnosisTypeCompnayID != 0)
    {
        this.loadDiagnosisCodesByCompanyAndDiagnosisType(this.selectedDiagnosisTypeCompnayID);
    }
    else{
        this.diagnosisCodesCompArr = [];
    }
    this.loadAllDiagnosisCodes();
  }

}
