import {Component, OnInit, ElementRef} from '@angular/core';
import {FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES, Validators, FormControl, FormGroup, FormBuilder, AbstractControl} from '@angular/forms';
import {ROUTER_DIRECTIVES, Router, ActivatedRoute} from '@angular/router';
import {AppValidators} from '../../../utils/AppValidators';
import {LoaderComponent} from '../../elements/loader';
import {SpecialityStore} from '../../../stores/speciality-store';
import {Speciality} from '../../../models/speciality';
import $ from 'jquery';
import {SessionStore} from '../../../stores/session-store';
import {NotificationsStore} from '../../../stores/notifications-store';
import {Notification} from '../../../models/notification';
import moment from 'moment';
import {Calendar, InputMask, AutoComplete, SelectItem} from 'primeng/primeng';
import {HTTP_PROVIDERS}    from '@angular/http';
import {LimitPipe} from '../../../pipes/limit-array-pipe';

@Component({
    selector: 'update-speciality',
    templateUrl: 'templates/pages/speciality/update-speciality.html',
    directives: [FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES, ROUTER_DIRECTIVES, LoaderComponent, Calendar, InputMask, AutoComplete],
    providers: [HTTP_PROVIDERS, FormBuilder],
    pipes: [LimitPipe]
})

export class UpdateSpecialityComponent implements OnInit {
    specialty = new Speciality({});
    options = {
        timeOut: 3000,
        showProgressBar: true,
        pauseOnHover: false,
        clickToClose: false,
        maxLength: 10
    };
    specialityform: FormGroup;
    specialityformControls;
    isSaveDoctorProgress = false;

    constructor(
        private _specialityStore: SpecialityStore,
        private fb: FormBuilder,
        private _router: Router,
        private _route: ActivatedRoute,
        private _notificationsStore: NotificationsStore,
        private _sessionStore: SessionStore,
        private _elRef: ElementRef
    ) {
        this._route.params.subscribe((routeParams: any) => {
            let specialityId: number = parseInt(routeParams.id);
            let result = this._specialityStore.fetchSpecialityById(specialityId);
            result.subscribe(
                (specialty: Speciality) => {
                   this.specialty = specialty;
                },
                (error) => {
                    this._router.navigate(['/doctors']);
                },
                () => {
                });
        });

        this.specialityform = this.fb.group({
                name: ['', Validators.required],
                specialityCode: ['', Validators.required]
        });

        this.specialityformControls = this.specialityform.controls;
    }

    ngOnInit() {
    }


    updateSpeciality() {
        let specialityformValues = this.specialityform.value;
        let specialty = new Speciality({
            specialty: {
                id: this.specialty.specialty.id,
                name: specialityformValues.name,
                specialityCode: specialityformValues.specialityCode
            }
        });
        this.isSaveDoctorProgress = true;
        let result;

        result = this._specialityStore.updateSpeciality(specialty);
        result.subscribe(
            (response) => {
                let notification = new Notification({
                    'title': 'Speciality updated successfully!',
                    'type': 'SUCCESS',
                    'createdAt': moment()
                });
                this._notificationsStore.addNotification(notification);
                this._router.navigate(['/specialities']);
            },
            (error) => {
                let notification = new Notification({
                    'title': 'Unable to update Speciality.',
                    'type': 'ERROR',
                    'createdAt': moment()
                });
                this._notificationsStore.addNotification(notification);
            },
            () => {
                this.isSaveDoctorProgress = false;
            });

    }

}
