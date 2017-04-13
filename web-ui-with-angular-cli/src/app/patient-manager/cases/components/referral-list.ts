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

@Component({
    selector: 'referral-list',
    templateUrl: './referral-list.html'
})

export class ReferralListComponent implements OnInit {
    private _url: string = `${environment.SERVICE_BASE_URL}`;
    consentRecived: string = '';
    consentNotRecived: string = '';
    searchMode: number = 1;
    selectedReferrals: Referral[] = [];
    referrals: Referral[];
    referredMedicalOffices: Referral[];
    referredUsers: Referral[];
    referredRooms: Referral[];
    referredDoctors: Doctor[];
    refferedRooms: Room[];
    caseId: number;
    datasource: Referral[];
    totalRecords: number;
    isDeleteProgress: boolean = false;

    constructor(
        private _router: Router,
        public _route: ActivatedRoute,
        public sessionStore: SessionStore,
        private _referralStore: ReferralStore,
        private _notificationsStore: NotificationsStore,
        private _progressBarService: ProgressBarService,
        private _notificationsService: NotificationsService,
        private confirmationService: ConfirmationService
    ) {
        this._route.parent.parent.params.subscribe((routeParams: any) => {
            this.caseId = parseInt(routeParams.caseId, 10);
        });
    }

    ngOnInit() {
        this.loadReferrals();
    }

    loadReferrals() {
        this._progressBarService.show();
        this._referralStore.getReferralsByCaseId(this.caseId)
            .subscribe((referrals: Referral[]) => {
                // this.referrals = referrals.reverse();
                // let doctors: Doctor[] = _.map(referrals, (currentReferral: Referral) => {
                //     return currentReferral.referredToDoctor ? currentReferral.referredToDoctor : null;
                // });
                // let matchingDoctors = _.reject(doctors, (currentDoctor: Doctor) => {
                //     return currentDoctor == null;
                // });
                // this.referredDoctors = matchingDoctors.reverse();

                // let rooms: Room[] = _.map(referrals, (currentReferral: Referral) => {
                //     return currentReferral.room ? currentReferral.room : null;
                // });
                // let matchingRooms = _.reject(rooms, (currentRoom: Room) => {
                //     return currentRoom == null;
                // });
                // this.refferedRooms = matchingRooms.reverse();
                let userReferrals: Referral[] = _.map(referrals, (currentReferral: Referral) => {
                    return currentReferral.referredToDoctor ? currentReferral : null;
                });
                let matchingUserReferrals = _.reject(userReferrals, (currentReferral: Referral) => {
                    return currentReferral == null;
                });
                this.referredUsers = matchingUserReferrals.reverse();

                let roomReferrals: Referral[] = _.map(referrals, (currentReferral: Referral) => {
                    return currentReferral.room ? currentReferral : null;
                });
                let matchingRoomReferrals = _.reject(roomReferrals, (currentReferral: Referral) => {
                    return currentReferral == null;
                });
                this.referredRooms = matchingRoomReferrals.reverse();

                let userAndRoomReferral = _.union(matchingUserReferrals, matchingRoomReferrals);
                let userAndRoomReferralIds: number[] = _.map(userAndRoomReferral, (currentUserAndRoomReferral: Referral) => {
                    return currentUserAndRoomReferral.id;
                });
                let matchingMedicalOffices = _.filter(referrals, (currentReferral: Referral) => {
                    return _.indexOf(userAndRoomReferralIds, currentReferral.id) < 0 ? true : false;
                });
                this.referredMedicalOffices = matchingMedicalOffices.reverse();
            },
            (error) => {
                this._progressBarService.hide();
            },
            () => {
                this._progressBarService.hide();
            });
    }
    filter(event) {
        let currentSearchId = parseInt(event.target.value);
        if (currentSearchId === 1) {
            this.searchMode = 1;
        } else if (currentSearchId === 2) {
            this.searchMode = 2;
        } else if (currentSearchId === 3) {
            this.searchMode = 3;
        }
    }
    // getReferralDocumentName(currentReferral: Referral) {
    //     _.forEach(currentReferral.referralDocument, (currentDocument: ReferralDocument) =>{
    //     })       
    // }
    loadRefferalsLazy(event: LazyLoadEvent) {
        setTimeout(() => {
            if (this.datasource) {
                this.referrals = this.datasource.slice(event.first, (event.first + event.rows));
            }
        }, 250);
    }
    getCurrentDoctorSpeciality(currentReferral): string {
        let specialityString: string = null;
        let speciality: any = [];
        _.forEach(currentReferral.doctorSpecialities, (currentDoctorSpeciality: any) => {
            speciality.push(currentDoctorSpeciality.speciality.specialityCode);
            // _.forEach(currentReferral.referredToDoctor.doctorSpecialities, (currentDoctorSpeciality: any) => {
            //     speciality.push(currentDoctorSpeciality.specialty.specialityCode);
        });
        if (speciality.length > 0) {
            specialityString = speciality.join(', ');
        }
        return specialityString;
    }
    DownloadPdf(document: ReferralDocument) {
        window.location.assign(this._url + '/fileupload/download/' + document.referralId + '/' + document.midasDocumentId);
    }
    downloadConsent(caseDocuments: CaseDocument[]) {
        caseDocuments.forEach(caseDocument => {
            window.location.assign(this._url + '/fileupload/download/' + caseDocument.document.originalResponse.caseId + '/' + caseDocument.document.originalResponse.midasDocumentId);
        });
    }
    // consentAvailable(referral: Referral) {
    //     if (referral.case.companyCaseConsentApproval.length > 0) {
    //         let consentAvailable = _.find(referral.case.companyCaseConsentApproval, (currentConsent: Consent) => {
    //             return currentConsent.companyId === this.sessionStore.session.currentCompany.id;
    //         });
    //         if (consentAvailable) {
    //             return this.consentRecived = 'Yes';
    //         } else {
    //             return this.consentRecived = 'No';
    //         }
    //     } else {
    //         return this.consentRecived = 'No';
    //     }
    // }
    consentAvailable(referral: Referral) {
        let consentAvailable = null;
        let consentApproval = referral.case.companyCaseConsentApproval;
        // if (consentApproval.length > 0) {
        consentAvailable = _.find(consentApproval, (currentConsent: Consent) => {
            return currentConsent.companyId === this.sessionStore.session.currentCompany.id;
        });
        // }
        if (consentAvailable) {
            this.consentRecived = 'Yes';
        } else if (consentApproval.length < 0) {
            this.consentNotRecived = 'No';
        } else {
            this.consentNotRecived = 'No';
        }
    }

    deleteReferral() {
        if (this.selectedReferrals.length > 0) {
            this.confirmationService.confirm({
                message: 'Do you want to delete this record?',
                header: 'Delete Confirmation',
                icon: 'fa fa-trash',
                accept: () => {
                    this.selectedReferrals.forEach(currentReferral => {
                        this.isDeleteProgress = true;
                        this._progressBarService.show();
                        let result;
                        result = this._referralStore.deleteReferral(currentReferral);
                        result.subscribe(
                            (response) => {
                                let notification = new Notification({
                                    'title': 'Referral deleted successfully!',
                                    'type': 'SUCCESS',
                                    'createdAt': moment()
                                });
                                this.loadReferrals();
                                this._notificationsStore.addNotification(notification);
                                this.selectedReferrals = [];
                            },
                            (error) => {
                                let errString = 'Unable to delete Referral';
                                let notification = new Notification({
                                    'messages': ErrorMessageFormatter.getErrorMessages(error, errString),
                                    'type': 'ERROR',
                                    'createdAt': moment()
                                });
                                this.selectedReferrals = [];
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
                'title': 'select Referral to delete',
                'type': 'ERROR',
                'createdAt': moment()
            });
            this._notificationsStore.addNotification(notification);
            this._notificationsService.error('Oh No!', 'select Referral to delete');
        }
    }

}