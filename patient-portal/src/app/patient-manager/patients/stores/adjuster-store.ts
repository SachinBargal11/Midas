import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';
import { Adjuster } from '../models/adjuster';
import { AdjusterMasterService } from '../services/adjuster-service';
import { List } from 'immutable';
import { BehaviorSubject } from 'rxjs/Rx';
import { SessionStore } from '../../../commons/stores/session-store';

@Injectable()
export class AdjusterMasterStore {

    private _adjusterMaster: BehaviorSubject<List<Adjuster>> = new BehaviorSubject(List([]));

    constructor(
        private _adjusterMasterService: AdjusterMasterService,
        private _sessionStore: SessionStore
    ) {
        this._sessionStore.userLogoutEvent.subscribe(() => {
            this.resetStore();
        });
    }

    get adjusterMasters() {
        return this._adjusterMaster.asObservable();
    }
    // getAdjusterByCompanyAndInsuranceMasterId(insuranceMasterId: number): Observable<Adjuster[]> {
    //     let companyId: number = this._sessionStore.session.currentCompany.id;
    //     let promise = new Promise((resolve, reject) => {
    //         this._adjusterMasterService.getAdjusterMastersByCompanyAndInsuranceMasterId(companyId, insuranceMasterId).subscribe((insurances: Adjuster[]) => {
    //             this._adjusterMaster.next(List(insurances));
    //             resolve(insurances);
    //         }, error => {
    //             reject(error);
    //         });
    //     });
    //     return <Observable<Adjuster[]>>Observable.fromPromise(promise);
    // }

    getAdjusterMasters(): Observable<Adjuster[]> {
        let promise = new Promise((resolve, reject) => {
            this._adjusterMasterService.getAllAdjusterMaster().subscribe((adjusters: Adjuster[]) => {
                this._adjusterMaster.next(List(adjusters));
                resolve(adjusters);
            }, error => {
                reject(error);
            });
        });
        return <Observable<Adjuster[]>>Observable.fromPromise(promise);
    }

    findAdjusterById(id: number): Adjuster {
        let adjusters = this._adjusterMaster.getValue();
        let index = adjusters.findIndex((currentAdjuster: Adjuster) => currentAdjuster.id === id);
        return adjusters.get(index);
    }

    fetchAdjusterById(id: number): Observable<Adjuster> {
        let promise = new Promise((resolve, reject) => {
            let matchedAdjuster: Adjuster = this.findAdjusterById(id);
            if (matchedAdjuster) {
                resolve(matchedAdjuster);
            } else {
                this._adjusterMasterService.getAdjusterMaster(id).subscribe((adjuster: Adjuster) => {
                    resolve(adjuster);
                }, error => {
                    reject(error);
                });
            }
        });
        return <Observable<Adjuster>>Observable.fromPromise(promise);
    }

    addAdjuster(adjuster: Adjuster): Observable<Adjuster> {
        let promise = new Promise((resolve, reject) => {
            this._adjusterMasterService.addAdjuster(adjuster).subscribe((adjuster: Adjuster) => {
                this._adjusterMaster.next(this._adjusterMaster.getValue().push(adjuster));
                resolve(adjuster);
            }, error => {
                reject(error);
            });
        });
        return <Observable<Adjuster>>Observable.from(promise);
    }
    updateAdjuster(adjuster: Adjuster): Observable<Adjuster> {
        let promise = new Promise((resolve, reject) => {
            this._adjusterMasterService.updateAdjuster(adjuster).subscribe((updatedAdjuster: Adjuster) => {
                let adjuster: List<Adjuster> = this._adjusterMaster.getValue();
                let index = adjuster.findIndex((currentAdjuster: Adjuster) => currentAdjuster.id === updatedAdjuster.id);
                adjuster = adjuster.update(index, function () {
                    return updatedAdjuster;
                });
                this._adjusterMaster.next(adjuster);
                resolve(adjuster);
            }, error => {
                reject(error);
            });
        });
        return <Observable<Adjuster>>Observable.from(promise);
    }
    deleteAdjuster(adjuster: Adjuster) {
        let adjusters = this._adjusterMaster.getValue();
        let index = adjusters.findIndex((currentAdjuster: Adjuster) => currentAdjuster.id === adjuster.id);
        let promise = new Promise((resolve, reject) => {
            this._adjusterMasterService.deleteAdjuster(adjuster)
                .subscribe((adjuster: Adjuster) => {
                    this._adjusterMaster.next(adjusters.delete(index));
                    resolve(adjuster);
                }, error => {
                    reject(error);
                });
        });
        return <Observable<Adjuster>>Observable.from(promise);
    }

    resetStore() {
        this._adjusterMaster.next(this._adjusterMaster.getValue().clear());
    }
}
