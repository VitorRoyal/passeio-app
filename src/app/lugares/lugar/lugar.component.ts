import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Categoria } from '../../categorias/categoria';
import { CategoriaService } from '../../categorias/categoria.service';

@Component({
  selector: 'app-lugar',
  standalone: false,
  templateUrl: './lugar.component.html',
  styleUrl: './lugar.component.scss'
})
export class LugarComponent implements OnInit {

  camposForm: FormGroup;
  categorias: Categoria[] = []; 

  constructor(private categoriaService: CategoriaService) {
    this.camposForm = new FormGroup({
        nome: new FormControl('', Validators.required),
        categoria: new FormControl('', Validators.required),
        localizacao: new FormControl('', Validators.required),
        urlFoto: new FormControl(''),
        avaliacao: new FormControl(0, [Validators.required, Validators.min(0), Validators.max(5)])
    })
  }

  salvarFormulario(){
    console.log('Formulário válido:', this.camposForm.valid);
    console.log('Dados do formulário:', this.camposForm.value);
  }

  ngOnInit(): void {
    this.categoriaService.obterTodasCategorias().subscribe({
      next: (listaCategorias) => this.categorias = listaCategorias,
      error: error => console.error('Erro ao obter categorias', error)
    });
  }

}
