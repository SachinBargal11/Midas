import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';
import { Location } from '../models/location';
import { LocationsService } from '../services/locations-service';
import { List } from 'immutable';
import { BehaviorSubject } from 'rxjs/Rx';
import { SessionStore } from './session-store';

@Injectable()
export class LocationsStore {

    private _locations: BehaviorSubject<List<Location>> = new BehaviorSubject(List([]));
    private _selectedLocation: BehaviorSubject<Location> = new BehaviorSubject(null);

    constructor(
        private _locationsService: LocationsService,
        private _sessionStore: SessionStore
    ) {
        this._sessionStore.userLogoutEvent.subscribe(() => {
            this.resetStore();
        });
    }

    get locations() {
        return this._locations.asObservable();
    }

    get selectedLocation() {
        return this._selectedLocation.asObservable();
    }

    getLocations(): Observable<Location[]> {
        let promise = new Promise((resolve, reject) => {
            this._locationsService.getLocations().subscribe((locations: Location[]) => {
                this._locations.next(List(locations));
                resolve(locations);
            }, error => {
                reject(error);
            });
        });
        return <Observable<Location[]>>Observable.fromPromise(promise);
    }

    resetStore() {
        this._locations.next(this._locations.getValue().clear());
        this._selectedLocation.next(null);
    }

    selectLocation(location: Location) {
        this._selectedLocation.next(location);
    }
}