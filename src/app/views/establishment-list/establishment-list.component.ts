import { Component, OnInit } from '@angular/core';
import { EstablishmentService } from '../../shared/service/establishment.service';
@Component({
  selector: 'app-establishment-list',
  templateUrl: './establishment-list.component.html',
  styleUrls: ['./establishment-list.component.scss']
})
export class EstablishmentListComponent implements OnInit {

  establishments_getted: any;

  constructor(
    public establishmentService: EstablishmentService
  ) {}

  ngOnInit(): void {
    this.getEstablishments();
  }

  getEstablishments() {
    this.establishmentService.getEstablishments().subscribe(data => {
      this.establishments_getted = data;
      console.log(this.establishments_getted);
    })
  }

}
