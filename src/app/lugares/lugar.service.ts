import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Lugar } from './lugar';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LugarService {

  apiUrl = environment.apiUrl + '/lugares';

  constructor(private http: HttpClient) { }

  salvarLugar(lugar: Lugar) : Observable<Lugar> {
    return this.http.post<Lugar>(this.apiUrl, lugar);
  }

  obterTodosLugares() : Observable<Lugar[]> {
    return this.http.get<Lugar[]>(this.apiUrl);
  }

  filtrarLugaresPorNomeOuCategoria(nome: string, categoria: string) : Observable<Lugar[]> {
    let parametros = new HttpParams();
    if (nome) {
      parametros = parametros.set('nome_like', nome);
    }
    if (categoria && categoria !== '-1') {
      parametros = parametros.set('categoria', categoria);
    }

    return this.http.get<Lugar[]>(this.apiUrl, {
      params: parametros
    });
  }
}
