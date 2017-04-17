import { FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationsStore } from '../../../commons/stores/notifications-store';
import { Notification } from '../../../commons/models/notification';
import * as moment from 'moment';
import { environment } from '../../../../environments/environment';
import { Message } from 'primeng/primeng'
import { ProgressBarService } from '../../../commons/services/progress-bar-service';
import { NotificationsService } from 'angular2-notifications';
import { ErrorMessageFormatter } from '../../../commons/utils/ErrorMessageFormatter';
//import { FileUpload, FileUploadModule } from 'primeng/primeng';
import { ConsentStore } from '../stores/consent-store';
import { SessionStore } from '../../../commons/stores/session-store';
import { ConsentService } from '../services/consent-service';
import { Consent } from '../models/consent';
import { ElementRef, Input, ViewChild } from '@angular/core';
import { Http } from '@angular/http';
import * as _ from 'underscore';
import { ScannerService } from '../../../commons/services/scanner-service';
import { DialogModule } from 'primeng/primeng';
import { ConsentAdapter } from '../services/adapters/consent-adapter';
import { CaseDocument } from '../models/case-document';
import { CasesStore } from '../../cases/stores/case-store';
import { Document } from '../../../commons/models/document';

@Component({
    selector: 'add-consent',
    templateUrl: './add-consent.html',
    providers: [ConsentService]
})

export class AddConsentComponent implements OnInit {
    private _url: string = `${environment.SERVICE_BASE_URL}`;
    display: boolean = false;
    msgs: Message[];
    uploadedFiles: any[] = [];
    uploadedFile = "";
    currentId: number;
    UploadedFileName: string;
    //document: VisitDocument;
    url;
    companies: any[];
    isdoctorsLoading = false;
    isSaveProgress = false;
    states: any[];
    consentDetail: Consent;
    consentForm: FormGroup;
    consentformControls;

    minDate: Date;
    maxDate: Date;
    patientId: number;
    caseId: number;
    doctroId: number;
    selectedcompany = 0;
    isPassChangeInProgress;
    companyId: number;
    fileName: string;
    fileUploaded: string;
    document: Consent[] = [];
    selectedDoctoredit = 0;
    EditId: number = 0;
    documentMode: string = '3';
    _dwObject: any = null;
    //documents: Consent[] = [];
    dialogVisible: boolean = false;
    currentCaseId: number;
    documents: CaseDocument[] = [];
currentCompany :number;
    constructor(
        private fb: FormBuilder,
        private service: ConsentService,
        private _router: Router,
        private _sessionStore: SessionStore,
        public _route: ActivatedRoute,
        private _AddConsentStore: ConsentStore,
        private _notificationsStore: NotificationsStore,
        private _progressBarService: ProgressBarService,
        private _notificationsService: NotificationsService,
        private http: Http,
        private _scannerService: ScannerService,
        private _casesStore: CasesStore,

    ) {
        this._route.parent.parent.params.subscribe((routeParams: any) => {

            this.caseId = parseInt(routeParams.caseId, 10);
            let companyId: number = this._sessionStore.session.currentCompany.id;
            this.companyId = this._sessionStore.session.currentCompany.id;
            this.url = this._url + '/CompanyCaseConsentApproval/multiupload/' + this.caseId + '/' + this.companyId;
            this.consentForm = this.fb.group({
                 company: ['', Validators.required]
                // ,uploadedFiles: ['', Validators.required]
            });

            this.consentformControls = this.consentForm.controls;
        })
    }

    ngOnInit() {

        let today = new Date();
        let currentDate = today.getDate();
        this.maxDate = new Date();
        this.maxDate.setDate(currentDate);
        debugger;
        this._AddConsentStore.getCompany(this.caseId)
            .subscribe(company => this.companies = company);
        this.getDocuments();
        
    }  

    selectcompany(event) {
        this.selectedcompany = 0;
        this.currentCompany = event.target.value;
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
            }
        });
        this.getDocuments();
    }

    documentUploadError(error: Error) {
        this._notificationsService.error('Oh No!', 'Not able to upload document(s).');
    }

    getDocuments() {
        this._progressBarService.show();
        this._casesStore.getDocumentsForCaseId(this.currentCaseId)
            .subscribe(document => {
                this.documents = document;
            },

            (error) => {
                this._progressBarService.hide();
            },
            () => {
                this._progressBarService.hide();
            });
    }

    Save() {
        if (this.uploadedFiles.length == 0) {
            let errString = 'Please upload file.'
            let notification = new Notification({

                'title': 'Please upload file!',
                'type': 'SUCCESS',
                'createdAt': moment()
            });
            this._notificationsStore.addNotification(notification);
            // this._notificationsService.error('Oh No!', ErrorMessageFormatter.getErrorMessages(notification, notification));
            this._notificationsService.error('Oh No!', "Please upload file");
            this._progressBarService.hide();
        }
        else {
            this.isSaveProgress = true;
            let consentFormValues = this.consentForm.value;
            let result;
            let consentDetail = new Consent({

                caseId: this.caseId,
                patientId: this.patientId,
                doctorId: parseInt(consentFormValues.doctor),
                consentReceived: this.UploadedFileName,
                companyId: this.currentCompany
            });

            this._progressBarService.show();
            result = this._AddConsentStore.Save(consentDetail);
            result.subscribe(
                (response) => {
                    let notification = new Notification({
                        'title': 'Consent form added successfully!',
                        'type': 'SUCCESS',
                        'createdAt': moment()
                    });
                    this._notificationsStore.addNotification(notification);
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
                    this._notificationsStore.addNotification(notification);
                    this._notificationsService.error('Oh No!', ErrorMessageFormatter.getErrorMessages(error, errString));
                    this._progressBarService.hide();
                },
                () => {
                    this.isSaveProgress = false;
                    this._progressBarService.hide();
                });
        }
    }


    DownloadTemplate() {
        window.location.assign(this._url + '/CompanyCaseConsentApproval/download/' + this.caseId + '/' + this.companyId);
    }

}
