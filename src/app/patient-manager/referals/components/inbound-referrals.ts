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
import { Consent } from '../../cases/models/consent';
import { ReferralDocument } from '../../cases/models/referral-document';
import { environment } from '../../../../environments/environment';
import { CaseDocument } from '../../cases/models/case-document';
import { InboundOutboundList } from '../models/inbound-outbound-referral';
import { PendingReferralStore } from '../stores/pending-referrals-stores';
import { ConsentStore } from '../../cases/stores/consent-store';
import { Document } from '../../../commons/models/document';
//  import { CreateVisitComponent } from '../../../commons/components/visit-detail/create-visit.component'

@Component({
    selector: 'inbound-referrals',
    templateUrl: './inbound-referrals.html',
    styleUrls: ['./inbound-referrals.scss']
})

export class InboundReferralsComponent implements OnInit {
    private _url: string = `${environment.SERVICE_BASE_URL}`;
    consentRecived: boolean = false;
    consentNotRecived: boolean = false;
    searchMode: number = 1;
    referrals: InboundOutboundList[];
    referredUsers: InboundOutboundList[];
    referredMedicalOffices: InboundOutboundList[];
    referredRooms: InboundOutboundList[];
    filters: SelectItem[];
    doctorRoleOnly = null;
    display: boolean = false;
    addConsentDialogVisible: boolean = false;
    currentCaseId: number;
    selectedCaseId: number;
    companyId: number;
    url;
    signedDocumentUploadUrl: string;
    signedDocumentPostRequestData: any;
    isElectronicSignatureOn: boolean = false;
    createPatientVisitDialogVisible: boolean = false;
    referrenceId: number = 0;
    patientId: number= null;
    caseId: number=null;
    visitInfo: string='';
    specialtyId: number=0;
    roomTestId: number=0;

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
         this.url = `${this._url}/documentmanager/uploadtoblob`;
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
            else if (roles.length > 1) {
                let count = 0;
                let currentcompanyrole = 0;
                _.forEach(roles, (currentRole) => {
                   if(currentRole.companyId == this.sessionStore.session.currentCompany.id)
                   {
                      if(currentRole.roleType === 3)
                      {
                        count = count + 1;
                        currentcompanyrole = currentRole.roleType;
                      }
                      if(currentRole.roleType === 1)
                      {
                        count = count + 1;
                        currentcompanyrole = currentRole.roleType;
                      }
                   }
                });
                if(count > 1)
                {
                    this.doctorRoleOnly = false;
                }
                else{
                    if(currentcompanyrole == 3)
                    {
                        this.doctorRoleOnly = true;
                    }
                    else{
                        this.doctorRoleOnly = false;
                    }
                 }
        }
        }
        this.loadReferralsCheckingDoctor();
    }

    ngOnInit() {
        this.checkSessions();
    }
    loadReferralsCheckingDoctor() {
        if (this.doctorRoleOnly) {
            this.loadReferralsForDoctor();
        } else {
            this.loadReferrals();
        }
    }
    loadReferralsForDoctor() {
        this._progressBarService.show();
        this._pendingReferralStore.getReferralsByReferredToDoctorId()
            .subscribe((referrals: InboundOutboundList[]) => {
                this.referrals = referrals;
            },
            (error) => {
                this._progressBarService.hide();
            },
            () => {
                this._progressBarService.hide();
            });
    }

    loadReferrals() {        
        this._progressBarService.show();
        this.referredMedicalOffices = [];
        this._pendingReferralStore.getReferralsByReferredToCompanyId()
            .subscribe((referrals: InboundOutboundList[]) => {
                this.referredMedicalOffices = referrals;
            },
            (error) => {
                this._progressBarService.hide();
            },
            () => {
                this._progressBarService.hide();
            });
    }
   
    DownloadPdf(document: ReferralDocument) {        
       // window.location.assign(this._url + '/FileUpload/download/' + document.referralId + '/' + document.midasDocumentId);
       this._consentStore.downloadRefferalFormByRefferalIdDocumetId(document.referralId, document.midasDocumentId)
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

    consentAvailable(referral: InboundOutboundList) {
        this.consentNotRecived = false;
        this.consentRecived = false;
        let consentAvailable = null;
        if (referral.case.companyCaseConsentApproval.length > 0) {
            _.forEach(referral.case.companyCaseConsentApproval, (currentConsent: Consent) => {
                if (currentConsent.companyId === this.sessionStore.session.currentCompany.id) {
                    this.consentRecived = true
                } else this.consentRecived = false;
            });
            // referral.case.companyCaseConsentApproval.forEach(currentConsent => {
            //     if(currentConsent.companyId === this._sessionStore.session.currentCompany.id) {
            //          this.consentRecived = true;
            //          return;
            //     } else {
            //         this.consentNotRecived = true;
            //         return;                    
            //     }               
            // });
            // if (consentAvailable) {
            //     this.consentRecived = true;
            //     return;
            // } else {
            //     this.consentNotRecived = true;
            //     return;
            // }
        } else {
            this.consentNotRecived = true;
            return;
        }
    }

    showDialog(currentCaseId) {
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
                this.checkSessions();
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
            this._notificationsService.error('Oh No!', 'Company, case and consent data already exists.');
        }
        else {
            let notification = new Notification({
                'title': 'Consent uploaded successfully!',
                'type': 'SUCCESS',
                'createdAt': moment()
            });
            this._notificationsStore.addNotification(notification);
            this.addConsentDialogVisible = false;
            this.checkSessions();
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

    createVisit(unschvist: any)
    {           
        this.referrenceId = unschvist.referralId;        
        this.caseId = unschvist.caseId;
        this.patientId = unschvist.patientId;
        this.specialtyId = unschvist.specialtyId;
        this.roomTestId = unschvist.roomTestId;
        this.createPatientVisitDialogVisible = true;
    }


    closePatientVisitDialog() {
        this.createPatientVisitDialogVisible = false;
        this.loadReferrals();
        /*this.handleVisitDialogHide();
        this.patientVisitForm.reset();
        this.unscheduledDialogVisible = false;
        this.unscheduledEditVisitDialogVisible = false;*/
    }
}
