import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from './shared-module';
import { AddProviderComponent } from '../components/pages/providers/add-provider';
import { ProvidersListComponent } from '../components/pages/providers/providers-list';
import { UpdateProviderComponent } from '../components/pages/providers/update-provider';
import { ProvidersService } from '../services/providers-service';
import { ProvidersStore } from '../stores/providers-store';
@NgModule({
    imports: [CommonModule, RouterModule, SharedModule],
    declarations: [
        AddProviderComponent,
        ProvidersListComponent,
        UpdateProviderComponent
    ],
    providers: [
        ProvidersService,
        ProvidersStore
    ]
})
export class ProviderModule { }
