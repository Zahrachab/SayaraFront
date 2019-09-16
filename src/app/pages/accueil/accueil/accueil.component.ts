import { Component, OnInit } from '@angular/core';
import {StockService} from '../../../services/stock.service';
import {CommandeService} from '../../../services/commande.service';
import {ModeleService} from '../../../services/modele.service';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss']
})
export class AccueilComponent implements OnInit {

  constructor(private stockService: StockService, private commandeService: CommandeService, private modeleService: ModeleService) { }
  private nbStock = 0;
  private nbCommandesValides = 0;
  private totalMoney = 0;
  private nbModeles = 0;
  private nbVersions = 0;
  private nbNouvellesCommandes = 0;


  ngOnInit() {
    this.stockService.getInfosMarque().subscribe( res => {
      this.nbStock = res.NbVehiculesDisponibles;
    });

    this.commandeService.getCommandesNouvelles().subscribe(res => {
      this.nbNouvellesCommandes = res.length;
    });

    this.commandeService.getCommandesValides().subscribe(res => {
      for (const commande of res) {
        this.totalMoney += commande.Montant;
      }
      this.nbCommandesValides = res.length;
    });

    this.modeleService.getModeles().subscribe(res => {
      this.nbModeles = res.length;
      for (const modele of res) {
        this.nbVersions += modele.versions.length;
      }
    });
  }

}
