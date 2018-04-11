import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LazyLoadEvent, SelectItem } from 'primeng/primeng';
import { NotificationsStore } from '../../../commons/stores/notifications-store';
import { SessionStore } from '../../../commons/stores/session-store';
import { Notification } from '../../../commons/models/notification';
import * as moment from 'moment';
import * as _ from 'underscore';
import { ProgressBarService } from '../../../commons/services/progress-bar-service';
import { NotificationsService } from 'angular2-notifications';
import { ErrorMessageFormatter } from '../../../commons/utils/ErrorMessageFormatter';
import { environment } from '../../../../environments/environment';
import { DocumentTypeStore } from '../../stores/document-type-store';
import { DocumentType } from '../../models/document-type';
import { Document } from '../../models/enum/document';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ConfirmDialogModule, ConfirmationService } from 'primeng/primeng';


@Component({
    selector: 'document-type',
    templateUrl: './document-type.html'
})

export class DocumentTypeComponent implements OnInit {

    documentType: DocumentType[];
    currentId: number = 0;
    companyId: number = this._sessionStore.session.currentCompany.id;
    selectedDocuments: DocumentType;
    isSaveProgress = false;
    documentform: FormGroup;
    documentformControls;
    isDeleteProgress: boolean = false;
    length: number;
    documentList: string;

    constructor(
        private _router: Router,
        public _route: ActivatedRoute,
        private _documentTypeStore: DocumentTypeStore,
        private _progressBarService: ProgressBarService,
        private _notificationsStore: NotificationsStore,
        private _notificationsService: NotificationsService,
        private _sessionStore: SessionStore,
        private fb: FormBuilder,
        private confirmationService: ConfirmationService,
    ) {
        // this._sessionStore.userCompanyChangeEvent.subscribe(() => {
        //     this.loadDocumentForObjectType(this.companyId, this.currentId);
        // });

        this.documentform = this.fb.group({
            documentType: ['', Validators.required],
            currentId: ['', Validators.required]
        });
        this.documentformControls = this.documentformControls;
    }

    ngOnInit() {
        // this.loadDocumentForObjectType(this.companyId, this.currentId);
    }


    selectDocument(event) {
        let currentId = parseInt(event.target.value);
        this.currentId = currentId;
        this.loadDocumentForObjectType(this.companyId, this.currentId)
    }


    loadDocumentForObjectType(companyId: number, currentId: number) {
        this._progressBarService.show();
        let result = this._documentTypeStore.getDocumentObjectType(companyId, currentId)
            .subscribe(documentType => {
                // this.procedures = procedures;
                // let currentCaseId: number[] = _.map(this.selectedCase, (currentCase: DocumentType) => {
                //     return currentCase.id;
                this.documentType = documentType

            },
            (error) => {
                this._progressBarService.hide();
            },
            () => {
                this._progressBarService.hide();
            });
    }

    save() {
        this.isSaveProgress = true;
        let documentformValues = this.documentform.value;
        let result;
        let documentType = new DocumentType({
            documentType: documentformValues.documentType,
            objectType: this.currentId,
            companyId: this.companyId
        })

        this._progressBarService.show();
        result = this._documentTypeStore.addDocument(documentType);
        result.subscribe(
            (response) => {
                let notification = new Notification({
                    'title': 'Document type added successfully!',
                    'type': 'SUCCESS',
                    'createdAt': moment()
                });
                this._notificationsStore.addNotification(notification);
                // this._router.navigate(['../'], { relativeTo: this._route });
                this._notificationsService.success('Success!', 'Document type added successfully');
                this.loadDocumentForObjectType(this.companyId, this.currentId)
                this.documentList = '';
            },
            (error) => {
                let errString = 'Unable to add document type.';
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


    deleteDocument() {
        if (this.selectedDocuments != null) {
            this.confirmationService.confirm({
                message: 'Do you want to delete this record?',
                header: 'Delete Confirmation',
                icon: 'fa fa-trash',
                accept: () => {
                    // this.selectedDocuments.forEach(currentDocumentType => {
                    this.isDeleteProgress = true;
                    this._progressBarService.show();
                    // let result;
                    this._documentTypeStore.deleteDocument(this.selectedDocuments)
                        .subscribe(
                        (response) => {
                            let notification = new Notification({
                                'title': 'Document Type deleted successfully!',
                                'type': 'SUCCESS',
                                'createdAt': moment()
                            });
                            this.loadDocumentForObjectType(this.companyId, this.currentId);
                            this._notificationsStore.addNotification(notification);
                            this.selectedDocuments;
                        },
                        (error) => {
                            let errString = 'Unable to delete Document Type';
                            let notification = new Notification({
                                'messages': ErrorMessageFormatter.getErrorMessages(error, errString),
                                'type': 'ERROR',
                                'createdAt': moment()
                            });
                            this.selectedDocuments;
                            this._progressBarService.hide();
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
            let notification = new Notification({
                'title': 'select document type to delete',
                'type': 'ERROR',
                'createdAt': moment()
            });
            this._notificationsStore.addNotification(notification);
            this._notificationsService.error('Oh No!', 'select document type  to delete');
        }

    }

}

