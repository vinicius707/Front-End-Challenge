import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { PessoasService } from './pessoas.service';
import { IPessoa } from '../interfaces/pessoa.interface';

describe('PessoasService', () => {
  let service: PessoasService;
  let httpMock: HttpTestingController;

  const mockPessoa: IPessoa = {
    id: 1,
    nome: 'João Silva',
    cpf: '12345678900',
    sexo: 'M',
    email: 'joao.silva@email.com',
    telefone: '11999991111',
  };

  const mockPessoas: IPessoa[] = [
    mockPessoa,
    {
      id: 2,
      nome: 'Maria Santos',
      cpf: '98765432100',
      sexo: 'F',
      email: 'maria.santos@email.com',
      telefone: '11888882222',
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PessoasService],
    });
    service = TestBed.inject(PessoasService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('deve ser criado', () => {
    expect(service).toBeTruthy();
  });

  describe('getPessoas', () => {
    it('deve retornar um Observable<Pessoa[]>', () => {
      service.getPessoas().subscribe((pessoas) => {
        expect(pessoas).toEqual(mockPessoas);
      });

      const req = httpMock.expectOne('/api/pessoas');
      expect(req.request.method).toBe('GET');
      req.flush(mockPessoas);
    });
  });

  describe('getPessoa', () => {
    it('deve retornar um Observable<Pessoa> para um ID específico', () => {
      const id = 1;
      service.getPessoa(id).subscribe((pessoa) => {
        expect(pessoa).toEqual(mockPessoa);
      });

      const req = httpMock.expectOne(`/api/pessoas/${id}`);
      expect(req.request.method).toBe('GET');
      req.flush(mockPessoa);
    });
  });

  describe('addPessoa', () => {
    it('deve adicionar uma nova pessoa', () => {
      const newPessoa: Omit<IPessoa, 'id'> = {
        nome: 'Novo Usuário',
        cpf: '11122233344',
        sexo: 'M',
        email: 'novo@email.com',
        telefone: '11111111111',
      };

      const expectedPessoa: IPessoa = { ...newPessoa, id: 3 };

      service.addPessoa(newPessoa).subscribe((pessoa) => {
        expect(pessoa).toEqual(expectedPessoa);
      });

      const req = httpMock.expectOne('/api/pessoas');
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(newPessoa);
      req.flush(expectedPessoa);
    });
  });

  describe('updatePessoa', () => {
    it('deve atualizar uma pessoa existente', () => {
      const updatedPessoa: IPessoa = {
        ...mockPessoa,
        nome: 'João Silva Atualizado',
      };

      service.updatePessoa(mockPessoa.id, updatedPessoa).subscribe((pessoa) => {
        expect(pessoa).toEqual(updatedPessoa);
      });

      const req = httpMock.expectOne(`/api/pessoas/${mockPessoa.id}`);
      expect(req.request.method).toBe('PUT');
      expect(req.request.body).toEqual(updatedPessoa);
      req.flush(updatedPessoa);
    });
  });

  describe('deletePessoa', () => {
    it('deve deletar uma pessoa', () => {
      const id = 1;
      service.deletePessoa(id).subscribe(() => {
        // Deve completar sem erro
      });

      const req = httpMock.expectOne(`/api/pessoas/${id}`);
      expect(req.request.method).toBe('DELETE');
      req.flush(null);
    });
  });
});
