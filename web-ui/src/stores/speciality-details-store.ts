import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';
import {SpecialityDetail} from '../models/speciality-details';
import {SpecialityDetailsService} from '../services/speciality-details-service';
import {SessionStore} from './session-store';
import {List} from 'immutable';
import {BehaviorSubject} from 'rxjs/Rx';


@Injectable()
export class SpecialityDetailsStore {

    private _specialityDetails: BehaviorSubject<List<SpecialityDetail>> = new BehaviorSubject(List([]));

    constructor(
        private _specialityDetailsService: SpecialityDetailsService,
        private _sessionStore: SessionStore
    ) {
        this._sessionStore.userLogoutEvent.subscribe(() => {
            this.resetStore();
        });
    }

    resetStore() {
        this._specialityDetails.next(this._specialityDetails.getValue().clear());
    }


    get specialities() {
        return this._specialityDetails.asObservable();
    }

    getSpecialityDetails(): Observable<SpecialityDetail[]> {
        let promise = new Promise((resolve, reject) => {
            this._specialityDetailsService.getSpecialityDetails().subscribe((specialities: SpecialityDetail[]) => {
                this._specialityDetails.next(List(specialities));
                resolve(specialities);
            }, error => {
                reject(error);
            });
        });
        return <Observable<SpecialityDetail[]>>Observable.fromPromise(promise);
    }

    findSpecialityDetailById(id: number): SpecialityDetail {
        let specialities = this._specialityDetails.getValue();
        let index = specialities.findIndex((currentSpeciality: SpecialityDetail) => currentSpeciality.id === id);
        return specialities.get(index);
    }

    fetchSpecialityDetailById(id: number): Observable<SpecialityDetail> {
        let promise = new Promise((resolve, reject) => {
            let matchedSpeciality: SpecialityDetail = this.findSpecialityDetailById(id);
            if (matchedSpeciality) {
                resolve(matchedSpeciality);
            } else {
                this._specialityDetailsService.getSpecialityDetail(id)
                    .subscribe((speciality: SpecialityDetail) => {
                        resolve(speciality);
                    }, error => {
                        reject(error);
                    });
            }
        });
        return <Observable<SpecialityDetail>>Observable.fromPromise(promise);
    }

    addSpecialityDetail(specialityDetail: SpecialityDetail): Observable<SpecialityDetail> {
        let promise = new Promise((resolve, reject) => {
            this._specialityDetailsService.addSpecialityDetail(specialityDetail).subscribe((specialityDetail: SpecialityDetail) => {
                this._specialityDetails.next(this._specialityDetails.getValue().push(specialityDetail));
                resolve(specialityDetail);
            }, error => {
                reject(error);
            });
        });
        return <Observable<SpecialityDetail>>Observable.from(promise);
    }

    updateSpecialityDetail(specialityDetail: SpecialityDetail): Observable<SpecialityDetail> {
        let promise = new Promise((resolve, reject) => {
            this._specialityDetailsService.updateSpecialityDetail(specialityDetail).subscribe((currentSpeciality: SpecialityDetail) => {
                this._specialityDetails.next(this._specialityDetails.getValue().push(currentSpeciality));
                resolve(specialityDetail);
            }, error => {
                reject(error);
            });
        });
        return <Observable<SpecialityDetail>>Observable.from(promise);
    }


}