import {Component, OnInit, ElementRef} from '@angular/core';
import {ControlGroup, Validators, FormBuilder} from '@angular/common';
import {ROUTER_DIRECTIVES, Router, RouteParams, RouteConfig} from '@angular/router-deprecated';
import {AppValidators} from '../../../utils/AppValidators';
import {LoaderComponent} from '../../elements/loader';
import {SimpleNotificationsComponent, NotificationsService} from 'angular2-notifications';
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
    directives: [ROUTER_DIRECTIVES, LoaderComponent, SimpleNotificationsComponent],
    // providers: [NotificationsService]
})

export class AddPatientComponent implements OnInit {
    patient = new Patient({
        'firstname': '',
        'lastname': '',
        'email': '',
        'mobileNo': '',
        'address': '',
        'dob' : ''
    });
    options = {
        timeOut: 3000,
        showProgressBar: true,
        pauseOnHover: false,
        clickToClose: false,
        maxLength: 10
    };
    patientform: ControlGroup;
    isSavePatientProgress = false;
    constructor(
        fb: FormBuilder,
        private _router: Router,
        // private _notificationsService: NotificationsService,
        private _notificationsStore: NotificationsStore,
        private _sessionStore: SessionStore,
        private _routeParams: RouteParams,
        private _patientsStore: PatientsStore,
        private _elRef: ElementRef
    ) {
        this.patientform = fb.group({
            firstname: ['', Validators.required],
            lastname: ['', Validators.required],
            email: ['', Validators.compose([Validators.required, AppValidators.emailValidator])],
            mobileNo: ['', Validators.compose([Validators.required, AppValidators.mobileNoValidator])],
            address: [''],
            // dob: ['', Validators.required]
        });
    }

    ngOnInit() {
        if (!this._sessionStore.isAuthenticated()) {
            this._router.navigate(['Login']);
        }
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
            'createdUser':this._sessionStore.session.user.id
        });
        result = this._patientsStore.addPatient(patient);
        result.subscribe(
            response => {
                var notification = new Notification({
                    'title':  'Patient added successfully!',
                    'type': 'SUCCESS',
                    'createdAt': Moment()
                });
                this._notificationsStore.addNotification(notification);
                // this._notificationsService.success('Success', 'Patient added successfully!');
                // setTimeout(() => {
                    this._router.navigate(['PatientsList']);
                // }, 3000);
            },
            error => {
                var notification = new Notification({
                    'title':  'Unable to add patient.',
                    'type': 'ERROR',
                    'createdAt': Moment()
                });
                this._notificationsStore.addNotification(notification);
                // this._notificationsService.error('Error', 'Unable to add patient.');
            },
            () => {
                this.isSavePatientProgress = false;
            });

    }

}