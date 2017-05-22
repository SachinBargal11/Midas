import { Component, OnInit } from '@angular/core';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
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

@Component({
    selector: 'general-settings',
    templateUrl: './account-general-settings.html'
})

export class AccountGeneralSettingComponent implements OnInit {
    private _url: string = `${environment.SERVICE_BASE_URL}`;
    settingForm: FormGroup;
    settingFormControls;
    isSaveProgress = false;
    constructor(
        private _notificationsService: NotificationsService,
        private fb: FormBuilder,
        private _progressBarService: ProgressBarService,
    ) {
        this.settingForm = this.fb.group({
            timeSlot: ['', Validators.required]
        })
        this.settingFormControls = this.settingFormControls;
    }

    ngOnInit() {

    }

    save() {
        this.isSaveProgress = true;
        let settingFormValues = this.settingForm.value;
        let result;
    }
}