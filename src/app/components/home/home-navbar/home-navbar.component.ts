import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-navbar',
  templateUrl: './home-navbar.component.html',
  styleUrls: ['./home-navbar.component.css']
})
export class HomeNavbarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    const btn = document.querySelector("button.mn-button");
    const menu = document.querySelector(".mobile-menu");
    
    btn!.addEventListener("click", () => {
      menu!.classList.toggle("hidden");
    });
  }

}
