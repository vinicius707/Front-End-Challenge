import { AbstractControl } from '@angular/forms';
import { EmailValidator } from './email.validator';

describe('EmailValidator', () => {
  let control: any;

  beforeEach(() => {
    control = {
      value: '',
      hasError: jest.fn(),
      errors: null,
    };
  });

  describe('validEmail', () => {
    it('deve retornar null para valor vazio', () => {
      control.value = '';
      const result = EmailValidator.validEmail(control);
      expect(result).toBeNull();
    });

    it('deve aceitar email válido simples', () => {
      control.value = 'teste@email.com';
      const result = EmailValidator.validEmail(control);
      expect(result).toBeNull();
    });

    it('deve aceitar email com subdomínio', () => {
      control.value = 'teste@subdomain.email.com';
      const result = EmailValidator.validEmail(control);
      expect(result).toBeNull();
    });

    it('deve aceitar email com pontos no local', () => {
      control.value = 'teste.nome@email.com';
      const result = EmailValidator.validEmail(control);
      expect(result).toBeNull();
    });

    it('deve aceitar email com hífens no local', () => {
      control.value = 'teste-nome@email.com';
      const result = EmailValidator.validEmail(control);
      expect(result).toBeNull();
    });

    it('deve aceitar email com underscore no local', () => {
      control.value = 'teste_nome@email.com';
      const result = EmailValidator.validEmail(control);
      expect(result).toBeNull();
    });

    it('deve aceitar email com percentual no local', () => {
      control.value = 'teste%nome@email.com';
      const result = EmailValidator.validEmail(control);
      expect(result).toBeNull();
    });

    it('deve aceitar email com mais no local', () => {
      control.value = 'teste+nome@email.com';
      const result = EmailValidator.validEmail(control);
      expect(result).toBeNull();
    });

    it('deve rejeitar email sem @', () => {
      control.value = 'testeemail.com';
      const result = EmailValidator.validEmail(control);
      expect(result).toEqual({ invalidEmail: { value: 'testeemail.com' } });
    });

    it('deve rejeitar email sem domínio', () => {
      control.value = 'teste@';
      const result = EmailValidator.validEmail(control);
      expect(result).toEqual({ invalidEmail: { value: 'teste@' } });
    });

    it('deve rejeitar email sem extensão', () => {
      control.value = 'teste@email';
      const result = EmailValidator.validEmail(control);
      expect(result).toEqual({ invalidEmail: { value: 'teste@email' } });
    });

    it('deve rejeitar email com extensão muito curta', () => {
      control.value = 'teste@email.a';
      const result = EmailValidator.validEmail(control);
      expect(result).toEqual({ invalidEmail: { value: 'teste@email.a' } });
    });
  });

  describe('noSpecialChars', () => {
    it('deve retornar null para valor vazio', () => {
      control.value = '';
      const result = EmailValidator.noSpecialChars(control);
      expect(result).toBeNull();
    });

    it('deve aceitar email válido', () => {
      control.value = 'teste@email.com';
      const result = EmailValidator.noSpecialChars(control);
      expect(result).toBeNull();
    });

    it('deve rejeitar email com espaços', () => {
      control.value = 'teste @email.com';
      const result = EmailValidator.noSpecialChars(control);
      expect(result).toEqual({ forbiddenChars: { value: 'teste @email.com' } });
    });

    it('deve rejeitar email com aspas', () => {
      control.value = 'teste"@email.com';
      const result = EmailValidator.noSpecialChars(control);
      expect(result).toEqual({ forbiddenChars: { value: 'teste"@email.com' } });
    });

    it('deve rejeitar email com vírgula', () => {
      control.value = 'teste,@email.com';
      const result = EmailValidator.noSpecialChars(control);
      expect(result).toEqual({ forbiddenChars: { value: 'teste,@email.com' } });
    });
  });

  describe('maxLength', () => {
    it('deve retornar null para valor vazio', () => {
      control.value = '';
      const result = EmailValidator.maxLength(control);
      expect(result).toBeNull();
    });

    it('deve aceitar email com comprimento normal', () => {
      control.value = 'teste@email.com';
      const result = EmailValidator.maxLength(control);
      expect(result).toBeNull();
    });

    it('deve rejeitar email muito longo', () => {
      control.value = 'a'.repeat(255) + '@email.com';
      const result = EmailValidator.maxLength(control);
      expect(result).toEqual({
        emailTooLong: {
          maxLength: 254,
          actualLength: 265,
        },
      });
    });
  });
});
