import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';
import { States } from '../models/states';
import { Cities } from '../models/cities';
import { StateService } from '../services/state-service';
import { SessionStore } from './session-store';
import { List } from 'immutable';
import { BehaviorSubject } from 'rxjs/Rx';


@Injectable()
export class StatesStore {

    private _states: BehaviorSubject<List<States>> = new BehaviorSubject(List([]));
    private _cities: BehaviorSubject<List<Cities>> = new BehaviorSubject(List([]));

    constructor(
        private _statesService: StateService,
        private _sessionStore: SessionStore
    ) {
        this._sessionStore.userLogoutEvent.subscribe(() => {
            this.resetStore();
        });
    }

    resetStore() {
        this._states.next(this._states.getValue().clear());
        this._cities.next(this._cities.getValue().clear());
    }

    get states() {
        return this._states.asObservable();
    }
    get cities() {
        return this._cities.asObservable();
    }

    getStates(): Observable<States[]> {
        let promise = new Promise((resolve, reject) => {
            // if (this.states) {
            //     resolve(this.states);
            // }
            this._statesService.getStates().subscribe((states: States[]) => {
                this._states.next(List(states));
                resolve(states);
            }, error => {
                reject(error);
            });
        });
        return <Observable<States[]>>Observable.fromPromise(promise);
    }

    fetchCitiesByState(stateName: string){
        let cities = this._cities.getValue();
        let index = cities.findIndex((currentCity: Cities) => currentCity.statecode === stateName);
        return cities.get(index);
    }

    getStatesByCities(cityName: string): Observable<States[]> {
        let promise = new Promise((resolve, reject) => {
            this._statesService.getStatesByCities(cityName).subscribe((states: States[]) => {
                this._states.next(List(states));
                resolve(states);
            }, error => {
                reject(error);
            });
        });
        return <Observable<States[]>>Observable.fromPromise(promise);
    }
    getCitiesByStates(stateName: string): Observable<Cities[]> {
        let promise = new Promise((resolve, reject) => {
            this._statesService.getCitiesByStates(stateName).subscribe((cities: Cities[]) => {
                this._cities.next(List(cities));
                resolve(cities);
            }, error => {
                reject(error);
            });
        });
        return <Observable<Cities[]>>Observable.fromPromise(promise);
    }
    getCities(): Observable<Cities[]> {
        let promise = new Promise((resolve, reject) => {
            this._statesService.getCities().subscribe((cities: Cities[]) => {
                this._cities.next(List(cities));
                resolve(cities);
            }, error => {
                reject(error);
            });
        });
        return <Observable<Cities[]>>Observable.fromPromise(promise);
    }
}