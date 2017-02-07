import {Component, OnInit, ElementRef} from '@angular/core';
import { FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';
import {SessionStore} from '../../../commons/stores/session-store';
import {NotificationsStore} from '../../../commons/stores/notifications-store';
import { AppValidators } from '../../../commons/utils/AppValidators';
import { StatesStore } from '../../../commons/stores/states-store';

@Component({
    selector: 'add-family-member',
    templateUrl: './add-family-member.html'
})


export class AddFamilyMemberComponent implements OnInit {
    isCitiesLoading = false;
    maxDate: Date;

    familyMemberForm: FormGroup;
    familyMemberFormControls;
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
        this.familyMemberForm = this.fb.group({
                relationToPatient: ['', Validators.required],
                name: ['', Validators.required],
                familyName: ['', Validators.required],
                prefix: ['', Validators.required],
                suffix: ['', Validators.required],
                age: ['', Validators.required],
                dob: ['', Validators.required],
                deceasedAge: ['', Validators.required],
                races: ['', Validators.required],
                ethnicities: ['', Validators.required],
                gender: ['', Validators.required]
            });

        this.familyMemberFormControls = this.familyMemberForm.controls;
    }
    ngOnInit() {
        let today = new Date();
        let currentDate = today.getDate();
        this.maxDate = new Date();
        this.maxDate.setDate(currentDate);
    }
}
