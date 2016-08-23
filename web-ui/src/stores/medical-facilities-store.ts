import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';
import {MedicalFacilityDetail} from '../models/medical-facility-details';
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


}