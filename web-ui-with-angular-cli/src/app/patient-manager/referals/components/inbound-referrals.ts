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
import { AddConsent } from '../../cases/models/add-consent-form';
import { ReferralDocument } from '../../cases/models/referral-document';
import { environment } from '../../../../environments/environment';

@Component({
    selector: 'inbound-referrals',
    templateUrl: './inbound-referrals.html',
    styleUrls: ['./inbound-referrals.scss']
})

export class InboundReferralsComponent implements OnInit {
    private _url: string = `${environment.SERVICE_BASE_URL}`;
    consentRecived: string = '';
    searchMode: number = 1;
    referrals: Referral[];
    referredUsers: Referral[];
    referredMedicalOffices: Referral[];
    referredRooms: Referral[];
    filters: SelectItem[];

    constructor(
        private _router: Router,
        private _notificationsStore: NotificationsStore,
        public _sessionStore: SessionStore,
        private _referralStore: ReferralStore,
        private _progressBarService: ProgressBarService,
        private _notificationsService: NotificationsService,
    ) {
        this._sessionStore.userCompanyChangeEvent.subscribe(() => {
            this.loadReferrals();
        });
    }

    ngOnInit() {
        this.loadReferrals();
    }
    loadReferrals() {
        this._progressBarService.show();
        this._referralStore.getReferralsByReferredToCompanyId()
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
        }
    }
    DownloadPdf(document: ReferralDocument) {
        window.location.assign(this._url + '/fileupload/download/' + document.referralId + '/' + document.midasDocumentId);
    }
    consentAvailable(referral: Referral) {
        if (referral.case.companyCaseConsentApproval.length > 0) {
            let consentAvailable = _.find(referral.case.companyCaseConsentApproval, (currentConsent: AddConsent) => {
                return currentConsent.companyId === this._sessionStore.session.currentCompany.id;
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
}
