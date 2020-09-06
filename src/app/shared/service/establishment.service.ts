import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseEstablishment } from '../model/responseEstablishment.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EstablishmentService {

  apiUrl = "https://my-json-server.typicode.com/james-delivery/frontend-challenge/establishments";

  //Subject que showInfos utiliza para enviar o item para 
  public itemSend = new Subject<any>();

  constructor(private httpClient: HttpClient) { }

  public getEstablishments(): Observable<ResponseEstablishment> {
    return this.httpClient.get<ResponseEstablishment>(this.apiUrl);
  }

  //Mostra as informações do item recebido por establishment-list.component > establishment-list.component.ts
  //Quem vai receber esse item é o componente infos-form-component.ts
  showInfos(item) {
    this.itemSend.next(item);
  }
}
