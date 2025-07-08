import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Pessoa {
  id: number;
  nome: string;
  cpf: string;
  sexo: string;
  email: string;
  telefone: string;
}

@Injectable({ providedIn: 'root' })
export class PessoasService {
  private apiUrl = '/api/pessoas';

  constructor(private http: HttpClient) {}

  getPessoas(): Observable<Pessoa[]> {
    return this.http.get<Pessoa[]>(this.apiUrl);
  }

  getPessoa(id: number): Observable<Pessoa> {
    return this.http.get<Pessoa>(`${this.apiUrl}/${id}`);
  }

  addPessoa(pessoa: Omit<Pessoa, 'id'>): Observable<Pessoa> {
    return this.http.post<Pessoa>(this.apiUrl, pessoa);
  }

  updatePessoa(id: number, pessoa: Pessoa): Observable<Pessoa> {
    return this.http.put<Pessoa>(`${this.apiUrl}/${id}`, pessoa);
  }

  deletePessoa(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
