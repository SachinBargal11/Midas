import {Component, OnInit, ElementRef} from '@angular/core';
import {Validators,FormGroup, FormBuilder} from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';
import {SessionStore} from '../../../commons/stores/session-store';
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
import { PatientsStore } from '../stores/patients-store';

@Component({
    selector: 'accident',
    templateUrl: './accident.html'
})

export class AccidentInfoComponent implements OnInit {
    states: any[];
    maxDate: Date;
    cities: any[];
    accident: Accident[];
    accidentCities:any[];
    patientId: number;
    selectedCity = 0;
    isCitiesLoading = false;
    options = {
        timeOut: 3000,
        showProgressBar: true,
        pauseOnHover: false,
        clickToClose: false
    };
    accidentform: FormGroup;
    accidentformControls;
    isSaveProgress = false;
    isSaveAccidentProgress = false;

    constructor(
        private fb: FormBuilder,
        private _router: Router,
        public  _route: ActivatedRoute,
        private _statesStore: StatesStore,
        private _accidentStore: AccidentStore,
        private _notificationsStore: NotificationsStore,
        private _progressBarService: ProgressBarService,
        private _sessionStore: SessionStore,
        private _elRef: ElementRef,
        private _notificationsService: NotificationsService,
    ) {
        this._route.parent.params.subscribe((routeParams:any) =>{
            this.patientId = parseInt(routeParams.patientId);
            this._progressBarService.show();
            let result = this._accidentStore.getAccidents(this.patientId);
            result.subscribe(
                (accident:Accident[]) => {
                    this.accident = accident;
                },
                 (error) => {
                    this._router.navigate(['../../']);
                    this._progressBarService.hide();
                },
                () => {
                    this._progressBarService.hide();
                });
    });

      
        this.accidentform = this.fb.group({
                doa: ['', Validators.required],
                dot: ['', Validators.required],
                plateNumber:['', Validators.required],
                address: [''],
                accidentAddress: [''],
                accidentAddress2: [''],
                address2: [''],
                reportNumber:['', Validators.required],
                hospitalName: ['', Validators.required],
                describeInjury: ['', Validators.required],
                patientType:['', Validators.required],
                additionalPatient:[''],
                state: [''],
                city: [''],
                zipcode: [''],
                country: [''],
                accidentState: [''],
                accidentCity: [''],
                accidentZipcode: [''],
                accidentCountry: ['']
            });
        this.accidentformControls = this.accidentform.controls;
    }

    ngOnInit() {
        let today = new Date();
        let currentDate = today.getDate();
        this.maxDate = new Date();
        this.maxDate.setDate(currentDate);
        this._statesStore.getStates()
            .subscribe(states => this.states = states);
    }

    selectState(event) {
        this.selectedCity = 0;
        let currentState = event.target.value;
        this.loadCities(currentState);
    }

    loadCities(stateName) {
        this.isCitiesLoading = true;
        if (stateName !== '') {
            this._statesStore.getCitiesByStates(stateName)
                .subscribe((cities) => { this.cities = cities; },
                null,
                () => { this.isCitiesLoading = false; });
        } else {
            this.cities = [];
            this.isCitiesLoading = false;
        }
    }

      selectAccidentState(event) {
        this.selectedCity = 0;
        let currentState = event.target.value;
        this.loadAccidentCities(currentState);
    }

    loadAccidentCities(stateName) {
        this.isCitiesLoading = true;
        if (stateName !== '') {
            this._statesStore.getCitiesByStates(stateName)
                .subscribe((cities) => { this.accidentCities = cities; },
                null,
                () => { this.isCitiesLoading = false; });
        } else {
            this.accidentCities = [];
            this.isCitiesLoading = false;
        }
    }

    save() {
        this.isSaveAccidentProgress = true;
        let accidentformValues = this.accidentform.value;
        let addResult;
        let accident = new Accident({
              patientId: this.patientId,
              plateNumber: accidentformValues.plateNumber,
              reportNumber: accidentformValues.reportNumber,
              hospitalName:accidentformValues.hospitalName,
              describeInjury:accidentformValues.describeInjury,
              dateOfAdmission:accidentformValues.dot,
              patientTypeId:parseInt(accidentformValues.patientType),
              additionalPatients:accidentformValues.additionalPatient,
              accidentDate:accidentformValues.doa,
              accidentAddress: new Address({
                    address1:accidentformValues.accidentAddress,
                    address2:accidentformValues.accidentAddress2,
                    city:accidentformValues.accidentCity,
                    country:accidentformValues.accidentCountrys,
                    state: accidentformValues.accidentState,
                    zipCode:accidentformValues.accidentZipcode  
                }),
                hospitalAddress: new Address({
                address1:accidentformValues.address,
                address2:accidentformValues.address2,
                city:accidentformValues.city,
                country:accidentformValues.country,
                state:accidentformValues.state,
                zipCode:accidentformValues.zipcode
            })
        });
        this._progressBarService.show();
        addResult = this._accidentStore.addAccident(accident);
        
        addResult.subscribe(
            (response) => {
                let notification = new Notification({
                    'title': 'Accident Information added successfully!',
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

