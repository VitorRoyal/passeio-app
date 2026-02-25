import { Component } from '@angular/core';
import { Perfil } from './perfil.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landingpage',
  standalone: false,
  templateUrl: './landingpage.component.html',
  styleUrl: './landingpage.component.scss'
})
export class LandingpageComponent {

  profile: Perfil | undefined;

  constructor(private router: Router) {}

  navegarParaGaleria(){
    this.router.navigate(['/paginas/galeria']);
  }

  logarComGoogle(){

  }

  isLoggedIn() : boolean {
    return !!this.profile;
  }

}
