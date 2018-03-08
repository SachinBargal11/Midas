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
import { UnscheduledVisitReferral } from '../../patient-visit/models/unscheduled-visit-referral';
import { UnscheduledVisit } from '../../patient-visit/models/unscheduled-visit';
import { VisitReferralStore } from '../../patient-visit/stores/visit-referral-store';
import { PatientVisitsStore } from '../../patient-visit/stores/patient-visit-store';

@Component({
    selector: 'external-referral',
    templateUrl: './external-referral.html'
})

export class ExternalReferralComponent implements OnInit {
    private _url: string = `${environment.SERVICE_BASE_URL}`;
    referrals: UnscheduledVisit[];
    selectedReferrals: UnscheduledVisit[];
    companyId: number;
    unscheduledVisit: UnscheduledVisit;
    unscheduledDialogVisible = false;
    visitInfo: string;

    constructor(
        private _router: Router,
        private _notificationsStore: NotificationsStore,
        public sessionStore: SessionStore,
        private _progressBarService: ProgressBarService,
        private _notificationsService: NotificationsService,
        private _visitReferralStore: VisitReferralStore,
        private _patientVisitStore: PatientVisitsStore,
    ) {
        this.companyId = this.sessionStore.session.currentCompany.id;

        this.sessionStore.userCompanyChangeEvent.subscribe(() => {
            this.loadReferrals();
        });
    }
    ngOnInit() {
        this.loadReferrals();
    }

    loadReferrals() {
        this._progressBarService.show();
        this._visitReferralStore.getUnscheduledVisitReferralByCompanyId()
            .subscribe((referrals: UnscheduledVisit[]) => {
                this.referrals = referrals.reverse();
            },
            (error) => {
                this._progressBarService.hide();
            },
            () => {
                this._progressBarService.hide();
            });
    }
    showDialog(visit: any) {
        this._patientVisitStore.getUnscheduledVisitDetailById(visit.id)
            .subscribe((visit: UnscheduledVisit) => {
                this.visitInfo = `Visit Info - Patient Name: ${visit.patient.user.displayName} - Case Id: ${visit.caseId}`;
                this.unscheduledVisit = visit;
                this.unscheduledDialogVisible = true;
            });
    }
    closeVisitDialog() {
        this.unscheduledDialogVisible = false;
        // this.visitInfo = '';
    }
    handleVisitDialogHide() {}
}
