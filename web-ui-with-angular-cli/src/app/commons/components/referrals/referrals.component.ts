import { Component, OnInit, Input, Output, EventEmitter, OnChanges,QueryList,ElementRef,ViewChildren } from '@angular/core';
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
import { PatientVisitsStore } from '../../../patient-manager/patient-visit/stores/patient-visit-store';
import { SignatureFieldComponent } from '../../../commons/components/signature-field/signature-field.component';

@Component({
  selector: 'app-referrals',
  templateUrl: './referrals.component.html',
  styleUrls: ['./referrals.component.scss']
})
export class ReferralsComponent implements OnInit {
  private _penColorForSignature = '#000000';
  private _signaturePadColor = '#e9e9e9';
  procedureForm: FormGroup;
  procedures: Procedure[];
  selectedProcedures: Procedure[] = [];
  proceduresList: Procedure[] = [];
  selectedProceduresToDelete: Procedure[];
  specialities: Speciality[];
  tests: Tests[];
  selectedSpeciality: Speciality;
  selectedTestingFacility: Tests;
  selectedVisitReferral : VisitReferral;

  selectedMode = 0;
  selectedDoctorId: number;
  selectedRoomId: number;
  selectedOption = 0;
  selectedSpecialityId: number;
  selectedTestId: number;
  msg: string;
  selectedEvent;
  iscomplete: boolean;
  digitalForm: FormGroup;
  diableSave:boolean = true;
  showoldSignature = false;
  oldSignatureType = 0;
  oldDocotrSignature ;
  oldDocotrSignatureText;
  showtext:boolean = false;
  showsignpad:boolean = true;
  signedText:string;

  @Input() routeFrom: number;
  @Input() selectedVisit: PatientVisit;
  @Output() save: EventEmitter<VisitReferral[]> = new EventEmitter();
  // @Output() save: EventEmitter<Procedure[]> = new EventEmitter();

  @ViewChildren(SignatureFieldComponent) public sigs: QueryList<SignatureFieldComponent>;
  @ViewChildren('signatureContainer') public signatureContainer: QueryList<ElementRef>;
  @ViewChildren('signaturetextContainer') public signaturetextContainer: QueryList<ElementRef>;

  constructor(
    private _notificationsService: NotificationsService,
    private fb: FormBuilder,
    public sessionStore: SessionStore,
    private _progressBarService: ProgressBarService,
    private _procedureStore: ProcedureStore,
    private _specialityStore: SpecialityStore,
    private _roomsStore: RoomsStore,
    private _visitReferralStore: VisitReferralStore,
    private _specialityService: SpecialityService,
    private _patientVisitStore: PatientVisitsStore
  ) {
    this.digitalForm = this.fb.group({
      signatureField: [''],
      signedText:['']
    });
    this.showSignature();
  }

  ngOnInit() {
    this.loadAllSpecialitiesAndTests();
    this.getPendingReferralByPatientVisitId();
    this.iscomplete = false;
    // if (this.selectedVisit.specialtyId) {
    //   this.loadProceduresForSpeciality(this.selectedVisit.specialtyId)
    // } else if (this.selectedVisit.roomId) {
    //   this.loadProceduresForRoomTest(this.selectedVisit.room.roomTest.id);
    // }
    // this.selectedProcedures = this.selectedVisit.patientVisitProcedureCodes;
    
  }
  loadAllSpecialitiesAndTests() {
    // this._progressBarService.show();
    let fetchAllSpecialities = this._specialityStore.getSpecialities();
    let fetchAllTestFacilties = this._roomsStore.getTests();
    Observable.forkJoin([fetchAllSpecialities, fetchAllTestFacilties])
      .subscribe(
      (results: any) => {
        this.specialities = results[0];
        this.tests = results[1];
      },
      (error) => {
        // this._progressBarService.hide();
      },
      () => {
        // this._progressBarService.hide();
      });
  }
  getPendingReferralByPatientVisitId() {
    // this._progressBarService.show();
    this._visitReferralStore.getPendingReferralByPatientVisitId(this.selectedVisit.id)
      .subscribe(
      (visitReferrals: VisitReferral[]) => {
        let selectedProcSpec: Procedure;
        this.selectedVisitReferral = visitReferrals[0];
        if(this.selectedVisitReferral != undefined && this.selectedVisitReferral != null)
        {
        if(this.selectedVisitReferral.doctorSignature != null && this.selectedVisitReferral.doctorSignature != '' && this.selectedVisitReferral.doctorSignature != undefined )
        {
          this.showoldSignature = true;
          this.oldSignatureType = this.selectedVisitReferral.doctorSignatureType;
          this.oldDocotrSignature = this.selectedVisitReferral.doctorSignature;
          this.showtext = false;
          this.showsignpad = true;
        }
        else if(this.selectedVisitReferral.doctorSignatureText != null && this.selectedVisitReferral.doctorSignatureText != '' && this.selectedVisitReferral.doctorSignatureText != undefined )
        {
          this.showoldSignature = true;
          this.oldSignatureType = this.selectedVisitReferral.doctorSignatureType;
          this.oldDocotrSignatureText = this.selectedVisitReferral.doctorSignatureText;
          this.showtext = true;
          this.showsignpad = false;
        }
      }
        _.forEach(visitReferrals, (currentVisitReferral: VisitReferral) => {
          if (currentVisitReferral.pendingReferralProcedureCode.length <= 0) {
            selectedProcSpec = new Procedure({
              specialityId: currentVisitReferral.forSpecialtyId,
              speciality: new Speciality(_.extend(currentVisitReferral.speciality.toJS()))
            });
            this.proceduresList.push(selectedProcSpec);
          } else {
            _.forEach(currentVisitReferral.pendingReferralProcedureCode, (currentVisitReferralProcedureCode: VisitReferralProcedureCode) => {
              this.proceduresList.push(currentVisitReferralProcedureCode.procedureCode);
              this.proceduresList = _.union(this.proceduresList);
            })
          }
        });
      },
      (error) => {
        // this._progressBarService.hide();
      },
      () => {
        // this._progressBarService.hide();
      });
  }

  CheckReferralPtVisitStatusForUpdatebySpecialty(specialityId: number, procedureCodeId:number, isdelete: boolean) {
       this._progressBarService.show();
     this.iscomplete = false;
     let result = this._patientVisitStore.getVisitStatusbyPatientVisitIdSpecialityId(this.selectedVisit.id, specialityId);
     result.subscribe(
      (ptvist: PatientVisit[]) => {           
        if(ptvist.length > 0)
        {
           this.iscomplete = true;
        }
        else
        {
          this.iscomplete = false;
        }       
      },
      (error) => {
        this._progressBarService.hide();
      },
       () => {
        this._progressBarService.hide();
        if(isdelete)
        {
          if(this.iscomplete == false)
          {       
            let procedureCodeIds: number[] = [];
            procedureCodeIds.push(procedureCodeId);
            let procedureCodeDetails = _.filter(this.proceduresList, (currentProcedure: Procedure) => {
              return _.indexOf(procedureCodeIds, currentProcedure.id) < 0 ? true : false;
            });
      
            this.proceduresList = procedureCodeDetails;
            this.selectOption(this.selectedEvent);
            this.selectedProceduresToDelete = null;          
          }
          else
          {
            this._notificationsService.error('Unable to delete!', 'This referral visit has been complete');
          }
        }
      });
  }

  CheckReferralPtVisitStatusForUpdatebyRoomTest(roomTestId: number,procedureCodeId:number, isdelete: boolean) {
    this._progressBarService.show();
    let result = this._patientVisitStore.getVisitStatusbyPatientVisitIdRoomTestId(this.selectedVisit.id, roomTestId);
    result.subscribe(
      (ptvist: PatientVisit[]) => {
        if(ptvist.length > 0)
        {
          this.iscomplete = true;
        }
        else
        {
          this.iscomplete = false;
        }
      },
      (error) => {
        this._progressBarService.hide();
      },
      () => {
        this._progressBarService.hide();
        if(isdelete)
        {        
          if(this.iscomplete == false)
          {
            let procedureCodeIds: number[];
            procedureCodeIds.push(procedureCodeId);
            let procedureCodeDetails = _.filter(this.proceduresList, (currentProcedure: Procedure) => {
              return _.indexOf(procedureCodeIds, currentProcedure.id) < 0 ? true : false;
            });
      
            this.proceduresList = procedureCodeDetails;
            this.selectOption(this.selectedEvent);
            this.selectedProceduresToDelete = null;
          }
        else
          {
            this._notificationsService.error('Unable to delete!', 'This referral visit has been complete');
          }
        }
      });
  }

  selectOption(event) {
    this.selectedEvent = event;
    this.selectedDoctorId = 0;
    this.selectedRoomId = 0;
    this.selectedOption = 0;
    if (event.target.selectedOptions[0].getAttribute('data-type') === '1') {
      this.selectedOption = 1;
      this.selectedSpecialityId = parseInt(event.target.value, 10);
      this.loadProceduresForSpeciality(this.selectedSpecialityId);
      this.fetchSelectedSpeciality(this.selectedSpecialityId);
      this.CheckReferralPtVisitStatusForUpdatebySpecialty(this.selectedSpecialityId, 0, false);
      // this.selectedSpecialityId = event.target.selectedOptions[0].getAttribute('data-specialityId');
    } else if (event.target.selectedOptions[0].getAttribute('data-type') === '2') {
      this.selectedOption = 2;
      this.selectedTestId = parseInt(event.target.value, 10);
      this.loadProceduresForRoomTest(this.selectedTestId);
      this.fetchSelectedTestingFacility(this.selectedTestId);
      this.CheckReferralPtVisitStatusForUpdatebyRoomTest(this.selectedTestId, 0, false);
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
        let procedureCodeIds: number[] = _.map(this.proceduresList, (currentProcedure: Procedure) => {
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
        let procedureCodeIds: number[] = _.map(this.proceduresList, (currentProcedure: Procedure) => {
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
      this.diableSave = false;
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
                  let procedureCodeIds: number[] = _.map(this.proceduresList, (currentProcedure: Procedure) => {
                    return currentProcedure.id;
                  });
                  this.procedures = _.filter(this.procedures, (currentProcedure: Procedure) => {
                    return _.indexOf(procedureCodeIds, currentProcedure.id) < 0 ? true : false;
                  });
                } else {
                  this.proceduresList = _.union(this.selectedProcedures, this.proceduresList);
                  let procedureCodeIds: number[] = _.map(this.proceduresList, (currentProcedure: Procedure) => {
                    return currentProcedure.id;
                  });
                  this.procedures = _.filter(this.procedures, (currentProcedure: Procedure) => {
                    return _.indexOf(procedureCodeIds, currentProcedure.id) < 0 ? true : false;
                  });
                }
              } else {
                this.proceduresList = _.union(this.selectedProcedures, this.proceduresList);
                let procedureCodeIds: number[] = _.map(this.proceduresList, (currentProcedure: Procedure) => {
                  return currentProcedure.id;
                });
                this.procedures = _.filter(this.procedures, (currentProcedure: Procedure) => {
                  return _.indexOf(procedureCodeIds, currentProcedure.id) < 0 ? true : false;
                });
              }
            });
          } else {
            this.proceduresList = _.union(this.selectedProcedures, this.proceduresList);
            let procedureCodeIds: number[] = _.map(this.proceduresList, (currentProcedure: Procedure) => {
              return currentProcedure.id;
            });
            this.procedures = _.filter(this.procedures, (currentProcedure: Procedure) => {
              return _.indexOf(procedureCodeIds, currentProcedure.id) < 0 ? true : false;
            });
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
        if (!flag && this.selectedOption === 1 && !this.selectedSpeciality.mandatoryProcCode) {
          selectedProcSpec = new Procedure({
            specialityId: this.selectedSpeciality.id,
            speciality: new Speciality(_.extend(this.selectedSpeciality.toJS()))
          });
          this.proceduresList.push(selectedProcSpec);
          this.proceduresList = _.union(this.proceduresList);
          let procedureCodeIds: number[] = _.map(this.proceduresList, (currentProcedure: Procedure) => {
            return currentProcedure.id;
          });
          this.procedures = _.filter(this.procedures, (currentProcedure: Procedure) => {
            return _.indexOf(procedureCodeIds, currentProcedure.id) < 0 ? true : false;
          });
        } else if (this.selectedOption === 0) {
          this.msg = 'Please, Select Specialty.';
        } else if (this.selectedOption === 2 || this.selectedSpeciality.mandatoryProcCode) {
          this.msg = 'Please, Select Procedure Codes.';
        } else if (this.selectedSpeciality == null) {
          this.msg = 'Please, Select Specialty.';
        } else {
          this.msg = 'Already in the list';
        }
        //   }
        // });
      }
    }
    this.proceduresList;
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
    let docSign = '';
    let docSigntype = 1;
    let docSigntext = '';
    if(this.showoldSignature)
    {
      docSign = this.oldDocotrSignature;
      docSigntype = this.oldSignatureType;
      docSigntext = this.oldDocotrSignatureText;
    }
    else{
      docSign = this.sigs.first.signature;
      docSigntype = this.showsignpad? 1 : 2;
      docSigntext = this.signedText;
    }
    let uniqSpeciality = _.uniq(this.proceduresList, (currentProc: Procedure) => {
      return currentProc.specialityId
    })
    let uniqSpecialityIds = _.map(uniqSpeciality, (currentProc: Procedure) => {
      return currentProc.specialityId !== 0 ? currentProc.specialityId : null;
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
          pendingReferralProcedureCode: procedureCodes,
          doctorSignature: docSign,
          doctorSignatureType: docSigntype,
          doctorSignatureText : docSigntext,
          doctorSignatureFont : docSigntext? 'Brush Script MT' : ''
        });
        visitReferralDetails.push(visitReferral);
        procedureCodes = [];
      }
    })

    let uniqRoomTest = _.uniq(this.proceduresList, (currentProc: Procedure) => {
      return currentProc.roomTestId
    })
    let uniqRoomTestIds = _.map(uniqRoomTest, (currentProc: Procedure) => {
      return currentProc.roomTestId !== 0 ? currentProc.roomTestId : null;
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
          forRoomId: null,
          forRoomTestId: currentRoomTestId,
          isReferralCreated: false,
          pendingReferralProcedureCode: procedureCodes,
          doctorSignature: docSign,
          doctorSignatureType: docSigntype,
          doctorSignatureText : docSigntext,
          doctorSignatureFont : docSigntext? 'Brush Script MT' : ''
        });
        visitReferralDetails.push(visitReferral);
        procedureCodes = [];
      }
    })
    if(visitReferralDetails.length == 0)
    {
      let visitReferral = new VisitReferral({
        patientVisitId: this.selectedVisit.id,
        fromCompanyId: this.sessionStore.session.currentCompany.id,
        fromLocationId: this.selectedVisit.locationId,
        fromDoctorId: this.selectedVisit.doctorId,
        forSpecialtyId: null,
        forRoomId: null,
        forRoomTestId: null,
        isReferralCreated: false,
        pendingReferralProcedureCode: procedureCodes,
        doctorSignature: docSign,
        doctorSignatureType: docSigntype,
        doctorSignatureText : docSigntext,
        doctorSignatureFont : docSigntext? 'Brush Script MT' : ''
      });
      visitReferralDetails.push(visitReferral);
      procedureCodes = [];
    }

    this.save.emit(visitReferralDetails);
    //this.digitalForm.reset();
    this.clear();
    this.getPendingReferralByPatientVisitId();
    this.diableSave = true;
    this.signedText = '';
    // this.save.emit(this.proceduresList);
  }


  clear() {
    this.sigs.first.clear();
    this.sigs.first.signature = undefined;
  }

  deleteProcedureCode(proc) {
    if(proc.specialityId != null)
    {
      this.CheckReferralPtVisitStatusForUpdatebySpecialty(proc.specialityId, proc.id, true);
    }
    else if(proc.roomTestId != null)
    {
      this.CheckReferralPtVisitStatusForUpdatebyRoomTest(proc.specialityId, proc.id, true);
    }

    this.diableSave = false;
    // let procedureCodeIds: number[] = _.map(this.selectedProceduresToDelete, (currentProcedure: Procedure) => {
    //   return currentProcedure.id;
    // });
    //let procedureCodeDetails = _.filter(this.proceduresList, (currentProcedure: Procedure) => {
    //  return _.indexOf(procedureCodeIds, currentProcedure.id) < 0 ? true : false;
    //});

    //this.proceduresList = procedureCodeDetails;
    //this.selectOption(this.selectedEvent);
    //this.selectedProceduresToDelete = null;
  }


  beResponsive() {
    this.size(this.signatureContainer.first, this.sigs.first);
  }

  size(container: ElementRef, sig: SignatureFieldComponent) {
    var cWidth = 275;
    if(container == undefined)
    {
      var cWidth = 275;
    }
    else if(container.nativeElement.offsetWidth  == 0)
    {
      cWidth = 275;
    }
    else{
      cWidth = 275;
    }

    var cHeight = 200;
    if(container == undefined)
    {
      cHeight = 200;
    }
    else if(container.nativeElement.offsetHeight  == 0)
    {
      cHeight = 200;
    }
    else{
      cHeight = 200
    }
    sig.signaturePad.set('canvasWidth', cWidth);
    sig.signaturePad.set('canvasHeight', cHeight);
  }

  setOptions() {
    this.sigs.first.signaturePad.set('penColor', this._penColorForSignature);
    this.sigs.first.signaturePad.set('backgroundColor', this._signaturePadColor);
    this.sigs.first.signaturePad.clear(); // clearing is needed to set the background colour
  }

  showSignature()
  {
    _.defer(() => {
      this.beResponsive();
      this.setOptions();
    });
  }

  signatureTypeChange(signType:string)
  {
     if(signType === 'sign')
     {
       this.showtext = false;
       this.showsignpad = true;
       this.showSignature();
     }
     else if(signType === 'signtext'){
      this.showtext = true;
      this.showsignpad = false;
      this.signedText = ''
      this.textFocus(this.signaturetextContainer.first)
     }
  }

  textFocus(container: ElementRef) {
   container.nativeElement.autofocus = true;
  }

  _keyPress(event: any) {
    const pattern = /^[a-zA-Z.\s]*$/;
    let inputChar = String.fromCharCode(event.charCode);
  
    if (!pattern.test(inputChar)) {
      // invalid character, prevent input
      event.preventDefault();
    }
  }

}
