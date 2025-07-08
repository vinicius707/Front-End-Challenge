import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';

import { CadastroComponent } from './cadastro.component';
import { PessoasService } from '../../services/pessoas.service';
import { IPessoa } from '../../interfaces/pessoa.interface';

describe('CadastroComponent', () => {
  let component: CadastroComponent;
  let fixture: ComponentFixture<CadastroComponent>;
  let pessoasService: jest.Mocked<PessoasService>;

  beforeAll(() => {
    window.alert = jest.fn();
  });

  beforeAll(() => {
    Element.prototype.animate = () =>
      ({
        addEventListener: () => {},
        removeEventListener: () => {},
        play: () => {},
        pause: () => {},
        finish: () => {},
        cancel: () => {},
        reverse: () => {},
        onfinish: null,
      } as any);
  });

  beforeEach(async () => {
    const mockPessoasService = {
      addPessoa: jest.fn(),
    };

    await TestBed.configureTestingModule({
      declarations: [CadastroComponent],
      imports: [
        ReactiveFormsModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatButtonModule,
        MatIconModule,
        MatProgressSpinnerModule,
        MatSnackBarModule,
        BrowserAnimationsModule,
      ],
      providers: [{ provide: PessoasService, useValue: mockPessoasService }],
    }).compileComponents();

    pessoasService = TestBed.inject(
      PessoasService
    ) as jest.Mocked<PessoasService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve inicializar o formulário com campos vazios', () => {
    expect(component.cadastroForm.get('nome')?.value).toBe('');
    expect(component.cadastroForm.get('cpf')?.value).toBe('');
    expect(component.cadastroForm.get('sexo')?.value).toBe('');
    expect(component.cadastroForm.get('email')?.value).toBe('');
    expect(component.cadastroForm.get('telefone')?.value).toBe('');
  });

  it('deve ter a lista de sexos configurada', () => {
    expect(component.sexos).toEqual([
      { valor: 'M', label: 'Masculino' },
      { valor: 'F', label: 'Feminino' },
    ]);
  });

  describe('Validações do campo Nome', () => {
    it('deve ser obrigatório', () => {
      const nomeControl = component.cadastroForm.get('nome');
      nomeControl?.setValue('');
      expect(nomeControl?.hasError('required')).toBeTruthy();
    });

    it('deve ter mínimo de 3 caracteres', () => {
      const nomeControl = component.cadastroForm.get('nome');
      nomeControl?.setValue('Jo');
      expect(nomeControl?.hasError('minlength')).toBeTruthy();
    });

    it('deve ter máximo de 100 caracteres', () => {
      const nomeControl = component.cadastroForm.get('nome');
      const nomeLongo = 'a'.repeat(101);
      nomeControl?.setValue(nomeLongo);
      expect(nomeControl?.hasError('maxlength')).toBeTruthy();
    });

    it('deve aceitar apenas letras e espaços', () => {
      const nomeControl = component.cadastroForm.get('nome');
      nomeControl?.setValue('João Silva 123');
      expect(nomeControl?.hasError('pattern')).toBeTruthy();
    });

    it('deve aceitar nome válido com acentos', () => {
      const nomeControl = component.cadastroForm.get('nome');
      nomeControl?.setValue('João Silva');
      expect(nomeControl?.valid).toBeTruthy();
    });
  });

  describe('Validações do campo CPF', () => {
    it('deve ser obrigatório', () => {
      const cpfControl = component.cadastroForm.get('cpf');
      cpfControl?.setValue('');
      expect(cpfControl?.hasError('required')).toBeTruthy();
    });

    it('deve aceitar apenas números', () => {
      const cpfControl = component.cadastroForm.get('cpf');
      cpfControl?.setValue('123.456.789-01');
      expect(cpfControl?.hasError('pattern')).toBeTruthy();
    });

    it('deve validar CPF com dígitos verificadores corretos', () => {
      const cpfControl = component.cadastroForm.get('cpf');
      cpfControl?.setValue('52998224725'); // CPF válido
      expect(cpfControl?.valid).toBeTruthy();
    });

    it('deve rejeitar CPF com dígitos verificadores incorretos', () => {
      const cpfControl = component.cadastroForm.get('cpf');
      cpfControl?.setValue('12345678901'); // CPF inválido
      expect(cpfControl?.hasError('cpfInvalido')).toBeTruthy();
    });

    it('deve rejeitar CPF com todos os dígitos iguais', () => {
      const cpfControl = component.cadastroForm.get('cpf');
      cpfControl?.setValue('11111111111');
      expect(cpfControl?.hasError('cpfInvalido')).toBeTruthy();
    });
  });

  describe('Validações do campo Sexo', () => {
    it('deve ser obrigatório', () => {
      const sexoControl = component.cadastroForm.get('sexo');
      sexoControl?.setValue('');
      expect(sexoControl?.hasError('required')).toBeTruthy();
    });

    it('deve aceitar valor válido', () => {
      const sexoControl = component.cadastroForm.get('sexo');
      sexoControl?.setValue('M');
      expect(sexoControl?.valid).toBeTruthy();
    });
  });

  describe('Validações do campo E-mail', () => {
    it('deve ser obrigatório', () => {
      const emailControl = component.cadastroForm.get('email');
      emailControl?.setValue('');
      expect(emailControl?.hasError('required')).toBeTruthy();
    });

    it('deve validar formato de e-mail', () => {
      const emailControl = component.cadastroForm.get('email');
      emailControl?.setValue('email-invalido');
      expect(emailControl?.hasError('email')).toBeTruthy();
    });

    it('deve aceitar e-mail válido', () => {
      const emailControl = component.cadastroForm.get('email');
      emailControl?.setValue('teste@email.com');
      expect(emailControl?.valid).toBeTruthy();
    });

    it('deve ter máximo de 100 caracteres', () => {
      const emailControl = component.cadastroForm.get('email');
      const emailLongo = 'a'.repeat(91) + '@email.com'; // 103 caracteres
      emailControl?.setValue(emailLongo);
      expect(emailControl?.hasError('maxlength')).toBeTruthy();
    });
  });

  describe('Validações do campo Telefone', () => {
    it('deve ser obrigatório', () => {
      const telefoneControl = component.cadastroForm.get('telefone');
      telefoneControl?.setValue('');
      expect(telefoneControl?.hasError('required')).toBeTruthy();
    });

    it('deve aceitar apenas números', () => {
      const telefoneControl = component.cadastroForm.get('telefone');
      telefoneControl?.setValue('(11) 99999-9999');
      expect(telefoneControl?.hasError('pattern')).toBeTruthy();
    });

    it('deve ter mínimo de 10 dígitos', () => {
      const telefoneControl = component.cadastroForm.get('telefone');
      telefoneControl?.setValue('119999999');
      expect(telefoneControl?.hasError('minlength')).toBeTruthy();
    });

    it('deve ter máximo de 11 dígitos', () => {
      const telefoneControl = component.cadastroForm.get('telefone');
      telefoneControl?.setValue('119999999999');
      expect(telefoneControl?.hasError('maxlength')).toBeTruthy();
    });

    it('deve aceitar telefone com 10 dígitos', () => {
      const telefoneControl = component.cadastroForm.get('telefone');
      telefoneControl?.setValue('1199999999');
      expect(telefoneControl?.valid).toBeTruthy();
    });

    it('deve aceitar telefone com 11 dígitos', () => {
      const telefoneControl = component.cadastroForm.get('telefone');
      telefoneControl?.setValue('11999999999');
      expect(telefoneControl?.valid).toBeTruthy();
    });
  });

  describe('Formatação de campos', () => {
    it('deve formatar telefone com 10 dígitos', () => {
      const event = { target: { value: '1199999999' } };
      component.formatarTelefone(event);
      expect(event.target.value).toBe('(11) 9999-9999');
    });

    it('deve formatar telefone com 11 dígitos', () => {
      const event = { target: { value: '11999999999' } };
      component.formatarTelefone(event);
      expect(event.target.value).toBe('(11) 99999-9999');
    });
  });

  describe('Submissão do formulário', () => {
    beforeEach(() => {
      // Preencher formulário com dados válidos
      component.cadastroForm.patchValue({
        nome: 'João Silva',
        cpf: '52998224725',
        sexo: 'M',
        email: 'joao@email.com',
        telefone: '11999999999',
      });
    });

    it('deve chamar o serviço quando formulário é válido', () => {
      pessoasService.addPessoa.mockReturnValue(of({} as IPessoa));

      component.onSubmit();

      expect(pessoasService.addPessoa).toHaveBeenCalledWith({
        nome: 'João Silva',
        cpf: '52998224725',
        sexo: 'M',
        email: 'joao@email.com',
        telefone: '11999999999',
      });
    });

    it('deve mostrar loading durante submissão', (done) => {
      pessoasService.addPessoa.mockReturnValue(of({} as any).pipe(delay(1)));
      component.cadastroForm.patchValue({
        nome: 'João Silva',
        cpf: '52998224725',
        sexo: 'M',
        email: 'joao@email.com',
        telefone: '11999999999',
      });
      component.onSubmit();
      expect(component.carregando).toBeTruthy();
      setTimeout(() => {
        expect(component.carregando).toBeFalsy();
        done();
      }, 10);
    });

    it('deve limpar formulário após sucesso', () => {
      pessoasService.addPessoa.mockReturnValue(of({} as IPessoa));

      component.onSubmit();

      expect(component.cadastroForm.get('nome')?.value).toBeNull();
      expect(component.carregando).toBeFalsy();
    });

    it('deve tratar erro na submissão', () => {
      pessoasService.addPessoa.mockReturnValue(
        throwError(() => new Error('Erro'))
      );

      component.onSubmit();

      expect(component.carregando).toBeFalsy();
    });

    it('deve marcar campos como tocados quando formulário é inválido', () => {
      component.cadastroForm.patchValue({ nome: '' }); // Tornar inválido

      component.onSubmit();

      expect(component.cadastroForm.get('nome')?.touched).toBeTruthy();
    });
  });

  describe('Limpeza do formulário', () => {
    it('deve limpar todos os campos', () => {
      component.cadastroForm.patchValue({
        nome: 'João Silva',
        cpf: '52998224725',
        sexo: 'M',
        email: 'joao@email.com',
        telefone: '11999999999',
      });

      component.limparFormulario();

      expect(component.cadastroForm.get('nome')?.value).toBeNull();
      expect(component.cadastroForm.get('cpf')?.value).toBeNull();
      expect(component.cadastroForm.get('sexo')?.value).toBeNull();
      expect(component.cadastroForm.get('email')?.value).toBeNull();
      expect(component.cadastroForm.get('telefone')?.value).toBeNull();
    });

    it('deve marcar campos como não tocados', () => {
      component.cadastroForm.get('nome')?.markAsTouched();

      component.limparFormulario();

      expect(component.cadastroForm.get('nome')?.touched).toBeFalsy();
    });
  });

  describe('Mensagens de erro', () => {
    it('deve retornar mensagem para campo obrigatório', () => {
      const nomeControl = component.cadastroForm.get('nome');
      nomeControl?.setValue('');
      nomeControl?.markAsTouched();

      expect(component.getMensagemErro('nome')).toBe(
        'Este campo é obrigatório'
      );
    });

    it('deve retornar mensagem para minlength', () => {
      const nomeControl = component.cadastroForm.get('nome');
      nomeControl?.setValue('Jo');
      nomeControl?.markAsTouched();

      expect(component.getMensagemErro('nome')).toBe('Mínimo de 3 caracteres');
    });

    it('deve retornar mensagem para maxlength', () => {
      const nomeControl = component.cadastroForm.get('nome');
      nomeControl?.setValue('a'.repeat(101));
      nomeControl?.markAsTouched();

      expect(component.getMensagemErro('nome')).toBe(
        'Máximo de 100 caracteres'
      );
    });

    it('deve retornar mensagem para e-mail inválido', () => {
      const emailControl = component.cadastroForm.get('email');
      emailControl?.setValue('email-invalido');
      emailControl?.markAsTouched();

      expect(component.getMensagemErro('email')).toBe('E-mail inválido');
    });

    it('deve retornar mensagem para CPF inválido', () => {
      const cpfControl = component.cadastroForm.get('cpf');
      cpfControl?.setValue('12345678901');
      cpfControl?.markAsTouched();

      expect(component.getMensagemErro('cpf')).toBe('CPF inválido');
    });

    it('deve retornar string vazia para campo sem erro', () => {
      const nomeControl = component.cadastroForm.get('nome');
      nomeControl?.setValue('João Silva');

      expect(component.getMensagemErro('nome')).toBe('');
    });
  });
});
