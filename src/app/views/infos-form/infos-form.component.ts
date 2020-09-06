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

  $street: any;
  $city: any;
  $state: any;
  $zipCode: any;

  constructor(
    private establishmentService: EstablishmentService,
  ) { }

  ngOnInit(): void {
    //item recebido do establishment.service itemSend que é um Subject
    this.establishmentService.itemSend.subscribe(item => {
      this.itemReceived = item
      
      const cut = this.itemReceived.address.split(",");

      this.$street = cut[0];
      this.$city = cut[1];
      this.$state = cut[2];
      this.$zipCode = cut[3];

      console.log("street: ", this.$street)
      console.log("city: ", this.$city)
      console.log("state: ", this.$state)
      console.log("zipCode: ", this.$zipCode)
      
    });
  }

}
