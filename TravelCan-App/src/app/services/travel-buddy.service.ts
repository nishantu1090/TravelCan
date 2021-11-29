import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TravelBuddy } from '../models/TravelBuddy';
import { TravelPlan} from '../models/TravelPlan';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
    
  })
};

 
@Injectable({
  providedIn: 'root'
})
export class TravelBuddyService {
  url = 'http://127.0.0.1:5000';
  
  travelBuddy : TravelBuddy;
  
  constructor(private http: HttpClient) {
    
  }
 
  buddies :TravelBuddy[] = [];

  getTravelBuddies(travelPlan: TravelPlan): TravelBuddy[]{
    console.log('get travel buddy service called!');
    
    this.http.post<TravelPlan>(`${this.url}/getTravelBuddies`, travelPlan, httpOptions).toPromise().then( data => {
      
      console.log('in service:', data);
      this.buddies = []
      for(let key in data){
        console.log(key);
        if(data.hasOwnProperty(key)){
          console.log(data[key]);
          
          let buddy = new TravelBuddy();
          buddy.firstName = data[key].firstName + " " + data[key].lastName;
          buddy.lastName = data[key].lastName;
          buddy.email = data[key].email;
          buddy.phoneNumber = data[key].phoneNumber;
          console.log("fetched buddy", buddy)
          this.buddies.push(buddy);
          
          
        
        }
      }
    });
    console.log('final buddies in service', this.buddies);
    return this.buddies;
  }

  addTravelPlan(travelPlan: TravelPlan) {
    console.log('addTravelPlan method in service called');
    return this.http.post<TravelPlan>(`${this.url}/addTravelPlan`, travelPlan, httpOptions).toPromise()
    .then(this.extractData)
		.catch(this.handleErrorPromise);
  }

  private extractData(res: any) {
    let body = res;
    console.log('after post data', body)
    return body;
  }
  private handleErrorPromise(error: Response | any) {
    console.error(error.message || error);
    return Promise.reject(error.message || error);
  } 
  
}


