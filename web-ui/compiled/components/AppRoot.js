System.register(['@angular/core', '@angular/router', '@angular/common', './elements/app-header', './elements/main-nav', '../stores/session-store', './elements/notification', '../stores/notifications-store'], function(exports_1, context_1) {
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
    var core_1, router_1, common_1, app_header_1, main_nav_1, session_store_1, notification_1, notifications_store_1;
    var AppRoot;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (app_header_1_1) {
                app_header_1 = app_header_1_1;
            },
            function (main_nav_1_1) {
                main_nav_1 = main_nav_1_1;
            },
            function (session_store_1_1) {
                session_store_1 = session_store_1_1;
            },
            function (notification_1_1) {
                notification_1 = notification_1_1;
            },
            function (notifications_store_1_1) {
                notifications_store_1 = notifications_store_1_1;
            }],
        execute: function() {
            AppRoot = (function () {
                function AppRoot(_router, _location, _activatedRoute, _sessionStore, _notificationsStore) {
                    this._router = _router;
                    this._location = _location;
                    this._activatedRoute = _activatedRoute;
                    this._sessionStore = _sessionStore;
                    this._notificationsStore = _notificationsStore;
                    this.currentUrl = '';
                }
                AppRoot.prototype.ngOnInit = function () {
                    var _this = this;
                    this._activatedRoute.params.subscribe(function (params) {
                        // console.log(params);
                    }, function (error) { return console.log(error); });
                    this._sessionStore.authenticate().subscribe(function (response) {
                    }, function (error) {
                        _this._router.navigate(['/login']);
                    });
                };
                AppRoot.prototype.isCurrentRoute = function (route) {
                    return this.currentUrl === route;
                };
                AppRoot = __decorate([
                    core_1.Component({
                        selector: 'app-root',
                        templateUrl: 'templates/AppRoot.html',
                        directives: [
                            router_1.ROUTER_DIRECTIVES,
                            app_header_1.AppHeaderComponent,
                            main_nav_1.MainNavComponent,
                            notification_1.NotificationComponent
                        ]
                    }), 
                    __metadata('design:paramtypes', [router_1.Router, common_1.Location, router_1.ActivatedRoute, session_store_1.SessionStore, notifications_store_1.NotificationsStore])
                ], AppRoot);
                return AppRoot;
            }());
            exports_1("AppRoot", AppRoot);
        }
    }
});
//# sourceMappingURL=AppRoot.js.map