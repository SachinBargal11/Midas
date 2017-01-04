import {Component, OnInit, ElementRef} from '@angular/core';
import {Router} from '@angular/router';
import {Validators, FormGroup, FormBuilder} from '@angular/forms';
import { ErrorMessageFormatter } from '../../../utils/ErrorMessageFormatter';
import {ProvidersStore} from '../../../stores/providers-store';
import {Provider} from '../../../models/provider';
import {ProvidersService} from '../../../services/providers-service';
import {SessionStore} from '../../../stores/session-store';
import {NotificationsStore} from '../../../stores/notifications-store';
import {Notification} from '../../../models/notification';
import moment from 'moment';

@Component({
    selector: 'add-provider',
    templateUrl: 'templates/pages/providers/add-provider.html'
})

export class AddProviderComponent implements OnInit {
    options = {
        timeOut: 3000,
        showProgressBar: true,
        pauseOnHover: false,
        clickToClose: false,
        maxLength: 10
    };
    providerform: FormGroup;
    providerformControls;
    isSaveProviderProgress = false;

    constructor(
        private _providerService: ProvidersService,
        private _providersStore: ProvidersStore,
        private fb: FormBuilder,
        private _router: Router,
        private _notificationsStore: NotificationsStore,
        private _sessionStore: SessionStore,
        private _elRef: ElementRef
    ) {
        this.providerform = this.fb.group({
            provider: this.fb.group({
                name: ['', Validators.required],
                npi: ['', Validators.required],
                federalTaxID: ['', Validators.required],
                prefix: ['', Validators.required]
            })
        });

        this.providerformControls = this.providerform.controls;
    }

    ngOnInit() {
    }


    saveProvider() {
        let providerFormValues = this.providerform.value;
        let providerDetail = new Provider({
            provider: {
                name: providerFormValues.provider.name,
                npi: providerFormValues.provider.npi,
                federalTaxID: providerFormValues.provider.federalTaxID,
                prefix: providerFormValues.provider.prefix
            }
        });
        this.isSaveProviderProgress = true;
        let result;

        // result = this._providersStore.addProvider(providerDetail);
        result = this._providerService.addProvider(providerDetail);
        result.subscribe(
            (response) => {
                let notification = new Notification({
                    'title': 'Provider added successfully!',
                    'type': 'SUCCESS',
                    'createdAt': moment()
                });
                this._notificationsStore.addNotification(notification);
                this._router.navigate(['/providers']);
            },
            (error) => {
                let errString = 'Unable to add Provider.';
                let notification = new Notification({
                    'messages': ErrorMessageFormatter.getErrorMessages(error, errString),
                    'type': 'ERROR',
                    'createdAt': moment()
                });
                this.isSaveProviderProgress = false;
                this._notificationsStore.addNotification(notification);
            },
            () => {
                this.isSaveProviderProgress = false;
            });

    }

}
