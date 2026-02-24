import { Component, OnInit } from '@angular/core';
import { Lugar } from '../../lugares/lugar';
import { Categoria } from '../../categorias/categoria';
import { CategoriaService } from '../../categorias/categoria.service';
import { LugarService } from '../../lugares/lugar.service';

@Component({
  selector: 'app-galeria',
  standalone: false,
  templateUrl: './galeria.component.html',
  styleUrl: './galeria.component.scss'
})
export class GaleriaComponent implements OnInit {

  lugares: Lugar[] = [];
  categoriasFiltradas: Categoria[] = [];
  nomeFiltrado: string = '';
  categoriaFiltrada: string = '';

  constructor(
    private lugarService: LugarService,
    private categoriaService: CategoriaService
  ) { }
  
  ngOnInit(): void {
    this.categoriaService.obterTodasCategorias()
    .subscribe(categorias => {
      this.categoriasFiltradas = categorias;
    });

    this.lugarService.obterTodosLugares()
    .subscribe(lugaresResposta => {
      this.lugares = lugaresResposta;
    });
  }

  pegarTotalEstrelas(lugar: Lugar): string {
    return '★'.repeat(lugar.avaliacao || 0) + '☆'.repeat(5 - (lugar.avaliacao || 0));
  }

  filtraResultado(){
    this.lugarService.filtrarLugaresPorNomeOuCategoria(this.nomeFiltrado, this.categoriaFiltrada)
    .subscribe(lugaresResposta => {
      this.lugares = lugaresResposta;
    });
  }

}
