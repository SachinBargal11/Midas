import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';
import {MedicalFacilityDetail} from '../models/medical-facility-details';
import {SpecialityDetail} from '../models/speciality-details';
import {MedicalFacilityService} from '../services/medical-facility-service';
import {SessionStore} from './session-store';
import {Subject} from 'rxjs/Subject';
import {List} from 'immutable';
import {BehaviorSubject} from 'rxjs/Rx';
import _ from 'underscore';
import Moment from 'moment';


@Injectable()
export class MedicalFacilityStore {

    private _medicalFacilities: BehaviorSubject<List<MedicalFacilityDetail>> = new BehaviorSubject(List([]));

    constructor(
        private _medicalFacilitiesService: MedicalFacilityService,
        private _sessionStore: SessionStore
    ) {
        this.loadInitialData();
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

    loadInitialData(): Observable<MedicalFacilityDetail[]> {
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
        // let medicalFacilities = this._medicalFacilities.getValue();
        // let index = medicalFacilities.findIndex((currentMedicalFacility: MedicalFacilityDetail) => currentMedicalFacility.user.id === medicalFacilityDetail.medicalfacility.id);
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

    updateSpecialityDetail(specialtyDetail: SpecialityDetail, medicalFacilityDetail: MedicalFacilityDetail) {
        let promise = new Promise((resolve, reject) => {
            this._medicalFacilitiesService.updateSpecialityDetail(specialtyDetail, medicalFacilityDetail).subscribe((medicalFacility: MedicalFacilityDetail) => {
                this._medicalFacilities.next(this._medicalFacilities.getValue().push(medicalFacility));
                resolve(medicalFacility);
            }, error => {
                reject(error);
            });
        });
        return <Observable<MedicalFacilityDetail>>Observable.from(promise);
    }

    findMedicalFacilityById(id: number) {
        let medicalFacilities = this._medicalFacilities.getValue();
        let index = medicalFacilities.findIndex((currentMedicalFacility: MedicalFacilityDetail) => currentMedicalFacility.medicalfacility.id === id);
        return medicalFacilities.get(index);
    }

    fetchMedicalFacilityById(id: number): Observable<MedicalFacilityDetail> {
        let promise = new Promise((resolve, reject) => {
            let matchedMedicalFacility: MedicalFacilityDetail = this.findMedicalFacilityById(id);
            if (matchedMedicalFacility) {
                resolve(matchedMedicalFacility);
            } else {
                this._medicalFacilitiesService.fetchMedicalFacilityById(id).subscribe((medicalFacility: MedicalFacilityDetail) => {
                    resolve(medicalFacility);
                }, error => {
                    reject(error);
                });
            }
        });
        return <Observable<MedicalFacilityDetail>>Observable.from(promise);
    }

}