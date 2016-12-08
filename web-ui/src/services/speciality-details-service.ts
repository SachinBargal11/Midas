import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import _ from 'underscore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';
import Environment from '../scripts/environment';
import { SpecialityDetail } from '../models/speciality-details';
import { SpecialityDetailAdapter } from './adapters/speciality-detail-adapter';

@Injectable()
export class SpecialityDetailsService {

    private _url: string = `${Environment.SERVICE_BASE_URL}`;
    private _headers: Headers = new Headers();

    constructor(
        private _http: Http
    ) {
        this._headers.append('Content-Type', 'application/json');
    }

    getSpecialityDetail(id: Number): Observable<SpecialityDetail> {
        let promise: Promise<SpecialityDetail> = new Promise((resolve, reject) => {
            return this._http.get(this._url + '/CompanySpecialtyDetails/get/' + id).map(res => res.json())
                .subscribe((specialityDetailData: any) => {
                    let parsedData: SpecialityDetail = null;
                    parsedData = SpecialityDetailAdapter.parseResponse(specialityDetailData);
                    resolve(parsedData);
                }, (error) => {
                    reject(error);
                });

        });
        return <Observable<SpecialityDetail>>Observable.fromPromise(promise);
    }

    getSpecialityDetails(): Observable<any[]> {
        let promise: Promise<any[]> = new Promise((resolve, reject) => {
            return this._http.post(this._url + '/CompanySpecialtyDetails/getall', JSON.stringify({}), {
                headers: this._headers
            }).map(res => res.json())
                .subscribe((specialityDetailData: Array<Object>) => {
                    let specialityDetails: any[] = (<Object[]>specialityDetailData).map((specialityDetailData: any) => {
                        return SpecialityDetailAdapter.parseResponse(specialityDetailData);
                    });
                    resolve(specialityDetails);
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<any[]>>Observable.fromPromise(promise);
    }
    addSpecialityDetail(location: SpecialityDetail): Observable<any> {
        let promise: Promise<any> = new Promise((resolve, reject) => {

            let requestData: any = location.toJS();
            // requestData.Company = requestData.contact;
            // requestData.Specialty = requestData.address;
            requestData.company = _.omit(requestData.company, 'companyType', 'name', 'taxId');
            requestData.specialty = _.omit(requestData.specialty, 'createByUserID', 'createDate', 'isDeleted', 'isUnitApply', 'name', 'specialityCode', 'updateByUserID', 'updateDate');
            // requestData.company = _.omit(requestData.company, 'taxId', 'companyType', 'name');
            // console.log(requestData);
            return this._http.post(this._url + '/CompanySpecialtyDetails/add', JSON.stringify(requestData), {
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
    updateSpecialityDetail(location: SpecialityDetail): Observable<any> {
        let promise: Promise<any> = new Promise((resolve, reject) => {

            let requestData: any = location.toJS();
            // requestData.contactInfo = requestData.contact;
            // requestData.addressInfo = requestData.address;
             requestData.company = _.omit(requestData.company, 'companyType', 'name', 'taxId');
            requestData.specialty = _.omit(requestData.specialty, 'createByUserID', 'createDate', 'isDeleted', 'isUnitApply', 'name', 'specialityCode', 'updateByUserID', 'updateDate');
           // console.log(requestData);
            return this._http.post(this._url + '/CompanySpecialtyDetails/add', JSON.stringify(requestData), {
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
