import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MedicalProviderService } from '../../../services/medical-provider-service';
import { LocationDetails } from '../../../models/location-details';
import { LocationsStore } from '../../../stores/locations-store';
import { SessionStore } from '../../../stores/session-store';
import { NotificationsStore } from '../../../stores/notifications-store';
import { Notification } from '../../../models/notification';
import moment from 'moment';


@Component({
    selector: 'location-list',
    templateUrl: 'templates/pages/medical-provider/location-list.html'
})

export class LocationComponent implements OnInit {
    locations: LocationDetails[];
    locationsLoading;
    constructor(
        private _router: Router,
        private _notificationsStore: NotificationsStore,
        private _medicalProviderService: MedicalProviderService,
        private _locationsStore: LocationsStore,
        public _sessionStore: SessionStore
    ) {
        this._sessionStore.userCompanyChangeEvent.subscribe(() => {
            this.loadLocations();
        });
    }

    ngOnInit() {
        this.loadLocations();
    }

    loadLocations() {
        this.locationsLoading = true;
        this._locationsStore.getLocations()
            .subscribe(
            (data) => {
                this.locations = data;
            },
            (error) => {
                this.locations = [];
                this.locationsLoading = false;
                let notification = new Notification({
                    'title': error.message,
                    'type': 'ERROR',
                    'createdAt': moment()
                });
                this._notificationsStore.addNotification(notification);
            },
            () => {
                this.locationsLoading = false;
            });
    }
    onRowSelect(location) {
        this._router.navigate(['/medical-provider/locations/' + location.location.id + '/basic']);
    }

}