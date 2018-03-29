import { PendingReferralService } from '../services/pending-referrals-service';
import { ScheduledEvent } from '../../../commons/models/scheduled-event';
import { LocationDetails } from '../../../medical-provider/locations/models/location-details';
import { PatientVisit } from '../../patient-visit/models/patient-visit';
import { AvailableSingleSlot } from '../models/available-single-slot';
import { AvailableSlot } from '../models/available-slots';
import { AvailableSlotsStore } from '../stores/available-slots-stores';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LazyLoadEvent, SelectItem } from 'primeng/primeng';
import { NotificationsStore } from '../../../commons/stores/notifications-store';
import { SessionStore } from '../../../commons/stores/session-store';
import { Notification } from '../../../commons/models/notification';
import * as moment from 'moment';
import * as _ from 'underscore';
import { Carousel } from 'primeng/primeng';
import { ProgressBarService } from '../../../commons/services/progress-bar-service';
import { NotificationsService } from 'angular2-notifications';
import { ErrorMessageFormatter } from '../../../commons/utils/ErrorMessageFormatter';
import { PendingReferralStore } from '../stores/pending-referrals-stores';
import { PrefferedMedicalProvider } from '../models/preferred-medical-provider';
import { PendingReferralList } from '../models/pending-referral-list';
import { ConfirmDialogModule, ConfirmationService } from 'primeng/primeng';
import { environment } from '../../../../environments/environment';
import { Doctor } from '../../../medical-provider/users/models/doctor';
import { Room } from '../../../medical-provider/rooms/models/room';
import { RoomsStore } from '../../../medical-provider/rooms/stores/rooms-store';
import { UserSettingStore } from '../../../commons/stores/user-setting-store';
import { UserSetting } from '../../../commons/models/user-setting';
import { LocationsStore } from '../../../medical-provider/locations/stores/locations-store';
import { PatientVisitsStore } from '../../patient-visit/stores/patient-visit-store';
import { PendingReferral } from '../models/pending-referral';
import { Procedure } from '../../../commons/models/procedure';
import { UnscheduledVisit } from '../../patient-visit/models/unscheduled-visit';
import { DoctorsStore } from '../../../medical-provider/users/stores/doctors-store';

@Component({
    selector: 'pending-referrals',
    templateUrl: './pending-referrals.html'
})

export class PendingReferralsComponent implements OnInit {
    private _url: string = `${environment.SERVICE_BASE_URL}`;
    companyId: number = this.sessionStore.session.currentCompany.id;
    addMedicalDialogVisible: boolean = false;
    selectedCancel: number;
    currentCancel: string;
    userSetting: UserSetting;
    preferredMedical: PrefferedMedicalProvider[];
    medicalProvider: PrefferedMedicalProvider[];
    pendingReferralList: PendingReferralList[];
    medicalProviderDoctor: {
        preferredMedical: PrefferedMedicalProvider,
        doctor: Doctor,
    }[] = [];
    medicalProviderRoom: {
        preferredMedical: PrefferedMedicalProvider,
        room: Room
    }[] = [];

    locations: LocationDetails[] = [];
    selectedLocationId: number = 0;
    selectedMode = 0;
    selectedDoctorId: number = 0;
    selectedRoomId: number = 0;
    selectedOption: number = 0;
    selectedMedicalProviderId: number = 0;
    availableSlotsDialogVisible: boolean = false;
    availableSlots: AvailableSlot[] = [];
    selectedReferrals: PendingReferralList;
    isDeleteProgress: boolean = false;
    specialityId = 0;
    roomTestId = 0;
    specialityIdArray = [];
    isAvailableSlotsSavingInProgress: boolean = false;

    externalReferralDialogVisible: boolean = false;
    routeFrom = 'pendingReferral';
    visitInfo:string;
    unscheduledDialogVisible = false;
    unscheduledVisitId: number;
    unscheduledVisit: UnscheduledVisit;
    compnayDoctorList : Doctor[] = [];
    compnayRoomList : Room[] = [];
    compnayRoomListDisplay : Room[] = [];
    compnayDoctorId = '';
    compnayRoomId = '';

    showDoctorList = false;
    showRoomList = false;

    constructor(
        private _router: Router,
        private _notificationsStore: NotificationsStore,
        public sessionStore: SessionStore,
        private _pendingReferralStore: PendingReferralStore,
        private _pendingReferralService: PendingReferralService,
        private _progressBarService: ProgressBarService,
        private _notificationsService: NotificationsService,
        private confirmationService: ConfirmationService,
        private _availableSlotsStore: AvailableSlotsStore,
        private _userSettingStore: UserSettingStore,
        public locationsStore: LocationsStore,
        private _patientVisitsStore: PatientVisitsStore,
        private _doctorsStore : DoctorsStore,
        private _roomsStore : RoomsStore
    ) {
        this.sessionStore.userCompanyChangeEvent.subscribe(() => {
            this.loadPendingReferralsForCompany(this.companyId);
        });

    }

    ngOnInit() {
        this.loadPendingReferralsForCompany(this.companyId);
    }

    loadPendingReferralsForCompany(companyId: number) {
        this._progressBarService.show();
        this._pendingReferralStore.getPendingReferralByCompanyId(this.companyId)
            .subscribe(pendingReferralList => {
                this.pendingReferralList = pendingReferralList.reverse();
            },
            (error) => {
                this._progressBarService.hide();
            },
            () => {
                this._progressBarService.hide();
            });

    }

    getMedicalProviderDoctorRoom(event) {
        let pendingReferralListRow: PendingReferralList = event.data;
        this.specialityId = pendingReferralListRow.forSpecialtyId ? pendingReferralListRow.forSpecialtyId : 0;
        this.roomTestId = pendingReferralListRow.forRoomTestId ? pendingReferralListRow.forRoomTestId : 0;
        this.loadPreferredCompanyDoctorsAndRoomByCompanyId(this.companyId, this.specialityId, this.roomTestId)
        if(this.specialityId != 0)
        {
            this.showDoctorList = true;
            this.showRoomList = false;
            this.loadDoctorsByCompanyIdAndSpeciality(this.specialityId);
        }
        else if(this.roomTestId != 0)
        {
            this.showDoctorList = false;
            this.showRoomList = true;
            this.loadRoomsByTestSpeciality(this.roomTestId);
        }

    }

    loadPreferredCompanyDoctorsAndRoomByCompanyId(companyId: number, specialityId: number, roomTestId: number) {
        // this._progressBarService.show();
        this._pendingReferralStore.getPreferredCompanyDoctorsAndRoomByCompanyId(companyId, specialityId, roomTestId)
            .subscribe(preferredMedical => {
                let matchingMedicalProvider: PrefferedMedicalProvider[] = _.filter(preferredMedical, (currentPreferredMedical: PrefferedMedicalProvider) => {
                    // return currentPreferredMedical.registrationComplete == false;
                    return currentPreferredMedical.companyStatusType == 1 || currentPreferredMedical.companyStatusType == 2;
                });

                let mappedMedicalProviderDoctor: {
                    preferredMedical: PrefferedMedicalProvider,
                    doctor: Doctor
                }[] = [];
                let mappedMedicalProviderRoom: {
                    preferredMedical: PrefferedMedicalProvider,
                    room: Room
                }[] = [];
                _.forEach(preferredMedical, (currentPreferredMedicalProvider: PrefferedMedicalProvider) => {
                    _.forEach(currentPreferredMedicalProvider.doctor, (currentDoctor: Doctor) => {
                        mappedMedicalProviderDoctor.push({
                            preferredMedical: currentPreferredMedicalProvider,
                            doctor: currentDoctor
                        });
                    });
                    _.forEach(currentPreferredMedicalProvider.room, (currentRoom: Room) => {
                        mappedMedicalProviderRoom.push({
                            preferredMedical: currentPreferredMedicalProvider,
                            room: currentRoom
                        });
                    });
                });
                this.medicalProviderDoctor = mappedMedicalProviderDoctor;
                this.medicalProviderRoom = mappedMedicalProviderRoom;
                //this.medicalProvider = matchingMedicalProvider;

            },
            (error) => {
                this.medicalProviderDoctor = [];
                this.medicalProviderRoom = [];
                // this._progressBarService.hide();
            },
            () => {
                // this._progressBarService.hide();
            });
        this._pendingReferralStore.getPreferredCompanyByCompanyId(companyId)       
        .subscribe(preferredMedical => {            
                let matchingMedicalProvider: PrefferedMedicalProvider[] = _.filter(preferredMedical, (currentPreferredMedical: PrefferedMedicalProvider) => {            
                    return currentPreferredMedical.companyStatusType == 1 || currentPreferredMedical.companyStatusType == 2;
                });

                this.medicalProvider = matchingMedicalProvider;
            },
            (error) => {                
                this._progressBarService.hide();
            },
            () => {
                this._progressBarService.hide();
            });
    }

    loadDoctorsByCompanyIdAndSpeciality(specialityId: number) {
        this._doctorsStore.getDoctorsByCompanyIdAndSpeciality(specialityId)
            .subscribe(compnayDoctors => {
                let defaultLabel: any[] = [{
                    label: '-Select Doctor-',
                    value: ''
                }]
                let doctorMaster = _.map(compnayDoctors, (currentDoctorMaster: Doctor) => {
                    return {
                        label: `${currentDoctorMaster.user.displayName}`,
                        value: currentDoctorMaster.id
                    };
                })
                this.compnayDoctorList = _.union(defaultLabel, doctorMaster);
            },
            (error) => {
                this.compnayDoctorList = [];
            },
            () => {
               
            });
    }

    loadDoctorsByCompanyIdAndTestSpeciality(roomTestId: number) {
        this._doctorsStore.getDoctorsByCompanyIdAndTestSpeciality(roomTestId)
        .subscribe(compnayDoctors => {
            let defaultLabel: any[] = [{
                label: '-Select Doctor-',
                value: ''
            }]
            let doctorMaster = _.map(compnayDoctors, (currentDoctorMaster: Doctor) => {
                return {
                    label: `${currentDoctorMaster.user.displayName}`,
                    value: currentDoctorMaster.id
                };
            })
            this.compnayDoctorList = _.union(defaultLabel, doctorMaster);
        },
            (error) => {
                this.compnayDoctorList = [];
            },
            () => {
               
            });
    }

    loadRoomsByTestSpeciality(roomTestId: number) {
        this._roomsStore.getByRoomInAllAppCompany(roomTestId)
        .subscribe(compnayRooms => {
            this.compnayRoomList = compnayRooms;
            let defaultLabel: any[] = [{
                label: '-Select Room-',
                value: ''
            }]
            let roomMaster = _.map(compnayRooms, (currentRoomMaster: Room) => {
                return {
                    label: `${currentRoomMaster.name}`,
                    value: currentRoomMaster.id
                };
            })
            this.compnayRoomListDisplay = _.union(defaultLabel, roomMaster);
        },
            (error) => {
                this.compnayRoomList = [];
                this.compnayRoomListDisplay=[];
            },
            () => {
               
            });
    }

    selectOption(event) {
        this.selectedDoctorId = 0;
        this.selectedRoomId = 0;
        this.selectedOption = 0;
        this.selectedMedicalProviderId = 0;
        this.compnayRoomId = '';
        this.compnayDoctorId = '';

        if (event.target.selectedOptions[0].getAttribute('data-type') == '1') {
            this.selectedOption = 1;
            this.selectedDoctorId = event.target.value;
            this.selectedMedicalProviderId = parseInt(event.target.selectedOptions[0].getAttribute('data-id'));
            this.checkUserSettings(this.selectedMedicalProviderId, this.selectedDoctorId)
        } else if (event.target.selectedOptions[0].getAttribute('data-type') == '2') {
            this.selectedOption = 2;
            this.selectedRoomId = event.target.value;
            this.medicalProviderRoom.forEach(currentMedicalProvider => {
                if (currentMedicalProvider.room.id == this.selectedRoomId) {
                    this.selectedLocationId = currentMedicalProvider.room.location.location.id;
                }
            });
            // let startDate: moment.Moment = moment();
            // let endDate: moment.Moment = moment().add(7, 'days');
            // this._availableSlotsStore.getAvailableSlotsByLocationAndRoomId(this.selectedLocationId, this.selectedRoomId, startDate, endDate)
            //     .subscribe((availableSlots: AvailableSlot[]) => {
            //         this.availableSlots = availableSlots;
            //     },
            //     (error) => {
            //     },
            //     () => {
            //     });
            this.selectedMedicalProviderId = parseInt(event.target.selectedOptions[0].getAttribute('data-testId'));
        } else if (event.target.selectedOptions[0].getAttribute('data-type') == '3') {
            this.selectedOption = 3;
            this.selectedMedicalProviderId = parseInt(event.target.selectedOptions[0].getAttribute('data-medicalProviderId'));
        } else {
            this.selectedMode = 0;
        }
        if (this.selectedMedicalProviderId && this.selectedOption === 1) {
            this.locationsStore.getLocationsByCompanyDoctorId(this.selectedMedicalProviderId, this.selectedDoctorId)
                .subscribe((locations: LocationDetails[]) => {
                    this.locations = locations;
                },
                (error) => { });
        }
    }



    selectOptionInternalDoctor(event) {
     if(event.value != '' && event.value != undefined)
     {
            this.selectedMode = 0;
            this.selectedDoctorId = 0;
            this.selectedRoomId = 0;
            this.selectedOption = 1;
            this.selectedDoctorId = event.value;
            this.selectedMedicalProviderId = this.sessionStore.session.currentCompany.id;
            this.checkUserSettings(this.selectedMedicalProviderId, this.selectedDoctorId)
            if (this.selectedMedicalProviderId && this.selectedOption === 1) {
                this.locationsStore.getLocationsByCompanyDoctorId(this.selectedMedicalProviderId, this.selectedDoctorId)
                .subscribe((locations: LocationDetails[]) => {
                    this.locations = locations;
                },
                (error) => { 

                });
            }
      }
      else
      {
        this.selectedDoctorId = 0;
        this.selectedRoomId = 0;
        this.selectedOption = 0;
      }
    }

    selectOptionInternalRoom(event) {
        if(event.value != '' && event.value != undefined)
        {
            this.selectedMode = 0;
            this.selectedOption = 2;
            this.selectedRoomId = event.value;
            this.compnayRoomList.forEach(currentRoom => {
                if (currentRoom.id == this.selectedRoomId) {
                    this.selectedLocationId = currentRoom.location.location.id;
                }
            });
            this.selectedMedicalProviderId = this.sessionStore.session.currentCompany.id;
         }
         else
         {
           this.selectedDoctorId = 0;
           this.selectedRoomId = 0;
           this.selectedOption = 0;
         }
       }

    checkUserSettings(selectedMedicalProviderId, selectedDoctorId) {
        this._userSettingStore.getUserSettingByUserId(this.selectedDoctorId, this.selectedMedicalProviderId)
            .subscribe((userSetting) => {
                this.userSetting = userSetting;
            },
            (error) => { },
            () => {
            });

    }
    showDialog() {
        this.addMedicalDialogVisible = true;
        this.selectedCancel = 1;
    }
    showUnscheduleVisitDialog() {
        if (this.selectedReferrals) {
            this.externalReferralDialogVisible = true;
        } else {
            this._notificationsService.error('Please select pending referral');
        }
    }
    handleExternalReferralDialogHide() {
        // this.availableSlots = [];
        // this.locations = [];
    }
    closeDialog() {
        this.addMedicalDialogVisible = false;
        this.loadPreferredCompanyDoctorsAndRoomByCompanyId(this.companyId, this.specialityId, this.roomTestId);
    }
    closeExternalReferralDialog() {
        this.externalReferralDialogVisible = false;
    }
    refreshEvents(event) {
        this.loadPendingReferralsForCompany(this.companyId);
    }
    handleVisitDialogHide(){}

    assign() {
        let shouldAppointVisit: boolean = true;
        if (this.selectedReferrals === null) {
            this._notificationsService.alert('Oh No!', 'Please select referral!');
            shouldAppointVisit = false;
        } else if (this.selectedReferrals === null) {
            this._notificationsService.alert('Oh No!', 'Please select medical office!');
            shouldAppointVisit = false;
        } else if (this.selectedOption === 3) {
            shouldAppointVisit = false;
            this.saveReferralForMedicalOnlyProvider()
        } else if (this.selectedOption === 1) {
            this.checkUserSettings(this.selectedMedicalProviderId, this.selectedDoctorId)
            if (!this.userSetting.isCalendarPublic) {
                shouldAppointVisit = false;
                this.saveReferralForMedicalProviderDoctor();
            }
        }

        if (shouldAppointVisit) {
            this.confirmationService.confirm({
                message: 'Do you want to schedule an appointment?',
                header: 'Confirmation',
                icon: 'fa fa-question-circle',
                accept: () => {
                    if (this.selectedOption == 1) {
                        this.selectedLocationId = 0;
                    }
                    this.availableSlotsDialogVisible = true;
                    let startDate: moment.Moment = moment();
                    let endDate: moment.Moment = moment().add(7, 'days');
                    if (this.selectedOption === 2) {
                        this._availableSlotsStore.getAvailableSlotsByLocationAndRoomId(this.selectedLocationId, this.selectedRoomId, startDate, endDate)
                            .subscribe((availableSlots: AvailableSlot[]) => {
                                this.availableSlots = availableSlots;
                            },
                            (error) => {
                            },
                            () => {
                            });
                    }

                    if (this.selectedMedicalProviderId && this.selectedOption === 1) {

                        this.locationsStore.getLocationsByCompanyDoctorId(this.selectedMedicalProviderId, this.selectedDoctorId)
                            .subscribe((locations: LocationDetails[]) => {
                                this.locations = locations;
                            },
                            (error) => { });
                    }
                },
                reject: () => {
                    if (this.selectedOption === 1) {
                        this.saveReferralForMedicalProviderDoctor();
                    }
                    if (this.selectedOption === 2) {
                        this.saveReferralForMedicalProviderRoom();
                    }
                }
            });
        }

    }

    selectLocation(event) {
        this.selectedLocationId = event.target.value;
        let startDate: moment.Moment = moment();
        let endDate: moment.Moment = moment().add(7, 'days');
        if (this.selectedOption === 1) {
            this._availableSlotsStore.getAvailableSlotsByLocationAndDoctorId(this.selectedLocationId, this.selectedDoctorId, startDate, endDate)
                .subscribe((availableSlots: AvailableSlot[]) => {
                    this.availableSlots = availableSlots;
                },
                (error) => {
                },
                () => {
                });
        }

    }

    private _populatePatientVisitData(slotDetail: AvailableSingleSlot): PatientVisit {
        let selectedReffral: PendingReferralList = this.selectedReferrals;
        let patientVisit: PatientVisit = new PatientVisit({
            caseId: selectedReffral.caseId,
            patientId: selectedReffral.patientId,
            specialtyId: this.selectedOption === 1 ? selectedReffral.speciality.id : null,
            doctorId: this.selectedOption === 1 ? this.selectedDoctorId : null,
            roomId: this.selectedOption === 2 ? this.selectedRoomId : null,
            locationId: this.selectedLocationId,
            calendarEvent: new ScheduledEvent({
                eventStart: slotDetail.start,
                eventEnd: slotDetail.end,
                timezone: slotDetail.start.toDate().getTimezoneOffset(),
            })
        });
        return patientVisit;
    }

    setVisit(slotDetail: AvailableSingleSlot) {
        debugger;
        let pendingReferral: PendingReferral = null;
        if (this.selectedOption === 1) {
            pendingReferral = this._populateReferralForMedicalProviderDoctor();
        }
        if (this.selectedOption === 2) {
            pendingReferral = this._populateReferralForMedicalProviderRoom();
        }
        // if (!pendingReferral) {
        //     this._notificationsService.error('Two different speciality cannot be saved simultaneously');
        //     return;
        // }
        this.isAvailableSlotsSavingInProgress = true;

        let patientVisit: PatientVisit = this._populatePatientVisitData(slotDetail);
        let visitResult: Promise<PatientVisit> = this._patientVisitsStore.addPatientVisit(patientVisit).toPromise();

        let referralSaveResult: Promise<PendingReferral> = this._pendingReferralStore.savePendingReferral(pendingReferral).toPromise();

        Promise.all([visitResult, referralSaveResult])
            .then((results) => {
                debugger;
                let patientVisit: PatientVisit = results[0];
                let referral: PendingReferral = results[1];
                return this._pendingReferralService.associateReferralWithVisit(patientVisit, referral).toPromise();
            }).then((associationResponse: any) => {
                let notification = new Notification({
                    'title': 'Referral with visit created successfully!',
                    'type': 'SUCCESS',
                    'createdAt': moment()
                });
                this._notificationsStore.addNotification(notification);
                this.availableSlotsDialogVisible = false;
                this.medicalProviderDoctor = [];
                this.medicalProviderRoom = [];
                this.medicalProvider = [];
                this.selectedReferrals = null;
                this.selectedMode = 0;
                this.selectedOption = 0;
                this.compnayDoctorList = [];
                this.compnayRoomList = [];
                this.compnayRoomListDisplay = [];
                this.showDoctorList = false;
                this.showRoomList = false;
                this.compnayRoomId = '';
                this.compnayDoctorId = '';
                this.loadPendingReferralsForCompany(this.companyId);
                this.isAvailableSlotsSavingInProgress = false;
            }).catch((error) => {
                let errString = 'Unable to create referral visit!';
                let notification = new Notification({
                    'messages': ErrorMessageFormatter.getErrorMessages(error, errString),
                    'type': 'ERROR',
                    'createdAt': moment()
                });
                this._notificationsStore.addNotification(notification);
                this.availableSlotsDialogVisible = false;
                this.loadPendingReferralsForCompany(this.companyId);
                this.isAvailableSlotsSavingInProgress = false;
            });
    }

    handleAvailableSlotsDialogShow() {

    }

    handleAvailableSlotsDialogHide() {
        this.availableSlots = [];
        this.locations = [];
        // this.selectedReferrals = [];
    }

    closeAvailableSlotsDialog() {
        this.availableSlotsDialogVisible = false;
        this.handleAvailableSlotsDialogHide();
    }

    private _populateReferralForMedicalProviderDoctor(): PendingReferral {
        let procedureCodes = [];
        let pendingReferralDetails: PendingReferral = null;

        if (this.selectedReferrals.pendingReferralProcedureCode.length > 0) {
            this.selectedReferrals.pendingReferralProcedureCode.forEach(element => {
                procedureCodes.push({ 'procedureCodeId': element.procedureCodeId });
            });

        }
        pendingReferralDetails = new PendingReferral({
            pendingReferralId: this.selectedReferrals.id,
            fromCompanyId: this.sessionStore.session.currentCompany.id,
            fromLocationId: null,
            fromDoctorId: this.selectedReferrals.fromDoctorId,
            forSpecialtyId: this.selectedReferrals.forSpecialtyId,
            forRoomId: null,
            forRoomTestId: null,
            toCompanyId: this.selectedMedicalProviderId,
            toLocationId: null,
            toDoctorId: this.selectedDoctorId,
            toRoomId: null,
            dismissedBy: null,
            referralProcedureCode: procedureCodes
        });


        return pendingReferralDetails;
    }

    saveReferralForMedicalProviderDoctor() {
        let result;
        let pendingReferralDetails: PendingReferral = this._populateReferralForMedicalProviderDoctor();

        result = this._pendingReferralStore.savePendingReferral(pendingReferralDetails);
        result.subscribe(
            (response) => {
                let notification = new Notification({
                    'title': 'Referral saved successfully.',
                    'type': 'SUCCESS',
                    'createdAt': moment()
                });
                this._notificationsStore.addNotification(notification);
                this._notificationsService.success('Referral saved successfully');
                this.loadPendingReferralsForCompany(this.companyId);
                this.medicalProviderDoctor = [];
                this.medicalProviderRoom = [];
                this.medicalProvider = [];
                this.selectedReferrals = null;
                this.selectedMode = 0;
                this.compnayRoomId = '';
                this.compnayDoctorId = '';
                this.compnayDoctorList = [];
                this.compnayRoomList = [];
                this.compnayRoomListDisplay = [];
                this.showDoctorList = false;
                this.showRoomList = false;
            },
            (error) => {
                let errString = 'Unable to save Referral.';
                let notification = new Notification({
                    'messages': ErrorMessageFormatter.getErrorMessages(error, errString),
                    'type': 'ERROR',
                    'createdAt': moment()
                });
                this._notificationsStore.addNotification(notification);
                this._notificationsService.error(ErrorMessageFormatter.getErrorMessages(error, errString));
            },
            () => {

            });


    }

    private _populateReferralForMedicalProviderRoom(): PendingReferral {
        let procedureCodes = [];
        let pendingReferralDetails: PendingReferral = null;

        if (this.selectedReferrals.pendingReferralProcedureCode.length > 0) {
            this.selectedReferrals.pendingReferralProcedureCode.forEach(element => {
                procedureCodes.push({ 'procedureCodeId': element.procedureCodeId });
            });

        }

        pendingReferralDetails = new PendingReferral({
            pendingReferralId: this.selectedReferrals.id,
            fromCompanyId: this.sessionStore.session.currentCompany.id,
            fromLocationId: null,
            fromDoctorId: this.selectedReferrals.fromDoctorId,
            forSpecialtyId: null,
            forRoomId: null,
            forRoomTestId: this.selectedReferrals.forRoomTestId,
            toCompanyId: this.selectedMedicalProviderId,
            toLocationId: null,
            toDoctorId: null,
            toRoomId: this.selectedRoomId,
            dismissedBy: null,
            referralProcedureCode: procedureCodes
        });

        return pendingReferralDetails;
    }

    showUnscheduledVisitDialog(unscheduledVisitId: number) {
        this.externalReferralDialogVisible = false;
        this._patientVisitsStore.getUnscheduledVisitDetailById(unscheduledVisitId)
            .subscribe((visit: UnscheduledVisit) => {
                this.visitInfo = `Visit Info - Patient Name: ${visit.patient.user.displayName} - Case Id: ${visit.caseId}`;
                this.unscheduledVisit = visit;
                this.unscheduledDialogVisible = true;
            });
    }
    closeUnscheduledVisitDialog() {
        this.unscheduledDialogVisible = false;
        // this.visitInfo = '';
    }

    saveReferralForMedicalProviderRoom() {
        let result;
        let pendingReferralDetails: PendingReferral = this._populateReferralForMedicalProviderRoom();

        result = this._pendingReferralStore.savePendingReferral(pendingReferralDetails);
        result.subscribe(
            (response) => {
                let notification = new Notification({
                    'title': 'Referral saved successfully.',
                    'type': 'SUCCESS',
                    'createdAt': moment()
                });
                this._notificationsStore.addNotification(notification);
                this._notificationsService.success('Referral saved successfully');
                this.loadPendingReferralsForCompany(this.companyId);
                this.medicalProviderDoctor = [];
                this.medicalProviderRoom = [];
                this.medicalProvider = [];
                this.selectedReferrals = null;
                this.selectedMode = 0;
                this.compnayRoomId = '';
                this.compnayDoctorId = '';
                this.compnayDoctorList = [];
                this.compnayRoomList = [];
                this.compnayRoomListDisplay = [];
                this.showDoctorList = false;
                this.showRoomList = false;
            },
            (error) => {
                let errString = 'Unable to save referral.';
                let notification = new Notification({
                    'messages': ErrorMessageFormatter.getErrorMessages(error, errString),
                    'type': 'ERROR',
                    'createdAt': moment()
                });
                this._notificationsStore.addNotification(notification);
                this._notificationsService.error(ErrorMessageFormatter.getErrorMessages(error, errString));
            },
            () => {

            });


    }

    saveReferralForMedicalOnlyProvider() {
        let result;
        let procedureCodes = [];
        let pendingReferralDetails: PendingReferral;
        let uniqProcedureCodes: Procedure[] = [];

        if (this.selectedReferrals.pendingReferralProcedureCode.length > 0) {
            this.selectedReferrals.pendingReferralProcedureCode.forEach(element => {
                procedureCodes.push({ 'procedureCodeId': element.procedureCodeId });
            });
        }


        let pendingReferral = new PendingReferral({
            pendingReferralId: this.selectedReferrals.id,
            fromCompanyId: this.sessionStore.session.currentCompany.id,
            fromLocationId: null,
            fromDoctorId: this.selectedReferrals.fromDoctorId,
            forSpecialtyId: this.selectedReferrals.forSpecialtyId ? this.selectedReferrals.forSpecialtyId : null,
            forRoomId: null,
            forRoomTestId: this.selectedReferrals.forRoomTestId ? this.selectedReferrals.forRoomTestId : null,
            toCompanyId: this.selectedMedicalProviderId,
            toLocationId: null,
            toDoctorId: null,
            toRoomId: null,
            dismissedBy: null,
            referralProcedureCode: procedureCodes
        });
        pendingReferralDetails = pendingReferral;
        procedureCodes = [];

        result = this._pendingReferralStore.savePendingReferral(pendingReferralDetails);
        result.subscribe(
            (response) => {
                let notification = new Notification({
                    'title': 'Referral saved successfully.',
                    'type': 'SUCCESS',
                    'createdAt': moment()
                });

                this._notificationsStore.addNotification(notification);
                this._notificationsService.success('Referral saved successfully');
                this.loadPendingReferralsForCompany(this.companyId);
                this.medicalProviderDoctor = [];
                this.medicalProviderRoom = [];
                this.medicalProvider = [];
                this.compnayRoomId = '';
                this.compnayDoctorId = '';
                this.compnayDoctorList = [];
                this.compnayRoomList = [];
                this.compnayRoomListDisplay = [];
                this.showDoctorList = false;
                this.showRoomList = false;
            },
            (error) => {
                let errString = 'Unable to save Referral.';
                let notification = new Notification({
                    'messages': ErrorMessageFormatter.getErrorMessages(error, errString),
                    'type': 'ERROR',
                    'createdAt': moment()
                });
                this._notificationsStore.addNotification(notification);
                this._notificationsService.error(ErrorMessageFormatter.getErrorMessages(error, errString));
            },
            () => {

            });
    }

    dismiss() {
        if (this.selectedReferrals != null) {
            this.confirmationService.confirm({
                message: 'Do you want to delete this record?',
                header: 'Delete Confirmation',
                icon: 'fa fa-trash',
                accept: () => {
                    this.selectedReferrals.forEach(currentPendingReferrals => {
                        this.isDeleteProgress = true;
                        // this._progressBarService.show();
                        this._pendingReferralStore.deletePendingReferral(currentPendingReferrals)
                            .subscribe(
                            (response) => {
                                let notification = new Notification({
                                    'title': 'Pending referral deleted successfully!',
                                    'type': 'SUCCESS',
                                    'createdAt': moment()

                                });
                                this.loadPendingReferralsForCompany(this.companyId);
                                this._notificationsStore.addNotification(notification);
                                this.selectedReferrals = null;
                            },
                            (error) => {
                                let errString = 'Unable to delete pending referrals';
                                let notification = new Notification({
                                    'messages': ErrorMessageFormatter.getErrorMessages(error, errString),
                                    'type': 'ERROR',
                                    'createdAt': moment()
                                });
                                this.selectedReferrals = null;
                                // this._progressBarService.hide();
                                this.isDeleteProgress = false;
                                this._notificationsStore.addNotification(notification);
                                this._notificationsService.error('Oh No!', ErrorMessageFormatter.getErrorMessages(error, errString));
                            },
                            () => {
                                this.isDeleteProgress = false;
                                // this._progressBarService.hide();
                            });
                    });
                }
            });
        } else {
            let notification = new Notification({
                'title': 'Select pending referral to dismiss',
                'type': 'ERROR',
                'createdAt': moment()
            });
            this._notificationsStore.addNotification(notification);
            this._notificationsService.error('Oh No!', 'Select pending referral to dismiss');
        }
    }

}

