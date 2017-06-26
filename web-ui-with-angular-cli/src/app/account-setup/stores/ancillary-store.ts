import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';
import { AncillaryMaster } from '../models/ancillary-master';
import { AncillaryMasterService } from '../services/ancillary-service';
import { List } from 'immutable';
import { BehaviorSubject } from 'rxjs/Rx';
import { SessionStore } from '../../commons/stores/session-store';
import { Account } from '../../account/models/account';

@Injectable()
export class AncillaryMasterStore {

    private _ancillaryMaster: BehaviorSubject<List<AncillaryMaster>> = new BehaviorSubject(List([]));
    private _allProvidersInMidas: BehaviorSubject<List<Account>> = new BehaviorSubject(List([]));

    constructor(
        private _ancillaryMasterService: AncillaryMasterService,

        private _sessionStore: SessionStore
    ) {
        this._sessionStore.userLogoutEvent.subscribe(() => {
            this.resetStore();
        });
    }
    resetStore() {
        this._ancillaryMaster.next(this._ancillaryMaster.getValue().clear());
    }

    getAllAncillaries(): Observable<Account[]> {
        let companyId: number = this._sessionStore.session.currentCompany.id;
        let promise = new Promise((resolve, reject) => {
            this._ancillaryMasterService.getAllAncillaries(companyId).subscribe((allProvider: Account[]) => {
                this._allProvidersInMidas.next(List(allProvider));
                resolve(allProvider);
            }, error => {
                reject(error);
            });
        });
        return <Observable<Account[]>>Observable.fromPromise(promise);
    }

    assignAncillary(id: number): Observable<AncillaryMaster> {
        let companyId: number = this._sessionStore.session.currentCompany.id;
        let promise = new Promise((resolve, reject) => {
            this._ancillaryMasterService.assignAncillary(id, companyId).subscribe((provider: AncillaryMaster) => {
                resolve(provider);
            }, error => {
                reject(error);
            });
        });
        return <Observable<AncillaryMaster>>Observable.fromPromise(promise);
    }


    getAncillaryMasters(): Observable<AncillaryMaster[]> {
        let companyId: number = this._sessionStore.session.currentCompany.id;
        let promise = new Promise((resolve, reject) => {
            this._ancillaryMasterService.getAncillaryMasters(companyId).subscribe((Provider: AncillaryMaster[]) => {
                // this._AncillaryMaster.next(List(Provider));
                resolve(Provider);
            }, error => {
                reject(error);
            });
        });
        return <Observable<AncillaryMaster[]>>Observable.fromPromise(promise);
    }

    addAncillary(signUp: any): Observable<any> {
        let promise = new Promise((resolve, reject) => {
            this._ancillaryMasterService.addAncillary(signUp).subscribe((any) => {
                this._ancillaryMaster.next(this._ancillaryMaster.getValue().push(any));
                resolve(any);
            }, error => {
                reject(error);
            });
        });
        return <Observable<any>>Observable.from(promise);
    }

    findMedicalProvideryById(id: number): AncillaryMaster {
        let provider = this._ancillaryMaster.getValue();
        let index = provider.findIndex((currentProvider: AncillaryMaster) => currentProvider.id === id);
        return provider.get(index);
    }

    fetchMedicalProviderById(id: number): Observable<AncillaryMaster> {
        let promise = new Promise((resolve, reject) => {
            let matchedProvider: AncillaryMaster = this.findMedicalProvideryById(id);
            if (matchedProvider) {
                resolve(matchedProvider);
            } else {
                this._ancillaryMasterService.getMedicalProviderById(id).subscribe((provider: AncillaryMaster) => {
                    resolve(provider);
                }, error => {
                    reject(error);
                });
            }
        });
        return <Observable<AncillaryMaster>>Observable.fromPromise(promise);
    }

    updateAncillary(signUp: AncillaryMaster): Observable<AncillaryMaster> {
        let promise = new Promise((resolve, reject) => {
            this._ancillaryMasterService.updateAncillary(signUp).subscribe((AncillaryMaster) => {
                this._ancillaryMaster.next(this._ancillaryMaster.getValue().push(AncillaryMaster));
                resolve(AncillaryMaster);
            }, error => {
                reject(error);
            });
        });
        return <Observable<AncillaryMaster>>Observable.from(promise);
    }

    deleteMedicalProvider(AncillaryMaster: AncillaryMaster) {
        let providers = this._ancillaryMaster.getValue();
        let index = providers.findIndex((currentAttorney: AncillaryMaster) => currentAttorney.id === AncillaryMaster.id);
        let promise = new Promise((resolve, reject) => {
            this._ancillaryMasterService.deleteMedicalProvider(AncillaryMaster)
                .subscribe((provider: AncillaryMaster) => {
                    this._ancillaryMaster.next(providers.delete(index));
                    resolve(AncillaryMaster);
                }, error => {
                    reject(error);
                });
        });
        return <Observable<AncillaryMaster>>Observable.from(promise);
    }
}