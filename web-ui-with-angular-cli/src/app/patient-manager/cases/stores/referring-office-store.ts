import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';
import { ReferringOffice } from '../models/referring-office';
import { ReferringOfficeService } from '../services/referring-office-service';
import { List } from 'immutable';
import { BehaviorSubject } from 'rxjs/Rx';
import { SessionStore } from '../../../commons/stores/session-store';

@Injectable()
export class ReferringOfficeStore {

    private _referringOffices: BehaviorSubject<List<ReferringOffice>> = new BehaviorSubject(List([]));

    constructor(
        private _referringOfficeService: ReferringOfficeService,
        private _sessionStore: SessionStore
    ) {
        this._sessionStore.userLogoutEvent.subscribe(() => {
            this.resetStore();
        });
    }

    get referringOffices() {
        return this._referringOffices.asObservable();
    }

    getReferringOffices(patientId: number): Observable<ReferringOffice[]> {
        let promise = new Promise((resolve, reject) => {
            this._referringOfficeService.getReferringOffices(patientId).subscribe((referringOffices: ReferringOffice[]) => {
                this._referringOffices.next(List(referringOffices));
                resolve(referringOffices);
            }, error => {
                reject(error);
            });
        });
        return <Observable<ReferringOffice[]>>Observable.fromPromise(promise);
    }

    findReferringOfficeById(id: number) {
        let referringOffices = this._referringOffices.getValue();
        let index = referringOffices.findIndex((currentReferringOffice: ReferringOffice) => currentReferringOffice.id === id);
        return referringOffices.get(index);
    }

    fetchReferringOfficeById(id: number): Observable<ReferringOffice> {
        let promise = new Promise((resolve, reject) => {
            let matchedReferringOffice: ReferringOffice = this.findReferringOfficeById(id);
            if (matchedReferringOffice) {
                resolve(matchedReferringOffice);
            } else {
                this._referringOfficeService.getReferringOffice(id).subscribe((referringOffice: ReferringOffice) => {
                    resolve(referringOffice);
                }, error => {
                    reject(error);
                });
            }
        });
        return <Observable<ReferringOffice>>Observable.fromPromise(promise);
    }

    addReferringOffice(referringOffice: ReferringOffice): Observable<ReferringOffice> {
        let promise = new Promise((resolve, reject) => {
            this._referringOfficeService.addReferringOffice(referringOffice).subscribe((referringOffice: ReferringOffice) => {
                this._referringOffices.next(this._referringOffices.getValue().push(referringOffice));
                resolve(referringOffice);
            }, error => {
                reject(error);
            });
        });
        return <Observable<ReferringOffice>>Observable.from(promise);
    }
    updateReferringOffice(referringOffice: ReferringOffice): Observable<ReferringOffice> {
        let promise = new Promise((resolve, reject) => {
            this._referringOfficeService.updateReferringOffice(referringOffice).subscribe((updatedReferringOffice: ReferringOffice) => {
                let referringOffice: List<ReferringOffice> = this._referringOffices.getValue();
                let index = referringOffice.findIndex((currentReferringOffice: ReferringOffice) => currentReferringOffice.id === updatedReferringOffice.id);
                referringOffice = referringOffice.update(index, function () {
                    return updatedReferringOffice;
                });
                this._referringOffices.next(referringOffice);
                resolve(referringOffice);
            }, error => {
                reject(error);
            });
        });
        return <Observable<ReferringOffice>>Observable.from(promise);
    }
    deleteReferringOffice(referringOffice: ReferringOffice) {
        let referringOffices = this._referringOffices.getValue();
        let index = referringOffices.findIndex((currentReferringOffice: ReferringOffice) => currentReferringOffice.id === referringOffice.id);
        let promise = new Promise((resolve, reject) => {
            this._referringOfficeService.deleteReferringOffice(referringOffice)
                .subscribe((referringOffice: ReferringOffice) => {
                    this._referringOffices.next(referringOffices.delete(index));
                    resolve(referringOffice);
                }, error => {
                    reject(error);
                });
        });
        return <Observable<ReferringOffice>>Observable.from(promise);
    }

    resetStore() {
        this._referringOffices.next(this._referringOffices.getValue().clear());
    }
}
