import {Component, OnInit, ElementRef} from '@angular/core';
import {Validators, FormGroup, FormBuilder} from '@angular/forms';
import {Router} from '@angular/router';
import {AppValidators} from '../../utils/AppValidators';
import {AuthenticationService} from '../../services/authentication-service';
import {CompanyStore} from '../../stores/company-store';
import {Company} from '../../models/company';
import {SessionStore} from '../../stores/session-store';
import {NotificationsStore} from '../../stores/notifications-store';
import {NotificationsService} from 'angular2-notifications';

@Component({
    selector: 'register-company',
    templateUrl: 'templates/pages/register-company.html',
    providers: [NotificationsService, FormBuilder]
})

export class RegisterCompanyComponent implements OnInit {
    // company = new Company({});
    company: any[];
    companyName: any[];
    email: any[];
    options = {
        timeOut: 3000,
        showProgressBar: true,
        pauseOnHover: false,
        clickToClose: false
        // maxLength: 10
    };
    registercompanyform: FormGroup;
    userformControls;
    isRegistrationInProgress = false;

    constructor(
        private fb: FormBuilder,
        private _router: Router,
        private _notificationsStore: NotificationsStore,
        private _notificationsService: NotificationsService,
        private _sessionStore: SessionStore,
        private _authenticationService: AuthenticationService,
        private _companyStore: CompanyStore,
        private _elRef: ElementRef
    ) {
        this.registercompanyform = this.fb.group({
                companyName: ['', [Validators.required, AppValidators.companyNameTaken([ 'John', 'sachin', 'Jill', 'Jackie', 'Jim' ])]],
                // companyName: ['', [Validators.required, AppValidators.companyNameTaken([])]],
                contactName: ['', Validators.required],
                taxId: [''],
                phoneNo: [''],
                companyType: [''],
                email: ['', [Validators.required, AppValidators.emailValidator, AppValidators.emailTaken([ 'john@yahoo.com', 'sachin@gmail.com', 'jill@gmail.com', 'jackie@yahoo.com', 'jim@gmail.com'])]],
                subscriptionPlan: ['', Validators.required]
        });

        this.userformControls = this.registercompanyform.controls;

    }

    ngOnInit() {
        this.show();
    }
show() {
        this._authenticationService.getCompanies()
                 .subscribe(
                (company: Company[]) => {
                    this.company = company;
                    function getFields(input, field) {
                        let output = [];
                        for (let i = 0; i < input.length ; ++i)
                            output.push(input[i][field]);
                        return output;
                    }
                    //  this.companyName = getFields(company, 'companyName');
                     this.email = getFields(company, 'email');
                });
        // alert(this._authenticationService.companies);
    }
    saveUser() {
        this.isRegistrationInProgress = true;
        let result;
        let registercompanyformValues = this.registercompanyform.value;
        // let companyDetail = new Company({
        //         companyName: registercompanyformValues.companyName,
        //         contactName: registercompanyformValues.contactName,
        //         taxId: registercompanyformValues.taxId,
        //         phoneNo: registercompanyformValues.phoneNo,
        //         companyType: parseInt(registercompanyformValues.companyType),
        //         email: registercompanyformValues.email,
        //         subscriptionPlan: parseInt(registercompanyformValues.subscriptionPlan)
        // });
        let companyDetail = new Company({
            company: {
                name: registercompanyformValues.companyName,
                taxId: registercompanyformValues.taxId,
                companyType: registercompanyformValues.companyType,
                status: 'InActive',
                subsCriptionType: registercompanyformValues.subscriptionPlan
            },
            user: {
                userName: registercompanyformValues.email,
                firstName: registercompanyformValues.contactName,
                middleName: '',
                lastName: '',
                userType: 'Owner'
                // password: '123456'
            },
            role: {
                name: 'Doctor',
                roleType: 'Admin',
                status: 'active'
            }
        });
        result = this._authenticationService.registerCompany(companyDetail);
        result.subscribe(
            (response) => {
                this._notificationsService.success('Welcome!', 'You have successfully registered!');
                setTimeout(() => {
                    this._router.navigate(['/login']);
                }, 3000);
            },
            error => {
                this.isRegistrationInProgress = false;
                this._notificationsService.error('Oh No!', 'Unable to register user.');
            },
            () => {
                this.isRegistrationInProgress = false;
            });

    }

}