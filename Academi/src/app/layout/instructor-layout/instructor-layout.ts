import { Component, OnInit } from '@angular/core';
import { Sidebart } from "../../features/instructor/components/sidebar/sidebar";
import { Header } from "../../features/instructor/components/header/header.component";
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'selector-name',
    standalone: true,
    imports: [Sidebart, Header, RouterOutlet],
    template: `<section>
  <app-header></app-header>
  <app-sidebar ></app-sidebar>
  <main class="w-full mt-14 bg-white  lg:ps-[250px] py-2 px-1 md:px-4 ">
      <router-outlet></router-outlet>
  </main>
</section>`
})

export class InstructorLayout implements OnInit {
    constructor() { }

    ngOnInit() { }
}