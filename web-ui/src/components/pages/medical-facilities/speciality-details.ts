import {List} from 'immutable';
import {Observable} from 'rxjs/Observable';
import moment from 'moment';
import {Component, ViewChild} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import { ModalDirective } from 'ng2-bootstrap/ng2-bootstrap';
import {NotificationsService} from 'angular2-notifications';
import { ErrorMessageFormatter } from '../../../utils/ErrorMessageFormatter';
import {MedicalFacilityStore} from '../../../stores/medical-facilities-store';
import {SpecialityDetail} from '../../../models/speciality-details';
import {MedicalFacilityDetail} from '../../../models/medical-facility-details';

import {UpdateSpecialityDetailComponent} from './update-speciality-detail';
import {AddSpecialityDetailComponent} from './add-speciality-detail';

import {NotificationsStore} from '../../../stores/notifications-store';
import {Notification} from '../../../models/notification';

import {SpecialityStore} from '../../../stores/speciality-store';


@Component({
    selector: 'speciality-details',
    templateUrl: 'templates/pages/medical-facilities/speciality-details.html',
})

export class SpecialityDetailsComponent {
    medicalFacilityDetail: MedicalFacilityDetail;
    selectedSpecialityDetail: SpecialityDetail = null;
    @ViewChild('addSpecialityDetailModal') public addSpecialityDetailModal: ModalDirective;
    @ViewChild('updateSpecialityDetailModal') public updateSpecialityDetailModal: ModalDirective;

    @ViewChild(AddSpecialityDetailComponent) private addSpecialityDetailComponent: AddSpecialityDetailComponent;
    @ViewChild(UpdateSpecialityDetailComponent) private updateSpecialityDetailComponent: UpdateSpecialityDetailComponent;

    options = {
        timeOut: 3000,
        showProgressBar: true,
        pauseOnHover: false,
        clickToClose: false,
        maxLength: 10
    };

    get specialityDetails(): List<SpecialityDetail> {
        return this.medicalFacilityDetail ? this.medicalFacilityDetail.specialityDetails.getValue() : null;
    }
    constructor(
        public _route: ActivatedRoute,
        public _router: Router,
        private _medicalFacilityStore: MedicalFacilityStore,
        private _notificationsStore: NotificationsStore,
        private _notificationsService: NotificationsService,
        public specialityStore: SpecialityStore
    ) {
        this._route.params.subscribe((routeParams: any) => {
            let medicalFacilityId: number = parseInt(routeParams.id);
            let result = this._medicalFacilityStore.fetchMedicalFacilityById(medicalFacilityId);
            result.subscribe(
                // (medicalFacilityDetail: MedicalFacilityDetail) => {
                //     this.medicalFacilityDetail = medicalFacilityDetail;
                // },
                (error) => {
                    this._router.navigate(['/medical-facilities']);
                },
                () => {
                });
        });
    }

    showAddSpecialityDetailModal(): void {
        this.addSpecialityDetailModal.show();
    }

    hideAddSpecialityDetailModal(): void {
        this.addSpecialityDetailModal.hide();
    }

    showUpdateSpecialityDetailModal(): void {
        this.updateSpecialityDetailModal.show();
    }

    hideUpdateSpecialityDetailModal(): void {
        this.updateSpecialityDetailModal.hide();
    }

    onAddSpecialityDetailModalHide(): void {
        this.addSpecialityDetailComponent.resetForm();
    }

    onUpdateSpecialityDetailModalHide(): void {
        this.updateSpecialityDetailComponent.resetForm();
        this.selectedSpecialityDetail = null;
    }

    updateSpecialityDetail(specialityDetail: SpecialityDetail, medicalFacilityDetail: MedicalFacilityDetail) {
        this.selectedSpecialityDetail = specialityDetail;
        this.showUpdateSpecialityDetailModal();
    }

    deleteSpecialityDetail(specialityDetail: SpecialityDetail, medicalFacilityDetail: MedicalFacilityDetail) {
        let result: Observable<SpecialityDetail>;
        // result = this._medicalFacilityStore.deleteSpecialityDetail(specialityDetail, this.medicalFacilityDetail);
        result.subscribe(
            (response: SpecialityDetail) => {
                let notification = new Notification({
                    'title': 'Speciality Detail Deleted Successfully!',
                    'type': 'SUCCESS',
                    'createdAt': moment()
                });
                this._notificationsStore.addNotification(notification);
            },
            (error) => {
                let errString = 'Unable to delete Speciality Detail.';
                let notification = new Notification({
                    'title': ErrorMessageFormatter.getErrorMessages(error, errString),
                    'type': 'ERROR',
                    'createdAt': moment()
                });
                this._notificationsStore.addNotification(notification);
                this._notificationsService.error('Oh No!', 'Unable to delete Speciality Detail.');
            },
            () => {

            });
    }
}