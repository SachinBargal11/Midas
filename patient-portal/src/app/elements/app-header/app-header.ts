import { Component, OnInit, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { AuthenticationService } from '../../account/services/authentication-service';
import { SessionStore } from '../../commons/stores/session-store';
import { NotificationsStore } from '../../commons/stores/notifications-store';
import * as _ from 'underscore';
import * as moment from 'moment';
import { Notification } from '../../commons/models/notification';
import { NotificationsService } from 'angular2-notifications';
import { ErrorMessageFormatter } from '../../commons/utils/ErrorMessageFormatter';
import { PushNotification } from '../../commons/models/push-notification';
import { PushNotificationAdapter } from '../../commons/services/adapters/push-notification-adapter';
import { PushNotificationStore } from '../../commons/stores/push-notification-store';
import { environment } from '../../../environments/environment';
import { PatientsStore } from '../../patient-manager/patients/stores/patients-store';
import { Patient } from "../../patient-manager/patients/models/patient";
import { PatientDocument } from "../../patient-manager/patients/models/patient-document";
import { PatientsService } from "../../patient-manager/patients/services/patients-service";

@Component({
    selector: 'app-header',
    templateUrl: './app-header.html',
    styleUrls: ['./app-header.scss']
})

export class AppHeaderComponent implements OnInit {
    private _notificationServerUrl: string = `${environment.NOTIFICATION_SERVER_URL}`;
    messages: PushNotification[] = [];
    
    imageLink: SafeResourceUrl = '../../../assets/theme/img/avatar.png';

    disabled: boolean = false;
    status: { isopen: boolean } = { isopen: false };
    menu_right_opened: boolean = false;
    menu_left_opened: boolean = false;

    toggleDropdown($event: MouseEvent): void {
        $event.preventDefault();
        $event.stopPropagation();
        this.status.isopen = !this.status.isopen;
    }

    constructor(
        private _authenticationService: AuthenticationService,
        public notificationsStore: NotificationsStore,
        public sessionStore: SessionStore,
        private _router: Router,
        private _notificationsService: NotificationsService,
        private _pushNotificationStore: PushNotificationStore,
        private _patientsStore: PatientsStore,
        private _patientsService: PatientsService,
        private _sanitizer: DomSanitizer,
        private _elRef: ElementRef

    ) {
        let accessToken;
        accessToken = this.sessionStore.session.accessToken.replace('bearer ', '');
        $.connection.hub.qs = { 'access_token': accessToken, 'application_name': 'Midas' };
        $.connection.hub.url = this._notificationServerUrl + '/signalr';
        $.connection.hub.logging = true;
        var notificationHub = $.connection.hub.proxies['notificationhub'];

        notificationHub.client.refreshNotification = function (data: PushNotification[]) {
            AppHeaderComponent.prototype.messages = _.map(data, (currData: any) => {
                return PushNotificationAdapter.parseResponse(currData);
            });
            _.forEach(AppHeaderComponent.prototype.messages.reverse(), (currMessage: PushNotification) => {
                if (currMessage.isRead == false) {
                    let notification = new Notification({
                        'title': currMessage.message,
                        'type': 'SUCCESS',
                        'createdAt': moment(currMessage.notificationTime)
                    });
                    notificationsStore.addNotification(notification);
                }
            })
        }

        notificationHub.client.addLatestNotification = function (data) {
            let message = PushNotificationAdapter.parseResponse(data);
            AppHeaderComponent.prototype.messages.push(message);
            let notification = new Notification({
                'title': message.message,
                'type': 'SUCCESS',
                'createdAt': moment(message.notificationTime)
            });
            notificationsStore.addNotification(notification);
        }

        $.connection.hub.start().done(function () {
            console.log('Notification hub started');
        });

    }

    ngOnInit() {
        let result = this._patientsStore.getPatientById(this.sessionStore.session.user.id);
        result.subscribe(
            (patient: Patient) => {
                _.forEach(patient.patientDocuments, (currentPatientDocument: PatientDocument) => {
                    if (currentPatientDocument.document.documentType == 'profile') {
                        this.imageLink = this._sanitizer.bypassSecurityTrustResourceUrl(this._patientsService.getProfilePhotoDownloadUrl(currentPatientDocument.document.originalResponse.midasDocumentId));
                    }
                })
            });
                    
    }
    onLeftBurgerClick() {
        if (document.getElementsByTagName('body')[0].classList.contains('menu-left-opened')) {
            document.getElementsByClassName('hamburger')[0].classList.remove('is-active');
            document.getElementsByTagName('body')[0].classList.remove('menu-left-opened');
            document.getElementsByTagName('html')[0].style.overflow = 'auto';
        } else {
            document.getElementsByClassName('hamburger')[0].classList.add('is-active');
            document.getElementsByTagName('body')[0].classList.add('menu-left-opened');
            document.getElementsByTagName('html')[0].style.overflow = 'hidden';
        }
    }

    onBurgerClick() {
        if (this.menu_right_opened) {
            this.menu_right_opened = false;
            document.getElementsByTagName('body')[0].classList.remove('menu-right-opened');
            document.getElementsByTagName('html')[0].style.overflow = 'auto';
        } else {
            // this.menu_right_opened = true;
            document.getElementsByClassName('hamburger')[0].classList.remove('is-active');
            document.getElementsByTagName('body')[0].classList.remove('menu-left-opened');
            document.getElementsByTagName('body')[0].classList.add('menu-right-opened');
            document.getElementsByTagName('html')[0].style.overflow = 'hidden';
            this.menu_right_opened = false;
        }
    }

    hideMobileMenu() {
        document.getElementsByTagName('body')[0].classList.remove('menu-right-opened');
        document.getElementsByTagName('html')[0].style.overflow = 'auto';
    }


    logout() {
        this.sessionStore.logout();
        // this._router.navigate(['/account/login']);
    }

    changePassword() {
        this._router.navigate(['/account/change-password']);
    }

    showNotifications() {
        this.notificationsStore.toggleVisibility();
        let isUnReadMessage =  _.find(AppHeaderComponent.prototype.messages, (currMessage: PushNotification) => {
            return currMessage.isRead == false;
        })
            if (isUnReadMessage) {
                this._pushNotificationStore.updateMessageStatus();
            }
    }
    showSettingsDialog() {
        this._router.navigate(['/account/settings']);

    }
    closeDialog() {
        // this.settingsDialogVisible = false;
    }

}