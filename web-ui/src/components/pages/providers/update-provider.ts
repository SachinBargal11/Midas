import {Component, OnInit, ElementRef} from '@angular/core';
import {Validators, FormGroup, FormBuilder} from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';
import {ProvidersStore} from '../../../stores/providers-store';
import {Provider} from '../../../models/provider';
import {ProvidersService} from '../../../services/providers-service';
import {SessionStore} from '../../../stores/session-store';
import {NotificationsStore} from '../../../stores/notifications-store';
import {Notification} from '../../../models/notification';
import moment from 'moment';

@Component({
    selector: 'update-provider',
    templateUrl: 'templates/pages/providers/update-provider.html',
    providers: [ProvidersService, ProvidersStore, FormBuilder]
})

export class UpdateProviderComponent implements OnInit {
    provider = new Provider({});
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
        private _route: ActivatedRoute,
        private _notificationsStore: NotificationsStore,
        private _sessionStore: SessionStore,
        private _elRef: ElementRef
    ) {
        this._route.params.subscribe((routeParams: any) => {
            let providerId: number = parseInt(routeParams.id);
            let result = this._providersStore.fetchProviderById(providerId);
            result.subscribe(
                (provider: Provider) => {
                   this.provider = provider;
                },
                (error) => {
                    this._router.navigate(['/providers']);
                },
                () => {
                });
        });

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


    updateProvider() {
        let providerFormValues = this.providerform.value;
        let providerDetail = new Provider({
            provider: {
                id: this.provider.id,
                name: providerFormValues.provider.name,
                npi: providerFormValues.provider.npi,
                federalTaxID: providerFormValues.provider.federalTaxID,
                prefix: providerFormValues.provider.prefix
            }
        });
        this.isSaveProviderProgress = true;
        let result;

        result = this._providersStore.updateProvider(providerDetail);
        // result = this._providerService.addProvider(providerDetail);
        result.subscribe(
            (response) => {
                let notification = new Notification({
                    'title': 'Provider updated successfully!',
                    'type': 'SUCCESS',
                    'createdAt': moment()
                });
                this._notificationsStore.addNotification(notification);
                this._router.navigate(['/providers']);
            },
            (error) => {
                let notification = new Notification({
                    'title': 'Unable to update Provider.',
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
