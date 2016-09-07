import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';
import {Specialty} from '../models/speciality';
import {SpecialityService} from '../services/speciality-service';
import {SessionStore} from './session-store';
import {Subject} from 'rxjs/Subject';
import {List} from 'immutable';
import {BehaviorSubject} from 'rxjs/Rx';
import _ from 'underscore';
import Moment from 'moment';


@Injectable()
export class SpecialityStore {

    private _specialties: BehaviorSubject<List<Specialty>> = new BehaviorSubject(List([]));
    private _selectedSpecialties: BehaviorSubject<List<Specialty>> = new BehaviorSubject(List([]));

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

    loadInitialData(): Observable<Specialty[]> {
        let promise = new Promise((resolve, reject) => {
            this._specialityService.getSpecialities().subscribe((specialties: Specialty[]) => {
                this._specialties.next(List(specialties));
                resolve(specialties);
            }, error => {
                reject(error);
            });
        });
        return <Observable<Specialty[]>>Observable.fromPromise(promise);
    }

    findSpecialityById(id: number) {
        let specialties = this._specialties.getValue();
        let index = specialties.findIndex((currentSpecialty: Specialty) => currentSpecialty.specialty.id === id);
        return specialties.get(index);
    }

    fetchSpecialityById(id: number): Observable<Specialty> {
        let promise = new Promise((resolve, reject) => {
            let matchedSpecialty: Specialty = this.findSpecialityById(id);
            if (matchedSpecialty) {
                resolve(matchedSpecialty);
            } else {
                this._specialityService.getSpeciality(id)
                .subscribe((specialty: Specialty) => {
                    resolve(specialty);
                }, error => {
                    reject(error);
                });
            }
        });
        return <Observable<Specialty>>Observable.fromPromise(promise);
    }

    addSpeciality(specialty: Specialty): Observable<Specialty> {
        let promise = new Promise((resolve, reject) => {
            this._specialityService.addSpeciality(specialty).subscribe((specialty: Specialty) => {
                this._specialties.next(this._specialties.getValue().push(specialty));
                resolve(specialty);
            }, error => {
                reject(error);
            });
        });
        return <Observable<Specialty>>Observable.from(promise);
    }

    updateSpeciality(specialty: Specialty): Observable<Specialty> {
        // let specialities = this._specialties.getValue();
        // let index = specialities.findIndex((currentSpecialty: Specialty) => currentSpecialty.specialty.id === specialty.specialty.id);
        let promise = new Promise((resolve, reject) => {
            this._specialityService.updateSpeciality(specialty).subscribe((currentSpecialty: Specialty) => {
                this._specialties.next(this._specialties.getValue().push(specialty));
                resolve(specialty);
            }, error => {
                reject(error);
            });
        });
        return <Observable<Specialty>>Observable.from(promise);
    }

     selectSpecialities(specialty: Specialty) {
        let selectedSpecialties = this._selectedSpecialties.getValue();
        let index = selectedSpecialties.findIndex((currentSpecialty: Specialty) => currentSpecialty.specialty.id === specialty.specialty.id);
        if (index < 0) {
            this._selectedSpecialties.next(this._selectedSpecialties.getValue().push(specialty));
        }
    }


}