import { Component, OnInit } from '@angular/core';
import { Router, Route } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  filterKeyWord;
  constructor(private routerService: Router) { }

  ngOnInit() {

  }
  //TODO change name of the event method
  onGotoJobsOffers() {
    this.routerService.navigate(['jobOffers'], { queryParams: { keyword: this.filterKeyWord } });
    console.log(this.filterKeyWord);
  }

  handleKeydown(event: KeyboardEvent) {
    if(event.key === "Enter" ){
      this.onGotoJobsOffers();
    }
  }
}
