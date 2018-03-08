import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';
import { InsuranceMasterType } from '../models/insurance-master-type';
import { InsuranceMasterTypeService } from '../services/insurance-master-type-service';
import { SessionStore } from './session-store';
import { List } from 'immutable';
import { BehaviorSubject } from 'rxjs/Rx';


@Injectable()
export class InsuranceMasterTypeStore {

    private _insuranceMasterType: BehaviorSubject<List<InsuranceMasterType>> = new BehaviorSubject(List([]));
    

    constructor(
        private _insuranceMasterTypeService: InsuranceMasterTypeService,
        private _sessionStore: SessionStore
    ) {
        this._sessionStore.userLogoutEvent.subscribe(() => {
            this.resetStore();
        });
    }

    resetStore() {
        this._insuranceMasterType.next(this._insuranceMasterType.getValue().clear());
    }

    get insuranceMasterType() {
        return this._insuranceMasterType.asObservable();
    }
   

    getInsuranceMasterType(): Observable<InsuranceMasterType[]> {
        let promise = new Promise((resolve, reject) => {
            this._insuranceMasterTypeService.getInsuranceMasterType().subscribe((insuranceMasterType: InsuranceMasterType[]) => {
                this._insuranceMasterType.next(List(insuranceMasterType));
                resolve(insuranceMasterType);
            }, error => {
                reject(error);
            });
        });
        return <Observable<InsuranceMasterType[]>>Observable.fromPromise(promise);
    }
    
}