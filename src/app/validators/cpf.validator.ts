import { AbstractControl, ValidationErrors } from '@angular/forms';

export class CpfValidator {
  /**
   * Validador customizado para CPF usando regex e validação de dígitos verificadores
   */
  static validCpf(control: AbstractControl): ValidationErrors | null {
    if (!control.value) {
      return null; // Deixa o validator required cuidar disso
    }

    // Remove caracteres não numéricos
    const cpf = control.value.replace(/\D/g, '');

    // Regex para verificar se contém apenas números e tem 11 dígitos
    const cpfRegex = /^\d{11}$/;

    if (!cpfRegex.test(cpf)) {
      return { invalidCpfFormat: { value: control.value } };
    }

    // Verifica se todos os dígitos são iguais
    if (/^(\d)\1{10}$/.test(cpf)) {
      return { cpfAllSameDigits: { value: control.value } };
    }

    // Validação do primeiro dígito verificador
    let soma = 0;
    for (let i = 0; i < 9; i++) {
      soma += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let resto = 11 - (soma % 11);
    const digito1 = resto < 2 ? 0 : resto;

    // Validação do segundo dígito verificador
    soma = 0;
    for (let i = 0; i < 10; i++) {
      soma += parseInt(cpf.charAt(i)) * (11 - i);
    }
    resto = 11 - (soma % 11);
    const digito2 = resto < 2 ? 0 : resto;

    // Verifica se os dígitos verificadores estão corretos
    if (
      parseInt(cpf.charAt(9)) !== digito1 ||
      parseInt(cpf.charAt(10)) !== digito2
    ) {
      return { invalidCpfDigits: { value: control.value } };
    }

    return null;
  }

  /**
   * Validador para verificar se o CPF tem o formato correto (apenas números)
   */
  static numericOnly(control: AbstractControl): ValidationErrors | null {
    if (!control.value) {
      return null;
    }

    // Regex para verificar se contém apenas números
    const numericRegex = /^\d+$/;

    if (!numericRegex.test(control.value)) {
      return { nonNumericCpf: { value: control.value } };
    }

    return null;
  }

  /**
   * Validador para verificar se o CPF tem exatamente 11 dígitos
   */
  static exactLength(control: AbstractControl): ValidationErrors | null {
    if (!control.value) {
      return null;
    }

    const cpf = control.value.replace(/\D/g, '');

    if (cpf.length !== 11) {
      return {
        cpfWrongLength: { actualLength: cpf.length, expectedLength: 11 },
      };
    }

    return null;
  }

  /**
   * Validador combinado que aplica todas as validações de CPF
   */
  static completeCpfValidation(
    control: AbstractControl
  ): ValidationErrors | null {
    if (!control.value) {
      return null;
    }

    // Aplica todas as validações em sequência
    const numericError = CpfValidator.numericOnly(control);
    if (numericError) return numericError;

    const lengthError = CpfValidator.exactLength(control);
    if (lengthError) return lengthError;

    const formatError = CpfValidator.validCpf(control);
    if (formatError) return formatError;

    return null;
  }
}

export { CpfValidator as cpfValidator };
