import { Component, OnInit, ElementRef } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MedicalFacility } from '../../../models/medical-facility';
import { SessionStore } from '../../../stores/session-store';
import { NotificationsStore } from '../../../stores/notifications-store';
import { Notification } from '../../../models/notification';
import moment from 'moment';
import { MedicalFacilityStore } from '../../../stores/medical-facilities-store';
import { MedicalFacilityService } from '../../../services/medical-facility-service';

@Component({
    selector: 'update-medical-facility',
    templateUrl: 'templates/pages/medical-facilities/update-medical-facility.html',
    providers: [MedicalFacilityService, FormBuilder]
})

export class UpdateMedicalFacilityComponent implements OnInit {
    medicalfacility = new MedicalFacility({});
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
        private _route: ActivatedRoute,
        private _notificationsStore: NotificationsStore,
        private _sessionStore: SessionStore,
        private _elRef: ElementRef
    ) {
        this._route.params.subscribe((routeParams: any) => {
            let mfId: number = parseInt(routeParams.id);
            let result = this._medicalFacilitiesStore.fetchMedicalFacilityById(mfId);
            result.subscribe(
                (medicalFacility: MedicalFacility) => {
                    this.medicalfacility = medicalFacility;
                },
                (error) => {
                    this._router.navigate(['/medical-facilities']);
                },
                () => {
                });
        });

        this.medicalFacilityForm = this.fb.group({
            name: ['', Validators.required],
            npi: ['', Validators.required]
        });

        this.medicalFacilityFormControls = this.medicalFacilityForm.controls;
    }

    ngOnInit() {
    }


    updateMedicalFacility() {
        let medicalFacilityFormValues = this.medicalFacilityForm.value;
        let medicalFacility = new MedicalFacility({
            name: medicalFacilityFormValues.name,
            npi: medicalFacilityFormValues.npi,
            id: this.medicalfacility.id
        });
        this.isSaveMedicalFacilityProgress = true;
        let result;

        result = this._medicalFacilitiesStore.updateMedicalFacility(medicalFacility);
        result.subscribe(
            (response) => {
                this.isSaveMedicalFacilityProgress = false;
                let notification = new Notification({
                    'title': 'Medical facility updated successfully!',
                    'type': 'SUCCESS',
                    'createdAt': moment()
                });
                this._notificationsStore.addNotification(notification);
                this._router.navigate(['/medical-facilities']);
            },
            (error) => {
                this.isSaveMedicalFacilityProgress = false;
                let notification = new Notification({
                    'title': 'Unable to update Medical facility.',
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
