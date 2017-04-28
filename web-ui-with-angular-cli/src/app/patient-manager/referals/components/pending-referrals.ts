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
import { ReferralStore } from '../../cases/stores/referral-store';
import { Referral } from '../../cases/models/referral';
import { Room } from '../../../medical-provider/rooms/models/room';
import { Doctor } from '../../../medical-provider/users/models/doctor';
import { Speciality } from '../../../account-setup/models/speciality';
import { DoctorSpeciality } from '../../../medical-provider/users/models/doctor-speciality';
import { Consent } from '../../cases/models/consent';
import { ReferralDocument } from '../../cases/models/referral-document';
import { environment } from '../../../../environments/environment';
import { CaseDocument } from '../../cases/models/case-document';

@Component({
    selector: 'pending-referrals',
    templateUrl: './pending-referrals.html'
})

export class PendingReferralsComponent implements OnInit {
    private _url: string = `${environment.SERVICE_BASE_URL}`;
    consentRecived: string = '';
    consentNotRecived: string = '';
    searchMode: number = 1;
    referrals: Referral[];
    referredUsers: Referral[];
    referredMedicalOffices: Referral[];
    referredRooms: Referral[];
    referralsOutsideMidas: Referral[];
    selectedReferrals: Referral[] = [];
    referredDoctors: Doctor[];
    refferedRooms: Room[];
    filters: SelectItem[];
    doctorRoleOnly = null;
  

    constructor(
        private _router: Router,
        private _notificationsStore: NotificationsStore,
        public sessionStore: SessionStore,
        private _referralStore: ReferralStore,
        private _progressBarService: ProgressBarService,
        private _notificationsService: NotificationsService,
    ) {
        this.sessionStore.userCompanyChangeEvent.subscribe(() => {
            this.loadReferralsCheckingDoctor();
        });
    }

    ngOnInit() {
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
    loadReferralsCheckingDoctor() {
        // let doctorRoleOnly = null;        
        if (this.doctorRoleOnly) {
            this.loadReferralsForDoctor();
        } else {
            this.loadReferrals();
        }
    }

    loadReferrals() {
        this._progressBarService.show();
        // this._referralStore.getReferralsByCaseId(this.caseId)
        this._referralStore.getReferralsByReferringCompanyId()
            .subscribe((referrals: Referral[]) => {
                // this.referrals = referrals.reverse();
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

                let referralsOutsideMidas: Referral[] = _.map(referrals, (currentReferral: Referral) => {
                    return currentReferral.firstName && currentReferral.lastName ? currentReferral : null;
                });
                let matchingReferralsOutsideMidas = _.reject(referralsOutsideMidas, (currentReferral: Referral) => {
                    return currentReferral == null;
                });
                this.referralsOutsideMidas = matchingReferralsOutsideMidas.reverse();

                let userAndRoomReferral = _.union(matchingUserReferrals, matchingRoomReferrals, matchingReferralsOutsideMidas);
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
    loadReferralsForDoctor() {
        this._progressBarService.show();
        // this._referralStore.getReferralsByCaseId(this.caseId)
        this._referralStore.getReferralsByReferringUserId()
            .subscribe((referrals: Referral[]) => {
                // this.referrals = referrals.reverse();
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
        } else if (currentSearchId === 4) {
            this.searchMode = 4;
        }
    }
    DownloadPdf(document: ReferralDocument) {
        window.location.assign(this._url + '/fileupload/download/' + document.referralId + '/' + document.midasDocumentId);
    }
    downloadConsent(caseDocuments: CaseDocument[]) {
        caseDocuments.forEach(caseDocument => {
            window.location.assign(this._url + '/fileupload/download/' + caseDocument.document.originalResponse.caseId + '/' + caseDocument.document.originalResponse.midasDocumentId);
        });
    }
    consentAvailable(referral: Referral) {
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
}
