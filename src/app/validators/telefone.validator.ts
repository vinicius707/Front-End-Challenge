import { AbstractControl, ValidationErrors } from '@angular/forms';

export class TelefoneValidator {
  /**
   * Validador customizado para telefone usando regex
   * Aceita telefones com 10 ou 11 dígitos (com ou sem DDD)
   */
  static validTelefone(control: AbstractControl): ValidationErrors | null {
    if (!control.value) {
      return null; // Deixa o validator required cuidar disso
    }

    // Remove caracteres não numéricos
    const telefone = control.value.replace(/\D/g, '');

    // Regex para verificar se contém apenas números e tem 10 ou 11 dígitos
    const telefoneRegex = /^\d{10,11}$/;

    if (!telefoneRegex.test(telefone)) {
      return { invalidTelefoneFormat: { value: control.value } };
    }

    return null;
  }

  /**
   * Validador para verificar se o telefone contém apenas números
   */
  static numericOnly(control: AbstractControl): ValidationErrors | null {
    if (!control.value) {
      return null;
    }

    // Regex para verificar se contém apenas números
    const numericRegex = /^\d+$/;

    if (!numericRegex.test(control.value)) {
      return { nonNumericTelefone: { value: control.value } };
    }

    return null;
  }

  /**
   * Validador para verificar se o telefone tem o comprimento correto
   */
  static validLength(control: AbstractControl): ValidationErrors | null {
    if (!control.value) {
      return null;
    }

    const telefone = control.value.replace(/\D/g, '');

    if (telefone.length < 10 || telefone.length > 11) {
      return {
        telefoneWrongLength: {
          actualLength: telefone.length,
          minLength: 10,
          maxLength: 11,
        },
      };
    }

    return null;
  }

  /**
   * Validador para verificar se o DDD é válido (11-99)
   */
  static validDDD(control: AbstractControl): ValidationErrors | null {
    if (!control.value) {
      return null;
    }

    const telefone = control.value.replace(/\D/g, '');

    if (telefone.length >= 2) {
      const ddd = parseInt(telefone.substring(0, 2));

      // DDDs válidos no Brasil: 11-99 (exceto alguns reservados)
      if (ddd < 11 || ddd > 99) {
        return { invalidDDD: { ddd, value: control.value } };
      }
    }

    return null;
  }

  /**
   * Validador para verificar se o telefone não começa com 0
   */
  static noLeadingZero(control: AbstractControl): ValidationErrors | null {
    if (!control.value) {
      return null;
    }

    const telefone = control.value.replace(/\D/g, '');

    if (telefone.startsWith('0')) {
      return { telefoneLeadingZero: { value: control.value } };
    }

    return null;
  }

  /**
   * Validador combinado que aplica todas as validações de telefone
   */
  static completeTelefoneValidation(
    control: AbstractControl
  ): ValidationErrors | null {
    if (!control.value) {
      return null;
    }

    // Aplica todas as validações em sequência
    const numericError = TelefoneValidator.numericOnly(control);
    if (numericError) return numericError;

    const lengthError = TelefoneValidator.validLength(control);
    if (lengthError) return lengthError;

    const dddError = TelefoneValidator.validDDD(control);
    if (dddError) return dddError;

    const leadingZeroError = TelefoneValidator.noLeadingZero(control);
    if (leadingZeroError) return leadingZeroError;

    const formatError = TelefoneValidator.validTelefone(control);
    if (formatError) return formatError;

    return null;
  }

  /**
   * Validador específico para celular (11 dígitos)
   */
  static celular(control: AbstractControl): ValidationErrors | null {
    if (!control.value) {
      return null;
    }

    const telefone = control.value.replace(/\D/g, '');

    if (telefone.length !== 11) {
      return {
        celularWrongLength: {
          actualLength: telefone.length,
          expectedLength: 11,
        },
      };
    }

    return null;
  }

  /**
   * Validador específico para telefone fixo (10 dígitos)
   */
  static telefoneFixo(control: AbstractControl): ValidationErrors | null {
    if (!control.value) {
      return null;
    }

    const telefone = control.value.replace(/\D/g, '');

    if (telefone.length !== 10) {
      return {
        telefoneFixoWrongLength: {
          actualLength: telefone.length,
          expectedLength: 10,
        },
      };
    }

    return null;
  }
}

export { TelefoneValidator as telefoneValidator };
