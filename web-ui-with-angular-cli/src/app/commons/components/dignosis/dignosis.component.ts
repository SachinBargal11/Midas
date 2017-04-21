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
  selectedDiagnosisCodes: DiagnosisCode[];
  selectedDiagnosisToDelete: DiagnosisCode[];

  @Input() selectedVisit: PatientVisit;
  @Output() uploadComplete: EventEmitter<Document[]> = new EventEmitter();
  @Output() uploadError: EventEmitter<Error> = new EventEmitter();

  constructor(
    private _notificationsService: NotificationsService,
    private fb: FormBuilder,
    private _notificationsStore: NotificationsStore,
    private _progressBarService: ProgressBarService,
    private _diagnosisStore: DiagnosisStore,
    private _confirmationService: ConfirmationService
  ) {
    // this.dignosisForm = this.fb.group({
    //   dignosisCode: ['', Validators.required]
    // });
  }

  ngOnInit() {
    this.loadAllDiagnosisTypes();
  }

  loadAllDiagnosisTypes() {
    this._progressBarService.show();
    let result = this._diagnosisStore.getAllDiagnosisTypes();
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

  searchDiagnosis(event) {
    let currentDiagnosisTypeId = event.target.value;
    if (currentDiagnosisTypeId !== '') {
      this.loadAllDiagnosisCodesForType(currentDiagnosisTypeId);
    } else {
      this.diagnosisCodes = [];
    }
  }

  loadAllDiagnosisCodesForType(diagnosisTypeId: number) {
    this._progressBarService.show();
    let result = this._diagnosisStore.getDiagnosisCodesByDiagnosisType(diagnosisTypeId);
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


  saveDiagnosis() {
  }

  deleteDiagnosis() {
      let diagnosisCodeIds: number[] = _.map(this.selectedDiagnosisToDelete, (currentDiagnosisCode: DiagnosisCode) => {
        return currentDiagnosisCode.id;
      });
      let diagnosisCodeDetails = _.filter(this.selectedDiagnosisCodes, (currentDiagnosisCode: DiagnosisCode) => {
        return _.indexOf(diagnosisCodeIds, currentDiagnosisCode.id) < 0 ? true : false;
      });

      this.selectedDiagnosisCodes = diagnosisCodeDetails;
  }

}
