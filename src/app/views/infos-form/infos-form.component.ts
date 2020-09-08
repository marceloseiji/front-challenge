import { Component, OnInit } from '@angular/core';
import { EstablishmentService } from '../../shared/service/establishment.service';
import { ResponseEstablishment } from '../../shared/model/responseEstablishment.model';
import { LocalStorageService } from 'ngx-webstorage';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HomeComponent } from '../home/home.component';
import { EstablishmentListComponent } from '../establishment-list/establishment-list.component';

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
    public homeComponent: HomeComponent,
    public establishmentListComponent: EstablishmentListComponent
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

  //Item a receber update
  itemToUpdate: ResponseEstablishment = {
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

  //Itens do endereço splitados
  adressInfos = {
    $street: "",
    $city: "",
    $state: "",
    $zipCode: ""
  }

  bancoSelected;
  contaSelected;
  saqueAutomatico;

  willSave;

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

  //Função do EstablishmentListComponent para atualizar a lista
  reload = this.establishmentListComponent.reload;

  savedMessage(message, action) {
    this.snackBar.open(message, action, {duration: 3000});
  }
  nothingSavedMessage(message, action) {
    this.snackBar.open(message, action, {duration: 3000});
  }
  savedPropsMessage = [];

  public changeEstablishment() {
    //Variável que monta o novo endereço
    const newAddress =`${this.adressInfos.$street},${this.adressInfos.$city},${this.adressInfos.$state},${this.adressInfos.$zipCode}`;
    this.itemToUpdate.address = newAddress;

    for (var prop in this.itemReceived) {
      if (this.itemReceived[prop] != this.itemToUpdate[prop] &&
          this.itemToUpdate[prop] != "" &&
          this.itemToUpdate[prop] != undefined
         ) {
        this.savedPropsMessage.push([prop]);
        this.willSave = true;
      } else {
        this.itemToUpdate[prop] = this.itemReceived[prop];
      }
    }

    if(this.willSave) {
      this.storage.store('Establishment Item' + this.itemReceived.id, this.itemToUpdate);
      this.savedMessage("Items salvos: " + this.savedPropsMessage, "x");
      this.willSave = false;
      this.savedPropsMessage = [];
    } else {
      this.nothingSavedMessage("Nada para salvar", "x");
      this.willSave = false;
    }
    
  }

  ngOnInit(): void {
    //item recebido do establishment.service itemSend que é um Subject
    this.establishmentService.itemSend.subscribe(item => {
      this.itemReceived.address = item.address;
      this.itemReceived.id = item.id;
      this.itemReceived.picture = item.picture;
      this.itemReceived.name = item.name;
      this.itemReceived.banco = item.banco;
      this.itemReceived.agencia = item.agencia;
      this.itemReceived.contaDigito = item.contaDigito;
      this.itemReceived.contaNumero = item.contaNumero;
      this.itemReceived.saqueAutomatico = item.saqueAutomatico;
      this.itemReceived.tipoConta = item.tipoConta;
      this.itemReceived.agenciaDigito = item.agenciaDigito;
      this.itemReceived.cpfCnpj = item.cpfCnpj;

      //Bind no form
      this.bancoSelected = item.banco;
      this.contaSelected = item.tipoConta;

      //Corta o endereço para salvar em partes
      const cut = this.itemReceived.address.split(",");

      this.adressInfos.$street = cut[0];
      this.adressInfos.$city = cut[1];
      this.adressInfos.$state = cut[2];
      this.adressInfos.$zipCode = cut[3];

      document.getElementById("sendSubmit").classList.remove('disabled');
      document.getElementById("sendSubmit").removeAttribute("disabled"); 

    });
  }
}
