System.register(['@angular/core', '@angular/forms', '@angular/router', '../../elements/loader', '../../../stores/speciality-store', '../../../models/speciality', '../../../stores/session-store', '../../../stores/notifications-store', '../../../models/notification', 'moment', 'primeng/primeng', '@angular/http', '../../../pipes/limit-array-pipe'], function(exports_1, context_1) {
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
    var core_1, forms_1, router_1, loader_1, speciality_store_1, speciality_1, session_store_1, notifications_store_1, notification_1, moment_1, primeng_1, http_1, limit_array_pipe_1;
    var AddSpecialityComponent;
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
            function (loader_1_1) {
                loader_1 = loader_1_1;
            },
            function (speciality_store_1_1) {
                speciality_store_1 = speciality_store_1_1;
            },
            function (speciality_1_1) {
                speciality_1 = speciality_1_1;
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
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (limit_array_pipe_1_1) {
                limit_array_pipe_1 = limit_array_pipe_1_1;
            }],
        execute: function() {
            AddSpecialityComponent = (function () {
                function AddSpecialityComponent(_specialityStore, fb, _router, _notificationsStore, _sessionStore, _elRef) {
                    this._specialityStore = _specialityStore;
                    this.fb = fb;
                    this._router = _router;
                    this._notificationsStore = _notificationsStore;
                    this._sessionStore = _sessionStore;
                    this._elRef = _elRef;
                    this.options = {
                        timeOut: 3000,
                        showProgressBar: true,
                        pauseOnHover: false,
                        clickToClose: false,
                        maxLength: 10
                    };
                    this.isSaveDoctorProgress = false;
                    this.specialityform = this.fb.group({
                        name: ['', forms_1.Validators.required],
                        specialityCode: ['', forms_1.Validators.required]
                    });
                    this.specialityformControls = this.specialityform.controls;
                }
                AddSpecialityComponent.prototype.ngOnInit = function () {
                };
                AddSpecialityComponent.prototype.saveSpeciality = function () {
                    var _this = this;
                    var specialityformValues = this.specialityform.value;
                    var specialty = new speciality_1.Speciality({
                        specialty: {
                            name: specialityformValues.name,
                            specialityCode: specialityformValues.specialityCode
                        }
                    });
                    this.isSaveDoctorProgress = true;
                    var result;
                    result = this._specialityStore.addSpeciality(specialty);
                    result.subscribe(function (response) {
                        var notification = new notification_1.Notification({
                            'title': 'Speciality added successfully!',
                            'type': 'SUCCESS',
                            'createdAt': moment_1.default()
                        });
                        _this._notificationsStore.addNotification(notification);
                        _this._router.navigate(['/specialities']);
                    }, function (error) {
                        var notification = new notification_1.Notification({
                            'title': 'Unable to add Speciality.',
                            'type': 'ERROR',
                            'createdAt': moment_1.default()
                        });
                        _this._notificationsStore.addNotification(notification);
                    }, function () {
                        _this.isSaveDoctorProgress = false;
                    });
                };
                AddSpecialityComponent = __decorate([
                    core_1.Component({
                        selector: 'add-speciality',
                        templateUrl: 'templates/pages/speciality/add-speciality.html',
                        directives: [forms_1.FORM_DIRECTIVES, forms_1.REACTIVE_FORM_DIRECTIVES, router_1.ROUTER_DIRECTIVES, loader_1.LoaderComponent, primeng_1.Calendar, primeng_1.InputMask, primeng_1.AutoComplete],
                        providers: [http_1.HTTP_PROVIDERS, forms_1.FormBuilder],
                        pipes: [limit_array_pipe_1.LimitPipe]
                    }), 
                    __metadata('design:paramtypes', [speciality_store_1.SpecialityStore, forms_1.FormBuilder, router_1.Router, notifications_store_1.NotificationsStore, session_store_1.SessionStore, core_1.ElementRef])
                ], AddSpecialityComponent);
                return AddSpecialityComponent;
            }());
            exports_1("AddSpecialityComponent", AddSpecialityComponent);
        }
    }
});
//# sourceMappingURL=add-speciality.js.map