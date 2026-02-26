import { Component } from '@angular/core';
import { Perfil } from './perfil.model';
import { Router } from '@angular/router';
import { AuthgoogleService } from '../authgoogle.service';

@Component({
  selector: 'app-landingpage',
  standalone: false,
  templateUrl: './landingpage.component.html',
  styleUrl: './landingpage.component.scss'
})
export class LandingpageComponent {

  profile: Perfil | undefined;

  constructor(private router: Router, private loginService: AuthgoogleService) {}

  navegarParaGaleria(){
    this.router.navigate(['/paginas/galeria']);
  }

  logarComGoogle(){
    this.loginService.login();  
  }

  isLoggedIn() : boolean {
    const dadosGoogle = this.loginService.getLoggedProfile();
    console.log(dadosGoogle);
    this.profile = dadosGoogle;
    return !!this.profile;
  }

}
