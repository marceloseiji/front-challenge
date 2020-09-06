import { Component, OnInit } from '@angular/core';
import { EstablishmentService } from '../../shared/service/establishment.service';
import { ResponseEstablishment } from '../../shared/model/responseEstablishment.model';

@Component({
  selector: 'app-infos-form',
  templateUrl: './infos-form.component.html',
  styleUrls: ['./infos-form.component.scss']
})
export class InfosFormComponent implements OnInit {

  itemReceived: ResponseEstablishment = {
    address: "",
    email: "",
    guid: "",
    id: "",
    index: 0,
    latitude: "",
    longitude: "",
    name: "",
    phone: "",
    picture: "",
    registered: ""
  };

  constructor(
    private establishmentService: EstablishmentService,
  ) { }

  ngOnInit(): void {
    //item recebido do establishment.service itemSend que é um Subject
    this.establishmentService.itemSend.subscribe(item => {
      this.itemReceived = item
    });
  }

}
