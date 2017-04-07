import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FamilyMemberStore } from '../stores/family-member-store';
import { FamilyMember } from '../models/family-member';
import { NotificationsStore } from '../../commons/stores/notifications-store';
import { Notification } from '../../commons/models/notification';
import * as moment from 'moment';
import { ProgressBarService } from '../../commons/services/progress-bar-service';
import { NotificationsService } from 'angular2-notifications';
import { ErrorMessageFormatter } from '../../commons/utils/ErrorMessageFormatter';
import { SessionStore } from '../../commons/stores/session-store';

@Component({
    selector: 'family-member-list',
    templateUrl: './family-member-list.html'
})

export class FamilyMemberListComponent implements OnInit {
    selectedFamilyMembers: FamilyMember[] = [];
    familyMembers: FamilyMember[];
    patientId: number;

    constructor(
        private _router: Router,
        public _route: ActivatedRoute,
        private _familyMemberStore: FamilyMemberStore,
       public notificationsStore: NotificationsStore,
        public progressBarService: ProgressBarService,
        public sessionStore: SessionStore,
        private _notificationsService: NotificationsService
    ) {
            this.patientId = this.sessionStore.session.user.id;
    }

    ngOnInit() {
        this.loadFamilyMembers();
    }

    loadFamilyMembers() {
        this.progressBarService.show();
        this._familyMemberStore.getFamilyMembers(this.patientId)
            .subscribe(familyMembers => {
                this.familyMembers = familyMembers;
            },
            (error) => {
                this.progressBarService.hide();
            },
            () => {
                this.progressBarService.hide();
            });
    }

    deleteFamilyMember() {
        if (this.selectedFamilyMembers.length > 0) {
            this.selectedFamilyMembers.forEach(currentFamilyMember => {
                this.progressBarService.show();
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
                        this.notificationsStore.addNotification(notification);
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
                        this.progressBarService.hide();
                        this.notificationsStore.addNotification(notification);
                        this._notificationsService.error('Oh No!', ErrorMessageFormatter.getErrorMessages(error, errString));
                    },
                    () => {
                        this.progressBarService.hide();
                    });
            });
        } else {
            let notification = new Notification({
                'title': 'select Family Member to delete',
                'type': 'ERROR',
                'createdAt': moment()
            });
            this.notificationsStore.addNotification(notification);
            this._notificationsService.error('Oh No!', 'select Family Member to delete');
        }
    }

}