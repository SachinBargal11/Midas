System.register(['@angular/core', '@angular/forms', '@angular/router', 'ng2-bootstrap', '../../utils/AppValidators', '../elements/loader', '../../stores/users-store', '../../models/user', '../../models/contact', '../../models/address', '../../stores/session-store', '../../stores/notifications-store', '../../models/notification', 'moment', 'primeng/primeng'], function(exports_1, context_1) {
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
    var core_1, forms_1, router_1, ng2_bootstrap_1, AppValidators_1, loader_1, users_store_1, user_1, contact_1, address_1, session_store_1, notifications_store_1, notification_1, moment_1, primeng_1;
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
            function (ng2_bootstrap_1_1) {
                ng2_bootstrap_1 = ng2_bootstrap_1_1;
            },
            function (AppValidators_1_1) {
                AppValidators_1 = AppValidators_1_1;
            },
            function (loader_1_1) {
                loader_1 = loader_1_1;
            },
            function (users_store_1_1) {
                users_store_1 = users_store_1_1;
            },
            function (user_1_1) {
                user_1 = user_1_1;
            },
            function (contact_1_1) {
                contact_1 = contact_1_1;
            },
            function (address_1_1) {
                address_1 = address_1_1;
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
            },
            function (primeng_1_1) {
                primeng_1 = primeng_1_1;
            }],
        execute: function() {
            AddUserComponent = (function () {
                function AddUserComponent(fb, _router, _notificationsStore, _sessionStore, _usersStore, _elRef) {
                    this.fb = fb;
                    this._router = _router;
                    this._notificationsStore = _notificationsStore;
                    this._sessionStore = _sessionStore;
                    this._usersStore = _usersStore;
                    this._elRef = _elRef;
                    this.options = {
                        timeOut: 3000,
                        showProgressBar: true,
                        pauseOnHover: false,
                        clickToClose: false,
                        maxLength: 10
                    };
                    this.isSaveUserProgress = false;
                    this.userform = this.fb.group({
                        userInfo: this.fb.group({
                            firstname: ['', forms_1.Validators.required],
                            middlename: ['', forms_1.Validators.required],
                            lastname: ['', forms_1.Validators.required],
                            gender: ['', forms_1.Validators.required],
                            dob: ['', forms_1.Validators.required],
                            userType: ['', forms_1.Validators.required]
                        }),
                        contact: this.fb.group({
                            email: ['', [forms_1.Validators.required, AppValidators_1.AppValidators.emailValidator]],
                            cellPhone: ['', [forms_1.Validators.required, AppValidators_1.AppValidators.mobileNoValidator]],
                            homePhone: [''],
                            workPhone: [''],
                            faxNo: ['']
                        }),
                        address: this.fb.group({
                            address1: ['', forms_1.Validators.required],
                            address2: [''],
                            city: ['', forms_1.Validators.required],
                            zipCode: ['', forms_1.Validators.required],
                            state: ['', forms_1.Validators.required],
                            country: ['', forms_1.Validators.required]
                        })
                    });
                    this.userformControls = this.userform.controls;
                }
                AddUserComponent.prototype.ngOnInit = function () {
                };
                AddUserComponent.prototype.saveUser = function (model) {
                    var _this = this;
                    var userFormValues = this.userform.value;
                    var user = new user_1.User({
                        firstName: userFormValues.userInfo.firstname,
                        middleName: userFormValues.userInfo.middlename,
                        lastName: userFormValues.userInfo.lastname,
                        gender: parseInt(userFormValues.userInfo.gender),
                        dateOfBirth: moment_1.default(),
                        userType: parseInt(userFormValues.userInfo.userType),
                        contact: new contact_1.Contact({
                            cellPhone: userFormValues.contact.cellPhone,
                            email: userFormValues.contact.email,
                            faxNo: userFormValues.contact.faxNo,
                            homePhone: userFormValues.contact.homePhone,
                            workPhone: userFormValues.contact.workPhone,
                        }),
                        address: new address_1.Address({
                            address1: userFormValues.address.address1,
                            address2: userFormValues.address.address2,
                            city: userFormValues.address.city,
                            country: userFormValues.address.country,
                            state: userFormValues.address.state,
                            zipCode: userFormValues.address.zipCode,
                        })
                    });
                    this.isSaveUserProgress = true;
                    var result;
                    result = this._usersStore.addUser(user);
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
                        _this.isSaveUserProgress = false;
                    });
                };
                AddUserComponent = __decorate([
                    core_1.Component({
                        selector: 'add-user',
                        templateUrl: 'templates/pages/add-user.html',
                        directives: [forms_1.FORM_DIRECTIVES, forms_1.REACTIVE_FORM_DIRECTIVES, ng2_bootstrap_1.DROPDOWN_DIRECTIVES, router_1.ROUTER_DIRECTIVES, loader_1.LoaderComponent, primeng_1.Calendar, primeng_1.RadioButton]
                    }), 
                    __metadata('design:paramtypes', [forms_1.FormBuilder, router_1.Router, notifications_store_1.NotificationsStore, session_store_1.SessionStore, users_store_1.UsersStore, core_1.ElementRef])
                ], AddUserComponent);
                return AddUserComponent;
            }());
            exports_1("AddUserComponent", AddUserComponent);
        }
    }
});
//# sourceMappingURL=add-user.js.map