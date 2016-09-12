import {Component, OnInit, ElementRef} from '@angular/core';
import {FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES, Validators, FormControl, FormGroup, FormBuilder, AbstractControl} from '@angular/forms';
import {ROUTER_DIRECTIVES, Router} from '@angular/router';
import {AppValidators} from '../../../utils/AppValidators';
import {LoaderComponent} from '../../elements/loader';
import {ProvidersStore} from '../../../stores/providers-store';
import {Provider} from '../../../models/provider';
import {ProvidersService} from '../../../services/providers-service';
import $ from 'jquery';
import {SessionStore} from '../../../stores/session-store';
import {NotificationsStore} from '../../../stores/notifications-store';
import {Notification} from '../../../models/notification';
import moment from 'moment';
import {Calendar, InputMask, AutoComplete, SelectItem} from 'primeng/primeng';
import {HTTP_PROVIDERS}    from '@angular/http';
import {LimitPipe} from '../../../pipes/limit-array-pipe';

@Component({
    selector: 'add-provider',
    templateUrl: 'templates/pages/providers/add-provider.html',
    directives: [FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES, ROUTER_DIRECTIVES, LoaderComponent, Calendar, InputMask, AutoComplete],
    providers: [HTTP_PROVIDERS, ProvidersService, ProvidersStore, FormBuilder],
    pipes: [LimitPipe]
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
                let notification = new Notification({
                    'title': 'Unable to add Provider.',
                    'type': 'ERROR',
                    'createdAt': moment()
                });
                this._notificationsStore.addNotification(notification);
            },
            () => {
                this.isSaveProviderProgress = false;
            });

    }

}
