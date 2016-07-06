import {bootstrap} from '@angular/platform-browser-dynamic';
import {ROUTER_DIRECTIVES} from '@angular/router';
import {AppRoot} from '../components/AppRoot';
import { provide }           from '@angular/core';
import { LocationStrategy,
    HashLocationStrategy } from '@angular/common';
import {HTTP_PROVIDERS} from '@angular/http';

import {SessionStore} from '../stores/session-store';
import {AuthenticationService} from '../services/authentication-service';

import {PatientsStore} from '../stores/patients-store';
import {PatientsService} from '../services/patients-service';

import {NotificationsStore} from '../stores/notifications-store';
import {APP_ROUTER_PROVIDER} from '../routes/app-routes';

bootstrap(AppRoot, [
    ROUTER_DIRECTIVES,
    HTTP_PROVIDERS,
    SessionStore,
    AuthenticationService,
    PatientsService,
    PatientsStore,
    NotificationsStore,
    APP_ROUTER_PROVIDER,
    provide(LocationStrategy,
        {
            useValue: [ROUTER_DIRECTIVES],
            useClass: HashLocationStrategy            
        }
    )
    ]);
