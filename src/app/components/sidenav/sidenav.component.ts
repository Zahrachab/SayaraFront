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
    } else if (this.router.url.split('/')[1] === 'stock') {
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
          nom: 'Upload Fichier',
          lien: '/tarifs/upload'
        }
      ];
    } else if (this.router.url.split('/')[1] === 'commandes') {
      this.sousMenus = [
        {
          nom: 'tous',
          lien: '/commandes/tous'
        },
        {
          nom: 'prépayées',
          lien: '/commandes/prepayees'
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
    this.user = JSON.parse(localStorage.getItem('utilisateur'));
  }

  ngOnInit() {
  }


}
