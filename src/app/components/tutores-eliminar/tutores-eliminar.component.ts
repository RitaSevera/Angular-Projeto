import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TutoresService } from '../../services/tutores.service';
import { Tutores } from '../../models/tutores';

@Component({
  selector: 'app-tutores-eliminar',
  standalone: true,
  imports: [HttpClientModule, RouterLink, ReactiveFormsModule],
  providers: [TutoresService],
  templateUrl: './tutores-eliminar.component.html',
  styleUrl: './tutores-eliminar.component.scss'
})
export class TutoresEliminarComponent {
  tutor?: Tutores

  constructor(private route: ActivatedRoute, private router: Router, private tutoresService: TutoresService) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    console.log(id);
    if(id){
      this.tutoresService.getById(id).subscribe(result => this.tutor = result);
    }
  }

  delete(): void {
    console.log('Eliminar', this.tutor)

    if (this.tutor) {
      this.tutoresService.delete(this.tutor).subscribe(() => {
        console.log('Deleted successfully!');
        this.router.navigate(['']);
      });
    }
  }
}
