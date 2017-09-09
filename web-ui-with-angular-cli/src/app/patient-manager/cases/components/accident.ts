import { Component, OnInit, ElementRef } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { SessionStore } from '../../../commons/stores/session-store';
import { Accident } from '../models/accident';
import { ErrorMessageFormatter } from '../../../commons/utils/ErrorMessageFormatter';
import { NotificationsStore } from '../../../commons/stores/notifications-store';
import { AppValidators } from '../../../commons/utils/AppValidators';
import { StatesStore } from '../../../commons/stores/states-store';
import { ProgressBarService } from '../../../commons/services/progress-bar-service';
import { NotificationsService } from 'angular2-notifications';
import { Notification } from '../../../commons/models/notification';
import * as moment from 'moment';
import { Address } from '../../../commons/models/address';
import { AccidentStore } from '../stores/accident-store';
import { PatientsStore } from '../../patients/stores/patients-store';
import * as _ from 'underscore';
import { CasesStore } from '../../cases/stores/case-store';
import { Case } from '../models/case';
import { environment } from '../../../../environments/environment';
import { AccidentTreatment } from '../models/accident-treatment';
import { AccidentWitness } from '../models/accident-witness';

@Component({
    selector: 'accident',
    templateUrl: './accident.html'
})

export class AccidentInfoComponent implements OnInit {
    states: any[];
    dateOfAdmission: Date;
    accidentDate: Date;
    dateOfAdmissionLabel: string;
    accidentDateLabel: string;
    maxDate: Date;
    cities: any[];
    accidents: Accident[] = [];
    currentAccident: Accident;
    accidentCities: any[];
    patientId: number;
    patientTypeId: string;
    caseId: number;
    selectedCity = '';
    selectedAccidentCity = '';
    isCitiesLoading = false;
    isAccidentCitiesLoading = false;
    accidentform: FormGroup;
    accidentformControls;
    isSaveProgress = false;
    isSaveAccidentProgress = false;
    accAddId: number;
    hospAddId: number;
    caseDetail: Case;
    caseStatusId: number;
    caseViewedByOriginator: boolean = false;

    policeAtScene = '0';
    isWearingSeatbelt = '0';
    isAirBagDeploy = '0';
    isPhotoTaken = '0';
    isAnyWitnesses = '0';
    ambulance = '0';
    treatedAndReleased = '0';
    admitted = '0';
    xraysTaken = '0';

    witnesses: AccidentWitness[] = [];
    selectedWitnesses: AccidentWitness[] = [];
    treatmentMedicalFacilities: AccidentTreatment[] = [];
    selectedTreatmentMedicalFacilities: AccidentTreatment[] = [];

    files: any[] = [];
    method: string = 'POST';
    private _url: string = `${environment.SERVICE_BASE_URL}`;
    url;
    witnessPhoneNumber: string;
    witnessName: string;

    constructor(
        private fb: FormBuilder,
        private _router: Router,
        public _route: ActivatedRoute,
        private _statesStore: StatesStore,
        private _accidentStore: AccidentStore,
        private _notificationsStore: NotificationsStore,
        private _progressBarService: ProgressBarService,
        private _sessionStore: SessionStore,
        private _elRef: ElementRef,
        private _notificationsService: NotificationsService,
        private _casesStore: CasesStore,
    ) {
        this._route.parent.params.subscribe((routeParams: any) => {
            this.caseId = parseInt(routeParams.caseId, 10);
            this._progressBarService.show();
            let result = this._accidentStore.getAccidents(this.caseId);
            result.subscribe(
                (accidents: Accident[]) => {
                    this.accidents = accidents;
                    if (this.accidents.length > 0) {
                        this.currentAccident = this.accidents[0];
                        this.patientTypeId = String(this.currentAccident.patientTypeId);
                    }
                    // this.currentAccident = _.find(this.accidents, (accident) => {
                    //     return accident.isCurrentAccident;
                    // });
                    if (this.currentAccident) {
                        this.dateOfAdmission = this.currentAccident.dateOfAdmission
                            ? this.currentAccident.dateOfAdmission.toDate()
                            : null;

                        this.dateOfAdmissionLabel = this.currentAccident.dateOfAdmission.format('MMM Do YY');

                        this.accidentDate = this.currentAccident.accidentDate
                            ? this.currentAccident.accidentDate.toDate()
                            : null;

                        this.accidentDateLabel = this.currentAccident.accidentDate.format('MMM Do YY');

                        if (this.currentAccident.accidentAddress.state || this.currentAccident.hospitalAddress.state) {
                            this.selectedCity = this.currentAccident.hospitalAddress.city;
                            this.selectedAccidentCity = this.currentAccident.accidentAddress.city;
                        }
                        this.witnesses = this.currentAccident.accidentWitnesses;
                        this.treatmentMedicalFacilities = this.currentAccident.accidentTreatments;
                        this.policeAtScene = String(this.currentAccident.policeAtScene);
                        this.isWearingSeatbelt = String(this.currentAccident.wearingSeatBelts);
                        this.isAirBagDeploy = String(this.currentAccident.airBagsDeploy);
                        this.isPhotoTaken = String(this.currentAccident.photosTaken);
                        this.isAnyWitnesses = String(this.currentAccident.witness);
                        this.ambulance = String(this.currentAccident.ambulance);
                        this.treatedAndReleased = String(this.currentAccident.treatedAndReleased);
                        this.admitted = String(this.currentAccident.admitted);
                        this.xraysTaken = String(this.currentAccident.xraysTaken);


                    } else {
                        this.currentAccident = new Accident({
                            accidentAddress: new Address({}),
                            hospitalAddress: new Address({}),
                            accidentWitnesses: new AccidentWitness({}),
                            accidentTreatments: new AccidentTreatment({}),
                        });
                    }
                },
                (error) => {
                    this._router.navigate(['../../']);
                    this._progressBarService.hide();
                },
                () => {
                    this._progressBarService.hide();
                });
        });

        this._route.parent.params.subscribe((routeParams: any) => {
            this.caseId = parseInt(routeParams.caseId, 10);
            this._progressBarService.show();
            let result = this._casesStore.fetchCaseById(this.caseId);
            result.subscribe(
                (caseDetail: Case) => {
                    if (caseDetail.orignatorCompanyId != _sessionStore.session.currentCompany.id) {
                        this.caseViewedByOriginator = false;
                    } else {
                        this.caseViewedByOriginator = true;
                    }
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

        this.accidentform = this.fb.group({
            doa: ['', Validators.required],
            dot: ['', Validators.required],
            plateNumber: [''],
            address: [''],
            accidentAddress: [''],
            accidentAddress2: [''],
            address2: [''],
            reportNumber: ['', Validators.required],
            hospitalName: ['', Validators.required],
            describeInjury: ['', Validators.required],
            patientType: ['', Validators.required],
            additionalPatient: [''],
            state: [''],
            city: [''],
            zipcode: [''],
            country: [''],
            accidentState: [''],
            accidentCity: [''],
            accidentZipcode: [''],
            accidentCountry: [''],
            medicalReportNumber: [''],
            weather: [''],
            policeAtScene: [''],
            precinct: [''],
            isWearingSeatbelt: [''],
            isAirBagDeploy: [''],
            isPhotoTaken: [''],
            accidentDescription: [''],
            isAnyWitnesses: [''],
            witnessName: [''],
            witnessPhoneNumber: [''],
            ambulance: [''],
            treatedAndReleased: [''],
            admitted: [''],
            xraysTaken: [''],
            durationAtHospital: [''],
            treatmentMedicalFacilityName: [''],
            treatmentDoctorName: [''],
            treatmentContactNumber: [''],
            treatmentAddress: [''],
        });
        this.accidentformControls = this.accidentform.controls;
    }

    ngOnInit() {
        this.url = `${this._url}/documentmanager/uploadtoblob`;
        let today = new Date();
        let currentDate = today.getDate();
        this.maxDate = new Date();
        this.maxDate.setDate(currentDate);
        this._statesStore.getStates()
            .subscribe(states => this.states = states);
    }
    deletePhoto(file) {
        this.files = _.reject(this.files, (currFile) => {
            return currFile == file;
        })
        this.files = _.union(this.files);
    }

    myUploader(event) {
        this.files = event.files;
    }

    uploadProfileImage(patientId: number) {
        if (this.files.length != 0 && this.isPhotoTaken == '1') {
            let xhr = new XMLHttpRequest(),
                formData = new FormData();

            for (let i = 0; i < this.files.length; i++) {
                formData.append(this.files[i].name, this.files[i], this.files[i].name);
            }

            xhr.open(this.method, this.url, true);
            xhr.setRequestHeader("inputjson", '{"ObjectType":"patient","DocumentType":"profile", "CompanyId": "' + this._sessionStore.session.currentCompany.id + '","ObjectId":"' + patientId + '"}');
            xhr.setRequestHeader("Authorization", this._sessionStore.session.accessToken);

            xhr.withCredentials = false;

            xhr.send(formData);
        }
    }

    addWitness() {
        let accidentformValues = this.accidentform.value;
        if (accidentformValues.witnessName != '') {
            let witness = new AccidentWitness({
                witnessName: accidentformValues.witnessName,
                witnessContactNumber: accidentformValues.witnessPhoneNumber
            })
            this.witnesses.push(witness);
            this.witnesses = _.union(this.witnesses);
            this.witnessName = '';
            this.witnessPhoneNumber = '';
        }
    }
    
    removeWitnessFromList(witnessName, witnessPhoneNumber) {
        this.witnesses = _.reject(this.witnesses, (currWitness: any) => {
            return currWitness.witnessName == witnessName && currWitness.witnessContactNumber == witnessPhoneNumber;
        })
    }

    addTreatmentMedicalFacility() {
        let accidentformValues = this.accidentform.value;
        if (accidentformValues.treatmentMedicalFacilityName != '' && accidentformValues.treatmentContactNumber != '' && accidentformValues.treatmentAddress != '') {
            let treatmentMedicalFacility = new AccidentTreatment({
                medicalFacilityName: accidentformValues.treatmentMedicalFacilityName,
                doctorName: accidentformValues.treatmentDoctorName,
                contactNumber: accidentformValues.treatmentContactNumber,
                address: accidentformValues.treatmentAddress
            })
            this.treatmentMedicalFacilities.push(treatmentMedicalFacility);
            this.treatmentMedicalFacilities = _.union(this.treatmentMedicalFacilities);
        }
    }

    removeTreatmentMedicalFacilityFromList(treatmentMedicalFacilityName, treatmentContactNumber) {
        this.treatmentMedicalFacilities = _.reject(this.treatmentMedicalFacilities, (currTreatmentMedicalFacility: any) => {
            return currTreatmentMedicalFacility.medicalFacilityName == treatmentMedicalFacilityName && currTreatmentMedicalFacility.contactNumber == treatmentContactNumber;
        })
    }

    save() {

        this.isSaveAccidentProgress = true;
        let accidentformValues = this.accidentform.value;
        let addResult;
        let result;
        let accidentWitnesses: any[] = [];
        let accidentTreatments: any[] = [];
        _.forEach(this.witnesses, (currWitness: AccidentWitness) => {
            accidentWitnesses.push({
                WitnessName: currWitness.witnessName,
                WitnessContactNumber: currWitness.witnessContactNumber,
            })
        })
        _.forEach(this.treatmentMedicalFacilities, (currAccidentTreatment: AccidentTreatment) => {
            accidentTreatments.push({
                MedicalFacilityName: currAccidentTreatment.medicalFacilityName,
                DoctorName: currAccidentTreatment.doctorName,
                ContactNumber: currAccidentTreatment.contactNumber,
                Address: currAccidentTreatment.address,
            })
        })

        let accident = new Accident({
            caseId: this.caseId,
            isCurrentAccident: 1,
            plateNumber: accidentformValues.plateNumber,
            reportNumber: accidentformValues.reportNumber,
            hospitalName: accidentformValues.hospitalName,
            describeInjury: accidentformValues.describeInjury,
            dateOfAdmission: accidentformValues.dot ? moment(accidentformValues.dot) : null,
            patientTypeId: parseInt(accidentformValues.patientType),
            additionalPatients: accidentformValues.additionalPatient,
            accidentDate: accidentformValues.doa ? moment(accidentformValues.doa) : null,
            medicalReportNumber: accidentformValues.medicalReportNumber,

            weather: accidentformValues.weather,
            policeAtScene: parseInt(accidentformValues.policeAtScene),
            precinct: accidentformValues.precinct,
            wearingSeatBelts: parseInt(accidentformValues.isWearingSeatbelt),
            airBagsDeploy: parseInt(accidentformValues.isAirBagDeploy),
            photosTaken: parseInt(accidentformValues.isPhotoTaken),
            accidentDescription: accidentformValues.accidentDescription,
            witness: parseInt(accidentformValues.isAnyWitnesses),
            ambulance: parseInt(accidentformValues.ambulance),
            treatedAndReleased: parseInt(accidentformValues.treatedAndReleased),
            admitted: parseInt(accidentformValues.admitted),
            xraysTaken: parseInt(accidentformValues.xraysTaken),
            durationAtHospital: accidentformValues.durationAtHospital,
            accidentWitnesses: this.isAnyWitnesses == '1' ? accidentWitnesses : [],
            accidentTreatments: accidentTreatments,

            accidentAddress: new Address({
                id: this.currentAccident.accidentAddress.id,
                address1: accidentformValues.accidentAddress,
                address2: accidentformValues.accidentAddress2,
                city: accidentformValues.accidentCity,
                country: accidentformValues.accidentCountry,
                state: accidentformValues.accidentState,
                zipCode: accidentformValues.accidentZipcode

            }),
            hospitalAddress: new Address({
                id: this.currentAccident.hospitalAddress.id,
                address1: accidentformValues.address,
                address2: accidentformValues.address2,
                city: accidentformValues.city,
                country: accidentformValues.country,
                state: accidentformValues.state,
                zipCode: accidentformValues.zipcode
            })

        });
        this._progressBarService.show();

        if (this.currentAccident.id) {
            result = this._accidentStore.updateAccident(accident, this.currentAccident.id);
            result.subscribe(
                (response) => {
                    this.uploadProfileImage(response.id);
                    let notification = new Notification({
                        'title': 'Accident information updated successfully!',
                        'type': 'SUCCESS',
                        'createdAt': moment()
                    });
                    this._notificationsStore.addNotification(notification);
                    this._router.navigate(['../../'], { relativeTo: this._route });
                },
                (error) => {
                    let errString = 'Unable to update accident information.';
                    let notification = new Notification({
                        'messages': ErrorMessageFormatter.getErrorMessages(error, errString),
                        'type': 'ERROR',
                        'createdAt': moment()
                    });
                    this.isSaveAccidentProgress = false;
                    this._notificationsStore.addNotification(notification);
                    this._notificationsService.error('Oh No!', ErrorMessageFormatter.getErrorMessages(error, errString));
                    this._progressBarService.hide();
                },
                () => {
                    this.isSaveAccidentProgress = false;
                    this._progressBarService.hide();
                });

        }

        else {
            addResult = this._accidentStore.addAccident(accident);

            addResult.subscribe(
                (response) => {
                    let notification = new Notification({
                        'title': 'Accident information added successfully!',
                        'type': 'SUCCESS',
                        'createdAt': moment()
                    });
                    this._notificationsStore.addNotification(notification);
                    this._router.navigate(['/patient-manager/patients']);
                },
                (error) => {
                    let errString = 'Unable to add accident information.';
                    let notification = new Notification({
                        'messages': ErrorMessageFormatter.getErrorMessages(error, errString),
                        'type': 'ERROR',
                        'createdAt': moment()
                    });
                    this.isSaveAccidentProgress = false;
                    this._notificationsStore.addNotification(notification);
                    this._notificationsService.error('Oh No!', ErrorMessageFormatter.getErrorMessages(error, errString));
                    this._progressBarService.hide();
                },
                () => {
                    this.isSaveAccidentProgress = false;
                    this._progressBarService.hide();
                });
        }
    }

}

