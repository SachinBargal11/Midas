import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import * as _ from 'underscore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';
import {environment} from '../../../environments/environment';
import { TestSpecialityDetail } from '../models/test-speciality-details';
import { TestSpecialityDetailAdapter } from './adapters/test-speciality-detail-adapter';
import { SessionStore } from '../../commons/stores/session-store';

@Injectable()
export class TestSpecialityDetailsService {

    private _url: string = `${environment.SERVICE_BASE_URL}`;
    private _headers: Headers = new Headers();

    constructor(
        private _http: Http,
        private _sessionStore: SessionStore
    ) {
        this._headers.append('Content-Type', 'application/json');
        this._headers.append('Authorization', this._sessionStore.session.accessToken);
    }

    getTestSpecialityDetail(id: Number): Observable<TestSpecialityDetail> {
        let promise: Promise<TestSpecialityDetail> = new Promise((resolve, reject) => {
            return this._http.get(environment.SERVICE_BASE_URL + '/CompanyRoomTestDetails/get/' + id, {
                headers: this._headers
            }).map(res => res.json())
                .subscribe((testSpecialityDetailData: any) => {
                    let parsedData: TestSpecialityDetail = null;
                    parsedData = TestSpecialityDetailAdapter.parseResponse(testSpecialityDetailData);
                    resolve(parsedData);
                }, (error) => {
                    reject(error);
                });

        });
        return <Observable<TestSpecialityDetail>>Observable.fromPromise(promise);
    }

    getTestSpecialityDetails(requestData): Observable<TestSpecialityDetail> {
        let promise: Promise<any> = new Promise((resolve, reject) => {
            return this._http.post(environment.SERVICE_BASE_URL + '/CompanyRoomTestDetails/getall', requestData, {
                headers: this._headers
            }).map(res => res.json())
                .subscribe((testSpecialityDetailData: any) => {
                    let parsedData: TestSpecialityDetail = null;
                    parsedData = TestSpecialityDetailAdapter.parseResponse(testSpecialityDetailData);
                    resolve(parsedData);
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<TestSpecialityDetail>>Observable.fromPromise(promise);
    }

    addTestSpecialityDetail(location: TestSpecialityDetail): Observable<any> {
        let promise: Promise<any> = new Promise((resolve, reject) => {

            let requestData: any = location.toJS();
            requestData.company = {
                id: this._sessionStore.session.currentCompany.id
            };
            requestData.roomTest = _.omit(requestData.roomTest, 'createByUserID', 'createDate', 'isDeleted', 'name', 'updateByUserID', 'updateDate');
            return this._http.post(environment.SERVICE_BASE_URL + '/CompanyRoomTestDetails/save', JSON.stringify(requestData), {
                headers: this._headers
            }).map(res => res.json())
                .subscribe((data: any) => {
                    resolve(data);
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<any>>Observable.fromPromise(promise);
    }
    
    updateTestSpecialityDetail(location: TestSpecialityDetail, testSpecialityDetailId: number): Observable<any> {
        let promise: Promise<any> = new Promise((resolve, reject) => {

            let requestData: any = location.toJS();
            requestData.id = testSpecialityDetailId;
            requestData.company = {
                id: this._sessionStore.session.currentCompany.id
            };

            requestData.roomTest = _.omit(requestData.roomTest, 'createByUserID', 'createDate', 'isDeleted', 'name', 'updateByUserID', 'updateDate');
            return this._http.post(environment.SERVICE_BASE_URL + '/CompanyRoomTestDetails/save', JSON.stringify(requestData), {
                headers: this._headers
            }).map(res => res.json())
                .subscribe((data: any) => {
                    resolve(data);
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<any>>Observable.fromPromise(promise);
    }

    deleteTestSpecialityDetail(testSpecialityDetail: TestSpecialityDetail): Observable<any> {
        let promise: Promise<any> = new Promise((resolve, reject) => {

            let requestData: any = testSpecialityDetail.toJS();
            requestData.company = {
                id: this._sessionStore.session.currentCompany.id
            };
            requestData.isDeleted = 1;

            requestData.roomTest = _.omit(requestData.roomTest, 'createByUserID', 'createDate', 'isDeleted', 'name', 'updateByUserID', 'updateDate');
            return this._http.post(environment.SERVICE_BASE_URL + '/CompanyRoomTestDetails/save', JSON.stringify(requestData), {
                headers: this._headers
            }).map(res => res.json())
                .subscribe((data: any) => {
                    resolve(data);
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<any>>Observable.fromPromise(promise);
    }

}

