import {Component, OnInit, ElementRef} from '@angular/core';
import {Validators,FormGroup, FormBuilder} from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';
import {SessionStore} from '../../../commons/stores/session-store';
import {NotificationsStore} from '../../../commons/stores/notifications-store';
import { AppValidators } from '../../../commons/utils/AppValidators';

@Component({
    selector: 'case',
    templateUrl: './case.html'
})

export class CaseComponent implements OnInit {
    options = {
        timeOut: 3000,
        showProgressBar: true,
        pauseOnHover: false,
        clickToClose: false
    };
    caseform: FormGroup;
    caseformControls;
    isSaveProgress = false;

    constructor(
        private fb: FormBuilder,
        private _router: Router,
        public _route: ActivatedRoute,
        private _notificationsStore: NotificationsStore,
        private _sessionStore: SessionStore,
        private _elRef: ElementRef
    ) {
        this.caseform = this.fb.group({
                caseName: [''],
                patientId: ['', Validators.required],
                caseTypeId: [''],
                age: [''],
                doi: ['', Validators.required],
                dot: ['', Validators.required],
                vehicle: [''],
                carrier: [''],
                location: ['', Validators.required],
                attorney: [''],
                casestatus: [''],
                transportation: ['', Validators.required],
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

        this.caseformControls = this.caseform.controls;
    }

    ngOnInit() {
    }


    save() {
    }

}
