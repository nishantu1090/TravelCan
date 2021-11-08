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
        console.log(key);
        if(data.hasOwnProperty(key)){
          console.log(data[key]);
          
          let buddy = new TravelBuddy();
          buddy.name = data[key].name;
          buddy.destination = data[key].destination;
          buddy.origin = data[key].origin;
          buddy.email = data[key].email;
          this.buddies.push(buddy);
          
          
        
        }
      }
    });
    console.log('final buddies in service', this.buddies);
    return this.buddies;
  }
}


