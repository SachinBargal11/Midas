import { Component, OnInit, ElementRef } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import * as _ from 'underscore';
import { NotificationsService } from 'angular2-notifications';
import { SelectItem } from 'primeng/primeng';
import { ProgressBarService } from '../../../commons/services/progress-bar-service';
import { ErrorMessageFormatter } from '../../../commons/utils/ErrorMessageFormatter';
import { NotificationsStore } from '../../../commons/stores/notifications-store';
import { Notification } from '../../../commons/models/notification';
import { SessionStore } from '../../../commons/stores/session-store';
import { AppValidators } from '../../../commons/utils/AppValidators';
import { Doctor } from '../../../medical-provider/users/models/doctor';
import { DoctorsStore } from '../../../medical-provider/users/stores/doctors-store';
import { LocationDetails } from '../../../medical-provider/locations/models/location-details';
import { LocationsStore } from '../../../medical-provider/locations/stores/locations-store';
import { Referral } from '../../cases/models/referral';
import { ReferralStore } from '../../cases/stores/referral-store';
import { Room } from '../../../medical-provider/rooms/models/room';
import { Tests } from '../../../medical-provider/rooms/models/tests';
import { RoomsStore } from '../../../medical-provider/rooms/stores/rooms-store';
import { SpecialityStore } from '../../../account-setup/stores/speciality-store';
import { Speciality } from '../../../account-setup/models/speciality';
import { PatientsStore } from '../../patients/stores/patients-store';
import { Patient } from '../../patients/models/patient';

@Component({
    selector: 'add-referral',
    templateUrl: './add-referral.html'
})

export class AddReferralComponent implements OnInit {
    referralForm: FormGroup;
    referralFormControls;
    searchMode: string = '1';
    tests: Tests[];
    rooms: Room[];
    selectedRoom: Room;
    locations: LocationDetails[];
    doctors: Doctor[];
    selectedDoctor: Doctor;
    specialities: Speciality[];
    isSaveProgress = false;
    caseId: number;
    patient: Patient;
    patientName: string;
    patients: Patient[];
    patientsWithoutCase: Patient[];

    constructor(
        private fb: FormBuilder,
        private _router: Router,
        public _route: ActivatedRoute,
        private _notificationsStore: NotificationsStore,
        private _progressBarService: ProgressBarService,
        private _sessionStore: SessionStore,
        private _referralStore: ReferralStore,
        private _specialityStore: SpecialityStore,
        private _doctorsStore: DoctorsStore,
        private _roomsStore: RoomsStore,
        private _notificationsService: NotificationsService,
        private _elRef: ElementRef
    ) {
        this._route.parent.parent.params.subscribe((routeParams: any) => {
            this.caseId = parseInt(routeParams.caseId, 10);
        });
        this.referralForm = this.fb.group({
            speciality: [''],
            tests: [''],
            note: ['', Validators.required]
        });

        this.referralFormControls = this.referralForm.controls;
    }

    ngOnInit() {
        this.loadSpecialities();
        this.loadTests();
    }
    loadSpecialities() {
        this._progressBarService.show();
        this._specialityStore.getSpecialities()
            .subscribe((specialties) => {
                this.specialities = specialties;
            },
            (error) => {
                this._router.navigate(['../']);
                this._progressBarService.hide();
            },
            () => {
                this._progressBarService.hide();
            });
    }
    loadTests() {
        this._progressBarService.show();
        this._roomsStore.getTests()
            .subscribe((tests) => {
                this.tests = tests;
            },
            (error) => {
                this._router.navigate(['../']);
                this._progressBarService.hide();
            },
            () => {
                this._progressBarService.hide();
            });
    }
    selectSpeciality(event) {
        let currentSpecialityId = parseInt(event.target.value);
        this.loadDoctorsForSpeciality(currentSpecialityId);
    }
    loadDoctorsForSpeciality(specialityId) {
        this._progressBarService.show();
        this._doctorsStore.getDoctorsBySpecialityInAllApp(specialityId)
            .subscribe((doctors) => {
                this.doctors = doctors;
            },
            (error) => {
                this._progressBarService.hide();
            },
            () => {
                this._progressBarService.hide();
            });
    }
    selectTest(event) {
        let currentTestId = parseInt(event.target.value);
        this.loadRoomsForTest(currentTestId);
    }
    loadRoomsForTest(testId) {
        this._progressBarService.show();
        this._roomsStore.getRoomsByTestInAllApp(testId)
            .subscribe((rooms: Room[]) => {
                this.rooms = rooms;
            },
            (error) => {
                this._progressBarService.hide();
            },
            () => {
                this._progressBarService.hide();
            });
    }

    save() {
        this.isSaveProgress = true;
        let referralFormValues = this.referralForm.value;
        // let result;
        let referralDetail = new Referral({
            caseId: this.caseId,
            referringCompanyId: this._sessionStore.session.currentCompany.id,
            referringLocationId: null,
            referringDoctorId: this._sessionStore.session.user.id,
            referredToCompanyId: null,
            referredToLocationId: null,
            referredToDoctorId: this.selectedDoctor ? this.selectedDoctor.id : null,
            referredToRoomId: this.selectedRoom ? this.selectedRoom.id : null,
            note: referralFormValues.note,
            referredByEmail: this._sessionStore.session.user.userName,
            referredToEmail: this.selectedDoctor ? this.selectedDoctor.user.userName : null,
            referralAccepted: 0
        });

        this._progressBarService.show();
        let result = this._referralStore.addReferral(referralDetail);
        result.subscribe(
            (response) => {
                let notification = new Notification({
                    'title': 'Referral added successfully!',
                    'type': 'SUCCESS',
                    'createdAt': moment()
                });
                this._notificationsStore.addNotification(notification);
                this._router.navigate(['../'], { relativeTo: this._route });
            },
            (error) => {
                let errString = 'Unable to add Referral.';
                let notification = new Notification({
                    'messages': ErrorMessageFormatter.getErrorMessages(error, errString),
                    'type': 'ERROR',
                    'createdAt': moment()
                });
                this.isSaveProgress = false;
                this._notificationsStore.addNotification(notification);
                this._notificationsService.error('Oh No!', ErrorMessageFormatter.getErrorMessages(error, errString));
                this._progressBarService.hide();
            },
            () => {
                this.isSaveProgress = false;
                this._progressBarService.hide();
            });

    }

}
