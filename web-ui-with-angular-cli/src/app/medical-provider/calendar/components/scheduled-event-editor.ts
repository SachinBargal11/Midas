import { FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';
import { ScheduledEvent } from '../../../commons/models/scheduled-event';
import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import * as moment from 'moment';
import * as _ from 'underscore';
import * as RRule from 'rrule';

@Component({
    selector: 'scheduled-event-editor',
    templateUrl: './scheduled-event-editor.html'
})


export class ScheduledEventEditorComponent implements OnChanges {

    private _selectedEvent: ScheduledEvent;
    eventStartAsDate: Date;
    eventEndAsDate: Date;
    isAllDay: boolean;
    repeatType: string = '0';
    repeatEvery: number = 1;
    end: string = '0';
    repeatOnWeekDay: string[] = [];
    recur_count: number = 0;
    recur_until: Date;
    recur_month_1: number = 1;
    recur_month_2: number = 1;
    recur_weekday: number = 1;
    recur_monthday_radio: string = '0';
    recur_monthday: number = 0;
    recur_weekday_offset: number = 1;
    recur_year_radio: string = '0';
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
        let scheduledEventEditorFormValues = this.scheduledEventEditorForm.value;
        let recurrenceRule: RRule;
        let recurrenceString: string = null;
        switch (this.repeatType) {
            case '1':
                let dailyRecurrenceCofig: any = {
                    freq: RRule.DAILY
                };
                if (scheduledEventEditorFormValues.repeatEvery > 1) {
                    dailyRecurrenceCofig.interval = scheduledEventEditorFormValues.repeatEvery;
                }
                switch (scheduledEventEditorFormValues.end) {
                    case '0':
                        break;
                    case '1':
                        dailyRecurrenceCofig.count = scheduledEventEditorFormValues.recur_count;
                        break;
                    case '2':
                        dailyRecurrenceCofig.until = scheduledEventEditorFormValues.recur_until;
                        break;
                }
                recurrenceRule = new RRule(dailyRecurrenceCofig);
                break;
            case '2':
                let weeklyRecurrenceCofig: any = {
                    freq: RRule.WEEKLY
                };
                if (scheduledEventEditorFormValues.repeatEvery > 1) {
                    weeklyRecurrenceCofig.interval = scheduledEventEditorFormValues.repeatEvery;
                }
                switch (scheduledEventEditorFormValues.end) {
                    case '0':
                        break;
                    case '1':
                        weeklyRecurrenceCofig.count = scheduledEventEditorFormValues.recur_count;
                        break;
                    case '2':
                        weeklyRecurrenceCofig.until = scheduledEventEditorFormValues.recur_until;
                        break;
                }
                if (scheduledEventEditorFormValues.repeatOnWeekDay.length > 0) {
                    weeklyRecurrenceCofig.byweekday = scheduledEventEditorFormValues.repeatOnWeekDay;
                }
                recurrenceRule = new RRule(weeklyRecurrenceCofig);
                break;
            case '3':
                let monthlyRecurrenceCofig: any = {
                    freq: RRule.MONTHLY
                };
                if (scheduledEventEditorFormValues.repeatEvery > 1) {
                    monthlyRecurrenceCofig.interval = scheduledEventEditorFormValues.repeatEvery;
                }
                switch (scheduledEventEditorFormValues.end) {
                    case '0':
                        break;
                    case '1':
                        monthlyRecurrenceCofig.count = scheduledEventEditorFormValues.recur_count;
                        break;
                    case '2':
                        monthlyRecurrenceCofig.until = scheduledEventEditorFormValues.recur_until;
                        break;
                }
                switch (scheduledEventEditorFormValues.recur_monthday_radio) {
                    case '0':
                        monthlyRecurrenceCofig.bymonthday = scheduledEventEditorFormValues.recur_monthday;
                        break;
                    case '1':
                        monthlyRecurrenceCofig.byweekday = scheduledEventEditorFormValues.recur_weekday;
                        monthlyRecurrenceCofig.bysetpos = scheduledEventEditorFormValues.recur_weekday_offset;
                        break;
                }
                recurrenceRule = new RRule(monthlyRecurrenceCofig);
                break;
            case '4':
                let yearlyRecurrenceCofig: any = {
                    freq: RRule.YEARLY
                };
                if (scheduledEventEditorFormValues.repeatEvery > 1) {
                    yearlyRecurrenceCofig.interval = scheduledEventEditorFormValues.repeatEvery;
                }
                switch (scheduledEventEditorFormValues.end) {
                    case '0':
                        break;
                    case '1':
                        yearlyRecurrenceCofig.count = scheduledEventEditorFormValues.recur_count;
                        break;
                    case '2':
                        yearlyRecurrenceCofig.until = scheduledEventEditorFormValues.recur_until;
                        break;
                }
                switch (scheduledEventEditorFormValues.recur_year_radio) {
                    case '0':
                        yearlyRecurrenceCofig.bymonth = scheduledEventEditorFormValues.recur_month;
                        yearlyRecurrenceCofig.bymonthday = scheduledEventEditorFormValues.recur_monthday;
                        break;
                    case '1':
                        yearlyRecurrenceCofig.byweekday = scheduledEventEditorFormValues.recur_weekday_offset;
                        yearlyRecurrenceCofig.bysetpos = scheduledEventEditorFormValues.recur_weekday;
                        yearlyRecurrenceCofig.bymonthday = scheduledEventEditorFormValues.recur_monthday;
                        break;
                }
                recurrenceRule = new RRule(yearlyRecurrenceCofig);
                break;

        }

        return new ScheduledEvent({
            id: this.selectedEvent.id,
            name: scheduledEventEditorFormValues.name,
            eventStart: scheduledEventEditorFormValues.isAllDay ? moment.utc(this.eventStartAsDate).startOf('day') : moment(this.eventStartAsDate),
            eventEnd: scheduledEventEditorFormValues.isAllDay ? moment.utc(this.eventEndAsDate).endOf('day') : moment(this.eventEndAsDate),
            isAllDay: scheduledEventEditorFormValues.isAllDay,
            recurrenceRule: recurrenceRule ? recurrenceRule : null
        });
    }

}
