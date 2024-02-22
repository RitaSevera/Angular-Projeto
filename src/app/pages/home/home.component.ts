import { Component } from '@angular/core';
import { MarcacoesListaComponent } from "../../components/marcacoes-lista/marcacoes-lista.component";
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
    imports: [MarcacoesListaComponent, RouterLink]
})
export class HomeComponent {
marcacoes: any;

}
