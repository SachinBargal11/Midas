System.register(['@angular/core', '@angular/forms', '@angular/router', 'ng2-bootstrap', '../../utils/AppValidators', '../elements/loader', '../../stores/session-store', '../../stores/notifications-store', 'primeng/primeng'], function(exports_1, context_1) {
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
    var core_1, forms_1, router_1, ng2_bootstrap_1, AppValidators_1, loader_1, session_store_1, notifications_store_1, primeng_1;
    var SignupComponent;
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
            function (session_store_1_1) {
                session_store_1 = session_store_1_1;
            },
            function (notifications_store_1_1) {
                notifications_store_1 = notifications_store_1_1;
            },
            function (primeng_1_1) {
                primeng_1 = primeng_1_1;
            }],
        execute: function() {
            SignupComponent = (function () {
                function SignupComponent(fb, _router, _notificationsStore, _sessionStore, 
                    // private _usersStore: UsersStore,
                    _elRef) {
                    this.fb = fb;
                    this._router = _router;
                    this._notificationsStore = _notificationsStore;
                    this._sessionStore = _sessionStore;
                    this._elRef = _elRef;
                    // user = new User({});
                    this.options = {
                        timeOut: 3000,
                        showProgressBar: true,
                        pauseOnHover: false,
                        clickToClose: false,
                        maxLength: 10
                    };
                    this.isSaveUserProgress = false;
                    this.signupform = this.fb.group({
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
                        }),
                        account: this.fb.group({
                            accountName: ['', forms_1.Validators.required],
                            password: ['', forms_1.Validators.required],
                            confirmPassword: ['', forms_1.Validators.required]
                        }, { validator: AppValidators_1.AppValidators.matchingPasswords('password', 'confirmPassword') })
                    });
                    this.userformControls = this.signupform.controls;
                }
                SignupComponent.prototype.ngOnInit = function () {
                };
                SignupComponent = __decorate([
                    core_1.Component({
                        selector: 'signup',
                        templateUrl: 'templates/pages/signup.html',
                        directives: [forms_1.FORM_DIRECTIVES, forms_1.REACTIVE_FORM_DIRECTIVES, ng2_bootstrap_1.DROPDOWN_DIRECTIVES, router_1.ROUTER_DIRECTIVES, loader_1.LoaderComponent, primeng_1.Calendar, primeng_1.RadioButton]
                    }), 
                    __metadata('design:paramtypes', [forms_1.FormBuilder, router_1.Router, notifications_store_1.NotificationsStore, session_store_1.SessionStore, core_1.ElementRef])
                ], SignupComponent);
                return SignupComponent;
            }());
            exports_1("SignupComponent", SignupComponent);
        }
    }
});
//# sourceMappingURL=signup.js.map