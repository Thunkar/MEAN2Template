import { Component, Inject, HostListener,OnInit } from '@angular/core';
import { ScrollSpyModule, ScrollSpyService } from 'ng2-scrollspy';
import { PageScrollInstance, PageScrollService } from 'ng2-page-scroll/ng2-page-scroll';
import { DOCUMENT } from "@angular/platform-browser";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.less']
})
export class NavComponent implements OnInit {

  navScroll = 0;
  width = 0;

  constructor(private scrollSpyService: ScrollSpyService, private pageScrollService: PageScrollService, @Inject(DOCUMENT) private document: Document) {
    this.width = window.innerWidth;
  }

  ngAfterViewInit() {
    this.scrollSpyService.getObservable('window').subscribe((e: any) => {
      this.navScroll = e.currentTarget.scrollY;
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.width = event.target.innerWidth;
  }

  ngOnInit() {
  }

}
