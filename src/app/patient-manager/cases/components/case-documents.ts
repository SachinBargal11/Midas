import { Component, OnInit, Injectable, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PatientVisitsStore } from '../../patient-visit/stores/patient-visit-store';
import { NotificationsStore } from '../../../commons/stores/notifications-store';
import { Notification } from '../../../commons/models/notification';
import * as moment from 'moment';
import * as _ from 'underscore';
import { Message } from 'primeng/primeng'
import { environment } from '../../../../environments/environment';
import { ProgressBarService } from '../../../commons/services/progress-bar-service';
import { NotificationsService } from 'angular2-notifications';
import { ErrorMessageFormatter } from '../../../commons/utils/ErrorMessageFormatter';
import { Observable } from 'rxjs/Rx';
import { FileUpload, FileUploadModule } from 'primeng/primeng';
import { CaseDocument } from '../models/case-document';
import { CasesStore } from '../../cases/stores/case-store';
import { CaseService } from '../../cases/services/cases-services';
import { ScannerService } from '../../../commons/services/scanner-service';
import { CaseDocumentAdapter } from '../services/adapters/case-document-adapters';
import { ConfirmDialogModule, ConfirmationService } from 'primeng/primeng';
import { Document } from '../../../commons/models/document';
import { Case } from '../models/case';

@Component({
    selector: 'case-documents',
    templateUrl: './case-documents.html'
})

@Injectable()
export class CaseDocumentsUploadComponent implements OnInit {

    private _url: string = `${environment.SERVICE_BASE_URL}`;
    selectedDocumentList = [];
    currentCaseId: number;
    documents: CaseDocument[] = [];
    url;
    isSaveProgress = false;
    isDeleteProgress: boolean = false;
    caseId: number;
    caseDetail: Case;
    caseStatusId: number;
    addConsentDialogVisible: boolean = false;
    selectedCaseId: number;

    constructor(
        private _router: Router,
        public _route: ActivatedRoute,
        private _casesStore: CasesStore,
        private _caseService: CaseService,
        private _notificationsStore: NotificationsStore,
        private _progressBarService: ProgressBarService,
        private _notificationsService: NotificationsService,
        private _scannerService: ScannerService,
        private confirmationService: ConfirmationService,

    ) {
        this._route.parent.params.subscribe((routeParams: any) => {
            this.currentCaseId = parseInt(routeParams.caseId, 10);
            // this.url = `${this._url}/fileupload/multiupload/${this.currentCaseId}/case`;
            this.url = `${this._url}/documentmanager/uploadtoblob`;
            // documentmanager/uploadtoblob?inputjson={"ObjectType":"visit","DocumentType":"reval","CompanyId":"16",%20"ObjectId":"60"}
        });
        this._route.parent.params.subscribe((routeParams: any) => {
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
        this.getDocuments();
    }

    showDialog(currentCaseId: number) {
        this.addConsentDialogVisible = true;
        this.selectedCaseId = currentCaseId;
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
        if (error.message == 'Please select document type') {
            this._notificationsService.error('Oh No!', 'Please select document type');
        }
        else {
            this._notificationsService.error('Oh No!', 'Not able to upload document(s).');
        }
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


    downloadPdf(documentId) {
        this._progressBarService.show();
        this._casesStore.downloadDocumentForm(this.caseId, documentId)
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

    deleteDocument() {
        if (this.selectedDocumentList.length > 0) {
            this.confirmationService.confirm({
                message: 'Do you want to delete this record?',
                header: 'Delete Confirmation',
                icon: 'fa fa-trash',
                accept: () => {

                    this.selectedDocumentList.forEach(currentCase => {
                        this._progressBarService.show();
                        this.isDeleteProgress = true;
                        this._casesStore.deleteDocument(currentCase)
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
                }
            });
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
}

export interface TwainSource {
    idx: number;
    name: string;
}



