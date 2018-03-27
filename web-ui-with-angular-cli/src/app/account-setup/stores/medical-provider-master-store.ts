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
import { Signup } from '../../account-setup/models/signup';

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
            this._medicalProviderMasterService.getMedicalProviders(companyId).subscribe((Provider: MedicalProviderMaster[]) => {
                // this._medicalProviderMaster.next(List(Provider));
                resolve(Provider);
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

    updateMedicalProvider(signUp: MedicalProviderMaster): Observable<MedicalProviderMaster> {
        let promise = new Promise((resolve, reject) => {
            this._medicalProviderMasterService.updateMedicalProvider(signUp).subscribe((MedicalProviderMaster) => {
                this._medicalProviderMaster.next(this._medicalProviderMaster.getValue().push(MedicalProviderMaster));
                resolve(MedicalProviderMaster);
            }, error => {
                reject(error);
            });
        });
        return <Observable<MedicalProviderMaster>>Observable.from(promise);
    }


     generateToken(): Observable<any> {
        let companyId: number = this._sessionStore.session.currentCompany.id;
        let promise = new Promise((resolve, reject) => {
            this._medicalProviderMasterService.generateToken(companyId).subscribe((data: any) => {
                // this._medicalProviderMaster.next(List(Provider));
                resolve(data);
            }, error => {
                reject(error);
            });
        });
        return <Observable<any>>Observable.fromPromise(promise);
    }

     validateToken(token:number): Observable<any> {
        let companyId: number = this._sessionStore.session.currentCompany.id;
        let promise = new Promise((resolve, reject) => {
            this._medicalProviderMasterService.validateToken(token).subscribe((data: any) => {
                resolve(data);
            }, error => {
                reject(error);
            });
        });
        return <Observable<any>>Observable.fromPromise(promise);
    }
    
     associateValidateTokenWithCompany(token:number): Observable<any> {
        let companyId: number = this._sessionStore.session.currentCompany.id;
        let promise = new Promise((resolve, reject) => {
            this._medicalProviderMasterService.associateValidateTokenWithCompany(token,companyId).subscribe((data: any) => {
                resolve(data);
            }, error => {
                reject(error);
            });
        });
        return <Observable<any>>Observable.fromPromise(promise);
    }

    deleteMedicalProvider(medicalProviderMaster: MedicalProviderMaster) {
        let providers = this._medicalProviderMaster.getValue();
        let index = providers.findIndex((currentMedicalProvider: MedicalProviderMaster) => currentMedicalProvider.id === medicalProviderMaster.id);
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

    fetchMedicalProviderByCompanyName(companyName: string): Observable<MedicalProviderMaster> {
        let promise = new Promise((resolve, reject) => {            
           this._medicalProviderMasterService.getMedicalProviderByCompanyName(companyName).subscribe((provider: MedicalProviderMaster) => {
               resolve(provider);
            }, error => {
                reject(error);
            });            
        });
        return <Observable<MedicalProviderMaster>>Observable.fromPromise(promise);
    }

    getByCompanyByName(companyName: string): Observable<any> {
        let promise = new Promise((resolve, reject) => {            
           this._medicalProviderMasterService.getByCompanyByName(companyName).subscribe((provider: any) => {
               resolve(provider);
            }, error => {
                reject(error);
            });            
        });
        return <Observable<any>>Observable.fromPromise(promise);
    }
}