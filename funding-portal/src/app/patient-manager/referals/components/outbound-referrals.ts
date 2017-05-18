import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LazyLoadEvent, SelectItem } from 'primeng/primeng';
import { NotificationsStore } from '../../../commons/stores/notifications-store';
import { SessionStore } from '../../../commons/stores/session-store';
import { Notification } from '../../../commons/models/notification';
import * as moment from 'moment';
import * as _ from 'underscore';
import { ProgressBarService } from '../../../commons/services/progress-bar-service';
import { NotificationsService } from 'angular2-notifications';
import { ErrorMessageFormatter } from '../../../commons/utils/ErrorMessageFormatter';
import { Room } from '../../../medical-provider/rooms/models/room';
import { Doctor } from '../../../medical-provider/users/models/doctor';
import { Speciality } from '../../../account-setup/models/speciality';
import { DoctorSpeciality } from '../../../medical-provider/users/models/doctor-speciality';
import { Consent } from '../../cases/models/consent';
import { ReferralDocument } from '../../cases/models/referral-document';
import { environment } from '../../../../environments/environment';
import { CaseDocument } from '../../cases/models/case-document';
import { InboundOutboundList } from '../models/inbound-outbound-referral';
import { PendingReferralStore } from '../stores/pending-referrals-stores';
import { ConsentStore } from '../../cases/stores/consent-store';
import { Document } from '../../../commons/models/document';

@Component({
    selector: 'outbound-referrals',
    templateUrl: './outbound-referrals.html'
})

export class OutboundReferralsComponent implements OnInit {
    private _url: string = `${environment.SERVICE_BASE_URL}`;
    consentRecived: string = '';
    consentNotRecived: string = '';
    searchMode: number = 1;
    referrals: InboundOutboundList[];
    referredUsers: InboundOutboundList[];
    referredMedicalOffices: InboundOutboundList[];
    referredRooms: InboundOutboundList[];
    referralsOutsideMidas: InboundOutboundList[];
    selectedReferrals: InboundOutboundList[] = [];
    referredDoctors: Doctor[];
    refferedRooms: Room[];
    filters: SelectItem[];
    doctorRoleOnly = null;
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
        private _notificationsStore: NotificationsStore,
        public sessionStore: SessionStore,
        private _progressBarService: ProgressBarService,
        private _notificationsService: NotificationsService,
        private _pendingReferralStore: PendingReferralStore,
        private _consentStore: ConsentStore,
    ) {
        this.companyId = this.sessionStore.session.currentCompany.id;
        this.signedDocumentUploadUrl = `${this._url}/CompanyCaseConsentApproval/uploadsignedconsent`;

        this.sessionStore.userCompanyChangeEvent.subscribe(() => {
            this.loadReferralsCheckingDoctor();
        });
    }

    checkSessions() {
        let roles = this.sessionStore.session.user.roles;
        if (roles) {
            if (roles.length === 1) {
                this.doctorRoleOnly = _.find(roles, (currentRole) => {
                    return currentRole.roleType === 3;
                });
            }
        }
        this.loadReferralsCheckingDoctor();
    }

    ngOnInit() {
        this.checkSessions();
    }

    testData: any[] = [
        {
            displayName: "AB69852", caseId: "50", toCompanyname: "citimall", toLocationname: "",
            forSpecialty: "AC"
        }];

    loadReferralsCheckingDoctor() {
        if (this.doctorRoleOnly) {
            this.loadReferralsForDoctor();
        } else {
            this.loadReferrals();
        }
    }

    loadReferrals() {
        this._progressBarService.show();
        this._pendingReferralStore.getReferralsByReferringCompanyId()
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

    loadReferralsForDoctor() {
        this._progressBarService.show();
        this._pendingReferralStore.getReferralsByReferringUserId()
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

    DownloadPdf(document: ReferralDocument) {
        window.location.assign(this._url + '/fileupload/download/' + document.referralId + '/' + document.midasDocumentId);
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
    consentAvailable(referral: InboundOutboundList) {
        if (referral.case.companyCaseConsentApproval.length > 0) {
            let consentAvailable = _.find(referral.case.companyCaseConsentApproval, (currentConsent: Consent) => {
                return currentConsent.companyId === this.sessionStore.session.currentCompany.id;
            });
            if (consentAvailable) {
                this.consentRecived = 'Yes';
            } else {
                this.consentNotRecived = 'No';
            }
        } else {
            this.consentNotRecived = 'No';
        }
    }
    getCurrentDoctorSpeciality(currentReferral): string {
        let specialityString: string = null;
        let speciality: any = [];
        _.forEach(currentReferral.doctorSpecialities, (currentDoctorSpeciality: DoctorSpeciality) => {
            speciality.push(currentDoctorSpeciality.speciality.specialityCode);
        });
        if (speciality.length > 0) {
            specialityString = speciality.join(', ');
        }
        return specialityString;
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
            this.checkSessions();
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
        this.checkSessions();
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
}
