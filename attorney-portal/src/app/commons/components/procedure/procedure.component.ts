import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import * as moment from 'moment';
import * as _ from 'underscore';
import { NotificationsService } from 'angular2-notifications';
import { SelectItem } from 'primeng/primeng';
import { ProgressBarService } from '../../services/progress-bar-service';
import { Procedure } from '../../models/procedure';
import { ProcedureStore } from '../../stores/procedure-store';
import { PatientVisit } from '../../../patient-manager/patient-visit/models/patient-visit';
import { SessionStore } from '../../stores/session-store';

@Component({
  selector: 'app-procedure',
  templateUrl: './procedure.component.html',
  styleUrls: ['./procedure.component.scss']
})
export class ProcedureComponent implements OnInit {
  procedureForm: FormGroup;
  procedures: Procedure[];
  selectedProcedures: Procedure[];
  selectedProceduresToDelete: Procedure[];

  @Input() selectedVisit: PatientVisit;
  @Output() save: EventEmitter<Procedure[]> = new EventEmitter();
  @Output() uploadError: EventEmitter<Error> = new EventEmitter();

  constructor(
    private _notificationsService: NotificationsService,
    private fb: FormBuilder,
    private _progressBarService: ProgressBarService,
    private _procedureStore: ProcedureStore,
    public sessionStore: SessionStore
    
  ) {
    // this.procedureForm = this.fb.group({
    //   dignosisCode: ['', Validators.required]
    // });
  }

  ngOnInit() {
    if (this.selectedVisit.specialtyId) {
      this.loadProceduresForSpeciality(this.selectedVisit.specialtyId)
    } else if (this.selectedVisit.roomId) {
      this.loadProceduresForRoomTest(this.selectedVisit.roomId);
    }
    this.selectedProcedures = this.selectedVisit.patientVisitProcedureCodes;
  }

  loadProceduresForSpeciality(specialityId: number) {
    this._progressBarService.show();
    let result = this._procedureStore.getProceduresBySpecialityId(specialityId);
    result.subscribe(
      (procedures: Procedure[]) => {
        // this.procedures = procedures;
        let procedureCodeIds: number[] = _.map(this.selectedProcedures, (currentProcedure: Procedure) => {
          return currentProcedure.id;
        });
        let procedureDetails = _.filter(procedures, (currentProcedure: Procedure) => {
          return _.indexOf(procedureCodeIds, currentProcedure.id) < 0 ? true : false;
        });
        this.procedures = procedureDetails;
      },
      (error) => {
        this._progressBarService.hide();
      },
      () => {
        this._progressBarService.hide();
      });
  }

  loadProceduresForRoomTest(roomTestId: number) {
    this._progressBarService.show();
    let result = this._procedureStore.getProceduresByRoomTestId(roomTestId);
    result.subscribe(
      (procedures: Procedure[]) => {
        // this.procedures = procedures;
        let procedureCodeIds: number[] = _.map(this.selectedProcedures, (currentProcedure: Procedure) => {
          return currentProcedure.id;
        });
        let procedureDetails = _.filter(procedures, (currentProcedure: Procedure) => {
          return _.indexOf(procedureCodeIds, currentProcedure.id) < 0 ? true : false;
        });
        this.procedures = procedureDetails;
      },
      (error) => {
        this._progressBarService.hide();
      },
      () => {
        this._progressBarService.hide();
      });
  }

  saveProcedures() {
    this.save.emit(this.selectedProcedures);
  }

  deleteProcedureCode() {
    let procedureCodeIds: number[] = _.map(this.selectedProceduresToDelete, (currentProcedure: Procedure) => {
      return currentProcedure.id;
    });
    let procedureCodeDetails = _.filter(this.selectedProcedures, (currentProcedure: Procedure) => {
      return _.indexOf(procedureCodeIds, currentProcedure.id) < 0 ? true : false;
    });

    this.selectedProcedures = procedureCodeDetails;
  }

}
