import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {LoaderComponent} from '../elements/loader';
import {AuthenticationService} from '../../services/authentication-service';
import {CORE_DIRECTIVES} from '@angular/common';
import {DROPDOWN_DIRECTIVES} from 'ng2-bootstrap';
import {SessionStore} from '../../stores/session-store';
import {NotificationsStore} from '../../stores/notifications-store';

@Component({
    selector: 'app-header',
    templateUrl: 'templates/elements/app-header.html',
    directives: [
        LoaderComponent, 
        DROPDOWN_DIRECTIVES, 
        CORE_DIRECTIVES],
    providers: [AuthenticationService]
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
        private _notificationsStore: NotificationsStore,
        private _sessionStore: SessionStore,
        private _router: Router
    ) {

    }

    ngOnInit() {
        if (this._sessionStore.isAuthenticated()) {
            this.user_name = this._sessionStore.session.user.displayName;
        } else {
            this._router.navigate(['/login']);
        }
    }

    logout() {
        this._sessionStore.logout();
        this._router.navigate(['/login']);
    }

    showNotifications() {
        this._notificationsStore.toggleVisibility();
    }
}