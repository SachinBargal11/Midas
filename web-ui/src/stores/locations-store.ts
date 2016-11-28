import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';
import { Location } from '../models/location';
import { LocationDetails } from '../models/location-details';
import { LocationsService } from '../services/locations-service';
import { List } from 'immutable';
import { BehaviorSubject } from 'rxjs/Rx';
import { SessionStore } from './session-store';

@Injectable()
export class LocationsStore {

    private _locations: BehaviorSubject<List<LocationDetails>> = new BehaviorSubject(List([]));
    private _selectedLocation: BehaviorSubject<LocationDetails> = new BehaviorSubject(null);

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

    getLocations(): Observable<LocationDetails[]> {
        let promise = new Promise((resolve, reject) => {
            this._locationsService.getLocations().subscribe((locations: LocationDetails[]) => {
                this._locations.next(List(locations));
                resolve(locations);
            }, error => {
                reject(error);
            });
        });
        return <Observable<LocationDetails[]>>Observable.fromPromise(promise);
    }

    // getLocationById(id: number): Observable<LocationDetails[]> {
    //     let promise = new Promise((resolve, reject) => {
    //         let matchedLocation: LocationDetails = this.findLocationById(id);
    //         if (matchedLocation) {
    //             resolve(matchedLocation);
    //         } else {
    //             this._locationsService.getLocatio(id).subscribe((location: LocationDetails) => {
    //                 resolve(location);
    //             }, error => {
    //                 reject(error);
    //             });
    //         }
    //     });
    //     return <Observable<LocationDetails>>Observable.fromPromise(promise);
    // }

    findLocationById(id: number) {
        let locations = this._locations.getValue();
        let index = locations.findIndex((currentPatient: LocationDetails) => currentPatient.location.id === id);
        return locations.get(index);
    }

    resetStore() {
        this._locations.next(this._locations.getValue().clear());
        this._selectedLocation.next(null);
    }

    addLocation(basicInfo: LocationDetails): Observable<LocationDetails> {
        let promise = new Promise((resolve, reject) => {
            this._locationsService.addLocation(basicInfo).subscribe((location: LocationDetails) => {
                this._locations.next(this._locations.getValue().push(location));
                resolve(location);
            }, error => {
                reject(error);
            });
        });
        return <Observable<LocationDetails>>Observable.from(promise);
    }

    selectLocation(location: LocationDetails) {
        this._selectedLocation.next(location);
    }
}