import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of, throwError } from 'rxjs';

import { ConsultaComponent } from './consulta.component';
import { PessoasService } from '../../services/pessoas.service';
import { IPessoa } from '../../interfaces/pessoa.interface';

beforeAll(() => {
  window.alert = jest.fn();
});

beforeAll(() => {
  Element.prototype.animate = () => ({} as any);
});

describe('ConsultaComponent', () => {
  let component: ConsultaComponent;
  let fixture: ComponentFixture<ConsultaComponent>;
  let pessoasService: jest.Mocked<PessoasService>;
  let dialog: jest.Mocked<MatDialog>;

  beforeEach(async () => {
    const mockPessoasService = {
      getPessoas: jest.fn(),
    };

    const mockDialog = {
      open: jest.fn(),
    };

    await TestBed.configureTestingModule({
      declarations: [ConsultaComponent],
      imports: [
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatCardModule,
        MatIconModule,
        MatDialogModule,
        MatProgressSpinnerModule,
        BrowserAnimationsModule,
      ],
      providers: [
        { provide: PessoasService, useValue: mockPessoasService },
        { provide: MatDialog, useValue: mockDialog },
      ],
    }).compileComponents();

    pessoasService = TestBed.inject(
      PessoasService
    ) as jest.Mocked<PessoasService>;
    dialog = TestBed.inject(MatDialog) as jest.Mocked<MatDialog>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve ser criado', () => {
    expect(component).toBeTruthy();
  });

  describe('Inicialização', () => {
    it('deve inicializar com valores padrão', () => {
      expect(component.cpf).toBe('');
      expect(component.pessoaEncontrada).toBeNull();
      expect(component.carregando).toBeFalsy();
    });
  });

  describe('buscarPorCpf', () => {
    it('deve exibir erro quando CPF estiver vazio', () => {
      const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});

      component.buscarPorCpf();

      expect(alertSpy).toHaveBeenCalledWith(
        'Por favor, informe um CPF válido.'
      );
      alertSpy.mockRestore();
    });

    it('deve exibir erro quando CPF tiver menos de 11 dígitos', () => {
      const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});
      component.cpf = '1234567890';

      component.buscarPorCpf();

      expect(alertSpy).toHaveBeenCalledWith('CPF deve conter 11 dígitos.');
      alertSpy.mockRestore();
    });

    it('deve exibir erro quando CPF tiver mais de 11 dígitos', () => {
      const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});
      component.cpf = '123456789012';

      component.buscarPorCpf();

      expect(alertSpy).toHaveBeenCalledWith('CPF deve conter 11 dígitos.');
      alertSpy.mockRestore();
    });

    it('deve buscar pessoa quando CPF for válido', () => {
      const cpfValido = '12345678901';
      component.cpf = cpfValido;
      pessoasService.getPessoas.mockReturnValue(of([]));

      component.buscarPorCpf();

      expect(pessoasService.getPessoas).toHaveBeenCalled();
      expect(component.carregando).toBeFalsy();
    });

    it('deve encontrar pessoa quando CPF existir na base', () => {
      const cpfValido = '12345678901';
      const pessoaMock: IPessoa = {
        id: 1,
        nome: 'João Silva',
        cpf: cpfValido,
        sexo: 'M',
        email: 'joao@email.com',
        telefone: '11999999999',
      };

      component.cpf = cpfValido;
      pessoasService.getPessoas.mockReturnValue(of([pessoaMock]));

      component.buscarPorCpf();

      expect(component.pessoaEncontrada).toEqual(pessoaMock);
      expect(component.carregando).toBeFalsy();
    });

    it('deve exibir erro quando CPF não for encontrado', () => {
      const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});
      const cpfValido = '12345678901';

      component.cpf = cpfValido;
      pessoasService.getPessoas.mockReturnValue(of([]));

      component.buscarPorCpf();

      expect(alertSpy).toHaveBeenCalledWith(
        'CPF não encontrado na base de dados.'
      );
      expect(component.pessoaEncontrada).toBeNull();
      alertSpy.mockRestore();
    });

    it('deve exibir erro quando serviço falhar', () => {
      const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});
      const cpfValido = '12345678901';

      component.cpf = cpfValido;
      pessoasService.getPessoas.mockReturnValue(
        throwError(() => new Error('Erro'))
      );

      component.buscarPorCpf();

      expect(alertSpy).toHaveBeenCalledWith(
        'Erro ao buscar dados. Tente novamente.'
      );
      expect(component.carregando).toBeFalsy();
      alertSpy.mockRestore();
    });

    it('deve limpar pessoa encontrada antes de nova busca', () => {
      const cpfValido = '12345678901';
      const pessoaMock: IPessoa = {
        id: 1,
        nome: 'João Silva',
        cpf: cpfValido,
        sexo: 'M',
        email: 'joao@email.com',
        telefone: '11999999999',
      };

      component.pessoaEncontrada = pessoaMock;
      component.cpf = cpfValido;
      pessoasService.getPessoas.mockReturnValue(of([]));

      component.buscarPorCpf();

      expect(component.pessoaEncontrada).toBeNull();
    });
  });

  describe('limparBusca', () => {
    it('deve limpar CPF e pessoa encontrada', () => {
      component.cpf = '12345678901';
      component.pessoaEncontrada = {} as IPessoa;

      component.limparBusca();

      expect(component.cpf).toBe('');
      expect(component.pessoaEncontrada).toBeNull();
    });
  });

  describe('formatarCpf', () => {
    it('deve formatar CPF corretamente', () => {
      const cpf = '12345678901';
      const resultado = component.formatarCpf(cpf);
      expect(resultado).toBe('123.456.789-01');
    });

    it('deve retornar CPF original se não tiver 11 dígitos', () => {
      const cpf = '123456789';
      const resultado = component.formatarCpf(cpf);
      expect(resultado).toBe(cpf);
    });
  });

  describe('formatarTelefone', () => {
    it('deve formatar telefone com 11 dígitos', () => {
      const telefone = '11999999999';
      const resultado = component.formatarTelefone(telefone);
      expect(resultado).toBe('(11) 99999-9999');
    });

    it('deve retornar telefone original se não tiver 11 dígitos', () => {
      const telefone = '1199999999';
      const resultado = component.formatarTelefone(telefone);
      expect(resultado).toBe(telefone);
    });
  });

  describe('abrirModalErro', () => {
    it('deve abrir modal com mensagem de erro', () => {
      const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});
      const mensagem = 'Erro de teste';

      component.abrirModalErro(mensagem);

      expect(alertSpy).toHaveBeenCalledWith(mensagem);
      alertSpy.mockRestore();
    });
  });

  describe('Template e Interface', () => {
    it('deve exibir campo de CPF', () => {
      const compiled = fixture.nativeElement;
      // Busca por input do CPF pelo placeholder ou pelo primeiro input
      const cpfInput =
        compiled.querySelector('input[placeholder="Digite o CPF"]') ||
        compiled.querySelector('input');
      expect(cpfInput).toBeTruthy();
    });

    it('deve exibir botão de buscar', () => {
      const compiled = fixture.nativeElement;
      // Busca por botão de buscar pelo texto
      const buttons = Array.from(compiled.querySelectorAll('button'));
      const buscarButton = buttons.find((btn: any) =>
        btn.textContent?.toLowerCase().includes('buscar')
      );
      expect(buscarButton).toBeTruthy();
    });

    it('deve exibir botão de limpar', () => {
      const compiled = fixture.nativeElement;
      const limparButton = compiled.querySelector('button[type="button"]');
      expect(limparButton).toBeTruthy();
    });

    it('deve exibir loading quando carregando', () => {
      component.carregando = true;
      fixture.detectChanges();

      const compiled = fixture.nativeElement;
      const loadingElement = compiled.querySelector('.loading-container');
      expect(loadingElement).toBeTruthy();
    });

    it('deve exibir dados da pessoa quando encontrada', () => {
      const pessoaMock: IPessoa = {
        id: 1,
        nome: 'João Silva',
        cpf: '12345678901',
        sexo: 'M',
        email: 'joao@email.com',
        telefone: '11999999999',
      };

      component.pessoaEncontrada = pessoaMock;
      fixture.detectChanges();

      const compiled = fixture.nativeElement;
      const resultadoCard = compiled.querySelector('.resultado-card');
      expect(resultadoCard).toBeTruthy();
    });

    it('deve desabilitar botões durante carregamento', () => {
      component.carregando = true;
      fixture.detectChanges();

      const compiled = fixture.nativeElement;
      const buttons = compiled.querySelectorAll('button');
      buttons.forEach((button: HTMLButtonElement) => {
        expect(button.disabled).toBeTruthy();
      });
    });
  });
});
