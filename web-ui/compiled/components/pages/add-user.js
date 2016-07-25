System.register(['@angular/core', '@angular/forms', '@angular/router', '../../utils/AppValidators', '../elements/loader', '../../stores/sub-users-store', '../../models/sub-user', '../../stores/session-store', '../../stores/notifications-store', '../../models/notification', 'moment'], function(exports_1, context_1) {
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
    var core_1, forms_1, router_1, AppValidators_1, loader_1, sub_users_store_1, sub_user_1, session_store_1, notifications_store_1, notification_1, moment_1;
    var AddUserComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (forms_1_1) {
                forms_1 = forms_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (AppValidators_1_1) {
                AppValidators_1 = AppValidators_1_1;
            },
            function (loader_1_1) {
                loader_1 = loader_1_1;
            },
            function (sub_users_store_1_1) {
                sub_users_store_1 = sub_users_store_1_1;
            },
            function (sub_user_1_1) {
                sub_user_1 = sub_user_1_1;
            },
            function (session_store_1_1) {
                session_store_1 = session_store_1_1;
            },
            function (notifications_store_1_1) {
                notifications_store_1 = notifications_store_1_1;
            },
            function (notification_1_1) {
                notification_1 = notification_1_1;
            },
            function (moment_1_1) {
                moment_1 = moment_1_1;
            }],
        execute: function() {
            AddUserComponent = (function () {
                function AddUserComponent(fb, _router, _notificationsStore, _sessionStore, _subusersStore, _elRef) {
                    this.fb = fb;
                    this._router = _router;
                    this._notificationsStore = _notificationsStore;
                    this._sessionStore = _sessionStore;
                    this._subusersStore = _subusersStore;
                    this._elRef = _elRef;
                    this.subuser = new sub_user_1.SubUser({
                        'firstname': '',
                        'lastname': '',
                        'email': '',
                        'mobileNo': '',
                        'address': '',
                    });
                    this.options = {
                        timeOut: 3000,
                        showProgressBar: true,
                        pauseOnHover: false,
                        clickToClose: false,
                        maxLength: 10
                    };
                    this.isSaveSubUserProgress = false;
                    this.subuserform = this.fb.group({
                        firstname: ['', forms_1.Validators.required],
                        lastname: ['', forms_1.Validators.required],
                        email: ['', [forms_1.Validators.required, AppValidators_1.AppValidators.emailValidator]],
                        mobileNo: ['', [forms_1.Validators.required, AppValidators_1.AppValidators.mobileNoValidator]],
                        address: [''],
                    });
                    this.subuserformControls = this.subuserform.controls;
                }
                AddUserComponent.prototype.ngOnInit = function () {
                };
                AddUserComponent.prototype.saveSubUser = function () {
                    var _this = this;
                    this.isSaveSubUserProgress = true;
                    var result;
                    var subuser = new sub_user_1.SubUser({
                        'firstname': this.subuserform.value.firstname,
                        'lastname': this.subuserform.value.lastname,
                        'email': this.subuserform.value.email,
                        'mobileNo': this.subuserform.value.mobileNo,
                        'address': this.subuserform.value.address,
                        'createdUser': this._sessionStore.session.user.id
                    });
                    result = this._subusersStore.addSubUser(subuser);
                    result.subscribe(function (response) {
                        var notification = new notification_1.Notification({
                            'title': 'User added successfully!',
                            'type': 'SUCCESS',
                            'createdAt': moment_1.default()
                        });
                        _this._notificationsStore.addNotification(notification);
                        _this._router.navigate(['/users/add']);
                    }, function (error) {
                        var notification = new notification_1.Notification({
                            'title': 'Unable to add user.',
                            'type': 'ERROR',
                            'createdAt': moment_1.default()
                        });
                        _this._notificationsStore.addNotification(notification);
                    }, function () {
                        _this.isSaveSubUserProgress = false;
                    });
                };
                AddUserComponent = __decorate([
                    core_1.Component({
                        selector: 'sub-user',
                        templateUrl: 'templates/pages/add-sub-user.html',
                        directives: [forms_1.FORM_DIRECTIVES, forms_1.REACTIVE_FORM_DIRECTIVES, router_1.ROUTER_DIRECTIVES, loader_1.LoaderComponent]
                    }), 
                    __metadata('design:paramtypes', [forms_1.FormBuilder, router_1.Router, notifications_store_1.NotificationsStore, session_store_1.SessionStore, sub_users_store_1.SubUsersStore, core_1.ElementRef])
                ], AddUserComponent);
                return AddUserComponent;
            }());
            exports_1("AddUserComponent", AddUserComponent);
        }
    }
});
//# sourceMappingURL=add-user.js.map