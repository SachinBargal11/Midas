import { Component, OnInit, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import * as moment from 'moment';
import { NotificationsService } from 'angular2-notifications';
import { ErrorMessageFormatter } from '../../../commons/utils/ErrorMessageFormatter';
import { SpecialityDetailsStore } from '../../stores/speciality-details-store';
import { AppValidators } from '../../../commons/utils/AppValidators';

import { NotificationsStore } from '../../../commons/stores/notifications-store';
import { Notification } from '../../../commons/models/notification';
import { ProgressBarService } from '../../../commons/services/progress-bar-service';
import { SessionStore } from '../../../commons/stores/session-store';
import { MedicalProviderMasterStore } from '../../stores/medical-provider-master-store';

@Component({
    selector: 'search-prefered-providers',
    templateUrl: './search-preferred-providers.html'
})


export class SearchPreferedProvidersComponent {
    searchForm: FormGroup;
    searchFormControls: any;
    doYouNeedTransportion = 0;
    gender = 'null';
    handicapRamp = 0;
    stairsToOffice = 0;
    publicTransportNearOffice = 0;
    multipleDoctors = 0;
    searchDoctors = [];
    @Output() closeDialogBox: EventEmitter<any> = new EventEmitter();
    

    options = {
        timeOut: 3000,
        showProgressBar: true,
        pauseOnHover: false,
        clickToClose: false
    };

    constructor(
        public _route: ActivatedRoute,
        public _router: Router,
        private fb: FormBuilder,
        private _notificationsStore: NotificationsStore,
        private _notificationsService: NotificationsService,
        private _progressBarService: ProgressBarService,
        private _sessionStore: SessionStore,
        private _medicalProviderMasterStore: MedicalProviderMasterStore,

    ) {
        this.searchForm = this.fb.group({
            doYouNeedTransportion: [''],
            gender: [''],
            handicapRamp: [''],
            stairsToOffice: [''],
            publicTransportNearOffice: [''],
            multipleDoctors: [''],
           
        });

        this.searchFormControls = this.searchForm.controls;
    }
    ngOnInit() {
    }

    closeDialog() {
        this.closeDialogBox.emit();
    }

    search() {
        let searchFormControls = this.searchForm.value;
        let searchDetail = {
            doYouNeedTransportion: parseInt(searchFormControls.doYouNeedTransportion),
            genderId: searchFormControls.gender == 'null' ? null : parseInt(searchFormControls.gender),
            handicapRamp: parseInt(searchFormControls.handicapRamp),
            stairsToOffice: parseInt(searchFormControls.stairsToOffice),
            publicTransportNearOffice: parseInt(searchFormControls.publicTransportNearOffice) ? true : false,
            multipleDoctors: parseInt(searchFormControls.multipleDoctors) ? true : false,
            availableFromDateTime:null,
            availableToDateTime:null,
            currentCompanyId:this._sessionStore.session.currentCompany.id
        
        };
        this._progressBarService.show();
        let result = this._medicalProviderMasterStore.searchDoctors(searchDetail);
        result.subscribe(
            (response) => {
                this.searchDoctors = response;
                let notification = new Notification({
                    'title': 'Search for doctors completed successfully!',
                    'type': 'SUCCESS',
                    'createdAt': moment()
                });
                this._notificationsStore.addNotification(notification);
                // this._router.navigate(['../'], { relativeTo: this._route });
            },
            (error) => {
                let errString = 'Unable to search doctors.';
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
}