import { Component, OnInit } from '@angular/core';
import { EstablishmentService } from '../../shared/service/establishment.service';
import { ResponseEstablishment } from '../../shared/model/responseEstablishment.model';
import { LocalStorageService } from 'ngx-webstorage';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HomeComponent } from '../home/home.component'

@Component({
  selector: 'app-infos-form',
  templateUrl: './infos-form.component.html',
  styleUrls: ['./infos-form.component.scss'],
})

export class InfosFormComponent implements OnInit {

  constructor(
    private establishmentService: EstablishmentService,
    private storage: LocalStorageService,
    private snackBar: MatSnackBar,
    public homeComponent: HomeComponent
  ) { }

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
    registered: "",
    banco: "",
    agencia: "",
    contaDigito: "",
    contaNumero: "",
    saqueAutomatico: "",
    tipoConta: "",
    agenciaDigito: "",
    cpfCnpj: ""
  };

  //Informações adicionais do item recebido
  otherInfos = {
    $street: "",
    $city: "",
    $state: "",
    $zipCode: ""
  }

  bancoSelected;
  contaSelected;
  saqueAutomatico;

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

  //Função do home.component.ts
  showHide = this.homeComponent.showHide;

  openSnackBar(message, action) {
    this.snackBar.open(message, action, {duration: 1000});
  }

  public changeEstablishment() {
    const newAddress = `${this.otherInfos.$street},${this.otherInfos.$city},${this.otherInfos.$state},${this.otherInfos.$zipCode},
    `;

    let updatedItem = {
      address: newAddress,
      id: this.itemReceived.id,
      name: this.itemReceived.name,
      picture: this.itemReceived.picture,
      banco: this.itemReceived.banco,
      tipoConta: this.itemReceived.tipoConta,
      cpfCnpj: this.itemReceived.cpfCnpj,
      agencia: this.itemReceived.agencia,
      agenciaDigito: this.itemReceived.agenciaDigito,
      contaNumero: this.itemReceived.contaNumero,
      contaDigito: this.itemReceived.contaDigito,
      saqueAutomatico: this.itemReceived.saqueAutomatico
    }
    this.storage.store('Establishment Item' + updatedItem.id, updatedItem);
    console.log("Novo item: ", updatedItem);
  }

  ngOnInit(): void {
    //item recebido do establishment.service itemSend que é um Subject
    this.establishmentService.itemSend.subscribe(item => {
      this.itemReceived = item
      this.itemReceived.contaNumero = item.contaNumero;

      this.bancoSelected = item.banco;
      this.contaSelected = item.tipoConta;

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
