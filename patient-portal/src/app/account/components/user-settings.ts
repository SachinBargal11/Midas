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
    calendarViewId = 1;
    preferredUIViewId = 1;
    isSaveProgress = false;
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
            calendarViewId: [''],
            preferredUIViewId: [''],
        })
        this.addUserSettingsControls = this.addUserSettings.controls;

    }

    ngOnInit() {
        this._userSettingStore.getPatientPersonalSettingByPatientId(this.userId)
            .subscribe((userSetting) => {
                this.userSetting = userSetting;
                this.calendarViewId = userSetting.calendarViewId;  
                this.preferredUIViewId = userSetting.preferredUIViewId;       
            },
            (error) => { },
            () => {
            });

    }

    showNotifications() {
        this._notificationsStore.toggleVisibility();
    }


    saveUserSettings() {
        let userSettingsValues = this.addUserSettings.value;
        let result;
        let userSetting = new UserSetting(
            {
                patientId: this.userId,
                preferredModeOfCommunication:null,
                isPushNotificationEnabled:null,
                calendarViewId:this.calendarViewId,
                preferredUIViewId:this.preferredUIViewId
            }
        )
        this._progressBarService.show();
        result = this._userSettingStore.savePatientPersonalSetting(userSetting);
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