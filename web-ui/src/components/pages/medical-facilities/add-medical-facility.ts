import { Component, OnInit, ElementRef } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { MedicalFacility } from '../../../models/medical-facility';
import { SessionStore } from '../../../stores/session-store';
import { NotificationsStore } from '../../../stores/notifications-store';
import { Notification } from '../../../models/notification';
import moment from 'moment';
import { MedicalFacilityStore } from '../../../stores/medical-facilities-store';
import { MedicalFacilityService } from '../../../services/medical-facility-service';

@Component({
    selector: 'add-medical-facility',
    templateUrl: 'templates/pages/medical-facilities/add-medical-facility.html',
    providers: [MedicalFacilityService, FormBuilder]
})

export class AddMedicalFacilityComponent implements OnInit {
    options = {
        timeOut: 3000,
        showProgressBar: true,
        pauseOnHover: false,
        clickToClose: false,
        maxLength: 10
    };
    medicalFacilityForm: FormGroup;
    medicalFacilityFormControls;
    isSaveMedicalFacilityProgress = false;

    constructor(
        private _medicalFacilitiesStore: MedicalFacilityStore,
        private fb: FormBuilder,
        private _router: Router,
        private _notificationsStore: NotificationsStore,
        private _sessionStore: SessionStore,
        private _elRef: ElementRef
    ) {
        this.medicalFacilityForm = this.fb.group({
            name: ['', Validators.required],
            npi: ['', Validators.required]
        });

        this.medicalFacilityFormControls = this.medicalFacilityForm.controls;
    }

    ngOnInit() {
    }


    saveMedicalFacility() {
        let medicalFacilityFormValues = this.medicalFacilityForm.value;
        let medicalFacility = new MedicalFacility({
            name: medicalFacilityFormValues.name,
            npi: medicalFacilityFormValues.npi
        });
        this.isSaveMedicalFacilityProgress = true;
        let result;

        result = this._medicalFacilitiesStore.addMedicalFacility(medicalFacility);
        result.subscribe(
            (response) => {
                let notification = new Notification({
                    'title': 'Medical facility added successfully!',
                    'type': 'SUCCESS',
                    'createdAt': moment()
                });
                this._notificationsStore.addNotification(notification);
                this._router.navigate(['/medical-facilities']);
            },
            (error) => {
                let notification = new Notification({
                    'title': 'Unable to add Medical facility.',
                    'type': 'ERROR',
                    'createdAt': moment()
                });
                this._notificationsStore.addNotification(notification);
            },
            () => {
                this.isSaveMedicalFacilityProgress = false;
            });

    }

}
