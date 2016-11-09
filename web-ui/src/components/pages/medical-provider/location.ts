import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {MedicalProviderService} from '../../../services/medical-provider-service';
import {Location} from '../../../models/location';

@Component({
    selector: 'location-list',
    templateUrl: 'templates/pages/medical-provider/location-list.html'
})

export class LocationComponent implements OnInit {
    locations: Location[];
    locationsLoading;
    constructor(
        private _router: Router,
        private _medicalProviderService: MedicalProviderService
        ) {

    }

    ngOnInit() {
        this.loadLocations();
    }

    loadLocations() {
        this.locationsLoading = true;
        this._medicalProviderService.getLocations()
            .subscribe(locations => {
                this.locations = locations;
            },
            null,
            () => {
                this.locationsLoading = false;
            });
    }
    onRowSelect(location) {
        debugger;
        this._router.navigate(['/medicalProvider/locations/' + location.name + '/basic']);
    }

}