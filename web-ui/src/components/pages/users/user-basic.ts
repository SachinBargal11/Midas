import {Component, OnInit, ElementRef} from '@angular/core';
import {Validators, FormGroup, FormBuilder} from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';
import {AppValidators} from '../../../utils/AppValidators';
import {UsersStore} from '../../../stores/users-store';
import {UsersService} from '../../../services/users-service';
import {Account} from '../../../models/account';
import {SessionStore} from '../../../stores/session-store';
import {NotificationsStore} from '../../../stores/notifications-store';
import {StatesStore} from '../../../stores/states-store';
import {StateService} from '../../../services/state-service';

@Component({
    selector: 'basic',
    templateUrl: 'templates/pages/users/user-basic.html',
    providers: [UsersService, StateService, StatesStore, FormBuilder],
})

export class UserBasicComponent implements OnInit {
    user = new Account({});
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
        public _route: ActivatedRoute,
        private _notificationsStore: NotificationsStore,
        private _sessionStore: SessionStore,
        private _usersStore: UsersStore,
        private _elRef: ElementRef
    ) {
        this._route.parent.params.subscribe((routeParams: any) => {
            let userId: number = parseInt(routeParams.userId);
            let result = this._usersStore.fetchUserById(userId);
            result.subscribe(
                (userDetail: Account) => {
                    this.user = userDetail;
                },
                (error) => {
                    this._router.navigate(['/medical-provider/users']);
                },
                () => {
                });
        });
        this.basicform = this.fb.group({
                firstName: ['', Validators.required],
                lastName: ['', Validators.required],
                speciality: ['', Validators.required],
                salutation: ['', Validators.required],
                phone: ['', [Validators.required, AppValidators.mobileNoValidator]],
                photo: ['']
            });

        this.basicformControls = this.basicform.controls;
    }

    ngOnInit() {
    }


    save() {
        // let basicformValues = this.basicform.value;

    }

}
