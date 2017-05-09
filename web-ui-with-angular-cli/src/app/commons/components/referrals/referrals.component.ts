import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';
import { ScheduledEvent } from '../../../commons/models/scheduled-event';
import * as moment from 'moment';
import * as _ from 'underscore';
import { Observable } from 'rxjs/Rx';
import { NotificationsService } from 'angular2-notifications';
import { SelectItem } from 'primeng/primeng';
import { SessionStore } from '../../../commons/stores/session-store';
import { ProgressBarService } from '../../services/progress-bar-service';
import { Procedure } from '../../models/procedure';
import { ProcedureStore } from '../../stores/procedure-store';
import { PatientVisit } from '../../../patient-manager/patient-visit/models/patient-visit';
import { SpecialityStore } from '../../../account-setup/stores/speciality-store';
import { Speciality } from '../../../account-setup/models/speciality';
import { RoomsStore } from '../../../medical-provider/rooms/stores/rooms-store';
import { Tests } from '../../../medical-provider/rooms/models/tests';
import { SpecialityService } from '../../../account-setup/services/speciality-service';

@Component({
  selector: 'app-referrals',
  templateUrl: './referrals.component.html',
  styleUrls: ['./referrals.component.scss']
})
export class ReferralsComponent implements OnInit {
  procedureForm: FormGroup;
  procedures: Procedure[];
  selectedProcedures: Procedure[];
  proceduresList: Procedure[] = [];
  selectedProceduresToDelete: Procedure[];
  specialities: Speciality[];
  tests: Tests[];
  selectedSpeciality: Speciality;
  selectedTestingFacility: Tests;

  selectedMode = 0;
  selectedDoctorId: number;
  selectedRoomId: number;
  selectedOption: number;
  selectedSpecialityId: number;
  selectedTestId: number;
  msg: string;

  @Input() selectedVisit: PatientVisit;
  @Output() save: EventEmitter<Procedure[]> = new EventEmitter();

  constructor(
    private _notificationsService: NotificationsService,
    private fb: FormBuilder,
    public sessionStore: SessionStore,
    private _progressBarService: ProgressBarService,
    private _procedureStore: ProcedureStore,
    private _specialityStore: SpecialityStore,
    private _roomsStore: RoomsStore,
    private _specialityService: SpecialityService
  ) {
    // this.procedureForm = this.fb.group({
    //   dignosisCode: ['', Validators.required]
    // });
  }

  ngOnInit() {
    this.loadAllSpecialitiesAndTests();
    // if (this.selectedVisit.specialtyId) {
    //   this.loadProceduresForSpeciality(this.selectedVisit.specialtyId)
    // } else if (this.selectedVisit.roomId) {
    //   this.loadProceduresForRoomTest(this.selectedVisit.room.roomTest.id);
    // }
    // this.selectedProcedures = this.selectedVisit.patientVisitProcedureCodes;
  }
  loadAllSpecialitiesAndTests() {
    this._progressBarService.show();
    let fetchAllSpecialities = this._specialityStore.getSpecialities();
    let fetchAllTestFacilties = this._roomsStore.getTests();
    Observable.forkJoin([fetchAllSpecialities, fetchAllTestFacilties])
      .subscribe(
      (results: any) => {
        this.specialities = results[0];
        this.tests = results[1];
      },
      (error) => {
        this._progressBarService.hide();
      },
      () => {
        this._progressBarService.hide();
      });
  }

  selectOption(event) {
    this.selectedDoctorId = 0;
    this.selectedRoomId = 0;
    this.selectedOption = 0;
    if (event.target.selectedOptions[0].getAttribute('data-type') === '1') {
      this.selectedOption = 1;
      this.selectedSpecialityId = parseInt(event.target.value, 10);
      this.loadProceduresForSpeciality(this.selectedSpecialityId);
      this.fetchSelectedSpeciality(this.selectedSpecialityId);
      // this.selectedSpecialityId = event.target.selectedOptions[0].getAttribute('data-specialityId');
    } else if (event.target.selectedOptions[0].getAttribute('data-type') === '2') {
      this.selectedOption = 2;
      this.selectedTestId = parseInt(event.target.value, 10);
      this.loadProceduresForRoomTest(this.selectedTestId);
      this.fetchSelectedTestingFacility(this.selectedTestId);
      // this.selectedTestId = event.target.selectedOptions[0].getAttribute('data-testId');
    } else {
      this.selectedMode = 0;
      this.procedures = null;
    }
    this.msg = '';
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

  addToList() {
    let flag: Procedure = null;
    if (this.selectedProcedures) {
      if (this.selectedProcedures.length > 0) {
        _.forEach(this.selectedProcedures, (currentProcedure: Procedure) => {
          if (this.proceduresList.length > 0) {
            _.forEach(this.proceduresList, (currentListProc: Procedure) => {
              let sId = currentListProc.speciality ? currentListProc.speciality.id : currentListProc.specialityId;
              if (currentProcedure.specialityId === sId) {
                if (currentListProc.procedureCodeText === '') {
                  this.proceduresList = _.reject(this.proceduresList, (currentProc: Procedure) => {
                    return currentProc.id === currentListProc.id;
                  });
                  this.proceduresList = _.union(this.selectedProcedures, this.proceduresList);
                } else {
                  this.proceduresList = _.union(this.selectedProcedures, this.proceduresList);
                }
              } else {
                this.proceduresList = _.union(this.selectedProcedures, this.proceduresList);
              }
            });
          } else {
            this.proceduresList = _.union(this.selectedProcedures, this.proceduresList);
          }
        });
      } else {
        let selectedProcSpec: Procedure;
        if (this.proceduresList.length > 0) {
          // _.forEach(this.proceduresList, (currentListProc: Procedure) => {
          //   if (this.selectedSpeciality.id !== currentListProc.specialityId) {
          if (this.selectedOption === 1) {
             flag = _.find(this.proceduresList, (currentProcOfList: Procedure) => {
              return currentProcOfList.specialityId === this.selectedSpeciality.id;
            })
          }
        }
        if (!flag) {
          selectedProcSpec = new Procedure({
            speciality: new Speciality(_.extend(this.selectedSpeciality.toJS()))
          });
          this.proceduresList.push(selectedProcSpec);
        } else if (this.selectedOption === 2) {
          this.msg = 'Please, Select Procedure Codes.';
        } else if (this.selectedSpeciality == null ) {
          this.msg = 'Please, Select Speciality.';
        } else {
          this.msg = 'Already in the list';
        }
        //   }
        // });
      }
    }
    this.selectedProcedures = [];
  }

  fetchSelectedSpeciality(specialityId: number) {
    // this._progressBarService.show();
    // let result = this._specialityService.getSpeciality(specialityId);
    // result.subscribe(
    //   (speciality: Speciality) => {
    //     this.selectedSpeciality = speciality;
    //   },
    //   (error) => {
    //     this._progressBarService.hide();
    //   },
    //   () => {
    //     this._progressBarService.hide();
    //   });
    this.selectedSpeciality = _.find(this.specialities, (currentSpeciality: Speciality) => {
      return currentSpeciality.id === specialityId;
    })
  }
  fetchSelectedTestingFacility(testId: number) {
    this.selectedTestingFacility = _.find(this.tests, (currentTest: Tests) => {
      return currentTest.id === testId;
    })
  }

  saveReferral() {
    this.save.emit(this.proceduresList);
  }

  deleteProcedureCode() {
    let procedureCodeIds: number[] = _.map(this.selectedProceduresToDelete, (currentProcedure: Procedure) => {
      return currentProcedure.id;
    });
    let procedureCodeDetails = _.filter(this.proceduresList, (currentProcedure: Procedure) => {
      return _.indexOf(procedureCodeIds, currentProcedure.id) < 0 ? true : false;
    });

    this.proceduresList = procedureCodeDetails;
    this.selectedProceduresToDelete = null;
  }
}
