import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseEstablishment } from 'src/app/shared/model/responseEstablishment.model';
import { EstablishmentService } from '../../shared/service/establishment.service';
import { LocalStorageService } from 'ngx-webstorage';
@Component({
  selector: 'app-establishment-list',
  templateUrl: './establishment-list.component.html',
  styleUrls: ['./establishment-list.component.scss']
})

export class EstablishmentListComponent implements OnInit {

  establishments_getted$: Observable<ResponseEstablishment>;

  $street: any;
  $city: any;
  $state: any;
  $zipCode: any;
  $formatedAddress: string;
  retrievedItem;

  constructor(
    private establishmentService: EstablishmentService,
    private storage:LocalStorageService,
  ) {}

  ngOnInit(): void {
    this.getEstablishments();
  }

  getEstablishments() {
    this.establishments_getted$ = this.establishmentService.getEstablishments();
    //this.establishmentService.getEstablishments().subscribe(res => console.log(res));
  }

  //Usa a função showInfos do serviço establihsment.service e envia o item recebido do componente
  sendInfos(item) {
    this.establishmentService.showInfos(item);
  }

  cutAddress(address) {
    let cut = address.split(",");

    this.$street = cut[0];
    this.$city = cut[1];
    this.$state = cut[2];
    this.$zipCode = cut[3];

    this.$formatedAddress = `${this.$city} \u00A0 | \u00A0 ${this.$street}, \u00A0${this.$state}\u00A0 - \u00A0${this.$city}`;
    return this.$formatedAddress;
  }

  validateItem(item) {
    this.retrievedItem = this.storage.retrieve('Establishment Item' + item.id);

    if(this.retrievedItem) {
      console.log(this.retrievedItem);

      item.name = this.retrievedItem.name;
      item.address = this.retrievedItem.address;
    }
  }

}
