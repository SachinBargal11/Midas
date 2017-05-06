import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LazyLoadEvent, SelectItem } from 'primeng/primeng';
import { NotificationsStore } from '../../../commons/stores/notifications-store';
import { SessionStore } from '../../../commons/stores/session-store';
import { Notification } from '../../../commons/models/notification';
import * as moment from 'moment';
import * as _ from 'underscore';
import { Observable } from 'rxjs/Rx';
import { ProgressBarService } from '../../../commons/services/progress-bar-service';
import { NotificationsService } from 'angular2-notifications';
import { ErrorMessageFormatter } from '../../../commons/utils/ErrorMessageFormatter';
import { environment } from '../../../../environments/environment';
import { Procedure } from '../../../commons/models/procedure';
import { ProcedureStore } from '../../../commons/stores/procedure-store';
import { SpecialityStore } from '../../../account-setup/stores/speciality-store';
import { Speciality } from '../../../account-setup/models/speciality';
import { RoomsStore } from '../../../medical-provider/rooms/stores/rooms-store';
import { Tests } from '../../../medical-provider/rooms/models/tests';
import { SpecialityService } from '../../../account-setup/services/speciality-service';

@Component({
    selector: 'procedure-code',
    templateUrl: './procedure-code.html'
})

export class ProcedureCodeComponent implements OnInit {
    private _url: string = `${environment.SERVICE_BASE_URL}`;
    procedureForm: FormGroup;
    procedures: Procedure[];
    selectedProcedures: Procedure[];
    proceduresList: Procedure[] = [];
    selectedProceduresToDelete: Procedure[];
    specialities: Speciality[];
    tests: Tests[];
    selectedSpeciality: Speciality;
    selectedTestingFacility: Tests;
    selectedMode: number = 0;
    selectedDoctorId: number;
    selectedRoomId: number;
    selectedOption: number;
    selectedSpecialityId: number;
    selectedTestId: number;
    msg: string;

    constructor(
        private _notificationsService: NotificationsService,
        private fb: FormBuilder,
        private _progressBarService: ProgressBarService,
        private _procedureStore: ProcedureStore,
        private _specialityStore: SpecialityStore,
        private _roomsStore: RoomsStore,
        private _specialityService: SpecialityService
    ) {
        
    }
    ngOnInit() {
        this.loadAllSpecialitiesAndTests();
    }
    loadAllSpecialitiesAndTests() {
        this._progressBarService.show();
        let fetchAllSpecialities = this._specialityStore.getSpecialities();
        let fetchAllTestFacilties = this._roomsStore.getTests();
        Observable.forkJoin([fetchAllSpecialities, fetchAllTestFacilties])
            .subscribe(
            (results: any) => {
                this.specialities = results[0];
                this.tests = results[1];
            },
            (error) => {
                this._progressBarService.hide();
            },
            () => {
                this._progressBarService.hide();
            });
    }

    selectOption(event) {
      
        this.selectedDoctorId = 0;
        this.selectedRoomId = 0;
        this.selectedOption = 0;
        if (event.target.selectedOptions[0].getAttribute('data-type') == '1') {
            this.selectedOption = 1;
            this.selectedSpecialityId = parseInt(event.target.value);
            this.loadProceduresForSpeciality(this.selectedSpecialityId);
            // this.fetchSelectedSpeciality(this.selectedSpecialityId);
            // this.selectedSpecialityId = event.target.selectedOptions[0].getAttribute('data-specialityId');
        } else if (event.target.selectedOptions[0].getAttribute('data-type') == '2') {
            this.selectedOption = 2;
            this.selectedTestId = parseInt(event.target.value);
            this.loadProceduresForRoomTest(this.selectedTestId);
            //this.fetchSelectedTestingFacility(this.selectedTestId);
            // this.selectedTestId = event.target.selectedOptions[0].getAttribute('data-testId');
        } else {
            this.selectedMode = 0;
            this.procedures = null;
        }
        this.msg = '';
    }


    loadProceduresForSpeciality(specialityId: number) {
        this._progressBarService.show();
        let result = this._procedureStore.getProceduresBySpecialityId(specialityId);
        result.subscribe(
            (procedures: Procedure[]) => {
                // this.procedures = procedures;
                let procedureCodeIds: number[] = _.map(this.selectedProcedures, (currentProcedure: Procedure) => {
                    return currentProcedure.id;
                });
                let procedureDetails = _.filter(procedures, (currentProcedure: Procedure) => {
                    return _.indexOf(procedureCodeIds, currentProcedure.id) < 0 ? true : false;
                });
                this.procedures = procedureDetails;
            },
            (error) => {
                this._progressBarService.hide();
            },
            () => {
                this._progressBarService.hide();
            });
    }

    loadProceduresForRoomTest(roomTestId: number) {
        this._progressBarService.show();
        let result = this._procedureStore.getProceduresByRoomTestId(roomTestId);
        result.subscribe(
            (procedures: Procedure[]) => {
                // this.procedures = procedures;
                let procedureCodeIds: number[] = _.map(this.selectedProcedures, (currentProcedure: Procedure) => {
                    return currentProcedure.id;
                });
                let procedureDetails = _.filter(procedures, (currentProcedure: Procedure) => {
                    return _.indexOf(procedureCodeIds, currentProcedure.id) < 0 ? true : false;
                });
                this.procedures = procedureDetails;
            },
            (error) => {
                this._progressBarService.hide();
            },
            () => {
                this._progressBarService.hide();
            });
    }

    saveProcedures() {

    }
}
