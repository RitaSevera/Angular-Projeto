import { Component } from '@angular/core';
import { AnimaisService } from '../../services/animais.service';
import { HttpClientModule } from '@angular/common/http';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-animais-editar',
  standalone: true,
  imports: [HttpClientModule, ReactiveFormsModule, RouterLink],
  providers: [AnimaisService],
  templateUrl: './animais-editar.component.html',
  styleUrl: './animais-editar.component.scss'
})
export class AnimaisEditarComponent {
  formularioAnimal: FormGroup = new FormGroup({
    nome: new FormControl('', Validators.required),
    especie: new FormControl('', Validators.required),
    raca: new FormControl('', Validators.required),
    sexo: new FormControl('', Validators.required),
    dataNascimento: new FormControl('', Validators.required),
    tutorId: new FormControl('', Validators.required),
  });
  submitted: boolean = false;
  criarSubscription?:Subscription;

  animalId: string = '';

  constructor(private route: ActivatedRoute, private animaisService: AnimaisService, private router: Router) {}

  handleSubmit(): void {
    this.submitted = true;

    if (this.formularioAnimal.valid) {
      this.criarSubscription = this.animaisService
        .update({
          id: this.animalId,
          nome: this.formularioAnimal.controls['nome'].value,
          especie: this.formularioAnimal.controls['especie'].value,
          raca: this.formularioAnimal.controls['raca'].value,
          sexo: this.formularioAnimal.controls['sexo']?.value,
          dataNascimento: this.formularioAnimal.controls['dataNascimento']?.value,
          tutorId: this.formularioAnimal.controls['tutorId']?.value,
        })
        .subscribe({
          next: (value) => {
            this.router.navigate(['']);
          },
          error: (err) => {
            console.error('Erro ao editar o animal!', err);
          },
        });
    }
  }
    ngOnInit(){
      this.animalId = this.route.snapshot.paramMap.get('id') || '';

      this.animaisService.getById(this.animalId).subscribe((animal)=>{

      this.formularioAnimal.controls['nome'].setValue(animal.nome);
      this.formularioAnimal.controls['especie'].setValue(animal.especie);
      this.formularioAnimal.controls['raca'].setValue(animal.raca);
      this.formularioAnimal.controls['sexo'].setValue(animal.sexo);
      this.formularioAnimal.controls['dataNascimento'].setValue(animal.dataNascimento);
      this.formularioAnimal.controls['tutorId']?.setValue(animal.tutorId);
    });
  }
  ngOnDestroy() {
    this.criarSubscription?.unsubscribe();
    }
  }
