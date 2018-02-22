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
    companyId: number = this._sessionStore.session.currentCompany.id;
    otp: string;

    constructor(
        private _notificationsService: NotificationsService,
        private fb: FormBuilder,
        private _progressBarService: ProgressBarService,
        private _sessionStore: SessionStore,
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
    }
}