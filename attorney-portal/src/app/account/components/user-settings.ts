import { UserRole } from '../../commons/models/user-role';
import { Component, OnInit, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
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

@Component({
    selector: 'user-settings',
    templateUrl: './user-settings.html',
})

export class UserSettingsComponent implements OnInit {

    userId: number = this.sessionStore.session.user.id;
    companyId: number = this.sessionStore.session.currentCompany.id;
    userSetting: UserSetting;
    doctorRoleFlag = false;
    disabled: boolean = false;
  
    /* Dialog Visibilities */
    settingsDialogVisible: boolean = false;

    addUserSettings: FormGroup;
    addUserSettingsControls;
    isSearchable: boolean = false;
    isCalendarPublic: boolean = false;
    isPublic: boolean = false;
    isTimeSlot = 30;
    calendarViewId = 1;

    constructor(
        private _authenticationService: AuthenticationService,
        private _notificationsStore: NotificationsStore,
        public sessionStore: SessionStore,
        private _router: Router,
        private _fb: FormBuilder,
        private _userSettingStore: UserSettingStore,
        private _progressBarService: ProgressBarService,
        private _notificationsService: NotificationsService,
        private _elRef: ElementRef

    ) {

        this.addUserSettings = this._fb.group({
             isPublic: [''],
            isCalendarPublic: [''],
            isSearchable: [''],
            timeSlot: [''],
            calendarViewId: [''],
        })
        this.addUserSettingsControls = this.addUserSettings.controls;

    }

    ngOnInit() {
        let doctorRolewithOther;
        let doctorRolewithoutOther;
        let roles = this.sessionStore.session.user.roles;
        if (roles) {
            if (roles.length === 1) {
                doctorRolewithoutOther = _.find(roles, (currentRole) => {
                    return currentRole.roleType === 3;
                });
            } else if (roles.length > 1) {
                doctorRolewithOther = _.find(roles, (currentRole) => {
                    return currentRole.roleType === 3;
                });
            }
            if (doctorRolewithoutOther) {
                this.doctorRoleFlag = true;
            } else if (doctorRolewithOther) {
                this.doctorRoleFlag = false;
            } else {
                this.doctorRoleFlag = false;
            }
        }

        this._userSettingStore.getUserSettingByUserId(this.userId, this.companyId)
            .subscribe((userSetting) => {
                this.userSetting = userSetting;
                this.isPublic = userSetting.isPublic;
                this.isCalendarPublic = userSetting.isCalendarPublic;
                this.isSearchable = userSetting.isSearchable;
                this.isTimeSlot = userSetting.SlotDuration;
                this.calendarViewId = userSetting.calendarViewId;
                
            },
            (error) => { },
            () => {
            });

    }

    showNotifications() {
        this._notificationsStore.toggleVisibility();
    }

    // showSettingsDialog() {
    //     this.settingsDialogVisible = true;
    // }

    // closeDialog() {
    //     this.settingsDialogVisible = false;
    // }

    checkUncheck(event) {
        if (event == false) {
            this.isCalendarPublic = false;
            this.isSearchable = false;
        }

    }

    saveUserSettings() {
        let userSettingsValues = this.addUserSettings.value;
        let result;
        let userSetting = new UserSetting(
            {
                userId: this.userId,
                companyId: this.companyId,
                isPublic: this.isPublic,
                isCalendarPublic: this.isCalendarPublic,
                isSearchable: this.isSearchable,
                SlotDuration:this.isTimeSlot,
                calendarViewId:this.calendarViewId,
                preferredUIViewId: '1',
            }
        )
        this._progressBarService.show();
        result = this._userSettingStore.saveUserSetting(userSetting);
        result.subscribe(
            (response) => {
                let notification = new Notification({
                    'title': 'User setting saved successfully!',
                    'type': 'SUCCESS',
                    'createdAt': moment()
                });
                this._notificationsStore.addNotification(notification);
                this._notificationsService.success('Success!', 'User setting saved successfully!');
                // this._router.navigate(['/dashboard']);
            },
            (error) => {
                let errString = 'Unable to save user setting.';
                let notification = new Notification({
                    'messages': ErrorMessageFormatter.getErrorMessages(error, errString),
                    'type': 'ERROR',
                    'createdAt': moment()
                });  
                this._notificationsStore.addNotification(notification);
                this._notificationsService.error('Oh No!', ErrorMessageFormatter.getErrorMessages(error, errString));
                this._progressBarService.hide();
            },
            () => {
                this._progressBarService.hide();
            });

    }

     goBack(): void {
        this._router.navigate(['/dashboard']);
        
    }
}