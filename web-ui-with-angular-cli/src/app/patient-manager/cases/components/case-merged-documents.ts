import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, Injectable, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfirmDialogModule, ConfirmationService, Message } from 'primeng/primeng';
import * as moment from 'moment';
import * as _ from 'underscore';
import { NotificationsStore } from '../../../commons/stores/notifications-store';
import { Notification } from '../../../commons/models/notification';
import { environment } from '../../../../environments/environment';
import { ProgressBarService } from '../../../commons/services/progress-bar-service';
import { NotificationsService } from 'angular2-notifications';
import { ErrorMessageFormatter } from '../../../commons/utils/ErrorMessageFormatter';
import { CaseDocument } from '../models/case-document';
import { CasesStore } from '../../cases/stores/case-store';
import { Document } from '../../../commons/models/document';
import { Case } from '../models/case';
import { SessionStore } from '../../../commons/stores/session-store';
import { DocumentManagerService } from '../../../commons/services/document-manager-service';

@Component({
    selector: 'case-merged-documents',
    templateUrl: './case-merged-documents.html'
})

export class CaseMergedDocumentsComponent implements OnInit {

    private _url: string = `${environment.SERVICE_BASE_URL}`;
    selectedDocumentList = [];
    documents: CaseDocument[] = [];
    url;
    isDeleteProgress: boolean = false;
    caseId: number;
    caseStatusId: number;
    constructor(
        private _fb: FormBuilder,
        private _router: Router,
        public _route: ActivatedRoute,
        private _casesStore: CasesStore,
        private _notificationsStore: NotificationsStore,
        private _progressBarService: ProgressBarService,
        private _notificationsService: NotificationsService,
        private confirmationService: ConfirmationService,
        private _sessionStore: SessionStore,
        private _documentManagerService: DocumentManagerService

    ) {
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

    getDocuments() {
        this._progressBarService.show();
        this._casesStore.getDocumentsForCaseId(this.caseId)
            .subscribe(document => {
                let rejectedPacketDocuments = _.reject(document, (currDocument: CaseDocument) => {
                    return currDocument.document.documentName.substr(currDocument.document.documentName.indexOf('.')) == '.zip';
                })
                this.documents = _.filter(rejectedPacketDocuments, (currDocument: CaseDocument) => {
                    return currDocument.document.documentType == '' && currDocument.document.documentName.substr(currDocument.document.documentName.indexOf('.')) == '.pdf';
                })
                // this.documents = document;
                let dateArray = _.map(this.documents, (currDocument: CaseDocument) => {
                    return currDocument.document.createDate.toDate();
                })
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
        let result;
        if (this.selectedDocumentList.length > 0) {
            this.confirmationService.confirm({
                message: 'Do you want to delete this record?',
                header: 'Delete Confirmation',
                icon: 'fa fa-trash',
                accept: () => {
                    this._progressBarService.show();
                    this.isDeleteProgress = true;
                    this.selectedDocumentList.forEach(currentCase => {
                        result = this._casesStore.deleteDocument(currentCase);
                    });
                    result.subscribe((response) => {
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
            });
        } else {
            this._notificationsService.error('Oh No!', 'Select record to delete');
        }
    }
}

export interface TwainSource {
    idx: number;
    name: string;
}



