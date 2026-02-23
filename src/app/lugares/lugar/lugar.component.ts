import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Categoria } from '../../categorias/categoria';
import { CategoriaService } from '../../categorias/categoria.service';
import { LugarService } from '../lugar.service';

@Component({
  selector: 'app-lugar',
  standalone: false,
  templateUrl: './lugar.component.html',
  styleUrl: './lugar.component.scss'
})
export class LugarComponent implements OnInit {

  camposForm: FormGroup;
  categorias: Categoria[] = []; 

  constructor(private categoriaService: CategoriaService, private lugarService: LugarService) {
    this.camposForm = new FormGroup({
        nome: new FormControl('', Validators.required),
        categoria: new FormControl('', Validators.required),
        localizacao: new FormControl('', Validators.required),
        urlFoto: new FormControl(''),
        avaliacao: new FormControl(0, [Validators.required, Validators.min(0), Validators.max(5)])
    })
  }

  salvarFormulario(){
    this.camposForm.markAllAsTouched();

    if(this.camposForm.valid){
      console.log('Formulário válido:', this.camposForm.valid);
      console.log('Dados do formulário:', this.camposForm.value);
      this.lugarService.salvarLugar(this.camposForm.value).subscribe({
        next: (lugarSalvo) => {
          console.log('Lugar salvo com sucesso:', lugarSalvo);
          this.camposForm.reset();
        },
        error: error => console.error('Erro ao salvar lugar:', error)
      });
    }
  }

  ngOnInit(): void {
    this.categoriaService.obterTodasCategorias().subscribe({
      next: (listaCategorias) => this.categorias = listaCategorias,
      error: error => console.error('Erro ao obter categorias', error)
    });
  }

  camposInvalidos(nomeCampo: string): boolean {
    const campo = this.camposForm.get(nomeCampo);
    return campo?.invalid && campo.touched || false;
  }

}
