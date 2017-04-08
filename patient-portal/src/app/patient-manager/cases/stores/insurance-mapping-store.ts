import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';
import { InsuranceMapping } from '../models/insurance-mapping';
import { InsuranceMappingService } from '../services/insurance-mapping-service';
import { List } from 'immutable';
import { BehaviorSubject } from 'rxjs/Rx';
import { SessionStore } from '../../../commons/stores/session-store';

@Injectable()
export class InsuranceMappingStore {

    private _insuranceMappings: BehaviorSubject<List<InsuranceMapping>> = new BehaviorSubject(List([]));

    constructor(
        private _insuranceMappingService: InsuranceMappingService,
        public sessionStore: SessionStore
    ) {
        this.sessionStore.userLogoutEvent.subscribe(() => {
            this.resetStore();
        });
    }

    resetStore() {
        this._insuranceMappings.next(this._insuranceMappings.getValue().clear());
    }

    get insuranceMapping() {
        return this._insuranceMappings.asObservable();
    }

    getInsuranceMappings(caseId: number): Observable<InsuranceMapping> {
        let promise = new Promise((resolve, reject) => {
            this._insuranceMappingService.getInsuranceMappings(caseId).subscribe((insuranceMappings: InsuranceMapping) => {
                // this._insuranceMappings.next(List(insuranceMappings));
                resolve(insuranceMappings);
            }, error => {
                reject(error);
            });
        });
        return <Observable<InsuranceMapping>>Observable.fromPromise(promise);
    }

    findInsuranceMappingById(id: number) {
        let insuranceMappings = this._insuranceMappings.getValue();
        let index = insuranceMappings.findIndex((currentInsuranceMapping: InsuranceMapping) => currentInsuranceMapping.id === id);
        return insuranceMappings.get(index);
    }

    fetchInsuranceMappingById(id: number): Observable<InsuranceMapping> {
        let promise = new Promise((resolve, reject) => {
            let matchedInsuranceMapping: InsuranceMapping = this.findInsuranceMappingById(id);
            if (matchedInsuranceMapping) {
                resolve(matchedInsuranceMapping);
            } else {
                this._insuranceMappingService.getInsuranceMapping(id).subscribe((insuranceMapping: InsuranceMapping) => {
                    resolve(insuranceMapping);
                }, error => {
                    reject(error);
                });
            }
        });
        return <Observable<InsuranceMapping>>Observable.fromPromise(promise);
    }

    addInsuranceMapping(insuranceMapping: InsuranceMapping): Observable<InsuranceMapping> {
        let promise = new Promise((resolve, reject) => {
            this._insuranceMappingService.addInsuranceMapping(insuranceMapping).subscribe((insuranceMapping: InsuranceMapping) => {
                this._insuranceMappings.next(this._insuranceMappings.getValue().push(insuranceMapping));
                resolve(insuranceMapping);
            }, error => {
                reject(error);
            });
        });
        return <Observable<InsuranceMapping>>Observable.from(promise);
    }

    updateInsuranceMapping(insuranceMapping: InsuranceMapping): Observable<InsuranceMapping> {
        let promise = new Promise((resolve, reject) => {
            this._insuranceMappingService.updateInsuranceMapping(insuranceMapping).subscribe((updatedInsuranceMapping: InsuranceMapping) => {
                let insuranceMapping: List<InsuranceMapping> = this._insuranceMappings.getValue();
                let index = insuranceMapping.findIndex((currentInsuranceMapping: InsuranceMapping) => currentInsuranceMapping.id === updatedInsuranceMapping.id);
                insuranceMapping = insuranceMapping.update(index, function () {
                    return updatedInsuranceMapping;
                });
                this._insuranceMappings.next(insuranceMapping);
                resolve(insuranceMapping);
            }, error => {
                reject(error);
            });
        });
        return <Observable<InsuranceMapping>>Observable.from(promise);
    }

    deleteInsuranceMapping(insuranceMapping: InsuranceMapping): Observable<InsuranceMapping> {
        let insuranceMappings = this._insuranceMappings.getValue();
        let index = insuranceMappings.findIndex((currentInsuranceMapping: InsuranceMapping) => currentInsuranceMapping.id === insuranceMapping.id);
        let promise = new Promise((resolve, reject) => {
            this._insuranceMappingService.deleteInsuranceMapping(insuranceMapping).subscribe((insuranceMapping: InsuranceMapping) => {
                this._insuranceMappings.next(insuranceMappings.delete(index));
                resolve(insuranceMapping);
            }, error => {
                reject(error);
            });
        });
        return <Observable<InsuranceMapping>>Observable.from(promise);
    }
}
