import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CommonsModule } from '../../commons/commons-module';
import { CalendarComponent } from './components/calendar';
import { ScheduledEventService } from './services/scheduled-event-service';
import { ScheduledEventStore } from './stores/scheduled-event-store';

import { ScheduledEventEditorComponent } from './components/scheduled-event-editor';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        CommonsModule
    ],
    declarations: [
        CalendarComponent,
        ScheduledEventEditorComponent
    ],
    providers: [
        ScheduledEventService,
        ScheduledEventStore
    ]
})
export class CalendarModule { }
