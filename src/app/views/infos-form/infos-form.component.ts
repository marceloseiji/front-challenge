import { Component, OnInit } from '@angular/core';
import { EstablishmentService } from '../../shared/service/establishment.service';
import { ResponseEstablishment } from '../../shared/model/responseEstablishment.model';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-infos-form',
  templateUrl: './infos-form.component.html',
  styleUrls: ['./infos-form.component.scss'],
})
export class InfosFormComponent implements OnInit {

  //Item original recebido
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

  //Informações adicionais do item recebido
  otherInfos = {
    $street: "",
    $city: "",
    $state: "",
    $zipCode: "",
    $banco: "",
    $tipoConta: "",
    $cpfCnpj: "",
    $agencia: "",
    $agenciaDigito: "",
    $contaNumero: "",
    $contaDigito: "",
    $saqueAutomatico: "",
  }

  $bancos = [
    {nome: 'Banco do Brasil'},
    {nome: 'Bradesco'},
    {nome: 'Itaú'}
  ];

  $contas = [
    {tipo: 'Conta corrente'},
    {tipo: 'Poupança'}
  ];

  $saqueOpcoes = [
    {tipo: 'Sim'},
    {tipo: 'Não'}
  ];

  constructor(
    private establishmentService: EstablishmentService,
    private storage:LocalStorageService,
  ) { }

  public changeEstablishment() {
    const newAddress = `${this.otherInfos.$street},${this.otherInfos.$city},${this.otherInfos.$state},${this.otherInfos.$zipCode},
    `;

    let updatedItem = {
      address: newAddress,
      id: this.itemReceived.id,
      name: this.itemReceived.name,
      banco: this.otherInfos.$banco,
      tipoConta: this.otherInfos.$tipoConta,
      cpfCnpj: this.otherInfos.$cpfCnpj,
      agencia: this.otherInfos.$agencia,
      agenciaDigito: this.otherInfos.$agenciaDigito,
      contaNumero: this.otherInfos.$contaNumero,
      contaDigito: this.otherInfos.$contaDigito,
      saqueAutomatico: this.otherInfos.$saqueAutomatico
    }
    this.storage.store('Establishment Item' + updatedItem.id, updatedItem);
    console.log("Novo item: ", updatedItem);
  }

  ngOnInit(): void {
    //item recebido do establishment.service itemSend que é um Subject
    this.establishmentService.itemSend.subscribe(item => {
      this.itemReceived = item

      const cut = this.itemReceived.address.split(",");

      this.otherInfos.$street = cut[0];
      this.otherInfos.$city = cut[1];
      this.otherInfos.$state = cut[2];
      this.otherInfos.$zipCode = cut[3];
      
      document.getElementById("sendSubmit").classList.remove('disabled');
      document.getElementById("sendSubmit").removeAttribute("disabled"); 

    });
  }
}
