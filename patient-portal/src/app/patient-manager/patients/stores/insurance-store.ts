import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';
import { Insurance } from '../models/insurance';
import { InsuranceMaster } from '../models/insurance-master';
import { InsuranceService } from '../services/insurance-service';
import { List } from 'immutable';
import { BehaviorSubject } from 'rxjs/Rx';
import { SessionStore } from '../../../commons/stores/session-store';

@Injectable()
export class InsuranceStore {

    private _insurances: BehaviorSubject<List<Insurance>> = new BehaviorSubject(List([]));

    constructor(
        private _insuranceService: InsuranceService,
        public sessionStore: SessionStore
    ) {
        this.sessionStore.userLogoutEvent.subscribe(() => {
            this.resetStore();
        });
    }

    get insurances() {
        return this._insurances.asObservable();
    }

    getInsurances(caseId: number): Observable<Insurance[]> {
        let promise = new Promise((resolve, reject) => {
            this._insuranceService.getInsurances(caseId).subscribe((insurances: Insurance[]) => {
                this._insurances.next(List(insurances));
                resolve(insurances);
            }, error => {
                reject(error);
            });
        });
        return <Observable<Insurance[]>>Observable.fromPromise(promise);
    }
//
  getInsuranceMasterById(insuranceMasterId: number): Observable<InsuranceMaster> {
        let promise = new Promise((resolve, reject) => {
            this._insuranceService.getInsuranceMasterById(insuranceMasterId).subscribe((insurancesMaster: InsuranceMaster) => {
                resolve(insurancesMaster);
            }, error => {
                reject(error);
            });
        });
        return <Observable<InsuranceMaster>>Observable.fromPromise(promise);
    }
//


  getInsurancesMaster(caseId:number): Observable<InsuranceMaster[]> {
        let promise = new Promise((resolve, reject) => {
            this._insuranceService.getInsurancesMaster(caseId).subscribe((insurancesMaster: InsuranceMaster[]) => {
                resolve(insurancesMaster);
            }, error => {
                reject(error);
            });
        });
        return <Observable<InsuranceMaster[]>>Observable.fromPromise(promise);
    }

    findInsuranceById(id: number) {
        let insurances = this._insurances.getValue();
        let index = insurances.findIndex((currentInsurance: Insurance) => currentInsurance.id === id);
        return insurances.get(index);
    }

    fetchInsuranceById(id: number): Observable<Insurance> {
        let promise = new Promise((resolve, reject) => {
            // let matchedInsurance: Insurance = this.findInsuranceById(id);
            // if (matchedInsurance) {
            //     resolve(matchedInsurance);
            // } else 
            {
                this._insuranceService.getInsurance(id).subscribe((insurance: Insurance) => {
                    resolve(insurance);
                }, error => {
                    reject(error);
                });
            }
        });
        return <Observable<Insurance>>Observable.fromPromise(promise);
    }
   
    addInsurance(insurance: Insurance): Observable<Insurance> {
        let promise = new Promise((resolve, reject) => {
            this._insuranceService.addInsurance(insurance).subscribe((insurance: Insurance) => {
                this._insurances.next(this._insurances.getValue().push(insurance));
                resolve(insurance);
            }, error => {
                reject(error);
            });
        });
        return <Observable<Insurance>>Observable.from(promise);
    }
    updateInsurance(insurance: Insurance): Observable<Insurance> {
        let promise = new Promise((resolve, reject) => {
            this._insuranceService.updateInsurance(insurance).subscribe((updatedInsurance: Insurance) => {
                let insurance: List<Insurance> = this._insurances.getValue();
                let index = insurance.findIndex((currentInsurance: Insurance) => currentInsurance.id === updatedInsurance.id);
                insurance = insurance.update(index, function () {
                    return updatedInsurance;
                });
                this._insurances.next(insurance);
                resolve(insurance);
            }, error => {
                reject(error);
            });
        });
        return <Observable<Insurance>>Observable.from(promise);
    }
    deleteInsurance(insurance: Insurance) {
        let insurances = this._insurances.getValue();
        let index = insurances.findIndex((currentInsurance: Insurance) => currentInsurance.id === insurance.id);
        let promise = new Promise((resolve, reject) => {
            this._insuranceService.deleteInsurance(insurance)
                .subscribe((insurance: Insurance) => {
                    this._insurances.next(insurances.delete(index));
                    resolve(insurance);
                }, error => {
                    reject(error);
                });
        });
        return <Observable<Insurance>>Observable.from(promise);
    }

    resetStore() {
        this._insurances.next(this._insurances.getValue().clear());
    }
}
