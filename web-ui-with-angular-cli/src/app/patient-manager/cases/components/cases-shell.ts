import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
    selector: 'cases-shell',
    templateUrl: './cases-shell.html'
})

export class CaseShellComponent implements OnInit {

    constructor(
        public router: Router
    ) {

    }

    ngOnInit() {

    }

}