import { Component, OnInit,Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PatientVisitsStore } from '../../patient-visit/stores/patient-visit-store';
// import { PatientVisit } from '../../patient-visit/models/patient-visit';
import { NotificationsStore } from '../../../commons/stores/notifications-store';
import { Notification } from '../../../commons/models/notification';
import * as moment from 'moment';
import * as _ from 'underscore';
import { environment } from '../../../../environments/environment';
import { FileUpload, FileUploadModule } from 'primeng/primeng';
import { VisitDocument } from '../../patient-visit/models/visit-document';
import { ProgressBarService } from '../../../commons/services/progress-bar-service';
import { NotificationsService } from 'angular2-notifications';
import { ErrorMessageFormatter } from '../../../commons/utils/ErrorMessageFormatter';
import { Document } from '../../../commons/models/document';
import { ConfirmDialogModule, ConfirmationService } from 'primeng/primeng';
import { CasesStore } from '../../cases/stores/case-store';
import { CaseService } from '../../cases/services/cases-services';

@Component({
    selector: 'visit-documents',
    templateUrl: './visit-document.html'
})

export class VisitDocumentsUploadComponent implements OnInit {
    private _url: string = `${environment.SERVICE_BASE_URL}`;
    currentVisitId: number;
    documents: VisitDocument[] = [];
    url;
    selectedDocumentList = [];
    isDeleteProgress: boolean = false;


    constructor(
        private _router: Router,
        public _route: ActivatedRoute,
        private _patientVisitStore: PatientVisitsStore,
        private _notificationsStore: NotificationsStore,
        private _progressBarService: ProgressBarService,
        private _notificationsService: NotificationsService,
        private _casesStore: CasesStore,
        private _caseService: CaseService,
        private confirmationService: ConfirmationService,

    ) {
        this._route.parent.params.subscribe((routeParams: any) => {
            this.currentVisitId = parseInt(routeParams.visitId, 10);
            this.url = `${this._url}/fileupload/multiupload/${this.currentVisitId}/visit`;
            //this.url = this._url + '/fileupload/multiupload/'+ this.currentVisitId +'/visit';
            // this._progressBarService.show();
            // this._patientVisitStore.getDocumentsForVisitId(this.currentVisitId)
            //     .subscribe(document => {
            //         this.document = document

            //     },
            //     (error) => {
            //         this._progressBarService.hide();
            //     },
            //     () => {
            //         this._progressBarService.hide();
            //     });
        });
    }

    ngOnInit() {
    this.getDocuments()
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
            }
        });
        this.getDocuments();
    }

     documentUploadError(error: Error) {
        this._notificationsService.error('Oh No!', 'Not able to upload document(s).');
    }

     getDocuments() {
        this._progressBarService.show();
        this._patientVisitStore.getDocumentsForVisitId(this.currentVisitId)
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
                        this._patientVisitStore.deleteDocument(currentCase)
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
                }
            });
        } else {
            let notification = new Notification({
                'title': 'select record to delete',
                'type': 'ERROR',
                'createdAt': moment()
            });
            this._notificationsStore.addNotification(notification);
            this._notificationsService.error('Oh No!', 'select record to delete');
        }
    }
}
  
