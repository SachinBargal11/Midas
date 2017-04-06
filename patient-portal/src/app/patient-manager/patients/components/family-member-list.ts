import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LazyLoadEvent } from 'primeng/primeng';
import { SessionStore } from '../../../commons/stores/session-store';
import { FamilyMemberStore } from '../stores/family-member-store';
import { FamilyMember } from '../models/family-member';
import { NotificationsStore } from '../../../commons/stores/notifications-store';
import { Notification } from '../../../commons/models/notification';
import * as moment from 'moment';
import { ProgressBarService } from '../../../commons/services/progress-bar-service';
import { NotificationsService } from 'angular2-notifications';
import { ErrorMessageFormatter } from '../../../commons/utils/ErrorMessageFormatter';

@Component({
    selector: 'family-member-list',
    templateUrl: './family-member-list.html'
})

export class FamilyMemberListComponent implements OnInit {
    selectedFamilyMembers: FamilyMember[] = [];
    familyMembers: FamilyMember[];
    patientId: number;
    datasource: FamilyMember[];
    totalRecords: number;

    constructor(
        private _router: Router,
        public _route: ActivatedRoute,
        private _familyMemberStore: FamilyMemberStore,
        private _sessionStore: SessionStore,
        private _notificationsStore: NotificationsStore,
        private _progressBarService: ProgressBarService,
        private _notificationsService: NotificationsService
    ) {
        // this._route.parent.parent.params.subscribe((routeParams: any) => {
        //     this.patientId = parseInt(routeParams.patientId);
        // });
        this.patientId = this._sessionStore.session.user.id;
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
            if(this.datasource) {
                this.familyMembers = this.datasource.slice(event.first, (event.first + event.rows));
            }
        }, 250);
    }

    deleteFamilyMember() {
        if (this.selectedFamilyMembers.length > 0) {
            this.selectedFamilyMembers.forEach(currentFamilyMember => {
                this._progressBarService.show();
                let result;
                result = this._familyMemberStore.deleteFamilyMember(currentFamilyMember);
                result.subscribe(
                    (response) => {
                        let notification = new Notification({
                            'title': 'Family Member deleted successfully!',
                            'type': 'SUCCESS',
                            'createdAt': moment()
                        });
                        this.loadFamilyMembers();
                        this._notificationsStore.addNotification(notification);
                        this.selectedFamilyMembers = [];
                    },
                    (error) => {
                        let errString = 'Unable to delete Family Member';
                        let notification = new Notification({
                            'messages': ErrorMessageFormatter.getErrorMessages(error, errString),
                            'type': 'ERROR',
                            'createdAt': moment()
                        });
                        this.selectedFamilyMembers = [];
                        this._progressBarService.hide();
                        this._notificationsStore.addNotification(notification);
                        this._notificationsService.error('Oh No!', ErrorMessageFormatter.getErrorMessages(error, errString));
                    },
                    () => {
                        this._progressBarService.hide();
                    });
            });
        } else {
            let notification = new Notification({
                'title': 'select Family Member to delete',
                'type': 'ERROR',
                'createdAt': moment()
            });
            this._notificationsStore.addNotification(notification);
            this._notificationsService.error('Oh No!', 'select Family Member to delete');
        }
    }

}