import { UserRole } from '../../commons/models/user-role';
import { Component, OnInit, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../account/services/authentication-service';
import { SessionStore } from '../../commons/stores/session-store';
import { NotificationsStore } from '../../commons/stores/notifications-store';
import * as _ from 'underscore';
import * as moment from 'moment';
import { DialogModule } from 'primeng/primeng';
import { FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';
import { UserSettingStore } from '../../commons/stores/user-setting-store';
import { UserSetting } from '../../commons/models/user-setting';
import { ProgressBarService } from '../../commons/services/progress-bar-service';
import { Notification } from '../../commons/models/notification';
import { NotificationsService } from 'angular2-notifications';
import { ErrorMessageFormatter } from '../../commons/utils/ErrorMessageFormatter';
import { PushNotification } from '../../commons/models/push-notification';
import { PushNotificationAdapter } from '../../commons/services/adapters/push-notification-adapter';
import { PushNotificationStore } from '../../commons/stores/push-notification-store';
import { environment } from '../../../environments/environment';

@Component({
    selector: 'app-header',
    templateUrl: './app-header.html',
    styleUrls: ['./app-header.scss']
})

export class AppHeaderComponent implements OnInit {
    private _notificationServerUrl: string = `${environment.NOTIFICATION_SERVER_URL}`;
    messages: PushNotification[] = [];
    userSetting: UserSetting;
    attorneyRoleFlag = false;
    disabled: boolean = false;
    status: { isopen: boolean } = { isopen: false };
    menu_right_opened: boolean = false;
    menu_left_opened: boolean = false;

    /* Dialog Visibilities */
    settingsDialogVisible: boolean = false;
    
        addUserSettings: FormGroup;
        addUserSettingsControls;
        isSearchable: boolean = false;
        isCalendarPublic: boolean = false;
        isPublic: boolean = false;

    toggleDropdown($event: MouseEvent): void {
        $event.preventDefault();
        $event.stopPropagation();
        this.status.isopen = !this.status.isopen;
    }

    constructor(
        private _authenticationService: AuthenticationService,
        private _notificationsStore: NotificationsStore,
        public sessionStore: SessionStore,
        private _router: Router,
        private _fb: FormBuilder,
        private _userSettingStore: UserSettingStore,
        private _progressBarService: ProgressBarService,
        private _notificationsService: NotificationsService,
        private _pushNotificationStore: PushNotificationStore,
        private _elRef: ElementRef

    ) {

        this.addUserSettings = this._fb.group({
            isPublic: [''],
            isCalendarPublic: [''],
            isSearchable: ['']
        })
        this.addUserSettingsControls = this.addUserSettings.controls;

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
                    _notificationsStore.addNotification(notification);
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
            _notificationsStore.addNotification(notification);
        }

        $.connection.hub.start().done(function () {
            console.log('Notification hub started');
        });
    }

    ngOnInit() {
        let attorneyRolewithOther;
        let attorneyRolewithoutOther;
        let roles = this.sessionStore.session.user.roles;
        if (roles) { 
            let currentcompnayrole  = this.sessionStore.session.user.roles;
            if (roles.length === 1) {
                attorneyRolewithoutOther = _.find(roles, (currentRole) => {
                    return currentRole.roleType === 6;
                });
            } else if (roles.length > 1) {
                let count = 0;
                let currentcompanyrole = 0;
                _.forEach(roles, (currentRole) => {
                   if(currentRole.companyId == this.sessionStore.session.currentCompany.id)
                   {
                      if(currentRole.roleType === 6)
                      {
                        count = count + 1;
                        currentcompanyrole = currentRole.roleType;
                      }
                      if(currentRole.roleType === 1)
                      {
                        count = count + 1;
                        currentcompanyrole = currentRole.roleType;
                      }
                   }
                });
                if(count > 1)
                {
                    attorneyRolewithOther = true;
                }
                else{
                    if(currentcompanyrole == 6)
                    {
                        attorneyRolewithoutOther = true;
                    }
                    else{
                        attorneyRolewithOther = true;
                    }
                }
            }
            if (attorneyRolewithoutOther) {
                this.attorneyRoleFlag = true;
            } else if (attorneyRolewithOther) {
                this.attorneyRoleFlag = false;
            } else {
                this.attorneyRoleFlag = false;
            }
        }
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
        this._notificationsStore.toggleVisibility();
        let isUnReadMessage =  _.find(AppHeaderComponent.prototype.messages, (currMessage: PushNotification) => {
            return currMessage.isRead == false;
        })
            if (isUnReadMessage) {
                this._pushNotificationStore.updateMessageStatus();
            }
    }

    showSettingsDialog() {
        this._router.navigate(['/account/settings']);
        this.settingsDialogVisible = true;
        // this._cd.detectChanges();
    }
    closeDialog() {
        this.settingsDialogVisible = false;
    }

    checkUncheck(event) {
        if (event == false) {
            this.isCalendarPublic = false;
            this.isSearchable = false;
        }

    }
}