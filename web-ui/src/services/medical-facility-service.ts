import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';
import Environment from '../scripts/environment';
import { MedicalFacility } from '../models/medical-facility';
// import {SpecialityDetail} from '../models/speciality-details';
import { MedicalFacilityAdapter } from './adapters/medical-facility-adapter';
// import {SpecialityDetailAdapter} from './adapters/speciality-detail-adapter';

@Injectable()
export class MedicalFacilityService {

    private _url: string = `${Environment.SERVICE_BASE_URL}`;
    private _headers: Headers = new Headers();

    constructor(
        private _http: Http
    ) {
        this._headers.append('Content-Type', 'application/json');
    }
    getMedicalFacility(medfacilityId: Number): Observable<MedicalFacility> {
        let promise: Promise<MedicalFacility> = new Promise((resolve, reject) => {
            return this._http.get(this._url + '/medicalprovider/get/' + medfacilityId).map(res => res.json())
                .subscribe((medicalFacilityData: any) => {
                    let parsedMedicalFacility: MedicalFacility = null;
                    parsedMedicalFacility = MedicalFacilityAdapter.parseResponse(medicalFacilityData);
                    resolve(parsedMedicalFacility);
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<MedicalFacility>>Observable.fromPromise(promise);
    }

    getMedicalFacilities(): Observable<MedicalFacility[]> {
        let promise: Promise<MedicalFacility[]> = new Promise((resolve, reject) => {
            return this._http.post(this._url + '/medicalprovider/getall', {}, {
                headers: this._headers
            }).map(res => res.json())
                .subscribe((data: any) => {
                    let medicalFacilities = (<Object[]>data).map((medicalFacilityData: any) => {
                        return MedicalFacilityAdapter.parseResponse(medicalFacilityData);
                    });
                    resolve(medicalFacilities);
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<MedicalFacility[]>>Observable.fromPromise(promise);
    }

    addMedicalFacility(medicalFacility: MedicalFacility): Observable<MedicalFacility> {
        let promise: Promise<any> = new Promise((resolve, reject) => {

            let requestData: any = medicalFacility.toJS();
            requestData.company = {
                'id': 1
            };
            console.log(requestData);
            return this._http.post(this._url + '/medicalprovider/add', JSON.stringify(requestData), {
                headers: this._headers
            }).map(res => res.json()).subscribe((data: any) => {
                let parsedMedicalFacility: MedicalFacility = null;
                parsedMedicalFacility = MedicalFacilityAdapter.parseResponse(data);
                resolve(parsedMedicalFacility);
            }, (error) => {
                reject(error);
            });
        });
        return <Observable<any>>Observable.fromPromise(promise);
        // return <Observable<MedicalFacility>>Observable.fromPromise(promise);
    }
    updateMedicalFacility(medicalFacility: MedicalFacility): Observable<any> {
        let promise: Promise<any> = new Promise((resolve, reject) => {

            let requestData: any = medicalFacility.toJS();
            requestData.company = {
                'id': 1
            };
            return this._http.post(this._url + '/medicalprovider/add', JSON.stringify(requestData), {
                headers: this._headers
            }).map(res => res.json()).subscribe((data: any) => {
                let parsedMedicalFacility: MedicalFacility = null;
                parsedMedicalFacility = MedicalFacilityAdapter.parseResponse(data);
                resolve(parsedMedicalFacility);
            }, (error) => {
                reject(error);
            });
        });
        return <Observable<any>>Observable.fromPromise(promise);
        // return <Observable<any>>Observable.fromPromise(promise);
    }

    fetchMedicalFacilityById(id: number): Observable<MedicalFacility> {
        let promise: Promise<MedicalFacility> = new Promise((resolve, reject) => {
            return this._http.get(this._url + '/MedicalFacility/Get/' + id).map(res => res.json())
                .subscribe((data: any) => {
                    let medicalFacility: MedicalFacility = MedicalFacilityAdapter.parseResponse(data);
                    resolve(medicalFacility);
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<MedicalFacility>>Observable.fromPromise(promise);
    }

    // addSpecialityDetail(specialityDetail: SpecialityDetail, medicalFacilityDetail: MedicalFacilityDetail): Observable<SpecialityDetail> {
    //     let promise: Promise<SpecialityDetail> = new Promise((resolve, reject) => {
    //         let specialityDetailData = _.omit(specialityDetail.toJS(), 'id');
    //         let requestData = {
    //             speciality: {
    //                 id: specialityDetail.associatedSpeciality
    //             },
    //             medicalFacility: {
    //                 id: medicalFacilityDetail.medicalfacility.id
    //             },
    //             specialityDetail: specialityDetailData
    //         };

    //         return this._http.post(this._url + '/SpecialityDetails/Add', JSON.stringify(requestData), {
    //             headers: this._headers
    //         })
    //             .map(res => res.json())
    //             .subscribe((specialityDetailData: any) => {
    //                 let parsedSpecialityDetail: SpecialityDetail = null;
    //                 parsedSpecialityDetail = SpecialityDetailAdapter.parseResponse(specialityDetailData);
    //                 resolve(parsedSpecialityDetail);
    //             }, (error) => {
    //                 reject(error);
    //             });
    //     });
    //     return <Observable<SpecialityDetail>>Observable.fromPromise(promise);
    // }

    // updateSpecialityDetail(specialityDetail: SpecialityDetail, medicalFacilityDetail: MedicalFacilityDetail): Observable<SpecialityDetail> {
    //     let promise: Promise<SpecialityDetail> = new Promise((resolve, reject) => {
    //         let specialityDetailData = specialityDetail.toJS();
    //         let requestData = {
    //             speciality: {
    //                 id: specialityDetail.associatedSpeciality
    //             },
    //             medicalFacility: {
    //                 id: medicalFacilityDetail.medicalfacility.id
    //             },
    //             specialityDetail: specialityDetailData
    //         };

    //         return this._http.post(this._url + '/SpecialityDetails/Add', JSON.stringify(requestData), {
    //             headers: this._headers
    //         })
    //             .map(res => res.json())
    //             .subscribe((specialityDetailData: any) => {
    //                 let parsedSpecialityDetail: SpecialityDetail = null;
    //                 parsedSpecialityDetail = SpecialityDetailAdapter.parseResponse(specialityDetailData);
    //                 resolve(parsedSpecialityDetail);
    //             }, (error) => {
    //                 reject(error);
    //             });
    //     });
    //     return <Observable<SpecialityDetail>>Observable.fromPromise(promise);
    // }


    // deleteSpecialityDetail(specialityDetail: SpecialityDetail, medicalFacilityDetail: MedicalFacilityDetail): Observable<SpecialityDetail> {
    //     let promise: Promise<SpecialityDetail> = new Promise((resolve, reject) => {
    //         let specialityDetailData = specialityDetail.toJS();
    //         specialityDetailData.isDeleted = 1;
    //         let requestData = {
    //             speciality: {
    //                 id: specialityDetail.associatedSpeciality
    //             },
    //             medicalFacility: {
    //                 id: medicalFacilityDetail.medicalfacility.id
    //             },
    //             specialityDetail: specialityDetailData
    //         };

    //         return this._http.post(this._url + '/SpecialityDetails/Add', JSON.stringify(requestData), {
    //             headers: this._headers
    //         })
    //             .map(res => res.json())
    //             .subscribe((specialityDetailData: any) => {
    //                 let parsedSpecialityDetail: SpecialityDetail = null;
    //                 parsedSpecialityDetail = SpecialityDetailAdapter.parseResponse(specialityDetailData);
    //                 resolve(parsedSpecialityDetail);
    //             }, (error) => {
    //                 reject(error);
    //             });
    //     });
    //     return <Observable<SpecialityDetail>>Observable.fromPromise(promise);
    // }

}

