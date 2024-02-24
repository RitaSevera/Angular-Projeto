import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { TutoresService } from '../../services/tutores.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tutores-criar',
  standalone: true,
  imports: [HttpClientModule, ReactiveFormsModule, RouterLink],
  providers: [TutoresService],
  templateUrl: './tutores-criar.component.html',
  styleUrl: './tutores-criar.component.scss'
})
export class TutoresCriarComponent {
  formularioTutor: FormGroup = new FormGroup({
    nome: new FormControl('', Validators.required),
    telemovel: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
  });

  criarSubscription?: Subscription;
  submitted: boolean = false;

  constructor(private tutoresService : TutoresService, private router: Router) {}

  handleSubmit(): void {
    this.submitted = true;

    if (this.formularioTutor.valid) {
      this.criarSubscription = this.tutoresService
        .create({
          nome: this.formularioTutor.controls['nome'].value,
          telemovel: this.formularioTutor.controls['telemovel'].value,
          email: this.formularioTutor.controls['email'].value,
        })
        .subscribe({
          next: (value) => {
            this.router.navigate(['']);
          },
          error: (err) => {
            console.error('Erro ao adicionar novo tutor!', err);
          },
        });
    }
  }
  ngOnDestroy() {
    this.criarSubscription?.unsubscribe();
  }
}
