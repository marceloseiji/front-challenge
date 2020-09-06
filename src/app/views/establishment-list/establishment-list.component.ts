import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseEstablishment } from 'src/app/shared/model/responseEstablishment.model';
import { EstablishmentService } from '../../shared/service/establishment.service';
@Component({
  selector: 'app-establishment-list',
  templateUrl: './establishment-list.component.html',
  styleUrls: ['./establishment-list.component.scss']
})
export class EstablishmentListComponent implements OnInit {

  establishments_getted$: Observable<ResponseEstablishment>;

  constructor(
    private establishmentService: EstablishmentService
  ) {}

  ngOnInit(): void {
    this.getEstablishments();
  }

  getEstablishments() {
    this.establishments_getted$ = this.establishmentService.getEstablishments();
    //this.establishmentService.getEstablishments().subscribe(res => console.log(res));
  }

  sendInfos(item) {
    this.establishmentService.showInfos(item); //Usa a função showInfos do serviço establihsment.service e envia o item recebido do componente
  }

}
