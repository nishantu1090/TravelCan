import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TravelBuddy } from '../models/TravelBuddy';


 
@Injectable({
  providedIn: 'root'
})
export class TravelBuddyService {
  url = 'http://127.0.0.1:5000';
  
  travelBuddy : TravelBuddy;
  
  constructor(private http: HttpClient) {
    
  }
 
  buddies :TravelBuddy[] = [];

  getTravelBuddies(): TravelBuddy[]{
    console.log('service called!');
    
    this.http.get(`${this.url}/getTravelBuddies`).toPromise().then( data => {
      
      console.log('in service:',this.buddies);

      for(let key in data){
        if(data.hasOwnProperty(key)){
          
          data[key].forEach(element => {
            console.log(element.name);
            let buddy = new TravelBuddy();
            buddy.name = element.name;
            buddy.email = element.email;
            buddy.doj = element.doj;
            console.log(buddy);
            this.buddies.push(buddy);
          });
          
        
        }
      }
    });
    console.log('final buddies in service', this.buddies);
    return this.buddies;
  }
}


