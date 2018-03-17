import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';
import { TestSpecialityDetail } from '../models/test-speciality-details';
import { TestSpecialityDetailsService } from '../services/test-speciality-details-service';
import { SessionStore } from '../../commons/stores/session-store';
import { List } from 'immutable';
import { BehaviorSubject } from 'rxjs/Rx';


@Injectable()
export class TestSpecialityDetailsStore {

    private _testSpecialityDetails: BehaviorSubject<List<TestSpecialityDetail>> = new BehaviorSubject(List([]));

    constructor(
        private _testSpecialityDetailsService: TestSpecialityDetailsService,
        private _sessionStore: SessionStore
    ) {
        this._sessionStore.userLogoutEvent.subscribe(() => {
            this.resetStore();
        });
    }

    resetStore() {
        this._testSpecialityDetails.next(this._testSpecialityDetails.getValue().clear());
    }


    get testSpecialities() {
        return this._testSpecialityDetails.asObservable();
    }

    getTestSpecialityDetails(requestData): Observable<TestSpecialityDetail> {
        let promise = new Promise((resolve, reject) => {
            this._testSpecialityDetailsService.getTestSpecialityDetails(requestData)
                .subscribe((testSpecialityDetail: TestSpecialityDetail) => {
                    resolve(testSpecialityDetail);
                }, error => {
                    reject(error);
                });
        });
        return <Observable<TestSpecialityDetail>>Observable.fromPromise(promise);
    }

    findTestSpecialityDetailById(id: number): TestSpecialityDetail {
        let testSpecialities = this._testSpecialityDetails.getValue();
        let index = testSpecialities.findIndex((currentTestSpeciality: TestSpecialityDetail) => currentTestSpeciality.id === id);
        return testSpecialities.get(index);
    }

    fetchTestSpecialityDetailById(id: number): Observable<TestSpecialityDetail> {
        let promise = new Promise((resolve, reject) => {
                this._testSpecialityDetailsService.getTestSpecialityDetail(id)
                    .subscribe((testSpeciality: TestSpecialityDetail) => {
                        resolve(testSpeciality);
                    }, error => {
                        reject(error);
                    });
            // }
        });
        return <Observable<TestSpecialityDetail>>Observable.fromPromise(promise);
    }

    addTestSpecialityDetail(testSpecialityDetail: TestSpecialityDetail): Observable<TestSpecialityDetail> {
        let promise = new Promise((resolve, reject) => {
            this._testSpecialityDetailsService.addTestSpecialityDetail(testSpecialityDetail).subscribe((testSpecialityDetail: TestSpecialityDetail) => {
                this._testSpecialityDetails.next(this._testSpecialityDetails.getValue().push(testSpecialityDetail));
                resolve(testSpecialityDetail);
            }, error => {
                reject(error);
            });
        });
        return <Observable<TestSpecialityDetail>>Observable.from(promise);
    }

    updateTestSpecialityDetail(testSpecialityDetail: TestSpecialityDetail, testSpecialityDetailId: number): Observable<TestSpecialityDetail> {
        let promise = new Promise((resolve, reject) => {
            this._testSpecialityDetailsService.updateTestSpecialityDetail(testSpecialityDetail, testSpecialityDetailId)
                .subscribe((updatedTestSpeciality: TestSpecialityDetail) => {
                    let testSpecialityDetails: List<TestSpecialityDetail> = this._testSpecialityDetails.getValue();
                    let index = testSpecialityDetails.findIndex((currentTestSpeciality: TestSpecialityDetail) => currentTestSpeciality.id === updatedTestSpeciality.id);
                    testSpecialityDetails = testSpecialityDetails.update(index, function () {
                        return updatedTestSpeciality;
                    });
                    this._testSpecialityDetails.next(testSpecialityDetails);
                    resolve(testSpecialityDetail);
                }, error => {
                    reject(error);
                });
        });
        return <Observable<TestSpecialityDetail>>Observable.from(promise);
    }

    deleteTestSpecialityDetail(testSpecialityDetail: TestSpecialityDetail): Observable<TestSpecialityDetail> {
        let testSpecialityDetails = this._testSpecialityDetails.getValue();
        let index = testSpecialityDetails.findIndex((currentTestSpecialityDetail: TestSpecialityDetail) => currentTestSpecialityDetail.id === testSpecialityDetail.id);
        let promise = new Promise((resolve, reject) => {
            this._testSpecialityDetailsService.deleteTestSpecialityDetail(testSpecialityDetail)
            .subscribe((testSpecialityDetail: TestSpecialityDetail) => {
                this._testSpecialityDetails.next(testSpecialityDetails.delete(index));
                resolve(testSpecialityDetail);
            }, error => {
                reject(error);
            });
        });
        return <Observable<TestSpecialityDetail>>Observable.from(promise);
    }


}