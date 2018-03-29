import { InputDecorator } from '@angular/core/src/metadata/directives';
import { Component, OnInit, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LazyLoadEvent } from 'primeng/primeng'
import { NotificationsStore } from '../../../commons/stores/notifications-store';
import { Notification } from '../../../commons/models/notification';
import * as moment from 'moment';
import { ProgressBarService } from '../../../commons/services/progress-bar-service';
import { NotificationsService } from 'angular2-notifications';
import { ErrorMessageFormatter } from '../../../commons/utils/ErrorMessageFormatter';
import { SessionStore } from '../../../commons/stores/session-store';
import { ConfirmDialogModule, ConfirmationService } from 'primeng/primeng';
import { MedicalProviderMasterStore } from '../../stores/medical-provider-master-store';
import { MedicalProviderMaster } from '../../models/medical-provider-master';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '../../../medical-provider/locations/models/location';
import { LocationDetails } from '../../../medical-provider/locations/models/location-details';
import { LocationsStore } from '../../../medical-provider/locations/stores/locations-store';
import { AppValidators } from '../../../commons/utils/AppValidators';
// import { AuthenticationService } from '../../../account/services/authentication-service';
// import { RegistrationService } from '../services/registration-service';
import { Company } from '../../../account/models/company';
import { Account } from '../../../account/models/account';
import { User } from '../../../commons/models/user';
import { UserRole } from '../../../commons/models/user-role';
import { UserType } from '../../../commons/models/enums/user-type';
import { Contact } from '../../../commons/models/contact';

@Component({
    selector: 'add-medical-provider',
    templateUrl: './add-medical-provider.html'
})

export class AddMedicalProviderComponent implements OnInit {
    providerform: FormGroup;
    providerformControls;
    @Input() inputCancel: number;
    @Output() closeDialogBox: EventEmitter<any> = new EventEmitter();
    isSaveProgress = false;
    allProviders: Account[];
    currentProviderId: number = 0;
    medicalProviderMode = '1';
    addMedicalProviderByToken: FormGroup;
    addMedicalProviderByTokenControls;
    otp: string;
    medicalProviderName: string;
    validateOtpResponse: any;
    medicalProviderAddress: string;
    companyExists: boolean= false;
    firstName: string = '';
    lastName: string ='';
    email: string = '';
    phoneNo: string= '';
    companyName: string='';
    companyType: string='';
    existingcompany: boolean=false;

    constructor(
        private fb: FormBuilder,
        private _router: Router,
        private _notificationsStore: NotificationsStore,
        private _notificationsService: NotificationsService,
        private _sessionStore: SessionStore,
        // private _authenticationService: AuthenticationService,
        // private _registrationService: RegistrationService,
        private _elRef: ElementRef,
        private _progressBarService: ProgressBarService,
        private _medicalProviderMasterStore: MedicalProviderMasterStore,
        public _route: ActivatedRoute,
        private confirmationService: ConfirmationService,        
    ) {
        this.providerform = this.fb.group({
            companyName: ['', [Validators.required]],
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            phoneNo: ['', [Validators.required, AppValidators.mobileNoValidator]],
            companyType: ['', Validators.required],
            email: ['', [Validators.required, AppValidators.emailValidator]]            
        });

        this.addMedicalProviderByToken = this.fb.group({
            token: ['', Validators.required],
        })
        this.addMedicalProviderByTokenControls = this.addMedicalProviderByToken.controls

        this.providerformControls = this.providerform.controls;
    }

    ngOnInit() {        
        this.loadAllProviders();
        this.companyType = "1";
    }

    loadAllProviders() {
        // this._progressBarService.show();
        this._medicalProviderMasterStore.getAllProviders()
            .subscribe((allProviders: Account[]) => {
                this.allProviders = allProviders;
            },
            (error) => {
                // this._progressBarService.hide();
            },
            () => {
                // this._progressBarService.hide();
            });
    }

    selectProviders(event) {
        let currentProviderId = parseInt(event.target.value);
        this.currentProviderId = currentProviderId;
    }

    assignMedicalProvider() {
        if (this.currentProviderId !== 0) {
            let result;
            result = this._medicalProviderMasterStore.assignProviders(this.currentProviderId);
            result.subscribe(
                (response) => {
                    let notification = new Notification({
                        'title': 'Provider assigned successfully!',
                        'type': 'SUCCESS',
                        'createdAt': moment()
                    });
                    this._notificationsStore.addNotification(notification);
                    this.loadAllProviders();
                    this.currentProviderId = 0;
                    // this._router.navigate(['/account-setup/medical-provider-master']);
                      if (!this.inputCancel) {
                    setTimeout(() => {
                        this._router.navigate(['../'], { relativeTo: this._route });
                    }, 3000);
                }
                else {
                    this.closeDialog();
                }
                },
                (error) => {
                    let errString = 'Unable to assign provider.';
                    let notification = new Notification({
                        'messages': ErrorMessageFormatter.getErrorMessages(error, errString),
                        'type': 'ERROR',
                        'createdAt': moment()
                    });
                    this._notificationsStore.addNotification(notification);
                    this._notificationsService.error('Oh No!', ErrorMessageFormatter.getErrorMessages(error, errString));
                },
                () => {
                });

        } else {
            let notification = new Notification({
                'title': 'Select provider to assign to company',
                'type': 'ERROR',
                'createdAt': moment()
            });
            this._notificationsStore.addNotification(notification);
            this._notificationsService.error('Oh No!', 'select provider to assign to company');
        }
    }

    closeDialog() {                
        this.addMedicalProviderByToken.reset();
        //this.providerform.value.reset();
        this.validateOtpResponse = null;
        this.closeDialogBox.emit();
        //this.providerform.reset();
        //this.companyType = "1";
        this.clearform();
    }

    saveMedicalProvider() {
        this._progressBarService.show();
        this.isSaveProgress = true;
        let providerformValues = this.providerform.value;
        let result;
        let provider = {
            company: {
                Id: this._sessionStore.session.currentCompany.id
            },
            signUp: {
                user: {
                    userType: UserType.STAFF,
                    userName: this.providerform.value.email,
                    firstName: this.providerform.value.firstName,
                    lastName: this.providerform.value.lastName
                },
                contactInfo: {
                    cellPhone: this.providerform.value.phoneNo.replace(/\-/g, ''),
                    emailAddress: this.providerform.value.email,
                    preferredCommunication: 1
                },
                role: {
                    name: 'Admin',
                    roleType: 'Admin',
                    status: 'active'
                },
                company: {
                    name: this.providerform.value.companyName,
                    companyType: this.providerform.value.companyType,
                    createByUserID: this._sessionStore.session.account.user.id
                }
            }
        };        
        result = this._medicalProviderMasterStore.addMedicalProvider(provider);
        result.subscribe(
            (response) => {                
                let notification = new Notification({
                    'title': 'Medical provider has been registered successfully!',
                    'type': 'SUCCESS',
                    'createdAt': moment()
                });
                this._notificationsStore.addNotification(notification);
                
                this._notificationsService.success('Welcome!', 'Medical provider has been registered successfully!.');
                // if (!this.inputCancel) {
                //     setTimeout(() => {
                //         this._router.navigate(['../'], { relativeTo: this._route });
                //     }, 3000);
                // }
                // else {
                    this.clearform();
                    this.closeDialog();
                    
                //}
            },
            (error) => {
                let errString = 'Unable to register user.';
                // let notification = new Notification({
                //     'messages': ErrorMessageFormatter.getErrorMessages(error, errString),
                //     'type': 'ERROR',
                //     'createdAt': moment()
                // });                
                //this._notificationsStore.addNotification(notification);

                this._notificationsService.error('Oh No!', errString);
                this._progressBarService.hide();
            },
            () => {
                this.isSaveProgress = false;
                this._progressBarService.hide();
            });
    }

    validateGeneratedToken() {
        this._progressBarService.show();
        this._medicalProviderMasterStore.validateToken(this.addMedicalProviderByToken.value.token)
            .subscribe((data: any) => {
                this.validateOtpResponse = data;
                if(this.validateOtpResponse.company.location.length > 0)
                {
                        this.medicalProviderName = this.validateOtpResponse.company.name;
                        this.medicalProviderAddress = this.validateOtpResponse.company.location[0].name + ', ' +
                        this.validateOtpResponse.company.location[0].addressInfo.address1 + ', ' +
                        // this.validateOtpResponse.company.location[0].addressInfo.address2 + ',' +
                        this.validateOtpResponse.company.location[0].addressInfo.city + ', ' +
                        this.validateOtpResponse.company.location[0].addressInfo.state + ', ' +
                        this.validateOtpResponse.company.location[0].addressInfo.zipCode
                }
                else{
                    let notification = new Notification({
                        'title': 'The '+ this.validateOtpResponse.company.name + ' do not have location. Cannot be associated',
                        'type': 'ERROR',
                        'createdAt': moment()
                    });
                    this._notificationsStore.addNotification(notification);
                    this._notificationsService.error('Oh No!', 'The '+ this.validateOtpResponse.company.name + ' do not have location. Cannot be associated');
                    this.closeDialog();
                    this._progressBarService.hide();
                    this.validateOtpResponse = null;
                }
                
            },
            (error) => {
                let errString = 'Invalid token.';
                let notification = new Notification({
                    'messages': ErrorMessageFormatter.getErrorMessages(error, errString),
                    'type': 'ERROR',
                    'createdAt': moment()
                });
                this._notificationsStore.addNotification(notification);
                this._notificationsService.error('Oh No!', ErrorMessageFormatter.getErrorMessages(error, errString));
                this.closeDialog();
                this._progressBarService.hide();
            },
            () => {
                this._progressBarService.hide();
            });
    }

    associateMedicalProvider() {
        this._medicalProviderMasterStore.associateValidateTokenWithCompany(this.addMedicalProviderByToken.value.token)
            .subscribe((data: any) => {
                let notification = new Notification({
                    'title': 'Medical provider added successfully!',
                    'type': 'SUCCESS',
                    'createdAt': moment()
                });
                // this.loadAllProviders();
                //this.loadMedicalProviders();
                this._progressBarService.hide();
                this._notificationsStore.addNotification(notification);
                this.closeDialog()
            },
            (error) => {
                let errString = 'Unable to associate medical provider.';
                let notification = new Notification({
                    'messages': ErrorMessageFormatter.getErrorMessages(error, errString),
                    'type': 'ERROR',
                    'createdAt': moment()
                });
                this._notificationsStore.addNotification(notification);
                this._notificationsService.error('Oh No!', ErrorMessageFormatter.getErrorMessages(error, errString));
            },
            () => {
                this._progressBarService.hide();
            });
    }

    CheckPreferredCompanyNameAlreadyExists() {
        this.existingcompany = false;
        this._progressBarService.show();        
        this._medicalProviderMasterStore.getByCompanyByName(this.providerform.value.companyName)
            .subscribe((data: any) => {             
                debugger;
                this.firstName = '';
                this.lastName = '';
                this.email = '';
                this.phoneNo = '';
                let res = data;
                this.companyExists = false;                
                if(res.Signup != null)               
                {
                    if(res.Signup.company.companyStatusTypeId != 3)
                    {
                        this.existingcompany = true;
                        this.companyExists = true;
                        this.firstName = res.Signup.user.firstName;                    
                        this.lastName = res.Signup.user.lastName;                        
                        this.email = res.Signup.contactInfo.emailAddress;
                        this.phoneNo = res.Signup.contactInfo.cellPhone;
                //    if(data. == 3)
                //    {
                //     let errString = 'Company already registered';
                //     let notification = new Notification({
                //         'messages': 'This company is already registered in midas portal'
                //         'type': 'ERROR',
                //         'createdAt': moment()
                //     });
                //     this._notificationsStore.addNotification(notification);
                //     this._notificationsService.error('Oh No!', ErrorMessageFormatter.getErrorMessages(error, errString));
                //    }
                //     this.confirmationService.confirm({
                //         message: 'This company name already exists in the Midas portal do you want to associate with your company',
                //         header: 'Confirmation',
                //         icon: 'fa fa-trash',
                //         accept: () => {                                     
                //             this._authenticationService.fetchByCompanyId(data.companyId)
                //             .subscribe((data: any) => {
                                
                //             },
                //             (error) => {                
                //                 this._progressBarService.hide();
                //             },
                //             () => {
                //                 this._progressBarService.hide();
                //             });

                //         }});
                    }
                    else
                    {
                        this.existingcompany = false;
                        let msg = 'This '+ this.providerform.value.companyName + ' company already registered in the Midas Portal, please contact '+ res.Signup.user.firstName +' '+ res.Signup.user.lastName +' ' + res.Signup.contactInfo.cellPhone + ' ' + res.Signup.contactInfo.emailAddress +' & get the token to associate';
                        this.companyExists = false;                        
                        let notification = new Notification({
                            'title': msg,
                            'type': 'ERROR',
                            'createdAt': moment()
                        });
                        this._notificationsStore.addNotification(notification);
                        this._notificationsService.error('Oh No!', msg);                        
                    }
                }
            },
            (error) => {                
                this._progressBarService.hide();
            },
            () => {
                this._progressBarService.hide();
            });
    }

    clearform()
    {          
        this.firstName = '';
        this.lastName = '';
        this.email = '';
        this.phoneNo = '';       
        this.companyName = null;
        this.companyName = '';
        this.providerform.value.companyName = '';
    }
}

