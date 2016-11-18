import {Component, OnInit, ElementRef} from '@angular/core';
import {Validators, FormGroup, FormBuilder} from '@angular/forms';
import {Router} from '@angular/router';
import {SessionStore} from '../../../stores/session-store';
import {NotificationsStore} from '../../../stores/notifications-store';
import {Notification} from '../../../models/notification';
import moment from 'moment';
import $ from 'jquery';
import 'eonasdan-bootstrap-datetimepicker';

@Component({
    selector: 'schedule',
    templateUrl: 'templates/pages/location-management/schedule.html',
    providers: [FormBuilder],
})

export class ScheduleComponent implements OnInit {
    options = {
        timeOut: 3000,
        showProgressBar: true,
        pauseOnHover: false,
        clickToClose: false
    };
    scheduleform: FormGroup;
    scheduleformControls;
    isSaveProgress = false;

    constructor(
        private fb: FormBuilder,
        private _router: Router,
        private _notificationsStore: NotificationsStore,
        private _sessionStore: SessionStore,
        private _elRef: ElementRef
    ) {
        this.scheduleform = this.fb.group({
                sundayFrom: [''],
                sundayTo: [''],
                sunday: [''],
                mondayFrom: [''],
                mondayTo: [''],
                monday: [''],
                tuesdayFrom: [''],
                tuesdayTo: [''],
                tuesday: [''],
                wednesdayFrom: [''],
                wednesdayTo: [''],
                wednesday: [''],
                ThursdayFrom: [''],
                ThursdayTo: [''],
                Thursday: [''],
                fridayFrom: [''],
                fridayTo: [''],
                friday: [''],
                saturdayFrom: [''],
                saturdayTo: [''],
                saturday: [''],
            });
        this.scheduleformControls = this.scheduleform.controls;
    }

    ngOnInit() {
        $(this._elRef.nativeElement).find('.datepickerElem').datetimepicker({
            format: 'LT'
        });
    }


    save() {
    }

}
