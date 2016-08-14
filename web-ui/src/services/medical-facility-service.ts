import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import _ from 'underscore';
import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';
import Environment from '../scripts/environment';
import {MedicalFacilityDetail} from '../models/medical-facility-details';
import {SessionStore} from '../stores/session-store';
import {MedicalFacilityAdapter} from './adapters/medical-facility-adapter';
import {UserType} from '../models/enums/UserType';

@Injectable()
export class MedicalFacilityService {

    private _url: string = `${Environment.SERVICE_BASE_URL}`;
    private _headers: Headers = new Headers();

    constructor(
        private _http: Http,
        private _sessionStore: SessionStore
    ) {
        this._headers.append('Content-Type', 'application/json');
    }

    getMedicalFacilities(accountId: number): Observable<MedicalFacilityDetail[]> {
        let promise: Promise<MedicalFacilityDetail[]> = new Promise((resolve, reject) => {
            return this._http.get(this._url + "/Account/Get/" + accountId).map(res => res.json())
                .subscribe((data: any) => {
                    let medicalFacilities = (<Object[]>data.medicalFacilities).map((medicalFacilityData: any) => {
                        return MedicalFacilityAdapter.parseResponse(medicalFacilityData);
                    });
                    resolve(medicalFacilities);
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<MedicalFacilityDetail[]>>Observable.fromPromise(promise);
    }

    addMedicalFacility(medicalFacilityDetail: MedicalFacilityDetail): Observable<MedicalFacilityDetail> {
        let promise: Promise<MedicalFacilityDetail> = new Promise((resolve, reject) => {


            let medicalFacilityDetailRequestData = medicalFacilityDetail.toJS();

            // add/replace values which need to be changed
            _.extend(medicalFacilityDetailRequestData.user, {
                userType: UserType[medicalFacilityDetailRequestData.user.userType],
                dateOfBirth: medicalFacilityDetailRequestData.user.dateOfBirth ? medicalFacilityDetailRequestData.user.dateOfBirth.toISOString() : null
            });

            // remove unneeded keys 
            medicalFacilityDetailRequestData.user = _.omit(medicalFacilityDetailRequestData.user, 'password', 'userName', 'imageLink', 'dateOfBirth', 'name', 'userType', 'firstName', 'middleName', 'lastName', 'gender', 'status', 'isDeleted', 'createByUserId', 'createDate','updateByUserId', 'updateDate');
            medicalFacilityDetailRequestData.address = _.omit(medicalFacilityDetailRequestData.address, 'createByUserId', 'createDate', 'updateByUserId', 'updateDate');
            medicalFacilityDetailRequestData.contactInfo = _.omit(medicalFacilityDetailRequestData.contactInfo, 'createByUserId', 'createDate', 'updateByUserId', 'updateDate');
            medicalFacilityDetailRequestData.account = _.omit(medicalFacilityDetailRequestData.account, 'name', 'status', 'isDeleted', 'createByUserId', 'createDate', 'updateByUserId', 'updateDate');
            medicalFacilityDetailRequestData.medicalFacility = _.omit(medicalFacilityDetailRequestData.medicalFacility, 'status', 'isDeleted', 'createByUserId', 'createDate', 'updateByUserId', 'updateDate');

            return this._http.post(this._url + '/MedicalFacility/Add', JSON.stringify(medicalFacilityDetailRequestData), {
                headers: this._headers
            })
                .map(res => res.json())
                .subscribe((medicalFacilityData: any) => {
                    let parsedMedicalFacility: MedicalFacilityDetail = null;
                    parsedMedicalFacility = MedicalFacilityAdapter.parseResponse(medicalFacilityData);
                    resolve(parsedMedicalFacility);
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<MedicalFacilityDetail>>Observable.fromPromise(promise);
    }

}

