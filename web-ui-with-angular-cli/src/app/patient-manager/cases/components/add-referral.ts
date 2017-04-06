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
import { AddConsentStore } from '../../cases/stores/add-consent-form-store';
import { AddConsent } from '../../cases/models/add-consent-form';
import { Patient } from '../../patients/models/patient';

@Component({
    selector: 'add-referral',
    templateUrl: './add-referral.html'
})

export class AddReferralComponent implements OnInit {
    referralForm: FormGroup;
    referralFormControls;
    searchMode: string = '1';
    referrals: Referral[];
    tests: Tests[];
    rooms: Room[];
    selectedRoom: Room;
    locations: LocationDetails[];
    doctor: Doctor;
    doctors: Doctor[];
    selectedDoctor: Doctor;
    specialities: Speciality[];
    isSaveProgress = false;
    caseId: number;
    patient: Patient;
    patientName: string;
    patients: Patient[];
    consent: AddConsent[];
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
        private _consentStore: AddConsentStore,
        private _notificationsService: NotificationsService,
        private _elRef: ElementRef
    ) {
        this._route.parent.parent.params.subscribe((routeParams: any) => {
            this.caseId = parseInt(routeParams.caseId, 10);
            this._progressBarService.show();
            this._consentStore.getDocumentsForCaseId(this.caseId)
                .subscribe((consent: AddConsent[]) => {
                    this.consent = consent;
                    this._doctorsStore.fetchDoctorById(consent[0].doctorId)
                        .subscribe((doctor: Doctor) => this.doctor = doctor);
                },
                (error) => {
                    this._progressBarService.hide();
                },
                () => {
                    this._progressBarService.hide();
                });
        });
        this.referralForm = this.fb.group({
            speciality: [''],
            tests: [''],
            note: ['', Validators.required]
        });

        this.referralFormControls = this.referralForm.controls;
    }
    loadReferrals() {
        this._progressBarService.show();
        this._referralStore.getReferralsByCaseId(this.caseId)
            .subscribe((referrals: Referral[]) => {
                this.referrals = referrals;
            },
            (error) => {
                this._progressBarService.hide();
            },
            () => {
                this._progressBarService.hide();
            });
    }

    ngOnInit() {
        this.loadSpecialities();
        this.loadTests();
        this.loadReferrals();
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
                // this.doctors = doctors;
                let referredToDoctorIds: number[] = _.map(this.referrals, (currentReferral: Referral) => {
                    return currentReferral.referredToDoctorId;
                });
                let doctorDetails = _.filter(doctors, (currentDoctor: Doctor) => {
                    return _.indexOf(referredToDoctorIds, currentDoctor.id) < 0 ? true : false;
                });
                this.doctors = doctorDetails;
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
                // this.rooms = rooms;
                let referredToRoomIds: number[] = _.map(this.referrals, (currentReferral: Referral) => {
                    return currentReferral.referredToRoomId;
                });
                let roomDetails = _.filter(rooms, (currentRoom: Room) => {
                    return _.indexOf(referredToRoomIds, currentRoom.id) < 0 ? true : false;
                });
                this.rooms = roomDetails;
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
        this._progressBarService.show();
        let referralFormValues = this.referralForm.value;
        let referralDetail;
        if (this.consent) {
            referralDetail = new Referral({
                caseId: this.caseId,
                referringCompanyId: this._sessionStore.session.currentCompany.id,
                referringLocationId: null,
                referringDoctorId: this.consent[0].doctorId,
                referredToCompanyId: null,
                referredToLocationId: null,
                referredToDoctorId: this.selectedDoctor ? this.selectedDoctor.id : null,
                referredToRoomId: this.selectedRoom ? this.selectedRoom.id : null,
                note: referralFormValues.note,
                // referredByEmail: this._sessionStore.session.user.userName,
                referredByEmail: this.doctor.user.userName,
                referredToEmail: this.selectedDoctor ? this.selectedDoctor.user.userName : null,
                referralAccepted: 0
            });

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
        } else {
            let notification = new Notification({
                'messages': 'Unable to add Referral, You dont have consent',
                'type': 'ERROR',
                'createdAt': moment()
            });
            this.isSaveProgress = false;
            this._progressBarService.hide();
            this._notificationsStore.addNotification(notification);
            this._notificationsService.error('Oh No!', 'Unable to add Referral, You dont have consent');
        }
    }

}
