import {bootstrap} from '@angular/platform-browser-dynamic';
import {ROUTER_PROVIDERS} from '@angular/router-deprecated';
import {AppRoot} from '../components/AppRoot';
import { provide }           from '@angular/core';
import { LocationStrategy,
    HashLocationStrategy } from '@angular/common';
import {HTTP_PROVIDERS} from '@angular/http';

import {SessionStore} from '../stores/session-store';
import {AuthenticationService} from '../services/authentication-service';

import {PatientsStore} from '../stores/patients-store';
import {PatientsService} from '../services/patients-service';

bootstrap(AppRoot, [
    ROUTER_PROVIDERS,
    HTTP_PROVIDERS,
    SessionStore,
    AuthenticationService,
    PatientsService,
    PatientsStore,
    provide(LocationStrategy,
        {
            useClass: HashLocationStrategy
        }
    )]);
