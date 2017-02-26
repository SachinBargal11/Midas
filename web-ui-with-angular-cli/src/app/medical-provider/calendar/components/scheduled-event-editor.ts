import { FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';
import { ScheduledEvent } from '../../../commons/models/scheduled-event';
import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import * as moment from 'moment';
import * as _ from 'underscore';

@Component({
    selector: 'scheduled-event-editor',
    templateUrl: './scheduled-event-editor.html'
})


export class ScheduledEventEditorComponent implements OnChanges {

    private _selectedEvent: ScheduledEvent;
    eventStartAsDate: Date;
    eventEndAsDate: Date;
    isAllDay: boolean;
    repeatType: number = 0;
    repeatEvery: number = 0;
    end: string = '0';
    repeatOnWeekDay: string[] = ['Mo'];
    recur_count: number = 0;
    recur_until: Date;
    recur_month: number = 1;
    recur_weekday: number = 1;
    recur_monthday_radio: number = 0;
    recur_monthday: number = 0;
    recur_weekday_offset: number = 0;
    recur_year_radio: number = 0;
    scheduledEventEditorForm: FormGroup;
    scheduledEventEditorFormControls;
    @Output() isValid = new EventEmitter();

    @Input() set selectedEvent(value: ScheduledEvent) {
        if (value) {
            this._selectedEvent = value;
            this.eventStartAsDate = this._selectedEvent.eventStartAsDate;
            this.eventEndAsDate = this._selectedEvent.eventEndAsDate;
            this.isAllDay = this._selectedEvent.isAllDay;
            this.recur_until = this._selectedEvent.eventStartAsDate;
        } else {
            this._selectedEvent = null;
            this.eventStartAsDate = null;
            this.eventEndAsDate = null;
            this.isAllDay = false;
        }
    }

    get selectedEvent(): ScheduledEvent {
        return this._selectedEvent;
    }

    constructor(
        private _fb: FormBuilder
    ) {
        this.scheduledEventEditorForm = this._fb.group({
            name: ['', Validators.required],
            eventStartDate: ['', Validators.required],
            eventStartTime: ['', Validators.required],
            eventEndDate: ['', Validators.required],
            eventEndTime: ['', Validators.required],
            isAllDay: [],
            repeatType: [],
            repeatEvery: [],
            end: [],
            recur_count: [],
            recur_until: [],
            repeatOnWeekDay: [],
            recur_monthday_radio: [],
            recur_monthday: [],
            recur_weekday_offset: [],
            recur_weekday: [],
            recur_year_radio: [],
            recur_month: []
        });
        this.scheduledEventEditorFormControls = this.scheduledEventEditorForm.controls;
        this.scheduledEventEditorForm.valueChanges.subscribe(() => {
            if (this.scheduledEventEditorForm.valid) {
                this.isValid.emit(true);
            } else {
                this.isValid.emit(false);
            }
        });
    }

    ngOnChanges() {
        // if (!this.userProfile) {
        //     this.userProfile = BlankUserProfile;
        // }
    }

    getEditedEvent(): ScheduledEvent {
        debugger;
        let scheduledEventEditorFormValues = this.scheduledEventEditorForm.value;
        return new ScheduledEvent({
            id: this.selectedEvent.id,
            name: scheduledEventEditorFormValues.name,
            eventStart: scheduledEventEditorFormValues.isAllDay ? moment.utc(this.eventStartAsDate).startOf('day') : moment(this.eventStartAsDate),
            eventEnd: scheduledEventEditorFormValues.isAllDay ? moment.utc(this.eventEndAsDate).endOf('day') : moment(this.eventEndAsDate),
            isAllDay: scheduledEventEditorFormValues.isAllDay
        });
    }

}
