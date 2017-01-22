import { Component } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from 'jquery';

@Component({
    selector: 'main-nav',
    templateUrl: './main-nav.html'
})

export class MainNavComponent {
    constructor(private _router: Router) {
        //Toggle mobile menu
        $('.hamburger').click(function () {
            if ($('body').hasClass('menu-left-opened')) {
                $(this).removeClass('is-active');
                $('body').removeClass('menu-left-opened');
                $('html').css('overflow', 'auto');
            } else {
                $(this).addClass('is-active');
                $('body').addClass('menu-left-opened');
                $('html').css('overflow', 'hidden');
            }
        });
        $('.mobile-menu-left-overlay').click(function () {
            $('.hamburger').removeClass('is-active');
            $('body').removeClass('menu-left-opened');
            $('html').css('overflow', 'auto');
        });
    }

    isCurrentRoute(route) {
    }
}

