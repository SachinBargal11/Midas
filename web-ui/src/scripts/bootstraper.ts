import {bootstrap} from '@angular/platform-browser-dynamic';
import {ROUTER_DIRECTIVES} from '@angular/router';
import {AppRoot} from '../components/AppRoot';
import { provide }           from '@angular/core';
import { LocationStrategy,
    HashLocationStrategy } from '@angular/common';
import { disableDeprecatedForms, provideForms } from '@angular/forms';
import {HTTP_PROVIDERS} from '@angular/http';

import {SessionStore} from '../stores/session-store';
import {AuthenticationService} from '../services/authentication-service';

import {UsersStore} from '../stores/users-store';
import {UsersService} from '../services/users-service';

import {PatientsStore} from '../stores/patients-store';
import {PatientsService} from '../services/patients-service';

import {NotificationsStore} from '../stores/notifications-store';
import {APP_ROUTER_PROVIDER} from '../routes/app-routes';
import {ValidateActiveSession} from '../routes/guards/validate-active-session';
import {ValidateInActiveSession} from '../routes/guards/validate-inactive-session';

import {enableProdMode} from '@angular/core';

enableProdMode();

bootstrap(AppRoot, [
    disableDeprecatedForms(),
    provideForms(),
    ROUTER_DIRECTIVES,
    HTTP_PROVIDERS,
    SessionStore,
    AuthenticationService,
    UsersService,
    UsersStore,
    PatientsService,
    PatientsStore,
    NotificationsStore,
    APP_ROUTER_PROVIDER,
    ValidateActiveSession,
    ValidateInActiveSession,
    provide(LocationStrategy,
        {
            useValue: [ROUTER_DIRECTIVES],
            useClass: HashLocationStrategy
        }
    )
])
    .catch((err: any) => console.error(err));
