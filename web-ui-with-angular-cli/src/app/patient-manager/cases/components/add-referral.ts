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
import { ConsentStore } from '../../cases/stores/consent-store';
import { Consent } from '../../cases/models/consent';
import { Patient } from '../../patients/models/patient';

@Component({
    selector: 'add-referral',
    templateUrl: './add-referral.html'
})

export class AddReferralComponent implements OnInit {
    referralForm: FormGroup;
    referralFormControls;
    referralOutOfMidasForm: FormGroup;
    referralOutOfMidasFormControls;
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
    consent: Consent[];
    patientsWithoutCase: Patient[];
    selectedLocation: LocationDetails;
    visitDialogVisible: boolean = false;

    constructor(
        private fb: FormBuilder,
        private _fb: FormBuilder,
        private _router: Router,
        public _route: ActivatedRoute,
        private _notificationsStore: NotificationsStore,
        private _progressBarService: ProgressBarService,
        private _sessionStore: SessionStore,
        private _referralStore: ReferralStore,
        private _specialityStore: SpecialityStore,
        private _doctorsStore: DoctorsStore,
        private _locationStore: LocationsStore,
        private _roomsStore: RoomsStore,
        private _consentStore: ConsentStore,
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
        this.referralOutOfMidasForm = this._fb.group(this.initOutsideMidasModel());
        this.referralOutOfMidasFormControls = this.referralOutOfMidasForm.controls;
    }

    // loadReferrals() {
    //     this._progressBarService.show();
    //     this._referralStore.getReferralsByCaseId(this.caseId)
    //         .subscribe((referrals: Referral[]) => {
    //             this.referrals = referrals;
    //         },
    //         (error) => {
    //             this._progressBarService.hide();
    //         },
    //         () => {
    //             this._progressBarService.hide();
    //         });
    // }

    ngOnInit() {
        this.loadSpecialities();
        this.loadTests();
        // this.loadReferrals();
        this.loadMedicalFacility();
    }

    initOutsideMidasModel() {
        const model = {
            // outsideMidas: this._fb.group({
                firstName: ['', Validators.required],
                lastName: ['', Validators.required],
                email: ['', [Validators.required, AppValidators.emailValidator]],
                cellPhone: ['', [Validators.required, AppValidators.mobileNoValidator]],
                referralOutsideMidasNote: ['', Validators.required]
            // })
        };
        return model;
    }

    onSelectedReferralTypeChange(searchMode: any) {
        // const outsideMidasCtrl = this.referralOutOfMidasFormControls;
        if (this.searchMode != '4') {
            Object.keys(this.referralOutOfMidasFormControls).forEach(key => {
                this.referralOutOfMidasFormControls[key].setValidators(null);
                this.referralOutOfMidasFormControls[key].updateValueAndValidity();
            });
            // this.doctorFlag = true;
        } else {
            Object.keys(this.referralOutOfMidasFormControls).forEach(key => {
                this.referralOutOfMidasFormControls[key].setValidators(this.initOutsideMidasModel()[key][1]);
                this.referralOutOfMidasFormControls[key].updateValueAndValidity();
            });
            // this.doctorFlag = false;
        }
    }

    loadMedicalFacility() {
        this._progressBarService.show();
        this._locationStore.getAllLocationAndTheirCompany()
            .subscribe((locations) => {
                // this.locations = locations;
                let referredToCompanyIds: number[] = _.map(this.referrals, (currentReferral: Referral) => {
                    return currentReferral.referredToCompanyId;
                });
                let locationDetails = _.filter(locations, (currentLocationDetail: LocationDetails) => {
                    return _.indexOf(referredToCompanyIds, currentLocationDetail.company.id) < 0 ? true : false;
                });
                this.locations = locationDetails;
            },
            (error) => {
                this._router.navigate(['../']);
                this._progressBarService.hide();
            },
            () => {
                this._progressBarService.hide();
            });
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
    getCurrentDoctorCompanyName(currentDoctor: Doctor) {
        if (currentDoctor.doctorLocationSchedules.length > 0) {
            return currentDoctor.doctorLocationSchedules[0].location.company.name;
        }
    }
    getCurrentDoctorLocationName(currentDoctor: Doctor) {
        if (currentDoctor.doctorLocationSchedules.length > 0) {
            return currentDoctor.doctorLocationSchedules[0].location.location.name;
        }
    }

    save() {
        // this.isSaveProgress = true;
        // this._progressBarService.show();
        // let referralFormValues = this.referralForm.value;
        // let referralDetail;
        //     referralDetail = new Referral({
        //         caseId: this.caseId,
        //         referringCompanyId: this._sessionStore.session.currentCompany.id,
        //         referringLocationId: null,
        //         referringUserId: this._sessionStore.session.user.id,
        //         referredByEmail: this._sessionStore.session.user.userName,
        //         referredToCompanyId: this.selectedDoctor ? this.selectedDoctor.doctorLocationSchedules[0].location.company.id : this.selectedLocation ? this.selectedLocation.company.id : this.selectedRoom ? this.selectedRoom.location.company.id : null,
        //         referredToLocationId: this.selectedDoctor ? this.selectedDoctor.doctorLocationSchedules[0].location.location.id : this.selectedLocation ? this.selectedLocation.location.id : this.selectedRoom ? this.selectedRoom.location.location.id : null,
        //         referredToDoctorId: this.selectedDoctor ? this.selectedDoctor.id : null,
        //         referredToRoomId: this.selectedRoom ? this.selectedRoom.id : null,
        //         referredToSpecialtyId: this.selectedDoctor ? parseInt(referralFormValues.speciality) : null,
        //         referredToRoomTestId: this.selectedRoom ? parseInt(referralFormValues.tests) : null,
        //         note: referralFormValues.note,
        //         referredToEmail: this.selectedDoctor ? this.selectedDoctor.user.userName : null,
        //         firstName: null,
        //         lastName: null,
        //         cellPhone: null,
        //         referralAccepted: 0
        //     });

        // let result = this._referralStore.addReferral(referralDetail);
        // result.subscribe(
        //     (response) => {
        //         let notification = new Notification({
        //             'title': 'Referral added successfully!',
        //             'type': 'SUCCESS',
        //             'createdAt': moment()
        //         });
        //         this._notificationsStore.addNotification(notification);
        //         this.visitDialogVisible = true;
        //         this._router.navigate(['../'], { relativeTo: this._route });
        //     },
        //     (error) => {
        //         let errString = 'Unable to add Referral.';
        //         let notification = new Notification({
        //             'messages': ErrorMessageFormatter.getErrorMessages(error, errString),
        //             'type': 'ERROR',
        //             'createdAt': moment()
        //         });
        //         this.isSaveProgress = false;
        //         this._notificationsStore.addNotification(notification);
        //         this._notificationsService.error('Oh No!', ErrorMessageFormatter.getErrorMessages(error, errString));
        //         this._progressBarService.hide();
        //     },
        //     () => {
        //         this.isSaveProgress = false;
        //         this._progressBarService.hide();
        //     });
    }
    saveOutOfMidasReferral() {
        // this.isSaveProgress = true;
        // this._progressBarService.show();
        // let referralOutOfMidasFormValues = this.referralOutOfMidasForm.value;
        // let referralDetail;
        //     referralDetail = new Referral({
        //         caseId: this.caseId,
        //         referringCompanyId: this._sessionStore.session.currentCompany.id,
        //         referringLocationId: null,
        //         referringUserId: this._sessionStore.session.user.id,
        //         referredByEmail: this._sessionStore.session.user.userName,
        //         referredToCompanyId: null,
        //         referredToLocationId: null,
        //         referredToDoctorId: null,
        //         referredToRoomId: null,
        //         referredToSpecialtyId: null,
        //         referredToRoomTestId: null,
        //         note: referralOutOfMidasFormValues.referralOutsideMidasNote,
        //         referredToEmail: referralOutOfMidasFormValues.email,
        //         firstName: referralOutOfMidasFormValues.firstName,
        //         lastName: referralOutOfMidasFormValues.lastName,
        //         cellPhone: referralOutOfMidasFormValues.cellPhone,
        //         referralAccepted: 0
        //     });

        // let result = this._referralStore.addReferral(referralDetail);
        // result.subscribe(
        //     (response) => {
        //         let notification = new Notification({
        //             'title': 'Referral added successfully!',
        //             'type': 'SUCCESS',
        //             'createdAt': moment()
        //         });
        //         this._notificationsStore.addNotification(notification);
        //         this.visitDialogVisible = true;
        //         this._router.navigate(['../'], { relativeTo: this._route });
        //     },
        //     (error) => {
        //         let errString = 'Unable to add Referral.';
        //         let notification = new Notification({
        //             'messages': ErrorMessageFormatter.getErrorMessages(error, errString),
        //             'type': 'ERROR',
        //             'createdAt': moment()
        //         });
        //         this.isSaveProgress = false;
        //         this._notificationsStore.addNotification(notification);
        //         this._notificationsService.error('Oh No!', ErrorMessageFormatter.getErrorMessages(error, errString));
        //         this._progressBarService.hide();
        //     },
        //     () => {
        //         this.isSaveProgress = false;
        //         this._progressBarService.hide();
        //     });
    }

}
