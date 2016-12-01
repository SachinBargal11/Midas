import { Routes } from '@angular/router';
import { ValidateActiveSession } from './guards/validate-active-session';
import { RoomsComponent } from '../components/pages/rooms/rooms';
import { AddRoomComponent } from '../components/pages/rooms/add-room';
import { EditRoomComponent } from '../components/pages/rooms/edit-room';

export const RoomsRoutes: Routes = [
    {
        path: 'rooms',
        component: RoomsComponent,
        canActivate: [ValidateActiveSession]
    },
    {
        path: 'rooms/add',
        component: AddRoomComponent,
        canActivate: [ValidateActiveSession]
    },
    {
        path: 'rooms/edit/:id',
        component: EditRoomComponent,
        canActivate: [ValidateActiveSession]
    }
];