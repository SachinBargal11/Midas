import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';
import { InsuranceMaster } from '../../patient-manager/patients/models/insurance-master';
import { InsuranceMasterService } from '../services/insurance-master-service';
import { List } from 'immutable';
import { BehaviorSubject } from 'rxjs/Rx';
import { SessionStore } from '../../commons/stores/session-store';

@Injectable()
export class InsuranceMasterStore {

    private _insuranceMaster: BehaviorSubject<List<InsuranceMaster>> = new BehaviorSubject(List([]));

    constructor(
        private _insuranceMasterService: InsuranceMasterService,
        private _sessionStore: SessionStore
    ) {
        this._sessionStore.userLogoutEvent.subscribe(() => {
            this.resetStore();
        });
    }

    get insuranceMasters() {
        return this._insuranceMaster.asObservable();
    }

    getAllInsuranceMasters(): Observable<InsuranceMaster[]> {
        let companyId: number = this._sessionStore.session.currentCompany.id;
        let promise = new Promise((resolve, reject) => {
            this._insuranceMasterService.getAllInsuranceMasters().subscribe((insuranceMaster: InsuranceMaster[]) => {
                this._insuranceMaster.next(List(insuranceMaster));
                resolve(insuranceMaster);
            }, error => {
                reject(error);
            });
        });
        return <Observable<InsuranceMaster[]>>Observable.fromPromise(promise);
    }

    findInsuranceMasterById(id: number): InsuranceMaster {
        let insuranceMasters = this._insuranceMaster.getValue();
        let index = insuranceMasters.findIndex((currentInsuranceMaster: InsuranceMaster) => currentInsuranceMaster.id === id);
        return insuranceMasters.get(index);
    }

    fetchInsuranceMasterById(id: number): Observable<InsuranceMaster> {
        let promise = new Promise((resolve, reject) => {
            let matchedInsuranceMaster: InsuranceMaster = this.findInsuranceMasterById(id);
            if (matchedInsuranceMaster) {
                resolve(matchedInsuranceMaster);
            } else {
                this._insuranceMasterService.getInsuranceMaster(id).subscribe((insuranceMaster: InsuranceMaster) => {
                    resolve(insuranceMaster);
                }, error => {
                    reject(error);
                });
            }
        });
        return <Observable<InsuranceMaster>>Observable.fromPromise(promise);
    }

    addInsuranceMaster(insuranceMaster: InsuranceMaster): Observable<InsuranceMaster> {
        let promise = new Promise((resolve, reject) => {
            this._insuranceMasterService.addInsuranceMaster(insuranceMaster).subscribe((insuranceMaster: InsuranceMaster) => {
                this._insuranceMaster.next(this._insuranceMaster.getValue().push(insuranceMaster));
                resolve(insuranceMaster);
            }, error => {
                reject(error);
            });
        });
        return <Observable<InsuranceMaster>>Observable.from(promise);
    }
    updateInsuranceMaster(insuranceMaster: InsuranceMaster): Observable<InsuranceMaster> {
        let promise = new Promise((resolve, reject) => {
            this._insuranceMasterService.updateInsuranceMaster(insuranceMaster).subscribe((updatedInsuranceMaster: InsuranceMaster) => {
                let insuranceMaster: List<InsuranceMaster> = this._insuranceMaster.getValue();
                let index = insuranceMaster.findIndex((currentInsuranceMaster: InsuranceMaster) => currentInsuranceMaster.id === updatedInsuranceMaster.id);
                insuranceMaster = insuranceMaster.update(index, function () {
                    return updatedInsuranceMaster;
                });
                this._insuranceMaster.next(insuranceMaster);
                resolve(insuranceMaster);
            }, error => {
                reject(error);
            });
        });
        return <Observable<InsuranceMaster>>Observable.from(promise);
    }
    deleteInsuranceMaster(insuranceMaster: InsuranceMaster) {
        let insuranceMasters = this._insuranceMaster.getValue();
        let index = insuranceMasters.findIndex((currentInsuranceMaster: InsuranceMaster) => currentInsuranceMaster.id === insuranceMaster.id);
        let promise = new Promise((resolve, reject) => {
            this._insuranceMasterService.deleteInsuranceMaster(insuranceMaster)
                .subscribe((insuranceMaster: InsuranceMaster) => {
                    this._insuranceMaster.next(insuranceMasters.delete(index));
                    resolve(insuranceMaster);
                }, error => {
                    reject(error);
                });
        });
        return <Observable<InsuranceMaster>>Observable.from(promise);
    }

    resetStore() {
        this._insuranceMaster.next(this._insuranceMaster.getValue().clear());
    }
}
