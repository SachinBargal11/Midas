import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';
import {MedicalFacilityDetail} from '../models/medical-facility-details';
import {SpecialityDetail} from '../models/speciality-details';
import {MedicalFacilityService} from '../services/medical-facility-service';
import {SessionStore} from './session-store';
import {List} from 'immutable';
import {BehaviorSubject} from 'rxjs/Rx';


@Injectable()
export class MedicalFacilityStore {

    private _medicalFacilities: BehaviorSubject<List<MedicalFacilityDetail>> = new BehaviorSubject(List([]));

    constructor(
        private _medicalFacilitiesService: MedicalFacilityService,
        private _sessionStore: SessionStore
    ) {
        this._sessionStore.userLogoutEvent.subscribe(() => {
            this.resetStore();
        });
    }

    resetStore() {
        this._medicalFacilities.next(this._medicalFacilities.getValue().clear());
    }


    get medicalFacilities() {
        return this._medicalFacilities.asObservable();
    }

    getMedicalFacilities(): Observable<MedicalFacilityDetail[]> {
        let accountId: number = this._sessionStore.session.account_id;
        let promise = new Promise((resolve, reject) => {
            this._medicalFacilitiesService.getMedicalFacilities(accountId).subscribe((medicalFacilities: MedicalFacilityDetail[]) => {
                this._medicalFacilities.next(List(medicalFacilities));
                resolve(medicalFacilities);
            }, error => {
                reject(error);
            });
        });
        return <Observable<MedicalFacilityDetail[]>>Observable.fromPromise(promise);
    }

    addMedicalFacility(medicalFacilityDetail: MedicalFacilityDetail): Observable<MedicalFacilityDetail> {
        let promise = new Promise((resolve, reject) => {
            this._medicalFacilitiesService.addMedicalFacility(medicalFacilityDetail).subscribe((medicalFacility: MedicalFacilityDetail) => {
                this._medicalFacilities.next(this._medicalFacilities.getValue().push(medicalFacility));
                resolve(medicalFacility);
            }, error => {
                reject(error);
            });
        });
        return <Observable<MedicalFacilityDetail>>Observable.from(promise);
    }
    updateMedicalFacility(medicalFacilityDetail: MedicalFacilityDetail): Observable<MedicalFacilityDetail> {
        let promise = new Promise((resolve, reject) => {
            this._medicalFacilitiesService.updateMedicalFacility(medicalFacilityDetail).subscribe((medicalFacilityDetail: MedicalFacilityDetail) => {
                this._medicalFacilities.next(this._medicalFacilities.getValue().push(medicalFacilityDetail));
                resolve(medicalFacilityDetail);
            }, error => {
                reject(error);
            });
        });
        return <Observable<MedicalFacilityDetail>>Observable.from(promise);
    }

    addSpecialityDetail(specialityDetail: SpecialityDetail, medicalFacilityDetail: MedicalFacilityDetail) {
        let promise = new Promise((resolve, reject) => {
            this._medicalFacilitiesService.addSpecialityDetail(specialityDetail, medicalFacilityDetail).subscribe((specialityDetail: SpecialityDetail) => {
                medicalFacilityDetail.specialityDetails.next(medicalFacilityDetail.specialityDetails.getValue().push(specialityDetail));
                this._medicalFacilities.next(this._medicalFacilities.getValue());
                resolve(specialityDetail);
            }, error => {
                reject(error);
            });
        });
        return <Observable<SpecialityDetail>>Observable.from(promise);
    }

    updateSpecialityDetail(specialityDetail: SpecialityDetail, medicalFacilityDetail: MedicalFacilityDetail) {
        let specialityDetails = medicalFacilityDetail.specialityDetails.getValue();
        let index = specialityDetails.findIndex((currentSpecialityDetail: SpecialityDetail) => currentSpecialityDetail.id === specialityDetail.id);
        let promise = new Promise((resolve, reject) => {
            this._medicalFacilitiesService.updateSpecialityDetail(specialityDetail, medicalFacilityDetail).subscribe((specialityDetail: SpecialityDetail) => {
                let specialityDetails: List<SpecialityDetail> = medicalFacilityDetail.specialityDetails.getValue();
                specialityDetails = specialityDetails.update(index, function () {
                    return specialityDetail;
                });
                medicalFacilityDetail.specialityDetails.next(specialityDetails);
                this._medicalFacilities.next(this._medicalFacilities.getValue());
                resolve(specialityDetail);
            }, error => {
                reject(error);
            });
        });
        return <Observable<SpecialityDetail>>Observable.from(promise);
    }

    deleteSpecialityDetail(specialityDetail: SpecialityDetail, medicalFacilityDetail: MedicalFacilityDetail) {
        let specialityDetails = medicalFacilityDetail.specialityDetails.getValue();
        let index = specialityDetails.findIndex((currentSpecialityDetail: SpecialityDetail) => currentSpecialityDetail.id === specialityDetail.id);
        let promise = new Promise((resolve, reject) => {
            this._medicalFacilitiesService.deleteSpecialityDetail(specialityDetail, medicalFacilityDetail).subscribe((specialityDetail: SpecialityDetail) => {
                medicalFacilityDetail.specialityDetails.next(specialityDetails.delete(index));
                this._medicalFacilities.next(this._medicalFacilities.getValue());
                resolve(specialityDetail);
            }, error => {
                reject(error);
            });
        });
        return <Observable<SpecialityDetail>>Observable.from(promise);
    }

    findMedicalFacilityById(id: number): MedicalFacilityDetail {
        let medicalFacilities = this._medicalFacilities.getValue();
        let index = medicalFacilities.findIndex((currentMedicalFacility: MedicalFacilityDetail) => currentMedicalFacility.medicalfacility.id === id);
        return medicalFacilities.get(index);
    }

    fetchMedicalFacilityById(id: number): Observable<MedicalFacilityDetail> {
        let promise = new Promise((resolve, reject) => {
            let matchedMedicalFacility: MedicalFacilityDetail = this.findMedicalFacilityById(id);
            if (matchedMedicalFacility && matchedMedicalFacility.hasSpecialityDetails) {
                resolve(matchedMedicalFacility);
            } else {
                this._medicalFacilitiesService.fetchMedicalFacilityById(id).subscribe((medicalFacility: MedicalFacilityDetail) => {
                    let medicalFacilities: List<MedicalFacilityDetail> = this._medicalFacilities.getValue();
                    let index = medicalFacilities.findIndex((currentMedicalFacility: MedicalFacilityDetail) => currentMedicalFacility.medicalfacility.id === id);
                    medicalFacilities = medicalFacilities.update(index, function () {
                        return medicalFacility;
                    });
                    this._medicalFacilities.next(this._medicalFacilities.getValue());
                    resolve(medicalFacility);
                }, error => {
                    reject(error);
                });
            }
        });
        return <Observable<MedicalFacilityDetail>>Observable.from(promise);
    }

}