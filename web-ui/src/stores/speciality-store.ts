import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';
import {Speciality} from '../models/speciality';
import {SpecialityService} from '../services/speciality-service';
import {SessionStore} from './session-store';
import {Subject} from 'rxjs/Subject';
import {List} from 'immutable';
import {BehaviorSubject} from 'rxjs/Rx';
import _ from 'underscore';
import Moment from 'moment';


@Injectable()
export class SpecialityStore {

    private _specialties: BehaviorSubject<List<Speciality>> = new BehaviorSubject(List([]));
    private _selectedSpecialties: BehaviorSubject<List<Speciality>> = new BehaviorSubject(List([]));

    constructor(
        private _specialityService: SpecialityService,
        private _sessionStore: SessionStore
    ) {
        this.loadInitialData();
        this._sessionStore.userLogoutEvent.subscribe(() => {
            this.resetStore();
        });
    }

    resetStore() {
        this._specialties.next(this._specialties.getValue().clear());
        this._selectedSpecialties.next(this._selectedSpecialties.getValue().clear());
    }


    get specialties() {
        return this._specialties.asObservable();
    }

    get selectedSpecialities() {
        return this._selectedSpecialties.asObservable();
    }

    loadInitialData(): Observable<Speciality[]> {
        let promise = new Promise((resolve, reject) => {
            this._specialityService.getSpecialities().subscribe((specialties: Speciality[]) => {
                this._specialties.next(List(specialties));
                resolve(specialties);
            }, error => {
                reject(error);
            });
        });
        return <Observable<Speciality[]>>Observable.fromPromise(promise);
    }

    findSpecialityById(id: number) {
        let specialties = this._specialties.getValue();
        let index = specialties.findIndex((currentSpecialty: Speciality) => currentSpecialty.specialty.id === id);
        return specialties.get(index);
    }

    fetchSpecialityById(id: number): Observable<Speciality> {
        let promise = new Promise((resolve, reject) => {
            let matchedSpecialty: Speciality = this.findSpecialityById(id);
            if (matchedSpecialty) {
                resolve(matchedSpecialty);
            } else {
                this._specialityService.getSpeciality(id)
                .subscribe((specialty: Speciality) => {
                    resolve(specialty);
                }, error => {
                    reject(error);
                });
            }
        });
        return <Observable<Speciality>>Observable.fromPromise(promise);
    }

    addSpeciality(specialty: Speciality): Observable<Speciality> {
        let promise = new Promise((resolve, reject) => {
            this._specialityService.addSpeciality(specialty).subscribe((specialty: Speciality) => {
                this._specialties.next(this._specialties.getValue().push(specialty));
                resolve(specialty);
            }, error => {
                reject(error);
            });
        });
        return <Observable<Speciality>>Observable.from(promise);
    }

    updateSpeciality(specialty: Speciality): Observable<Speciality> {
        // let specialities = this._specialties.getValue();
        // let index = specialities.findIndex((currentSpecialty: Specialty) => currentSpecialty.specialty.id === specialty.specialty.id);
        let promise = new Promise((resolve, reject) => {
            this._specialityService.updateSpeciality(specialty).subscribe((currentSpecialty: Speciality) => {
                this._specialties.next(this._specialties.getValue().push(specialty));
                resolve(specialty);
            }, error => {
                reject(error);
            });
        });
        return <Observable<Speciality>>Observable.from(promise);
    }

     selectSpecialities(specialty: Speciality) {
        let selectedSpecialties = this._selectedSpecialties.getValue();
        let index = selectedSpecialties.findIndex((currentSpecialty: Speciality) => currentSpecialty.specialty.id === specialty.specialty.id);
        if (index < 0) {
            this._selectedSpecialties.next(this._selectedSpecialties.getValue().push(specialty));
        }
    }


}