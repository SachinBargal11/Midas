import { Doctor } from '../../../medical-provider/users/models/doctor';
import { Speciality } from '../../../account-setup/models/speciality';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LazyLoadEvent } from 'primeng/primeng';
import { ReferralStore } from '../stores/referral-store';
import { SessionStore } from '../../../commons/stores/session-store';
import { Referral } from '../models/referral';
import { ReferralDocument } from '../models/referral-document';
import { CaseDocument } from '../models/case-document';
import { NotificationsStore } from '../../../commons/stores/notifications-store';
import { Notification } from '../../../commons/models/notification';
import * as moment from 'moment';
import * as _ from 'underscore';
import { ProgressBarService } from '../../../commons/services/progress-bar-service';
import { NotificationsService } from 'angular2-notifications';
import { ErrorMessageFormatter } from '../../../commons/utils/ErrorMessageFormatter';
import { Room } from '../../../medical-provider/rooms/models/room';
import { environment } from '../../../../environments/environment';
import { ConfirmDialogModule, ConfirmationService } from 'primeng/primeng';
import { Consent } from '../models/consent';
import { CasesStore } from '../../cases/stores/case-store';
import { Case } from '../models/case';
import { InboundOutboundList } from '../../referals/models/inbound-outbound-referral';
import { PendingReferralStore } from '../../referals/stores/pending-referrals-stores';
import { ConsentStore } from '../../cases/stores/consent-store';
import { Document } from '../../../commons/models/document';



@Component({
    selector: 'referral-list',
    templateUrl: './referral-list.html'
})

export class ReferralListComponent implements OnInit {
    private _url: string = `${environment.SERVICE_BASE_URL}`;
    consentRecived: string = '';
    consentNotRecived: string = '';
    searchMode: number = 1;
    selectedReferrals: InboundOutboundList[] = [];
    referrals: InboundOutboundList[];
    referredMedicalOffices: InboundOutboundList[];
    referredUsers: InboundOutboundList[];
    referredRooms: InboundOutboundList[];
    referralsOutsideMidas: InboundOutboundList[];
    referredDoctors: Doctor[];
    refferedRooms: Room[];
    caseId: number;
    datasource: InboundOutboundList[];
    totalRecords: number;
    caseStatusId: number;
    isDeleteProgress: boolean = false;
    selectedCaseId: number;
    companyId: number;
    url;
    addConsentDialogVisible: boolean = false;
    currentCaseId: number;
    signedDocumentUploadUrl: string;
    signedDocumentPostRequestData: any;
    isElectronicSignatureOn: boolean = false;
    constructor(
        private _router: Router,
        public _route: ActivatedRoute,
        public sessionStore: SessionStore,
        private _casesStore: CasesStore,
        private _referralStore: ReferralStore,
        private _notificationsStore: NotificationsStore,
        private _progressBarService: ProgressBarService,
        private _notificationsService: NotificationsService,
        private confirmationService: ConfirmationService,
        private _pendingReferralStore: PendingReferralStore,
        private _consentStore: ConsentStore,
    ) {
        this.companyId = this.sessionStore.session.currentCompany.id;
        this.signedDocumentUploadUrl = `${this._url}/CompanyCaseConsentApproval/uploadsignedconsent`;

        this._route.parent.parent.params.subscribe((routeParams: any) => {
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
        this.loadReferrals();
    }

    loadReferrals() {
        this._progressBarService.show();
        this._pendingReferralStore.getReferralsByCaseAndCompanyId(this.caseId, this.companyId)
            .subscribe((referrals: InboundOutboundList[]) => {
                this.referredMedicalOffices = referrals.reverse();
            },
            (error) => {
                this._progressBarService.hide();
            },
            () => {
                this._progressBarService.hide();
            });
    }

    showDialog(currentCaseId) {
        this.url = this._url + '/CompanyCaseConsentApproval/multiupload/' + currentCaseId + '/' + this.companyId;
        this.addConsentDialogVisible = true;
        this.selectedCaseId = currentCaseId;
        this.signedDocumentPostRequestData = {
            companyId: this.companyId,
            caseId: this.selectedCaseId
        };
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
            else {
                let notification = new Notification({
                    'title': 'Consent Uploaded Successfully!',
                    'type': 'SUCCESS',
                    'createdAt': moment()
                });
                this._notificationsStore.addNotification(notification);

            }
            this.addConsentDialogVisible = false;
            this.loadReferrals();
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
            this._notificationsService.error('Oh No!', 'Company, Case and Consent data already exists.');
        }
        else {
            let notification = new Notification({
                'title': 'Consent Uploaded Successfully!',
                'type': 'SUCCESS',
                'createdAt': moment()
            });
            this._notificationsStore.addNotification(notification);

        }
        this.addConsentDialogVisible = false;
        this.loadReferrals();

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
    // // getReferralDocumentName(currentReferral: Referral) {
    // //     _.forEach(currentReferral.referralDocument, (currentDocument: ReferralDocument) =>{
    // //     })       
    // // }
    // loadRefferalsLazy(event: LazyLoadEvent) {
    //     setTimeout(() => {
    //         if (this.datasource) {
    //             this.referrals = this.datasource.slice(event.first, (event.first + event.rows));
    //         }
    //     }, 250);
    // }
    // getCurrentDoctorSpeciality(currentReferral): string {
    //     let specialityString: string = null;
    //     let speciality: any = [];
    //     _.forEach(currentReferral.doctorSpecialities, (currentDoctorSpeciality: any) => {
    //         speciality.push(currentDoctorSpeciality.speciality.specialityCode);
    //         // _.forEach(currentReferral.referredToDoctor.doctorSpecialities, (currentDoctorSpeciality: any) => {
    //         //     speciality.push(currentDoctorSpeciality.specialty.specialityCode);
    //     });
    //     if (speciality.length > 0) {
    //         specialityString = speciality.join(', ');
    //     }
    //     return specialityString;
    // }
    // DownloadPdf(document: ReferralDocument) {
    //     window.location.assign(this._url + '/fileupload/download/' + document.referralId + '/' + document.midasDocumentId);
    // }
    // downloadConsent(caseDocuments: CaseDocument[]) {
    //     caseDocuments.forEach(caseDocument => {
    //         window.location.assign(this._url + '/fileupload/download/' + caseDocument.document.originalResponse.caseId + '/' + caseDocument.document.originalResponse.midasDocumentId);
    //     });
    // }
    // // consentAvailable(referral: Referral) {
    // //     if (referral.case.companyCaseConsentApproval.length > 0) {
    // //         let consentAvailable = _.find(referral.case.companyCaseConsentApproval, (currentConsent: Consent) => {
    // //             return currentConsent.companyId === this.sessionStore.session.currentCompany.id;
    // //         });
    // //         if (consentAvailable) {
    // //             return this.consentRecived = 'Yes';
    // //         } else {
    // //             return this.consentRecived = 'No';
    // //         }
    // //     } else {
    // //         return this.consentRecived = 'No';
    // //     }
    // // }
    // consentAvailable(referral: Referral) {
    //     let consentAvailable = null;
    //     let consentApproval = referral.case.companyCaseConsentApproval;
    //     // if (consentApproval.length > 0) {
    //     consentAvailable = _.find(consentApproval, (currentConsent: Consent) => {
    //         return currentConsent.companyId === this.sessionStore.session.currentCompany.id;
    //     });
    //     // }
    //     if (consentAvailable) {
    //         this.consentRecived = 'Yes';
    //     } else if (consentApproval.length < 0) {
    //         this.consentNotRecived = 'No';
    //     } else {
    //         this.consentNotRecived = 'No';
    //     }
    // }

    deleteReferral() {
        // if (this.selectedReferrals.length > 0) {
        //     this.confirmationService.confirm({
        //         message: 'Do you want to delete this record?',
        //         header: 'Delete Confirmation',
        //         icon: 'fa fa-trash',
        //         accept: () => {
        //             this.selectedReferrals.forEach(currentReferral => {
        //                 this.isDeleteProgress = true;
        //                 this._progressBarService.show();
        //                 let result;
        //                 result = this._referralStore.deleteReferral(currentReferral);
        //                 result.subscribe(
        //                     (response) => {
        //                         let notification = new Notification({
        //                             'title': 'Referral deleted successfully!',
        //                             'type': 'SUCCESS',
        //                             'createdAt': moment()
        //                         });
        //                         this.loadReferrals();
        //                         this._notificationsStore.addNotification(notification);
        //                         this.selectedReferrals = [];
        //                     },
        //                     (error) => {
        //                         let errString = 'Unable to delete Referral';
        //                         let notification = new Notification({
        //                             'messages': ErrorMessageFormatter.getErrorMessages(error, errString),
        //                             'type': 'ERROR',
        //                             'createdAt': moment()
        //                         });
        //                         this.selectedReferrals = [];
        //                         this._progressBarService.hide();
        //                         this.isDeleteProgress = false;
        //                         this._notificationsStore.addNotification(notification);
        //                         this._notificationsService.error('Oh No!', ErrorMessageFormatter.getErrorMessages(error, errString));
        //                     },
        //                     () => {
        //                         this.isDeleteProgress = false;
        //                         this._progressBarService.hide();
        //                     });
        //             });
        //         }
        //     });
        // } else {
        //     let notification = new Notification({
        //         'title': 'select Referral to delete',
        //         'type': 'ERROR',
        //         'createdAt': moment()
        //     });
        //     this._notificationsStore.addNotification(notification);
        //     this._notificationsService.error('Oh No!', 'select Referral to delete');
        // }
    }

}