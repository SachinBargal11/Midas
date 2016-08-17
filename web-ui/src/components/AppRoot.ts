import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, ROUTER_DIRECTIVES} from '@angular/router';
import {Location} from '@angular/common';
import {LoginComponent} from './pages/login';
import {SignupComponent} from './pages/signup';
import {DashboardComponent} from './pages/dashboard';
import {PatientsShellComponent} from './pages/patients/patients-shell';
import {AppHeaderComponent} from './elements/app-header';
import {MainNavComponent} from './elements/main-nav';
import {SessionStore} from '../stores/session-store';
import {NotificationComponent} from './elements/notification';
import {NotificationsStore} from '../stores/notifications-store';
import {ChangePasswordComponent} from './pages/change-password';
import {AddUserComponent} from './pages/users/add-user';
import {UpdateUserComponent} from './pages/users/update-user';
import {UsersListComponent} from './pages/users/users-list';
import {AddProviderComponent} from './pages/providers/add-provider';
import {ProvidersListComponent} from './pages/providers/providers-list';
import {AddMedicalFacilityComponent} from './pages/medical-facilities/add-medical-facility';
import {MedicalFacilitiesListComponent} from './pages/medical-facilities/medical-facilities-list';
import {StatesStore} from '../stores/states-store';
import {StateService} from '../services/state-service';

@Component({
    selector: 'app-root',
    templateUrl: 'templates/AppRoot.html',
    directives: [
        ROUTER_DIRECTIVES,
        AppHeaderComponent,
        MainNavComponent,
        NotificationComponent
    ],
    providers:[StatesStore, StateService],
     precompile: [LoginComponent, 
                  SignupComponent, 
                  ChangePasswordComponent, 
                  AddUserComponent, 
                  UpdateUserComponent,
                  UsersListComponent,
                  DashboardComponent,
                  AddProviderComponent,
                  ProvidersListComponent,
                  AddMedicalFacilityComponent,
                  MedicalFacilitiesListComponent,
                  PatientsShellComponent
     ]
})

export class AppRoot implements OnInit {

    constructor(
        private _router: Router,
        private _sessionStore: SessionStore,
        private _notificationsStore: NotificationsStore,
        private _statesStore: StatesStore
    ) {

    }

    ngOnInit() {
        
        this._sessionStore.authenticate().subscribe(
            (response) => {

            },
            error => {
                this._router.navigate(['/login']);
            }
           
        ),   
          
        this._statesStore.getStates();
    }
}
