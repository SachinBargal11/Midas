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
    transportProviderId: number = 0;
    referredBy: string = '';
    private _selectedEvent: ScheduledEvent;
    eventStartAsDate: Date;
    eventEndAsDate: Date;
    duration: number;
    isAllDay: boolean = false;
    repeatType: string = '7';

    // Daily 
    daily_end: string = '0';
    daily_recur_until: Date;
    daily_recur_count: number = 0;
    daily_repeatEvery: number = 1;

    // weekly
    weekly_end: string = '0';
    weekly_recur_until: Date;
    weekly_recur_count: number = 0;
    weekly_repeatEvery: number = 1;
    weekly_repeatOnWeekDay: any = [];

    // monthly
    monthly_end: string = '0';
    monthly_recur_until: Date;
    monthly_recur_count: number = 0;
    monthly_repeatEvery: number = 1;
    monthly_recur_monthday_radio: string = '0';
    monthly_recur_weekday_offset: number | number[] = 1;
    monthly_recur_monthday: number | number[] = 0;
    monthly_recur_weekday: number | number[] | RRule.Weekday | RRule.Weekday[] = 1;

    // yearly
    yearly_end: string = '0';
    yearly_recur_until: Date;
    yearly_recur_count: number = 0;
    yearly_repeatEvery: number = 1;
    yearly_recur_year_radio: string = '0';
    yearly_recur_month_1: number | number[] = 1;
    yearly_recur_month_2: number | number[] = 1;
    yearly_recur_monthday: number | number[] = 0;
    yearly_recur_weekday_offset: number | number[] = 1;
    yearly_recur_weekday: number | number[] | RRule.Weekday | RRule.Weekday[] = 1;


    scheduledEventEditorForm: FormGroup;
    scheduledEventEditorFormControls;
    @Output() isValid = new EventEmitter();

    @Input() set selectedEvent(value: ScheduledEvent) {
        if (value) {
            this._selectedEvent = value;
            this.eventStartAsDate = this._selectedEvent.eventStartAsDate;
            this.duration = moment.duration(this._selectedEvent.eventEnd.diff(this._selectedEvent.eventStart)).asMinutes();
            this.eventEndAsDate = this._selectedEvent.eventEndAsDate;
            // this.isAllDay = this._selectedEvent.isAllDay;

            if (this._selectedEvent.recurrenceRule) {
                let options = this._selectedEvent.recurrenceRule.options;
                switch (options.freq) {
                    case RRule.DAILY:
                        this.repeatType = '3';
                        this.daily_repeatEvery = options.interval;
                        if (options.count > 1) {
                            this.daily_end = '1';
                            this.daily_recur_count = options.count;
                        } else if (options.until) {
                            this.daily_end = '2';
                            this.daily_recur_until = options.until;
                        }
                        break;
                    case RRule.WEEKLY:
                        this.repeatType = '2';
                        this.monthly_repeatEvery = options.interval;
                        if (options.count > 1) {
                            this.weekly_end = '1';
                            this.weekly_recur_count = options.count;
                        } else if (options.until) {
                            this.weekly_end = '2';
                            this.weekly_recur_until = options.until;
                        }
                        if (options.byweekday) {
                            this.weekly_repeatOnWeekDay = options.byweekday;
                        }
                        break;
                    case RRule.MONTHLY:
                        this.repeatType = '1';
                        this.monthly_repeatEvery = options.interval;

                        if (options.bymonthday) {
                            this.monthly_recur_monthday_radio = '0';
                            this.monthly_recur_monthday = options.bymonthday;
                        }
                        if (options.byweekday || options.bysetpos) {
                            this.monthly_recur_monthday_radio = '1';
                            this.monthly_recur_weekday = options.byweekday;
                            this.monthly_recur_weekday_offset = options.bysetpos;
                        }
                        if (options.count > 1) {
                            this.monthly_end = '1';
                            this.monthly_recur_count = options.count;
                        } else if (options.until) {
                            this.monthly_end = '2';
                            this.monthly_recur_until = options.until;
                        }
                        break;
                    case RRule.YEARLY:
                        this.repeatType = '0';
                        this.yearly_repeatEvery = options.interval;
                        if (options.bymonth || options.bymonthday) {
                            this.yearly_recur_year_radio = '0';
                            this.yearly_recur_month_1 = options.bymonth;
                            this.yearly_recur_monthday = options.bymonthday;
                        }
                        if (options.byweekday || options.bysetpos || options.bymonthday) {
                            this.yearly_recur_year_radio = '1';
                            this.yearly_recur_month_2 = options.bymonthday;
                            this.yearly_recur_weekday_offset = options.bysetpos;
                            this.yearly_recur_weekday = options.byweekday;
                        }
                        if (options.count > 1) {
                            this.yearly_end = '1';
                            this.yearly_recur_count = options.count;
                        } else if (options.until) {
                            this.yearly_end = '2';
                            this.yearly_recur_until = options.until;
                        }
                        break;
                }
            } else {
                this.repeatType = '7';
            }
        } else {
            this._selectedEvent = null;
            this.eventStartAsDate = null;
            this.eventEndAsDate = null;
            // this.isAllDay = false;
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
            eventStartTime: [''],
            duration: ['', Validators.required],
            // eventEndDate: ['', Validators.required],
            // eventEndTime: [''],
            // isAllDay: [],
            repeatType: [],
            dailyInfo: this._fb.group({
                end: [],
                repeatEvery: [],
                recur_count: [],
                recur_until: []
            }),
            weeklyInfo: this._fb.group({
                end: [],
                repeatEvery: [],
                recur_count: [],
                recur_until: [],
                repeatOnWeekDay: []
            }),
            monthlyInfo: this._fb.group({
                end: [],
                repeatEvery: [],
                recur_count: [],
                recur_until: [],
                recur_monthday_radio: [],
                recur_monthday: [],
                recur_weekday: [],
                recur_weekday_offset: []
            }),
            yearlyInfo: this._fb.group({
                end: [],
                repeatEvery: [],
                recur_count: [],
                recur_until: [],
                recur_year_radio: [],
                recur_month: [],
                recur_weekday_offset: [],
                recur_monthday: [],
                recur_weekday: []
            }),
            transportProviderId: [''],
            referredBy: ['']
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
        // console.log(changes._selectedEvent);
    }

    getEditedEvent(): ScheduledEvent {
        let scheduledEventEditorFormValues = this.scheduledEventEditorForm.value;
        let recurrenceRule: RRule;
        let recurrenceString: string = null;
        let repeatType = parseInt(scheduledEventEditorFormValues.repeatType, 10);
        switch (this.repeatType) {
            case '3':
                let dailyRecurrenceConfig: any = {
                    freq: RRule.DAILY
                };
                if (scheduledEventEditorFormValues.dailyInfo.repeatEvery > 1) {
                    dailyRecurrenceConfig.interval = scheduledEventEditorFormValues.dailyInfo.repeatEvery;
                }
                switch (scheduledEventEditorFormValues.dailyInfo.end) {
                    case '0':
                        break;
                    case '1':
                        dailyRecurrenceConfig.count = scheduledEventEditorFormValues.dailyInfo.recur_count;
                        break;
                    case '2':
                        dailyRecurrenceConfig.until = scheduledEventEditorFormValues.dailyInfo.recur_until;
                        break;
                }
                recurrenceRule = new RRule(dailyRecurrenceConfig);
                break;
            case '2':
                let weeklyRecurrenceConfig: any = {
                    freq: RRule.WEEKLY
                };
                if (scheduledEventEditorFormValues.weeklyInfo.repeatEvery > 1) {
                    weeklyRecurrenceConfig.interval = scheduledEventEditorFormValues.weeklyInfo.repeatEvery;
                }
                switch (scheduledEventEditorFormValues.weeklyInfo.end) {
                    case '0':
                        break;
                    case '1':
                        weeklyRecurrenceConfig.count = scheduledEventEditorFormValues.weeklyInfo.recur_count;
                        break;
                    case '2':
                        weeklyRecurrenceConfig.until = scheduledEventEditorFormValues.weeklyInfo.recur_until;
                        break;
                }
                if (scheduledEventEditorFormValues.weeklyInfo.repeatOnWeekDay.length > 0) {
                    weeklyRecurrenceConfig.byweekday = scheduledEventEditorFormValues.weeklyInfo.repeatOnWeekDay;
                }
                recurrenceRule = new RRule(weeklyRecurrenceConfig);
                break;
            case '1':
                let monthlyRecurrenceConfig: any = {
                    freq: RRule.MONTHLY
                };
                if (scheduledEventEditorFormValues.monthlyInfo.repeatEvery > 1) {
                    monthlyRecurrenceConfig.interval = scheduledEventEditorFormValues.monthlyInfo.repeatEvery;
                }
                switch (scheduledEventEditorFormValues.monthlyInfo.end) {
                    case '0':
                        break;
                    case '1':
                        monthlyRecurrenceConfig.count = scheduledEventEditorFormValues.monthlyInfo.recur_count;
                        break;
                    case '2':
                        monthlyRecurrenceConfig.until = scheduledEventEditorFormValues.monthlyInfo.recur_until;
                        break;
                }
                switch (scheduledEventEditorFormValues.monthlyInfo.recur_monthday_radio) {
                    case '0':
                        monthlyRecurrenceConfig.bymonthday = scheduledEventEditorFormValues.monthlyInfo.recur_monthday;
                        break;
                    case '1':
                        monthlyRecurrenceConfig.byweekday = scheduledEventEditorFormValues.monthlyInfo.recur_weekday;
                        monthlyRecurrenceConfig.bysetpos = scheduledEventEditorFormValues.monthlyInfo.recur_weekday_offset;
                        break;
                }
                recurrenceRule = new RRule(monthlyRecurrenceConfig);
                break;
            case '0':
                let yearlyRecurrenceConfig: any = {
                    freq: RRule.YEARLY
                };
                if (scheduledEventEditorFormValues.yearlyInfo.repeatEvery > 1) {
                    yearlyRecurrenceConfig.interval = scheduledEventEditorFormValues.yearlyInfo.repeatEvery;
                }
                switch (scheduledEventEditorFormValues.yearlyInfo.end) {
                    case '0':
                        break;
                    case '1':
                        yearlyRecurrenceConfig.count = scheduledEventEditorFormValues.yearlyInfo.recur_count;
                        break;
                    case '2':
                        yearlyRecurrenceConfig.until = scheduledEventEditorFormValues.yearlyInfo.recur_until;
                        break;
                }
                switch (scheduledEventEditorFormValues.yearlyInfo.recur_year_radio) {
                    case '0':
                        yearlyRecurrenceConfig.bymonth = scheduledEventEditorFormValues.yearlyInfo.recur_month;
                        yearlyRecurrenceConfig.bymonthday = scheduledEventEditorFormValues.yearlyInfo.recur_monthday;
                        break;
                    case '1':
                        yearlyRecurrenceConfig.byweekday = scheduledEventEditorFormValues.yearlyInfo.recur_weekday_offset;
                        yearlyRecurrenceConfig.bysetpos = scheduledEventEditorFormValues.yearlyInfo.recur_weekday;
                        yearlyRecurrenceConfig.bymonthday = scheduledEventEditorFormValues.yearlyInfo.recur_monthday;
                        break;
                }
                recurrenceRule = new RRule(yearlyRecurrenceConfig);
                break;

        }
        return new ScheduledEvent(_.extend(this.selectedEvent.toJS(), {
            name: scheduledEventEditorFormValues.name,
            eventStart: moment(this.eventStartAsDate),
            eventEnd: moment(this.eventStartAsDate).add(this.duration, 'minutes'),
            // eventStart: scheduledEventEditorFormValues.isAllDay ? moment.utc(this.eventStartAsDate).startOf('day') : moment(this.eventStartAsDate),
            // eventEnd: scheduledEventEditorFormValues.isAllDay ? moment.utc(this.eventStartAsDate).endOf('day') : moment(this.eventStartAsDate).add(this.duration, 'minutes'),
            // isAllDay: scheduledEventEditorFormValues.isAllDay,
            recurrenceRule: recurrenceRule ? recurrenceRule : null,
            transportProviderId: parseInt(scheduledEventEditorFormValues.transportProviderId)
        }));
    }

}
