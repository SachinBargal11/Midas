import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ProvidersStore} from '../../../stores/providers-store';
import {Provider} from '../../../models/provider';

@Component({
    selector: 'providers-list',
    templateUrl: 'templates/pages/providers/providers-list.html'
})


export class ProvidersListComponent implements OnInit {
    providers: Provider[];
    providersLoading;
    constructor(
        private _router: Router,
        private _providersStore: ProvidersStore
    ) {
    }

    ngOnInit() {
        this.loadProviders();
    }

    loadProviders() {
        this.providersLoading = true;
        this._providersStore.getProviders()
                .subscribe(providers => { this.providers = providers; },
                null,
                  () => { this.providersLoading = false; });
    }

}