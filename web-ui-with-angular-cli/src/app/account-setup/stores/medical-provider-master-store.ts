import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';
import { MedicalProviderMaster } from '../models/medical-provider-master';
import { MedicalProviderMasterService } from '../services/medical-provider-master-service';
import { List } from 'immutable';
import { BehaviorSubject } from 'rxjs/Rx';
import { SessionStore } from '../../commons/stores/session-store';
import { Account } from '../../account/models/account';

@Injectable()
export class MedicalProviderMasterStore {

    private _medicalProviderMaster: BehaviorSubject<List<MedicalProviderMaster>> = new BehaviorSubject(List([]));
    private _allProvidersInMidas: BehaviorSubject<List<MedicalProviderMaster>> = new BehaviorSubject(List([]));

    constructor(
        private _medicalProviderMasterService: MedicalProviderMasterService,

        private _sessionStore: SessionStore
    ) {
        this._sessionStore.userLogoutEvent.subscribe(() => {
            this.resetStore();
        });
    }
    resetStore() {
        this._medicalProviderMaster.next(this._medicalProviderMaster.getValue().clear());
    }

    getAllProviders(): Observable<MedicalProviderMaster[]> {
        let companyId: number = this._sessionStore.session.currentCompany.id;
        let promise = new Promise((resolve, reject) => {
            this._medicalProviderMasterService.getAllProviders(companyId).subscribe((allProvider: MedicalProviderMaster[]) => {
                this._allProvidersInMidas.next(List(allProvider));
                resolve(allProvider);
            }, error => {
                reject(error);
            });
        });
        return <Observable<MedicalProviderMaster[]>>Observable.fromPromise(promise);
    }

    assignProviders(id: number): Observable<MedicalProviderMaster> {
        let companyId: number = this._sessionStore.session.currentCompany.id;
        let promise = new Promise((resolve, reject) => {
            this._medicalProviderMasterService.assignProviders(id, companyId).subscribe((provider: MedicalProviderMaster) => {
                resolve(provider);
            }, error => {
                reject(error);
            });
        });
        return <Observable<MedicalProviderMaster>>Observable.fromPromise(promise);
    }


    getMedicalProviders(): Observable<MedicalProviderMaster[]> {
        let companyId: number = this._sessionStore.session.currentCompany.id;
        let promise = new Promise((resolve, reject) => {
            this._medicalProviderMasterService.getMedicalProviders(companyId).subscribe((Attorneys: MedicalProviderMaster[]) => {
                this._medicalProviderMaster.next(List(Attorneys));
                resolve(Attorneys);
            }, error => {
                reject(error);
            });
        });
        return <Observable<MedicalProviderMaster[]>>Observable.fromPromise(promise);
    }

    addMedicalProvider(signUp: any): Observable<any> {
        let promise = new Promise((resolve, reject) => {
            this._medicalProviderMasterService.addMedicalProvider(signUp).subscribe((any) => {
                this._medicalProviderMaster.next(this._medicalProviderMaster.getValue().push(any));
                resolve(any);
            }, error => {
                reject(error);
            });
        });
        return <Observable<any>>Observable.from(promise);
    }
}
