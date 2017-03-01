import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class ServiceClient {
  private apiUrl: string = "api";

  constructor(private http: Http) {
    
  }
  
  private addHeaders(headers) : void {
    headers.add("Content-Type", "application/json");
  }

  get(url: string) {
    console.time(url);

    return this.http.get(`${this.apiUrl}/${url}`)
      .do(next => console.timeEnd(url))
      .map(this.extractData)
      .catch(this.handleError);
  }

  private extractData(response: Response) {
    let body = response.json();
    return body.data || { };
  }

  private handleError(error: Response | any) {
    let errorMessage: string;
    if(error instanceof Response) {
      const body = error.json() || "";
      const message = body.error || JSON.stringify(body);
      errorMessage = `${error.status} - ${error.statusText || ""} ${message}`;
    }
    else {
      errorMessage = error.message ? error.message : error.toString();
    }

    console.error(errorMessage);
    return Observable.throw(errorMessage);
  }
}