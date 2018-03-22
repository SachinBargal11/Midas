import { SelectItem } from 'primeng/primeng';
import { ImeVisit } from '../models/ime-visit';
import { EoVisit } from '../models/eo-visit';
import { Procedure } from '../../../commons/models/procedure';
import { DiagnosisCode } from '../../../commons/models/diagnosis-code';
import { User } from '../../../commons/models/user';
import { Case } from '../../cases/models/case';
import { Doctor } from '../../../medical-provider/users/models/doctor';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit, ViewChild, ChangeDetectorRef, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { List } from 'immutable';
import * as moment from 'moment';
import * as _ from 'underscore';
import { AppValidators } from '../../../commons/utils/AppValidators';
import { environment } from '../../../../environments/environment';
import { NotificationsService } from 'angular2-notifications';
import { DoctorSpeciality } from '../../../medical-provider/users/models/doctor-speciality';
import { DoctorLocationSchedule } from '../../../medical-provider/users/models/doctor-location-schedule';
import { ScheduleDetail } from '../../../medical-provider/locations/models/schedule-detail';
import { Schedule } from '../../../medical-provider/rooms/models/rooms-schedule';
import { Room } from '../../../medical-provider/rooms/models/room';
import { Patient } from '../../patients/models/patient';
import { PatientVisit } from '../models/patient-visit';
import { SessionStore } from '../../../commons/stores/session-store';
import { ProgressBarService } from '../../../commons/services/progress-bar-service';
import { PatientsStore } from '../../patients/stores/patients-store';
import { RoomsStore } from '../../../medical-provider/rooms/stores/rooms-store';
import { DoctorsStore } from '../../../medical-provider/users/stores/doctors-store';
import { LocationsStore } from '../../../medical-provider/locations/stores/locations-store';
import { ScheduleStore } from '../../../medical-provider/locations/stores/schedule-store';
import { RoomScheduleStore } from '../../../medical-provider/rooms/stores/rooms-schedule-store';
import { DoctorLocationScheduleStore } from '../../../medical-provider/users/stores/doctor-location-schedule-store';
import { PatientVisitsStore } from '../stores/patient-visit-store';
import { RoomsService } from '../../../medical-provider/rooms/services/rooms-service';
import { Tests } from '../../../medical-provider/rooms/models/tests';
import { Speciality } from '../../../account-setup/models/speciality';
import { ScheduledEventEditorComponent } from '../../../medical-provider/calendar/components/scheduled-event-editor';
import { LeaveEventEditorComponent } from '../../../medical-provider/calendar/components/leave-event-editor';
import { ScheduledEventInstance } from '../../../commons/models/scheduled-event-instance';
import { SpecialityService } from '../../../account-setup/services/speciality-service';
import { ErrorMessageFormatter } from '../../../commons/utils/ErrorMessageFormatter';
import { Notification } from '../../../commons/models/notification';
import { NotificationsStore } from '../../../commons/stores/notifications-store';
import { Document } from '../../../commons/models/document';
import { ScheduledEvent } from '../../../commons/models/scheduled-event';
import { LeaveEvent } from '../../../commons/models/leave-event';
import { VisitDocument } from '../../patient-visit/models/visit-document';
import { ConfirmDialogModule, ConfirmationService } from 'primeng/primeng';
import * as RRule from 'rrule';
import { ProcedureStore } from '../../../commons/stores/procedure-store';
import { VisitReferralStore } from '../stores/visit-referral-store';
import { VisitReferral } from '../models/visit-referral';
import { CasesStore } from '../../cases/stores/case-store';
import { UserSettingStore } from '../../../commons/stores/user-setting-store';
import { UserSetting } from '../../../commons/models/user-setting';
import { ProcedureCodeMasterStore } from '../../../account-setup/stores/procedure-code-master-store';
import { UnscheduledVisit } from '../models/unscheduled-visit';
import { SpecialityStore } from '../../../account-setup/stores/speciality-store';
import { SpecialityDetailsStore } from '../../../account-setup/stores/speciality-details-store';
import { SpecialityDetail } from '../../../account-setup/models/speciality-details';
import { TestSpecialityDetail } from '../../../account-setup/models/test-speciality-details';

@Component({
    selector: 'patient-visit',
    templateUrl: './patient-visit.html',
    styleUrls: ['./patient-visit.scss']
})

export class PatientVisitComponent implements OnInit {

    @ViewChild(ScheduledEventEditorComponent)
    private _scheduledEventEditorComponent: ScheduledEventEditorComponent;

    @ViewChild(LeaveEventEditorComponent)
    private _leaveEventEditorComponent: LeaveEventEditorComponent;

    @ViewChild('cd')
    private _confirmationDialog: any;

    /* Data Lists */
    patients: Patient[] = [];
    rooms: Room[] = [];
    doctorLocationSchedules: {
        doctorLocationSchedule: DoctorLocationSchedule,
        speciality: DoctorSpeciality
    }[] = [];
    roomSchedule: Schedule;
    doctorSchedule: Schedule;

    /* Selections */
    selectedVisit: any;
    selectedEoVisit: EoVisit;
    selectedCalEvent: ScheduledEventInstance;
    selectedLocationId: number = 0;
    selectedDoctorId: number = 0;
    selectedRoomId: number = 0;
    selectedOption: number = 0;
    selectedTestId: number = 0;
    selectedMode: number = 0;
    selectedSpecialityId: number = 0;
    showAllProcedureCodes: boolean = false;
    outOfOfficeVisits: any;
    setpreffredMsg :string;
    setpreffredMsgIcon :string;

    /* Dialog Visibilities */
    eventDialogVisible: boolean = false;
    eventDialogUnscheduleVisible: boolean= false;
    visitDialogVisible: boolean = false;

    /* Form Controls */
    private scheduledEventEditorValid: boolean = false;
    private leaveEventEditorValid: boolean = false;
    isFormValidBoolean: boolean = false;
    patientScheduleForm: FormGroup;
    patientScheduleFormControls;
    addNewPatientForm: FormGroup;
    addNewPatientFormControls;
    patientVisitForm: FormGroup;
    patientVisitFormControls;
    unscheduledForm: FormGroup;
    unscheduledFormControls;
    unscheduledVisitForm: FormGroup;
    unscheduledVisitFormControls;

    /* Calendar Component Configurations */
    events: ScheduledEventInstance[];
    header: any;
    views: any;
    businessHours: any[];
    hiddenDays: any = [];
    // defaultView: string = 'agendaDay';
    defaultView: string;
    visitUploadDocumentUrl: string;
    private _url: string = `${environment.SERVICE_BASE_URL}`;

    documents: VisitDocument[] = [];
    selectedDocumentList = [];
    isDeleteProgress: boolean = false;

    visitInfo: string = '';
    isAddNewPatient: boolean = false;
    isGoingOutOffice: boolean = false;
    isProcedureCode: boolean = false;
    ShowProcedureCode: boolean = false;
    ShowAllProcedureCode: boolean = false;
    ShowAllProcedureCodeTest: boolean = false;
    procedures: Procedure[];
    selectedProcedures: Procedure[];
    selectedSpeciality: Speciality = null;
    readingDoctors: Doctor[];
    readingDoctor = 0;
    visitId: number;
    addConsentDialogVisible: boolean = false;
    // addImeVisitDialogVisible: boolean = false;
    // addEoVisitDialogVisible: boolean = false;
    selectedCaseId: number;
    doctorId: number = this.sessionStore.session.user.id;
    doctorSpecialities: DoctorSpeciality[];
    cases: Case[];
    caseDetail: Case;
    patient: Patient;
    specialities: Speciality[];
    tests: Tests[];
    @Input() routeFromCase: boolean = false;
    @Input() caseId: number;
    // @Input() patientId:number;
    @Input() idPatient: number;
    companyId: number = this.sessionStore.session.currentCompany.id;
    userId: number = this.sessionStore.session.user.id;
    selectedVisitType = '1';
    selectedEventDate;
    dayRenderer;
    isVisitTypeDisabled = false;
    visitStatusIdC = 0; 
    visitStatusIdR = 0;   
    patientsWithOpenCase: SelectItem[] = [];
    userSetting: UserSetting;
    unscheduledVisit: UnscheduledVisit;
    unscheduledDialogVisible = false;
    id:number=0;
    patientId: number;

    unscheduledEditVisitDialogVisible = false;
    unscheduledVisitDialogVisible = false;

    eventRenderer: Function = (event, element) => {
        // if (event.owningEvent.isUpdatedInstanceOfRecurringSeries) {
        //     element.find('.fc-content').prepend('<i class="fa fa-exclamation-circle"></i>&nbsp;');
        // } else if (event.owningEvent.recurrenceRule) {
        //     element.find('.fc-content').prepend('<i class="fa fa-refresh"></i>&nbsp;');
        // }
        let content: string = '';
        if (event.owningEvent.isUpdatedInstanceOfRecurringSeries) {
            content = `<i class="fa fa-exclamation-circle"></i>`;
        } else if (event.owningEvent.recurrenceRule) {
            content = `<i class="fa fa-refresh"></i>`;
        }
        if (event.eventWrapper && event.eventWrapper.isPatientVisitType) {
            content = `${content} <span class="fc-time">${event.start.format('hh:mm A')}</span> <span class="fc-title">${event.eventWrapper.patient.user.displayName}</span>`;
        } if (!this.sessionStore.isOnlyDoctorRole()) {
            if (event.eventWrapper && event.eventWrapper.isEoVisitType) {
                content = `${content} <span class="fc-time">${event.start.format('hh:mm A')}</span> <span class="fc-title">EUO-${event.eventWrapper.doctor.user.displayName}</span>`;
            }
        }
        if (this.sessionStore.isOnlyDoctorRole()) {
            if (event.eventWrapper && event.eventWrapper.isEoVisitType) {
                content = `${content} <span class="fc-time">${event.start.format('hh:mm A')}</span> <span class="fc-title">EUO-${event.eventWrapper.insuranceMaster.companyName}</span>`;
            }
        }
        else if (event.eventWrapper && event.eventWrapper.isImeVisitType) {
            content = `${content} <span class="fc-time">${event.start.format('hh:mm A')}</span> <span class="fc-title">IME-${event.eventWrapper.patient.user.displayName}</span>`;
        }
        
        if (event.eventWrapper && content == '') {            
            content = `${content} <span class="fc-title">Unscheduled-${event.eventWrapper.patient.user.displayName}</span>`;
        }
        // if (event.eventWrapper.isOutOfOffice) {
        //     content = `${content} <span class="fc-time">${event.start.format('hh:mm A')}</span> <span class="fc-title">Out of office</span>`;
        // } else {
        //     if (!event.eventWrapper.isOutOfOffice) {
        // content = `${content} <span class="fc-time">${event.start.format('hh:mm A')}</span> <span class="fc-title">${event.eventWrapper.patient.user.displayName}</span>`;
        //     }
        // }
        element.find('.fc-content').html(content);
    }

    isSaveProgress: boolean = false;

    constructor(
        public _route: ActivatedRoute,
        private _fb: FormBuilder,
        private _cd: ChangeDetectorRef,
        private _router: Router,
        public sessionStore: SessionStore,
        private _patientVisitsStore: PatientVisitsStore,
        private _patientsStore: PatientsStore,
        private _roomsStore: RoomsStore,
        private _casesStore: CasesStore,
        public doctorsStore: DoctorsStore,
        public locationsStore: LocationsStore,
        private _scheduleStore: ScheduleStore,
        private _roomScheduleStore: RoomScheduleStore,
        private _doctorLocationScheduleStore: DoctorLocationScheduleStore,
        private _progressBarService: ProgressBarService,
        private _notificationsStore: NotificationsStore,
        private _confirmationService: ConfirmationService,
        private _notificationsService: NotificationsService,
        private _roomsService: RoomsService,
        private _specialityService: SpecialityService,
        private _procedureStore: ProcedureStore,
        private _visitReferralStore: VisitReferralStore,
        private confirmationService: ConfirmationService,
        private _userSettingStore: UserSettingStore,
        private _procedureCodeMasterStore: ProcedureCodeMasterStore,
        private _specialityStore: SpecialityStore,
        private _specialityDetailStore: SpecialityDetailsStore        
    ) {

        // getUserSettingsForCompany() {
            this._userSettingStore.getUserSettingByUserId(this.userId, this.companyId)
                .subscribe((userSetting) => {
                    this.userSetting = userSetting;
                    this.defaultView = userSetting.calendarViewLabel;
                    // this.calendarViewId = userSetting.calendarViewId;

                },
                (error) => { },
                () => {
                });

        // }
        this.loadAllVisitsByCompanyId();
        this.loadAllUnScheduledVisitByCompanyId();
        this.loadAllSpecialitiesAndTests();    

        this.loadEoVisits();
        this.loadImeVisits();
        this.patientScheduleForm = this._fb.group({
            patientId: ['', Validators.required],
            caseId: ['', Validators.required],
            isAddNewPatient: [''],
            isGoingOutOffice: [''],
            isProcedureCode: [''],
            ShowAllProcedureCode: [''],
            ShowAllProcedureCodeTest: [''],
            notes: ['']
        });

        this.unscheduledForm = this._fb.group({
            patientId: ['', Validators.required],
            caseId: ['', Validators.required],
            notes: [''],
            medicalProviderName: ['', Validators.required],
            locationName: ['', Validators.required],
            doctorName: ['', Validators.required],
            speciality: [''],
            eventStartDate: [''],
            // eventStartTime: [''],
            // duration: ['', Validators.required],
        });
        
        this.unscheduledFormControls = this.unscheduledForm.controls;

        this.unscheduledVisitForm = this._fb.group({
            notes: ['', Validators.required],
            visitStatusId: [''],
            readingDoctor: ['']
        });

        this.unscheduledVisitFormControls = this.unscheduledVisitForm.controls;

        this.patientScheduleFormControls = this.patientScheduleForm.controls;

        this.addNewPatientForm = this._fb.group(this.patientFormControlModel());

        this.addNewPatientFormControls = this.addNewPatientForm.controls;

        this.patientVisitForm = this._fb.group({
            notes: ['', Validators.required],
            visitStatusId: [''],
            readingDoctor: ['']
        });
        this.patientVisitFormControls = this.patientVisitForm.controls;

        
    }

    patientFormControlModel() {
        const model = {
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            email: ['', [Validators.required, AppValidators.emailValidator]],
            cellPhone: ['', [Validators.required, AppValidators.mobileNoValidator]]
        };
        return model;
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
    
    
    selectPatient(event) {
        let currentPatient: number = parseInt(event.value);
        let idPatient = parseInt(event.value);
        if (event.value != '') {
            let result = this._casesStore.getOpenCaseForPatientByPatientIdAndCompanyId(currentPatient);
            result.subscribe((cases) => { this.cases = cases; }, null);
        }
    }

    ngOnInit() {
        this.routeFromCase;
        // this.getUserSettingsForCompany();
        this.getReadingDoctorsByCompanyId();
        this.header = {
            left: 'prev,next today',
            center: 'title',
            right: 'month,agendaWeek,agendaDay,listWeek,listDay'
        };
        this.views = {
            listDay: { buttonText: 'list day' },
            listWeek: { buttonText: 'list week' }
        };

        this.sessionStore.userCompanyChangeEvent.subscribe(() => {
            if (!this.sessionStore.isOnlyDoctorRole()) {
                this.locationsStore.getLocations();
            } else {
                this.locationsStore.getLocationsByCompanyDoctorId(this.sessionStore.session.currentCompany.id, this.doctorId);
                this.doctorsStore.fetchDoctorById(this.doctorId)
                    .subscribe((doctor: Doctor) => {
                        this.doctorSpecialities = doctor.doctorSpecialities;
                    },

                    (error) => {
                        // this._progressBarService.hide();
                    },
                    () => {
                        // this._progressBarService.hide();
                    });
            }
        });
        if (!this.sessionStore.isOnlyDoctorRole()) {
            this.locationsStore.getLocations();
        } else {
            this.locationsStore.getLocationsByCompanyDoctorId(this.sessionStore.session.currentCompany.id, this.doctorId);
            this.doctorsStore.fetchDoctorById(this.doctorId)
                .subscribe((doctor: Doctor) => {
                    this.doctorSpecialities = doctor.doctorSpecialities;
                },

                (error) => {
                    // this._progressBarService.hide();
                },
                () => {
                    // this._progressBarService.hide();
                });
        }
        this._patientsStore.getPatientsWithOpenCases()
            .subscribe(patients => {
                // this.patientsWithoutCase = patients;
                // this.idPatient = patients[0].id;
                let defaultLabel: any[] = [{
                    label: '-Select Patient-',
                    value: ''
                }]
                let patientsWithoutCase = _.map(patients, (currPatient: Patient) => {
                    return {
                        label: `${currPatient.user.firstName}  ${currPatient.user.lastName}`,
                        value: currPatient.id
                    };
                })
                this.patientsWithOpenCase = _.union(defaultLabel, patientsWithoutCase);
                // (patient: Patient[]) => {
                //     this.patients = patient;
            },
            (error) => {
                this._router.navigate(['../'], { relativeTo: this._route });
                this._progressBarService.hide();
            },
            () => {
                this._progressBarService.hide();
            });

        //    this._route.parent.parent.parent.params.subscribe((routeParams: any) => {
        //         this.caseId = parseInt(routeParams.caseId, 10);
        //     });
        // this._route.parent.parent.parent.parent.params.subscribe((routeParams: any) => {
        //     this.patientId = parseInt(routeParams.patientId, 10);
        //     this._progressBarService.show();
        if (this.idPatient && this.caseId) {
            let fetchPatient = this._patientsStore.fetchPatientById(this.idPatient);
            let fetchCaseDetail = this._casesStore.fetchCaseById(this.caseId);

            Observable.forkJoin([fetchPatient, fetchCaseDetail])
                .subscribe(
                (results) => {
                    this.patient = results[0];
                    this.caseDetail = results[1];
                },
                (error) => {
                    this._router.navigate(['../'], { relativeTo: this._route });
                    this._progressBarService.hide();
                },
                () => {
                    this._progressBarService.hide();
                });
        }

    }

    isFormValid() {
        let validFormForProcedure: boolean = false;
        if (this.selectedSpeciality) {
            if (this.selectedSpeciality.mandatoryProcCode) {
                if (this.selectedProcedures) {
                    if (this.selectedProcedures.length > 0) {
                        validFormForProcedure = true;
                    }
                }
            } else {
                validFormForProcedure = true;
            }
        }
        else{
            if (this.selectedTestId == 0)
            {
                return false;
            }
        }
      
        if (this.selectedTestId > 0) {
            if (this.selectedProcedures) {
                if (this.selectedProcedures.length > 0) {
                    validFormForProcedure = true;
                }
            }
        }
        if (this.scheduledEventEditorValid && this.patientScheduleForm.valid && !this.isGoingOutOffice) {
            return true;
        } else if (this.isGoingOutOffice && this.leaveEventEditorValid) {
            return true;
        } else {
            return false;
        }
    }
    getReadingDoctorsByCompanyId() {        
        // this._progressBarService.show();
        this.doctorsStore.getReadingDoctorsByCompanyId()
            .subscribe((readingDoctors: Doctor[]) => {
                let doctorDetails = _.reject(readingDoctors, (currentDoctor: Doctor) => {
                    return currentDoctor.user == null;
                })
                this.readingDoctors = doctorDetails;
            },

            (error) => {
                // this._progressBarService.hide();
            },
            () => {
                // this._progressBarService.hide();
            });
    }


    getReadingDoctorsByCompanyLocationTestId(locationId:number, testId:number) {        
        // this._progressBarService.show();
        this.readingDoctors = [];
        this.doctorsStore.getReadingDoctorsByCompanyLocationRoomTestId(locationId, testId)
            .subscribe((readingDoctors: Doctor[]) => {
                let doctorDetails = _.reject(readingDoctors, (currentDoctor: Doctor) => {
                    return currentDoctor.user == null;
                })
                this.readingDoctors = doctorDetails;
            },

            (error) => {
                // this._progressBarService.hide();
            },
            () => {
                // this._progressBarService.hide();
            });
    }

    loadAllProceduresForSpeciality(specialityId: number)
    {
        this.procedures = [];
        this._progressBarService.show();        
        if(this.ShowAllProcedureCode == true)
        {
            let result = this._procedureStore.getAllProceduresBySpecialityIdForVisit(specialityId);
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
                    if(this.procedures.length > 0)
                    {
                        this.isProcedureCode = true;
                    }
                    else
                    {
                        this.isProcedureCode = false;
                    }
                },
                (error) => {
                    this._progressBarService.hide();
                },
                () => {
                    this._progressBarService.hide();
                });
        } 
        else
        {
            this._progressBarService.hide();
            this.loadProceduresForSpeciality(specialityId);
        }               
    }

      loadProceduresForSpeciality(specialityId: number) {
        this.procedures = [];
        this._progressBarService.show();
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
                if(this.procedures.length > 0)
                {
                    this.isProcedureCode = true;
                }
                else
                {
                    this.isProcedureCode = false;
                }
            },
            (error) => {
                this._progressBarService.hide();
            },
            () => {
                this._progressBarService.hide();
            });
    }

    loadAllProceduresForRoomTest(roomTestId: number) {
        this.procedures = [];
        this._progressBarService.show();
        if(this.ShowAllProcedureCodeTest == true)
        {        
        let result = this._procedureStore.getAllProceduresByRoomTestIdForVisit(roomTestId);
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
                if(this.procedures.length > 0)
                {
                    this.isProcedureCode = true;
                }
                else
                {
                    this.isProcedureCode = false;
                }
            },
            (error) => {
                this._progressBarService.hide();
            },
            () => {
                this._progressBarService.hide();
            });
             } 
        else
        {
            this._progressBarService.hide();
            this.loadProceduresForRoomTest(roomTestId);
        }       
    }

    loadProceduresForRoomTest(roomTestId: number) {
        this.procedures = [];
        this._progressBarService.show();
        let result = this._procedureStore.getPrefferedProceduresByRoomTestIdForPVisit(roomTestId);
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

    checkMandatoryProcCodeforSpeciality(specialityId: number)
    {        
        this.ShowProcedureCode = false;
        this._progressBarService.show();
        let result = this._specialityDetailStore.fetchSpecialityDetailByCompanySpecialtyId(specialityId);
        result.subscribe(
            (speciality: SpecialityDetail) => {                
                if (speciality.mandatoryProcCode == false) {
                    this.ShowProcedureCode = false;
                }
                else
                {
                    this.ShowProcedureCode = true;
                }
            },
            (error) => {
                this._progressBarService.hide();
            },
            () => {
                this._progressBarService.hide();
            });
    }

    checkMandatoryProcCodeforTestSpeciality(RoomTestId: number)
    {   
        this.ShowProcedureCode = true;
        this._progressBarService.show();
        let result = this._procedureCodeMasterStore.getByRoomTestAndCompanyIdNew(RoomTestId);
        result.subscribe(
            (speciality: TestSpecialityDetail) => {                
                if (speciality.showProcCode == false) {
                    this.ShowProcedureCode = false;
                }
                else
                {
                    this.ShowProcedureCode = true;
                }
            },
            (error) => {
                this._progressBarService.hide();
            },
            () => {
                this._progressBarService.hide();
            });
    }

    fetchSelectedSpeciality(specialityId: number) {
        this._progressBarService.show();
        let result = this._specialityService.getSpeciality(specialityId);
        result.subscribe(
            (speciality: Speciality) => {
                this.selectedSpeciality = speciality;
                if (speciality.mandatoryProcCode) {
                    this.isProcedureCode = true;
                }
            },
            (error) => {
                this._progressBarService.hide();
            },
            () => {
                this._progressBarService.hide();
            });
    }

    selectedvisitstat()
    {   
        let patientVisitFormValues = this.patientVisitForm.value;
        this.visitStatusIdR = patientVisitFormValues.visitStatusId;  
    }

    selectLocation() {
        if (this.selectedLocationId == 0) {
            this.selectedMode = 0;
            this.selectedOption = 0;
            this.selectedDoctorId = 0;
            this.selectedRoomId = 0;
            this.selectedSpecialityId = 0;
            this.selectedTestId = 0;
            this.events = [];
            this.loadAllVisits();
        } else {
            this.events = [];
            this.loadLocationVisits();
            this._doctorLocationScheduleStore.getDoctorLocationSchedulesByLocationId(this.selectedLocationId)
                .subscribe((doctorLocationSchedules: DoctorLocationSchedule[]) => {
                    let mappedDoctorLocationSchedules: {
                        doctorLocationSchedule: DoctorLocationSchedule,
                        speciality: DoctorSpeciality
                    }[] = [];
                    _.forEach(doctorLocationSchedules, (currentDoctorLocationSchedule: DoctorLocationSchedule) => {
                        _.forEach(currentDoctorLocationSchedule.doctor.doctorSpecialities, (currentSpeciality: DoctorSpeciality) => {
                            mappedDoctorLocationSchedules.push({
                                doctorLocationSchedule: currentDoctorLocationSchedule,
                                speciality: currentSpeciality
                            });
                        });
                    });
                    this.doctorLocationSchedules = mappedDoctorLocationSchedules;
                }, error => {
                    this.doctorLocationSchedules = [];
                });
                
                if(!this.sessionStore.isOnlyDoctorRole())
                {
                    this._roomsStore.getRooms(this.selectedLocationId)
                    .subscribe((rooms: Room[]) => {
                        this.rooms = rooms;
                    }, error => {
                        this.rooms = [];
                    });
                }
                else
                {
                    let patientVisitFormValues = this.patientVisitForm.value;                       
                    this._roomsStore.getRoomsByLocationDoctorId(this.selectedLocationId, this.doctorId)
                    .subscribe((rooms: Room[]) => {
                        this.rooms = rooms;
                    }, error => {
                        this.rooms = [];
                    });
                }            
            }
        }

    fetchRoomSchedule() {
        let fetchRoom = this._roomsStore.getRoomById(this.selectedRoomId);
        fetchRoom.subscribe((results) => {
            let room: Room = results;
            let scheduleId: number = room.schedule.id;
            this._scheduleStore.fetchScheduleById(scheduleId)
                .subscribe((schedule: Schedule) => {
                    this.roomSchedule = schedule;
                    this.updateAvaibility(this.roomSchedule.scheduleDetails);
                });
        });
    }

    updateAvaibility(scheduleDetails: ScheduleDetail[]) {
        let businessHours: any = [];
        businessHours = _.chain(scheduleDetails)
            .filter((currentScheduleDetail: ScheduleDetail) => {
                return currentScheduleDetail.scheduleStatus === 1;
            })
            .groupBy((currentRoomSchedule: ScheduleDetail) => {
                return `${currentRoomSchedule.slotStart ? currentRoomSchedule.slotStart.format('HH:mm') : '00:00'} - ${currentRoomSchedule.slotEnd ? currentRoomSchedule.slotEnd.format('HH:mm') : '23:59'}`;
            }).map((timewiseGroup: Array<ScheduleDetail>) => {
                let firstScheduleDetail: ScheduleDetail = timewiseGroup[0];
                return {
                    dow: _.map(timewiseGroup, (currentScheduleDetail: ScheduleDetail) => {
                        return currentScheduleDetail.dayofWeek - 1;
                    }),
                    start: firstScheduleDetail.slotStart ? firstScheduleDetail.slotStart.format('HH:mm') : '00:00',
                    end: firstScheduleDetail.slotEnd ? firstScheduleDetail.slotEnd.format('HH:mm') : '23:59'
                };
            }).value();
        this.businessHours = businessHours;
    }

    fetchDoctorSchedule() {
        let fetchDoctorLocationSchedule = this._doctorLocationScheduleStore.getDoctorLocationScheduleByDoctorIdAndLocationId(this.selectedDoctorId, this.selectedLocationId);
        fetchDoctorLocationSchedule.subscribe((results) => {
            let doctorSchedule: DoctorLocationSchedule = results;
            let scheduleId: number = doctorSchedule.schedule.id;
            this._scheduleStore.fetchScheduleById(scheduleId)
                .subscribe((schedule: Schedule) => {
                    this.doctorSchedule = schedule;
                    this.updateAvaibility(this.doctorSchedule.scheduleDetails);
                });
        });
    }

    loadAllVisitsByCompanyId() {
        this.events = [];
        this._progressBarService.show();                  
        if(this.sessionStore.isOnlyDoctorRole())
        {
            this._patientVisitsStore.getPatientVisitsByCompanyIdDoctorId()
            .subscribe(
            (visits: PatientVisit[]) => {
                
                let events = this.getVisitOccurrences(visits);
                this.events = _.union(this.events, events);                
            },
            (error) => {
                this.events = [];
                let notification = new Notification({
                    'title': error.message,
                    'type': 'ERROR',
                    'createdAt': moment()
                });
                this._notificationsStore.addNotification(notification);
                this._progressBarService.hide();
            },
            () => {
                this._progressBarService.hide();
            });    
        }
        else
        {
            this._patientVisitsStore.getPatientVisitsByCompanyId(this.companyId)
            .subscribe(
            (visits: PatientVisit[]) => {
                let events = this.getVisitOccurrences(visits);
                this.events = _.union(this.events, events);                
            },
            (error) => {
                this.events = [];
                let notification = new Notification({
                    'title': error.message,
                    'type': 'ERROR',
                    'createdAt': moment()
                });
                this._notificationsStore.addNotification(notification);
                this._progressBarService.hide();
            },
            () => {
                this._progressBarService.hide();
            });    
        }        
    }

    loadAllUnScheduledVisitByCompanyId() {
        this.events = [];
        this._progressBarService.show();                  
        if(!this.sessionStore.isOnlyDoctorRole())
        {            
            this._visitReferralStore.getUnscheduledVisitByCompanyId()
            .subscribe(
            (visits: UnscheduledVisit[]) => {                
                let events = this.getUnScheduledVisitOccurrences(visits);
                this.events = _.union(this.events, events);                
            },
            (error) => {
                this.events = [];
                let notification = new Notification({
                    'title': error.message,
                    'type': 'ERROR',
                    'createdAt': moment()
                });
                this._notificationsStore.addNotification(notification);
                this._progressBarService.hide();
            },
            () => {
                this._progressBarService.hide();
            });    
        }             
    }

    selectOption(event) {
        this.selectedDoctorId = 0;
        this.selectedRoomId = 0;
        this.selectedOption = 0;
        this.events = [];
        if (event.target.selectedOptions[0].getAttribute('data-type') == '1') {
            this.selectedOption = 1;
            this.selectedDoctorId = parseInt(event.target.value);
            this.selectedSpecialityId = parseInt(event.target.selectedOptions[0].getAttribute('data-specialityId'));
            this.loadLocationDoctorSpeciatityVisits();
            this.fetchDoctorSchedule();
            this.fetchSelectedSpeciality(this.selectedSpecialityId);
            this.checkMandatoryProcCodeforSpeciality(this.selectedSpecialityId);
            this.loadProceduresForSpeciality(this.selectedSpecialityId);
            this.selectedTestId = 0;
            this.selectedProcedures = null;
            this.ShowAllProcedureCode = false;
            this.isProcedureCode = true;
        } else if (event.target.selectedOptions[0].getAttribute('data-type') == '2') {
            this.selectedOption = 2;
            this.selectedRoomId = parseInt(event.target.value);
            this.selectedTestId = parseInt(event.target.selectedOptions[0].getAttribute('data-testId'));
            this.loadLocationRoomVisits();
            this.fetchRoomSchedule();
            this.checkMandatoryProcCodeforTestSpeciality(this.selectedTestId);
            this.loadProceduresForRoomTest(this.selectedTestId);
            this.isProcedureCode = true;
            this.selectedSpeciality = null;
            this.selectedProcedures = null;
            this.ShowAllProcedureCodeTest = false;
        } else {
            this.selectedMode = 0;
            this.selectLocation();            
        }
    }

    clearselection()
    {
        this.selectedLocationId = 0;
        this.idPatient = 0;
        this.selectedMode = 0;
        this.selectedOption = 0;
        this.selectedDoctorId = 0;
        this.selectedRoomId = 0;
        this.selectedSpecialityId = 0;
        this.selectedTestId = 0;
    }

    loadVisits() {                
        if (this.selectedOption == 1) {
            this.loadLocationDoctorSpeciatityVisits();
        } else if (this.selectedOption == 2) {
            this.loadLocationRoomVisits();
        } else {
            this.loadAllVisitsByCompanyId();
            this.loadAllUnScheduledVisitByCompanyId();
            this.loadEoVisits();
            this.loadImeVisits();
        }
    }

    loadAllVisits() {             
            this.clearselection();           
            this.loadAllVisitsByCompanyId();
            this.loadAllUnScheduledVisitByCompanyId();
            this.loadEoVisits();
            this.loadImeVisits();        
    }

    getVisitOccurrences(visits) {                
        this.outOfOfficeVisits = _.filter(visits, (currentVisit: any) => {
            return currentVisit.isOutOfOffice;
        })
        visits = _.reject(visits, (currentVisit: any) => {
            return currentVisit.isOutOfOffice;
        })
        let occurrences: ScheduledEventInstance[] = [];
        let calendarEvents: ScheduledEvent[] = _.chain(visits)
            .map((visit: PatientVisit) => {
                return visit.calendarEvent;
            })
            .unique((event: ScheduledEvent) => {
                return event.id;
            })
            .value();
        _.forEach(calendarEvents, (event: ScheduledEvent) => {
            occurrences.push(...event.getEventInstances(null));
        });
        _.forEach(occurrences, (occurrence: ScheduledEventInstance) => {
            let matchingVisits: PatientVisit[] = _.filter(visits, (currentVisit: PatientVisit) => {
                return currentVisit.calendarEvent.id === occurrence.owningEvent.id;
            });
            let visitForOccurrence: PatientVisit = _.find(matchingVisits, (currentMatchingVisit: PatientVisit) => {
                if (!currentMatchingVisit.isOriginalVisit) {
                    return currentMatchingVisit.eventStart.isSame(occurrence.start, 'day');
                }
                return false;
            });
            if (visitForOccurrence) {
                occurrence.eventWrapper = visitForOccurrence;
            } else {
                let originalVisit: PatientVisit = _.find(matchingVisits, (currentMatchingVisit: PatientVisit) => {
                    return currentMatchingVisit.isOriginalVisit;
                });
                occurrence.eventWrapper = originalVisit;
            }
            return occurrence;
        });        
        // occurrences = _.filter(occurrences, (occurrence: ScheduledEventInstance) => {
        //     return !occurrence.eventWrapper.calendarEvent.isCancelled;
        // });
        return occurrences;
    }

    getUnScheduledVisitOccurrences(visits) {                
        this.outOfOfficeVisits = _.filter(visits, (currentVisit: any) => {
            return currentVisit.isOutOfOffice;
        })
        visits = _.reject(visits, (currentVisit: any) => {
            return currentVisit.isOutOfOffice;
        })
        let occurrences: ScheduledEventInstance[] = [];
        let calendarEvents: ScheduledEvent[] = _.chain(visits)
            .map((visit: UnscheduledVisit) => {
                return visit.calendarEvent;
            })
            .unique((event: ScheduledEvent) => {
                return event.id;
            })
            .value();
        _.forEach(calendarEvents, (event: ScheduledEvent) => {
            occurrences.push(...event.getEventInstances(null));
        });
         _.forEach(occurrences, (occurrence: ScheduledEventInstance) => {
             let matchingVisits: UnscheduledVisit[] = _.filter(visits, (currentVisit: UnscheduledVisit) => {
                return currentVisit.calendarEvent.id === occurrence.owningEvent.id;
             });
             let visitForOccurrence: UnscheduledVisit = _.find(matchingVisits, (currentMatchingVisit: UnscheduledVisit) => {                 
                return false;
            });
            if (visitForOccurrence) {
                 occurrence.eventWrapper = visitForOccurrence;
            } else {
                 let originalVisit: UnscheduledVisit = _.find(matchingVisits, (currentMatchingVisit: UnscheduledVisit) => {
                     return true;
                 });
                 occurrence.eventWrapper = originalVisit;
             }
             return occurrence;
         });        
         occurrences = _.filter(occurrences, (occurrence: ScheduledEventInstance) => {
             return !occurrence.eventWrapper.calendarEvent.isCancelled;
         });
        return occurrences;
    }

    getEOVisitOccurrences(visits) {
        let occurrences: ScheduledEventInstance[] = [];
        let calendarEvents: ScheduledEvent[] = _.chain(visits)
            .map((visit: EoVisit) => {
                return visit.calendarEvent;
            })
            .unique((event: ScheduledEvent) => {
                return event.id;
            })
            .value();
        _.forEach(calendarEvents, (event: ScheduledEvent) => {
            occurrences.push(...event.getEventInstances(null));
        });
        _.forEach(occurrences, (occurrence: ScheduledEventInstance) => {
            let matchingVisits: EoVisit[] = _.filter(visits, (currentVisit: EoVisit) => {
                return currentVisit.calendarEvent.id === occurrence.owningEvent.id;
            });
            let visitForOccurrence: EoVisit = _.find(matchingVisits, (currentMatchingVisit: EoVisit) => {
                if (!currentMatchingVisit.isOriginalVisit) {
                    return currentMatchingVisit.eventStart.isSame(occurrence.start, 'day');
                }
                return false;
            });
            if (visitForOccurrence) {
                // occurrence.eventWrapper = visitForOccurrence;
            } else {
                let originalVisit: EoVisit = _.find(matchingVisits, (currentMatchingVisit: EoVisit) => {
                    return currentMatchingVisit.isOriginalVisit;
                });
                occurrence.eventWrapper = originalVisit;
            }
            return occurrence;
        });
        // occurrences = _.filter(occurrences, (occurrence: ScheduledEventInstance) => {
        //     return !occurrence.eventWrapper.calendarEvent.isCancelled;
        // });
        return occurrences;
    }

    getImeVisitOccurrences(visits) {
        let occurrences: ScheduledEventInstance[] = [];
        let calendarEvents: ScheduledEvent[] = _.chain(visits)
            .map((visit: ImeVisit) => {
                return visit.calendarEvent;
            })
            .unique((event: ScheduledEvent) => {
                return event.id;
            })
            .value();
        _.forEach(calendarEvents, (event: ScheduledEvent) => {
            occurrences.push(...event.getEventInstances(null));
        });
        _.forEach(occurrences, (occurrence: ScheduledEventInstance) => {
            let matchingVisits: ImeVisit[] = _.filter(visits, (currentVisit: ImeVisit) => {
                return currentVisit.calendarEvent.id === occurrence.owningEvent.id;
            });
            let visitForOccurrence: ImeVisit = _.find(matchingVisits, (currentMatchingVisit: ImeVisit) => {
                if (!currentMatchingVisit.isOriginalVisit) {
                    return currentMatchingVisit.eventStart.isSame(occurrence.start, 'day');
                }
                return false;
            });
            if (visitForOccurrence) {
                // occurrence.eventWrapper = visitForOccurrence;
            } else {
                let originalVisit: ImeVisit = _.find(matchingVisits, (currentMatchingVisit: ImeVisit) => {
                    return currentMatchingVisit.isOriginalVisit;
                });
                occurrence.eventWrapper = originalVisit;
            }
            return occurrence;
        });
        // occurrences = _.filter(occurrences, (occurrence: ScheduledEventInstance) => {
        //     return !occurrence.eventWrapper.calendarEvent.isCancelled;
        // });
        return occurrences;
    }    

    loadLocationDoctorSpeciatityVisits() {
        this._progressBarService.show();
        this._patientVisitsStore.getPatientVisitsByLocationDoctorAndSpecialityId(this.selectedLocationId, this.selectedDoctorId, this.selectedSpecialityId)
            .subscribe(
            (visits: PatientVisit[]) => {
                this.events = this.getVisitOccurrences(visits);
            },
            (error) => {
                this.events = [];
                let notification = new Notification({
                    'title': error.message,
                    'type': 'ERROR',
                    'createdAt': moment()
                });
                this._notificationsStore.addNotification(notification);
                this._progressBarService.hide();
            },
            () => {
                this._progressBarService.hide();
            });
    }

    loadLocationRoomVisits() {
        this._progressBarService.show();
        if(this.sessionStore.isOnlyDoctorRole())
        {
            this._patientVisitsStore.getPatientVisitsByLocationDoctorAndRoomId(this.selectedLocationId, this.sessionStore.session.user.id, this.selectedRoomId)
            .subscribe(
            (visits: PatientVisit[]) => {
                this.events = this.getVisitOccurrences(visits);
            },
            (error) => {
                this.events = [];
                let notification = new Notification({
                    'title': error.message,
                    'type': 'ERROR',
                    'createdAt': moment()
                });
                this._notificationsStore.addNotification(notification);
                this._progressBarService.hide();
            },
            () => {
                this._progressBarService.hide();
            });
        }
        else
        {
        this._patientVisitsStore.getPatientVisitsByLocationAndRoomId(this.selectedLocationId, this.selectedRoomId)
            .subscribe(
            (visits: PatientVisit[]) => {
                this.events = this.getVisitOccurrences(visits);
            },
            (error) => {
                this.events = [];
                let notification = new Notification({
                    'title': error.message,
                    'type': 'ERROR',
                    'createdAt': moment()
                });
                this._notificationsStore.addNotification(notification);
                this._progressBarService.hide();
            },
            () => {
                this._progressBarService.hide();
            });
        }
    }

    loadLocationVisits() {
        this._progressBarService.show();
        if(this.sessionStore.isOnlyDoctorRole())
        {
            this._patientVisitsStore.getPatientVisitsByLocationDoctorAndCompanyId(this.selectedLocationId, this.sessionStore.session.user.id)
            .subscribe(
            (visits: PatientVisit[]) => {
                let events = this.getVisitOccurrences(visits);
                this.events = _.union(this.events, events);                
            },
            (error) => {
                this.events = [];
                let notification = new Notification({
                    'title': error.message,
                    'type': 'ERROR',
                    'createdAt': moment()
                });
                this._notificationsStore.addNotification(notification);
                this._progressBarService.hide();
            },
            () => {
                this._progressBarService.hide();
            });
        }
        else
        {
            this._patientVisitsStore.getPatientVisitsByLocationId(this.selectedLocationId)
            .subscribe(
            (visits: PatientVisit[]) => {
                let events = this.getVisitOccurrences(visits);
                this.events = _.union(this.events, events);
                console.log(this.events);
            },
            (error) => {
                this.events = [];
                let notification = new Notification({
                    'title': error.message,
                    'type': 'ERROR',
                    'createdAt': moment()
                });
                this._notificationsStore.addNotification(notification);
                this._progressBarService.hide();
            },
            () => {
                this._progressBarService.hide();
            });
        }
    }

    loadEoVisits() {
        let result;
        this._progressBarService.show();
        if (this.sessionStore.isOnlyDoctorRole()) {
            result = this._patientVisitsStore.getEoVisitByCompanyAndDoctorId(this.companyId, this.doctorId);
        } else {
            result = this._patientVisitsStore.getEoVisitByCompanyId(this.companyId);
        }
        result.subscribe(
            (visits: EoVisit[]) => {
                let events = this.getEOVisitOccurrences(visits);
                this.events = _.union(this.events, events);                
            },
            (error) => {
                this.events = [];
                let notification = new Notification({
                    'title': error.message,
                    'type': 'ERROR',
                    'createdAt': moment()
                });
                this._notificationsStore.addNotification(notification);
                this._progressBarService.hide();
            },
            () => {
                this._progressBarService.hide();
            });
    }

    loadImeVisits() {
        if (!this.sessionStore.isOnlyDoctorRole()) {
            this._progressBarService.show();
            this._patientVisitsStore.getImeVisitByCompanyId(this.companyId)
                .subscribe(
                (visits: ImeVisit[]) => {
                    let events = this.getImeVisitOccurrences(visits);
                    this.events = _.union(this.events, events);                    
                },
                (error) => {
                    this.events = [];
                    let notification = new Notification({
                        'title': error.message,
                        'type': 'ERROR',
                        'createdAt': moment()
                    });
                    this._notificationsStore.addNotification(notification);
                    this._progressBarService.hide();
                },
                () => {
                    this._progressBarService.hide();
                });
        }
    }

    // closeDialog() {
    //     this.addImeVisitDialogVisible = false;
    //     this.addEoVisitDialogVisible = false;
    // }
    refreshEvents(event) {
        this.events = [];
        this.loadAllVisits();
    }
    closeEventDialog() {
        this.eventDialogUnscheduleVisible = false;
        this.eventDialogVisible = false;
        this.handleEventDialogHide();
        this.addNewPatientForm.reset();
        this.patientScheduleForm.reset();
    }

    closePatientVisitDialog() {
        this.visitDialogVisible = false;
        this.handleVisitDialogHide();
        this.patientVisitForm.reset();
        this.unscheduledDialogVisible = false;
        this.unscheduledEditVisitDialogVisible = false;
    }

    handleEventDialogHide() {
        this.selectedVisit = null;
    }

    handleVisitDialogHide() {
        this.selectedVisit = null;
    }

    private _validateAppointmentCreation(event): boolean {
        let considerTime: boolean = true;
        if (event.view.name == 'month') {
            considerTime = false;
        }

        let canScheduleAppointement: boolean = true;
        if (!this.selectedLocationId) {
            canScheduleAppointement = true;
            // this._notificationsService.alert('Oh No!', 'Please select location!');
        } else {
            if (!this.selectedOption) {
                canScheduleAppointement = false;
                this._notificationsService.alert('Oh No!', 'Please select specialty Or Medical Test!');
            } else if (this.selectedOption == 1) {
                if (!this.selectedDoctorId) {
                    canScheduleAppointement = false;
                    this._notificationsService.alert('Oh No!', 'Please select doctor!');
                } else {
                    if (this.doctorSchedule) {
                        let scheduleDetails: ScheduleDetail[] = this.doctorSchedule.scheduleDetails;
                        let matchingScheduleDetail: ScheduleDetail = _.find(scheduleDetails, (currentScheduleDetail: ScheduleDetail) => {
                            return currentScheduleDetail.isInAllowedSlot(event.date, considerTime);
                        });
                        if (!matchingScheduleDetail) {
                            canScheduleAppointement = false;
                            this._notificationsService.alert('Oh No!', 'You cannot schedule an appointment on this day!');
                        }
                    }
                }
            } else if (this.selectedOption == 2) {
                if (!this.selectedRoomId) {
                    canScheduleAppointement = false;
                    this._notificationsService.alert('Oh No!', 'Please select room!');
                } else {
                    if (this.roomSchedule) {
                        let scheduleDetails: ScheduleDetail[] = this.roomSchedule.scheduleDetails;
                        let matchingScheduleDetail: ScheduleDetail = _.find(scheduleDetails, (currentScheduleDetail: ScheduleDetail) => {
                            return currentScheduleDetail.isInAllowedSlot(event.date, considerTime);
                        });
                        if (!matchingScheduleDetail) {
                            canScheduleAppointement = false;
                            this._notificationsService.alert('Oh No!', 'You cannot schedule an appointment on this day!');
                        }
                    }
                }
            }
        }
        return canScheduleAppointement;
    }

    handleDayClick(event) {
        this.procedures = [];
        this.selectedVisitType = '1';
        this.selectedEventDate = event.date.clone().local();
        this.selectedProcedures = null;
        this.eventDialogVisible = false;
        this.eventDialogUnscheduleVisible = false;
        this.addNewPatientForm.reset();
        this.patientScheduleForm.reset();
        this.selectedVisit = null;
        if (this.selectedOption == 1) {
            if(this.selectedSpeciality != null)
            {
                if (this.selectedSpeciality.mandatoryProcCode) {
                    this.isProcedureCode = true;
                } else {
                    this.isProcedureCode = false;
                }
            }
        } else if (this.selectedOption == 2) {
            this.isProcedureCode = true;
        }
        this.procedures = this.procedures;
        let canScheduleAppointement: boolean = this._validateAppointmentCreation(event);

        if (canScheduleAppointement) {
            // Potential Refactoring for creating visit
            let selectedDoctor: Doctor = null;
            let selectedRoom: Room = null;
            if (this.selectedOption === 1) {
                _.each(this.doctorLocationSchedules, (currentSchedule: {
                    doctorLocationSchedule: DoctorLocationSchedule,
                    speciality: DoctorSpeciality
                }) => {
                    if (currentSchedule.doctorLocationSchedule.doctor.id == this.selectedDoctorId) {
                        selectedDoctor = currentSchedule.doctorLocationSchedule.doctor;
                    }
                });
            } else {
                _.each(this.rooms, (currentRoom: Room) => {
                    if (currentRoom.id == this.selectedRoomId) {
                        selectedRoom = currentRoom;
                    }
                });
            }

            this.selectedVisit = new PatientVisit({
                caseId: this.caseDetail ? this.caseDetail.id : '',
                patientId: this.patient ? this.patient.id : '',
                locationId: this.selectedLocationId,
                doctorId: this.selectedOption == 1 ? this.selectedDoctorId : null,
                doctor: selectedDoctor,
                roomId: this.selectedOption == 2 ? this.selectedRoomId : null,
                room: selectedRoom,
                calendarEvent: new ScheduledEvent({
                    name: '',
                    eventStart: event.date.clone().local(),
                    eventEnd: event.date.clone().local().add(30, 'minutes'),
                    timezone: '',
                    isAllDay: false
                }),
                createByUserID: this.sessionStore.session.account.user.id

            });
            this.visitInfo = this.selectedVisit.visitDisplayString;
            this.eventDialogVisible = true;
            this._cd.detectChanges();
        }
    }

    private _getVisitToBeEditedForEventInstance(eventInstance: ScheduledEventInstance): PatientVisit {                 
        let scheduledEventForInstance: ScheduledEvent = eventInstance.owningEvent;
        let patientVisit: PatientVisit = <PatientVisit>(eventInstance.eventWrapper); 
        this.visitStatusIdC = 0; 
        this.visitStatusIdR = 0;
        if(patientVisit.roomId != null)      
        {
            this.getReadingDoctorsByCompanyLocationTestId(patientVisit.locationId, patientVisit.roomId);
        }        
        if (eventInstance.isInPast) {
            if(patientVisit.roomId != null)
            { this.selectedOption = 2;}             
            else{ this.selectedOption = 1;}
            this.visitStatusIdC = patientVisit.visitStatusId;
            this.visitStatusIdR = this.visitStatusIdC;
            this.isVisitTypeDisabled = false;
            if (scheduledEventForInstance.isChangedInstanceOfSeries) {
                // Edit Existing Single Occurance of Visit
                patientVisit = new PatientVisit(_.extend(patientVisit.toJS(), {
                    calendarEvent: scheduledEventForInstance,
                    case: patientVisit.case ? new Case(_.extend(patientVisit.case.toJS())) : null,
                    doctor: patientVisit.doctor ? new Doctor(_.extend(patientVisit.doctor.toJS(), {
                        user: new User(_.extend(patientVisit.doctor.user.toJS()))
                    })) : null,
                    room: patientVisit.room ? new Room(_.extend(patientVisit.room.toJS())) : null,
                    patient: patientVisit.patient ? new Patient(_.extend(patientVisit.patient.toJS(), {
                        user: new User(_.extend(patientVisit.patient.user.toJS()))
                    })) : null
                }));
            } else {
                // Create Visit Instance 
                if (patientVisit.isExistingVisit) {
                    patientVisit = new PatientVisit(_.extend(patientVisit.toJS(), {
                        eventStart: moment.utc(eventInstance.start),
                        eventEnd: moment.utc(eventInstance.end),
                        calendarEvent: scheduledEventForInstance,
                        case: patientVisit.case ? new Case(_.extend(patientVisit.case.toJS())) : null,
                        doctor: patientVisit.doctor ? new Doctor(_.extend(patientVisit.doctor.toJS(), {
                            user: new User(_.extend(patientVisit.doctor.user.toJS()))
                        })) : null,
                        room: patientVisit.room ? new Room(_.extend(patientVisit.room.toJS())) : null,
                        patient: patientVisit.patient ? new Patient(_.extend(patientVisit.patient.toJS(), {
                            user: new User(_.extend(patientVisit.patient.user.toJS()))
                        })) : null
                    }));
                } else {
                    patientVisit = new PatientVisit(_.extend(patientVisit.toJS(), {
                        id: 0,
                        eventStart: moment.utc(eventInstance.start),
                        eventEnd: moment.utc(eventInstance.end),
                        calendarEvent: scheduledEventForInstance,
                        case: patientVisit.case ? new Case(_.extend(patientVisit.case.toJS())) : null,
                        doctor: patientVisit.doctor ? new Doctor(_.extend(patientVisit.doctor.toJS(), {
                            user: new User(_.extend(patientVisit.doctor.user.toJS()))
                        })) : null,
                        room: patientVisit.room ? new Room(_.extend(patientVisit.room.toJS())) : null,
                        patient: patientVisit.patient ? new Patient(_.extend(patientVisit.patient.toJS(), {
                            user: new User(_.extend(patientVisit.patient.user.toJS()))
                        })) : null
                    }));
                }
            }
        } else {
            this.isVisitTypeDisabled = true;
            patientVisit = new PatientVisit(_.extend(patientVisit.toJS(), {
                calendarEvent: scheduledEventForInstance,
                case: patientVisit.case ? new Case(_.extend(patientVisit.case.toJS())) : null,
                doctor: patientVisit.doctor ? new Doctor(_.extend(patientVisit.doctor.toJS(), {
                    user: new User(_.extend(patientVisit.doctor.user.toJS()))
                })) : null,
                room: patientVisit.room ? new Room(_.extend(patientVisit.room.toJS())) : null,
                patient: patientVisit.patient ? new Patient(_.extend(patientVisit.patient.toJS(), {
                    user: new User(_.extend(patientVisit.patient.user.toJS()))
                })) : null
            }))                        
                       
            /*this.selectedDoctorId = null;
            this.selectedRoomId = null;
            this.selectedOption = 0;
            this.isProcedureCode = true;
            
            if(patientVisit.locationId != null)
            {
                this.selectedLocationId = patientVisit.locationId;
            }
            this.selectLocation();
            if(patientVisit.specialtyId != null)
            {
                this.selectedSpecialityId = patientVisit.specialtyId;
                this.selectedMode = 1;
            }
            if(patientVisit.roomId != null)
            {                
                this.selectedRoomId = patientVisit.roomId;
                this.selectedTestId = patientVisit.room.roomTest.id;
            }           
            
            if(patientVisit.doctorId != null)
            {
                this.selectedDoctorId = patientVisit.doctorId;
                this.selectedOption = 1;                              
                this.ShowAllProcedureCode = true;
                this.fetchSelectedSpeciality(this.selectedSpecialityId);
                this.loadAllProceduresForSpeciality(this.selectedSpecialityId);                                            
            }
            else
            {                
                this.selectedOption = 2;                                                
                this.ShowAllProcedureCodeTest = true;
                this.loadAllProceduresForRoomTest(this.selectedTestId);
            }*/
        }
        return patientVisit;
    }

    private _getUnscheduledVisitToBeEditedForEventInstance(eventInstance: ScheduledEventInstance): UnscheduledVisit {
        let scheduledEventForInstance: ScheduledEvent = eventInstance.owningEvent;
        let unscheduledVisit: UnscheduledVisit = <UnscheduledVisit>(eventInstance.eventWrapper);
        if (eventInstance.isInPast) {
            this.isVisitTypeDisabled = false;
            unscheduledVisit = new UnscheduledVisit(_.extend(unscheduledVisit.toJS(), {
                calendarEvent: scheduledEventForInstance,                
            }));
        } else {
            this.isVisitTypeDisabled = true;
            unscheduledVisit = new UnscheduledVisit(_.extend(unscheduledVisit.toJS(), {
                calendarEvent: scheduledEventForInstance,                
            }))
        }
        return unscheduledVisit;
    }

    private _getEoVisitToBeEditedForEventInstance(eventInstance: ScheduledEventInstance): EoVisit {
        let scheduledEventForInstance: ScheduledEvent = eventInstance.owningEvent;
        let eoVisit: EoVisit = <EoVisit>(eventInstance.eventWrapper);
        debugger;
        if (eventInstance.isInPast) {
            this.isVisitTypeDisabled = false;
            eoVisit = new EoVisit(_.extend(eoVisit.toJS(), {
                visitStatusId: eoVisit.visitStatusId,
                calendarEvent: scheduledEventForInstance,
                doctor: eoVisit.doctor ? new Doctor(_.extend(eoVisit.doctor.toJS(), {
                    // user: new User(_.extend(eoVisit.doctor.user.toJS()))
                })) : null,
            }));
        } else {
            this.isVisitTypeDisabled = true;
            eoVisit = new EoVisit(_.extend(eoVisit.toJS(), {
                calendarEvent: scheduledEventForInstance,
                doctor: eoVisit.doctor ? new Doctor(_.extend(eoVisit.doctor.toJS(), {
                    // user: new User(_.extend(eoVisit.doctor.user.toJS()))
                })) : null,
            }))
        }
        return eoVisit;
    }

    private _getImeVisitToBeEditedForEventInstance(eventInstance: ScheduledEventInstance): ImeVisit {
        let scheduledEventForInstance: ScheduledEvent = eventInstance.owningEvent;
        let imeVisit: ImeVisit = <ImeVisit>(eventInstance.eventWrapper);        
        if (eventInstance.isInPast) {
            imeVisit = new ImeVisit(_.extend(imeVisit.toJS(), {
                calendarEvent: scheduledEventForInstance,
                visitStatusId: imeVisit.visitStatusId,
                case: imeVisit.case ? new Case(_.extend(imeVisit.case.toJS())) : null,
                patient: imeVisit.patient ? new Patient(_.extend(imeVisit.patient.toJS(), {
                    user: new User(_.extend(imeVisit.patient.user.toJS()))
                })) : null
            }))
        }
        else {
            this.isVisitTypeDisabled = true;
            imeVisit = new ImeVisit(_.extend(imeVisit.toJS(), {
                calendarEvent: scheduledEventForInstance,
                case: imeVisit.case ? new Case(_.extend(imeVisit.case.toJS())) : null,
            }))
        }
        return imeVisit;
    }
   
    handleEventClick(event) {           
        let clickedEventInstance: ScheduledEventInstance = event.calEvent;
        let scheduledEventForInstance: ScheduledEvent = clickedEventInstance.owningEvent;
        this.selectedCalEvent = clickedEventInstance;
        let patientVisit: any = (clickedEventInstance.eventWrapper);
        if (patientVisit.isPatientVisitType) {
            this.selectedVisitType = '1';
            this.selectedVisit = this._getVisitToBeEditedForEventInstance(clickedEventInstance);            
        } else if (patientVisit.isImeVisitType) {
            debugger;
            this.selectedVisitType = '2';
            this.selectedVisit = this._getImeVisitToBeEditedForEventInstance(clickedEventInstance);
        } else if(patientVisit.isUnscheduledVisitType)
        {
           this.selectedVisitType = '4';
            let result = this._patientVisitsStore.getUnscheduledVisitDetailById(patientVisit.id);
                result.subscribe((visit: UnscheduledVisit) => {                                      
                    this.unscheduledVisit = visit;
                    this.patientId = visit.patientId;
                    this.caseId = visit.caseId;
                    let isinpast = visit.eventStart.isBefore(moment());
                    this.visitInfo = '';
                    if (this.unscheduledVisit.locationName) {
                        this.visitInfo = `${this.visitInfo}Location Name: ${this.unscheduledVisit.locationName} - `;
                    }
                    if (this.unscheduledVisit.patientId && this.unscheduledVisit.caseId && this.unscheduledVisit.patient) {
                        this.visitInfo = `${this.visitInfo}Patient Name: ${this.unscheduledVisit.patient.user.displayName} - Case Id: ${this.caseId} - `;
                    }
                    if (this.unscheduledVisit.doctorName) {
                        this.visitInfo = `${this.visitInfo}Doctor Name: ${this.unscheduledVisit.doctorName}`;
                        if (this.unscheduledVisit.specialtyId && this.unscheduledVisit.specialty) {
                            this.visitInfo = `${this.visitInfo} - Speciality: ${this.unscheduledVisit.specialty.name}`;
                        }
                    }
                    if (this.unscheduledVisit.roomTestId && this.unscheduledVisit.roomTest) {
                        this.visitInfo = `${this.visitInfo} Test ${this.unscheduledVisit.roomTest.name}`;
                        // if (this.room.roomTest) {
                        //     visitInfo = `${visitInfo} - Test: ${this.room.roomTest.name}`;
                        // }
                    }
            
                    // if (this.eventStart) {
                    //     visitInfo = `${visitInfo} - Visit Start: ${this.eventStart.local().format('MMMM Do YYYY,h:mm:ss a')}`;
                    // }                   
                    //this.selectedVisit = null; 
                    if(isinpast)
                    {                        
                        this.id = null;                                 
                        this.visitDialogVisible = null;              
                        this.unscheduledDialogVisible = true;
                        this.unscheduledEditVisitDialogVisible = null;
                    }
                    else{
                        this.id = visit.id;
                        this.unscheduledVisit = null;                        
                        this.visitDialogVisible = null;
                        this.unscheduledDialogVisible = null;
                        this.unscheduledEditVisitDialogVisible = true;                       
                    }                    
                });            
        }else if (patientVisit.isEoVisitType) {
            this.selectedVisitType = '3';
            this.selectedVisit = this._getEoVisitToBeEditedForEventInstance(clickedEventInstance);
        }
        Object.keys(this.patientScheduleForm.controls).forEach(key => {
            this.patientScheduleForm.controls[key].setValidators(null);
            this.patientScheduleForm.controls[key].updateValueAndValidity();
        });        
        
         if (this.selectedVisit.isEoVisitType && !this.sessionStore.isOnlyDoctorRole()) {
             this.visitInfo = this.selectedVisit.visitDisplayString;
         } else if (this.selectedVisit.isEoVisitType && this.sessionStore.isOnlyDoctorRole()) {
             this.visitInfo = this.selectedVisit.visitDisplayStringForDoctor;
         } else {
            this.visitInfo = this.selectedVisit.visitDisplayString;
        }        


        // this.fetchSelectedSpeciality(this.selectedSpecialityId);
        if (clickedEventInstance.isInPast) {
            // this.visitUploadDocumentUrl = this._url + '/fileupload/multiupload/' + this.selectedVisit.id + '/visit';
            this.visitUploadDocumentUrl = this._url + '/documentmanager/uploadtoblob';
            this.getDocuments();
            if(!patientVisit.isUnscheduledVisitType)
            {
                this.visitDialogVisible = true;                        
            }            
        } else {
            
                if (scheduledEventForInstance.isSeriesOrInstanceOfSeries) {
                    this.confirmEditingEventOccurance();
                } else {
                    if(!patientVisit.isUnscheduledVisitType)
                    {
                        this.eventDialogVisible = true;                        
                    }
                    else
                    {
                        this.eventDialogVisible = false;                        
                    }
                }                      
        }
    }

    private _createVisitInstanceForASeries(id: number, seriesEvent: ScheduledEvent, instanceStart: moment.Moment, instanceEnd: moment.Moment): PatientVisit {
        return new PatientVisit({
            id: id,
            locationId: this.selectedLocationId,
            doctorId: this.selectedOption == 1 ? this.selectedDoctorId : null,
            roomId: this.selectedOption == 2 ? this.selectedRoomId : null,
            calendarEvent: new ScheduledEvent(_.extend(seriesEvent.toJS(), {
                id: seriesEvent.isChangedInstanceOfSeries ? seriesEvent.id : 0,
                eventStart: instanceStart,
                eventEnd: instanceEnd,
                recurrenceId: seriesEvent.id,
                recurrenceRule: null,
                recurrenceException: []
            }))
        });
    }

    confirmEditingEventOccurance() {
        this._confirmationService.confirm({
            message: 'Do you want to edit/cancel only this event occurrence or the whole series?',
            accept: () => {
                if (this.selectedVisit.calendarEvent.isSeries) {
                    this.selectedVisit = this._createVisitInstanceForASeries(this.selectedVisit.id, this.selectedVisit.calendarEvent, this.selectedCalEvent.start, this.selectedCalEvent.end);
                }
                this.eventDialogVisible = true;
                this.eventDialogUnscheduleVisible = false;
            },
            reject: () => {
                if (this.selectedVisit.calendarEvent.isChangedInstanceOfSeries) {
                    let eventId = this.selectedVisit.calendarEvent.recurrenceId;
                    this.selectedVisit = this._patientVisitsStore.findPatientVisitByCalendarEventId(eventId);
                }
                this.eventDialogVisible = true;
                this.eventDialogUnscheduleVisible = false;
            }
        });
    }

    saveVisit() {          
        let result;
        let patientVisitFormValues = this.patientVisitForm.value;
        if (this.selectedVisit.isPatientVisitType) {            
            let updatedVisit: PatientVisit;
            let docID = null;
            if(patientVisitFormValues.visitStatusId == 1)
            {
                this._notificationsService.error('Unable to update!', 'Please select the status');
                this._progressBarService.hide();
                return;
            }

            if(patientVisitFormValues.visitStatusId == 2)
            {
                if(this.selectedVisit.roomId != null)
                {
                    if(patientVisitFormValues.readingDoctor == null || patientVisitFormValues.readingDoctor == 0)
                    {
                        if(!this.sessionStore.isOnlyDoctorRole())
                        {
                            this._notificationsService.error('Unable to update!', 'Please select reading doctor');
                            this._progressBarService.hide();
                            return;
                        }
                    }
                }
            }
            if(this.sessionStore.isOnlyDoctorRole())
            {
                docID = this.selectedVisit.doctorId == null ? this.sessionStore.session.user.id : this.selectedVisit.doctorId;
            }   
            else
            {
                docID = this.selectedOption == 2 ? parseInt(patientVisitFormValues.readingDoctor) : this.selectedVisit.doctorId
            }
            updatedVisit = new PatientVisit(_.extend(this.selectedVisit.toJS(), {
                notes: patientVisitFormValues.notes,
                visitStatusId: patientVisitFormValues.visitStatusId,
                doctorId: docID
            }));
            result = this._patientVisitsStore.updatePatientVisitDetail(updatedVisit);
        } else if (this.selectedVisit.isEoVisitType) {
            let updatedVisit: EoVisit;
            updatedVisit = new EoVisit(_.extend(this.selectedVisit.toJS(), {
                notes: patientVisitFormValues.notes,
                visitStatusId: patientVisitFormValues.visitStatusId,
                doctorId: this.selectedOption == 2 ? parseInt(patientVisitFormValues.readingDoctor) : this.selectedVisit.doctorId
            }));
            result = this._patientVisitsStore.updateEoVisitDetail(updatedVisit);
        } else if (this.selectedVisit.isImeVisitType) {
            let updatedVisit: ImeVisit;
            updatedVisit = new ImeVisit(_.extend(this.selectedVisit.toJS(), {
                notes: patientVisitFormValues.notes,
                visitStatusId: patientVisitFormValues.visitStatusId,
                doctorId: this.selectedOption == 2 ? parseInt(patientVisitFormValues.readingDoctor) : this.selectedVisit.doctorId
            }));
            result = this._patientVisitsStore.updateImeVisitDetail(updatedVisit);
        } else if(this.selectedVisit.isUnscheduledVisitType)
        {
            let updatedVisit: UnscheduledVisit;
            updatedVisit = new UnscheduledVisit(_.extend(this.selectedVisit.toJS(), {
                notes: patientVisitFormValues.notes,
                visitStatusId: patientVisitFormValues.visitStatusId                
             })); 

            let unscheduled = new UnscheduledVisit({
                id: updatedVisit.id,
                patientId: updatedVisit.patientId,
                caseId: updatedVisit.caseId,
                medicalProviderName: updatedVisit.medicalProviderName,
                locationName: updatedVisit.locationName,
                doctorName: updatedVisit.doctorName,
                specialtyId: updatedVisit.specialtyId,
                roomTestId: updatedVisit.roomTestId,
                notes: patientVisitFormValues.notes,
                referralId: null,
                patient: null,
                case: null,
                createByUserID: this.sessionStore.session.account.user.id,
                eventStart: updatedVisit.eventStart,
                orignatorCompanyId: this.sessionStore.session.currentCompany.id,
                calendarEventId: updatedVisit.calendarEventId,
                visitStatusId: patientVisitFormValues.visitStatusId
            });

            result = this._patientVisitsStore.updateUnscheduledVisitDetail(unscheduled);
        }
        this.isSaveProgress = true;
        result.subscribe(
            (response) => {
                
                this.selectedVisit = response;
                this.visitStatusIdC = this.selectedVisit.visitStatusId;
                this.visitStatusIdR = this.visitStatusIdC;
                let notification = new Notification({
                    'title': 'Event updated successfully!',
                    'type': 'SUCCESS',
                    'createdAt': moment()
                });
                this.events = [];
                this.loadAllVisits();
                this._notificationsStore.addNotification(notification);
                this._notificationsService.success('Success!', 'Event updated successfully');
            },
            (error) => {
                let errString = 'Unable to update event!';
                let notification = new Notification({
                    'messages': ErrorMessageFormatter.getErrorMessages(error, errString),
                    'type': 'ERROR',
                    'createdAt': moment()
                });
                this.isSaveProgress = false;
                this._progressBarService.hide();
                this._notificationsStore.addNotification(notification);
            },
            () => {
                this._progressBarService.hide();
                this.isSaveProgress = false;
            });
        this.visitDialogVisible = true;
    }

    saveDiagnosisCodesForVisit(inputDiagnosisCodes: DiagnosisCode[]) {
        let patientVisitFormValues = this.patientVisitForm.value;
        let updatedVisit: PatientVisit;
        let diagnosisCodes = [];
        inputDiagnosisCodes.forEach(currentDiagnosisCode => {
            diagnosisCodes.push({ 'diagnosisCodeId': currentDiagnosisCode.diagnosisCodeId });
        });

        updatedVisit = new PatientVisit(_.extend(this.selectedVisit.toJS(), {
            patientVisitDiagnosisCodes: diagnosisCodes
        }));
        let result = this._patientVisitsStore.updatePatientVisitDetail(updatedVisit);
        result.subscribe(
            (response) => {
                let notification = new Notification({
                    'title': 'Diagnosis codes saved successfully!',
                    'type': 'SUCCESS',
                    'createdAt': moment()
                });
                //this.loadVisits();
                this._notificationsStore.addNotification(notification);
                this._notificationsService.success('Success!', 'Diagnosis codes saved successfully');
            },
            (error) => {
                let errString = 'Unable to save diagnosis codes!';
                let notification = new Notification({
                    'messages': ErrorMessageFormatter.getErrorMessages(error, errString),
                    'type': 'ERROR',
                    'createdAt': moment()
                });
                this._progressBarService.hide();
                this._notificationsStore.addNotification(notification);
            },
            () => {
                this._progressBarService.hide();
            });
        this.visitDialogVisible = true;
    }

    saveProcedureCodesForVisit(inputProcedureCodes: Procedure[]) {
        let patientVisitFormValues = this.patientVisitForm.value;
        let updatedVisit: PatientVisit;
        let procedureCodes = [];
        // procedureCodes = _.union(inputProcedureCodes, this.selectedVisit.patientVisitProcedureCodes)
        // inputProcedureCodes.forEach(currentProcedureCode => {
        //     procedureCodes.push({ 'procedureCodeId': currentProcedureCode.id });
        // });

        updatedVisit = new PatientVisit(_.extend(this.selectedVisit.toJS(), {
            patientVisitProcedureCodes: inputProcedureCodes
        }));
        let result = this._patientVisitsStore.updatePatientVisitDetail(updatedVisit);
        result.subscribe(
            (response) => {
                let notification = new Notification({
                    'title': 'Procedure codes saved successfully!',
                    'type': 'SUCCESS',
                    'createdAt': moment()
                });
                //this.loadVisits();
                this._notificationsStore.addNotification(notification);
                this._notificationsService.success('Success!', 'Procedure codes saved successfully');
            },
            (error) => {
                let errString = 'Unable to save procedure codes!';
                let notification = new Notification({
                    'messages': ErrorMessageFormatter.getErrorMessages(error, errString),
                    'type': 'ERROR',
                    'createdAt': moment()
                });
                this._progressBarService.hide();
                this._notificationsStore.addNotification(notification);
            },
            () => {
                this._progressBarService.hide();
            });
        this.visitDialogVisible = true;
    }

    // saveReferral(inputProcedureCodes: Procedure[]) {
    saveReferral(inputVisitReferrals: VisitReferral[]) {
        let result;
        let patientVisitFormValues = this.patientVisitForm.value;
        
        result = this._visitReferralStore.saveVisitReferral(inputVisitReferrals);
        result.subscribe(
            (response) => {
                let notification = new Notification({
                    'title': 'Referral saved successfully.',
                    'type': 'SUCCESS',
                    'createdAt': moment()
                });
                //this.loadVisits();
                this._notificationsStore.addNotification(notification);
                this._notificationsService.success('Success!', 'Referral saved successfully');
            },
            (error) => {
                let errString = 'Unable to save referral.';
                let notification = new Notification({
                    'messages': ErrorMessageFormatter.getErrorMessages(error, errString),
                    'type': 'ERROR',
                    'createdAt': moment()
                });
                this._progressBarService.hide();
                this._notificationsStore.addNotification(notification);
                this._notificationsService.error(ErrorMessageFormatter.getErrorMessages(error, errString));
            },
            () => {
                this._progressBarService.hide();
            });
        this.visitDialogVisible = true;
    }

    cancelAppointment() {
        let result;
        this._progressBarService.show();
        if (this.selectedVisit.isPatientVisitType) {
            result = this._patientVisitsStore.deletePatientVisit(this.selectedVisit);
        }
        result.subscribe(
            (response) => {
                let notification = new Notification({
                    'title': 'Appointment cancelled successfully!',
                    'type': 'SUCCESS',
                    'createdAt': moment()
                });
                this.eventDialogVisible = false;
                // this.loadVisits();
                this.events = [];
                this.loadAllVisits();
                this._notificationsStore.addNotification(notification);
                this._notificationsService.success('Success!', 'Appointment cancelled successfully!');
            },
            (error) => {
                let errString = 'Unable to cancel appointment!';
                let notification = new Notification({
                    'messages': ErrorMessageFormatter.getErrorMessages(error, errString),
                    'type': 'ERROR',
                    'createdAt': moment()
                });
                this._progressBarService.hide();
                this._notificationsStore.addNotification(notification);
                this._notificationsService.error('Oh No!', ErrorMessageFormatter.getErrorMessages(error, errString));
            },
            () => {
                this._progressBarService.hide();
            });
        this._confirmationDialog.hide();
    }

    cancelCurrentOccurrence() {
        if (this.selectedVisit.calendarEvent.isSeries) {
            this.selectedVisit = this._createVisitInstanceForASeries(this.selectedVisit.id, this.selectedVisit.calendarEvent, this.selectedCalEvent.start, this.selectedCalEvent.end);
        }
        this._progressBarService.show();
        let result = this._patientVisitsStore.cancelCurrentOccurrenceVisit(this.selectedVisit);
        result.subscribe(
            (response) => {
                let notification = new Notification({
                    'title': 'Event cancelled successfully!',
                    'type': 'SUCCESS',
                    'createdAt': moment()
                });
                // this.loadVisits();
                this.events = [];
                this.loadAllVisits();
                this._notificationsStore.addNotification(notification);
            },
            (error) => {
                let errString = 'Unable to cancel event!';
                let notification = new Notification({
                    'messages': ErrorMessageFormatter.getErrorMessages(error, errString),
                    'type': 'ERROR',
                    'createdAt': moment()
                });
                this._progressBarService.hide();
                this._notificationsStore.addNotification(notification);
            },
            () => {
                this._progressBarService.hide();
            });
        this._confirmationDialog.hide();
    }

    private _getUpdatedVisitWithSeriesTerminatedOn(visit: PatientVisit, terminateOn: moment.Moment): PatientVisit {
        let rrule: RRule;
        rrule = new RRule(_.extend({}, visit.calendarEvent.recurrenceRule.origOptions, {
            count: 0,
            until: terminateOn.toDate()
        }));
        let updatedvisit: PatientVisit = new PatientVisit(_.extend(visit.toJS(), {
            calendarEvent: new ScheduledEvent(_.extend(visit.calendarEvent.toJS(), {
                recurrenceRule: rrule
            }))
        }));

        return updatedvisit;
    }

    cancelSeries() {
        if (this.selectedVisit.calendarEvent.isChangedInstanceOfSeries) {
            let eventId = this.selectedVisit.calendarEvent.recurrenceId;
            this.selectedVisit = this._patientVisitsStore.findPatientVisitByCalendarEventId(eventId);
        }
        let result: Observable<PatientVisit>;
        if (this.selectedVisit.calendarEvent.isSeriesStartedInPast) {
            // terminating series on selected date, if series is already started
            let updatedvisit: PatientVisit = this._getUpdatedVisitWithSeriesTerminatedOn(this.selectedVisit, this.selectedCalEvent.start.utc());
            result = this._patientVisitsStore.updateCalendarEvent(updatedvisit);
        } else {
            // cancelling entire series which is not yet started
            result = this._patientVisitsStore.cancelCalendarEvent(this.selectedVisit);
        }
        this._progressBarService.show();
        result.subscribe(
            (response) => {
                let notification = new Notification({
                    'title': 'Event cancelled successfully!',
                    'type': 'SUCCESS',
                    'createdAt': moment()
                });
                this.loadVisits();
                this._notificationsStore.addNotification(notification);
            },
            (error) => {
                let errString = 'Unable to cancel event!';
                let notification = new Notification({
                    'messages': ErrorMessageFormatter.getErrorMessages(error, errString),
                    'type': 'ERROR',
                    'createdAt': moment()
                });
                this._progressBarService.hide();
                this._notificationsStore.addNotification(notification);
            },
            () => {
                this._progressBarService.hide();
            });
        this._confirmationDialog.hide();
    }

    saveEvent() {                
        let patientScheduleFormValues = this.patientScheduleForm.value;
        let updatedEvent: ScheduledEvent;
        let leaveEvent: LeaveEvent;
        let procedureCodes = [];
        if (this.selectedProcedures) {
            this.selectedProcedures.forEach(currentProcedureCode => {
                procedureCodes.push({ 'procedureCodeId': currentProcedureCode.id });
            });
        }
        if (!this.isGoingOutOffice) {
            updatedEvent = this._scheduledEventEditorComponent.getEditedEvent();
        } else {
            leaveEvent = this._leaveEventEditorComponent.getEditedEvent();
        }        
        let docID = null;
        if(this.sessionStore.isOnlyDoctorRole())
        {
            docID = this.sessionStore.session.user.id;
        }
        else
        {
            docID = this.selectedOption == 1 ? this.selectedDoctorId : null;
        }

        let updatedVisit: PatientVisit = new PatientVisit(_.extend(this.selectedVisit.toJS(), {
            // patientId: leaveEvent ? null : patientScheduleFormValues.patientId ? patientScheduleFormValues.patientId : this.idPatient,
            patientId: leaveEvent ? null : this.idPatient ? (this.idPatient) : patientScheduleFormValues.patientId,
            caseId: leaveEvent ? null : patientScheduleFormValues.caseId ? patientScheduleFormValues.caseId : this.caseId,
            locationId: this.selectedLocationId,
            doctorId: docID,
            roomId: this.selectedOption == 2 ? this.selectedRoomId : null,
            specialtyId: this.selectedOption == 1 ? this.selectedSpecialityId : null,
            calendarEvent: updatedEvent ? updatedEvent : this.selectedVisit.calendarEvent,
            isOutOfOffice: this.isGoingOutOffice,
            leaveStartDate: leaveEvent ? leaveEvent.eventStart : null,
            leaveEndDate: leaveEvent ? leaveEvent.eventEnd : null,
            ancillaryProviderId: updatedEvent ? updatedEvent.ancillaryProviderId : null,
            notes: patientScheduleFormValues.notes,
            patientVisitProcedureCodes: this.selectedProcedures ? procedureCodes : [],
            createByUserID: this.sessionStore.session.account.user.id,
            addedByCompanyId : this.sessionStore.session.currentCompany.id
        }));
        if (updatedVisit.id) {
            if (this.selectedVisit.calendarEvent.isSeriesStartedInBefore(this.selectedCalEvent.start)) {
                let endDate: Date = this.selectedVisit.calendarEvent.recurrenceRule.before(this.selectedCalEvent.start.startOf('day').toDate());
                let updatedvisitWithRecurrence: PatientVisit = this._getUpdatedVisitWithSeriesTerminatedOn(this.selectedVisit, moment(endDate));
                this._progressBarService.show();
                let result = this._patientVisitsStore.updateCalendarEvent(updatedvisitWithRecurrence);
                result.subscribe(
                    (response) => {
                        let notification = new Notification({
                            'title': 'Event cancelled successfully!',
                            'type': 'SUCCESS',
                            'createdAt': moment()
                        });
                        this.clearselection();
                        this.loadVisits();                        
                        this._notificationsStore.addNotification(notification);
                    },
                    (error) => {
                        let errString = 'Unable to cancel event!';
                        let notification = new Notification({
                            'messages': ErrorMessageFormatter.getErrorMessages(error, errString),
                            'type': 'ERROR',
                            'createdAt': moment()
                        });
                        this.clearselection();
                        this.loadVisits();
                        this._progressBarService.hide();
                        this._notificationsStore.addNotification(notification);
                    },
                    () => {
                        this._progressBarService.hide();
                    });
                // Add New Visit
                // Change the recurrence rule of selected event to start with selected date from the form 
                // but end on same date as selected Visit rule.
                // new series should start from selected/clicked date
                let occurrences: Date[] = this.selectedVisit.calendarEvent.recurrenceRule.all();
                let until: Date = moment(occurrences[occurrences.length - 1]).set({ 'hour': updatedVisit.calendarEvent.eventStart.hour(), 'minute': updatedVisit.calendarEvent.eventStart.minute() }).toDate();
                let eventStart: Date = this.selectedCalEvent.start.set({ 'hour': updatedVisit.calendarEvent.eventStart.hour(), 'minute': updatedVisit.calendarEvent.eventStart.minute() }).toDate();
                let eventEnd: Date = this.selectedCalEvent.end.set({ 'hour': updatedVisit.calendarEvent.eventEnd.hour(), 'minute': updatedVisit.calendarEvent.eventEnd.minute() }).toDate();
                let rrule = new RRule(_.extend({}, updatedVisit.calendarEvent.recurrenceRule.origOptions, {
                    count: 0,
                    dtstart: eventStart,
                    until: until
                }));

                let updatedAddNewVisit: PatientVisit = new PatientVisit(_.extend(updatedVisit.toJS(), {
                    id: 0,
                    calendarEventId: 0,
                    calendarEvent: new ScheduledEvent(_.extend(updatedVisit.calendarEvent.toJS(), {
                        id: 0,
                        eventStart: moment(eventStart),
                        eventEnd: moment(eventEnd),
                        recurrenceRule: rrule
                    })),
                    createByUserID: this.sessionStore.session.account.user.id
                }));

                let addVisitResult = this._patientVisitsStore.addPatientVisit(updatedAddNewVisit);
                addVisitResult.subscribe(
                    (response) => {
                        let notification = new Notification({
                            'title': 'Event added successfully!',
                            'type': 'SUCCESS',
                            'createdAt': moment()
                        });
                        this.clearselection();
                        this.loadVisits();
                        this._notificationsStore.addNotification(notification);
                        // this.event = null;                        
                        //this.selectLocation();
                    },
                    (error) => {
                        let errString = 'Unable to add event!';
                        let notification = new Notification({
                            'messages': ErrorMessageFormatter.getErrorMessages(error, errString),
                            'type': 'ERROR',
                            'createdAt': moment()
                        });
                        this.clearselection();
                        this.loadVisits();
                        this._progressBarService.hide();
                        this._notificationsStore.addNotification(notification);
                    },
                    () => {
                        this._progressBarService.hide();
                    });
            } else {
                let result = this._patientVisitsStore.updatePatientVisit(updatedVisit);
                result.subscribe(
                    (response) => {
                        let notification = new Notification({
                            'title': 'Event updated successfully!',
                            'type': 'SUCCESS',
                            'createdAt': moment()
                        });
                        this.clearselection();
                        this.loadVisits();                        
                        this._notificationsStore.addNotification(notification);
                    },
                    (error) => {
                        let errString = 'Unable to update event!';
                        let notification = new Notification({
                            'messages': ErrorMessageFormatter.getErrorMessages(error, errString),
                            'type': 'ERROR',
                            'createdAt': moment()
                        });
                        this.clearselection();
                        this.loadVisits();
                        this._progressBarService.hide();
                        this._notificationsStore.addNotification(notification);
                    },
                    () => {
                        this._progressBarService.hide();
                    });
            }
        } else {
            if (updatedVisit.calendarEvent.isChangedInstanceOfSeries) {
                let exceptionResult: Observable<{ exceptionVisit: PatientVisit, recurringEvent: ScheduledEvent }> = this._patientVisitsStore.createExceptionInRecurringEvent(updatedVisit);
                exceptionResult.subscribe(
                    (response: { exceptionVisit: PatientVisit, recurringEvent: ScheduledEvent }) => {

                        let notification = new Notification({
                            'title': `Occurrence for recurring event ${response.recurringEvent.name} created for ${response.exceptionVisit.calendarEvent.eventStart.format('M d, yy')}`,
                            'type': 'SUCCESS',
                            'createdAt': moment()
                        });
                        this._notificationsStore.addNotification(notification);
                        this.loadVisits();
                    },
                    (error) => {
                        let errString = 'Unable to add event!';
                        let notification = new Notification({
                            'messages': `Unable to create occurrence for recurring event ${updatedEvent.name} created for ${updatedEvent.eventStart.format('M d, yy')}`,
                            'type': 'ERROR',
                            'createdAt': moment()
                        });
                        this.clearselection();
                        this.loadVisits();
                        this._progressBarService.hide();
                        this._notificationsStore.addNotification(notification);
                    },
                    () => {
                        this._progressBarService.hide();
                    });
            } else {
                let result = this._patientVisitsStore.addPatientVisit(updatedVisit);
                result.subscribe(
                    (response) => {
                        let notification = new Notification({
                            'title': 'Event added successfully!',
                            'type': 'SUCCESS',
                            'createdAt': moment()
                        });
                        this.clearselection();
                        this.loadVisits();
                        this._notificationsStore.addNotification(notification);
                        // this.event = null; 
                        //this.selectLocation();
                    },
                    (error) => {
                        let errString = 'Unable to add event!';
                        let notification = new Notification({
                            'messages': ErrorMessageFormatter.getErrorMessages(error, errString),
                            'type': 'ERROR',
                            'createdAt': moment()
                        });
                        this.clearselection();
                        this.loadVisits();
                        this._progressBarService.hide();
                        this._notificationsStore.addNotification(notification);
                    },
                    () => {
                        this._progressBarService.hide();
                    });
            }
        }
        this.eventDialogVisible = false;
        this.handleEventDialogHide();
    }

    getDocuments() {
        // this._progressBarService.show();
        let result;
        if (this.selectedVisit.isPatientVisitType) {
            result = this._patientVisitsStore.getDocumentsForVisitId(this.selectedVisit.id)
        } else if (this.selectedVisit.isImeVisitType) {
            result = this._patientVisitsStore.getDocumentsForImeVisitId(this.selectedVisit.id)
        } else if (this.selectedVisit.isEoVisitType) {
            result = this._patientVisitsStore.getDocumentsForEoVisitId(this.selectedVisit.id)
        }
        else if (this.selectedVisit.isUnscheduledVisitType) {
            result = this._patientVisitsStore.getDocumentsForUnscheduledVisitId(this.selectedVisit.id)
        }
        result.subscribe(document => {
            this.documents = document;
        },

            (error) => {
                // this._progressBarService.hide();
            },
            () => {
                // this._progressBarService.hide();
            });
    }

    documentUploadComplete(documents: Document[]) {
        _.forEach(documents, (currentDocument: Document) => {
            if (currentDocument.status == 'Failed') {
                let notification = new Notification({
                    'title': currentDocument.message + '  ' + currentDocument.documentName,
                    'type': 'ERROR',
                    'createdAt': moment()
                });
                this._notificationsStore.addNotification(notification);
                this._notificationsService.error('Oh No!', currentDocument.message);
            } else if (currentDocument.status == 'Success') {
                let notification = new Notification({
                    'title': 'Document uploaded successfully',
                    'type': 'SUCCESS',
                    'createdAt': moment()
                });
                this._notificationsStore.addNotification(notification);
                this._notificationsService.success('Success!', 'Document uploaded successfully');
                this.addConsentDialogVisible = false;
            }
        });
        this.getDocuments();
    }

    documentUploadError(error: Error) {
        if (error.message == 'Please select document Type') {
            this._notificationsService.error('Oh No!', 'Please select document Type');
        }
        else {
            this._notificationsService.error('Oh No!', 'Not able to upload document(s).');
        }
    }

    showDialog(currentCaseId: number) {
        this.addConsentDialogVisible = true;
        this.selectedCaseId = currentCaseId;
    }

    downloadPdf(documentId) {
        this._progressBarService.show();
        this._patientVisitsStore.downloadDocumentForm(this.visitId, documentId)
            .subscribe(
            (response) => {
                // this.document = document
                // window.location.assign(this._url + '/fileupload/download/' + this.caseId + '/' + documentId);
            },
            (error) => {
                let errString = 'Unable to download';
                let notification = new Notification({
                    'messages': 'Unable to download',
                    'type': 'ERROR',
                    'createdAt': moment()
                });
                this._progressBarService.hide();
                //  this._notificationsStore.addNotification(notification);
                this._notificationsService.error('Oh No!', 'Unable to download');
            },
            () => {
                this._progressBarService.hide();
            });
        this._progressBarService.hide();
    }

    deleteDocuments() {
        if (this.selectedDocumentList.length > 0) {
            // this.confirmationService.confirm({
            //     message: 'Do you want to delete this record?',
            //     header: 'Delete Confirmation',
            //     icon: 'fa fa-trash',
            //     accept: () => {

            this.selectedDocumentList.forEach(currentCase => {
                this._progressBarService.show();
                this.isDeleteProgress = true;
                this._patientVisitsStore.deleteDocument(currentCase)
                    .subscribe(
                    (response) => {
                        let notification = new Notification({
                            'title': 'record deleted successfully!',
                            'type': 'SUCCESS',
                            'createdAt': moment()

                        });
                        this.getDocuments();
                        this._notificationsStore.addNotification(notification);
                        this.selectedDocumentList = [];
                    },
                    (error) => {
                        let errString = 'Unable to delete record';
                        let notification = new Notification({
                            'messages': ErrorMessageFormatter.getErrorMessages(error, errString),
                            'type': 'ERROR',
                            'createdAt': moment()
                        });
                        this.selectedDocumentList = [];
                        this._progressBarService.hide();
                        this.isDeleteProgress = false;
                        this._notificationsStore.addNotification(notification);
                        this._notificationsService.error('Oh No!', ErrorMessageFormatter.getErrorMessages(error, errString));
                    },
                    () => {
                        this._progressBarService.hide();
                        this.isDeleteProgress = false;
                    });
            });
            //     }
            // });
        } else {
            let notification = new Notification({
                'title': 'select record to delete',
                'type': 'ERROR',
                'createdAt': moment()
            });
            this._notificationsStore.addNotification(notification);
            this._notificationsService.error('Oh No!', 'Select record to delete');
        }
    }

    addNewPatient() {
        if (!this.isAddNewPatient) {
            Object.keys(this.addNewPatientFormControls).forEach(key => {
                this.addNewPatientFormControls[key].setValidators(null);
                this.addNewPatientFormControls[key].updateValueAndValidity();
            });
        } else {
            Object.keys(this.addNewPatientFormControls).forEach(key => {
                this.addNewPatientFormControls[key].setValidators(this.patientFormControlModel()[key][1]);
                this.addNewPatientFormControls[key].updateValueAndValidity();
            });
        }
    }

    cancelAddingNewPatient() {
        this.isAddNewPatient = false;
        this.addNewPatientForm.reset();
    }

    saveNewPatient() {
        this.isSaveProgress = true;
        let addNewPatientFormValues = this.addNewPatientForm.value;
        let result;
        let patient: any = {
            firstName: addNewPatientFormValues.firstName,
            lastName: addNewPatientFormValues.lastName,
            username: addNewPatientFormValues.email,
            cellPhone: addNewPatientFormValues.cellPhone
        };
        this._progressBarService.show();
        result = this._patientsStore.addQuickPatient(patient);
        result.subscribe(
            (response) => {
                let notification = new Notification({
                    'title': 'Patient added successfully!',
                    'type': 'SUCCESS',
                    'createdAt': moment()
                });
                this._notificationsStore.addNotification(notification);
                this.isAddNewPatient = false;
                this._patientsStore.getPatientsWithOpenCases();
            },
            (error) => {
                let errString = 'Unable to add patient.';
                let notification = new Notification({
                    'messages': ErrorMessageFormatter.getErrorMessages(error, errString),
                    'type': 'ERROR',
                    'createdAt': moment()
                });
                this.isSaveProgress = false;
                this._notificationsStore.addNotification(notification);
                this._notificationsService.error('Oh No!', ErrorMessageFormatter.getErrorMessages(error, errString));
                this._progressBarService.hide();
            },
            () => {
                this.isSaveProgress = false;
                this._progressBarService.hide();
            });
    }

    setPrefferedProcedureMappings(currentprocedure:Procedure, updatestatus:string) {        
        if (currentprocedure.originalResponse.id > 0) {
          if(updatestatus =='set')
          {
              this.setpreffredMsg = 'Do you want to set this to preffered code list?';
              this.setpreffredMsgIcon = 'fa fa-floppy-o';
          }
          else if(updatestatus =='reset')
          {
            this.setpreffredMsg = 'Do you want to remove this from preffered code list?';
            this.setpreffredMsgIcon = 'fa fa-trash';
          }
            // this.confirmationService.confirm({
            //     message: this.setpreffredMsg,
            //     header: 'Confirmation',
            //     icon: this.setpreffredMsgIcon,
            //     accept: () => {
                        this.isDeleteProgress = true;
                        this._progressBarService.show();
                        this._procedureCodeMasterStore.UpdatePreffredProcedureMapping(currentprocedure.originalResponse)
                            .subscribe(
                            (response) => {
                                let notification = new Notification({
                                    'title': 'Preffered Procedure code updated successfully!',
                                    'type': 'SUCCESS',
                                    'createdAt': moment()

                                });
                                this._notificationsStore.addNotification(notification);
                                if(this.selectedOption == 1)
                                {                                   
                                    if(this.ShowAllProcedureCode == true)
                                    {
                                        this.loadAllProceduresForSpeciality(this.selectedSpecialityId);
                                    }
                                    else
                                    {
                                        this.loadProceduresForSpeciality(this.selectedSpecialityId);
                                    }                                    
                                }
                                else if(this.selectedOption == 2)
                                {                
                                    if(this.ShowAllProcedureCodeTest == true)
                                    {
                                        this.loadAllProceduresForRoomTest(this.selectedTestId);
                                    }
                                    else
                                    {
                                        this.loadProceduresForRoomTest(this.selectedTestId);
                                    }
                                }
                            },
                            (error) => {
                                let errString = 'Unable to update preffered procedure code';
                                let notification = new Notification({
                                    'messages': ErrorMessageFormatter.getErrorMessages(error, errString),
                                    'type': 'ERROR',
                                    'createdAt': moment()
                                });                                
                                this._progressBarService.hide();
                                this.isDeleteProgress = false;
                                this._notificationsStore.addNotification(notification);
                                this._notificationsService.error('Oh No!', ErrorMessageFormatter.getErrorMessages(error, errString));
                            },
                            () => {
                                this.isDeleteProgress = false;
                                this._progressBarService.hide();
                            });
                   
            //     }
            // });
        } else {
            let notification = new Notification({
                'title': 'Select procedure to update preffered procedure code',
                'type': 'ERROR',
                'createdAt': moment()
            });
            this._notificationsStore.addNotification(notification);
            this._notificationsService.error('Oh No!', 'Select procedure to update preffered procedure code');
        }
    }

    // showIMEDialog() {
    //     this.addImeVisitDialogVisible = true;
    // }

    // showEoDialog() {
    //     this.addEoVisitDialogVisible = true;
    // }

    deleteDocument(currentdocument: any) {                 
        // this.confirmationService.confirm({
        // message: 'Do you want to delete this record?',
        // header: 'Delete Confirmation',
        // icon: 'fa fa-trash',
        // accept: () => {            
               this._progressBarService.show();
               this.isDeleteProgress = true;
               this._patientVisitsStore.deleteVisitDocument(this.selectedVisit.id, currentdocument.documentId)
                   .subscribe(
                   (response) => {
                       let notification = new Notification({
                           'title': 'Record deleted successfully!',
                           'type': 'SUCCESS',
                           'createdAt': moment()
                       });
                       this.getDocuments();
                       this._notificationsStore.addNotification(notification);
                       this.selectedDocumentList = [];
                   },
                   (error) => {
                       let errString = 'Unable to delete record';
                       let notification = new Notification({
                           'messages': ErrorMessageFormatter.getErrorMessages(error, errString),
                           'type': 'ERROR',
                           'createdAt': moment()
                       });
                       this.selectedDocumentList = [];
                       this._progressBarService.hide();
                       this.isDeleteProgress = false;
                       this._notificationsStore.addNotification(notification);
                       this._notificationsService.error('Oh No!', ErrorMessageFormatter.getErrorMessages(error, errString));
                   },
                   () => {
                       this._progressBarService.hide();
                       this.isDeleteProgress = false;
                   });            
                }
            //  });        
         //}
}

