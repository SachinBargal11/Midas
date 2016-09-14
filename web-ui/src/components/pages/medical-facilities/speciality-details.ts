import {Record, List} from 'immutable';
import {Observable} from 'rxjs/Observable';
import moment from 'moment';
import {Component, OnInit, ElementRef, ViewChild, Output, EventEmitter} from '@angular/core';
import {ROUTER_DIRECTIVES, Router, ActivatedRoute} from '@angular/router';
import { ModalDirective } from 'ng2-bootstrap/ng2-bootstrap';
import {SimpleNotificationsComponent, NotificationsService} from 'angular2-notifications';
import {MedicalFacilityService} from '../../../services/medical-facility-service';
import {MedicalFacilityStore} from '../../../stores/medical-facilities-store';
import {SessionStore} from '../../../stores/session-store';
import {SpecialityDetail} from '../../../models/speciality-details';
import {MedicalFacilityDetail} from '../../../models/medical-facility-details';
import {MapToJSPipe} from '../../../pipes/map-to-js';
import {SpecialityDetailFormComponent} from './speciality-detail-form';
import {AddSpecialityDetailComponent} from './add-speciality-details';

import {NotificationsStore} from '../../../stores/notifications-store';
import {Notification} from '../../../models/notification';


@Component({
    selector: 'speciality-details',
    templateUrl: 'templates/pages/medical-facilities/speciality-details.html',
    directives: [ROUTER_DIRECTIVES, ModalDirective],
    pipes: [MapToJSPipe]
})

export class SpecialityDetailsComponent {
    medicalFacilityDetail: MedicalFacilityDetail;
    @ViewChild('childModal') public childModal: ModalDirective;
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
        private _medicalFacilityService: MedicalFacilityService,
        private _medicalFacilityStore: MedicalFacilityStore,
        private _notificationsStore: NotificationsStore,
        private _notificationsService: NotificationsService
    ) {
        this._route.params.subscribe((routeParams: any) => {
            let medicalFacilityId: number = parseInt(routeParams.id);
            let result = this._medicalFacilityStore.fetchMedicalFacilityById(medicalFacilityId);
            result.subscribe(
                (medicalFacilityDetail: MedicalFacilityDetail) => {
                    this.medicalFacilityDetail = medicalFacilityDetail;
                },
                (error) => {
                    this._router.navigate(['/medical-facilities']);
                },
                () => {
                });
        });
    }

    public showChildModal(): void {
        this.childModal.show();
    }

    public hideChildModal(): void {
        this.childModal.hide();
    }

    deleteSpecialityDetail(specialityDetail: SpecialityDetail, medicalFacilityDetail: MedicalFacilityDetail) {
        let result: Observable<SpecialityDetail>;
        result = this._medicalFacilityStore.deleteSpecialityDetail(specialityDetail, this.medicalFacilityDetail);
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
                let notification = new Notification({
                    'title': 'Unable to delete Speciality Detail.',
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