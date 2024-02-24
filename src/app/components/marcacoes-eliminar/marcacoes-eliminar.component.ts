import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MarcacoesService } from '../../services/marcacoes.service';
import { Marcacao } from '../../models/marcacao';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-marcacoes-eliminar',
  standalone: true,
  imports: [HttpClientModule, RouterLink, ReactiveFormsModule],
  providers: [MarcacoesService],
  templateUrl: './marcacoes-eliminar.component.html',
  styleUrl: './marcacoes-eliminar.component.scss'
})
export class MarcacoesEliminarComponent {

  marcacao?: Marcacao

  constructor(private route: ActivatedRoute, private router: Router, private marcacaoService: MarcacoesService) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    console.log(id);
    if(id){
      this.marcacaoService.getById(id).subscribe(result => this.marcacao = result);
    }
  }

  delete(): void {

    console.log('Eliminar', this.marcacao)

    if (this.marcacao) {
      this.marcacaoService.delete(this.marcacao).subscribe(() => {
        console.log('Deleted successfully!');
        this.router.navigate(['']);
      });
    }
  }
}
