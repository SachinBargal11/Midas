import {Component, OnInit, ElementRef} from '@angular/core';
import {Router} from '@angular/router';
import {ProvidersService} from '../../../services/providers-service';
import {DataTable} from 'primeng/primeng';
import {SessionStore} from '../../../stores/session-store';
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