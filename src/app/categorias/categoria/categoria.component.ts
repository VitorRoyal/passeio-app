import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CategoriaService } from '../categoria.service';

@Component({
  selector: 'app-categoria',
  standalone: false,
  templateUrl: './categoria.component.html',
  styleUrl: './categoria.component.scss'
})
export class CategoriaComponent {

  camposForm: FormGroup;

  constructor(private categoriaService: CategoriaService) {
    this.camposForm = new FormGroup({
      nome: new FormControl('', Validators.required),
      descricao: new FormControl('', Validators.required)
    });
  }

  salvar(){
    this.camposForm.markAllAsTouched();

    if(this.camposForm.valid){
      this.categoriaService
      .salvarCategoria(this.camposForm.value)
      .subscribe({
        next: categoria => {
          console.log('Categoria salva com sucesso', categoria);
          this.camposForm.reset();
        },
        error: error => console.error('Erro ao salvar categoria', error)
      })
    } else {
      console.log('Formulário inválido');
    }
  }

  camposInvalidos(nomeCampo: string): boolean {
    const campo = this.camposForm.get(nomeCampo);
    return campo?.invalid && campo.touched || false;
  }

}
