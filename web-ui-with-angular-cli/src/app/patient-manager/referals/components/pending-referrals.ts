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
import { UserSettingStore } from '../../../commons/stores/user-setting-store';
import { UserSetting } from '../../../commons/models/user-setting';
import { LocationsStore } from '../../../medical-provider/locations/stores/locations-store';
import { PatientVisitsStore } from '../../patient-visit/stores/patient-visit-store';

@Component({
    selector: 'pending-referrals',
    templateUrl: './pending-referrals.html'
})

export class PendingReferralsComponent implements OnInit {
    private _url: string = `${environment.SERVICE_BASE_URL}`;
    companyId: number = this.sessionStore.session.currentCompany.id;
    addMedicalDialogVisible: boolean = false
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
    selectedReferrals: PendingReferralList[] = [];

    constructor(
        private _router: Router,
        private _notificationsStore: NotificationsStore,
        public sessionStore: SessionStore,
        private _pendingReferralStore: PendingReferralStore,
        private _progressBarService: ProgressBarService,
        private _notificationsService: NotificationsService,
        private confirmationService: ConfirmationService,
        private _availableSlotsStore: AvailableSlotsStore,
        private _userSettingStore: UserSettingStore,
        public locationsStore: LocationsStore,
        private _patientVisitsStore: PatientVisitsStore
    ) {
        this.sessionStore.userCompanyChangeEvent.subscribe(() => {
            // this.loadPendingReferralsForCompany(companyId);
            // this.loadPreferredCompanyDoctorsAndRoomByCompanyId(this.companyId);
        });

    }

    ngOnInit() {
        this.loadPreferredCompanyDoctorsAndRoomByCompanyId(this.companyId);
        this.loadPendingReferralsForCompany(this.companyId);
    }

    loadPendingReferralsForCompany(companyId: number) {
        this._progressBarService.show();
        this._pendingReferralStore.getPendingReferralByCompanyId(this.companyId)
            .subscribe(pendingReferralList => {
                this.pendingReferralList = pendingReferralList
            },
            (error) => {
                this._progressBarService.hide();
            },
            () => {
                this._progressBarService.hide();
            });

    }

    loadPreferredCompanyDoctorsAndRoomByCompanyId(companyId: number) {
        this._progressBarService.show();
        this._pendingReferralStore.getPreferredCompanyDoctorsAndRoomByCompanyId(this.companyId)
            .subscribe(preferredMedical => {
                let matchingMedicalProvider: PrefferedMedicalProvider[] = _.filter(preferredMedical, (currentPreferredMedical: PrefferedMedicalProvider) => {
                    return currentPreferredMedical.registrationComplete == false;
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
                this.medicalProvider = matchingMedicalProvider;

                // this.preferredMedical = preferredMedical

            },
            (error) => {
                this.medicalProviderDoctor = [];
                this.medicalProviderRoom = [];
                this._progressBarService.hide();
                // });
                () => {
                    this._progressBarService.hide();
                };
            });
    }

    selectOption(event) {
        this.selectedDoctorId = 0;
        this.selectedRoomId = 0;
        this.selectedOption = 0;
        this.selectedMedicalProviderId = 0;

        // this.events = [];
        if (event.target.selectedOptions[0].getAttribute('data-type') == '1') {
            this.selectedOption = 1;
            this.selectedDoctorId = event.target.value;
            this.selectedMedicalProviderId = parseInt(event.target.selectedOptions[0].getAttribute('data-id'));
            this.checkUserSettings(this.selectedMedicalProviderId, this.selectedDoctorId)
            //   console.log(this.selectedMedicalProviderId)
        } else if (event.target.selectedOptions[0].getAttribute('data-type') == '2') {
            this.selectedOption = 2;
            this.selectedRoomId = event.target.value;
            this.selectedMedicalProviderId = parseInt(event.target.selectedOptions[0].getAttribute('data-testId'));
        } else if (event.target.selectedOptions[0].getAttribute('data-type') == '3') {
            this.selectedOption = 3;
            // this.selectedMedicalProviderId = event.target.value;
            this.selectedMedicalProviderId = parseInt(event.target.selectedOptions[0].getAttribute('data-medicalProviderId'));
            console.log(this.selectedMedicalProviderId)
        } else {
            this.selectedMode = 0;
        }
        if (this.selectedMedicalProviderId) {
            this.locationsStore.getLocationsByCompanyId(this.selectedMedicalProviderId)
                .subscribe((locations: LocationDetails[]) => {
                    this.locations = locations;
                },
                (error) => { });
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
    closeDialog() {
        this.addMedicalDialogVisible = false;
        this.loadPreferredCompanyDoctorsAndRoomByCompanyId(this.companyId);

    }
    assign() {
        if (this.selectedReferrals.length > 0) {
            if (this.selectedOption !== 3) {
                if (this.selectedOption !== 1) {
                    this.confirmationService.confirm({
                        message: 'Do you want to Appoint Schedule?',
                        header: 'Confirmation',
                        icon: 'fa fa-question-circle',
                        accept: () => {
                            this.availableSlotsDialogVisible = true;
                        }
                    });
                } else {
                    //    this.checkUserSettings(this.selectedMedicalProviderId,this.selectedDoctorId)
                    if (this.userSetting.isCalendarPublic) {
                        this.confirmationService.confirm({
                            message: 'Do you want to Appoint Schedule?',
                            header: 'Confirmation',
                            icon: 'fa fa-question-circle',
                            accept: () => {
                                this.availableSlotsDialogVisible = true;
                            }
                        });
                    } else {
                        // Directly Save Referral 
                    }

                }

            } else {
                // Directly Save Referral
            }
        } else {
            this._notificationsService.alert('Oh No!', 'Please Select Referral!');
        }

    }
    // Code for available slots    

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
        } else if (this.selectedOption === 2) {
            this._availableSlotsStore.getAvailableSlotsByLocationAndRoomId(this.selectedLocationId, this.selectedRoomId, startDate, endDate)
                .subscribe((availableSlots: AvailableSlot[]) => {
                    this.availableSlots = availableSlots;
                },
                (error) => {
                },
                () => {
                });
        }

    }

    setVisit(slotDetail: AvailableSingleSlot) {
        let selectedReffral: PendingReferralList = this.selectedReferrals[0];
        let patientVisit: PatientVisit = new PatientVisit({
            caseId: selectedReffral.caseId,
            patientId: selectedReffral.patientId,
            doctorId: this.selectedDoctorId,
            locationId: this.selectedLocationId,
            calendarEvent: new ScheduledEvent({
                eventStart: slotDetail.start,
                eventEnd: slotDetail.end
            })
        });
        let result = this._patientVisitsStore.addPatientVisit(patientVisit);
        result.subscribe(
            (response) => {

            },
            (error) => {

            },
            () => {
            });
    }

    handleAvailableSlotsDialogShow() {

    }

    handleAvailableSlotsDialogHide() {
        this.availableSlots = [];
        this.locations = [];
    }

    closeAvailableSlotsDialog() {
        this.availableSlotsDialogVisible = false;
        this.handleAvailableSlotsDialogHide();
    }
}

