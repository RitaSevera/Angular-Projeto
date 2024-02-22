import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Animais } from '../models/animais';

@Injectable({
  providedIn: 'root'
})
export class AnimaisService {

  constructor(private http: HttpClient) { }

  animaisUrl = 'http://localhost:3000/animais'

  getAll(): Observable<Animais[]> {
    return this.http.get<Animais[]>(this.animaisUrl);
  }
  getById(id: string): Observable<Animais> {
    return this.http.get<Animais>(`${this.animaisUrl}/${id}`);
  }
  create(marcacao: Animais): Observable<Animais> {
    return this.http.post<Animais>(this.animaisUrl, marcacao);
  }
  update(marcacao: Animais): Observable<Animais> {
    return this.http.put<Animais>(`${this.animaisUrl}/${marcacao.id}`, marcacao);
  }
  delete(marcacao: Animais): Observable<Animais> {
    return this.http.delete<Animais>(`${this.animaisUrl}/${marcacao.id}`);
  }
}
