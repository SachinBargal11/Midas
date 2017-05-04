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
    private _allProvidersInMidas: BehaviorSubject<List<Account>> = new BehaviorSubject(List([]));

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

    getAllProviders(): Observable<Account[]> {
        let companyId: number = this._sessionStore.session.currentCompany.id;
        let promise = new Promise((resolve, reject) => {
            this._medicalProviderMasterService.getAllProviders(companyId).subscribe((allProvider: Account[]) => {
                this._allProvidersInMidas.next(List(allProvider));
                resolve(allProvider);
            }, error => {
                reject(error);
            });
        });
        return <Observable<Account[]>>Observable.fromPromise(promise);
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

    findMedicalProvideryById(id: number): MedicalProviderMaster {
        let provider = this._medicalProviderMaster.getValue();
        let index = provider.findIndex((currentProvider: MedicalProviderMaster) => currentProvider.id === id);
        return provider.get(index);
    }

    fetchMedicalProviderById(id: number): Observable<MedicalProviderMaster> {
        let promise = new Promise((resolve, reject) => {
            let matchedProvider: MedicalProviderMaster = this.findMedicalProvideryById(id);
            if (matchedProvider) {
                resolve(matchedProvider);
            } else {
                this._medicalProviderMasterService.getMedicalProviderById(id).subscribe((provider: MedicalProviderMaster) => {
                    resolve(provider);
                }, error => {
                    reject(error);
                });
            }
        });
        return <Observable<MedicalProviderMaster>>Observable.fromPromise(promise);
    }





    // updateMedicalProvider(signUp: any): Observable<any> {
    //     let promise = new Promise((resolve, reject) => {
    //         this._medicalProviderMasterService.updateMedicalProvider(signUp).subscribe((updatedAttorney: any) => {
    //             let attorney: List<Attorney> = this._attorneyMaster.getValue();
    //             let index = attorney.findIndex((currentAttorney: Attorney) => currentAttorney.id === updatedAttorney.id);
    //             attorney = attorney.update(index, function () {
    //                 return updatedAttorney;
    //             });
    //             this._attorneyMaster.next(attorney);
    //             resolve(attorney);
    //         }, error => {
    //             reject(error);
    //         });
    //     });
    //     return <Observable<Attorney>>Observable.from(promise);
    // }

    deleteMedicalProvider(medicalProviderMaster: MedicalProviderMaster) {
        let providers = this._medicalProviderMaster.getValue();
        let index = providers.findIndex((currentAttorney: MedicalProviderMaster) => currentAttorney.id === medicalProviderMaster.id);
        let promise = new Promise((resolve, reject) => {
            this._medicalProviderMasterService.deleteMedicalProvider(medicalProviderMaster)
                .subscribe((provider: MedicalProviderMaster) => {
                    this._medicalProviderMaster.next(providers.delete(index));
                    resolve(medicalProviderMaster);
                }, error => {
                    reject(error);
                });
        });
        return <Observable<MedicalProviderMaster>>Observable.from(promise);
    }
}
