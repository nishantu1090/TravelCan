import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AccommodationDetails} from '../models/AccommodationDetails';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';
import { AccommodationResponse } from '../models/AccommodationResponse';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
    
  })
};

@Injectable({
  providedIn: 'root'
})
export class AccommodationService {

  url = 'http://127.0.0.1:5000';
  
  accommodationDetails : AccommodationDetails;
  
  constructor(private http: HttpClient) {
    
  }

  accommodations : AccommodationDetails[] = [];
  accommodationResponse : AccommodationResponse[] = [];

  getAccommodationDetails(accommodationDetails: AccommodationDetails): AccommodationResponse[]{
    console.log('get accommodation details service called!');
    console.log('in service accommodation details', accommodationDetails);
    
    this.http.post<AccommodationDetails>(`${this.url}/getAccommodationDetails`, accommodationDetails, httpOptions).toPromise().then( data => {
      
      console.log('in service:', data);

      for(let key in data){
        console.log(key);
        if(data.hasOwnProperty(key)){
          console.log(data[key]);
          
          let acc_response = new AccommodationResponse();
          
          acc_response.address = data[key].address;
          acc_response.landlordName = data[key].landlordName;
          acc_response.landlordPhone = data[key].landlordPhone;
          console.log("fetched accommodation", acc_response)
          this.accommodationResponse.push(acc_response);
        }
      }
    });
    console.log('final accommodations in service', this.accommodationResponse);
    return this.accommodationResponse;
  }

  addAccommodations(accommodationDetails: AccommodationDetails) {
    console.log('addAccommodation method in service called');
    return this.http.post<AccommodationDetails>(`${this.url}/addAccommodations`, accommodationDetails, httpOptions).toPromise()
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
