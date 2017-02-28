import { Component, Inject, HostListener, ViewChild } from '@angular/core';
import { PageScrollInstance, PageScrollService } from 'ng2-page-scroll/ng2-page-scroll';
import { DOCUMENT } from "@angular/platform-browser";
import { NgForm } from '@angular/forms';

@Component({
    selector: 'landing',
    templateUrl: 'app/landing/landing.html',
    styleUrls: ['app/landing/landing.css']
})
export class LandingComponent {
    width = 0;

    @HostListener('window:resize', ['$event'])
    onResize(event: any) {
        this.width = event.target.innerWidth;
    }

}