import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { LazyLoadEvent, SelectItem } from 'primeng/primeng';
import { NotificationsStore } from '../../../commons/stores/notifications-store';
import { SessionStore } from '../../../commons/stores/session-store';
import { Notification } from '../../../commons/models/notification';
import * as moment from 'moment';
import * as _ from 'underscore';
import { Observable } from 'rxjs/Rx';
import { ProgressBarService } from '../../../commons/services/progress-bar-service';
import { NotificationsService } from 'angular2-notifications';
import { ErrorMessageFormatter } from '../../../commons/utils/ErrorMessageFormatter';
import { environment } from '../../../../environments/environment';
import { GeneralSetting } from '../../models/general-settings';
import { GeneralSettingStore } from '../../stores/general-settings-store';
import { MedicalProviderMasterStore } from '../../stores/medical-provider-master-store';

@Component({
    selector: 'general-settings',
    templateUrl: './account-general-settings.html'
})

export class AccountGeneralSettingComponent implements OnInit {
    private _url: string = `${environment.SERVICE_BASE_URL}`;
    displayToken: boolean = false;
    display: boolean = false;
    settingForm: FormGroup;
    settingFormControls;
    isSaveProgress = false;
    isTimeSlot = '30';
    companyId: number = this._sessionStore.session.currentCompany.id;
    generalSetting:GeneralSetting;
    otp: string;

    constructor(
        private _notificationsService: NotificationsService,
        private fb: FormBuilder,
        private _progressBarService: ProgressBarService,
        private _sessionStore: SessionStore,
        private _generalSettingStore: GeneralSettingStore,
        public _route: ActivatedRoute,
        private _router: Router,
        private _notificationsStore: NotificationsStore,
        private _medicalProviderMasterStore: MedicalProviderMasterStore,
    ) {
        this.settingForm = this.fb.group({
            roomTimeSlot: ['', Validators.required]
        })
        this.settingFormControls = this.settingForm.controls;
    }

    ngOnInit() {
        this._generalSettingStore.getGeneralSettingByCompanyId(this.companyId)
            .subscribe((generalSetting) => {
                this.generalSetting = generalSetting;
                this.isTimeSlot = String(this.generalSetting.slotDuration);
            },
            (error) => { },
            () => {
            });


    }

    showDialog() {
        this.generateToken();
        this.displayToken = true;
    }

    showHelpDialog() {
        this.display = true;
    }

    generateToken() {
        this._progressBarService.show();
        this._medicalProviderMasterStore.generateToken()
            .subscribe((data: any) => {
                this.otp = data.otp;
            },
            (error) => {
                this._progressBarService.hide();
            },
            () => {
                this._progressBarService.hide();
            });
    }


    save() {
        this.isSaveProgress = true;
        let settingFormValues = this.settingForm.value;
        let result;
        let generalSettings = new GeneralSetting({
            companyId: this._sessionStore.session.currentCompany.id,
            slotDuration: this.settingForm.value.roomTimeSlot
        });

        this._progressBarService.show();
        result = this._generalSettingStore.save(generalSettings);
        result.subscribe(
            (response) => {
                let notification = new Notification({
                    'title': 'Settings added successfully!',
                    'type': 'SUCCESS',
                    'createdAt': moment()
                });
                this._notificationsStore.addNotification(notification);
                this._notificationsService.success('Settings added successfully!.');
                this._router.navigate(['../../'], { relativeTo: this._route });
            },
            (error) => {
                let errString = 'Unable to add settings.';
                let notification = new Notification({
                    'messages': ErrorMessageFormatter.getErrorMessages(error, errString),
                    'type': 'ERROR',
                    'createdAt': moment()
                });
                this.isSaveProgress = false;
                this._notificationsStore.addNotification(notification);
                this._notificationsService.error('Oh No!', ErrorMessageFormatter.getErrorMessages(error, errString));
                this._progressBarService.hide();
            },
            () => {
                this.isSaveProgress = false;
                this._progressBarService.hide();
            });
    }
}