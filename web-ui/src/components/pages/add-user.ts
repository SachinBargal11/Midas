import {Component, OnInit, ElementRef} from '@angular/core';
import {FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES, Validators, FormControl, FormGroup, FormBuilder, AbstractControl} from '@angular/forms';
import {ROUTER_DIRECTIVES, Router} from '@angular/router';
import {DROPDOWN_DIRECTIVES} from 'ng2-bootstrap';
import {AppValidators} from '../../utils/AppValidators';
import {LoaderComponent} from '../elements/loader';
// import {UsersStore} from '../../stores/users-store';
import {User} from '../../models/user';
import {Contact} from '../../models/contact';
import {Address} from '../../models/address';
import $ from 'jquery';
import {SessionStore} from '../../stores/session-store';
import {NotificationsStore} from '../../stores/notifications-store';
import {Notification} from '../../models/notification';
import Moment from 'moment';
import {Calendar, RadioButton, SelectItem} from 'primeng/primeng';

@Component({
    selector: 'add-user',
    templateUrl: 'templates/pages/add-user.html',
    directives: [FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES, DROPDOWN_DIRECTIVES, ROUTER_DIRECTIVES, LoaderComponent, Calendar, RadioButton]
})

export class AddUserComponent implements OnInit {
    // user = new User({
    //     'firstName': '',
    //     'middleName': '',
    //     'lastName': '',
    //     'userName': '',
    //     'mobileNo': '',
    //     'address': '',
    //     'dob': ''
    // });
    user = new User({});
    options = {
        timeOut: 3000,
        showProgressBar: true,
        pauseOnHover: false,
        clickToClose: false,
        maxLength: 10
    };
    userform: FormGroup;   
    userformControls;
    isSaveUserProgress = false;
 
    constructor(
        private fb: FormBuilder,
        private _router: Router,
        private _notificationsStore: NotificationsStore,
        private _sessionStore: SessionStore,
        // private _usersStore: UsersStore,
        private _elRef: ElementRef
    ) {
        this.userform = this.fb.group({
                   userInfo: this.fb.group({
                                  firstname: ['', Validators.required],
                                  middlename: ['', Validators.required],
                                  lastname: ['', Validators.required],
                                  gender: ['', Validators.required],
                                  dob: ['', Validators.required],
                                  userType: ['', Validators.required]
                              }),
                   contact: this.fb.group({           
                                  email: ['', [Validators.required, AppValidators.emailValidator]],
                                  cellPhone: ['', [Validators.required, AppValidators.mobileNoValidator]],
                                  homePhone: [''],
                                  workPhone: [''],
                                  faxNo: ['']
                              }),
                   address: this.fb.group({           
                                  address1: ['', Validators.required],
                                  address2: [''],
                                  city: ['', Validators.required],
                                  zipCode: ['', Validators.required],
                                  state: ['', Validators.required],
                                  country: ['', Validators.required]
                              })    
        });
      
         this.userformControls = this.userform.controls;
         
    }

    ngOnInit() {
        
    }


    // saveUser() {
    //     this.isSaveUserProgress = true;
    //     var result;
    //     var user = new User({
    //         'firstname': this.userform.value.firstname,
    //         'lastname': this.userform.value.lastname,
    //         'email': this.userform.value.email,
    //         'mobileNo': this.userform.value.mobileNo,
    //         'address': this.userform.value.address,
    //         'dob': this.userform.value.dob,
    //         'createdUser': this._sessionStore.session.user.id
    //     });
    //     result = this._usersStore.addUser(user);
    //     result.subscribe(
    //         (response) => {
    //             var notification = new Notification({
    //                 'title': 'User added successfully!',
    //                 'type': 'SUCCESS',
    //                 'createdAt': Moment()
    //             });
    //             this._notificationsStore.addNotification(notification);
    //             this._router.navigate(['/users/add']);
    //         },
    //         (error) => {
    //             var notification = new Notification({
    //                 'title': 'Unable to add user.',
    //                 'type': 'ERROR',
    //                 'createdAt': Moment()
    //             });
    //             this._notificationsStore.addNotification(notification);
    //         },
    //         () => {
    //             this.isSaveUserProgress = false;
    //         });

    // }

}