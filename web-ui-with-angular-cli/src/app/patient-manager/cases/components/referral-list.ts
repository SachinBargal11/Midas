import { Doctor } from '../../../medical-provider/users/models/doctor';
import { Speciality } from '../../../account-setup/models/speciality';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LazyLoadEvent } from 'primeng/primeng';
import { ReferralStore } from '../stores/referral-store';
import { Referral } from '../models/referral';
import { NotificationsStore } from '../../../commons/stores/notifications-store';
import { Notification } from '../../../commons/models/notification';
import * as moment from 'moment';
import * as _ from 'underscore';
import { ProgressBarService } from '../../../commons/services/progress-bar-service';
import { NotificationsService } from 'angular2-notifications';
import { ErrorMessageFormatter } from '../../../commons/utils/ErrorMessageFormatter';
import { Room } from '../../../medical-provider/rooms/models/room';

@Component({
    selector: 'referral-list',
    templateUrl: './referral-list.html'
})

export class ReferralListComponent implements OnInit {
    selectedReferrals: Referral[] = [];
    referrals: Referral[];
    referredDoctors: Doctor[];
    refferedRooms: Room[];
    caseId: number;
    datasource: Referral[];
    totalRecords: number;
    isDeleteProgress: boolean = false;

    constructor(
        private _router: Router,
        public _route: ActivatedRoute,
        private _referralStore: ReferralStore,
        private _notificationsStore: NotificationsStore,
        private _progressBarService: ProgressBarService,
        private _notificationsService: NotificationsService
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
                let doctors: Doctor[] = _.map(referrals, (currentReferral: Referral) => {
                    return currentReferral.referredToDoctor ? currentReferral.referredToDoctor : null;
                });
                let matchingDoctors = _.reject(doctors, (currentDoctor: Doctor) => {
                    return currentDoctor == null;
                });
                this.referredDoctors = matchingDoctors.reverse();

                let rooms: Room[] = _.map(referrals, (currentReferral: Referral) => {
                    return currentReferral.room ? currentReferral.room : null;
                });
                let matchingRooms = _.reject(rooms, (currentRoom: Room) => {
                    return currentRoom == null;
                });
                this.refferedRooms = matchingRooms.reverse();
            },
            (error) => {
                this._progressBarService.hide();
            },
            () => {
                this._progressBarService.hide();
            });
    }
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

    deleteReferral() {
        if (this.selectedReferrals.length > 0) {
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