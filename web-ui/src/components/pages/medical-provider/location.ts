import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {MedicalProviderService} from '../../../services/medical-provider-service';
import {Location} from '../../../models/location';
import {LocationDetails} from '../../../models/location-details';
import {LocationsStore} from '../../../stores/locations-store';

@Component({
    selector: 'location-list',
    templateUrl: 'templates/pages/medical-provider/location-list.html'
})

export class LocationComponent implements OnInit {
    locations: LocationDetails[];
    locationsLoading;
    constructor(
        private _router: Router,
        private _medicalProviderService: MedicalProviderService,
        private _locationsStore: LocationsStore
        ) {

    }

    ngOnInit() {
        this.loadLocations();
    }

    loadLocations() {
        this.locationsLoading = true;
        this._locationsStore.getLocations()
            .subscribe(locations => {
                this.locations = locations;
            },
            null,
            () => {
                this.locationsLoading = false;
            });
    }
    onRowSelect(location) {
        this._router.navigate(['/medical-provider/locations/' + location.location.id + '/basic']);
    }

}