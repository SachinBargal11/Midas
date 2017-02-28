import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SessionStore } from '../../../commons/stores/session-store';
import { ProgressBarService } from '../../../commons/services/progress-bar-service';
import { CasesStore } from '../stores/case-store';
import { Case } from '../models/case';
import { Patient } from '../../patients/models/patient';
import { PatientsStore } from '../../patients/stores/patients-store';

@Component({
    selector: 'caseslist',
    templateUrl: './cases-list.html'
})


export class CasesListComponent implements OnInit {
    cases: Case[];
    patientId: number;
    patientName: string;
    patient:Patient;

    constructor(
        public _route: ActivatedRoute,
        private _router: Router,
        private _sessionStore: SessionStore,
        private _casesStore: CasesStore,
        private _patientStore: PatientsStore,
        private _progressBarService: ProgressBarService
    ) {
        this._route.parent.params.subscribe((routeParams: any) => {
            this.patientId = parseInt(routeParams.patientId, 10);
                  this._progressBarService.show();
            this._patientStore.fetchPatientById(this.patientId)
                .subscribe(
                (patient: Patient) => {
                    this.patient = patient;
                    this.patientName = patient.user.firstName + ' ' + patient.user.lastName ;
                },
                (error) => {
                    this._router.navigate(['../'], { relativeTo: this._route });
                    this._progressBarService.hide();
                },
                () => {
                    this._progressBarService.hide();
                });
        });
    }
    ngOnInit() {
        this.loadCases();
    }

    loadCases() {
        this._progressBarService.show();
        this._casesStore.getCases(this.patientId)
            .subscribe(cases => {
                this.cases = cases;
            },
            (error) => {
                this._progressBarService.hide();
            },
            () => {
                this._progressBarService.hide();
            });
    }
}