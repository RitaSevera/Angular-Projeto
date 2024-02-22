import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tutores } from '../models/tutores';

@Injectable({
  providedIn: 'root'
})
export class TutoresService {

  constructor(private http: HttpClient) { }

  tutoresUrl = 'http://localhost:3000/tutores'

  getAll(): Observable<Tutores[]> {
    return this.http.get<Tutores[]>(this.tutoresUrl);
  }
  getById(id: string): Observable<Tutores> {
    return this.http.get<Tutores>(`${this.tutoresUrl}/${id}`);
  }
  create(marcacao: Tutores): Observable<Tutores> {
    return this.http.post<Tutores>(this.tutoresUrl, marcacao);
  }
  update(marcacao: Tutores): Observable<Tutores> {
    return this.http.put<Tutores>(`${this.tutoresUrl}/${marcacao.id}`, marcacao);
  }
  delete(marcacao: Tutores): Observable<Tutores> {
    return this.http.delete<Tutores>(`${this.tutoresUrl}/${marcacao.id}`);
  }
}
