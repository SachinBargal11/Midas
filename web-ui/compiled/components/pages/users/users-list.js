System.register(['@angular/core', '@angular/router', '../../../stores/session-store', '../../../services/users-service', '../../../pipes/reverse-array-pipe', '../../../pipes/limit-array-pipe'], function(exports_1, context_1) {
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
    var core_1, router_1, session_store_1, users_service_1, reverse_array_pipe_1, limit_array_pipe_1;
    var UsersListComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (session_store_1_1) {
                session_store_1 = session_store_1_1;
            },
            function (users_service_1_1) {
                users_service_1 = users_service_1_1;
            },
            function (reverse_array_pipe_1_1) {
                reverse_array_pipe_1 = reverse_array_pipe_1_1;
            },
            function (limit_array_pipe_1_1) {
                limit_array_pipe_1 = limit_array_pipe_1_1;
            }],
        execute: function() {
            UsersListComponent = (function () {
                function UsersListComponent(_router, _usersService, _sessionStore) {
                    this._router = _router;
                    this._usersService = _usersService;
                    this._sessionStore = _sessionStore;
                }
                UsersListComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    var accountId = this._sessionStore.session.account_id;
                    var user = this._usersService.getUsers(accountId)
                        .subscribe(function (users) { return _this.users = users; });
                };
                UsersListComponent.prototype.selectUser = function (user) {
                    this._router.navigate(['/users/update/' + user.user.id]);
                };
                UsersListComponent = __decorate([
                    core_1.Component({
                        selector: 'users-list',
                        templateUrl: 'templates/pages/users/users-list.html',
                        directives: [
                            router_1.ROUTER_DIRECTIVES
                        ],
                        pipes: [reverse_array_pipe_1.ReversePipe, limit_array_pipe_1.LimitPipe],
                        providers: [users_service_1.UsersService]
                    }), 
                    __metadata('design:paramtypes', [router_1.Router, users_service_1.UsersService, session_store_1.SessionStore])
                ], UsersListComponent);
                return UsersListComponent;
            }());
            exports_1("UsersListComponent", UsersListComponent);
        }
    }
});
//# sourceMappingURL=users-list.js.map