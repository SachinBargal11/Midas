import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';
import { LocationDetails } from '../models/location-details';
import { LocationsService } from '../services/locations-service';
import { List } from 'immutable';
import { BehaviorSubject } from 'rxjs/Rx';
import { SessionStore } from '../../../commons/stores/session-store';
import { Schedule } from '../models/schedule';

@Injectable()
export class LocationsStore {

    private _locations: BehaviorSubject<List<LocationDetails>> = new BehaviorSubject(List([]));

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

    getLocationById(id: number): Observable<LocationDetails> {
        let promise = new Promise((resolve, reject) => {
            this._locationsService.getLocation(id).subscribe((location: LocationDetails) => {
                resolve(location);
            }, error => {
                reject(error);
            });
        });
        return <Observable<LocationDetails>>Observable.fromPromise(promise);
    }


    fetchLocationById(id: number): Observable<LocationDetails> {
        let promise = new Promise((resolve, reject) => {
            let matchedLocation: LocationDetails = this.findLocationById(id);
            if (matchedLocation) {
                resolve(matchedLocation);
            } else {
                this._locationsService.getLocation(id).subscribe((location: LocationDetails) => {
                    resolve(location);
                }, error => {
                    reject(error);
                });
            }
        });
        return <Observable<LocationDetails>>Observable.fromPromise(promise);
    }

    findLocationById(id: number) {
        let locations = this._locations.getValue();
        let index = locations.findIndex((currentLocation: LocationDetails) => currentLocation.location.id === id);
        return locations.get(index);
    }

    resetStore() {
        this._locations.next(this._locations.getValue().clear());
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
    updateLocation(basicInfo: LocationDetails): Observable<LocationDetails> {
        let promise = new Promise((resolve, reject) => {
            this._locationsService.updateLocation(basicInfo).subscribe((updatedLocation: LocationDetails) => {
                let locationDetails: List<LocationDetails> = this._locations.getValue();
                let index = locationDetails.findIndex((currentLocation: LocationDetails) => currentLocation.location.id === updatedLocation.location.id);
                locationDetails = locationDetails.update(index, function () {
                    return updatedLocation;
                });
                this._locations.next(locationDetails);
                resolve(basicInfo);
            }, error => {
                reject(error);
            });
        });
        return <Observable<LocationDetails>>Observable.from(promise);
    }

    updateScheduleForLocation(basicInfo: LocationDetails, schedule: Schedule): Observable<LocationDetails> {
        let promise = new Promise((resolve, reject) => {
            this._locationsService.updateScheduleForLocation(basicInfo, schedule).subscribe((updatedLocation: LocationDetails) => {
                let locationDetails: List<LocationDetails> = this._locations.getValue();
                let index = locationDetails.findIndex((currentLocation: LocationDetails) => currentLocation.location.id === updatedLocation.location.id);
                locationDetails = locationDetails.update(index, function () {
                    return updatedLocation;
                });
                this._locations.next(locationDetails);
                resolve(basicInfo);
            }, error => {
                reject(error);
            });
        });
        return <Observable<LocationDetails>>Observable.from(promise);
    }

    deleteLocation(location: LocationDetails) {
        let locations = this._locations.getValue();
        let index = locations.findIndex((currentLocation: LocationDetails) => currentLocation.location.id === location.location.id);
        let promise = new Promise((resolve, reject) => {
            this._locationsService.deleteLocation(location)
                .subscribe((location: LocationDetails) => {
                    this._locations.next(locations.delete(index));
                    resolve(location);
                }, error => {
                    reject(error);
                });
        });
        return <Observable<LocationDetails>>Observable.from(promise);
    }


}