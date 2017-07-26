import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LazyLoadEvent } from 'primeng/primeng'
import { FamilyMemberStore } from '../stores/family-member-store';
import { FamilyMember } from '../models/family-member';
import { NotificationsStore } from '../../../commons/stores/notifications-store';
import { Notification } from '../../../commons/models/notification';
import * as moment from 'moment';
import { ProgressBarService } from '../../../commons/services/progress-bar-service';
import { NotificationsService } from 'angular2-notifications';
import { ErrorMessageFormatter } from '../../../commons/utils/ErrorMessageFormatter';
import { ConfirmDialogModule, ConfirmationService } from 'primeng/primeng';
import { SessionStore } from '../../../commons/stores/session-store';
import { Case } from '../../cases/models/case';
import { CasesStore } from '../../cases/stores/case-store';

@Component({
    selector: 'family-member-list',
    templateUrl: './family-member-list.html'
})

export class FamilyMemberListComponent implements OnInit {
    caseDetail: Case[];
    referredToMe: boolean = false;
    selectedFamilyMembers: FamilyMember[] = [];
    familyMembers: FamilyMember[];
    patientId: number;
    datasource: FamilyMember[];
    totalRecords: number;
    isDeleteProgress: boolean = false;

    constructor(
        private _router: Router,
        public _route: ActivatedRoute,
        private _familyMemberStore: FamilyMemberStore,
        private _notificationsStore: NotificationsStore,
        private _progressBarService: ProgressBarService,
        private _notificationsService: NotificationsService,
        private confirmationService: ConfirmationService,
        private _casesStore: CasesStore,
        private _sessionStore: SessionStore

    ) {
        this._route.parent.parent.params.subscribe((routeParams: any) => {
            this.patientId = parseInt(routeParams.patientId);
            this._progressBarService.show();
            let caseResult = this._casesStore.getOpenCaseForPatient(this.patientId);
            caseResult.subscribe(
                (cases: Case[]) => {
                    this.caseDetail = cases;
                    if (this.caseDetail.length > 0) {
                        this.caseDetail[0].referral.forEach(element => {
                            if (element.referredToCompanyId == _sessionStore.session.currentCompany.id) {
                                this.referredToMe = true;
                            } else {
                                this.referredToMe = false;
                            }
                        })
                    } else {
                        this.referredToMe = false;
                    }

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
        this.loadFamilyMembers();
    }

    loadFamilyMembers() {
        this._progressBarService.show();
        this._familyMemberStore.getFamilyMembers(this.patientId)
            .subscribe(familyMembers => {
                this.familyMembers = familyMembers.reverse();
                // this.datasource = familyMembers.reverse();
                // this.totalRecords = this.datasource.length;
                // this.familyMembers = this.datasource.slice(0, 10);
            },
            (error) => {
                this._progressBarService.hide();
            },
            () => {
                this._progressBarService.hide();
            });
    }
    loadSpecialitiesLazy(event: LazyLoadEvent) {
        setTimeout(() => {
            if (this.datasource) {
                this.familyMembers = this.datasource.slice(event.first, (event.first + event.rows));
            }
        }, 250);
    }

    deleteFamilyMember() {
        if (this.selectedFamilyMembers.length > 0) {
            this.confirmationService.confirm({
                message: 'Do you want to delete this record?',
                header: 'Delete Confirmation',
                icon: 'fa fa-trash',
                accept: () => {
                    this.selectedFamilyMembers.forEach(currentFamilyMember => {
                        this.isDeleteProgress = true;
                        this._progressBarService.show();
                        let result;
                        result = this._familyMemberStore.deleteFamilyMember(currentFamilyMember);
                        result.subscribe(
                            (response) => {
                                let notification = new Notification({
                                    'title': 'Family member deleted successfully!',
                                    'type': 'SUCCESS',
                                    'createdAt': moment()
                                });
                                this.loadFamilyMembers();
                                this._notificationsStore.addNotification(notification);
                                this.selectedFamilyMembers = [];
                            },
                            (error) => {
                                let errString = 'Unable to delete family member';
                                let notification = new Notification({
                                    'messages': ErrorMessageFormatter.getErrorMessages(error, errString),
                                    'type': 'ERROR',
                                    'createdAt': moment()
                                });
                                this.selectedFamilyMembers = [];
                                this._progressBarService.hide();
                                this.isDeleteProgress = false;
                                this._notificationsStore.addNotification(notification);
                                this._notificationsService.error('Oh No!', ErrorMessageFormatter.getErrorMessages(error, errString));
                            },
                            () => {
                                this._progressBarService.hide();
                                this.isDeleteProgress = false;
                            });
                    });
                }
            });
        } else {
            let notification = new Notification({
                'title': 'Select family member to delete',
                'type': 'ERROR',
                'createdAt': moment()
            });
            this._notificationsStore.addNotification(notification);
            this._notificationsService.error('Oh No!', 'Select family member to delete');
        }
    }

}