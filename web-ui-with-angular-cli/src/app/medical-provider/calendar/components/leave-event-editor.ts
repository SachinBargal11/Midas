import { FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';
import { ScheduledEvent } from '../../../commons/models/scheduled-event';
import { LeaveEvent } from '../../../commons/models/leave-event';
import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import * as moment from 'moment';
import * as _ from 'underscore';
import * as RRule from 'rrule';

@Component({
    selector: 'leave-event-editor',
    templateUrl: './leave-event-editor.html'
})


export class LeaveEventEditorComponent implements OnChanges {

    private _selectedEvent: ScheduledEvent;
    eventStartAsDate: Date;
    eventEndAsDate: Date;

    leaveEventEditorForm: FormGroup;
    leaveEventEditorFormControls;
    @Output() isValid = new EventEmitter();

    @Input() set selectedEvent(value: ScheduledEvent) {
        if (value) {
            this._selectedEvent = value;
            this.eventStartAsDate = this._selectedEvent.eventStartAsDate;
            this.eventEndAsDate = this._selectedEvent.eventEndAsDate;
        } else {
            this._selectedEvent = null;
            this.eventStartAsDate = null;
            this.eventEndAsDate = null;
        }
    }

    get selectedEvent(): ScheduledEvent {
        return this._selectedEvent;
    }

    constructor(
        private _fb: FormBuilder
    ) {
        this.leaveEventEditorForm = this._fb.group({
            eventStartDate: ['', Validators.required],
            eventEndDate: ['', Validators.required]
        });
        this.leaveEventEditorFormControls = this.leaveEventEditorForm.controls;
        this.leaveEventEditorForm.valueChanges.subscribe(() => {
            if (this.leaveEventEditorForm.valid) {
                this.isValid.emit(true);
            } else {
                this.isValid.emit(false);
            }
        });
    }

    ngOnChanges() {
    }

    // getEditedEvent(): ScheduledEvent {
    //     let leaveEventEditorFormValues = this.leaveEventEditorForm.value;
    //     return new ScheduledEvent(_.extend(this.selectedEvent.toJS(), {
    //         eventStart: leaveEventEditorFormValues.isAllDay ? moment.utc(this.eventStartAsDate).startOf('day') : moment(this.eventStartAsDate),
    //         eventEnd: leaveEventEditorFormValues.isAllDay ? moment.utc(this.eventEndAsDate).endOf('day') : moment(this.eventEndAsDate)
    //     }));
    // }
    getEditedEvent(): LeaveEvent {
        let leaveEventEditorFormValues = this.leaveEventEditorForm.value;
        return new LeaveEvent({
            eventStart: leaveEventEditorFormValues.isAllDay ? moment.utc(this.eventStartAsDate).startOf('day') : moment(this.eventStartAsDate),
            eventEnd: leaveEventEditorFormValues.isAllDay ? moment.utc(this.eventEndAsDate).endOf('day') : moment(this.eventEndAsDate)
        });
    }

}
