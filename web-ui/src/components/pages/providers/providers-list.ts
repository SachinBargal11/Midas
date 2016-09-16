import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ProvidersService} from '../../../services/providers-service';
import {Provider} from '../../../models/provider';

@Component({
    selector: 'providers-list',
    templateUrl: 'templates/pages/providers/providers-list.html',
    providers: [ProvidersService]
})


export class ProvidersListComponent implements OnInit {
    providers: Provider[];
    providersLoading;
    constructor(
        private _router: Router,
        private _providersService: ProvidersService
    ) {
    }

    ngOnInit() {
        this.loadProviders();
    }

    loadProviders() {
        this.providersLoading = true;
        this._providersService.getProviders()
                .subscribe(providers => { this.providers = providers; },
                null,
                  () => { this.providersLoading = false; });
    }

}