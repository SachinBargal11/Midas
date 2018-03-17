import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';
import { LazyLoadEvent } from 'primeng/primeng';
import { ConfirmDialogModule, ConfirmationService } from 'primeng/primeng';
import * as moment from 'moment';
import * as _ from 'underscore';
import { PatientVisitsStore } from '../../../patient-manager/patient-visit/stores/patient-visit-store';
import { PatientVisit } from '../../../patient-manager/patient-visit/models/patient-visit';
import { NotificationsStore } from '../../stores/notifications-store';
import { Notification } from '../../models/notification';
import { PatientsStore } from '../../../patient-manager/patients/stores/patients-store';
import { Patient } from '../../../patient-manager/patients/models/patient';
import { Doctor } from '../../../medical-provider/users/models/doctor';
import { Room } from '../../../medical-provider/rooms/models/room';
import { DoctorsStore } from '../../../medical-provider/users/stores/doctors-store';
import { RoomsStore } from '../../../medical-provider/rooms/stores/rooms-store';
import { ProgressBarService } from '../../services/progress-bar-service';
import { NotificationsService } from 'angular2-notifications';
import { ErrorMessageFormatter } from '../../utils/ErrorMessageFormatter';
import { CasesStore } from '../../../patient-manager/cases/stores/case-store';
import { Case } from '../../../patient-manager/cases/models/case';
import { environment } from '../../../../environments/environment';
import { Document } from '../../models/document';
import { VisitDocument } from '../../../patient-manager/patient-visit/models/visit-document';
import { SessionStore } from '../../stores/session-store';
import { ImeVisit } from '../../../patient-manager/patient-visit/models/ime-visit';

@Component({
    selector: 'app-ime-visit-detail',
    templateUrl: './ime-visit-detail.component.html',
    styleUrls: ['./ime-visit-detail.component.scss']
})
export class ImeVisitDetailComponent implements OnInit {
    selectedVisits: ImeVisit[] = [];
    selectedDoctorsVisits: ImeVisit[] = [];
    selectedRoomsVisits: ImeVisit[] = [];
    visits: ImeVisit[];
    caseId: number;
    patientId: number;
    datasource: ImeVisit[];
    totalRecords: number;
    currentDoctorName: string;
    currentRoomName: string;
    doctorsVisits: ImeVisit[];
    roomsVisits: ImeVisit[];
    doctor: Doctor;
    room: Room;
    patientName: string;
    patient: Patient;
    isDeleteProgress = false;
    caseStatusId: number;

    readingDoctors: Doctor[];
    readingDoctor: number;
    imeVisitForm: FormGroup;
    imeVisitFormControls;
    visitInfo: string;
    //   selectedVisit: PatientVisit;
    visitUploadDocumentUrl: string;
    documents: VisitDocument[] = [];
    selectedDocumentList = [];
    disableSaveDelete = false;
    visitId: number;
    addConsentDialogVisible: boolean = false;
    selectedCaseId: number;

    private _url = `${environment.SERVICE_BASE_URL}`;

    @Input() selectedVisit: ImeVisit;
    @Input() routeFrom: number;
    @Output() closeDialog: EventEmitter<boolean> = new EventEmitter();
    constructor(
        private _fb: FormBuilder,
        private _router: Router,
        public _route: ActivatedRoute,
        private _patientVisitStore: PatientVisitsStore,
        private _notificationsStore: NotificationsStore,
        private _progressBarService: ProgressBarService,
        private _patientStore: PatientsStore,
        private _notificationsService: NotificationsService,
        private _doctorsStore: DoctorsStore,
        private _roomsStore: RoomsStore,
        private confirmationService: ConfirmationService,
        private _casesStore: CasesStore,
        public sessionStore: SessionStore
    ) {
        this.imeVisitForm = this._fb.group({
            notes: ['', Validators.required],
            visitStatusId: [''],
            readingDoctor: ['']
        });
        this.imeVisitFormControls = this.imeVisitForm.controls;
        this._route.parent.parent.parent.parent.params.subscribe((routeParams: any) => {
            this.patientId = parseInt(routeParams.patientId, 10);
            this._progressBarService.show();
            this._patientStore.fetchPatientById(this.patientId)
                .subscribe(
                (patient: Patient) => {
                    this.patient = patient;
                    this.patientName = patient.user.firstName + ' ' + patient.user.lastName;
                    this.visitInfo = `${this.visitInfo}Patient Name: ${this.patient.user.displayName} - Case Id: ${this.caseId}`;
                },
                (error) => {
                    this._router.navigate(['../'], { relativeTo: this._route });
                    this._progressBarService.hide();
                },
                () => {
                    this._progressBarService.hide();
                });
        });

        this._route.parent.parent.parent.params.subscribe((routeParams: any) => {
            this.caseId = parseInt(routeParams.caseId, 10);
            let result = this._casesStore.fetchCaseById(this.caseId);
            result.subscribe(
                (caseDetail: Case) => {
                    this.caseStatusId = caseDetail.caseStatusId;
                },
                (error) => {
                    this._router.navigate(['../'], { relativeTo: this._route });
                    this._progressBarService.hide();
                },
                () => {
                    this._progressBarService.hide();
                });
        });
    }

    ngOnInit() {
        
        this.getReadingDoctorsByCompanyId();
        this.visitUploadDocumentUrl = this._url + '/documentmanager/uploadtoblob';
        this.getDocuments();
    }

   

    handleVisitDialogHide() {
        this.selectedVisit = null;
    }

    closePatientVisitDialog() {
        // this.dialogVisible = false;
        this.imeVisitForm.reset();
        this.handleVisitDialogHide();
        this.closeDialog.emit();
    }

    getDocuments() {
        // this._progressBarService.show();
        this._patientVisitStore.getDocumentsForVisitId(this.selectedVisit.id)
            .subscribe(document => {
                this.documents = document;
            },

            (error) => {
                // this._progressBarService.hide();
            },
            () => {
                // this._progressBarService.hide();
            });
    }

    getReadingDoctorsByCompanyId() {
        // this._progressBarService.show();
        this._doctorsStore.getReadingDoctorsByCompanyId()
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

  
    showDialog(currentCaseId: number) {
        this.addConsentDialogVisible = true;
        this.selectedCaseId = currentCaseId;
    }

    documentUploadComplete(documents: Document[]) {
        _.forEach(documents, (currentDocument: Document) => {
            if (currentDocument.status === 'Failed') {
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

    saveVisit() {
        let visitDetailFormValues = this.imeVisitForm.value;
        let updatedVisit: ImeVisit;
        updatedVisit = new ImeVisit(_.extend(this.selectedVisit.toJS(), {
            notes: visitDetailFormValues.notes,
            visitStatusId: this.routeFrom == 2 ? this.selectedVisit.visitStatusId : parseInt(visitDetailFormValues.visitStatusId)
        }));
        this._progressBarService.show();
        let result = this._patientVisitStore.updateImeVisitDetail(updatedVisit);
        result.subscribe(
            (response) => {
                let notification = new Notification({
                    'title': 'Event updated successfully!',
                    'type': 'SUCCESS',
                    'createdAt': moment()
                });
                this._notificationsStore.addNotification(notification);
                this._notificationsService.success('Success!', 'Event updated successfully');
                // this.uploadComplete.emit(documents);
            },
            (error) => {
                let errString = 'Unable to update event!';
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
        this.closePatientVisitDialog();
    }

   
   

    deleteDocuments() {
        if (this.selectedDocumentList.length > 0) {
            this.selectedDocumentList.forEach(currentCase => {
                this._progressBarService.show();
                this.isDeleteProgress = true;
                this._patientVisitStore.deleteDocument(currentCase)
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
            });
            //     }
            // });
        } else {
            let notification = new Notification({
                'title': 'Select record to delete',
                'type': 'ERROR',
                'createdAt': moment()
            });
            this._notificationsStore.addNotification(notification);
            this._notificationsService.error('Oh No!', 'Select record to delete');
        }
    }

    deleteDocument(currentdocument: any) {                      
                this._progressBarService.show();
                this.isDeleteProgress = true;
                this._patientVisitStore.deleteVisitDocument(this.selectedVisit.id, currentdocument.documentId)
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
        //      });        
        // }
}
    