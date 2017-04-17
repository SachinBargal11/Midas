import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {PatientsStore} from '../stores/patients-store';
import { SessionStore } from '../../../commons/stores/session-store';
import { ProgressBarService } from '../../../commons/services/progress-bar-service';
import { Patient } from '../../patients/models/patient';


@Component({
    selector: 'patients-shell',
    templateUrl: './patients-shell.html'
})

export class PatientsShellComponent implements OnInit {
     patientId: number;
     patientName: string;
     patient: Patient;

    constructor(
        public _router: Router,
        private _patientStore: PatientsStore,
        private _sessionStore: SessionStore,
        private _progressBarService: ProgressBarService,
        public _route: ActivatedRoute,
    ) {

        this._route.params.subscribe((routeParams: any) => {
            this.patientId = parseInt(routeParams.patientId, 10);
            this._progressBarService.show();
            this._patientStore.fetchPatientById(this.patientId)
                .subscribe(
                (patient: Patient) => {
                    this.patient = patient;
                    this.patientName = patient.user.firstName + ' ' + patient.user.lastName;
                },
                (error) => {
                    this._router.navigate(['../'], { relativeTo: this._route });
                    this._progressBarService.hide();
                },
                () => {
                    this._progressBarService.hide();
                });
        });    
         this._sessionStore.userCompanyChangeEvent.subscribe(() => {
            this._router.navigate(['/patient-manager/patients']);
        });

    }

    ngOnInit() {

    }

}