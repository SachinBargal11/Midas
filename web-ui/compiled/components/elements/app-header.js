System.register(['@angular/core', '@angular/router', '../elements/loader', '../../services/authentication-service', '@angular/common', 'ng2-bootstrap', '../../stores/session-store', '../../stores/notifications-store'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, router_1, loader_1, authentication_service_1, common_1, ng2_bootstrap_1, session_store_1, notifications_store_1;
    var AppHeaderComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (loader_1_1) {
                loader_1 = loader_1_1;
            },
            function (authentication_service_1_1) {
                authentication_service_1 = authentication_service_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (ng2_bootstrap_1_1) {
                ng2_bootstrap_1 = ng2_bootstrap_1_1;
            },
            function (session_store_1_1) {
                session_store_1 = session_store_1_1;
            },
            function (notifications_store_1_1) {
                notifications_store_1 = notifications_store_1_1;
            }],
        execute: function() {
            AppHeaderComponent = (function () {
                function AppHeaderComponent(_authenticationService, _notificationsStore, _sessionStore, _router) {
                    this._authenticationService = _authenticationService;
                    this._notificationsStore = _notificationsStore;
                    this._sessionStore = _sessionStore;
                    this._router = _router;
                    this.disabled = false;
                    this.status = { isopen: false };
                    this.options = {
                        timeOut: 5000,
                        showProgressBar: true,
                        pauseOnHover: false,
                        clickToClose: false,
                        maxLength: 10
                    };
                }
                AppHeaderComponent.prototype.toggleDropdown = function ($event) {
                    $event.preventDefault();
                    $event.stopPropagation();
                    this.status.isopen = !this.status.isopen;
                };
                AppHeaderComponent.prototype.ngOnInit = function () {
                    if (this._sessionStore.isAuthenticated()) {
                        this.user_name = this._sessionStore.session.user.displayName;
                    }
                    else {
                        this._router.navigate(['/login']);
                    }
                };
                AppHeaderComponent.prototype.logout = function () {
                    this._sessionStore.logout();
                    this._router.navigate(['/login']);
                };
                AppHeaderComponent.prototype.showNotifications = function () {
                    this._notificationsStore.toggleVisibility();
                };
                AppHeaderComponent = __decorate([
                    core_1.Component({
                        selector: 'app-header',
                        templateUrl: 'templates/elements/app-header.html',
                        directives: [
                            loader_1.LoaderComponent,
                            ng2_bootstrap_1.DROPDOWN_DIRECTIVES,
                            common_1.CORE_DIRECTIVES],
                        providers: [authentication_service_1.AuthenticationService]
                    }), 
                    __metadata('design:paramtypes', [authentication_service_1.AuthenticationService, notifications_store_1.NotificationsStore, session_store_1.SessionStore, router_1.Router])
                ], AppHeaderComponent);
                return AppHeaderComponent;
            }());
            exports_1("AppHeaderComponent", AppHeaderComponent);
        }
    }
});
//# sourceMappingURL=app-header.js.map