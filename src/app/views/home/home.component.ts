import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  showHide() {
    let form = document.getElementById("form");
    let list = document.getElementById("list");

    if(form.style.display == "block") {
      form.style.display = "none";
    } else {
      form.style.display = "block";
    }
    if(list.style.display == "block") {
      list.style.display = "none";
    } else {
      list.style.display = "block";
    }
  }

}
