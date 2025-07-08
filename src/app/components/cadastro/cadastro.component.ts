import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { PessoasService } from '../../services/pessoas.service';
import { IPessoa } from '../../interfaces/pessoa.interface';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss'],
})
export class CadastroComponent implements OnInit {
  cadastroForm!: FormGroup;
  carregando = false;
  sexos = [
    { valor: 'M', label: 'Masculino' },
    { valor: 'F', label: 'Feminino' },
  ];

  constructor(
    private formBuilder: FormBuilder,
    private pessoasService: PessoasService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.inicializarFormulario();
  }

  inicializarFormulario(): void {
    this.cadastroForm = this.formBuilder.group({
      nome: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
          Validators.pattern(/^[a-zA-ZÀ-ÿ\s]+$/),
        ],
      ],
      cpf: [
        '',
        [
          Validators.required,
          Validators.pattern(/^\d{11}$/),
          this.validarCpf.bind(this),
        ],
      ],
      sexo: ['', Validators.required],
      email: [
        '',
        [Validators.required, Validators.email, Validators.maxLength(100)],
      ],
      telefone: [
        '',
        [
          Validators.required,
          Validators.pattern(/^\d{10,11}$/),
          Validators.minLength(10),
          Validators.maxLength(11),
        ],
      ],
    });
  }

  validarCpf(control: any): { [key: string]: any } | null {
    const cpf = control.value;
    if (!cpf) return null;

    // Remove caracteres não numéricos
    const cpfLimpo = cpf.replace(/\D/g, '');

    // Verifica se tem 11 dígitos
    if (cpfLimpo.length !== 11) {
      return { cpfInvalido: true };
    }

    // Verifica se todos os dígitos são iguais
    if (/^(\d)\1{10}$/.test(cpfLimpo)) {
      return { cpfInvalido: true };
    }

    // Validação do primeiro dígito verificador
    let soma = 0;
    for (let i = 0; i < 9; i++) {
      soma += parseInt(cpfLimpo.charAt(i)) * (10 - i);
    }
    let resto = 11 - (soma % 11);
    const digito1 = resto < 2 ? 0 : resto;

    // Validação do segundo dígito verificador
    soma = 0;
    for (let i = 0; i < 10; i++) {
      soma += parseInt(cpfLimpo.charAt(i)) * (11 - i);
    }
    resto = 11 - (soma % 11);
    const digito2 = resto < 2 ? 0 : resto;

    // Verifica se os dígitos verificadores estão corretos
    if (
      parseInt(cpfLimpo.charAt(9)) !== digito1 ||
      parseInt(cpfLimpo.charAt(10)) !== digito2
    ) {
      return { cpfInvalido: true };
    }

    return null;
  }

  onSubmit(): void {
    if (this.cadastroForm.valid) {
      this.carregando = true;

      const dadosPessoa: Omit<IPessoa, 'id'> = {
        nome: this.cadastroForm.value.nome.trim(),
        cpf: this.cadastroForm.value.cpf,
        sexo: this.cadastroForm.value.sexo,
        email: this.cadastroForm.value.email.trim().toLowerCase(),
        telefone: this.cadastroForm.value.telefone,
      };

      this.pessoasService.addPessoa(dadosPessoa).subscribe({
        next: () => {
          this.snackBar.open('Pessoa cadastrada com sucesso!', 'Fechar', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });
          this.cadastroForm.reset();
          this.carregando = false;
        },
        error: (error: any) => {
          console.error('Erro ao cadastrar pessoa:', error);
          this.snackBar.open(
            'Erro ao cadastrar pessoa. Tente novamente.',
            'Fechar',
            {
              duration: 5000,
              horizontalPosition: 'center',
              verticalPosition: 'top',
            }
          );
          this.carregando = false;
        },
      });
    } else {
      this.marcarCamposComoTocados();
    }
  }

  limparFormulario(): void {
    this.cadastroForm.reset();
    this.marcarCamposComoNaoTocados();
  }

  marcarCamposComoTocados(): void {
    Object.keys(this.cadastroForm.controls).forEach((key) => {
      const control = this.cadastroForm.get(key);
      control?.markAsTouched();
    });
  }

  marcarCamposComoNaoTocados(): void {
    Object.keys(this.cadastroForm.controls).forEach((key) => {
      const control = this.cadastroForm.get(key);
      control?.markAsUntouched();
    });
  }

  getMensagemErro(campo: string): string {
    const control = this.cadastroForm.get(campo);

    if (control?.hasError('required') && control?.touched) {
      return 'Este campo é obrigatório';
    }

    if (control?.hasError('minlength') && control?.touched) {
      const minLength = control.errors?.['minlength'].requiredLength;
      return `Mínimo de ${minLength} caracteres`;
    }

    if (control?.hasError('maxlength') && control?.touched) {
      const maxLength = control.errors?.['maxlength'].requiredLength;
      return `Máximo de ${maxLength} caracteres`;
    }

    if (control?.hasError('email') && control?.touched) {
      return 'E-mail inválido';
    }

    if (control?.hasError('pattern') && control?.touched) {
      switch (campo) {
        case 'nome':
          return 'Nome deve conter apenas letras e espaços';
        case 'cpf':
          return 'CPF deve conter apenas números';
        case 'telefone':
          return 'Telefone deve conter apenas números';
        default:
          return 'Formato inválido';
      }
    }

    if (control?.hasError('cpfInvalido') && control?.touched) {
      return 'CPF inválido';
    }

    return '';
  }

  formatarCpf(event: any): void {
    let valor = event.target.value.replace(/\D/g, '');
    valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
    valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
    valor = valor.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    event.target.value = valor;

    // Atualiza o valor no formulário sem a formatação
    const cpfLimpo = valor.replace(/\D/g, '');
    this.cadastroForm.patchValue({ cpf: cpfLimpo });
  }

  formatarTelefone(event: any): void {
    let valor = event.target.value.replace(/\D/g, '');
    if (valor.length === 11) {
      valor = valor.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    } else if (valor.length === 10) {
      valor = valor.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    }
    event.target.value = valor;

    // Atualiza o valor no formulário sem a formatação
    const telefoneLimpo = valor.replace(/\D/g, '');
    this.cadastroForm.patchValue({ telefone: telefoneLimpo });
  }
}
