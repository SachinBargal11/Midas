import { ScheduledEvent } from '../../../commons/models/scheduled-event';
import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment';
import * as _ from 'underscore';

@Component({
    selector: 'scheduled-event-editor',
    templateUrl: './scheduled-event-editor.html'
})


export class ScheduledEventEditorComponent implements OnInit {

    private _selectedEvent: ScheduledEvent;
    eventStartAsDate: Date;
    eventEndAsDate: Date;

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
    ) {
    }

    ngOnInit() {

    }

    getEditedEvent(): ScheduledEvent {
        return new ScheduledEvent({
            name: 'Updated Event'
        });
    }

}
