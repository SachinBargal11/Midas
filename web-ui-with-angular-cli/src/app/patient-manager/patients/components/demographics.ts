import {Component, OnInit, ElementRef} from '@angular/core';
import {FormGroup, FormBuilder} from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';
import {SessionStore} from '../../../commons/stores/session-store';
import {NotificationsStore} from '../../../commons/stores/notifications-store';

@Component({
    selector: 'demographics',
    templateUrl: './demographics.html'
})

export class DemographicsComponent implements OnInit {
    options = {
        timeOut: 3000,
        showProgressBar: true,
        pauseOnHover: false,
        clickToClose: false
    };
    demographicsform: FormGroup;
    demographicsformControls;
    isSaveProgress = false;

    constructor(
        private fb: FormBuilder,
        private _router: Router,
        public _route: ActivatedRoute,
        private _notificationsStore: NotificationsStore,
        private _sessionStore: SessionStore,
        private _elRef: ElementRef
    ) {
        this.demographicsform = this.fb.group({
                ssn: [''],
                dob: [''],
                sex: [''],
                race: [''],
                ethinicity: [''],
                streetAddress: [''],
                city: [''],
                zipcode: [''],
                state: [''],
                maritalStatus: [''],
                emergencyContact: [''],
                emergencyContactPhone: ['']
            });

        this.demographicsformControls = this.demographicsform.controls;
    }

    ngOnInit() {
    }


    save() {
    }

}
