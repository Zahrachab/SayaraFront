import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  private sousMenus: any;
  private user: any;
  constructor(private router: Router) {
    if (this.router.url.split('/')[1] === 'gestion') {
        this.sousMenus = [
          {
            nom: 'Modeles',
            lien: '/gestion/modeles'
          },
          {
            nom: 'Versions',
            lien: '/gestion/versions'
          },
          {
            nom: 'Options',
            lien: '/gestion/options'
          },
          {
            nom: 'Couleurs',
            lien: '/gestion/couleurs'
          }
        ];
    } else if (this.router.url.split('/')[1] === 'commandes') {
      this.sousMenus = [
        {
          nom: 'tous',
          lien: '/commandes/tous'
        },
        {
          nom: 'validées',
          lien: '/commandes/valides'
        },
        {
          nom: 'annulées',
          lien: '/commandes/annulees'
        },
        {
          nom: 'nouvelles',
          lien: '/commandes/nouvelles'
        }
      ];
    }
    else if (this.router.url.split('/')[1] === 'stock') {
      this.sousMenus = [
        {
          nom: 'vehicules',
          lien: '/stock/vehicules'
        },
        {
          nom: 'Importer',
          lien: '/stock/importer'
        }
        ];
    }
    else if (this.router.url.split('/')[1] === 'tarifs') {
      this.sousMenus = [
        {
          nom: 'Versions',
          lien: '/tarifs/versions'
        },
        {
          nom: 'Options',
          lien: '/tarifs/options'
        },
        {
          nom: 'Couleurs',
          lien: '/tarifs/couleurs'
        },
        {
          nom: 'Importer fichier',
          lien: '/tarifs/upload'
        }
      ];
    }

    else if (this.router.url.split('/')[1] === 'simulation') {
      this.sousMenus = [
      ];
    }


    this.user = JSON.parse(localStorage.getItem('utilisateur'));
  }

  ngOnInit() {
  }


}
