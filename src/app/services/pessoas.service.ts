import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IPessoa } from '../interfaces/pessoa.interface';

@Injectable({ providedIn: 'root' })
export class PessoasService {
  private apiUrl = '/api/pessoas';

  constructor(private http: HttpClient) {}

  getPessoas(): Observable<IPessoa[]> {
    return this.http.get<IPessoa[]>(this.apiUrl);
  }

  getPessoa(id: number): Observable<IPessoa> {
    return this.http.get<IPessoa>(`${this.apiUrl}/${id}`);
  }

  addPessoa(pessoa: Omit<IPessoa, 'id'>): Observable<IPessoa> {
    return this.http.post<IPessoa>(this.apiUrl, pessoa);
  }

  updatePessoa(id: number, pessoa: IPessoa): Observable<IPessoa> {
    return this.http.put<IPessoa>(`${this.apiUrl}/${id}`, pessoa);
  }

  deletePessoa(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
