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
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';
import { ConsultaComponent } from './consulta.component';
import { PessoasService } from '../../services/pessoas.service';
import { IPessoa } from '../../interfaces/pessoa.interface';
import { CpfMaskDirective } from '../../directives/cpf-mask.directive';

describe('ConsultaComponent', () => {
  let component: ConsultaComponent;
  let fixture: ComponentFixture<ConsultaComponent>;
  let pessoasService: PessoasService;
  let dialog: MatDialog;

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

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ConsultaComponent,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatCardModule,
        MatIconModule,
        MatDialogModule,
        MatProgressSpinnerModule,
        BrowserAnimationsModule,
        CpfMaskDirective,
        HttpClientTestingModule,
      ],
      providers: [PessoasService, MatDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(ConsultaComponent);
    component = fixture.componentInstance;
    pessoasService = TestBed.inject(PessoasService);
    dialog = TestBed.inject(MatDialog);
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
    beforeEach(() => {
      jest.spyOn(component, 'abrirModalErro');
      jest.spyOn(pessoasService, 'getPessoas');
    });

    it('deve exibir erro quando CPF estiver vazio', () => {
      component.cpf = '';
      component.buscarPorCpf();

      expect(component.abrirModalErro).toHaveBeenCalledWith(
        'Por favor, informe um CPF válido.'
      );
      expect(pessoasService.getPessoas).not.toHaveBeenCalled();
    });

    it('deve exibir erro quando CPF tiver menos de 11 dígitos', () => {
      component.cpf = '1234567890';
      component.buscarPorCpf();

      expect(component.abrirModalErro).toHaveBeenCalledWith(
        'CPF deve conter 11 dígitos.'
      );
      expect(pessoasService.getPessoas).not.toHaveBeenCalled();
    });

    it('deve exibir erro quando CPF tiver mais de 11 dígitos', () => {
      component.cpf = '123456789012';
      component.buscarPorCpf();

      expect(component.abrirModalErro).toHaveBeenCalledWith(
        'CPF deve conter 11 dígitos.'
      );
      expect(pessoasService.getPessoas).not.toHaveBeenCalled();
    });

    it('deve buscar pessoa quando CPF for válido', () => {
      component.cpf = '123.456.789-00';
      jest.spyOn(pessoasService, 'getPessoas').mockReturnValue(of(mockPessoas));

      component.buscarPorCpf();

      expect(pessoasService.getPessoas).toHaveBeenCalled();
    });

    it('deve encontrar pessoa quando CPF existir na base', () => {
      component.cpf = '123.456.789-00';
      jest.spyOn(pessoasService, 'getPessoas').mockReturnValue(of(mockPessoas));

      component.buscarPorCpf();

      // Simula a resposta assíncrona
      fixture.detectChanges();

      expect(component.pessoaEncontrada).toEqual(mockPessoa);
      expect(component.carregando).toBeFalsy();
    });

    it('deve exibir erro quando CPF não for encontrado', () => {
      component.cpf = '111.222.333-44';
      jest.spyOn(pessoasService, 'getPessoas').mockReturnValue(of(mockPessoas));

      component.buscarPorCpf();

      expect(component.abrirModalErro).toHaveBeenCalledWith(
        'CPF não encontrado na base de dados.'
      );
      expect(component.pessoaEncontrada).toBeNull();
      expect(component.carregando).toBeFalsy();
    });

    it('deve exibir erro quando serviço falhar', () => {
      component.cpf = '123.456.789-00';
      jest
        .spyOn(pessoasService, 'getPessoas')
        .mockReturnValue(throwError(() => new Error('Erro de rede')));

      component.buscarPorCpf();

      expect(component.abrirModalErro).toHaveBeenCalledWith(
        'Erro ao buscar dados. Tente novamente.'
      );
      expect(component.carregando).toBeFalsy();
    });

    it('deve limpar pessoa encontrada antes de nova busca', () => {
      component.pessoaEncontrada = mockPessoa;
      component.cpf = '123.456.789-00';
      // Retorna lista sem a pessoa buscada
      jest.spyOn(pessoasService, 'getPessoas').mockReturnValue(of([]));

      component.buscarPorCpf();

      expect(component.pessoaEncontrada).toBeNull();
    });
  });

  describe('limparBusca', () => {
    it('deve limpar CPF e pessoa encontrada', () => {
      component.cpf = '123.456.789-00';
      component.pessoaEncontrada = mockPessoa;

      component.limparBusca();

      expect(component.cpf).toBe('');
      expect(component.pessoaEncontrada).toBeNull();
    });
  });

  describe('formatarCpf', () => {
    it('deve formatar CPF corretamente', () => {
      const cpf = '12345678900';
      const resultado = component.formatarCpf(cpf);
      expect(resultado).toBe('123.456.789-00');
    });

    it('deve retornar CPF original se não tiver 11 dígitos', () => {
      const cpf = '123456';
      const resultado = component.formatarCpf(cpf);
      expect(resultado).toBe('123456');
    });
  });

  describe('formatarTelefone', () => {
    it('deve formatar telefone com 11 dígitos', () => {
      const telefone = '11999991111';
      const resultado = component.formatarTelefone(telefone);
      expect(resultado).toBe('(11) 99999-1111');
    });

    it('deve retornar telefone original se não tiver 11 dígitos', () => {
      const telefone = '1199999';
      const resultado = component.formatarTelefone(telefone);
      expect(resultado).toBe('1199999');
    });
  });

  describe('abrirModalErro', () => {
    it('deve abrir modal com mensagem de erro', () => {
      // Mock do window.alert
      window.alert = jest.fn();
      const mensagem = 'Erro de teste';
      component.abrirModalErro(mensagem);
      expect(window.alert).toHaveBeenCalledWith(mensagem);
    });
  });

  describe('Template e Interface', () => {
    it('deve exibir campo de CPF', () => {
      const compiled = fixture.nativeElement;
      const cpfInput = compiled.querySelector('input[matInput]');
      expect(cpfInput).toBeTruthy();
      expect(cpfInput.placeholder).toBe('000.000.000-00');
    });

    it('deve exibir botão de buscar', () => {
      const compiled = fixture.nativeElement;
      const buscarButton = compiled.querySelector('button[color="primary"]');
      expect(buscarButton).toBeTruthy();
      expect(buscarButton.textContent).toContain('Buscar');
    });

    it('deve exibir botão de limpar', () => {
      const compiled = fixture.nativeElement;
      const limparButton = compiled.querySelector('button[mat-stroked-button]');
      expect(limparButton).toBeTruthy();
      expect(limparButton.textContent).toContain('Limpar');
    });

    it('deve exibir loading quando carregando', () => {
      component.carregando = true;
      fixture.detectChanges();

      const compiled = fixture.nativeElement;
      const spinner = compiled.querySelector('mat-spinner');
      expect(spinner).toBeTruthy();
    });

    it('deve exibir dados da pessoa quando encontrada', () => {
      component.pessoaEncontrada = mockPessoa;
      fixture.detectChanges();

      const compiled = fixture.nativeElement;
      expect(compiled.textContent).toContain('João Silva');
      expect(compiled.textContent).toContain('123.456.789-00');
      expect(compiled.textContent).toContain('Masculino');
      expect(compiled.textContent).toContain('joao.silva@email.com');
      expect(compiled.textContent).toContain('(11) 99999-1111');
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

  describe('Integração com CPF Mask', () => {
    it('deve ter diretiva de máscara aplicada', () => {
      const compiled = fixture.nativeElement;
      const cpfInput = compiled.querySelector('input[matInput]');
      expect(cpfInput.hasAttribute('appCpfMask')).toBeTruthy();
    });
  });
});
