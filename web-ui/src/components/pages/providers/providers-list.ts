import {Component, OnInit, ElementRef} from '@angular/core';
import {ROUTER_DIRECTIVES, Router} from '@angular/router';
import {ProvidersStore} from '../../../stores/providers-store';
import {ProvidersService} from '../../../services/providers-service';
import {ReversePipe} from '../../../pipes/reverse-array-pipe';
import {LimitPipe} from '../../../pipes/limit-array-pipe';

@Component({
    selector: 'providers-list',
    templateUrl: 'templates/pages/providers/providers-list.html',
    directives: [
        ROUTER_DIRECTIVES
    ],
    providers: [ProvidersStore, ProvidersService],
    pipes: [ReversePipe, LimitPipe]
})


export class ProvidersListComponent implements OnInit {
    providers: any[];
    constructor(
        private _router: Router,
        private _providersStore: ProvidersStore,
        private _providersService: ProvidersService
    ) {
    }

    ngOnInit() {
            this._providersService.getProviders()
                .subscribe(providers => this.providers = providers);
    }

}