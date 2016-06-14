import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router-deprecated';
import {LoaderComponent} from '../elements/loader';
import {AuthenticationService} from '../../services/authentication';
import {SimpleNotificationsComponent, NotificationsService} from 'angular2-notifications';
import {CORE_DIRECTIVES} from '@angular/common';
import {DROPDOWN_DIRECTIVES} from 'ng2-bootstrap';

@Component({
    selector: 'app-header',
    templateUrl: 'templates/elements/app-header.html',
    directives: [LoaderComponent, SimpleNotificationsComponent, DROPDOWN_DIRECTIVES, CORE_DIRECTIVES],
    providers: [AuthenticationService, NotificationsService]    
})

export class AppHeaderComponent implements OnInit {

    user_name;
    disabled: boolean = false;
    status: { isopen: boolean } = { isopen: false };

    toggleDropdown($event: MouseEvent): void {
        $event.preventDefault();
        $event.stopPropagation();
        this.status.isopen = !this.status.isopen;
    }

    options = {
        timeOut: 5000,
        showProgressBar: true,
        pauseOnHover: false,
        clickToClose: false,
        maxLength: 10
    };
    constructor(
        private _authenticationService: AuthenticationService,
        private _notificationsService: NotificationsService,
        private _router: Router
    ) {

    }

    ngOnInit() {
        if (window.localStorage.hasOwnProperty('session_user_name')) {
            this.user_name = window.localStorage.getItem('session_user_name');
        } else {
            this._router.navigate(['Login']);
        }
    }

    logout() {
        window.localStorage.removeItem('session_user_name');
        this._router.navigate(['Login']);
    }
}