import { Component, OnInit, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { SessionStore } from '../../../stores/session-store';
import { NotificationsStore } from '../../../stores/notifications-store';

@Component({
    selector: 'settings',
    templateUrl: 'templates/pages/location-management/settings.html',
    providers: [FormBuilder],
})

export class SettingsComponent implements OnInit {
    options = {
        timeOut: 3000,
        showProgressBar: true,
        pauseOnHover: false,
        clickToClose: false
    };
    settingsform: FormGroup;
    settingsformControls;
    isSaveProgress = false;

    constructor(
        private fb: FormBuilder,
        private _router: Router,
        private _notificationsStore: NotificationsStore,
        private _sessionStore: SessionStore,
        private _elRef: ElementRef
    ) {
        this.settingsform = this.fb.group({
            services: [''],
            primaryProvider: [''],
            primaryOffice: ['']
        });

        this.settingsformControls = this.settingsform.controls;
    }

    ngOnInit() {
    }


    save() {
    }

}
