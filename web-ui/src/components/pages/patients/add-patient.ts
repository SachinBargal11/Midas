import {Component, OnInit, ElementRef} from '@angular/core';
import {FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES, Validators, FormGroup, FormBuilder, AbstractControl} from '@angular/forms';
import {ROUTER_DIRECTIVES, Router} from '@angular/router';
import {AppValidators} from '../../../utils/AppValidators';
import {LoaderComponent} from '../../elements/loader';
import {PatientsStore} from '../../../stores/patients-store';
import {Patient} from '../../../models/patient';
import $ from 'jquery';
import 'eonasdan-bootstrap-datetimepicker';
import {SessionStore} from '../../../stores/session-store';
import {NotificationsStore} from '../../../stores/notifications-store';
import {Notification} from '../../../models/notification';
import Moment from 'moment';

@Component({
    selector: 'add-patient',
    templateUrl: 'templates/pages/patients/add-patient.html',
    directives: [FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES, ROUTER_DIRECTIVES, LoaderComponent]
})

export class AddPatientComponent implements OnInit {
    patient = new Patient({
        'firstname': '',
        'lastname': '',
        'email': '',
        'mobileNo': '',
        'address': '',
        'dob': ''
    });
    options = {
        timeOut: 3000,
        showProgressBar: true,
        pauseOnHover: false,
        clickToClose: false,
        maxLength: 10
    };
    patientform: FormGroup;
    patientformControls;
    
    isSavePatientProgress = false;
    constructor(
        private fb: FormBuilder,
        private _router: Router,
        private _notificationsStore: NotificationsStore,
        private _sessionStore: SessionStore,
        private _patientsStore: PatientsStore,
        private _elRef: ElementRef
    ) {
        this.patientform = this.fb.group({
            firstname: ['', Validators.required],
            lastname: ['', Validators.required],
            email: ['', [Validators.required, AppValidators.emailValidator]],
            mobileNo: ['', [Validators.required, AppValidators.mobileNoValidator]],
            address: [''],
            dob: ['']
            // dob: ['', Validators.required]
        });
        this.patientformControls = this.patientform.controls;       
        
    }

    ngOnInit() {
        $(this._elRef.nativeElement).find('.datepickerElem').datetimepicker({
            format: 'll'
        });
    }


    savePatient() {
        this.isSavePatientProgress = true;
        var result;
        var patient = new Patient({
            'firstname': this.patientform.value.firstname,
            'lastname': this.patientform.value.lastname,
            'email': this.patientform.value.email,
            'mobileNo': this.patientform.value.mobileNo,
            'address': this.patientform.value.address,
            'dob': $("#dob").val(),
            'createdUser': this._sessionStore.session.user.id
        });
        result = this._patientsStore.addPatient(patient);
        result.subscribe(
            (response) => {
                var notification = new Notification({
                    'title': 'Patient added successfully!',
                    'type': 'SUCCESS',
                    'createdAt': Moment()
                });
                this._notificationsStore.addNotification(notification);
                this._router.navigate(['/patients']);
            },
            (error) => {
                var notification = new Notification({
                    'title': 'Unable to add patient.',
                    'type': 'ERROR',
                    'createdAt': Moment()
                });
                this._notificationsStore.addNotification(notification);
            },
            () => {
                this.isSavePatientProgress = false;
            });

    }

}