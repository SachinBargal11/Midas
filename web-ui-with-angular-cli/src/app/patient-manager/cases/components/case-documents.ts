import { AppValidators } from '../../../commons/utils/AppValidators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
import { SessionStore } from '../../../commons/stores/session-store';
import { DocumentManagerService } from '../../../commons/services/document-manager-service';
import { PatientsStore } from '../../patients/stores/patients-store';
import { PendingReferral } from '../../referals/models/pending-referral';

@Component({
    selector: 'case-documents',
    templateUrl: './case-documents.html'
})

@Injectable()
export class CaseDocumentsUploadComponent implements OnInit {

    private _url: string = `${environment.SERVICE_BASE_URL}`;
    selectedDocumentList = [];
    orderedDocumentList: {
        id: number,
        caseId: number,
        documentId: number,
        documentName: string,
        documentType: string,
        createDate: moment.Moment
    }[] = [];
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

    mergeDocumentsDialogVisible = false;
    mergeDocDialogHeader = 'Merge Document';
    documentMergeForm: FormGroup;
    documentMergeFormControls;

    packetDocumentsDialogVisible = false;
    packetDocumetDialogHeader = 'Packet Documents';
    packetDocumentForm: FormGroup;
    packetDocumentFormControls;
    patientId: number;
    caseDetails: Case[];  
    referredToMe: boolean = false;   

    yearFilter: any;
    maxDate;
    minDate;
    constructor(
        private _fb: FormBuilder,
        private _router: Router,
        public _route: ActivatedRoute,
        private _casesStore: CasesStore,
        private _caseService: CaseService,
        private _notificationsStore: NotificationsStore,
        private _progressBarService: ProgressBarService,
        private _notificationsService: NotificationsService,
        private _scannerService: ScannerService,
        private confirmationService: ConfirmationService,
        private _sessionStore: SessionStore,
        private _documentManagerService: DocumentManagerService,
        private _patientsStore: PatientsStore

    ) {
        this._route.parent.parent.parent.parent.params.subscribe((routeParams: any) => {            
            this.patientId = parseInt(routeParams.patientId, 10);
            this.MatchReferal();            
        });
        this._route.parent.parent.parent.params.subscribe((routeParams: any) => {
            this.currentCaseId = parseInt(routeParams.caseId, 10);
            // this.url = `${this._url}/fileupload/multiupload/${this.currentCaseId}/case`;
            this.url = `${this._url}/documentmanager/uploadtoblob`;
            // documentmanager/uploadtoblob?inputjson={"ObjectType":"visit","DocumentType":"reval","CompanyId":"16",%20"ObjectId":"60"}
        });
        // this._route.parent.parent.parent.params.subscribe((routeParams: any) => {
            // this.caseId = parseInt(routeParams.caseId, 10);
            let result = this._casesStore.fetchCaseById(this.currentCaseId);
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
        // });

        this.documentMergeForm = this._fb.group({
            documentName: ['', [Validators.required, AppValidators.removeDotValidator]]
        });
        this.documentMergeFormControls = this.documentMergeForm.controls;

        this.packetDocumentForm = this._fb.group({
            documentName: ['', [Validators.required, AppValidators.removeDotValidator]]
        });
        this.packetDocumentFormControls = this.packetDocumentForm.controls;
    }

    ngOnInit() {
        this.getDocuments();
    }

    showDialog(currentCaseId: number) {
        this.addConsentDialogVisible = true;
        this.selectedCaseId = currentCaseId;
    }
    showMergeDocumentDialog() {
        let mappedOrderedDocumentList: {
            id: number,
            caseId: number,
            documentId: number,
            documentName: string,
            documentType: string,
            createDate: moment.Moment
        }[] = [];
        _.forEach(this.selectedDocumentList, (currDocument: CaseDocument) => {
            mappedOrderedDocumentList.push({
                id: currDocument.document.id,
                caseId: currDocument.caseId,
                documentId: currDocument.document.documentId,
                documentName: currDocument.document.documentName,
                documentType: currDocument.document.documentType,
                createDate: currDocument.document.createDate
            })
        })
        this.orderedDocumentList = mappedOrderedDocumentList;
        this.mergeDocumentsDialogVisible = true;
    }
    showPacketDocumentDialog() {
        this.packetDocumentsDialogVisible = true;
    }
    
    closeMergeDocumentDialog() {
        this.mergeDocumentsDialogVisible = false;
        this.documentMergeForm.reset();
    }
    closePacketDocumentDialog() {
        this.packetDocumentsDialogVisible = false;
        this.packetDocumentForm.reset();
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
                let dateArray = _.map(this.documents, (currDocument: CaseDocument) => {
                    return currDocument.document.createDate.toDate();
                })
                this.maxDate = new Date(Math.max.apply(null, dateArray));
                this.minDate = new Date(Math.min.apply(null, dateArray));
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
        this._casesStore.downloadDocumentForm(this.currentCaseId, documentId)
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
                    result.subscribe(
                        (response) => {
                            let notification = new Notification({
                                'title': 'Record deleted successfully!',
                                'type': 'SUCCESS',
                                'createdAt': moment()

                            });
                            this.getDocuments();
                            this._notificationsStore.addNotification(notification);
                            this._notificationsService.success('Success!', 'Record deleted successfully!');
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

    deletedocument(currentdocument : any) {
        let result;        
            this.confirmationService.confirm({
                message: 'Do you want to delete this record?',
                header: 'Delete Confirmation',
                icon: 'fa fa-trash',
                accept: () => {
                    this._progressBarService.show();
                    this.isDeleteProgress = true;                    
                    result = this._casesStore.deleteCaseDocumentbyCaseDocumentId(this.currentCaseId, currentdocument.documentId);                    
                    result.subscribe(
                        (response) => {
                            let notification = new Notification({
                                'title': 'Record deleted successfully!',
                                'type': 'SUCCESS',
                                'createdAt': moment()

                            });
                            this.getDocuments();
                            this._notificationsStore.addNotification(notification);
                            this._notificationsService.success('Success!', 'Record deleted successfully!');
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
    }

    onReorderList(event) {
        // this.orderedDocumentList = event.value;
    }

    mergeDocuments() {
        if(this.documentMergeForm.value.documentName.trim() != "" && this.documentMergeForm.value.documentName.trim() != undefined)
        {
        let documentIds: number[] = _.map(this.orderedDocumentList, (currDocument: any) => {
            return currDocument.documentId;
        })
        let mergedDocumentName = this.documentMergeForm.value.documentName + '.pdf';
        let companyId = this._sessionStore.session.currentCompany.id;
        this.isSaveProgress = true;
        this._documentManagerService.mergePdfDocuments(documentIds, this.currentCaseId, mergedDocumentName, companyId)
            .subscribe((response) => {
                let notification = new Notification({
                    'title': 'Documents merged successfully!',
                    'type': 'SUCCESS',
                    'createdAt': moment()

                });
                this._notificationsStore.addNotification(notification);
                this._notificationsService.success('Success', 'Documents merged successfully!');
                this.isSaveProgress = false;
                this.getDocuments();
                this.mergeDocumentsDialogVisible = false;
                this.documentMergeForm.reset();
                this.orderedDocumentList = [];
                this.selectedDocumentList = [];
            },
            (error) => {
                let errString = 'Unable to merge documents';
                if(error._body)
                {
                    errString = error._body
                }
                let notification = new Notification({
                    'messages': ErrorMessageFormatter.getErrorMessages(error, errString),
                    'type': 'ERROR',
                    'createdAt': moment()
                });
                this._notificationsStore.addNotification(notification);
                this._notificationsService.error('Oh No!', ErrorMessageFormatter.getErrorMessages(error, errString));
                this.isSaveProgress = false;
                this.mergeDocumentsDialogVisible = false;
                this.documentMergeForm.reset();
                this.orderedDocumentList = [];
                this.selectedDocumentList = [];
            },
            () => {
                this.isSaveProgress = false;
            });
        }
        else {
            this.isSaveProgress = false;
            let notification = new Notification({
                'title': 'Enter document name to save',
                'type': 'ERROR',
                'createdAt': moment()
            });
            this._notificationsStore.addNotification(notification);
            this._notificationsService.error('Oh No!', 'Enter document name to save');
        }
    }

    packetDocuments() {
        if(this.packetDocumentForm.value.documentName.trim() != "" && this.packetDocumentForm.value.documentName.trim() != undefined)
        {
        let documentIds: number[] = _.map(this.selectedDocumentList, (currDocument: CaseDocument) => {
            return currDocument.document.documentId;
        })
        let packetDocumentName = this.packetDocumentForm.value.documentName + '.zip';
        let companyId = this._sessionStore.session.currentCompany.id;
        this.isSaveProgress = true;
        this._documentManagerService.packetDocuments(documentIds, this.currentCaseId, packetDocumentName, companyId)
            .subscribe((response) => {
                let notification = new Notification({
                    'title': 'Documents packeted successfully!',
                    'type': 'SUCCESS',
                    'createdAt': moment()

                });
                this._notificationsStore.addNotification(notification);
                this._notificationsService.success('Success', 'Documents packeted successfully!');
                this.isSaveProgress = false;
                this.getDocuments();
                this.packetDocumentsDialogVisible = false;
                this.packetDocumentForm.reset();
                this.selectedDocumentList = [];
            },
            (error) => {
                let errString = 'Unable to packet documents';
                let notification = new Notification({
                    'messages': ErrorMessageFormatter.getErrorMessages(error, errString),
                    'type': 'ERROR',
                    'createdAt': moment()
                });
                this._notificationsStore.addNotification(notification);
                this._notificationsService.error('Oh No!', ErrorMessageFormatter.getErrorMessages(error, errString));
                this.isSaveProgress = false;
                this.packetDocumentsDialogVisible = false;
                this.packetDocumentForm.reset();
                this.selectedDocumentList = [];
            },
            () => {
                this.isSaveProgress = false;
            });
        }
        else {
            this.isSaveProgress = false;
            let notification = new Notification({
                'title': 'Enter document name to save',
                'type': 'ERROR',
                'createdAt': moment()
            });
            this._notificationsStore.addNotification(notification);
            this._notificationsService.error('Oh No!', 'Enter document name to save');
        }
    }

    MatchReferal() {    
        //this._casesStore.MatchReferal(this.patientId);
        this._progressBarService.show();
        let caseResult = this._casesStore.getOpenCaseForPatient(this.patientId);
        let result = this._patientsStore.getPatientById(this.patientId);
        Observable.forkJoin([caseResult, result])
            .subscribe(
            (results) => {
                this.caseDetails = results[0];
                if (this.caseDetails.length > 0) {
                    let matchedCompany = null;
                    matchedCompany = _.find(this.caseDetails[0].referral, (currentReferral: PendingReferral) => {
                        return currentReferral.toCompanyId == this._sessionStore.session.currentCompany.id
                    })
                    if (matchedCompany) {
                        this.referredToMe = true;
                    } else {
                        this.referredToMe = false;
                    }
                } else {
                    this.referredToMe = false;
                }                
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

export interface TwainSource {
    idx: number;
    name: string;
}



