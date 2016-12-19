import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';
import {MedicalFacility} from '../models/medical-facility';
// import {SpecialityDetail} from '../models/speciality-details';
import {MedicalFacilityService} from '../services/medical-facility-service';
import {SessionStore} from './session-store';
import {List} from 'immutable';
import {BehaviorSubject} from 'rxjs/Rx';


@Injectable()
export class MedicalFacilityStore {

    private _medicalFacilities: BehaviorSubject<List<MedicalFacility>> = new BehaviorSubject(List([]));

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

    getMedicalFacilities(): Observable<MedicalFacility[]> {
        // let accountId: number = this._sessionStore.session.account_id;
        let promise = new Promise((resolve, reject) => {
            this._medicalFacilitiesService.getMedicalFacilities().subscribe((medicalFacilities: MedicalFacility[]) => {
                this._medicalFacilities.next(List(medicalFacilities));
                resolve(medicalFacilities);
            }, error => {
                reject(error);
            });
        });
        return <Observable<MedicalFacility[]>>Observable.fromPromise(promise);
    }

    addMedicalFacility(medicalFacility: MedicalFacility): Observable<MedicalFacility> {
        let promise = new Promise((resolve, reject) => {
            this._medicalFacilitiesService.addMedicalFacility(medicalFacility).subscribe((medicalFacility: MedicalFacility) => {
                this._medicalFacilities.next(this._medicalFacilities.getValue().push(medicalFacility));
                resolve(medicalFacility);
            }, error => {
                reject(error);
            });
        });
        return <Observable<MedicalFacility>>Observable.from(promise);
    }
    updateMedicalFacility(medicalFacility: MedicalFacility): Observable<MedicalFacility> {
        let promise = new Promise((resolve, reject) => {
            this._medicalFacilitiesService.updateMedicalFacility(medicalFacility).subscribe((updatedMedicalFacilityDetail: MedicalFacility) => {
                let MedicalFacilityDetails: List<MedicalFacility> = this._medicalFacilities.getValue();
                let index = MedicalFacilityDetails.findIndex((currentMedicalFacility: MedicalFacility) => currentMedicalFacility.id === updatedMedicalFacilityDetail.id);
                MedicalFacilityDetails = MedicalFacilityDetails.update(index, function () {
                    return updatedMedicalFacilityDetail;
                });
                this._medicalFacilities.next(MedicalFacilityDetails);
                resolve(medicalFacility);
            }, error => {
                reject(error);
            });
        });
        return <Observable<MedicalFacility>>Observable.from(promise);
    }

    // addSpecialityDetail(specialityDetail: SpecialityDetail, medicalFacilityDetail: MedicalFacilityDetail) {
    //     let promise = new Promise((resolve, reject) => {
    //         this._medicalFacilitiesService.addSpecialityDetail(specialityDetail, medicalFacilityDetail).subscribe((specialityDetail: SpecialityDetail) => {
    //             medicalFacilityDetail.specialityDetails.next(medicalFacilityDetail.specialityDetails.getValue().push(specialityDetail));
    //             this._medicalFacilities.next(this._medicalFacilities.getValue());
    //             resolve(specialityDetail);
    //         }, error => {
    //             reject(error);
    //         });
    //     });
    //     return <Observable<SpecialityDetail>>Observable.from(promise);
    // }

    // updateSpecialityDetail(specialityDetail: SpecialityDetail, medicalFacilityDetail: MedicalFacilityDetail) {
    //     let specialityDetails = medicalFacilityDetail.specialityDetails.getValue();
    //     let index = specialityDetails.findIndex((currentSpecialityDetail: SpecialityDetail) => currentSpecialityDetail.id === specialityDetail.id);
    //     let promise = new Promise((resolve, reject) => {
    //         this._medicalFacilitiesService.updateSpecialityDetail(specialityDetail, medicalFacilityDetail).subscribe((specialityDetail: SpecialityDetail) => {
    //             let specialityDetails: List<SpecialityDetail> = medicalFacilityDetail.specialityDetails.getValue();
    //             specialityDetails = specialityDetails.update(index, function () {
    //                 return specialityDetail;
    //             });
    //             medicalFacilityDetail.specialityDetails.next(specialityDetails);
    //             this._medicalFacilities.next(this._medicalFacilities.getValue());
    //             resolve(specialityDetail);
    //         }, error => {
    //             reject(error);
    //         });
    //     });
    //     return <Observable<SpecialityDetail>>Observable.from(promise);
    // }

    // deleteSpecialityDetail(specialityDetail: SpecialityDetail, medicalFacilityDetail: MedicalFacilityDetail) {
    //     let specialityDetails = medicalFacilityDetail.specialityDetails.getValue();
    //     let index = specialityDetails.findIndex((currentSpecialityDetail: SpecialityDetail) => currentSpecialityDetail.id === specialityDetail.id);
    //     let promise = new Promise((resolve, reject) => {
    //         this._medicalFacilitiesService.deleteSpecialityDetail(specialityDetail, medicalFacilityDetail).subscribe((specialityDetail: SpecialityDetail) => {
    //             medicalFacilityDetail.specialityDetails.next(specialityDetails.delete(index));
    //             this._medicalFacilities.next(this._medicalFacilities.getValue());
    //             resolve(specialityDetail);
    //         }, error => {
    //             reject(error);
    //         });
    //     });
    //     return <Observable<SpecialityDetail>>Observable.from(promise);
    // }

    findMedicalFacilityById(id: number): MedicalFacility {
        let medicalFacilities = this._medicalFacilities.getValue();
        let index = medicalFacilities.findIndex((currentMedicalFacility: MedicalFacility) => currentMedicalFacility.id === id);
        return medicalFacilities.get(index);
    }

    fetchMedicalFacilityById(id: number): Observable<MedicalFacility> {
        let promise = new Promise((resolve, reject) => {
            let matchedMedicalFacility: MedicalFacility = this.findMedicalFacilityById(id);
            if (matchedMedicalFacility) {
                resolve(matchedMedicalFacility);
            } else {
                this._medicalFacilitiesService.fetchMedicalFacilityById(id).subscribe((medicalFacility: MedicalFacility) => {
                    let medicalFacilities: List<MedicalFacility> = this._medicalFacilities.getValue();
                    let index = medicalFacilities.findIndex((currentMedicalFacility: MedicalFacility) => currentMedicalFacility.id === id);
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
        return <Observable<MedicalFacility>>Observable.from(promise);
    }

}