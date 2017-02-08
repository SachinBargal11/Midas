import { Patient } from '../models/patient';
import { Component, OnInit, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { SessionStore } from '../../../commons/stores/session-store';
import { NotificationsStore } from '../../../commons/stores/notifications-store';
import { PatientsStore } from '../stores/patients-store';
import { ProgressBarService } from '../../../commons/services/progress-bar-service';
import { AppValidators } from '../../../commons/utils/AppValidators';

@Component({
    selector: 'basic',
    templateUrl: './patient-basic.html'
})

export class PatientBasicComponent implements OnInit {
    patientInfoJS: any = null;
    patientInfo: Patient;
    options = {
        timeOut: 3000,
        showProgressBar: true,
        pauseOnHover: false,
        clickToClose: false
    };
    basicform: FormGroup;
    basicformControls;
    isSavePatientProgress = false;

    constructor(
        private fb: FormBuilder,
        private _router: Router,
        public _route: ActivatedRoute,
        private _notificationsStore: NotificationsStore,
        private _sessionStore: SessionStore,
        private _progressBarService: ProgressBarService,
        private _patientsStore: PatientsStore
    ) {
        this._route.parent.params.subscribe((params: any) => {
            let patientId = parseInt(params.patientId, 10);
            this._progressBarService.show();
            let result = this._patientsStore.getPatientById(patientId);
            result.subscribe(
                (patient: Patient) => {
                    this.patientInfo = patient;
                    this.patientInfoJS = patient.toJS();
                    this.patientInfoJS.user.dateOfBirth = this.patientInfoJS.user.dateOfBirth
                        ? this.patientInfoJS.user.dateOfBirth.toDate()
                        : null;
                    console.log(this.patientInfoJS);

                },
                (error) => {
                    this._router.navigate(['/patient-manager/patients']);
                    this._progressBarService.hide();
                },
                () => {
                    this._progressBarService.hide();
                });

        });
        this.basicform = this.fb.group({
            dob: [''],
            firstname: ['', Validators.required],
            lastname: ['', Validators.required],
            gender: ['', Validators.required],
            maritalStatusId: ['', Validators.required]
        });

        this.basicformControls = this.basicform.controls;
    }

    ngOnInit() {
    }


    save() {
    }

}
