import {Component, OnInit, ElementRef} from '@angular/core';
import {Validators, FormGroup, FormBuilder} from '@angular/forms';
import {Router} from '@angular/router';
import {AppValidators} from '../../../utils/AppValidators';
import {UsersStore} from '../../../stores/users-store';
import {User} from '../../../models/user';
import {UsersService} from '../../../services/users-service';
import {AccountDetail} from '../../../models/account-details';
import {Account} from '../../../models/account';
import {ContactInfo} from '../../../models/contact';
import {Address} from '../../../models/address';
import {SessionStore} from '../../../stores/session-store';
import {NotificationsStore} from '../../../stores/notifications-store';
import {Notification} from '../../../models/notification';
import moment from 'moment';
import {StatesStore} from '../../../stores/states-store';
import {StateService} from '../../../services/state-service';

@Component({
    selector: 'basic',
    templateUrl: 'templates/pages/location-management/basic.html',
    providers: [UsersService, StateService, StatesStore, FormBuilder],
})

export class BasicComponent implements OnInit {
    states: any[];
    options = {
        timeOut: 3000,
        showProgressBar: true,
        pauseOnHover: false,
        clickToClose: false,
        maxLength: 10
    };
    basicform: FormGroup;
    basicformControls;
    isSaveProgress = false;

    constructor(
        private _stateService: StateService,
        private _statesStore: StatesStore,
        private fb: FormBuilder,
        private _router: Router,
        private _notificationsStore: NotificationsStore,
        private _sessionStore: SessionStore,
        private _usersStore: UsersStore,
        private _elRef: ElementRef
    ) {
        this.basicform = this.fb.group({
                officeName: ['', Validators.required],
                address: [''],
                city: ['', Validators.required],
                state: ['', Validators.required],
                zipcode: ['', Validators.required],
                officePhone: ['', Validators.required],
                fax: ['', Validators.required],
                officeType: ['', Validators.required]
            });

        this.basicformControls = this.basicform.controls;
    }

    ngOnInit() {
    }


    save() {
        let basicformValues = this.basicform.value;
        let userDetail = new AccountDetail({
            account: new Account({
               id: this._sessionStore.session.account_id
            }),
            user: new User({
                firstName: basicformValues.userInfo.firstname,
                middleName: basicformValues.userInfo.middlename,
                lastName: basicformValues.userInfo.lastname,
                userType: parseInt(basicformValues.userInfo.userType), // UserType[1],//,                
                password: basicformValues.userInfo.password,
                userName: basicformValues.contact.email
            }),
            contactInfo: new ContactInfo({
                cellPhone: basicformValues.contact.cellPhone,
                emailAddress: basicformValues.contact.email,
                faxNo: basicformValues.contact.faxNo,
                homePhone: basicformValues.contact.homePhone,
                workPhone: basicformValues.contact.workPhone,
            }),
            address: new Address({
                address1: basicformValues.address.address1,
                address2: basicformValues.address.address2,
                city: basicformValues.address.city,
                country: basicformValues.address.country,
                state: basicformValues.address.state,
                zipCode: basicformValues.address.zipCode,
            })
        });
        this.isSaveProgress = true;
        let result;

        result = this._usersStore.addUser(userDetail);
        result.subscribe(
            (response) => {
                let notification = new Notification({
                    'title': 'User added successfully!',
                    'type': 'SUCCESS',
                    'createdAt': moment()
                });
                this._notificationsStore.addNotification(notification);
                this._router.navigate(['/users']);
            },
            (error) => {
                let notification = new Notification({
                    'title': 'Unable to add user.',
                    'type': 'ERROR',
                    'createdAt': moment()
                });
                this._notificationsStore.addNotification(notification);
            },
            () => {
                this.isSaveProgress = false;
            });

    }

}
