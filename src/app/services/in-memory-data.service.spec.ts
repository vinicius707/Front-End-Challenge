import { TestBed } from '@angular/core/testing';
import { InMemoryDataService } from './in-memory-data.service';

describe('InMemoryDataService', () => {
  let service: InMemoryDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InMemoryDataService],
    });
    service = TestBed.inject(InMemoryDataService);
  });

  it('deve ser criado', () => {
    expect(service).toBeTruthy();
  });

  describe('createDb', () => {
    it('deve retornar um objeto com array de pessoas', () => {
      const db = service.createDb();

      expect(db).toBeDefined();
      expect(db.pessoas).toBeDefined();
      expect(Array.isArray(db.pessoas)).toBe(true);
    });

    it('deve retornar pessoas com estrutura correta', () => {
      const db = service.createDb();
      const pessoas = db.pessoas;

      expect(pessoas.length).toBeGreaterThan(0);

      pessoas.forEach((pessoa) => {
        expect(pessoa.id).toBeDefined();
        expect(pessoa.nome).toBeDefined();
        expect(pessoa.cpf).toBeDefined();
        expect(pessoa.sexo).toBeDefined();
        expect(pessoa.email).toBeDefined();
        expect(pessoa.telefone).toBeDefined();

        expect(typeof pessoa.id).toBe('number');
        expect(typeof pessoa.nome).toBe('string');
        expect(typeof pessoa.cpf).toBe('string');
        expect(typeof pessoa.sexo).toBe('string');
        expect(typeof pessoa.email).toBe('string');
        expect(typeof pessoa.telefone).toBe('string');
      });
    });

    it('deve retornar pessoas com CPF e telefone numéricos', () => {
      const db = service.createDb();
      const pessoas = db.pessoas;

      pessoas.forEach((pessoa) => {
        // CPF deve conter apenas números (11 dígitos)
        expect(pessoa.cpf).toMatch(/^\d{11}$/);

        // Telefone deve conter apenas números
        expect(pessoa.telefone).toMatch(/^\d+$/);
      });
    });

    it('deve retornar pessoas com valores válidos para sexo', () => {
      const db = service.createDb();
      const pessoas = db.pessoas;

      pessoas.forEach((pessoa) => {
        expect(['M', 'F', 'O']).toContain(pessoa.sexo);
      });
    });

    it('deve retornar pessoas com formato de email válido', () => {
      const db = service.createDb();
      const pessoas = db.pessoas;

      pessoas.forEach((pessoa) => {
        expect(pessoa.email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
      });
    });

    it('deve retornar IDs únicos para cada pessoa', () => {
      const db = service.createDb();
      const pessoas = db.pessoas;
      const ids = pessoas.map((p) => p.id);

      const uniqueIds = [...new Set(ids)];
      expect(uniqueIds.length).toBe(ids.length);
    });

    it('deve retornar CPFs únicos para cada pessoa', () => {
      const db = service.createDb();
      const pessoas = db.pessoas;
      const cpfs = pessoas.map((p) => p.cpf);

      const uniqueCpfs = [...new Set(cpfs)];
      expect(uniqueCpfs.length).toBe(cpfs.length);
    });
  });
});
