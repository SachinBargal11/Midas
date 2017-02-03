
import {Component, OnInit, ElementRef} from '@angular/core';
import {Validators,FormGroup, FormBuilder} from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';
import {SessionStore} from '../../../commons/stores/session-store';
import {NotificationsStore} from '../../../commons/stores/notifications-store';
import { AppValidators } from '../../../commons/utils/AppValidators';

@Component({
    selector: 'insurance',
    templateUrl: './insurances.html'
})

export class InsuranceComponent implements OnInit {
    options = {
        timeOut: 3000,
        showProgressBar: true,
        pauseOnHover: false,
        clickToClose: false
    };
    insuranceform: FormGroup;
    insuranceformControls;
    isSaveProgress = false;

    constructor(
        private fb: FormBuilder,
        private _router: Router,
        public _route: ActivatedRoute,
        private _notificationsStore: NotificationsStore,
        private _sessionStore: SessionStore,
        private _elRef: ElementRef
    ) {
        this.insuranceform = this.fb.group({
                policyNumber: [''],
                patientId: ['', Validators.required],
                insuranceId: ['', Validators.required],
                policyHolderName: ['', Validators.required],
                isPrimaryInsurance: ['', Validators.required],
                address: ['',Validators.required],
                address2: [''],
                state: [''],
                city:[''],
                zipcode:[''],
                country: [''],
                email: ['', [Validators.required, AppValidators.emailValidator]],
                cellPhone: ['', [Validators.required, AppValidators.mobileNoValidator]],
                homePhone: [''],
                workPhone: [''],
                faxNo: ['']
           
               
                
            
            });

        this.insuranceformControls = this.insuranceform.controls;
    }

    ngOnInit() {
    }


    save() {
    }

}

