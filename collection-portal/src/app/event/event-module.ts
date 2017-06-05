import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CommonsModule } from '../commons/commons-module';
import { EventComponent } from './components/event';
import { AddEventComponent } from './components/add-event';
import { EventShellComponent } from './components/event-shell';
import { EventRoutingModule } from './event-routes';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        CommonsModule,
        EventRoutingModule
    ],
    declarations: [
        EventShellComponent,
        EventComponent,
        AddEventComponent
    ],
    providers: [
    ]
})
export class EventModule {
}