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

@Component({
    selector: 'outbound-referrals',
    templateUrl: './outbound-referrals.html'
})

export class OutboundReferralsComponent implements OnInit {
    searchMode: number = 1;
    referrals: Referral[];
    referredUsers: Referral[];
    referredRooms: Referral[];
    selectedReferrals: Referral[] = [];
    referredDoctors: Doctor[];
    refferedRooms: Room[];
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

                // let rooms: Room[] = _.map(referrals, (currentReferral: Referral) => {
                //     return currentReferral.room ? currentReferral.room : null;
                // });
                // let matchingRooms = _.reject(rooms, (currentRoom: Room) => {
                //     return currentRoom == null;
                // });
                // this.refferedRooms = matchingRooms.reverse();
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
        } else {
            this.searchMode = 2;
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
