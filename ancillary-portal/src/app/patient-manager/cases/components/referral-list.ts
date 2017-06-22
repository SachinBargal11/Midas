import { Doctor } from '../../../medical-provider/users/models/doctor';
import { Speciality } from '../../../account-setup/models/speciality';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LazyLoadEvent } from 'primeng/primeng';
import { ReferralStore } from '../stores/referral-store';
import { SessionStore } from '../../../commons/stores/session-store';
import { Referral } from '../models/referral';
import { ReferralDocument } from '../models/referral-document';
import { CaseDocument } from '../models/case-document';
import { NotificationsStore } from '../../../commons/stores/notifications-store';
import { Notification } from '../../../commons/models/notification';
import * as moment from 'moment';
import * as _ from 'underscore';
import { Observable } from 'rxjs/Rx';
import { ProgressBarService } from '../../../commons/services/progress-bar-service';
import { NotificationsService } from 'angular2-notifications';
import { ErrorMessageFormatter } from '../../../commons/utils/ErrorMessageFormatter';
import { Room } from '../../../medical-provider/rooms/models/room';
import { environment } from '../../../../environments/environment';
import { ConfirmDialogModule, ConfirmationService } from 'primeng/primeng';
import { Consent } from '../models/consent';
import { CasesStore } from '../../cases/stores/case-store';
import { Case } from '../models/case';
import { InboundOutboundList } from '../../referals/models/inbound-outbound-referral';
import { PendingReferralStore } from '../../referals/stores/pending-referrals-stores';
import { ConsentStore } from '../../cases/stores/consent-store';
import { Document } from '../../../commons/models/document';

import { Procedure } from '../../../commons/models/procedure';
import { ProcedureStore } from '../../../commons/stores/procedure-store';
import { SpecialityStore } from '../../../account-setup/stores/speciality-store';
import { RoomsStore } from '../../../medical-provider/rooms/stores/rooms-store';
import { Tests } from '../../../medical-provider/rooms/models/tests';
import { SpecialityService } from '../../../account-setup/services/speciality-service';
import { PrefferedMedicalProvider } from '../../../patient-manager/referals/models/preferred-medical-provider';
import { PendingReferral } from '../../../patient-manager/referals/models/pending-referral';
import { UserSettingStore } from '../../../commons/stores/user-setting-store';
import { UserSetting } from '../../../commons/models/user-setting';
import { AvailableSingleSlot } from '../../../patient-manager/referals/models/available-single-slot';
import { AvailableSlot } from '../../../patient-manager/referals/models/available-slots';
import { AvailableSlotsStore } from '../../../patient-manager/referals/stores/available-slots-stores';
import { LocationDetails } from '../../../medical-provider/locations/models/location-details';
import { LocationsStore } from '../../../medical-provider/locations/stores/locations-store';

@Component({
    selector: 'referral-list',
    templateUrl: './referral-list.html'
})

export class ReferralListComponent implements OnInit {
    private _url: string = `${environment.SERVICE_BASE_URL}`;
    consentRecived: string = '';
    consentNotRecived: string = '';
    searchMode: number = 1;
    selectedReferrals: InboundOutboundList[] = [];
    referrals: InboundOutboundList[];
    referredMedicalOffices: InboundOutboundList[];
    referredUsers: InboundOutboundList[];
    referredRooms: InboundOutboundList[];
    referralsOutsideMidas: InboundOutboundList[];
    referredDoctors: Doctor[];
    refferedRooms: Room[];
    caseId: number;
    datasource: InboundOutboundList[];
    totalRecords: number;
    caseStatusId: number;
    isDeleteProgress: boolean = false;
    selectedCaseId: number;
    companyId: number;
    url;
    addConsentDialogVisible: boolean = false;
    currentCaseId: number;
    signedDocumentUploadUrl: string;
    signedDocumentPostRequestData: any;
    isElectronicSignatureOn: boolean = false;
    specialities: Speciality[];
    tests: Tests[];
    selectedMode: number = 0;
    selectedSpMode: number = 0;
    selectedDoctorId: number;
    selectedRoomId: number;
    selectedOption: number = 0;
    selectedOptionSpeciality: number;
    selectedSpecialityId: number;
    selectedTestId: number;
    isSaveProgress = false;
    isAvailableSlotsSavingInProgress = false;

    preferredMedical: PrefferedMedicalProvider[];
    medicalProvider: PrefferedMedicalProvider[];
    medicalProviderDoctor: {
        preferredMedical: PrefferedMedicalProvider,
        doctor: Doctor,
    }[] = [];
    medicalProviderRoom: {
        preferredMedical: PrefferedMedicalProvider,
        room: Room
    }[] = [];

    selectedMedicalProviderId: number = 0;
    selectedLocationId: number = 0;
    userSetting: UserSetting;
    addMedicalDialogVisible: boolean = false
    selectedCancel: number;
    availableSlotsDialogVisible: boolean = false;
    availableSlots: AvailableSlot[] = [];
    locations: LocationDetails[] = [];
    specialityId = 0;
    roomTestId = 0;
    constructor(
        private _router: Router,
        public _route: ActivatedRoute,
        public sessionStore: SessionStore,
        private _casesStore: CasesStore,
        private _referralStore: ReferralStore,
        private _notificationsStore: NotificationsStore,
        private _progressBarService: ProgressBarService,
        private _notificationsService: NotificationsService,
        private confirmationService: ConfirmationService,
        private _pendingReferralStore: PendingReferralStore,
        private _consentStore: ConsentStore,
        private _specialityStore: SpecialityStore,
        private _roomsStore: RoomsStore,
        private _userSettingStore: UserSettingStore,
        private _availableSlotsStore: AvailableSlotsStore,
        public locationsStore: LocationsStore
    ) {
        this.companyId = this.sessionStore.session.currentCompany.id;
        this.signedDocumentUploadUrl = `${this._url}/CompanyCaseConsentApproval/uploadsignedconsent`;

        this._route.parent.parent.params.subscribe((routeParams: any) => {
            this.caseId = parseInt(routeParams.caseId, 10);

            let result = this._casesStore.fetchCaseById(this.caseId);
            result.subscribe(
                (caseDetail: Case) => {
                    this.caseStatusId = caseDetail.caseStatusId;
                },
                (error) => {
                    this._router.navigate(['../'], { relativeTo: this._route });
                    this._progressBarService.hide();
                },
                () => {
                    this._progressBarService.hide();
                });
        });
    }

    ngOnInit() {
        this.loadAllSpecialitiesAndTests();
        this.loadReferrals(this.caseId, this.companyId);
    }

    loadReferrals(caseId, companyId) {
        this._progressBarService.show();
        this._pendingReferralStore.getReferralsByCaseAndCompanyId(caseId, companyId)
            .subscribe((referrals: InboundOutboundList[]) => {
                this.referredMedicalOffices = referrals;
            },
            (error) => {
                this._progressBarService.hide();
            },
            () => {
                this._progressBarService.hide();
            });
    }

    showDialog(currentCaseId) {
        this.url = this._url + '/CompanyCaseConsentApproval/multiupload/' + currentCaseId + '/' + this.companyId;
        this.addConsentDialogVisible = true;
        this.selectedCaseId = currentCaseId;
        this.signedDocumentPostRequestData = {
            companyId: this.companyId,
            caseId: this.selectedCaseId
        };
    }

    documentUploadComplete(documents: Document[]) {
        _.forEach(documents, (currentDocument: Document) => {
            if (currentDocument.status == 'Failed') {
                let notification = new Notification({
                    'title': currentDocument.message + '  ' + currentDocument.documentName,
                    'type': 'ERROR',
                    'createdAt': moment()
                });
                this._notificationsStore.addNotification(notification);
                this._notificationsService.error('Oh No!', 'Company, Case and Consent data already exists');
            }
            else {
                let notification = new Notification({
                    'title': 'Consent Uploaded Successfully!',
                    'type': 'SUCCESS',
                    'createdAt': moment()
                });
                this._notificationsStore.addNotification(notification);

            }
            this.addConsentDialogVisible = false;
            this.loadReferrals(this.caseId, this.companyId);
        });
    }

    documentUploadError(error: Error) {
        this._notificationsService.error('Oh No!', 'Not able to upload document(s).');
    }

    signedDocumentUploadComplete(document: Document) {
        if (document.status == 'Failed') {
            let notification = new Notification({
                'title': document.message + '  ' + document.documentName,
                'type': 'ERROR',
                'createdAt': moment()
            });
            this._notificationsStore.addNotification(notification);
            this._notificationsService.error('Oh No!', 'Company, Case and Consent data already exists.');
        }
        else {
            let notification = new Notification({
                'title': 'Consent Uploaded Successfully!',
                'type': 'SUCCESS',
                'createdAt': moment()
            });
            this._notificationsStore.addNotification(notification);

        }
        this.addConsentDialogVisible = false;
        this.loadReferrals(this.caseId, this.companyId);

    }

    signedDocumentUploadError(error: Error) {
        let errString = 'Not able to signed document.';
        let notification = new Notification({
            'messages': ErrorMessageFormatter.getErrorMessages(error, errString),
            'type': 'ERROR',
            'createdAt': moment()
        });
        this._notificationsStore.addNotification(notification);
        this._notificationsService.error('Oh No!', ErrorMessageFormatter.getErrorMessages(error, errString));
    }

    downloadConsent(caseDocuments: CaseDocument[]) {
        caseDocuments.forEach(caseDocument => {
            // window.location.assign(this._url + '/fileupload/download/' + caseDocument.document.originalResponse.caseId + '/' + caseDocument.document.originalResponse.midasDocumentId);
            this._progressBarService.show();
            if (caseDocument.document.originalResponse.companyId === this.sessionStore.session.currentCompany.id) {
                this._consentStore.downloadConsentForm(caseDocument.document.originalResponse.caseId, caseDocument.document.originalResponse.midasDocumentId)
                    .subscribe(
                    (response) => {
                        // this.document = document
                        // window.location.assign(this._url + '/fileupload/download/' + this.caseId + '/' + documentId);
                    },
                    (error) => {
                        let errString = 'Unable to download';
                        let notification = new Notification({
                            'messages': 'Unable to download',
                            'type': 'ERROR',
                            'createdAt': moment()
                        });
                        this._progressBarService.hide();
                        //  this._notificationsStore.addNotification(notification);
                        this._notificationsService.error('Oh No!', 'Unable to download');
                    },
                    () => {
                        this._progressBarService.hide();
                    });
            }
            this._progressBarService.hide();
        });
    }

    loadAllSpecialitiesAndTests() {
        this._progressBarService.show();
        let fetchAllSpecialities = this._specialityStore.getSpecialities();
        let fetchAllTestFacilties = this._roomsStore.getTests();
        Observable.forkJoin([fetchAllSpecialities, fetchAllTestFacilties])
            .subscribe(
            (results: any) => {
                this.specialities = results[0];
                this.tests = results[1];
            },
            (error) => {
                this._progressBarService.hide();
            },
            () => {
                this._progressBarService.hide();
            });
    }

    selectOption(event) {
        this.selectedDoctorId = 0;
        this.selectedRoomId = 0;
        this.selectedOptionSpeciality = 0;
        if (event.target.selectedOptions[0].getAttribute('data-type') == '1') {
            this.selectedOptionSpeciality = 1;
            this.selectedSpecialityId = parseInt(event.target.value);
            this.selectedTestId = 0;

        }
        else if (event.target.selectedOptions[0].getAttribute('data-type') == '2') {
            this.selectedOptionSpeciality = 2;
            this.selectedTestId = parseInt(event.target.value);
            this.selectedSpecialityId = 0;
        }
        {
            this.selectedSpMode = 0;
        }
        this.loadPreferredCompanyDoctorsAndRoomByCompanyId(this.companyId, this.selectedSpecialityId, this.selectedTestId);
    }

    loadPreferredCompanyDoctorsAndRoomByCompanyId(companyId: number, specialityId: number, roomTestId: number) {
        this._progressBarService.show();
        this._pendingReferralStore.getPreferredCompanyDoctorsAndRoomByCompanyId(companyId, specialityId, roomTestId)
            .subscribe(preferredMedical => {
                let matchingMedicalProvider: PrefferedMedicalProvider[] = _.filter(preferredMedical, (currentPreferredMedical: PrefferedMedicalProvider) => {
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
                this.medicalProvider = matchingMedicalProvider;

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

    selectOptionMedicalOffice(event) {
        this.selectedDoctorId = 0;
        this.selectedRoomId = 0;
        this.selectedOption = 0;
        this.selectedMedicalProviderId = 0;
        if (event.target.selectedOptions[0].getAttribute('data-type') == '1') {
            this.selectedOption = 1;
            this.selectedDoctorId = event.target.value;
            this.selectedMedicalProviderId = parseInt(event.target.selectedOptions[0].getAttribute('data-id'));
            this.checkUserSettings(this.selectedMedicalProviderId, this.selectedDoctorId)
        } else if (event.target.selectedOptions[0].getAttribute('data-type') == '2') {
            this.selectedOption = 2;
            this.selectedRoomId = event.target.value;
            this.medicalProviderRoom.forEach(currentMedicalProvider => {
                if (currentMedicalProvider.room.id === this.selectedRoomId) {
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

    assign() {
        // let shouldAppointVisit: boolean = true;
        // if (this.selectedOption === 3) {
        //     shouldAppointVisit = false;
        //     this.saveReferral();
        // } else if (this.selectedOption === 1) {
        //     this.checkUserSettings(this.selectedMedicalProviderId, this.selectedDoctorId)
        //     if (!this.userSetting.isCalendarPublic) {
        //         shouldAppointVisit = false;
        //         this.saveReferral();
        //     }
        // }
        // if (shouldAppointVisit) {
        //     this.confirmationService.confirm({
        //         message: 'Do you want to Appoint Schedule?',
        //         header: 'Confirmation',
        //         icon: 'fa fa-question-circle',
        //         accept: () => {
        //             // this.availableSlotsDialogVisible = true;
        //         },
        //         reject: () => {
        //             //call save referral for medical provider & room
        //             this.saveReferral();
        //         }
        //     });
        // }
        this.saveReferral();
    }

    saveReferral() {
        let result;
        let pendingReferralDetails: PendingReferral = null;
        let forSpecialtyId = null;
        let forRoomId = null;
        let toRoomId = null;
        let toDoctorId = null;

        if (this.selectedOptionSpeciality == 1) {
            forSpecialtyId = this.selectedSpecialityId;
            toRoomId = null;
            toDoctorId = this.selectedDoctorId;
        }
        else if (this.selectedOptionSpeciality == 2) {
            forRoomId = this.selectedTestId;
            toRoomId = this.selectedRoomId;
            toDoctorId = null;
        }

        if (this.selectedOption == 3) {
            toDoctorId = null;
            toRoomId = null;
        }

        pendingReferralDetails = new PendingReferral({
            caseId: this.caseId,
            pendingReferralId: null,
            fromCompanyId: this.sessionStore.session.currentCompany.id,
            fromLocationId: null,
            fromDoctorId: null,
            fromUserId: this.sessionStore.session.account.user.id,
            forSpecialtyId: forSpecialtyId,
            forRoomId: null,
            forRoomTestId: forRoomId,
            toCompanyId: this.selectedMedicalProviderId,
            toLocationId: null,
            toDoctorId: toDoctorId,
            toRoomId: toRoomId,
            ScheduledPatientVisitId: null,
            dismissedBy: null
        });

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
                this.clear();
            },
            (error) => {
                let errString = 'Unable to save Referral.';
                let notification = new Notification({
                    'messages': ErrorMessageFormatter.getErrorMessages(error, errString),
                    'type': 'ERROR',
                    'createdAt': moment()
                });
                this._progressBarService.hide();
                this._notificationsStore.addNotification(notification);
                this._notificationsService.error(ErrorMessageFormatter.getErrorMessages(error, errString));
            },
            () => {
                this._progressBarService.hide();
            });
    }


    showDialogMedical() {
        this.addMedicalDialogVisible = true;
        this.selectedCancel = 1;
    }
    closeDialog() {
        this.addMedicalDialogVisible = false;
        this.loadPreferredCompanyDoctorsAndRoomByCompanyId(this.companyId, this.selectedSpecialityId, this.selectedTestId);
    }

    handleAvailableSlotsDialogShow() {

    }

    handleAvailableSlotsDialogHide() {
        this.availableSlots = [];
        this.locations = [];
        // this.selectedReferrals = [];
        this.medicalProviderDoctor = [];
        this.medicalProviderRoom = [];
        this.medicalProvider = [];
    }

    closeAvailableSlotsDialog() {
        this.availableSlotsDialogVisible = false;
        this.handleAvailableSlotsDialogHide();
    }

    clear() {
        this.specialities = []; this.tests = [];
        this.selectedSpMode = 0;
        this.selectedMode = 0;
        this.selectedOption = 0;
        this.medicalProviderDoctor = [];
        this.medicalProviderRoom = [];
        this.medicalProvider = [];
        this.loadAllSpecialitiesAndTests();
        this.loadReferrals(this.caseId, this.companyId);
    }

    DownloadPdf(document: ReferralDocument) {
        window.location.assign(this._url + '/fileupload/download/' + document.referralId + '/' + document.midasDocumentId);
    }

    // // getReferralDocumentName(currentReferral: Referral) {
    // //     _.forEach(currentReferral.referralDocument, (currentDocument: ReferralDocument) =>{
    // //     })       
    // // }
    // loadRefferalsLazy(event: LazyLoadEvent) {
    //     setTimeout(() => {
    //         if (this.datasource) {
    //             this.referrals = this.datasource.slice(event.first, (event.first + event.rows));
    //         }
    //     }, 250);
    // }
    // getCurrentDoctorSpeciality(currentReferral): string {
    //     let specialityString: string = null;
    //     let speciality: any = [];
    //     _.forEach(currentReferral.doctorSpecialities, (currentDoctorSpeciality: any) => {
    //         speciality.push(currentDoctorSpeciality.speciality.specialityCode);
    //         // _.forEach(currentReferral.referredToDoctor.doctorSpecialities, (currentDoctorSpeciality: any) => {
    //         //     speciality.push(currentDoctorSpeciality.specialty.specialityCode);
    //     });
    //     if (speciality.length > 0) {
    //         specialityString = speciality.join(', ');
    //     }
    //     return specialityString;
    // }
    // DownloadPdf(document: ReferralDocument) {
    //     window.location.assign(this._url + '/fileupload/download/' + document.referralId + '/' + document.midasDocumentId);
    // }
    // downloadConsent(caseDocuments: CaseDocument[]) {
    //     caseDocuments.forEach(caseDocument => {
    //         window.location.assign(this._url + '/fileupload/download/' + caseDocument.document.originalResponse.caseId + '/' + caseDocument.document.originalResponse.midasDocumentId);
    //     });
    // }
    // // consentAvailable(referral: Referral) {
    // //     if (referral.case.companyCaseConsentApproval.length > 0) {
    // //         let consentAvailable = _.find(referral.case.companyCaseConsentApproval, (currentConsent: Consent) => {
    // //             return currentConsent.companyId === this.sessionStore.session.currentCompany.id;
    // //         });
    // //         if (consentAvailable) {
    // //             return this.consentRecived = 'Yes';
    // //         } else {
    // //             return this.consentRecived = 'No';
    // //         }
    // //     } else {
    // //         return this.consentRecived = 'No';
    // //     }
    // // }
    // consentAvailable(referral: Referral) {
    //     let consentAvailable = null;
    //     let consentApproval = referral.case.companyCaseConsentApproval;
    //     // if (consentApproval.length > 0) {
    //     consentAvailable = _.find(consentApproval, (currentConsent: Consent) => {
    //         return currentConsent.companyId === this.sessionStore.session.currentCompany.id;
    //     });
    //     // }
    //     if (consentAvailable) {
    //         this.consentRecived = 'Yes';
    //     } else if (consentApproval.length < 0) {
    //         this.consentNotRecived = 'No';
    //     } else {
    //         this.consentNotRecived = 'No';
    //     }
    // }

    deleteReferral() {
        // if (this.selectedReferrals.length > 0) {
        //     this.confirmationService.confirm({
        //         message: 'Do you want to delete this record?',
        //         header: 'Delete Confirmation',
        //         icon: 'fa fa-trash',
        //         accept: () => {
        //             this.selectedReferrals.forEach(currentReferral => {
        //                 this.isDeleteProgress = true;
        //                 this._progressBarService.show();
        //                 let result;
        //                 result = this._referralStore.deleteReferral(currentReferral);
        //                 result.subscribe(
        //                     (response) => {
        //                         let notification = new Notification({
        //                             'title': 'Referral deleted successfully!',
        //                             'type': 'SUCCESS',
        //                             'createdAt': moment()
        //                         });
        //                         this.loadReferrals();
        //                         this._notificationsStore.addNotification(notification);
        //                         this.selectedReferrals = [];
        //                     },
        //                     (error) => {
        //                         let errString = 'Unable to delete Referral';
        //                         let notification = new Notification({
        //                             'messages': ErrorMessageFormatter.getErrorMessages(error, errString),
        //                             'type': 'ERROR',
        //                             'createdAt': moment()
        //                         });
        //                         this.selectedReferrals = [];
        //                         this._progressBarService.hide();
        //                         this.isDeleteProgress = false;
        //                         this._notificationsStore.addNotification(notification);
        //                         this._notificationsService.error('Oh No!', ErrorMessageFormatter.getErrorMessages(error, errString));
        //                     },
        //                     () => {
        //                         this.isDeleteProgress = false;
        //                         this._progressBarService.hide();
        //                     });
        //             });
        //         }
        //     });
        // } else {
        //     let notification = new Notification({
        //         'title': 'select Referral to delete',
        //         'type': 'ERROR',
        //         'createdAt': moment()
        //     });
        //     this._notificationsStore.addNotification(notification);
        //     this._notificationsService.error('Oh No!', 'select Referral to delete');
        // }
    }

}