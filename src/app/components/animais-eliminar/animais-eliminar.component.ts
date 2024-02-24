import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AnimaisService } from '../../services/animais.service';
import { Animais } from '../../models/animais';
import { MarcacoesService } from '../../services/marcacoes.service';

@Component({
  selector: 'app-animais-eliminar',
  standalone: true,
  imports: [HttpClientModule, RouterLink, ReactiveFormsModule],
  providers: [AnimaisService],
  templateUrl: './animais-eliminar.component.html',
  styleUrl: './animais-eliminar.component.scss'
})
export class AnimaisEliminarComponent {

  animal?: Animais

  constructor(private route: ActivatedRoute, private router: Router, private animaisService : AnimaisService) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    console.log(id);
    if(id){
      this.animaisService.getById(id).subscribe(result => this.animal = result);
    }
  }

  delete(): void {

    console.log('Eliminar', this.animal)

    if (this.animal) {
      this.animaisService.delete(this.animal).subscribe(() => {
        console.log('Deleted successfully!');
        this.router.navigate(['']);
      });
    }
  }

}
