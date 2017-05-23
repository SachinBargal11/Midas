import {Component, Input} from '@angular/core';

@Component({
    selector: 'loader',
    template: '<i *ngIf="visible" class="fa fa-circle-o-notch fa-spin"></i>'
})

export class LoaderComponent {
    @Input() visible = true;
}