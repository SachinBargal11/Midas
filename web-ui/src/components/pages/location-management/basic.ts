import {Component, OnInit, ElementRef} from '@angular/core';
import {Validators, FormGroup, FormBuilder} from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';
import {AppValidators} from '../../../utils/AppValidators';
import {LocationsStore} from '../../../stores/locations-store';
import {Location} from '../../../models/location';
import {Contact} from '../../../models/contact';
import {Address} from '../../../models/address';
import {SessionStore} from '../../../stores/session-store';
import {NotificationsStore} from '../../../stores/notifications-store';
import {Notification} from '../../../models/notification';
import moment from 'moment';
import {StatesStore} from '../../../stores/states-store';
import {StateService} from '../../../services/state-service';

@Component({
    selector: 'basic',
    templateUrl: 'templates/pages/location-management/basic.html',
    providers: [StateService, StatesStore, FormBuilder],
})

export class BasicComponent implements OnInit {
    states: any[];
    options = {
        timeOut: 3000,
        showProgressBar: true,
        pauseOnHover: false,
        clickToClose: false,
        maxLength: 10
    };
    basicform: FormGroup;
    basicformControls;
    isSaveProgress = false;

    constructor(
        private _statesStore: StatesStore,
        private fb: FormBuilder,
        private _router: Router,
        public _route: ActivatedRoute,
        private _notificationsStore: NotificationsStore,
        private _sessionStore: SessionStore,
        private _locationsStore: LocationsStore,
        private _elRef: ElementRef
    ) {
        this._route.params.subscribe((routeParams: any) => {
            console.log(routeParams.locationName);
        });
        this.basicform = this.fb.group({
                officeName: ['', Validators.required],
                address: [''],
                city: ['', Validators.required],
                state: ['', Validators.required],
                zipcode: ['', Validators.required],
                officePhone: ['', Validators.required],
                fax: ['', Validators.required],
                officeType: ['', Validators.required]
            });

        this.basicformControls = this.basicform.controls;
    }

    ngOnInit() {
    }


    save() {
        let basicformValues = this.basicform.value;
        let basicInfo = new Location({
            name: basicformValues.officeName,
            locationType: parseInt(basicformValues.officeType),
            contact: new Contact({
                faxNo: basicformValues.fax,
                workPhone: basicformValues.officePhone,
            }),
            address: new Address({
                address1: basicformValues.address,
                city: basicformValues.city,
                state: basicformValues.state,
                zipCode: basicformValues.zipCode,
            })
        });
        this.isSaveProgress = true;
        let result;

        result = this._locationsStore.addLocation(basicInfo);
        result.subscribe(
            (response) => {
                let notification = new Notification({
                    'title': 'Location added successfully!',
                    'type': 'SUCCESS',
                    'createdAt': moment()
                });
                this._notificationsStore.addNotification(notification);
                this._router.navigate(['/medicalProvider/locations']);
            },
            (error) => {
                let notification = new Notification({
                    'title': 'Unable to add location.',
                    'type': 'ERROR',
                    'createdAt': moment()
                });
                this._notificationsStore.addNotification(notification);
            },
            () => {
                this.isSaveProgress = false;
            });

    }

}
