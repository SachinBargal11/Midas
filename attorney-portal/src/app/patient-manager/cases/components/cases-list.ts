import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LazyLoadEvent } from 'primeng/primeng'
import { SessionStore } from '../../../commons/stores/session-store';
import { ProgressBarService } from '../../../commons/services/progress-bar-service';
import { CasesStore } from '../stores/case-store';
import { Case } from '../models/case';
import { Patient } from '../../patients/models/patient';
import { PatientsStore } from '../../patients/stores/patients-store';
import { NotificationsService } from 'angular2-notifications';
import * as moment from 'moment';
import { Notification } from '../../../commons/models/notification';
import { NotificationsStore } from '../../../commons/stores/notifications-store';
import { ErrorMessageFormatter } from '../../../commons/utils/ErrorMessageFormatter';
import { ConfirmDialogModule, ConfirmationService } from 'primeng/primeng';
import { Consent } from '../models/consent';
import { Company } from '../../../account/models/company';
import * as _ from 'underscore';
import { Referral } from '../models/referral';
import { environment } from '../../../../environments/environment';
import { CaseDocument } from '../../cases/models/case-document';
import { ConsentStore } from '../../cases/stores/consent-store';
import { Document } from '../../../commons/models/document';
@Component({
    selector: 'caseslist',
    templateUrl: './cases-list.html'
})


export class CasesListComponent implements OnInit {
    private _url: string = `${environment.SERVICE_BASE_URL}`;
    cases: Case[];
    patientId: number;
    patientName: string;
    patient: Patient;
    selectedCases: Case[] = [];
    datasource: Case[];
    totalRecords: number;
    isDeleteProgress: boolean = false;
    consentRecived: string = '';
    referralRecived: string = '';
    url;
    caseId: number;
    companyId: number;
    selectedCaseId: number;
    signedDocumentUploadUrl: string;
    signedDocumentPostRequestData: any;
    isElectronicSignatureOn: boolean = false;
    addConsentDialogVisible: boolean = false;
    caseViewedByOriginator: boolean = false;

    constructor(
        public _route: ActivatedRoute,
        private _router: Router,
        public sessionStore: SessionStore,
        private _casesStore: CasesStore,
        private _patientStore: PatientsStore,
        private _progressBarService: ProgressBarService,
        private _notificationsService: NotificationsService,
        private _notificationsStore: NotificationsStore,
        private confirmationService: ConfirmationService,
        private _consentStore: ConsentStore
    ) {

        this.companyId = this.sessionStore.session.currentCompany.id;
        // this.url = this._url + '/CompanyCaseConsentApproval/multiupload/' + this.caseId + '/' + this.companyId;
        this.url = `${this._url}/documentmanager/uploadtoblob`;
        this._route.parent.params.subscribe((routeParams: any) => {
            this.patientId = parseInt(routeParams.patientId, 10);
            this._progressBarService.show();
            this.MatchCase();
            this._patientStore.fetchPatientById(this.patientId)
                .subscribe(
                (patient: Patient) => {
                    this.patient = patient;
                    this.patientName = patient.user.firstName + ' ' + patient.user.lastName;
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
        this.loadCases();
    }

    loadCases() {
        this._progressBarService.show();
        this._casesStore.getCases(this.patientId)
            .subscribe(cases => {
                this.cases = cases;
                // this.datasource = cases.reverse();
                // this.totalRecords = this.datasource.length;
                // this.cases = this.datasource.slice(0, 10);
            },
            (error) => {
                this._progressBarService.hide();
            },
            () => {
                this._progressBarService.hide();
            });
    }
    isCurrentUser(userId): boolean {
        let isCurrentUser: boolean = false;
        _.forEach(this.cases, (currentCase: Case) => {
            if (currentCase.createByUserID === userId) {
                isCurrentUser = true;
            }
        });
        return isCurrentUser;
    }
    // downloadConsent(caseDocuments: CaseDocument[]) {
    //     caseDocuments.forEach(caseDocument => {
    //         window.location.assign(this._url + '/fileupload/download/' + caseDocument.document.originalResponse.caseId + '/' + caseDocument.document.originalResponse.midasDocumentId);
    //     });
    // }

    downloadConsent(caseDocuments: CaseDocument[]) {
        caseDocuments.forEach(caseDocument => {
            // window.location.assign(this._url + '/fileupload/download/' + caseDocument.document.originalResponse.caseId + '/' + caseDocument.document.originalResponse.midasDocumentId);
            this._progressBarService.show();
            if (caseDocument.document.originalResponse.companyId === this.sessionStore.session.currentCompany.id) {
                this._consentStore.downloadConsentForm(caseDocument.document.originalResponse.caseId, caseDocument.document.originalResponse.midasDocumentId)
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
            }
            this._progressBarService.hide();
        });
    }

    consentAvailable(case1: Case) {
        // let matchingCases: Case[] = _.map(this.cases, (currentCase: Case) => {
        //     return currentCase.companyCaseConsentApproval.length > 0 ? currentCase : null;
        // });
        if (case1.companyCaseConsentApproval.length > 0) {
            let consentAvailable = _.find(case1.companyCaseConsentApproval, (currentConsent: Consent) => {
                return currentConsent.companyId === this.sessionStore.session.currentCompany.id;
                // if (currentConsent.companyId === this.sessionStore.session.currentCompany.id) {
                //     return this.consentRecived = 'Yes';
                // } else if (currentConsent.companyId !== this.sessionStore.session.currentCompany.id){
                //     return this.consentRecived = 'No';
                // }
            });
            if (consentAvailable) {
                return this.consentRecived = 'Yes';
            } else {
                return this.consentRecived = 'No';
            }
        } else {
            return this.consentRecived = 'No';
        }
    }

    referralAvailable(case1: any) {
        let referralOutBound;
        let referralInBound;
        let referralInBoundOutBound;
        if (case1.referral.length > 0) {

            referralInBound = _.find(case1.referral, (currentReferral: Referral) => {
                return currentReferral.referredToCompanyId === this.sessionStore.session.currentCompany.id;
            });
            referralOutBound = _.find(case1.referral, (currentReferral: Referral) => {
                return currentReferral.referringCompanyId === this.sessionStore.session.currentCompany.id;
            });
            if (referralInBound && referralOutBound) {
                return this.referralRecived = 'InBound/OutBound';
            }
            else if (referralInBound) {
                return this.referralRecived = 'InBound';
            }
            else if (referralOutBound) {
                return this.referralRecived = 'OutBound';
            }
            else {
                return this.referralRecived = '';
            }
        } else {
            return this.referralRecived = '';
        }
    }

    loadCasesLazy(event: LazyLoadEvent) {
        setTimeout(() => {
            if (this.datasource) {
                this.cases = this.datasource.slice(event.first, (event.first + event.rows));
            }
        }, 250);
    }

    deleteCases() {
        if (this.selectedCases.length > 0) {
            this.confirmationService.confirm({
                message: 'Do you want to delete this record?',
                header: 'Delete Confirmation',
                icon: 'fa fa-trash',
                accept: () => {
                    this.selectedCases.forEach(currentCase => {
                        this.isDeleteProgress = true;
                        this._progressBarService.show();
                        this._casesStore.deleteCase(currentCase)
                            .subscribe(
                            (response) => {
                                let notification = new Notification({
                                    'title': 'Case deleted successfully!',
                                    'type': 'SUCCESS',
                                    'createdAt': moment()

                                });
                                this.loadCases();
                                this._notificationsStore.addNotification(notification);
                                this.selectedCases = [];
                            },
                            (error) => {
                                let errString = 'Unable to delete case';
                                let notification = new Notification({
                                    'messages': ErrorMessageFormatter.getErrorMessages(error, errString),
                                    'type': 'ERROR',
                                    'createdAt': moment()
                                });
                                this.selectedCases = [];
                                this._progressBarService.hide();
                                this.isDeleteProgress = false;
                                this._notificationsStore.addNotification(notification);
                                this._notificationsService.error('Oh No!', ErrorMessageFormatter.getErrorMessages(error, errString));
                            },
                            () => {
                                this.isDeleteProgress = false;
                                this._progressBarService.hide();
                            });
                    });
                }
            });
        } else {
            let notification = new Notification({
                'title': 'Select case to delete',
                'type': 'ERROR',
                'createdAt': moment()
            });
            this._notificationsStore.addNotification(notification);
            this._notificationsService.error('Oh No!', 'Select case to delete');
        }
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
            }
            else {
                let notification = new Notification({
                    'title': 'Consent uploaded successfully!',
                    'type': 'SUCCESS',
                    'createdAt': moment()
                });
                this._notificationsStore.addNotification(notification);
                this._notificationsService.success('Success!', 'Consent uploaded successfully');
                this.addConsentDialogVisible = false;
                this.loadCases();
            }

        });
    }

    documentUploadError(error: Error) {
        this._notificationsService.error('Oh No!', 'Not able to upload document(s).');
    }

    signedDocumentUploadComplete(document: Document) {
        if (document.status == 'Failed') {
            let notification = new Notification({
                'title': document.message + '  ' + document.documentName,
                'type': 'ERROR',
                'createdAt': moment()
            });
            this._notificationsStore.addNotification(notification);
            this._notificationsService.error('Oh No!', 'Company, Case and consent data already exists.');
        }
        else {
            let notification = new Notification({
                'title': 'Consent uploaded successfully!',
                'type': 'SUCCESS',
                'createdAt': moment()
            });
            this._notificationsStore.addNotification(notification);
            this.addConsentDialogVisible = false;
            this.loadCases();
        }
    }

    signedDocumentUploadError(error: Error) {
        let errString = 'Not able to signed document.';
        let notification = new Notification({
            'messages': ErrorMessageFormatter.getErrorMessages(error, errString),
            'type': 'ERROR',
            'createdAt': moment()
        });
        this._notificationsStore.addNotification(notification);
        this._notificationsService.error('Oh No!', ErrorMessageFormatter.getErrorMessages(error, errString));
    }

    downloadTemplate(caseId) {
        this._progressBarService.show();
        this._consentStore.downloadTemplate(this.selectedCaseId, this.companyId)
            .subscribe(
            (response) => {
                // this.document = document
                //  window.location.assign(this._url + '/fileupload/download/' + this.caseId + '/' + documentId);
            },
            (error) => {
                let errString = 'Unable to download';
                let notification = new Notification({
                    'messages': 'Unable to download',
                    'type': 'ERROR',
                    'createdAt': moment()
                });
                //this._notificationsStore.addNotification(notification);
                this._progressBarService.hide();
                this._notificationsService.error('Oh No!', 'Unable to download');

            },
            () => {
                this._progressBarService.hide();
            });
        this._progressBarService.hide();
    }
    MatchCase() {            
        this._progressBarService.show();
        let result = this._casesStore.fetchCaseById(this.caseId);
        result.subscribe(
            (caseDetail: Case) => {                    
                if (caseDetail.orignatorCompanyId != this.sessionStore.session.currentCompany.id) {
                    this.caseViewedByOriginator = false;
                } else {
                    this.caseViewedByOriginator = true;
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