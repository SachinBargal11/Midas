import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';
import { Attorney } from '../models/attorney';
import { AttorneyService } from '../services/attorney-services';
import { List } from 'immutable';
import { BehaviorSubject } from 'rxjs/Rx';
import { SessionStore } from '../../../commons/stores/session-store';

@Injectable()
export class AttorneyStore {

    private _attorney: BehaviorSubject<List<Attorney>> = new BehaviorSubject(List([]));

    constructor(
        private _attorneyService: AttorneyService,
        private _sessionStore: SessionStore
    ) {

        this._sessionStore.userLogoutEvent.subscribe(() => {
            this.resetStore();
        });
    }

    resetStore() {
        this._attorney.next(this._attorney.getValue().clear());
    }

    get attorney() {
        return this._attorney.asObservable();
    }

    getAttorney(): Observable<Attorney[]> {
        let promise = new Promise((resolve, reject) => {
            this._attorneyService.getAttorneys().subscribe((attorney: Attorney[]) => {
                this._attorney.next(List(attorney));
                resolve(attorney);
            }, error => {
                reject(error);
            });
        });
        return <Observable<Attorney[]>>Observable.fromPromise(promise);
    }

    findAttorneyById(id: number) {
        let attorney = this._attorney.getValue();
        let index = attorney.findIndex((currentAttorney: Attorney) => currentAttorney.id === id);
        return attorney.get(index);
    }

    fetchAttorneyById(id: number): Observable<Attorney> {
        let promise = new Promise((resolve, reject) => {
            let matchedAttorney: Attorney = this.findAttorneyById(id);
            if (matchedAttorney) {
                resolve(matchedAttorney);
            } else {
                this._attorneyService.getAttorney(id).subscribe((attorneyDetail: Attorney) => {
                    resolve(attorneyDetail);
                }, error => {
                    reject(error);
                });
            }
        });
        return <Observable<Attorney>>Observable.fromPromise(promise);
    }

    addAttorney(attorneyDetail: Attorney): Observable<Attorney> {
        let promise = new Promise((resolve, reject) => {
            this._attorneyService.addAttorney(attorneyDetail).subscribe((attorneyDetail: Attorney) => {
                this._attorney.next(this._attorney.getValue().push(attorneyDetail));
                resolve(attorneyDetail);
            }, error => {
                reject(error);
            });
        });
        return <Observable<Attorney>>Observable.from(promise);
    }

    updateAttorney(attorneyDetail: Attorney): Observable<Attorney> {
        let promise = new Promise((resolve, reject) => {
            this._attorneyService.updateAttorney(attorneyDetail).subscribe((updatedAttorney: Attorney) => {
                let attorneyDetail: List<Attorney> = this._attorney.getValue();
                let index = attorneyDetail.findIndex((currentCase: Attorney) => currentCase.id === updatedAttorney.id);
                attorneyDetail = attorneyDetail.update(index, function () {
                    return updatedAttorney;
                });
                this._attorney.next(attorneyDetail);
                resolve(attorneyDetail);
            }, error => {
                reject(error);
            });
        });
        return <Observable<Attorney>>Observable.from(promise);
    }

    deleteAttorney(attorneyDetail: Attorney): Observable<Attorney> {
        let attorney = this._attorney.getValue();
        let index = attorney.findIndex((currentAttorney: Attorney) => currentAttorney.id === attorneyDetail.id);
        let promise = new Promise((resolve, reject) => {
            this._attorneyService.deleteAttorney(attorneyDetail).subscribe((attorneyDetail: Attorney) => {
                this._attorney.next(attorney.delete(index));
                resolve(attorneyDetail);
            }, error => {
                reject(error);
            });
        });
        return <Observable<Attorney>>Observable.from(promise);
    }
}
