import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { List } from 'immutable';
import { BehaviorSubject } from 'rxjs/Rx';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';
import * as _ from 'underscore';
import { Procedure } from '../../commons/models/procedure';
import { ProcedureCodeMasterService } from '../services/procedure-code-master-service';
import { SessionStore } from '../../commons/stores/session-store';


@Injectable()
export class ProcedureCodeMasterStore {

    private _procedure: BehaviorSubject<List<Procedure>> = new BehaviorSubject(List([]));

    constructor(
        private _procedureCodeMasterService: ProcedureCodeMasterService,

        private _sessionStore: SessionStore
    ) {
        this._sessionStore.userLogoutEvent.subscribe(() => {
            this.resetStore();
        });
    }
    resetStore() {
        this._procedure.next(this._procedure.getValue().clear());
    }


    getBySpecialityAndCompanyId(specialityId: number, companyId: number): Observable<Procedure[]> {
        let promise = new Promise((resolve, reject) => {
            this._procedureCodeMasterService.getProcedureCodeBySpecialtyExcludingAssigned(specialityId, companyId).subscribe((procedures: Procedure[]) => {
                this._procedure.next(List(procedures));
                resolve(procedures);
            }, error => {
                reject(error);
            });
        });
        return <Observable<Procedure[]>>Observable.fromPromise(promise);
    }

    getByRoomTestAndCompanyId(roomTestId: number, companyId: number): Observable<Procedure[]> {
        let promise = new Promise((resolve, reject) => {
            this._procedureCodeMasterService.getProcedureCodeByRoomTestExcludingAssigned(roomTestId, companyId).subscribe((procedures: Procedure[]) => {
                this._procedure.next(List(procedures));
                resolve(procedures);
            }, error => {
                reject(error);
            });
        });
        return <Observable<Procedure[]>>Observable.fromPromise(promise);
    }

    updateProcedureAmount(selProcedure: Procedure[]): Observable<Procedure[]> {
        let promise = new Promise((resolve, reject) => {
            this._procedureCodeMasterService.updateProcedureAmount(selProcedure).subscribe((selProcedure: Procedure[]) => {
                _.forEach(selProcedure, (proc: Procedure) => {
                    this._procedure.next(this._procedure.getValue().push(proc));
                });
                resolve(selProcedure);
            }, error => {
                reject(error);
            });
        });


        return <Observable<Procedure[]>>Observable.from(promise);
    }

    getProceduresByCompanyId(companyId: number): Observable<Procedure[]> {
        let promise = new Promise((resolve, reject) => {
            this._procedureCodeMasterService.getProceduresByCompanyId(companyId).subscribe((procedures: Procedure[]) => {
                resolve(procedures);
            }, error => {
                reject(error);
            });
        });
        return <Observable<Procedure[]>>Observable.fromPromise(promise);
    }
    getProceduresByCompanyAndSpecialtyId(specialityId: number, companyId: number): Observable<Procedure[]> {
        let promise = new Promise((resolve, reject) => {
            this._procedureCodeMasterService.getProceduresByCompanyAndSpecialtyId(specialityId, companyId).subscribe((procedures: Procedure[]) => {
                // this._procedure.next(List(procedures));
                resolve(procedures);
            }, error => {
                reject(error);
            });
        });
        return <Observable<Procedure[]>>Observable.fromPromise(promise);
    }

    getProceduresByCompanyAndRoomTestId(roomTestId: number, companyId: number): Observable<Procedure[]> {
        let promise = new Promise((resolve, reject) => {
            this._procedureCodeMasterService.getProceduresByCompanyAndRoomTestId(roomTestId, companyId).subscribe((procedures: Procedure[]) => {
                // this._procedure.next(List(procedures));
                resolve(procedures);
            }, error => {
                reject(error);
            });
        });
        return <Observable<Procedure[]>>Observable.fromPromise(promise);
    }

    deleteProcedureMapping(procedure: Procedure) : Observable<Procedure> {
        let proceduresMap = this._procedure.getValue();
        let index = proceduresMap.findIndex((currentprocedureMapping: Procedure) => currentprocedureMapping.id === procedure.id);
        let promise = new Promise((resolve, reject) => {
            this._procedureCodeMasterService.deleteProcedureMapping(procedure).subscribe((procedure: Procedure) => {
                    this._procedure.next(proceduresMap.delete(index));
                    resolve(procedure);
                }, error => {
                    reject(error);
                });
        });
        return <Observable<Procedure>>Observable.from(promise);
    }

    UpdatePreffredProcedureMapping(procedure: Procedure) : Observable<Procedure> {
        let proceduresMap = this._procedure.getValue();
        let index = proceduresMap.findIndex((currentprocedureMapping: Procedure) => currentprocedureMapping.id === procedure.id);
        let promise = new Promise((resolve, reject) => {
            this._procedureCodeMasterService.updatePreffredProcedureMapping(procedure).subscribe((procedure: Procedure) => {
                    resolve(procedure);
                }, error => {
                    reject(error);
                });
        });
        return <Observable<Procedure>>Observable.from(promise);
    }


    updatePreffredProcedureMappingMultiple(selProcedure: Procedure[]): Observable<Procedure[]> {
        let promise = new Promise((resolve, reject) => {
            this._procedureCodeMasterService.updatePreffredProcedureMappingMultiple(selProcedure).subscribe((selProcedure: Procedure[]) => {
                _.forEach(selProcedure, (proc: Procedure) => {
                    this._procedure.next(this._procedure.getValue().push(proc));
                });
                resolve(selProcedure);
            }, error => {
                reject(error);
            });
        });
        return <Observable<Procedure[]>>Observable.from(promise);
    }

    RemoveupdatePreffredProcedureMappingMultiple(selProcedure: Procedure[]): Observable<Procedure[]> {
        let promise = new Promise((resolve, reject) => {
            this._procedureCodeMasterService.RemoveupdatePreffredProcedureMappingMultiple(selProcedure).subscribe((selProcedure: Procedure[]) => {
                _.forEach(selProcedure, (proc: Procedure) => {
                    this._procedure.next(this._procedure.getValue().push(proc));
                });
                resolve(selProcedure);
            }, error => {
                reject(error);
            });
        });
        return <Observable<Procedure[]>>Observable.from(promise);
    }

}