import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { List } from 'immutable';
import { BehaviorSubject } from 'rxjs/Rx';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';
import { Procedure } from '../models/procedure';
import { ProcedureService } from '../services/procedure-service';
import { SessionStore } from './session-store';


@Injectable()
export class ProcedureStore {

    private _procedures: BehaviorSubject<List<Procedure>> = new BehaviorSubject(List([]));

    constructor(
        private _procedureService: ProcedureService,
        private _sessionStore: SessionStore
    ) {
        this._sessionStore.userLogoutEvent.subscribe(() => {
            this.resetStore();
        });
    }

    resetStore() {
        this._procedures.next(this._procedures.getValue().clear());
    }

    get procedures() {
        return this._procedures.asObservable();
    }

    getProceduresBySpecialityId(specialityId: number): Observable<Procedure[]> {
        let promise = new Promise((resolve, reject) => {
            this._procedureService.getProceduresBySpecialityId(specialityId).subscribe((procedures: Procedure[]) => {
                this._procedures.next(List(procedures));
                resolve(procedures);
            }, error => {
                reject(error);
            });
        });
        return <Observable<Procedure[]>>Observable.fromPromise(promise);
    }
    
    getProceduresByRoomTestId(roomTestId: number): Observable<Procedure[]> {
        let promise = new Promise((resolve, reject) => {
            this._procedureService.getProceduresByRoomTestId(roomTestId).subscribe((procedures: Procedure[]) => {
                this._procedures.next(List(procedures));
                resolve(procedures);
            }, error => {
                reject(error);
            });
        });
        return <Observable<Procedure[]>>Observable.fromPromise(promise);
    }
}
