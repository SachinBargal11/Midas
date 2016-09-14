import {Component, Input} from '@angular/core';

@Component({
    selector: 'progress-bar',
    template: `
        <div *ngIf="visible" class="loader"></div>
    `,
    styles: [`
            .loader {
              height: 2px;
              width: 100%;
              position: relative;
              overflow: hidden;
              background-color: #ddd;
            }
            .loader:before{
              display: block;
              position: absolute;
              content: "";
              left: -200px;
              width: 200px;
              height: 4px;
              background-color: #2980b9;
              animation: loading 2s linear infinite;
            }
            
            @keyframes loading {
                from {left: -200px; width: 30%;}
                50% {width: 30%;}
                70% {width: 70%;}
                80% { left: 50%;}
                95% {left: 120%;}
                to {left: 100%;}
            }
    `]
})

export class ProgressBarComponent {
    @Input() visible = true;
}