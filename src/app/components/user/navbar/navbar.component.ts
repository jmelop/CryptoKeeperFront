import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    const btn = document.querySelector("button.mn-button");
    const menu = document.querySelector(".mobile-menu");

    btn!.addEventListener("click", () => {
      menu!.classList.toggle("hidden");
    });
  }
}
