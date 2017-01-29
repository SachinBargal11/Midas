import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../account/services/authentication-service';
import { SessionStore } from '../../commons/stores/session-store';
import { NotificationsStore } from '../../commons/stores/notifications-store';

@Component({
    selector: 'app-header',
    templateUrl: './app-header.html'
})

export class AppHeaderComponent implements OnInit {

    disabled: boolean = false;
    status: { isopen: boolean } = { isopen: false };
    menu_right_opened: boolean = false;

    toggleDropdown($event: MouseEvent): void {
        $event.preventDefault();
        $event.stopPropagation();
        this.status.isopen = !this.status.isopen;
    }

    constructor(
        private _authenticationService: AuthenticationService,
        private _notificationsStore: NotificationsStore,
        public sessionStore: SessionStore,
        private _router: Router
    ) {

    }

    ngOnInit() {
    }

    onBurgerClick() {
        if (this.menu_right_opened) {
            this.menu_right_opened = false;
            document.getElementsByTagName('body')[0].classList.remove('menu-right-opened');
            document.getElementsByTagName('html')[0].style.overflow = 'auto';
        } else {
            this.menu_right_opened = true;
            document.getElementsByTagName('body')[0].classList.remove('menu-left-opened');
            document.getElementsByTagName('body')[0].classList.add('menu-right-opened');
            document.getElementsByTagName('html')[0].style.overflow = 'hidden';
        }
    }

    hideMobileMenu() {
        document.getElementsByTagName('body')[0].classList.remove('menu-right-opened');
        document.getElementsByTagName('html')[0].style.overflow = 'auto';
    }


    logout() {
        this.sessionStore.logout();
        this._router.navigate(['/account/login']);
    }

    changePassword() {
        this._router.navigate(['/account/change-password']);
    }

    showNotifications() {
        this._notificationsStore.toggleVisibility();
    }

}