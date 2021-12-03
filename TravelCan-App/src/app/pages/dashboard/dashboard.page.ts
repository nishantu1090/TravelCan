import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  constructor(private router : Router) { }

  ngOnInit() {
  }
  
  routeToTravelBuddy(){
    
    this.router.navigate(['travel-buddy']);
  }
  
  routeToRideShare(){
    
    this.router.navigate(['ride-share'])
  }
  
  routeToAccommodation(){
    this.router.navigate(['accommodation'])
  }
  
}
