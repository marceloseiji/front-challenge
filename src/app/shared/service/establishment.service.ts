import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseEstablishment } from '../model/responseEstablishment.model';

@Injectable({
  providedIn: 'root'
})
export class EstablishmentService {

  apiUrl = "https://my-json-server.typicode.com/james-delivery/frontend-challenge/establishments";

  constructor(private httpClient: HttpClient) { }

  public getEstablishments(): Observable<ResponseEstablishment> {
    return this.httpClient.get<ResponseEstablishment>(this.apiUrl);
  }
}
