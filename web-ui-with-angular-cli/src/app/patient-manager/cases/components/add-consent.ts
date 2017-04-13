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
    doctors: any[];
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
    selectedDoctor = 0;
    isPassChangeInProgress;
    companyId: number;
    fileName: string;
    fileUploaded: string;
    document: Consent[] = [];
    selectedDoctoredit = 0;
    EditId: number = 0;
    documentMode: string = '3';
    scannerContainerId: string = `scanner_${moment().valueOf()}`;
    twainSources: TwainSource[] = [];
    selectedTwainSource: TwainSource = null;
    _dwObject: any = null;
    documents: Consent[] = [];
    dialogVisible: boolean = false;
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
        private _scannerService: ScannerService

    ) {

        this._route.parent.parent.params.subscribe((routeParams: any) => {

            this.caseId = parseInt(routeParams.caseId, 10);
            let companyId: number = this._sessionStore.session.currentCompany.id;
            this.companyId = this._sessionStore.session.currentCompany.id;
            this.url = this._url + '/CompanyCaseConsentApproval/multiupload/' + this.caseId + '/' + this.companyId;
            this.consentForm = this.fb.group({
                // doctor: ['', Validators.required]
                // ,uploadedFiles: ['', Validators.required]
            });

            this.consentformControls = this.consentForm.controls;
        })
    }

    ngOnInit() {
        // this.showDialog();
        this.dialogVisible = true;

        let today = new Date();
        let currentDate = today.getDate();
        this.maxDate = new Date();
        this.maxDate.setDate(currentDate);
        // this._AddConsentStore.getdoctors(this.companyId)
        //     .subscribe(doctor => this.doctors = doctor);
        // this.downloadDocument();
    }

    ngOnDestroy() {
        this.unloadWebTwain();
    }

    unloadWebTwain() {
        this._scannerService.deleteWebTwain(this.scannerContainerId);
        this._scannerService.unloadAll();
    }

    ngAfterViewInit() {
        _.defer(() => {
            this.createDWObject();
        });

    }

    createDWObject() {

        this._scannerService.getWebTwain(this.scannerContainerId)
            .then((dwObject) => {
                this._dwObject = dwObject;
                this._dwObject.SetViewMode(1, -1);
                if (this._dwObject) {
                    for (let i = 0; i < this._dwObject.SourceCount; i++) {

                        this.twainSources.push({ idx: i, name: this._dwObject.GetSourceNameItems(i) });
                    }

                }
            }).catch(() => {
                // (<any>window).OnWebTwainNotFoundOnWindowsCallback();
                this._notificationsService.alert('', 'Not able to connect scanner. Please refresh the page again and download the software prompted.');
            });
    }

    AcquireImage() {
        if (this._dwObject) {
            this._dwObject.IfDisableSourceAfterAcquire = true;
            if (this.selectedTwainSource) {
                this._dwObject.SelectSourceByIndex(this.selectedTwainSource.idx);
            } else {
                this._dwObject.SelectSource();
            }
            this._dwObject.OpenSource();
            this._dwObject.AcquireImage();
        }
    }

    uploadDocuments() {

        this.uploadedFiles.length = 1;
        this._AddConsentStore.uploadScannedDocuments(this._dwObject, this.caseId)
            .subscribe(
            (documents: Consent[]) => {
                _.forEach(documents, (currentDocument: any) => {
                    if (currentDocument.status == 'Failed') {
                        let notification = new Notification({
                            'title': currentDocument.message + '  ' + currentDocument.documentName,
                            'type': 'ERROR',
                            'createdAt': moment()
                        });
                        this._notificationsStore.addNotification(notification);
                    }
                });
                // this.getDocuments();
            },
            (error) => {
                debugger;
                this._progressBarService.hide();
            },
            () => {
                this.unloadWebTwain();
                this.createDWObject();
                this._progressBarService.hide();
            });
    }

    // selectDoctor(event) {
    //     this.selectedDoctor = 0;
    //     let currentDoctor = event.target.value;

    // }

    myfile = {
        "name": "Mubashshir",
        "image": ''
    }

    onUpload(event) {
        let responseDocuments: any = JSON.parse(event.xhr.responseText);
        // alert(responseDocuments.errorMessage);

        if (typeof responseDocuments.errorMessage !== "undefined") {

            let notification = new Notification({
                'title': responseDocuments.errorMessage,
                'type': 'ERROR',
                'createdAt': moment()
            });
            this._notificationsStore.addNotification(notification);
            this._notificationsService.error('Oh No!', ErrorMessageFormatter.getErrorMessages('', 'Consent Data Already Exists'));
            this._progressBarService.hide();
            // this._router.navigate(['../'], { relativeTo: this._route });
        }
        else {
            let documents = (<Object[]>responseDocuments).map((document: any) => {
                return ConsentAdapter.parseResponse(document);
            });
            for (let file of event.files) {
                this.uploadedFile = file.name;
                this.uploadedFiles.push(file);
                // this.UploadedFileName.push( this.uploadedFiles.push(file));
                //  this.myfile.image = file.name; 
                this.UploadedFileName = file.name;
                // alert(file.name);   
            }
            this.msgs = [];
            _.forEach(documents, (currentDocument: any) => {
                if (currentDocument.status == 'Failed') {
                    this.uploadedFiles = [];

                    let notification = new Notification({
                        'title': currentDocument.message + '  ' + currentDocument.documentName,
                        'type': 'ERROR',
                        'createdAt': moment()
                    });
                    this._notificationsStore.addNotification(notification);
                }
                else {
                    let notification = new Notification({
                        'title': 'Consent Uploaded Successfully!',
                        'type': 'SUCCESS',
                        'createdAt': moment()
                    });
                    this._notificationsStore.addNotification(notification);
                    this._router.navigate(['../'], { relativeTo: this._route });
                }
            });

        }


        // let notification = new Notification({

        //     'title': 'File Uploaded!',
        //     'type': 'SUCCESS',
        //     'createdAt': moment()
        // });
        // this._notificationsStore.addNotification(notification);
        // this.msgs.push({ severity: 'info', summary: 'File Uploaded', detail: this.UploadedFileName });
        // this.msgs.push({ UploadedFileName});
        // this.downloadDocument();
    }

    downloadDocument() {
        this._progressBarService.show();
        this._AddConsentStore.getDocumentsForCaseId(this.caseId)
            .subscribe(document => {
                this.document = document

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
                companyId: this.companyId
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
export interface TwainSource {
    idx: number;
    name: string;
}