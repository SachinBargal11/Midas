import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import * as moment from 'moment';
import * as _ from 'underscore';
import { NotificationsService } from 'angular2-notifications';
import { SelectItem } from 'primeng/primeng';
import { ProgressBarService } from '../../services/progress-bar-service';
import { DiagnosisCode } from '../../models/diagnosis-code';
import { DiagnosisType } from '../../models/diagnosis-type';
import { DiagnosisStore } from '../../stores/diagnosis-store';

@Component({
  selector: 'app-dignosis',
  templateUrl: './dignosis.component.html',
  styleUrls: ['./dignosis.component.scss']
})
export class DignosisComponent implements OnInit {
  dignosisForm: FormGroup;
  diagnosisTypes: DiagnosisType[];
  // diagnosisCodes: DiagnosisCode[];
    diagnosisCodes: SelectItem[] = [];

  @Input() url: string;
  @Output() uploadComplete: EventEmitter<Document[]> = new EventEmitter();
  @Output() uploadError: EventEmitter<Error> = new EventEmitter();

  constructor(
    private _notificationsService: NotificationsService,
    private fb: FormBuilder,
    private _progressBarService: ProgressBarService,
    private _diagnosisStore: DiagnosisStore,
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
        this.loadAllDiagnosisCodesForType(currentDiagnosisTypeId);
    }

  loadAllDiagnosisCodesForType(diagnosisTypeId: number) {
    this._progressBarService.show();
    let result = this._diagnosisStore.getDiagnosisCodesByDiagnosisType(diagnosisTypeId);
    result.subscribe(
      (diagnosisCodes: DiagnosisCode[]) => {
        // this.diagnosisCodes = diagnosisCodes;
        this.diagnosisCodes = _.map(diagnosisCodes, (currentDiagnosisCode: DiagnosisCode) => {
                    return {
                        label: `${currentDiagnosisCode.diagnosisCodeText} - ${currentDiagnosisCode.diagnosisCodeDesc}`,
                        value: currentDiagnosisCode.id.toString()
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

}
