import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TutoresService } from '../../services/tutores.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tutores-editar',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, HttpClientModule],
  providers: [TutoresService],
  templateUrl: './tutores-editar.component.html',
  styleUrl: './tutores-editar.component.scss'
})
export class TutoresEditarComponent {
  formularioTutor: FormGroup = new FormGroup({
    nome: new FormControl('', Validators.required),
    telemovel: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
  });

  submitted: boolean = false;
  criarSubscription?:Subscription;

  tutorId: string = '';

  constructor(private route: ActivatedRoute, private tutoresService : TutoresService, private router: Router){ }

  handleSubmit(): void {
    this.submitted = true;

    if (this.formularioTutor.valid) {
      this.criarSubscription = this.tutoresService
        .update({
          id: this.tutorId,
          nome: this.formularioTutor.controls['nome'].value,
          telemovel: this.formularioTutor.controls['telemovel'].value,
          email: this.formularioTutor.controls['email'].value,
        })
        .subscribe({
          next: (value) => {
            this.router.navigate(['']);
          },
          error: (err) => {
            console.error('Erro ao editar o tutor!', err);
          },
        });
    }
  }
  ngOnInit(){
    this.tutorId = this.route.snapshot.paramMap.get('id') || '';

    this.tutoresService.getById(this.tutorId).subscribe((tutor)=>{

    this.formularioTutor.controls['nome'].setValue(tutor.nome);
    this.formularioTutor.controls['telemovel'].setValue(tutor.telemovel);
    this.formularioTutor.controls['email'].setValue(tutor.email);
  });
}
  ngOnDestroy() {
    this.criarSubscription?.unsubscribe();
}

}
