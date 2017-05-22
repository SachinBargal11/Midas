import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
    selector: 'shell',
    template: `
    <router-outlet></router-outlet>
    `
})

export class ShellComponent implements OnInit {

    constructor(
        public router: Router
    ) {

    }

    ngOnInit() {

    }

}