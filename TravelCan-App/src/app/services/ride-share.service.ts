import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RideDetails } from '../models/RideDetails';
import { RidePlanDetails} from '../models/RidePlanDetails';
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
export class RideShareService {

  url = 'http://127.0.0.1:5000';
  
  findride : RideDetails;
  
  constructor(private http: HttpClient) {
    
  }

  rides :RideDetails[] = [];

  getRideDetails(rideDetails: RideDetails): RidePlanDetails[]{  //correct method name to be added************************
    console.log('get ride share service called!');
    
    this.http.post<RideDetails>(`${this.url}/getRideDetails`, rideDetails, httpOptions).toPromise().then( data => {
      
      console.log('in service:', data);
      this.rides = []
      for(let key in data){
        console.log(key);
        if(data.hasOwnProperty(key)){
          console.log(data[key]);
          
          let ride = new RidePlanDetails();
          ride.firstName = data[key].firstName;
          ride.contactNumber = data[key].contactNumber;
         // ride.firstName = data[key].firstName + " " + data[key].lastName;
          //ride.lastName = data[key].lastName;
          //ride.contactNumber = data[key].contactNumber;
          console.log("fetched ride", ride)
          this.rides.push(ride);
          
          
        
        }
      }
    });
    console.log('final rides in service', this.rides);
    return this.rides;
  }

  addRideDetails(RideDetails: RideDetails) { //correct method name to be added************************
    console.log('addRideDetails method in service called');
    return this.http.post<RideDetails>(`${this.url}/addRideDetails`, RideDetails, httpOptions).toPromise()
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
