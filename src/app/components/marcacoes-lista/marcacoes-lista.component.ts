import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { MarcacoesService } from '../../services/marcacoes.service';
import { Subscription } from 'rxjs';
import { Marcacao } from '../../models/marcacao';
import { RouterLink } from '@angular/router';
import { AnimaisService } from '../../services/animais.service';
import { TutoresService } from '../../services/tutores.service';

@Component({
  selector: 'app-marcacoes-lista',
  standalone: true,
  imports: [HttpClientModule, RouterLink],
  providers: [MarcacoesService, AnimaisService, TutoresService],
  templateUrl: './marcacoes-lista.component.html',
  styleUrl: './marcacoes-lista.component.scss'
})
export class MarcacoesListaComponent {

marcacoes?: Marcacao[];
animais: any[] = [];
tutores: any[] = [];

marcacoesSubscription?: Subscription;


  constructor(private marcacoesService: MarcacoesService, private animaisService : AnimaisService, private tutoresService : TutoresService) {}

  ngOnInit() {
    this.marcacoesSubscription = this.marcacoesService.getAll().subscribe({
      next: (value) => {
        this.marcacoes = value;
      },
      error: (err) => {
        console.error('Erro ao carregar os dados!', err);
      },
    });
    this.animaisService.getAll().subscribe({
      next: (animais) => {
        this.animais = animais;
      },
      error: (err) => {
        console.error('Erro a carregar informações', err);
      },
    });
    this.tutoresService.getAll().subscribe({
      next: (tutores) => {
        this.tutores = tutores;
      },
      error: (err) => {
        console.error('Erro a carregar informações', err);
      },
    });
  }

  ngOnDestroy() {
    this.marcacoesSubscription?.unsubscribe();
  }

  nomeAnimal(animalId : string): string {
    const animal = this.animais?.find (a => a.id === animalId);
    return animal? animal.nome : 'Animal não encontrado'
  }

  nomeTutor(tutorId : string): string {
    const tutor = this.tutores?.find (a => a.id === tutorId);
    return tutor? tutor.nome : 'Tutor não encontrado'
  }
}
