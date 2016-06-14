import {Component, OnInit} from '@angular/core';
import {ControlGroup, Validators, FormBuilder} from '@angular/common';
import {ROUTER_DIRECTIVES, Router, RouteParams, RouteConfig} from '@angular/router-deprecated';
import {AppValidators} from '../../../utils/AppValidators';
import {LoaderComponent} from '../../elements/loader';
import {SimpleNotificationsComponent, NotificationsService} from 'angular2-notifications';
import {PatientsStore} from '../../../stores/patients-store';
import {Patient} from '../../../models/patient';

@Component({
    selector: 'add-patient',
    templateUrl: 'templates/pages/patients/add-patient.html',
    directives: [ROUTER_DIRECTIVES, LoaderComponent, SimpleNotificationsComponent],
    providers: [NotificationsService]
})

export class AddPatientComponent implements OnInit {
    patient = new Patient({
        'firstname': '',
        'lastname': '',
        'email': '',
        'mobileNo': '',
        'address': ''
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
        private _notificationsService: NotificationsService,
        private _routeParams: RouteParams,
        private _patientsStore: PatientsStore
    ) {
        this.patientform = fb.group({
            firstname: ['', Validators.required],
            lastname: ['', Validators.required],
            email: ['', Validators.compose([Validators.required, AppValidators.emailValidator])],
            mobileNo: ['', Validators.compose([Validators.required, AppValidators.mobileNoValidator])],
            address: ['']
        });
    }

    ngOnInit() {
        if (!window.localStorage.hasOwnProperty('session_user_name')) {
            this._router.navigate(['Login']);
        }
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
        });
        result = this._patientsStore.addPatient(patient);
        result.subscribe(
            response => {
                this._notificationsService.success('Success', 'Patient added successfully!');
                setTimeout(() => {
                    this._router.navigate(['PatientsList']);
                }, 3000);
            },
            error => {
                this._notificationsService.error('Error', 'Unable to add patient.');
            },
            () => {
                this.isSavePatientProgress = false;
            });

    }

}