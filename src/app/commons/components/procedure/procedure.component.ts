import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder ,PatternValidator} from '@angular/forms';
import * as moment from 'moment';
import * as _ from 'underscore';
import { Observable } from 'rxjs/Rx';
import { NotificationsService } from 'angular2-notifications';
import { Notification } from '../../../commons/models/notification';
import { NotificationsStore } from '../../../commons/stores/notifications-store';
import { ErrorMessageFormatter } from '../../../commons/utils/ErrorMessageFormatter';
import { LazyLoadEvent,SelectItem } from 'primeng/primeng';
import { ProgressBarService } from '../../services/progress-bar-service';
import { Procedure } from '../../models/procedure';
import { ProcedureStore } from '../../stores/procedure-store';
import { PatientVisit } from '../../../patient-manager/patient-visit/models/patient-visit';
import { SessionStore } from '../../stores/session-store';
import { PatientVisitsStore } from '../../../patient-manager/patient-visit/stores/patient-visit-store';

@Component({
  selector: 'app-procedure',
  templateUrl: './procedure.component.html',
  styleUrls: ['./procedure.component.scss']
})
export class ProcedureComponent implements OnInit {
  procedureForm: FormGroup;
  procedures: Procedure[];
  selectedProcedures: Procedure[];
  selProcedureCodes=[];
  selectedProceduresToDelete: Procedure[];
  selectedValue = 1;
  disableSaveDelete = false;
  showAllProcedureCode = false;
  showPreProcedureCode = true;
  numberPattern = "^[0-9]*$";
  procedureAmount;
  procedureUnit;
  procedureTotalAmount;
  procedureOldUnit;
  @Input() selectedVisit: PatientVisit;
  @Output() save: EventEmitter<Procedure[]> = new EventEmitter();
  @Output() uploadError: EventEmitter<Error> = new EventEmitter();

  constructor(
    private _notificationsService: NotificationsService,
    private _notificationsStore: NotificationsStore,
    private fb: FormBuilder,
    private _progressBarService: ProgressBarService,
    private _procedureStore: ProcedureStore,
    private _patientVisitsStore: PatientVisitsStore,
    public sessionStore: SessionStore
  ) {
    // this.procedureForm = this.fb.group({
    //   dignosisCode: ['', Validators.required]
    // });
  }

  ngOnInit() {
    debugger;
    if (this.selectedVisit.specialtyId) {
      this.loadProceduresForSpeciality(this.selectedVisit.specialtyId)
    } else if (this.selectedVisit.roomId && this.selectedVisit.room) {
      this.loadProceduresForRoomTest(this.selectedVisit.room.roomTest.id);
    }
    this.selectedProcedures = this.selectedVisit.patientVisitProcedureCodes;
    this.fetchVisit();
  }
  fetchVisit() {
    this._patientVisitsStore.fetchPatientVisitById(this.selectedVisit.id)
      .subscribe((patientVisit: PatientVisit) => {
        this.selectedVisit = patientVisit;
        this.checkVisitForCompany();
      })
  }
  loadProcedures() {
    if (this.selectedVisit.specialtyId) {
      this.loadProceduresForSpeciality(this.selectedVisit.specialtyId)
    } else if (this.selectedVisit.roomId) {
      this.loadProceduresForRoomTest(this.selectedVisit.room.roomTest.id);
    }
  }

  loadAllProcedures() {
    if (this.selectedVisit.specialtyId) {
      this.loadAllProceduresForSpeciality(this.selectedVisit.specialtyId)
    } else if (this.selectedVisit.roomId && this.selectedVisit.room) {
      this.loadProceduresForRoomTest(this.selectedVisit.room.roomTest.id);
    }
  }

  checkVisitForCompany() {
    if (this.selectedVisit.originalResponse.location.company.id == this.sessionStore.session.currentCompany.id) {
      this.disableSaveDelete = false;
    } else {
      this.disableSaveDelete = true;
    }
  }

  loadProceduresForSpeciality(specialityId: number) {
    // this._progressBarService.show();
    let result = this._procedureStore.getPreferredProceduresBySpecialityIdForPVisit(specialityId);
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
        // this._progressBarService.hide();
      },
      () => {
        // this._progressBarService.hide();
      });
  }

  loadProceduresForRoomTest(roomTestId: number) {
    // this._progressBarService.show();
    let result = this._procedureStore.getPrefferedProceduresByRoomTestIdForVisit(roomTestId);
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
        // this._progressBarService.hide();
      },
      () => {
        // this._progressBarService.hide();
      });
  }

  loadAllProceduresForRoomTest(roomTestId: number) {
     this._progressBarService.show();
    debugger;
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

  loadAllProceduresForSpeciality(specialityId: number) {
     this._progressBarService.show();
    let result = this._procedureStore.getPreferredProceduresBySpecialityIdForVisit(specialityId);
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

  showCPreffredProcedureCodes(){
    this.showAllProcedureCode = false;
    this.showPreProcedureCode = true;
    this.loadProcedures();
  }
  
  showCAllProcuderCodes(){
  this.showAllProcedureCode = true;
  this.showPreProcedureCode = false;
  this.loadAllProcedures()
  }

  updateUnit(unit:number,proceduerID:number)
  {
    debugger;
    let itemIndex = this.selectedProcedures.findIndex(item => item.procedureCodeId == proceduerID);
    
    if(itemIndex != -1)
    {
      let procedureCodeIds: number[] = _.map(this.selProcedureCodes, (currentProcedure: Procedure) => {
        if(currentProcedure.procedureCodeId === proceduerID)
        {
        return currentProcedure.procedureCodeId ;
         }
      });
    var proc = this.selectedProcedures[itemIndex];
    let procedureCodeDetailsFinal = _.filter(this.selProcedureCodes, (currentProcedure: Procedure) => {
      return _.indexOf(procedureCodeIds, currentProcedure.procedureCodeId) < 0 ? true : false;
    });
    this.selProcedureCodes = procedureCodeDetailsFinal;
    this.selProcedureCodes.push({
        'procedureCodeId': proc.procedureCodeId,
        'procedureAmount': proc.procedureAmount,
        'procedureUnit': unit,
        'procedureTotalAmount':proc.procedureTotalAmount
    });
  }
}

  saveProcedures() {
    debugger;
    if (this.selProcedureCodes.length != this.selectedProcedures.length) {
       this.selectedProcedures.forEach(currentProcedure => {
        let itemIndex = this.selProcedureCodes.findIndex(item => item.procedureCodeId == currentProcedure.procedureCodeId);
        if(itemIndex == -1)
        {
        this.selProcedureCodes.push({
          'procedureCodeId': currentProcedure.procedureCodeId,
          'procedureAmount': currentProcedure.procedureAmount,
          'procedureUnit': currentProcedure.procedureUnit,
          'procedureTotalAmount':currentProcedure.procedureTotalAmount
      });
    }
      });
      if(this.selProcedureCodes != undefined && this.selProcedureCodes.length > 0)
      {
      if (this.selProcedureCodes.find(selProcedure => selProcedure.procedureUnit == null || selProcedure.procedureUnit == 0)) {
        let errString = 'Please enter unit for newly added procdure code .';
        this._notificationsService.error('Oh No!', errString);
      }
    else{
      this.save.emit(this.selProcedureCodes);
      this.loadProcedures();
    }
  }
  else{
    let errString = 'Please select procedure code to save .';
    this._notificationsService.error('Oh No!', errString);
  }
     
}
  else{
    if(this.selProcedureCodes != undefined && this.selProcedureCodes.length > 0)
    {
    if (this.selProcedureCodes.find(selProcedure => selProcedure.procedureUnit == null || selProcedure.procedureUnit == 0)) {
      let errString = 'Please enter unit for newly added procdure code .';
      this._notificationsService.error('Oh No!', errString);
    }
    else{
      this.save.emit(this.selProcedureCodes);
      this.loadProcedures();
    }
  }
  else{
    let errString = 'Please select procedure code to save .';
    this._notificationsService.error('Oh No!', errString);
   }
}
}

_keyPress(event: any) {
  const pattern = /[0-9]/;
  let inputChar = String.fromCharCode(event.charCode);

  if (!pattern.test(inputChar)) {
    // invalid character, prevent input
    event.preventDefault();
  }
}

  deleteProcedureCode() {
    let procedureCodeIds: number[] = _.map(this.selectedProceduresToDelete, (currentProcedure: Procedure) => {
      return currentProcedure.id;
    });
    let procedureCodeDetails = _.filter(this.selectedProcedures, (currentProcedure: Procedure) => {
      return _.indexOf(procedureCodeIds, currentProcedure.id) < 0 ? true : false;
    });

    let procedureCodeDetailsFinal = _.filter(this.selProcedureCodes, (currentProcedure: Procedure) => {
      return _.indexOf(procedureCodeIds, currentProcedure.procedureCodeId) < 0 ? true : false;
    });

    this.selectedProcedures = procedureCodeDetails;
    this.selProcedureCodes = procedureCodeDetailsFinal;
    this.loadProcedures();
  }

  // calculate(value, procedureAmt) {
  //   this.total = value * procedureAmt;
  // }

}
