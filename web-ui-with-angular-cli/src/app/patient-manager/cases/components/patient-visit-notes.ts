import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PatientVisitsStore } from '../../patient-visit/stores/patient-visit-store';
import { PatientVisit } from '../../patient-visit/models/patient-visit';
import { NotificationsStore } from '../../../commons/stores/notifications-store';
import { Notification } from '../../../commons/models/notification';
import * as moment from 'moment';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Doctor } from '../../../medical-provider/users/models/doctor';
import { Room } from '../../../medical-provider/rooms/models/room';
import { DoctorsStore } from '../../../medical-provider/users/stores/doctors-store';
import { RoomsStore } from '../../../medical-provider/rooms/stores/rooms-store';
import { ProgressBarService } from '../../../commons/services/progress-bar-service';
import { NotificationsService } from 'angular2-notifications';
import { ErrorMessageFormatter } from '../../../commons/utils/ErrorMessageFormatter';

@Component({
    selector: 'patient-visit-notes',
    templateUrl: './patient-visit-notes.html'
})

export class PatientVisitNotesComponent implements OnInit {
    patientVisitNotes: FormGroup;
    patientVisitNotesControls;
    caseId:number;
    currentVisitId:number;
    currentVisit:PatientVisit;

    constructor(
        private fb: FormBuilder,
        private _router: Router,
        public  _route: ActivatedRoute,
        private _patientVisitStore: PatientVisitsStore,
        private _notificationsStore: NotificationsStore,
        private _progressBarService: ProgressBarService,
        private _notificationsService: NotificationsService,
       
    ) {
         this._route.parent.parent.parent.params.subscribe((routeParams: any) => {
            this.caseId = parseInt(routeParams.caseId, 10);
        });
        this._route.params.subscribe((routeParams: any) => {
            this.currentVisitId = parseInt(routeParams.id, 10);
            this._progressBarService.show();
        this._patientVisitStore.fetchPatientVisitById(this.currentVisitId)
            .subscribe(currentVisit => {
                this.currentVisit = currentVisit
               

            },
            (error) => {
                this._progressBarService.hide();
            },
            () => {
                this._progressBarService.hide();
            });
        });

         this.patientVisitNotes = this.fb.group({
            notes: ['', Validators.required],
            visitStatusId: ['']
        });

        this.patientVisitNotesControls = this.patientVisitNotes.controls;

    }

    ngOnInit() {
        
    }


}