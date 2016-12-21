import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../services/authentication-service';
import {SessionStore} from '../../stores/session-store';
import {NotificationsStore} from '../../stores/notifications-store';

@Component({
    selector: 'app-header',
    templateUrl: 'templates/elements/app-header.html',
    providers: [AuthenticationService]
})

export class AppHeaderComponent implements OnInit {

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
        public sessionStore: SessionStore,
        private _router: Router
    ) {

    }

    ngOnInit() {
        // if (this._sessionStore.isAuthenticated()) {
        //     this.user_name = this._sessionStore.session.displayName;
        // } else {
        //     this._router.navigate(['/login']);
        // }
    }

    logout() {
        this.sessionStore.logout();
        this._router.navigate(['/login']);
    }

    changePassword() {
        this._router.navigate(['/change-password']);
    }

    showNotifications() {
        this._notificationsStore.toggleVisibility();
    }

    selectCurrentCompany() {
        // debugger;
    }
}