import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ErrorMessageFormatter } from '../../../utils/ErrorMessageFormatter';
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
    selectedLocations: LocationDetails[];
    locations: LocationDetails[];
    locationsLoading;
    isDeleteProgress = false;
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

    deleteLocations() {
        if (this.selectedLocations !== undefined) {
            this.selectedLocations.forEach(currentLocation => {
                this.isDeleteProgress = true;
                let result;
                result = this._locationsStore.deleteLocation(currentLocation);
                result.subscribe(
                    (response) => {
                        let notification = new Notification({
                            'title': 'Location ' + currentLocation.location.name + ' deleted successfully!',
                            'type': 'SUCCESS',
                            'createdAt': moment()
                        });
                        this.loadLocations();
                        this._notificationsStore.addNotification(notification);
                        console.log(this._locationsStore.locations);
                        this.selectedLocations = undefined;
                    },
                    (error) => {
                        let errString = 'Unable to delete' + currentLocation.location.name + ' location!';
                        let notification = new Notification({
                            'messages': ErrorMessageFormatter.getErrorMessages(error, errString),
                            'type': 'ERROR',
                            'createdAt': moment()
                        });
                        this.isDeleteProgress = false;
                        this._notificationsStore.addNotification(notification);
                    },
                    () => {
                        this.isDeleteProgress = false;
                    });
            });
        }
        else {
            let notification = new Notification({
                'title': 'select locations to delete',
                'type': 'ERROR',
                'createdAt': moment()
            });
            this._notificationsStore.addNotification(notification);
        }
    }

}