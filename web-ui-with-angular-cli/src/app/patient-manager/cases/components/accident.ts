import {Component, OnInit, ElementRef} from '@angular/core';
import {Validators,FormGroup, FormBuilder} from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';
import {SessionStore} from '../../../commons/stores/session-store';
import {NotificationsStore} from '../../../commons/stores/notifications-store';
import { AppValidators } from '../../../commons/utils/AppValidators';
import { StatesStore } from '../../../commons/stores/states-store';

@Component({
    selector: 'accident',
    templateUrl: './accident.html'
})

export class AccidentComponent implements OnInit {
    maxDate: Date;
    states: any[];
    cities: any[];
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

    constructor(
        private fb: FormBuilder,
        private _router: Router,
        public _route: ActivatedRoute,
        private _statesStore: StatesStore,
        private _notificationsStore: NotificationsStore,
        private _sessionStore: SessionStore,
        private _elRef: ElementRef
    ) {
        this.accidentform = this.fb.group({
                doa: ['', Validators.required],
                dot: ['', Validators.required],
                plateNumber:['', Validators.required],
                address: ['', Validators.required],
                hospitalAddress: ['', Validators.required],
                reportNumber:['', Validators.required],
                specialty: ['', Validators.required],
                hospitalName: ['', Validators.required],
                describeInjury: ['', Validators.required],
                patientType:['', Validators.required],
                state: [''],
                city: [''],
                zipcode: [''],
                country: ['']
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

    save() {
    }

}

