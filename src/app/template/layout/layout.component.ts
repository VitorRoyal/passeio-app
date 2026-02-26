import { Component, OnInit } from '@angular/core';
import { LayoutPropriedades } from './layoutpropriedades';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthgoogleService } from '../../authgoogle.service';

@Component({
  selector: 'app-layout',
  standalone: false,
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent implements OnInit {

  propriedades: LayoutPropriedades = {
    titulo: '',
    subTitulo: ''
  };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private loginService: AuthgoogleService
  ){}

  ngOnInit(): void {
    this.router.events
    .subscribe(() => {
      this.propriedades = this.obterPropriedadeLayout();
    });
  }

  obterPropriedadeLayout(): LayoutPropriedades {
    let rotaFilha = this.route.firstChild;

    while (rotaFilha?.firstChild) {
      rotaFilha = rotaFilha.firstChild;
    }

    return rotaFilha?.snapshot.data as LayoutPropriedades;
  }

  logout(){
    this.loginService.logout();
  }
}
