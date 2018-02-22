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
  diagnosisCodes: SelectItem[] = [];
  codes: SelectItem[] = [];
  selectedDiagnosisCodes: DiagnosisCode[];
  selectedDiagnosis: DiagnosisCode[];
  diagnosisTypeId: number;
  icdTypeCodeID: number;
  companyId: number;

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
    public sessionStore: SessionStore
  ) {
    // this.dignosisForm = this.fb.group({
    //   dignosisCode: ['', Validators.required]
    // });
  }

  ngOnInit() {
    this.routeFrom;
    // this.loadAllDiagnosisTypes();
    this.loadAllICDTypes();
    this.selectedDiagnosisCodes = this.selectedVisit.patientVisitDiagnosisCodes;
  }

  loadAllDiagnosisTypesByIcdCode() {
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

  loadAllICDTypes() {
    // this._progressBarService.show();
    let result = this._diagnosisStore.getICDTypeCodeByCompanyId();
    result.subscribe(
      (codes: any[]) => {
        this.codes = codes;
      },
      (error) => {
        // this._progressBarService.hide();
      },
      () => {
        // this._progressBarService.hide();
      });
  }

  searchDiagnosisType(event) {
    let currentICDTypeCodeID = event.target.value;
    this.icdTypeCodeID = currentICDTypeCodeID;
    if (currentICDTypeCodeID !== '') {
      this.loadAllDiagnosisTypesByIcdCode();
    } else {
      this.codes = [];
    }
  }

  searchDiagnosisCode(event) {
    let currentDiagnosisTypeId = event.target.value;
    this.diagnosisTypeId = currentDiagnosisTypeId;
    if (currentDiagnosisTypeId !== '') {
      this.loadAllDiagnosisCodesForDiagnosisType(currentDiagnosisTypeId);
    } else {
      this.diagnosisCodes = [];
    }
  }

  loadAllDiagnosisCodesForDiagnosisType(diagnosisTypeId: number) {
    this._progressBarService.show();
    let result = this._diagnosisStore.getDiagnosisCodesByDiagnosisTypeId(diagnosisTypeId);
    result.subscribe(
      (diagnosisCodes: DiagnosisCode[]) => {
        this.diagCodes = diagnosisCodes;
        let diagnosisCodeIds: number[] = _.map(this.selectedDiagnosisCodes, (currentDiagnosisCode: DiagnosisCode) => {
          return currentDiagnosisCode.id;
        });
        let diagnosisCodeDetails = _.filter(diagnosisCodes, (currentDiagnosisCode: DiagnosisCode) => {
          return _.indexOf(diagnosisCodeIds, currentDiagnosisCode.id) < 0 ? true : false;
        });
        this.diagnosisCodes = _.map(diagnosisCodeDetails, (currentDiagnosisCode: DiagnosisCode) => {
          return {
            label: `${currentDiagnosisCode.diagnosisCodeText} - ${currentDiagnosisCode.diagnosisCodeDesc}`,
            // value: currentDiagnosisCode.id.toString()
            value: currentDiagnosisCode
          };
        });
      },
      (error) => {
        this._progressBarService.hide();
      },
      () => {
        this._progressBarService.hide();
      });
  }

  /*loadAllDiagnosisCodesForDiagnosisType(diagnosisTypeId: number) {
    this._progressBarService.show();
    let result = this._diagnosisStore.getDiagnosisCodesByCompanyIdAndDiagnosisTypeId(diagnosisTypeId);
    result.subscribe(
      (diagnosisCodes: DiagnosisCode[]) => {
        this.diagCodes = diagnosisCodes;
        let diagnosisCodeIds: number[] = _.map(this.selectedDiagnosisCodes, (currentDiagnosisCode: DiagnosisCode) => {
          return currentDiagnosisCode.id;
        });
        let diagnosisCodeDetails = _.filter(diagnosisCodes, (currentDiagnosisCode: DiagnosisCode) => {
          return _.indexOf(diagnosisCodeIds, currentDiagnosisCode.id) < 0 ? true : false;
        });
        this.diagnosisCodes = _.map(diagnosisCodeDetails, (currentDiagnosisCode: DiagnosisCode) => {
          return {
            label: `${currentDiagnosisCode.diagnosisCodeText} - ${currentDiagnosisCode.diagnosisCodeDesc}`,
            // value: currentDiagnosisCode.id.toString()
            value: currentDiagnosisCode
          };
        });
      },
      (error) => {
        this._progressBarService.hide();
      },
      () => {
        this._progressBarService.hide();
      });
  }*/


  saveDiagnosisCodes() {
    // let diagnosisCodes = [];
    // this.selectedDiagnosisCodes.forEach(currentDiagnosisCode => {
    //   diagnosisCodes.push({ 'diagnosisCodeId': currentDiagnosisCode.id });
    // });
    // this.saveComplete.emit(diagnosisCodes);
    this.save.emit(this.selectedDiagnosisCodes);
    this.loadAllDiagnosisCodesForDiagnosisType(this.diagnosisTypeId);
  }

  deleteDiagnosis() {
    let diagnosisCodeIds: number[] = _.map(this.selectedDiagnosis, (currentDiagnosisCode: DiagnosisCode) => {
      return currentDiagnosisCode.id;
    });
    let diagnosisCodeDetails = _.filter(this.selectedDiagnosisCodes, (currentDiagnosisCode: DiagnosisCode) => {
      return _.indexOf(diagnosisCodeIds, currentDiagnosisCode.id) < 0 ? true : false;
    });

    this.selectedDiagnosisCodes = diagnosisCodeDetails;
  }

}
