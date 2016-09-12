import {Component, OnInit, ElementRef} from '@angular/core';
import {ROUTER_DIRECTIVES, Router} from '@angular/router';
import {ProvidersService} from '../../../services/providers-service';
import {ReversePipe} from '../../../pipes/reverse-array-pipe';
import {LimitPipe} from '../../../pipes/limit-array-pipe';
import {DataTable} from 'primeng/primeng';
import {SessionStore} from '../../../stores/session-store';
import {Provider} from '../../../models/provider';

@Component({
    selector: 'providers-list',
    templateUrl: 'templates/pages/providers/providers-list.html',
    directives: [
        ROUTER_DIRECTIVES
    ],
    providers: [ProvidersService],
    pipes: [ReversePipe, LimitPipe]
})


export class ProvidersListComponent implements OnInit {
    providers: Provider[];
    constructor(
        private _router: Router,
        private _providersService: ProvidersService
    ) {
    }

    ngOnInit() {
            this._providersService.getProviders()
                .subscribe(providers => this.providers = providers);
    }

}