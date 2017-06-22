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
import { ProcedureAdapter } from '../../../commons/services/adapters/procedure-adapter';
import { SpecialityStore } from '../../../account-setup/stores/speciality-store';
import { Speciality } from '../../../account-setup/models/speciality';
import { RoomsStore } from '../../../medical-provider/rooms/stores/rooms-store';
import { Tests } from '../../../medical-provider/rooms/models/tests';
import { SpecialityService } from '../../../account-setup/services/speciality-service';
import { ProcedureCodeMasterStore } from '../../../account-setup/stores/procedure-code-master-store';
import { ConfirmDialogModule, ConfirmationService } from 'primeng/primeng';

@Component({
    selector: 'procedure-code',
    templateUrl: './procedure-code-master.html'
})

export class ProcedureCodeComponent implements OnInit {
    private _url: string = `${environment.SERVICE_BASE_URL}`;
    procedureForm: FormGroup;
    procedures: Procedure[];
    savedProcedures: Procedure[];
    selectedProceduresCodes: Procedure[] = [];
    selectedProceduresForCompanyStored: Procedure[];
    selectedProceduresForCompany: Procedure[];
    selectedProcedures: Procedure[];
    proceduresList: Procedure[] = [];
    selectedProceduresToDelete: Procedure[];
    specialities: Speciality[];
    tests: Tests[];
    proceduresArr: SelectItem[] = [];
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
    selectedProceduresCode: Procedure[];
    selectedAmount: number;
    specialityId: number;
    isDeleteProgress: boolean = false;


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
        private confirmationService: ConfirmationService,

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
        this.selectedProcedures = [];
        if (event.target.selectedOptions[0].getAttribute('data-type') == '1') {
            this.selectedOption = 1;
            this.selectedSpecialityId = parseInt(event.target.value);
            this.loadProceduresForSpeciality(this.selectedSpecialityId);
            this.loadProceduresByCompanyAndSpecialtyId(this.selectedSpecialityId);
            // this.fetchSelectedSpeciality(this.selectedSpecialityId);
            // this.selectedSpecialityId = event.target.selectedOptions[0].getAttribute('data-specialityId');
        } else if (event.target.selectedOptions[0].getAttribute('data-type') == '2') {
            this.selectedOption = 2;
            this.selectedTestId = parseInt(event.target.value);
            this.loadProceduresForRoomTest(this.selectedTestId);
            this.loadProceduresByCompanyAndRoomTestId(this.selectedTestId);
            //this.fetchSelectedTestingFacility(this.selectedTestId);
            // this.selectedTestId = event.target.selectedOptions[0].getAttribute('data-testId');
        } else {
            this.selectedMode = 0;
            this.procedures = null;
            this.selectedProcedures = [];
        }
        this.msg = '';
    }

    selectProcedures() {
        //let savedProcedures = this.selectedProceduresForCompany;
        this.selectedProceduresForCompany = _.union(this.savedProcedures, this.selectedProcedures);
        // let procedures = _.union(savedProcedures, this.selectedProcedures);
        // this.selectedProceduresForCompany = _.map(procedures, (currentProcedure: Procedure) => {
        //     return currentProcedure;
        // })
    }

    loadProceduresForSpeciality(specialityId: number) {
        this._progressBarService.show();
        let result = this._procedureCodeMasterStore.getBySpecialityAndCompanyId(specialityId, this._sessionStore.session.currentCompany.id);
        result.subscribe((procedures: Procedure[]) => {

            let procedureCodeIds: number[] = _.map(this.selectedProcedures, (currentProcedure: Procedure) => {
                return currentProcedure.id;
            });
            let procedureDetails = _.filter(procedures, (currentProcedure: Procedure) => {
                return _.indexOf(procedureCodeIds, currentProcedure.id) < 0 ? true : false;
            });
            this.proceduresArr = _.map(procedureDetails, (currProcedure: Procedure) => {
                return {
                    label: `${currProcedure.procedureCodeText} - ${currProcedure.procedureCodeDesc}`,
                    value: currProcedure.toJS()
                };
            })
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
        let result = this._procedureCodeMasterStore.getByRoomTestAndCompanyId(roomTestId, this._sessionStore.session.currentCompany.id);
        result.subscribe(
            (procedures: Procedure[]) => {
                // this.procedures = procedures;
                let procedureCodeIds: number[] = _.map(this.selectedProcedures, (currentProcedure: Procedure) => {
                    return currentProcedure.id;
                });
                let procedureDetails = _.filter(procedures, (currentProcedure: Procedure) => {
                    return _.indexOf(procedureCodeIds, currentProcedure.id) < 0 ? true : false;
                });
                this.proceduresArr = _.map(procedureDetails, (currProcedure: Procedure) => {
                    return {
                        label: `${currProcedure.procedureCodeText} - ${currProcedure.procedureCodeDesc}`,
                        value: currProcedure.toJS()
                    };
                })
            },
            (error) => {
                this._progressBarService.hide();
            },
            () => {
                this._progressBarService.hide();
            });
    }

    loadProceduresByCompanyAndSpecialtyId(specialityId: number) {
        this._progressBarService.show();
        this._procedureCodeMasterStore.getProceduresByCompanyAndSpecialtyId(this._sessionStore.session.currentCompany.id, specialityId)
            .subscribe(procedure => {
                let procedures = procedure.reverse();
                this.selectedProceduresForCompany = _.map(procedures, (currentProcedure: Procedure) => {
                    return currentProcedure.toJS();
                })
                this.selectedProceduresForCompanyStored = procedure.reverse();
                this.savedProcedures = procedure.reverse();
                // this.datasource = attorneys.reverse();
                // this.totalRecords = this.datasource.length;
                // this.attorneys = this.datasource.slice(0, 10);
            },
            (error) => {
                this._progressBarService.hide();
            },
            () => {
                this._progressBarService.hide();
            });
    }

    loadProceduresByCompanyAndRoomTestId(roomTestId: number) {
        this._progressBarService.show();
        this._procedureCodeMasterStore.getProceduresByCompanyAndRoomTestId(this._sessionStore.session.currentCompany.id, roomTestId)
            .subscribe(procedure => {
                let procedures = procedure.reverse();
                this.selectedProceduresForCompany = _.map(procedures, (currentProcedure: Procedure) => {
                    return currentProcedure.toJS();
                })
                this.selectedProceduresForCompanyStored = procedure.reverse();
                this.savedProcedures = procedure.reverse();
                // this.datasource = attorneys.reverse();
                // this.totalRecords = this.datasource.length;
                // this.attorneys = this.datasource.slice(0, 10);
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
        if (this.selectedProceduresCodes.length > 0) {
            this.selectedProceduresCodes.forEach(currentProcedure => {
                this.selProcedureCodes.push({
                    'procedureCodeID': currentProcedure.procedureCodeId,
                    'amount': currentProcedure.amount,
                    'companyID': this._sessionStore.session.currentCompany.id
                });
            });

            if (this.selectedProceduresCodes.find(selProcedure => selProcedure.amount == null || selProcedure.amount == 0)) {
                this.isSaveProgress = false;
                let errString = 'Please enter valid amount .';
                this._notificationsService.error('Oh No!', errString);
            }
            else {
                result = this._procedureCodeMasterStore.updateProcedureAmount(this.selProcedureCodes, );
                result.subscribe(
                    (response) => {

                        let notification = new Notification({
                            'title': 'Procedure code amount updated successfully!!',
                            'type': 'SUCCESS',
                            'createdAt': moment()
                        });
                        this._notificationsStore.addNotification(notification);
                        this._notificationsService.success('Welcome!', 'Procedure code amount updated successfully!.');
                        this.selProcedureCodes = [];
                        this.selectedProcedures = [];
                        this.selectedProceduresCodes = [];
                        if (this.selectedOption == 1) {
                            this.loadProceduresForSpeciality(this.selectedSpecialityId);
                            this.loadProceduresByCompanyAndSpecialtyId(this.selectedSpecialityId);
                        } else {
                            this.loadProceduresForRoomTest(this.selectedTestId);
                            this.loadProceduresByCompanyAndRoomTestId(this.selectedTestId);
                        }
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

    deleteProcedureMappings() {
        if (this.selectedProceduresCodes.length > 0) {
            this.confirmationService.confirm({
                message: 'Do you want to delete this record?',
                header: 'Delete Confirmation',
                icon: 'fa fa-trash',
                accept: () => {
                    this.selectedProceduresCodes.forEach(currentProcedure => {
                        this.isDeleteProgress = true;
                        this._progressBarService.show();
                        this._procedureCodeMasterStore.deleteProcedureMapping(currentProcedure)
                            .subscribe(
                            (response) => {
                                let notification = new Notification({
                                    'title': 'Procedure Mapping deleted successfully!',
                                    'type': 'SUCCESS',
                                    'createdAt': moment()

                                });
                                if (this.selectedOption == 1) {
                                    this.loadProceduresForSpeciality(this.selectedSpecialityId);
                                    this.loadProceduresByCompanyAndSpecialtyId(this.selectedSpecialityId);
                                } else {
                                    this.loadProceduresForRoomTest(this.selectedTestId);
                                    this.loadProceduresByCompanyAndRoomTestId(this.selectedTestId);
                                }
                                this._notificationsStore.addNotification(notification);
                                this.selectedProceduresCodes = [];
                            },
                            (error) => {
                                let errString = 'Unable to delete Procedure Mapping';
                                let notification = new Notification({
                                    'messages': ErrorMessageFormatter.getErrorMessages(error, errString),
                                    'type': 'ERROR',
                                    'createdAt': moment()
                                });
                                this.selectedProceduresCodes = [];
                                this._progressBarService.hide();
                                this.isDeleteProgress = false;
                                this._notificationsStore.addNotification(notification);
                                this._notificationsService.error('Oh No!', ErrorMessageFormatter.getErrorMessages(error, errString));
                            },
                            () => {
                                this.isDeleteProgress = false;
                                this._progressBarService.hide();
                            });
                    });
                }
            });
        } else {
            let notification = new Notification({
                'title': 'select Procedure to delete',
                'type': 'ERROR',
                'createdAt': moment()
            });
            this._notificationsStore.addNotification(notification);
            this._notificationsService.error('Oh No!', 'select Procedure to delete');
        }
    }
}