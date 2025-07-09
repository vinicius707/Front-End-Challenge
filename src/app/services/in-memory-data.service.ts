import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const pessoas = [
      {
        id: 1,
        nome: 'João Silva',
        cpf: '12345678900',
        sexo: 'M',
        email: 'joao.silva@email.com',
        telefone: '11999991111',
      },
      {
        id: 2,
        nome: 'Maria Santos',
        cpf: '98765432100',
        sexo: 'F',
        email: 'maria.santos@email.com',
        telefone: '11888882222',
      },
      {
        id: 3,
        nome: 'Pedro Oliveira',
        cpf: '45678912300',
        sexo: 'M',
        email: 'pedro.oliveira@email.com',
        telefone: '11777773333',
      },
      {
        id: 4,
        nome: 'Ana Costa',
        cpf: '78912345600',
        sexo: 'F',
        email: 'ana.costa@email.com',
        telefone: '11666664444',
      },
      {
        id: 5,
        nome: 'Carlos Ferreira',
        cpf: '32165498700',
        sexo: 'M',
        email: 'carlos.ferreira@email.com',
        telefone: '11555555555',
      },
      {
        id: 6,
        nome: 'Alex Santos',
        cpf: '14725836900',
        sexo: 'O',
        email: 'alex.santos@email.com',
        telefone: '11444447777',
      },
    ];
    return { pessoas };
  }
}
