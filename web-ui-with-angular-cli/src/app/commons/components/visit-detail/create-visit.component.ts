import { SelectItem } from 'primeng/primeng';
import { Procedure } from '../../../commons/models/procedure';
import { DiagnosisCode } from '../../../commons/models/diagnosis-code';
import { User } from '../../../commons/models/user';
import { Case } from '../../../patient-manager/cases/models/case';
import { Doctor } from '../../../medical-provider/users/models/doctor';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit, ViewChild, ChangeDetectorRef, Input, EventEmitter, Output } from '@angular/core';
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
import { Patient } from '../../../patient-manager/patients/models/patient';
import { PatientVisit } from '../../../patient-manager/patient-visit/models/patient-visit';
import { SessionStore } from '../../../commons/stores/session-store';
import { ProgressBarService } from '../../../commons/services/progress-bar-service';
import { PatientsStore } from '../../../patient-manager/patients/stores/patients-store';
import { RoomsStore } from '../../../medical-provider/rooms/stores/rooms-store';
import { DoctorsStore } from '../../../medical-provider/users/stores/doctors-store';
import { LocationsStore } from '../../../medical-provider/locations/stores/locations-store';
import { ScheduleStore } from '../../../medical-provider/locations/stores/schedule-store';
import { RoomScheduleStore } from '../../../medical-provider/rooms/stores/rooms-schedule-store';
import { DoctorLocationScheduleStore } from '../../../medical-provider/users/stores/doctor-location-schedule-store';
import { PatientVisitsStore } from '../../../patient-manager/patient-visit/stores/patient-visit-store';
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
import { VisitDocument } from '../../../patient-manager/patient-visit/models/visit-document';
import { ConfirmDialogModule, ConfirmationService } from 'primeng/primeng';
import * as RRule from 'rrule';
import { ProcedureStore } from '../../../commons/stores/procedure-store';
import { VisitReferralStore } from '../../../patient-manager/patient-visit/stores/visit-referral-store';
import { VisitReferral } from '../../../patient-manager/patient-visit/models/visit-referral';
import { CasesStore } from '../../../patient-manager/cases/stores/case-store';
import { UserSettingStore } from '../../../commons/stores/user-setting-store';
import { UserSetting } from '../../../commons/models/user-setting';
import { ProcedureCodeMasterStore } from '../../../account-setup/stores/procedure-code-master-store';
import { UnscheduledVisit } from '../../../patient-manager/patient-visit/models/unscheduled-visit';
import { SpecialityStore } from '../../../account-setup/stores/speciality-store';
import { SpecialityDetailsStore } from '../../../account-setup/stores/speciality-details-store';
import { SpecialityDetail } from '../../../account-setup/models/speciality-details';
import { TestSpecialityDetail } from '../../../account-setup/models/test-speciality-details';

@Component({
    selector: 'create-visit',
    templateUrl: './create-visit.component.html',
    styleUrls: ['./create-visit.component.scss']
})

export class CreateVisitComponent implements OnInit {

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
    selectedCalEvent: ScheduledEventInstance;
    selectedLocationId: number = 0;
    selectedLocationIdFilter: number = 0;    
    selectedDoctorId: number = 0;
    selectedDoctorIdFilter: number = 0;
    selectedRoomId: number = 0;
    selectedRoomIdFilter: number = 0;
    selectedOption: number = 0;
    selectedOptionFilter: number = 0;
    selectedTestId: number = 0;
    selectedTestIdFilter: number = 0;
    selectedMode: number = 0;
    selectedModeFilter: number = 0;
    selectedSpecialityId: number = 0;
    selectedSpecialityIdFilter: number = 0;
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
    @Input() caseId: number=0;
    @Input() referrenceId: number;    
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
    procedurecodeheading: string = "Displaying preferred procedure codes";
    @Input() patientId:number;
    unscheduledEditVisitDialogVisible = false;
    unscheduledVisitDialogVisible = false;
    @Output() closeDialog: EventEmitter<boolean> = new EventEmitter();
    @Output() loadReferrals: EventEmitter<any> = new EventEmitter();

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

        if(this.caseId != 0)
        {            
        let ss = this.referrenceId;
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

        this.selectedVisit = new PatientVisit({          
            caseId: this.caseDetail ? this.caseDetail.id : '',
            patientId: this.patientId,
            locationId: this.selectedLocationId,
            doctorId: this.selectedOption == 1 ? this.selectedDoctorId : null,
            doctor: null,
            roomId: this.selectedOption == 2 ? this.selectedRoomId : null,
            room: null,
            calendarEvent: new ScheduledEvent({
                name: '',
                eventStart: moment(),
                eventEnd: moment().add(30, 'minutes'),
                timezone: '',
                isAllDay: false
            }),
            createByUserID: this.sessionStore.session.account.user.id
        });

        if (this.patientId && this.caseId) {
            let fetchPatient = this._patientsStore.fetchPatientById(this.patientId);
            let fetchCaseDetail = this._casesStore.fetchCaseById(this.caseId);

            Observable.forkJoin([fetchPatient, fetchCaseDetail])
                .subscribe(
                (results) => {
                    this.patient = results[0];
                    this.caseDetail = results[1];

                    
        
        this.visitInfo = this.selectedVisit.visitDisplayString;
        this.eventDialogVisible = true;
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
            this.procedurecodeheading = "Displaying all procedure codes"
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
            this.isProcedureCode = true;
            this._progressBarService.hide();
            this.loadProceduresForSpeciality(specialityId);
            this.procedurecodeheading = "Displaying preferred procedure codes"
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
            this.procedurecodeheading = "Displaying all the procedure codes"
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
            this.procedurecodeheading = "Displaying preferred procedure codes"
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
            // this.events = [];
            // this.loadLocationVisits(this.selectedLocationId);
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


        selectLocationforFilter() {
            if (this.selectedLocationIdFilter == 0) {
                this.selectedModeFilter = 0;
                this.selectedOptionFilter = 0;
                this.selectedDoctorIdFilter = 0;
                this.selectedRoomIdFilter = 0;
                this.selectedSpecialityIdFilter = 0;
                this.selectedTestIdFilter = 0;
                this.events = [];
                this.loadAllVisits();
            } else {
                this.events = [];
                this.loadLocationVisits(this.selectedLocationIdFilter);
                this._doctorLocationScheduleStore.getDoctorLocationSchedulesByLocationId(this.selectedLocationIdFilter)
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
                        this._roomsStore.getRooms(this.selectedLocationIdFilter)
                        .subscribe((rooms: Room[]) => {
                            this.rooms = rooms;
                        }, error => {
                            this.rooms = [];
                        });
                    }
                    else
                    {
                        let patientVisitFormValues = this.patientVisitForm.value;                       
                        this._roomsStore.getRoomsByLocationDoctorId(this.selectedLocationIdFilter, this.doctorId)
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

    selectOptionForFilter(event) {
        this.selectedDoctorIdFilter = 0;
        this.selectedRoomIdFilter = 0;
        this.selectedOptionFilter = 0;        
        this.events = [];
        if (event.target.selectedOptions[0].getAttribute('data-type') == '1') {
            this.selectedOptionFilter = 1;
            this.selectedDoctorIdFilter = parseInt(event.target.value);
            this.selectedSpecialityIdFilter = parseInt(event.target.selectedOptions[0].getAttribute('data-specialityIdFilter'));
            this.loadLocationDoctorSpeciatityVisits(this.selectedLocationIdFilter, this.selectedDoctorIdFilter, this.selectedSpecialityIdFilter);                                                               
        } else if (event.target.selectedOptions[0].getAttribute('data-type') == '2') {
            this.selectedOptionFilter = 2;
            this.selectedRoomIdFilter = parseInt(event.target.value);
            this.selectedTestIdFilter = parseInt(event.target.selectedOptions[0].getAttribute('data-testIdFilter'));
            this.loadLocationRoomVisits(this.selectedLocationIdFilter, this.selectedRoomIdFilter);                            
        } else {
            this.selectedMode = 0;
            this.selectLocationforFilter();            
        }
    }

    selectOption(event) {
        this.selectedDoctorId = 0;
        this.selectedRoomId = 0;
        this.selectedOption = 0;        
        //this.events = [];
        if (event.target.selectedOptions[0].getAttribute('data-type') == '1') {
            this.selectedOption = 1;
            this.selectedDoctorId = parseInt(event.target.value);
            this.selectedSpecialityId = parseInt(event.target.selectedOptions[0].getAttribute('data-specialityId'));
          //  this.loadLocationDoctorSpeciatityVisits(this.selectedLocationId, this.selectedDoctorId, this.selectedSpecialityId);                                       
            this.fetchDoctorSchedule();
            this.fetchSelectedSpeciality(this.selectedSpecialityId);
            this.checkMandatoryProcCodeforSpeciality(this.selectedSpecialityId);
            this.loadProceduresForSpeciality(this.selectedSpecialityId);
            this.selectedTestId = 0;
            this.selectedProcedures = null;
            this.ShowAllProcedureCode = false;
            this.isProcedureCode = true;
            this.procedurecodeheading = "Displaying preferred procedure codes";
        } else if (event.target.selectedOptions[0].getAttribute('data-type') == '2') {
            this.selectedOption = 2;
            this.selectedRoomId = parseInt(event.target.value);
            this.selectedTestId = parseInt(event.target.selectedOptions[0].getAttribute('data-testId'));
            //this.loadLocationRoomVisits(this.selectedLocationId, this.selectedRoomId);
            this.fetchRoomSchedule();
            this.checkMandatoryProcCodeforTestSpeciality(this.selectedTestId);
            this.loadProceduresForRoomTest(this.selectedTestId);
            this.isProcedureCode = true;
            this.selectedSpeciality = null;
            this.selectedProcedures = null;
            this.ShowAllProcedureCodeTest = false;
            this.procedurecodeheading = "Displaying preferred procedure codes";
        } else {
            this.selectedMode = 0;
            this.selectLocation();            
        }
    }

    clearselection()
    {        
        this.closeDialog.emit();
        this.loadReferrals.emit();                     
    }

    loadVisits() {                
        if (this.selectedOption == 1) {
            this.loadLocationDoctorSpeciatityVisits(this.selectedLocationId, this.selectedDoctorId, this.selectedSpecialityId);                                       
        } else if (this.selectedOption == 2) {
            this.loadLocationRoomVisits(this.selectedLocationId, this.selectedRoomId);
        } else {
            this.loadAllVisitsByCompanyId();
            this.loadAllUnScheduledVisitByCompanyId();            
        }
    }

    loadAllVisits() {             
            this.clearselection();           
            this.loadAllVisitsByCompanyId();
            this.loadAllUnScheduledVisitByCompanyId();            
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

   
    loadLocationDoctorSpeciatityVisits(locationid, doctorid, specialtyid ) {
        this._progressBarService.show();
        this._patientVisitsStore.getPatientVisitsByLocationDoctorAndSpecialityId(locationid, doctorid, specialtyid)
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

    loadLocationRoomVisits(locationid, roomid) {
        this._progressBarService.show();
        if(this.sessionStore.isOnlyDoctorRole())
        {
            this._patientVisitsStore.getPatientVisitsByLocationDoctorAndRoomId(locationid, this.sessionStore.session.user.id, roomid)
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
        this._patientVisitsStore.getPatientVisitsByLocationAndRoomId(locationid, roomid)
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

    loadLocationVisits(locationid) {
        this._progressBarService.show();
        if(this.sessionStore.isOnlyDoctorRole())
        {
            this._patientVisitsStore.getPatientVisitsByLocationDoctorAndCompanyId(locationid, this.sessionStore.session.user.id)
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
            this._patientVisitsStore.getPatientVisitsByLocationId(locationid)
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

    // closePatientVisitDialog() {
    //     this.visitDialogVisible = false;
    //     this.handleVisitDialogHide();
    //     this.patientVisitForm.reset();
    //     this.unscheduledDialogVisible = false;
    //     this.unscheduledEditVisitDialogVisible = false;
    // }

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
            // if (!this.selectedOption) {
            //     canScheduleAppointement = false;
            //     this._notificationsService.alert('Oh No!', 'Please select specialty Or Medical Test!');
            // }
            if (this.selectedOption == 1) {
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
        this.clearselection();
        this.selectedVisitType = '1';
        this.selectedEventDate = event.date.clone().local();
        this.selectedProcedures = null;
        this.eventDialogVisible = false;
        this.eventDialogUnscheduleVisible = false;
        this.addNewPatientForm.reset();
        this.patientScheduleForm.reset();
        this.selectedVisit = null;        
        // if (this.selectedOption == 1) {
        //     if(this.selectedSpeciality != null)
        //     {
        //         if (this.selectedSpeciality.mandatoryProcCode) {
        //             this.isProcedureCode = true;
        //         } else {
        //             this.isProcedureCode = false;
        //         }
        //     }
        // } else if (this.selectedOption == 2) {
        //     this.isProcedureCode = true;
        // }
        // this.procedures = this.procedures;
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
       
    handleEventClick(event) {           
        let clickedEventInstance: ScheduledEventInstance = event.calEvent;
        let scheduledEventForInstance: ScheduledEvent = clickedEventInstance.owningEvent;
        this.selectedCalEvent = clickedEventInstance;
        let patientVisit: any = (clickedEventInstance.eventWrapper);
        if (patientVisit.isPatientVisitType) {
            this.selectedVisitType = '1';
            this.selectedVisit = this._getVisitToBeEditedForEventInstance(clickedEventInstance);            
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
            addedByCompanyId : this.sessionStore.session.currentCompany.id,
            referralId: this.referrenceId
        }));
       
            let result = this._patientVisitsStore.addPatientVisit(updatedVisit);
                result.subscribe(
                    (response) => {
                        let notification = new Notification({
                            'title': 'Event added successfully!',
                            'type': 'SUCCESS',
                            'createdAt': moment()
                        });
                        this.clearselection();
                        //this.loadVisits();
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
                        //this.loadVisits();
                        this._progressBarService.hide();
                        this._notificationsStore.addNotification(notification);
                    },
                    () => {
                        this._progressBarService.hide();
                    });
    }

    showDialog(currentCaseId: number) {
        this.addConsentDialogVisible = true;
        this.selectedCaseId = currentCaseId;
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
}

