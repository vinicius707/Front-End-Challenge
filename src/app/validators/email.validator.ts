import { AbstractControl, ValidationErrors } from '@angular/forms';

export class EmailValidator {
  /**
   * Validador customizado para email usando regex
   * Aceita emails com formato válido incluindo subdomínios
   */
  static validEmail(control: AbstractControl): ValidationErrors | null {
    if (!control.value) {
      return null; // Deixa o validator required cuidar disso
    }

    // Regex para validação de email
    // Suporta: local@domain.com, local@subdomain.domain.com, local+tag@domain.com
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(control.value)) {
      return { invalidEmail: { value: control.value } };
    }

    return null;
  }

  /**
   * Validador para verificar se o email não contém caracteres especiais proibidos
   */
  static noSpecialChars(control: AbstractControl): ValidationErrors | null {
    if (!control.value) {
      return null;
    }

    // Verifica se contém caracteres especiais proibidos
    const forbiddenCharsRegex = /[<>()[\]\\,;:\s"]/;

    if (forbiddenCharsRegex.test(control.value)) {
      return { forbiddenChars: { value: control.value } };
    }

    return null;
  }

  /**
   * Validador para verificar se o email não é muito longo
   */
  static maxLength(control: AbstractControl): ValidationErrors | null {
    if (!control.value) {
      return null;
    }

    const maxLength = 254; // RFC 5321 limit

    if (control.value.length > maxLength) {
      return {
        emailTooLong: { maxLength, actualLength: control.value.length },
      };
    }

    return null;
  }
}

export { EmailValidator as emailValidator };
