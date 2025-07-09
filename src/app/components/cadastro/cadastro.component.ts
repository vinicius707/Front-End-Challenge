import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PessoasService } from '../../services/pessoas.service';
import { IPessoa } from '../../interfaces/pessoa.interface';
import { emailValidator } from '../../validators/email.validator';
import { cpfValidator } from '../../validators/cpf.validator';
import { telefoneValidator } from '../../validators/telefone.validator';

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
    { valor: 'O', label: 'Outro' },
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
        [Validators.required, cpfValidator.simpleCpfValidation],
        [cpfValidator.cpfExistsValidator(this.pessoasService)],
      ],
      sexo: ['', Validators.required],
      email: [
        '',
        [
          Validators.required,
          emailValidator.validEmail,
          emailValidator.noSpecialChars,
          emailValidator.maxLength,
        ],
      ],
      telefone: [
        '',
        [Validators.required, telefoneValidator.completeTelefoneValidation],
      ],
    });
  }

  onSubmit(): void {
    if (this.cadastroForm.valid) {
      this.carregando = true;

      const dadosPessoa: Omit<IPessoa, 'id'> = {
        nome: this.cadastroForm.value.nome.trim(),
        cpf: this.cadastroForm.value.cpf.replace(/\D/g, ''), // Remove formatação
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
        default:
          return 'Formato inválido';
      }
    }

    // Validações customizadas de CPF
    if (control?.hasError('invalidCpfFormat') && control?.touched) {
      return 'CPF deve conter exatamente 11 dígitos';
    }

    if (control?.hasError('cpfAllSameDigits') && control?.touched) {
      return 'CPF não pode ter todos os dígitos iguais';
    }

    if (control?.hasError('invalidCpfDigits') && control?.touched) {
      return 'CPF inválido - dígitos verificadores incorretos';
    }

    if (control?.hasError('nonNumericCpf') && control?.touched) {
      return 'CPF deve conter apenas números';
    }

    if (control?.hasError('cpfWrongLength') && control?.touched) {
      return 'CPF deve ter exatamente 11 dígitos';
    }

    if (control?.hasError('cpfAlreadyExists') && control?.touched) {
      return 'CPF já cadastrado no sistema';
    }

    // Validações customizadas de Email
    if (control?.hasError('invalidEmail') && control?.touched) {
      return 'Formato de e-mail inválido';
    }

    if (control?.hasError('forbiddenChars') && control?.touched) {
      return 'E-mail contém caracteres especiais não permitidos';
    }

    if (control?.hasError('emailTooLong') && control?.touched) {
      return 'E-mail muito longo';
    }

    // Validações customizadas de Telefone
    if (control?.hasError('invalidTelefoneFormat') && control?.touched) {
      return 'Telefone deve ter 10 ou 11 dígitos';
    }

    if (control?.hasError('nonNumericTelefone') && control?.touched) {
      return 'Telefone deve conter apenas números';
    }

    if (control?.hasError('telefoneWrongLength') && control?.touched) {
      return 'Telefone deve ter entre 10 e 11 dígitos';
    }

    if (control?.hasError('invalidDDD') && control?.touched) {
      return 'DDD inválido';
    }

    if (control?.hasError('telefoneLeadingZero') && control?.touched) {
      return 'Telefone não pode começar com zero';
    }

    return '';
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
