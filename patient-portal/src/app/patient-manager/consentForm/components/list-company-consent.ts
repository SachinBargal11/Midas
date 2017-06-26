import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LazyLoadEvent } from 'primeng/primeng'
import { ConsentStore } from '../../cases/stores/consent-store';
import { NotificationsStore } from '../../../commons/stores/notifications-store';
import { Notification } from '../../../commons/models/notification';
import * as moment from 'moment';
import * as _ from 'underscore';
import { ProgressBarService } from '../../../commons/services/progress-bar-service';
import { NotificationsService } from 'angular2-notifications';
import { ErrorMessageFormatter } from '../../../commons/utils/ErrorMessageFormatter';
import { Consent } from '../../cases/models/consent';

import { Patient } from '../../patients/models/patient';
import { PatientsStore } from '../../patients/stores/patients-store';
import { CasesStore } from '../../cases/stores/case-store';
import { Case } from '../../cases/models/case';
import { CaseDocument } from '../../cases/models/case-document';
import { environment } from '../../../../environments/environment';
import { SessionStore } from '../../../commons/stores/session-store';
import { ReferralStore } from '../../cases/stores/referral-store';
import { Referral } from '../../cases/models/referral';
import { Company } from '../../../account/models/company';
import { Document } from '../../../commons/models/document';

@Component({
    selector: 'list-company-consent',
    templateUrl: './list-company-consent.html'
})

export class ListCompanyConsentComponent implements OnInit {
    private _url: string = `${environment.SERVICE_BASE_URL}`;

    selectedConsentList: Case[] = [];
    ListConsent: Consent[];
    caseId: number;
    datasource: Consent[];
    totalRecords: number;
    isDeleteProgress: boolean = false;
    companyId: number;
    caseConsentDocuments: CaseDocument[];
    cases: Case[];
    patientId: number;
    patient: Patient;
    referrals: Referral[];
    companies: Company[];
    companyCaseConsentApproval: Consent[];
    addConsentDialogVisible: boolean = false;
    selectedCaseId: number;
    currentCaseId: number;
    url;

    constructor(
        private _router: Router,
        public _route: ActivatedRoute,
        private _consentStore: ConsentStore,
        public notificationsStore: NotificationsStore,
        public progressBarService: ProgressBarService,
        private _notificationsService: NotificationsService,
        private _casesStore: CasesStore,
        private _patientsStore: PatientsStore,
        private _referralStore: ReferralStore,
        public sessionStore: SessionStore,

    ) {
        this.url = `${this._url}/documentmanager/uploadtoblob`;
        this.patientId = this.sessionStore.session.user.id;
        this.progressBarService.show();
        this._patientsStore.fetchPatientById(this.patientId)
            .subscribe((patient: Patient) => {
                this.patient = patient;
                this.companyId = patient.companyId;
            },
            (error) => {
                this.progressBarService.hide();
            },
            () => {

                this.progressBarService.hide();
            });
    }

    ngOnInit() {
        this.loadConsentForm();
    }

    loadConsentForm() {
        this.progressBarService.show();
        this._casesStore.getDocumentForCompneyCaseId(this.patientId)
            .subscribe((cases: Case[]) => {
                this.cases = cases;
                this.caseId = cases[0].id;
                this.companyCaseConsentApproval = cases[0].companyCaseConsentApproval;
                this._casesStore.getCaseCompanies(this.caseId)
                    .subscribe((companies: Company[]) => {
                        this.companies = companies;
                    })
                // this._referralStore.getReferralsByCaseId(cases[0].id)
                //     .subscribe((referrals: Referral[]) => {
                //         this.referrals = referrals;
                //         this.cases[0].referral = referrals;
                //     });
                // _.forEach(cases, (currentCase: Case) => {
                //     this.caseConsentDocuments = _.map(currentCase.caseCompanyConsentDocument, (currentConsent: CaseDocument) => {
                //         return currentConsent
                //     })
                // })
            },
            (error) => {
                this.progressBarService.hide();
            },
            () => {

                this.progressBarService.hide();
            });
    }

    showDialog(currentCaseId: number, providerCompanyId: number) {
        this.addConsentDialogVisible = true;
        this.caseId = currentCaseId;
        this.companyId = providerCompanyId;
    }


    loadConsentFormLazy(event: LazyLoadEvent) {
        setTimeout(() => {
            if (this.datasource) {
                this.ListConsent = this.datasource.slice(event.first, (event.first + event.rows));
            }
        }, 250);
    }

    downloadConsent(caseDocuments: CaseDocument[], companyId: number) {
        caseDocuments.forEach(caseDocument => {
            // window.location.assign(this._url + '/fileupload/download/' + caseDocument.document.originalResponse.caseId + '/' + caseDocument.document.originalResponse.midasDocumentId);
            this.progressBarService.show();
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
                        this.progressBarService.hide();
                        //  this._notificationsStore.addNotification(notification);
                        this._notificationsService.error('Oh No!', 'Unable to download');
                    },
                    () => {
                        this.progressBarService.hide();
                    });
            }
            this.progressBarService.hide();
        });
    }

    deleteConsentForm() {
        if (this.selectedConsentList.length > 0) {
            this.selectedConsentList.forEach(currentCase => {
                this.progressBarService.show();
                this._consentStore.deleteCompanyConsent(currentCase, this.companyId)
                    .subscribe(
                    (response) => {
                        let notification = new Notification({
                            'title': 'record deleted successfully!',
                            'type': 'SUCCESS',
                            'createdAt': moment()

                        });
                        this.loadConsentForm();
                        this.notificationsStore.addNotification(notification);
                        this.selectedConsentList = [];
                    },
                    (error) => {
                        let errString = 'Unable to delete record';
                        let notification = new Notification({
                            'messages': ErrorMessageFormatter.getErrorMessages(error, errString),
                            'type': 'ERROR',
                            'createdAt': moment()
                        });
                        this.selectedConsentList = [];
                        this.progressBarService.hide();
                        this.notificationsStore.addNotification(notification);
                        this._notificationsService.error('Oh No!', ErrorMessageFormatter.getErrorMessages(error, errString));
                    },
                    () => {
                        this.progressBarService.hide();
                    });
            });
        } else {
            let notification = new Notification({
                'title': 'select record to delete',
                'type': 'ERROR',
                'createdAt': moment()
            });
            this.notificationsStore.addNotification(notification);
            this._notificationsService.error('Oh No!', 'select record to delete');
        }
    }

    documentUploadComplete(documents: Document[]) {
        _.forEach(documents, (currentDocument: Document) => {
            if (currentDocument.status == 'Failed') {
                let notification = new Notification({
                    'title': currentDocument.message + '  ' + currentDocument.documentName,
                    'type': 'ERROR',
                    'createdAt': moment()
                });
                this.notificationsStore.addNotification(notification);
                this._notificationsService.error('Oh No!', currentDocument.message);
            } else if (currentDocument.status == 'Success') {
                let notification = new Notification({
                    'title': 'Consent uploaded successfully',
                    'type': 'SUCCESS',
                    'createdAt': moment(),

                });
                this.notificationsStore.addNotification(notification);
                this._notificationsService.success('Success!', 'Consent uploaded successfully');
                this.loadConsentForm();
                this.addConsentDialogVisible = false
            }
        });
    }

    documentUploadError(error: Error) {
        this._notificationsService.error('Oh No!', 'Not able to upload document(s).');
    }

    DownloadPdf(documentId) {
        this.progressBarService.show();
        window.location.assign(this._url + '/fileupload/download/' + this.caseId + '/' + documentId);
        this.progressBarService.hide();
    }
}