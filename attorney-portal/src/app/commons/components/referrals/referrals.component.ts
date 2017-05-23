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
import { VisitReferral } from '../../../patient-manager/patient-visit/models/visit-referral';
import { VisitReferralProcedureCode } from '../../../patient-manager/patient-visit/models/visit-referral-procedure-code';
import { VisitReferralStore } from '../../../patient-manager/patient-visit/stores/visit-referral-store';

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
  @Output() save: EventEmitter<VisitReferral[]> = new EventEmitter();
  // @Output() save: EventEmitter<Procedure[]> = new EventEmitter();

  constructor(
    private _notificationsService: NotificationsService,
    private fb: FormBuilder,
    public sessionStore: SessionStore,
    private _progressBarService: ProgressBarService,
    private _procedureStore: ProcedureStore,
    private _specialityStore: SpecialityStore,
    private _roomsStore: RoomsStore,
    private _visitReferralStore: VisitReferralStore,
    private _specialityService: SpecialityService
  ) {
  }

  ngOnInit() {
    this.loadAllSpecialitiesAndTests();
    this.getPendingReferralByPatientVisitId();
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
  getPendingReferralByPatientVisitId() {
    this._progressBarService.show();
    this._visitReferralStore.getPendingReferralByPatientVisitId(this.selectedVisit.id)
      .subscribe(
      (visitReferrals: VisitReferral[]) => {
        _.forEach(visitReferrals, (currentVisitReferral: VisitReferral) => {
          _.forEach(currentVisitReferral.pendingReferralProcedureCode, (currentVisitReferralProcedureCode: VisitReferralProcedureCode) => {
            this.proceduresList.push(currentVisitReferralProcedureCode.procedureCode);
          })
        });
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
            specialityId: this.selectedSpeciality.id,
            speciality: new Speciality(_.extend(this.selectedSpeciality.toJS()))
          });
          this.proceduresList.push(selectedProcSpec);
        } else if (this.selectedOption === 2) {
          this.msg = 'Please, Select Procedure Codes.';
        } else if (this.selectedSpeciality == null) {
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
    let procedureCodes = [];
    let visitReferralDetails: VisitReferral[] = [];

    let uniqSpeciality = _.uniq(this.proceduresList, (currentProc: Procedure) => {
      return currentProc.specialityId
    })
    let uniqSpecialityIds = _.map(uniqSpeciality, (currentProc: Procedure) => {
      return currentProc.specialityId
    })
    _.forEach(uniqSpecialityIds, (currentSpecialityId: number) => {
      this.proceduresList.forEach(currentProcedureCode => {
        if (currentProcedureCode.specialityId !== null && currentProcedureCode.specialityId === currentSpecialityId) {
          if (currentProcedureCode.id !== 0) {
            procedureCodes.push({ 'procedureCodeId': currentProcedureCode.id });
          }
        }
      });
      if (currentSpecialityId !== null) {
        let visitReferral = new VisitReferral({
          patientVisitId: this.selectedVisit.id,
          fromCompanyId: this.sessionStore.session.currentCompany.id,
          fromLocationId: this.selectedVisit.locationId,
          fromDoctorId: this.selectedVisit.doctorId,
          forSpecialtyId: currentSpecialityId,
          forRoomId: null,
          forRoomTestId: null,
          isReferralCreated: false,
          pendingReferralProcedureCode: procedureCodes
        });
        visitReferralDetails.push(visitReferral);
        procedureCodes = [];
      }
    })

    let uniqRoomTest = _.uniq(this.proceduresList, (currentProc: Procedure) => {
      return currentProc.roomTestId
    })
    let uniqRoomTestIds = _.map(uniqRoomTest, (currentProc: Procedure) => {
      return currentProc.roomTestId
    })
    _.forEach(uniqRoomTestIds, (currentRoomTestId: number) => {
      this.proceduresList.forEach(currentProcedureCode => {
        if (currentProcedureCode.roomTestId !== null && currentProcedureCode.roomTestId === currentRoomTestId) {
          if (currentProcedureCode.id !== 0) {
            procedureCodes.push({ 'procedureCodeId': currentProcedureCode.id });
          }
        }
      });
      if (currentRoomTestId !== null) {
        let visitReferral = new VisitReferral({
          patientVisitId: this.selectedVisit.id,
          fromCompanyId: this.sessionStore.session.currentCompany.id,
          fromLocationId: this.selectedVisit.locationId,
          fromDoctorId: this.selectedVisit.doctorId,
          forSpecialtyId: null,
          forRoomId: this.selectedVisit.roomId ? this.selectedVisit.roomId : null,
          forRoomTestId: currentRoomTestId,
          isReferralCreated: false,
          pendingReferralProcedureCode: procedureCodes
        });
        visitReferralDetails.push(visitReferral);
        procedureCodes = [];
      }
    })
    this.save.emit(visitReferralDetails);
    // this.save.emit(this.proceduresList);
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
