import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';
import { VisitReferral } from '../models/visit-referral';
import { VisitReferralService } from '../services/visit-referral-service';
import { List } from 'immutable';
import { BehaviorSubject } from 'rxjs/Rx';
import { SessionStore } from '../../../commons/stores/session-store';
import * as _ from 'underscore';
import { UnscheduledVisitReferral } from '../models/unscheduled-visit-referral';
import { UnscheduledVisit } from '../models/unscheduled-visit';
import { PatientVisit } from '../models/patient-visit';

@Injectable()
export class VisitReferralStore {

    private _visitReferral: BehaviorSubject<List<VisitReferral>> = new BehaviorSubject(List([]));

    constructor(
        private _visitReferralService: VisitReferralService,
        private _sessionStore: SessionStore
    ) {
        this._sessionStore.userLogoutEvent.subscribe(() => {
            this.resetStore();
        });
    }

    resetStore() {
        this._visitReferral.next(this._visitReferral.getValue().clear());
    }
    get VisitReferrals() {
        return this._visitReferral.asObservable();
    }

    getPendingReferralByPatientVisitId(patientVisitId: number): Observable<VisitReferral[]> {
        let promise = new Promise((resolve, reject) => {
            this._visitReferralService.getPendingReferralByPatientVisitId(patientVisitId).subscribe((visitReferralDetails: VisitReferral[]) => {
                this._visitReferral.next(List(visitReferralDetails));
                resolve(visitReferralDetails);
            }, error => {
                reject(error);
            });
        });
        return <Observable<VisitReferral[]>>Observable.from(promise);
    }

    getDoctorSignatureByDocotId(doctorId: number): Observable<VisitReferral[]> {
        let promise = new Promise((resolve, reject) => {
            this._visitReferralService.getDoctorSignatureByDocotId(doctorId).subscribe((visitReferralDetails: VisitReferral[]) => {
                this._visitReferral.next(List(visitReferralDetails));
                resolve(visitReferralDetails);
            }, error => {
                reject(error);
            });
        });
        return <Observable<VisitReferral[]>>Observable.from(promise);
    }


    getPendingReferralByCompanyId(companyId: number): Observable<VisitReferral[]> {
        let promise = new Promise((resolve, reject) => {
            this._visitReferralService.getPendingReferralByCompanyId(companyId).subscribe((visitReferralDetails: VisitReferral[]) => {
                this._visitReferral.next(List(visitReferralDetails));
                resolve(visitReferralDetails);
            }, error => {
                reject(error);
            });
        });
        return <Observable<VisitReferral[]>>Observable.from(promise);
    }
    getPendingReferralByDoctorId(doctorId: number): Observable<VisitReferral[]> {
        let promise = new Promise((resolve, reject) => {
            this._visitReferralService.getPendingReferralByDoctorId(doctorId).subscribe((visitReferralDetails: VisitReferral[]) => {
                this._visitReferral.next(List(visitReferralDetails));
                resolve(visitReferralDetails);
            }, error => {
                reject(error);
            });
        });
        return <Observable<VisitReferral[]>>Observable.from(promise);
    }
    getPendingReferralBySpecialityId(specialityId: number): Observable<VisitReferral[]> {
        let promise = new Promise((resolve, reject) => {
            this._visitReferralService.getPendingReferralBySpecialityId(specialityId).subscribe((visitReferralDetails: VisitReferral[]) => {
                this._visitReferral.next(List(visitReferralDetails));
                resolve(visitReferralDetails);
            }, error => {
                reject(error);
            });
        });
        return <Observable<VisitReferral[]>>Observable.from(promise);
    }

    findVisitReferralById(id: number): VisitReferral {
        let visitReferrals = this._visitReferral.getValue();
        let index = visitReferrals.findIndex((currentVisitReferral: VisitReferral) => currentVisitReferral.id === id);
        return visitReferrals.get(index);
    }

    fetchVisitReferralById(id: number): Observable<VisitReferral> {
        let promise = new Promise((resolve, reject) => {
            let matchedVisitReferral: VisitReferral = this.findVisitReferralById(id);
            if (matchedVisitReferral) {
                resolve(matchedVisitReferral);
            } else {
                this._visitReferralService.getPendingReferralById(id).subscribe((visitReferral: VisitReferral) => {
                    resolve(visitReferral);
                }, error => {
                    reject(error);
                });
            }
        });
        return <Observable<VisitReferral>>Observable.fromPromise(promise);
    }

    saveVisitReferral(visitReferralDetail: VisitReferral[]): Observable<VisitReferral[]> {
        let promise = new Promise((resolve, reject) => {
            this._visitReferralService.saveVisitReferral(visitReferralDetail).subscribe((visitReferralDetails: VisitReferral[]) => {
                _.forEach(visitReferralDetails, (currentVisitReferral: VisitReferral) => {
                this._visitReferral.next(this._visitReferral.getValue().push(currentVisitReferral));
                })
                resolve(visitReferralDetails);
            }, error => {
                reject(error);
            });
        });
        return <Observable<VisitReferral[]>>Observable.from(promise);
    }

    //UnscheduledVisitReferral
    saveUnscheduledVisitReferral(unscheduledVisitReferralDetail: UnscheduledVisitReferral): Observable<UnscheduledVisitReferral> {
        let promise = new Promise((resolve, reject) => {
            this._visitReferralService.saveUnscheduledVisitReferral(unscheduledVisitReferralDetail)
            .subscribe((unscheduledVisitReferralDetail: UnscheduledVisitReferral) => {
                resolve(unscheduledVisitReferralDetail);
            }, error => {
                reject(error);
            });
        });
        return <Observable<UnscheduledVisitReferral>>Observable.from(promise);
    }
    getUnscheduledVisitReferralByCompanyId(): Observable<UnscheduledVisit[]> {
        let promise = new Promise((resolve, reject) => {
            this._visitReferralService.getUnscheduledVisitReferralByCompanyId()
            .subscribe((unscheduledVisitReferralDetail: UnscheduledVisit[]) => {
                resolve(unscheduledVisitReferralDetail);
            }, error => {
                reject(error);
            });
        });
        return <Observable<UnscheduledVisit[]>>Observable.from(promise);
    }
    getUnscheduledVisitByCompanyId(): Observable<UnscheduledVisit[]> {
        let promise = new Promise((resolve, reject) => {
            this._visitReferralService.getUnscheduledVisitByCompanyId()
            .subscribe((unscheduledVisitReferralDetail: UnscheduledVisit[]) => {
                resolve(unscheduledVisitReferralDetail);
            }, error => {
                reject(error);
            });
        });
        return <Observable<UnscheduledVisit[]>>Observable.from(promise);
    }

    // updatePatientVisit(pendingReferralDetail: PendingReferral): Observable<PendingReferral> {
    //     let promise = new Promise((resolve, reject) => {
    //         this._visitReferralervice.updatePendingReferral(pendingReferralDetail).subscribe((updatedPendingReferral: PendingReferral) => {
    //             let pendingReferralDetail: List<PendingReferral> = this._visitReferral.getValue();
    //             let index = pendingReferralDetail.findIndex((currentPendingReferral: PendingReferral) => currentPendingReferral.id === updatedPendingReferral.id);
    //             pendingReferralDetail = pendingReferralDetail.update(index, function () {
    //                 return updatedPendingReferral;
    //             });
    //             this._visitReferral.next(pendingReferralDetail);
    //             resolve(updatedPendingReferral);
    //         }, error => {
    //             reject(error);
    //         });
    //     });
    //     return <Observable<PendingReferral>>Observable.from(promise);
    // }

    // deletePendingReferral(pendingReferralDetail: PendingReferral): Observable<PendingReferral> {
    //     let pendingReferrals = this._visitReferral.getValue();
    //     let index = pendingReferrals.findIndex((currentPendingReferral: PendingReferral) => currentPendingReferral.id === pendingReferralDetail.id);
    //     let promise = new Promise((resolve, reject) => {
    //         this._visitReferralervice.deletePatientVisit(pendingReferralDetail).subscribe((pendingReferralDetail: PendingReferral) => {
    //             this._visitReferral.next(pendingReferrals.delete(index));
    //             resolve(pendingReferralDetail);
    //         }, error => {
    //             reject(error);
    //         });
    //     });
    //     return <Observable<PendingReferral>>Observable.from(promise);
    // }
}

