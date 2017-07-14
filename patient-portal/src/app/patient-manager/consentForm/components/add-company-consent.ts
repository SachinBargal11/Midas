import { FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationsStore } from '../../../commons/stores/notifications-store';
import { Notification } from '../../../commons/models/notification';
import * as moment from 'moment';
import { environment } from '../../../../environments/environment';
import { ProgressBarService } from '../../../commons/services/progress-bar-service';
import { NotificationsService } from 'angular2-notifications';
import { ErrorMessageFormatter } from '../../../commons/utils/ErrorMessageFormatter';
import { ConsentStore } from '../../cases/stores/consent-store';
import { SessionStore } from '../../../commons/stores/session-store';
import { ElementRef, Input, ViewChild } from '@angular/core';
import { Http } from '@angular/http';
import * as _ from 'underscore';
import { ScannerService } from '../../../commons/services/scanner-service';
import { Document } from '../../../commons/models/document';

import { Patient } from '../../patients/models/patient';
import { PatientsStore } from '../../patients/stores/patients-store';
import { CaseDocument } from '../../cases/models/case-document';
import { CasesStore } from '../../cases/stores/case-store';
import { Consent } from '../../cases/models/consent';

@Component({
    selector: 'add-company-consent',
    templateUrl: './add-company-consent.html'
})

export class AddCompanyConsentComponent implements OnInit {
    private _url: string = `${environment.SERVICE_BASE_URL}`;
    uploadedFiles: any[] = [];
    uploadedFile = "";
    currentId: number;
    UploadedFileName: string;
    companies: any[];
    url;
    doctors: any[];
    isdoctorsLoading = false;
    isSaveProgress = false;
    states: any[];

    consentForm: FormGroup;
    consentformControls;

    minDate: Date;
    maxDate: Date;
    patientId: number;
    caseId: number;
    doctroId: number;
    selectedDoctor = 0;
    isPassChangeInProgress;
    companyId: number;
    fileName: string;
    fileUploaded: string;
    document: Consent[] = [];
    documentMode: string = 'one';
    selectedcompany = 0;
    documents: CaseDocument[] = [];
    consentDetail: Consent;
    patient: Patient;

    constructor(
        private fb: FormBuilder,
        private _router: Router,
        public sessionStore: SessionStore,
        public _route: ActivatedRoute,
        private _consentStore: ConsentStore,
        public notificationsStore: NotificationsStore,
        public progressBarService: ProgressBarService,
        private _notificationsService: NotificationsService,
        private _patientsStore: PatientsStore,
        private http: Http,
        private _scannerService: ScannerService,
        private _notificationsStore: NotificationsStore,
        private _casesStore: CasesStore,

    ) {

        this._route.parent.params.subscribe((routeParams: any) => {
            this.caseId = parseInt(routeParams.caseId, 10);
            this.companyId = parseInt(routeParams.companyId, 10);
            this.patientId = this.sessionStore.session.user.id;
            // this.progressBarService.show();
            // this._patientsStore.fetchPatientById(this.patientId)
            //     .subscribe((patient: Patient) => {
            //         this.patient = patient;
            //         this.companyId = patient.companyId;
                    this.url = `${this._url}/documentmanager/uploadtoblob`

                // },
                // (error) => {
                //     this.progressBarService.hide();
                // },
                // () => {

                //     this.progressBarService.hide();
                // });
        });
        this.consentForm = this.fb.group({
            company: ['', Validators.required]
            // ,uploadedFiles: ['', Validators.required]
        });

        this.consentformControls = this.consentForm.controls;

    }

    ngOnInit() {
        let today = new Date();
        let currentDate = today.getDate();
        this.maxDate = new Date();
        this.maxDate.setDate(currentDate);
        // this._consentStore.getCompany(this.caseId)
        //     .subscribe(company => this.companies = company);
        // this.getDocuments();
    }

    selectcompany(event) {
        this.selectedcompany = 0;
        let currentCompany = event.target.value;
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
                this._notificationsService.error('Oh No!', 'Company, Case and Consent data already exists');
            } else if (currentDocument.status == 'Success') {
                let notification = new Notification({
                    'title': 'Document uploaded successfully',
                    'type': 'SUCCESS',
                    'createdAt': moment()
                });
                this._notificationsStore.addNotification(notification);
                this._notificationsService.success('Success!', 'Document uploaded successfully');
            }
        });
        this.getDocuments();
    }

    documentUploadError(error: Error) {
        this._notificationsService.error('Oh No!', 'Not able to upload document(s).');
    }

    getDocuments() {
        this.progressBarService.show();
        this._casesStore.getDocumentsForCaseId(this.caseId)
            .subscribe(document => {
                this.documents = document;
            },

            (error) => {
                this.progressBarService.hide();
            },
            () => {
                this.progressBarService.hide();
            });
    }
    DownloadTemplate() {
        window.location.assign(this._url + '/CompanyCaseConsentApproval/download/' + this.caseId + '/' + this.companyId);
    }

    Save() {
        if (this.uploadedFiles.length == 0) {
            let errString = 'Please upload file.'
            let notification = new Notification({

                'title': 'Please upload file!',
                'type': 'SUCCESS',
                'createdAt': moment()
            });
            this.notificationsStore.addNotification(notification);
            // this._notificationsService.error('Oh No!', ErrorMessageFormatter.getErrorMessages(notification, notification));
            this._notificationsService.error('Oh No!', "Please upload file");
            this.progressBarService.hide();
        }
        else {
            this.isSaveProgress = true;
            let consentFormValues = this.consentForm.value;
            let result;
            let consentDetail = new Consent({

                companyId: this.companyId,
                caseId: this.caseId,
                patientId: this.patientId,
                doctorId: parseInt(consentFormValues.doctor),
                consentReceived: this.UploadedFileName
            });

            this.progressBarService.show();
            result = this._consentStore.Save(consentDetail);
            result.subscribe(
                (response) => {
                    let notification = new Notification({
                        'title': 'Consent form added successfully!',
                        'type': 'SUCCESS',
                        'createdAt': moment()
                    });
                    this.notificationsStore.addNotification(notification);
                    this._router.navigate(['../'], { relativeTo: this._route });
                },
                (error) => {
                    let errString = 'Unable to add Consent form.';
                    let notification = new Notification({
                        'messages': ErrorMessageFormatter.getErrorMessages(error, errString),
                        'type': 'ERROR',
                        'createdAt': moment()
                    });
                    this.isSaveProgress = false;
                    this.notificationsStore.addNotification(notification);
                    this._notificationsService.error('Oh No!', ErrorMessageFormatter.getErrorMessages(error, errString));
                    this.progressBarService.hide();
                },
                () => {
                    this.isSaveProgress = false;
                    this.progressBarService.hide();
                });
        }
    }


}
