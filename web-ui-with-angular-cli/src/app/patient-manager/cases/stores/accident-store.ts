import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';
import { Accident } from '../models/accident';
import { AccidentService } from '../services/accident-services';
import {List} from 'immutable';
import {BehaviorSubject} from 'rxjs/Rx';
import {SessionStore} from '../../../commons/stores/session-store';
import { PriorAccidentAdapter } from '../services/adapters/prior-accident-adapter';
import { PriorAccident } from '../models/prior-accident';

@Injectable()
export class AccidentStore {

    private _accident: BehaviorSubject<List<Accident>> = new BehaviorSubject(List([]));
    private _priorAccident: BehaviorSubject<List<PriorAccident>> = new BehaviorSubject(List([]));

    constructor(
        private _accidentService:  AccidentService,
        private _sessionStore: SessionStore
    ) {
        
        this._sessionStore.userLogoutEvent.subscribe(() => {
            this.resetStore();
        });
    }

    resetStore() {
        this._accident.next(this._accident.getValue().clear());
        this._priorAccident.next(this._priorAccident.getValue().clear());
    }

    get accidents() {
        return this._accident.asObservable();
    }

    get priorAccidents() {
        return this._priorAccident.asObservable();
    }

    getAccidents(caseId: Number): Observable<Accident[]> {
        let promise = new Promise((resolve, reject) => {
            this._accidentService.getAccidents(caseId).subscribe((accidents: Accident[]) => {
                this._accident.next(List(accidents));
                resolve(accidents);
            }, error => {
                reject(error);
            });
        });
        return <Observable<Accident[]>>Observable.fromPromise(promise);
    }

    findAccidentById(id: number) {
        let accidents = this._accident.getValue();
        let index = accidents.findIndex((currentAccident: Accident) => currentAccident.id === id);
        return accidents.get(index);
    }

    fetchAccidentById(id: number): Observable<Accident> {
        let promise = new Promise((resolve, reject) => {
            let matchedAccident: Accident = this.findAccidentById(id);
            if (matchedAccident) {
                resolve(matchedAccident);
            } else {
                this._accidentService.getAccident(id).subscribe((accident: Accident) => {
                    resolve(accident);
                }, error => {
                    reject(error);
                });
            }
        });
        return <Observable<Accident>>Observable.fromPromise(promise);
    }

    addAccident(accidentDetail: Accident): Observable<Accident> {
        let promise = new Promise((resolve, reject) => {
            this._accidentService.addAccident(accidentDetail).subscribe((accidentDetail: Accident) => {
                this._accident.next(this._accident.getValue().push(accidentDetail));
                resolve(accidentDetail);
            }, error => {
                reject(error);
            });
        });
        return <Observable<Accident>>Observable.from(promise);
    }

    updateAccident(accidentDetail: Accident,accidentId: number): Observable<Accident> {
        let promise = new Promise((resolve, reject) => {
            this._accidentService.updateAccident(accidentDetail,accidentId).subscribe((updateAccident: Accident) => {
                let accidentDetail: List<Accident> = this._accident.getValue();
                let index = accidentDetail.findIndex((currentAccident: Accident) => currentAccident.id === updateAccident.id);
                accidentDetail = accidentDetail.update(index, function () {
                    return updateAccident;
                });
                this._accident.next(accidentDetail);
                resolve(accidentDetail);
            }, error => {
                reject(error);
            });
        });
        return <Observable<Accident>>Observable.from(promise);
    }

    deleteAccident(accidentDetail: Accident): Observable<Accident> {
        let accident = this._accident.getValue();
        let index = accident.findIndex((currentAccident: Accident) => currentAccident.id === accidentDetail.id);
        let promise = new Promise((resolve, reject) => {
            this._accidentService.deleteAccident(accidentDetail).subscribe((accidentDetail: Accident) => {
                this._accident.next(accident.delete(index));
                resolve(accidentDetail);
            }, error => {
                reject(error);
            });
        });
        return <Observable<Accident>>Observable.from(promise);
    }

// Prior Accident/Injuries service
    getPriorAccidentByCaseId(caseId: Number): Observable<PriorAccident[]> {
        let promise = new Promise((resolve, reject) => {
            this._accidentService.getPriorAccidentByCaseId(caseId).subscribe((priorAccidentDetail: PriorAccident[]) => {
                this._priorAccident.next(List(priorAccidentDetail));
                resolve(priorAccidentDetail);
            }, error => {
                reject(error);
            });
        });
        return <Observable<PriorAccident[]>>Observable.fromPromise(promise);
    }
    savePriorAccident(priorAccidentDetail: PriorAccident): Observable<PriorAccident> {
        let promise = new Promise((resolve, reject) => {
            this._accidentService.savePriorAccident(priorAccidentDetail).subscribe((priorAccidentDetail: PriorAccident) => {
                this._priorAccident.next(this._priorAccident.getValue().push(priorAccidentDetail));
                resolve(priorAccidentDetail);
            }, error => {
                reject(error);
            });
        });
        return <Observable<PriorAccident>>Observable.from(promise);
    }
}
