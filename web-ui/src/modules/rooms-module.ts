import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from './shared-module';
import { AddRoomComponent } from '../components/pages/rooms/add-room';
import { EditRoomComponent } from '../components/pages/rooms/edit-room';
import { RoomsComponent } from '../components/pages/rooms/rooms';
import { RoomsService } from '../services/rooms-service';
import { RoomsStore } from '../stores/rooms-store';
@NgModule({
    imports: [CommonModule, RouterModule, SharedModule],
    declarations: [
        AddRoomComponent,
        EditRoomComponent,
        RoomsComponent
    ],
    providers: [
        RoomsService,
        RoomsStore
    ]
})
export class RoomsModule { }
