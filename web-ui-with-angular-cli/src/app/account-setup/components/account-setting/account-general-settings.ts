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

@Component({
    selector: 'general-settings',
    templateUrl: './account-general-settings.html'
})

export class AccountGeneralSettingComponent implements OnInit {
    private _url: string = `${environment.SERVICE_BASE_URL}`;
    settingForm: FormGroup;
    settingFormControls;
    isSaveProgress = false;
    isTimeSlot = 30;
    constructor(
        private _notificationsService: NotificationsService,
        private fb: FormBuilder,
        private _progressBarService: ProgressBarService,
        private _sessionStore: SessionStore,
        private _generalSettingStore: GeneralSettingStore,
        public _route: ActivatedRoute,
        private _router: Router,
    ) {
        this.settingForm = this.fb.group({
            roomTimeSlot: ['', Validators.required]
        })
        this.settingFormControls = this.settingForm.controls;
    }

    ngOnInit() {

    }

    save() {

        this.isSaveProgress = true;
        let settingFormValues = this.settingForm.value;
        let result;
        let generalSettings = new GeneralSetting({
            companyId: this._sessionStore.session.currentCompany.id,
            slotDuration: this.settingForm.value.roomTimeSlot
        })
        result = this._generalSettingStore.save(generalSettings);
        result.subscribe(
            (response) => {
                this._notificationsService.success('Settings saved successfully!.');
                this._router.navigate(['../../'], { relativeTo: this._route });
            },
            (error) => {
                this.isSaveProgress = false;
                let errString = 'Unable to save Settings.';
                this._notificationsService.error('Oh No!', ErrorMessageFormatter.getErrorMessages(error, errString));
            },
            () => {
                this.isSaveProgress = false;
            });
    }
}