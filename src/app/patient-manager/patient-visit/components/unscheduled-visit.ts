import { UnscheduledVisit } from '../models/unscheduled-visit';
import { Session } from '../../../commons/models/session';
import { User } from '../../../commons/models/user';
import { Case } from '../../cases/models/case';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { List } from 'immutable';
import * as moment from 'moment';
import * as _ from 'underscore';
import { AppValidators } from '../../../commons/utils/AppValidators';
import { environment } from '../../../../environments/environment';
import { NotificationsService } from 'angular2-notifications';
import { Patient } from '../../patients/models/patient';
import { SessionStore } from '../../../commons/stores/session-store';
import { ProgressBarService } from '../../../commons/services/progress-bar-service';
import { PatientsStore } from '../../patients/stores/patients-store';
import { PatientVisitsStore } from '../stores/patient-visit-store';
import { ErrorMessageFormatter } from '../../../commons/utils/ErrorMessageFormatter';
import { Notification } from '../../../commons/models/notification';
import { NotificationsStore } from '../../../commons/stores/notifications-store';
import { Document } from '../../../commons/models/document';
import { VisitDocument } from '../../patient-visit/models/visit-document';
import { ConfirmDialogModule, ConfirmationService } from 'primeng/primeng';
import * as RRule from 'rrule';
import { ScheduledEvent } from '../../../commons/models/scheduled-event';
import { CasesStore } from '../../../patient-manager/cases/stores/case-store';
import { SpecialityStore } from '../../../account-setup/stores/speciality-store';
import { Speciality } from '../../../account-setup/models/speciality';
import { LeaveEventEditorComponent } from '../../../medical-provider/calendar/components/leave-event-editor';
import { LeaveEvent } from '../../../commons/models/leave-event';
import { RoomsStore } from '../../../medical-provider/rooms/stores/rooms-store';
import { Tests } from '../../../medical-provider/rooms/models/tests';
import { PendingReferralList } from "../../referals/models/pending-referral-list";
import { UnscheduledVisitReferral } from '../models/unscheduled-visit-referral';
import { VisitReferralStore } from '../stores/visit-referral-store';
import { MedicalProviderMasterStore } from '../../../account-setup/stores/medical-provider-master-store';

@Component({
    selector: 'unscheduled-visit',
    templateUrl: './unscheduled-visit.html'
})

export class UnscheduledVisitComponent implements OnInit {
    selectedMode: any = 0;
    selectedDoctorId: number;
    selectedRoomId: number;
    selectedOption: number = 0;
    selectedSpecialityId: number;
    selectedTestId: number;
    patients: Patient[] = [];
    eventDialogVisible: boolean = false;
    visitDialogVisible: boolean = false;
    unscheduledForm: FormGroup;
    unscheduledFormControls;
    unscheduledVisitForm: FormGroup;
    unscheduledVisitFormControls;
    visitUploadDocumentUrl: string;
    private _url: string = `${environment.SERVICE_BASE_URL}`;
    documents: VisitDocument[] = [];
    selectedDocumentList = [];
    isDeleteProgress: boolean = false;
    visitInfo: string = 'Appointment For Investigate Medical Expert';
    visitId: number;
    addConsentDialogVisible: boolean = false;
    selectedCaseId: number;
    doctorId: number = this.sessionStore.session.user.id;
    companyId: number;
    patientId: number;
    isSaveProgress: boolean = false;
    referredBy: string = '';
    isAllDay: boolean;
    repeatType: string = '7';
    @Output() closeDialogBox: EventEmitter<any> = new EventEmitter();
    @Output() refreshEvents: EventEmitter<any> = new EventEmitter();
    @Output() emitExternalReferral: EventEmitter<any> = new EventEmitter();
    cases: Case[];
    private _selectedEvent: ScheduledEvent;
    eventStartAsDate: Date;
    eventEndAsDate: Date;
    duration: number;
    specialities: Speciality[];
    tests: Tests[];
    @Input() caseId: number;
    @Input() idPatient: number;
    @Input() id: number;
    @Input() toCompanyId: number;
    
    IsCompanyDisabled:boolean=false;    
    caseDetail: Case;
    patient: Patient;
    selectedVisit;
    doctorName: string;
    selectedPendingReferral: PendingReferralList;
    medicalProviderName: string='';
    locationName: string='';
    notes: string='';
    calendarEventId: number=0;
    @Input() routeFrom = 'doctorVisit';
    @Input() set pendingReferral(value: PendingReferralList) {
        if (value) {
            this.selectedPendingReferral = value;
            this.eventStartAsDate = moment().toDate();
            this.duration = moment.duration(moment().diff(this.eventStartAsDate)).asMinutes();
            this.eventEndAsDate = moment().toDate();
            this.doctorName = value.displayDoctorName;
            this.selectedMode = value.forSpecialtyId ? value.speciality : value.forRoomTestId ? value.roomTest : 0;
            this.selectedSpecialityId = value.forSpecialtyId ? value.forSpecialtyId : null;
            this.selectedTestId = value.forRoomTestId ? value.forRoomTestId : null;
        }
    };

    @Input() set selectedEvent(value: ScheduledEvent) {
        if (value) {
            this._selectedEvent = value;
            this.eventStartAsDate = this._selectedEvent.eventStartAsDate;
            this.duration = moment.duration(this._selectedEvent.eventEnd.diff(this._selectedEvent.eventStart)).asMinutes();
            this.eventEndAsDate = this._selectedEvent.eventEndAsDate;
            this.isAllDay = this._selectedEvent.isAllDay;
        }
    }

    constructor(
        public _route: ActivatedRoute,
        private _fb: FormBuilder,
        private _cd: ChangeDetectorRef,
        private _router: Router,
        public sessionStore: SessionStore,
        private _patientVisitsStore: PatientVisitsStore,
        private _patientsStore: PatientsStore,
        private _progressBarService: ProgressBarService,
        private _notificationsStore: NotificationsStore,
        private _confirmationService: ConfirmationService,
        private _notificationsService: NotificationsService,
        private confirmationService: ConfirmationService,
        private _casesStore: CasesStore,
        private _specialityStore: SpecialityStore,
        private _roomsStore: RoomsStore,
        private _visitReferralStore: VisitReferralStore,
        private _medicalProviderMasterStore: MedicalProviderMasterStore,
    ) {
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
    }

    ngOnInit() {        
        this.IsCompanyDisabled = false;
        if(this.toCompanyId != null)
        {
            if(this.toCompanyId != undefined)
            {
              if(this.toCompanyId != 0)
              {
                 this._progressBarService.show();
                this._medicalProviderMasterStore.getByCompanyById(this.toCompanyId)
                .subscribe((data: any) => {                           
                    this.medicalProviderName = data.name;
                    this.IsCompanyDisabled = true;
                },
                (error) => {                
                this._progressBarService.hide();
                },
                () => {
                    this._progressBarService.hide();
                });
               }
            }
        }
        
        this.eventStartAsDate = moment().toDate();
        if (this.idPatient && this.caseId) {
            if(this.id == undefined || this.id == 0)
            {
                let fetchPatient = this._patientsStore.fetchPatientById(this.idPatient);
                let fetchCaseDetail = this._casesStore.fetchCaseById(this.caseId);

                Observable.forkJoin([fetchPatient, fetchCaseDetail])
                .subscribe(
                (results: any) => {
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
            else
            {
                let fetchPatient = this._patientsStore.fetchPatientById(this.idPatient);
                let fetchCaseDetail = this._casesStore.fetchCaseById(this.caseId);

                Observable.forkJoin([fetchPatient, fetchCaseDetail])
                .subscribe(
                (results: any) => {
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
                
             this._patientVisitsStore.getUnscheduledVisitDetailById(this.id)
             .subscribe((visit: UnscheduledVisit) => {
                 this.medicalProviderName = visit.medicalProviderName;
                 this.locationName = visit.locationName;
                 this.doctorName = visit.doctorName;
                 this.notes = visit.notes;            
                 this.eventStartAsDate = moment(visit.eventStart).toDate();
                 this.calendarEventId = visit.calendarEventId;
                 this.selectedMode = visit.specialtyId == null ? 2: 1;
                 this.selectedSpecialityId = visit.specialtyId;                 
                 this.selectedTestId = visit.roomTestId;
             });
            }
        }
        this._patientsStore.getPatientsWithOpenCases()
            .subscribe(
            (patient: Patient[]) => {
                this.patients = patient;
            },
            (error) => {
                this._router.navigate(['../'], { relativeTo: this._route });
                this._progressBarService.hide();
            },
            () => {
                this._progressBarService.hide();
            });

        this.loadAllSpecialitiesAndTests();
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
        this.selectedRoomId = 0;
        this.selectedOption = 0;
        if (event.target.selectedOptions[0].getAttribute('data-type') == '0') {
            this.selectedOption = 0;
            this.selectedSpecialityId = 0;
            this.selectedTestId = 0;
        } else if (event.target.selectedOptions[0].getAttribute('data-type') == '1') {
            this.selectedSpecialityId = parseInt(event.target.selectedOptions[0].getAttribute('data-specialityId'));
            this.selectedOption = 1;
        } else if (event.target.selectedOptions[0].getAttribute('data-type') == '2') {
            this.selectedTestId = parseInt(event.target.selectedOptions[0].getAttribute('data-testId'));
            this.selectedOption = 2;
        } else {
            this.selectedMode = 0;
        }
    }
    // selectOption(event) {
    //     this.selectedRoomId = 0;
    //     this.selectedOption = 0;
    //     if (event.target.value == '0') {
    //         this.selectedOption = 0;
    //         this.selectedSpecialityId = 0;
    //         this.selectedTestId = 0;
    //     } else if (event.target.selectedOptions[0].getAttribute('data-type') == '1') {
    //         this.selectedOption = 1;
    //         this.selectedSpecialityId = parseInt(event.target.value);
    //     } else if (event.target.selectedOptions[0].getAttribute('data-type') == '2') {
    //         this.selectedOption = 2;
    //         this.selectedTestId = parseInt(event.target.value);
    //     } else {
    //         this.selectedMode = 0;
    //     }
    // }

    selectPatient(event) {
        let currentPatient: number = parseInt(event.target.value);
        if (event.value != '') {
            let result = this._casesStore.getOpenCaseForPatientByPatientIdAndCompanyId(currentPatient);
            result.subscribe((cases) => { this.cases = cases; }, null);
        }
    }

    saveEvent() {
        this.isSaveProgress = true;
        let unscheduledFormValues = this.unscheduledForm.value;
        let result;
        if (this.routeFrom == 'doctorVisit') {
            let unscheduled = new UnscheduledVisit({
                patientId: this.idPatient,
                caseId: this.caseId,
                medicalProviderName: this.unscheduledForm.value.medicalProviderName,
                locationName: this.unscheduledForm.value.locationName,
                doctorName: this.unscheduledForm.value.doctorName,
                specialtyId: this.selectedSpecialityId ? this.selectedSpecialityId : null,
                roomTestId: this.selectedTestId ? this.selectedTestId : null,
                notes: this.unscheduledForm.value.notes,
                referralId: null,
                patient: null,
                case: null,
                createByUserID: this.sessionStore.session.account.user.id,
                eventStart: moment(this.eventStartAsDate).toDate(),
                orignatorCompanyId: this.sessionStore.session.currentCompany.id,
                calendarEventId: this.calendarEventId,
                id: this.id,
                timezone: this.eventStartAsDate.getTimezoneOffset()
            });

            this._progressBarService.show();

            // let updatedAddNewVisit: UnscheduledVisit = new UnscheduledVisit(_.extend(unscheduled.toJS(), {
            //     id: 0,
            //     calendarEventId: 0,
            //     calendarEvent: new ScheduledEvent(_.extend(unscheduled.calendarEvent.toJS(), {
            //         id: 0                    
            //     })),
            //     createByUserID: this.sessionStore.session.account.user.id
            // }));

            result = this._patientVisitsStore.addUnscheduledVisit(unscheduled);
            result.subscribe(
                (response) => {
                    if(this.id == 0)
                    {
                        let notification = new Notification({
                            'title': 'Event added successfully!',
                            'type': 'SUCCESS',
                            'createdAt': moment()
                        });
                        this._notificationsStore.addNotification(notification);
                        this.closeDialog();
                        this.refreshImeEvents();
                    }
                    else
                    {
                        let notification = new Notification({
                            'title': 'Event updated successfully!',
                            'type': 'SUCCESS',
                            'createdAt': moment()
                        });
                        this._notificationsStore.addNotification(notification);
                        this.closeDialog();
                        this.refreshImeEvents();
                    }
                },
                (error) => {
                    let errString = 'Unable to add event!';
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
                    this.isSaveProgress = false;
                });
        } else if (this.routeFrom == 'pendingReferral') {            
            let unscheduledVisitReferral = new UnscheduledVisitReferral({
                pendingReferralId: this.selectedPendingReferral.id,
                toCompanyId: this.toCompanyId,
                patientVisitUnscheduled: new UnscheduledVisit({
                    patientId: this.idPatient,
                    caseId: this.caseId,
                    medicalProviderName: this.unscheduledForm.value.medicalProviderName,
                    locationName: this.unscheduledForm.value.locationName,
                    doctorName: this.unscheduledForm.value.doctorName,
                    specialtyId: this.selectedSpecialityId ? this.selectedSpecialityId : null,
                    roomTestId: this.selectedTestId ? this.selectedTestId : null,
                    notes: this.unscheduledForm.value.notes,
                    referralId: null,
                    patient: null,
                    case: null,
                    createByUserID: this.sessionStore.session.account.user.id,
                    eventStart: moment(this.eventStartAsDate),
                    orignatorCompanyId: this.sessionStore.session.currentCompany.id,
                    timezone: this.eventStartAsDate.getTimezoneOffset()
                })
            });

            this._progressBarService.show();
            result = this._visitReferralStore.saveUnscheduledVisitReferral(unscheduledVisitReferral);
            result.subscribe(
                (response) => {
                    let notification = new Notification({
                        'title': 'Unscheduled visit referral added successfully!',
                        'type': 'SUCCESS',
                        'createdAt': moment()
                    });
                    this._notificationsStore.addNotification(notification);
                    //this.emitExternalReferral.emit(response.id);
                    this.refreshEvents.emit();
                    this.closeDialog();
                },
                (error) => {
                    let errString = 'Unable to add unscheduled visit referral!';
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
                    this.isSaveProgress = false;
                });
        }
    }

    closeDialog() {
        this.closeDialogBox.emit();
    }

    refreshImeEvents() {
        this.refreshEvents.emit();
    }
    handleVisitDialogHide() { }

}
