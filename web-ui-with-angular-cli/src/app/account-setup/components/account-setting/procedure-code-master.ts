import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
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
import { ProcedureCodeMasterStore } from '../../../account-setup/stores/procedure-code-master-store';

@Component({
    selector: 'procedure-code',
    templateUrl: './procedure-code-master.html'
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
    arrAll: Procedure[];
    isSaveProgress = false;
    selProcedureCodes = [];
    amount;
    codeform;
    constructor(
        private _notificationsService: NotificationsService,
        private fb: FormBuilder,
        private _progressBarService: ProgressBarService,
        private _procedureStore: ProcedureStore,
        private _specialityStore: SpecialityStore,
        private _roomsStore: RoomsStore,
        private _specialityService: SpecialityService,
        private _sessionStore: SessionStore,
        private _procedureCodeMasterStore: ProcedureCodeMasterStore,
        private _router: Router,
        public _route: ActivatedRoute,
        private _notificationsStore: NotificationsStore,
    ) {

    }
    ngOnInit() {
        this.selectedProcedures = [];
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

                let procedureCodeIds: number[] = _.map(this.selectedProcedures, (currentProcedure: Procedure) => {
                    return currentProcedure.id;
                });
                let procedureDetails = _.filter(procedures, (currentProcedure: Procedure) => {
                    return _.indexOf(procedureCodeIds, currentProcedure.id) < 0 ? true : false;
                });
                let proc: Procedure[] = _.map(procedureDetails, (currProcedure: Procedure) => {
                    return currProcedure.toJS();
                })
                this.procedures = proc;
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
                let proc: Procedure[] = _.map(procedureDetails, (currProcedure: Procedure) => {
                    return currProcedure.toJS();
                })
                this.procedures = proc;
            },
            (error) => {
                this._progressBarService.hide();
            },
            () => {
                this._progressBarService.hide();
            });
    }

    saveProcedures() {
        let result;
        this.isSaveProgress = true;
        if (this.selectedProcedures.length > 0) {
            this.selectedProcedures.forEach(currentId => {
                this.selProcedureCodes.push({ 'id': currentId.id, 'amount': currentId.amount });
            });

            result = this._procedureCodeMasterStore.updateProcedureAmount(this.selProcedureCodes);

            result.subscribe(
                (response) => {

                    let notification = new Notification({
                        'title': 'Procedure code amount updated successfully!!',
                        'type': 'SUCCESS',
                        'createdAt': moment()
                    });
                    this._notificationsStore.addNotification(notification);
                    // this._notificationsService.success('Welcome!', 'Procedure code amount updated successfully!.');
                    this._router.navigate(['../../'], { relativeTo: this._route });
                    this.selProcedureCodes = [];
                    this.selectedProcedures = [];
                    this.loadProceduresForSpeciality(this.selectedSpecialityId);
                    this.loadProceduresForRoomTest(this.selectedTestId);

                },
                (error) => {
                    this.isSaveProgress = false;
                    let errString = 'Unable to  Updated procedure code amount .';
                    this._notificationsService.error('Oh No!', ErrorMessageFormatter.getErrorMessages(error, errString));
                },
                () => {
                    this.isSaveProgress = false;
                });
        }
        else {
            this.isSaveProgress = false;
            let notification = new Notification({
                'title': 'Select record to update',
                'type': 'ERROR',
                'createdAt': moment()
            });
            this._notificationsStore.addNotification(notification);
            this._notificationsService.error('Oh No!', 'Select record to update');
        }
    }

    reset() {
        this.selectedMode = 0;
        this.procedures = null;
        this.selectedProcedures = [];
        this.loadAllSpecialitiesAndTests();
    }
}