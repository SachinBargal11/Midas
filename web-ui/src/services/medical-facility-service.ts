import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import _ from 'underscore';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';
import Environment from '../scripts/environment';
import {MedicalFacilityDetail} from '../models/medical-facility-details';
import {SpecialityDetail} from '../models/speciality-details';
import {MedicalFacilityAdapter} from './adapters/medical-facility-adapter';
import {SpecialityDetailAdapter} from './adapters/speciality-detail-adapter';
import {UserType} from '../models/enums/user-type';

@Injectable()
export class MedicalFacilityService {

    private _url: string = `${Environment.SERVICE_BASE_URL}`;
    private _headers: Headers = new Headers();

    constructor(
        private _http: Http
    ) {
        this._headers.append('Content-Type', 'application/json');
    }
    getMedicalFacility(medfacilityId: Number): Observable<MedicalFacilityDetail> {
        let promise: Promise<MedicalFacilityDetail> = new Promise((resolve, reject) => {
            return this._http.get(this._url + '/MedicalFacility/Get/' + medfacilityId).map(res => res.json())
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

    getMedicalFacilities(accountId: number): Observable<MedicalFacilityDetail[]> {
        let promise: Promise<MedicalFacilityDetail[]> = new Promise((resolve, reject) => {
            return this._http.get(this._url + '/Account/Get/' + accountId).map(res => res.json())
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
            medicalFacilityDetailRequestData.user = _.omit(medicalFacilityDetailRequestData.user, 'accountId', 'password', 'userName', 'imageLink', 'dateOfBirth', 'name', 'userType', 'firstName', 'middleName', 'lastName', 'gender', 'status', 'isDeleted', 'createByUserId', 'createDate', 'updateByUserId', 'updateDate');
            medicalFacilityDetailRequestData.address = _.omit(medicalFacilityDetailRequestData.address, 'createByUserId', 'createDate', 'updateByUserId', 'updateDate');
            medicalFacilityDetailRequestData.contactInfo = _.omit(medicalFacilityDetailRequestData.contactInfo, 'createByUserId', 'createDate', 'updateByUserId', 'updateDate');
            medicalFacilityDetailRequestData.account = _.omit(medicalFacilityDetailRequestData.account, 'name', 'status', 'isDeleted', 'createByUserId', 'createDate', 'updateByUserId', 'updateDate');
            medicalFacilityDetailRequestData.medicalfacility = _.omit(medicalFacilityDetailRequestData.medicalfacility, 'createByUserId', 'createDate', 'updateByUserId', 'updateDate');

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
    updateMedicalFacility(medicalFacilityDetail: MedicalFacilityDetail): Observable<any> {
        let promise: Promise<any> = new Promise((resolve, reject) => {


            let medicalFacilityDetailRequestData = medicalFacilityDetail.toJS();

            // add/replace values which need to be changed
            _.extend(medicalFacilityDetailRequestData.user, {
                userType: UserType[medicalFacilityDetailRequestData.user.userType],
                dateOfBirth: medicalFacilityDetailRequestData.user.dateOfBirth ? medicalFacilityDetailRequestData.user.dateOfBirth.toISOString() : null
            });

            // remove unneeded keys 
            medicalFacilityDetailRequestData.user = _.omit(medicalFacilityDetailRequestData.user, 'accountId', 'password', 'userName', 'imageLink', 'dateOfBirth', 'name', 'userType', 'firstName', 'middleName', 'lastName', 'gender', 'status', 'isDeleted', 'createByUserId', 'createDate', 'updateByUserId', 'updateDate');
            medicalFacilityDetailRequestData.address = _.omit(medicalFacilityDetailRequestData.address, 'createByUserId', 'createDate', 'updateByUserId', 'updateDate');
            medicalFacilityDetailRequestData.contactInfo = _.omit(medicalFacilityDetailRequestData.contactInfo, 'createByUserId', 'createDate', 'updateByUserId', 'updateDate');
            medicalFacilityDetailRequestData.account = _.omit(medicalFacilityDetailRequestData.account, 'name', 'status', 'isDeleted', 'createByUserId', 'createDate', 'updateByUserId', 'updateDate');
            medicalFacilityDetailRequestData.medicalfacility = _.omit(medicalFacilityDetailRequestData.medicalfacility, 'createByUserId', 'createDate', 'updateByUserId', 'updateDate');

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
        return <Observable<any>>Observable.fromPromise(promise);
    }

    fetchMedicalFacilityById(id: number): Observable<MedicalFacilityDetail> {
        let promise: Promise<MedicalFacilityDetail> = new Promise((resolve, reject) => {
            return this._http.get(this._url + '/MedicalFacility/Get/' + id).map(res => res.json())
                .subscribe((data: any) => {
                    let medicalFacility: MedicalFacilityDetail = MedicalFacilityAdapter.parseResponse(data);
                    resolve(medicalFacility);
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<MedicalFacilityDetail>>Observable.fromPromise(promise);
    }

    addSpecialityDetail(specialityDetail: SpecialityDetail, medicalFacilityDetail: MedicalFacilityDetail): Observable<SpecialityDetail> {
        let promise: Promise<SpecialityDetail> = new Promise((resolve, reject) => {
            let specialityDetailData = _.omit(specialityDetail.toJS(), 'id');
            let requestData = {
                speciality: {
                    id: specialityDetail.associatedSpeciality
                },
                medicalFacility: {
                    id: medicalFacilityDetail.medicalfacility.id
                },
                specialityDetail: specialityDetailData
            };

            return this._http.post(this._url + '/SpecialityDetails/Add', JSON.stringify(requestData), {
                headers: this._headers
            })
                .map(res => res.json())
                .subscribe((specialityDetailData: any) => {
                    let parsedSpecialityDetail: SpecialityDetail = null;
                    parsedSpecialityDetail = SpecialityDetailAdapter.parseResponse(specialityDetailData);
                    resolve(parsedSpecialityDetail);
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<SpecialityDetail>>Observable.fromPromise(promise);
    }

    updateSpecialityDetail(specialityDetail: SpecialityDetail, medicalFacilityDetail: MedicalFacilityDetail): Observable<SpecialityDetail> {
        let promise: Promise<SpecialityDetail> = new Promise((resolve, reject) => {
            let specialityDetailData = specialityDetail.toJS();
            let requestData = {
                speciality: {
                    id: specialityDetail.associatedSpeciality
                },
                medicalFacility: {
                    id: medicalFacilityDetail.medicalfacility.id
                },
                specialityDetail: specialityDetailData
            };

            return this._http.post(this._url + '/SpecialityDetails/Add', JSON.stringify(requestData), {
                headers: this._headers
            })
                .map(res => res.json())
                .subscribe((specialityDetailData: any) => {
                    let parsedSpecialityDetail: SpecialityDetail = null;
                    parsedSpecialityDetail = SpecialityDetailAdapter.parseResponse(specialityDetailData);
                    resolve(parsedSpecialityDetail);
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<SpecialityDetail>>Observable.fromPromise(promise);
    }


    deleteSpecialityDetail(specialityDetail: SpecialityDetail, medicalFacilityDetail: MedicalFacilityDetail): Observable<SpecialityDetail> {
        let promise: Promise<SpecialityDetail> = new Promise((resolve, reject) => {
            let specialityDetailData = specialityDetail.toJS();
            specialityDetailData.isDeleted = 1;
            let requestData = {
                speciality: {
                    id: specialityDetail.associatedSpeciality
                },
                medicalFacility: {
                    id: medicalFacilityDetail.medicalfacility.id
                },
                specialityDetail: specialityDetailData
            };

            return this._http.post(this._url + '/SpecialityDetails/Add', JSON.stringify(requestData), {
                headers: this._headers
            })
                .map(res => res.json())
                .subscribe((specialityDetailData: any) => {
                    let parsedSpecialityDetail: SpecialityDetail = null;
                    parsedSpecialityDetail = SpecialityDetailAdapter.parseResponse(specialityDetailData);
                    resolve(parsedSpecialityDetail);
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<SpecialityDetail>>Observable.fromPromise(promise);
    }

}

