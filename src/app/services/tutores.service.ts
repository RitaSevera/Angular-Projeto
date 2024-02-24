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
  tutor: Array<Tutores> = []

  getAll(): Observable<Tutores[]> {
    return this.http.get<Tutores[]>(this.tutoresUrl);
  }
  getById(id: string): Observable<Tutores> {
    return this.http.get<Tutores>(`${this.tutoresUrl}/${id}`);
  }
  create(tutor: Tutores): Observable<Tutores> {
    return this.http.post<Tutores>(this.tutoresUrl, tutor);
  }
  update(tutor: Tutores): Observable<Tutores> {
    return this.http.put<Tutores>(`${this.tutoresUrl}/${tutor.id}`, tutor);
  }
  delete(tutor: Tutores): Observable<Tutores> {
    return this.http.delete<Tutores>(`${this.tutoresUrl}/${tutor.id}`);
  }
}
