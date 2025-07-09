import { TelefoneValidator } from './telefone.validator';

describe('TelefoneValidator', () => {
  let control: any;

  beforeEach(() => {
    control = {
      value: '',
      hasError: jest.fn(),
      errors: null,
    };
  });

  describe('validTelefone', () => {
    it('deve retornar null para valor vazio', () => {
      control.value = '';
      const result = TelefoneValidator.validTelefone(control);
      expect(result).toBeNull();
    });

    it('deve aceitar telefone com 10 dígitos', () => {
      control.value = '1199999999';
      const result = TelefoneValidator.validTelefone(control);
      expect(result).toBeNull();
    });

    it('deve aceitar telefone com 11 dígitos', () => {
      control.value = '11999999999';
      const result = TelefoneValidator.validTelefone(control);
      expect(result).toBeNull();
    });

    it('deve aceitar telefone formatado', () => {
      control.value = '(11) 99999-9999';
      const result = TelefoneValidator.validTelefone(control);
      expect(result).toBeNull();
    });

    it('deve rejeitar telefone com menos de 10 dígitos', () => {
      control.value = '119999999';
      const result = TelefoneValidator.validTelefone(control);
      expect(result).toEqual({ invalidTelefoneFormat: { value: '119999999' } });
    });

    it('deve rejeitar telefone com mais de 11 dígitos', () => {
      control.value = '119999999999';
      const result = TelefoneValidator.validTelefone(control);
      expect(result).toEqual({
        invalidTelefoneFormat: { value: '119999999999' },
      });
    });
  });

  describe('numericOnly', () => {
    it('deve retornar null para valor vazio', () => {
      control.value = '';
      const result = TelefoneValidator.numericOnly(control);
      expect(result).toBeNull();
    });

    it('deve aceitar telefone apenas com números', () => {
      control.value = '11999999999';
      const result = TelefoneValidator.numericOnly(control);
      expect(result).toBeNull();
    });

    it('deve rejeitar telefone formatado (não aceita caracteres especiais)', () => {
      control.value = '(11) 99999-9999';
      const result = TelefoneValidator.numericOnly(control);
      expect(result).toEqual({
        nonNumericTelefone: { value: '(11) 99999-9999' },
      });
    });

    it('deve rejeitar telefone com letras', () => {
      control.value = '1199999999a';
      const result = TelefoneValidator.numericOnly(control);
      expect(result).toEqual({ nonNumericTelefone: { value: '1199999999a' } });
    });
  });

  describe('validLength', () => {
    it('deve retornar null para valor vazio', () => {
      control.value = '';
      const result = TelefoneValidator.validLength(control);
      expect(result).toBeNull();
    });

    it('deve aceitar telefone com 10 dígitos', () => {
      control.value = '1199999999';
      const result = TelefoneValidator.validLength(control);
      expect(result).toBeNull();
    });

    it('deve aceitar telefone com 11 dígitos', () => {
      control.value = '11999999999';
      const result = TelefoneValidator.validLength(control);
      expect(result).toBeNull();
    });

    it('deve rejeitar telefone com menos de 10 dígitos', () => {
      control.value = '119999999';
      const result = TelefoneValidator.validLength(control);
      expect(result).toEqual({
        telefoneWrongLength: {
          actualLength: 9,
          minLength: 10,
          maxLength: 11,
        },
      });
    });

    it('deve rejeitar telefone com mais de 11 dígitos', () => {
      control.value = '119999999999';
      const result = TelefoneValidator.validLength(control);
      expect(result).toEqual({
        telefoneWrongLength: {
          actualLength: 12,
          minLength: 10,
          maxLength: 11,
        },
      });
    });
  });

  describe('validDDD', () => {
    it('deve retornar null para valor vazio', () => {
      control.value = '';
      const result = TelefoneValidator.validDDD(control);
      expect(result).toBeNull();
    });

    it('deve aceitar DDD válido (11)', () => {
      control.value = '11999999999';
      const result = TelefoneValidator.validDDD(control);
      expect(result).toBeNull();
    });

    it('deve aceitar DDD válido (99)', () => {
      control.value = '99999999999';
      const result = TelefoneValidator.validDDD(control);
      expect(result).toBeNull();
    });

    it('deve rejeitar DDD inválido (10)', () => {
      control.value = '10999999999';
      const result = TelefoneValidator.validDDD(control);
      expect(result).toEqual({ invalidDDD: { ddd: 10, value: '10999999999' } });
    });

    it('deve rejeitar DDD inválido (100)', () => {
      control.value = '10099999999';
      const result = TelefoneValidator.validDDD(control);
      expect(result).toEqual({
        invalidDDD: { ddd: 10, value: '10099999999' },
      });
    });
  });

  describe('noLeadingZero', () => {
    it('deve retornar null para valor vazio', () => {
      control.value = '';
      const result = TelefoneValidator.noLeadingZero(control);
      expect(result).toBeNull();
    });

    it('deve aceitar telefone sem zero no início', () => {
      control.value = '11999999999';
      const result = TelefoneValidator.noLeadingZero(control);
      expect(result).toBeNull();
    });

    it('deve rejeitar telefone com zero no início', () => {
      control.value = '01199999999';
      const result = TelefoneValidator.noLeadingZero(control);
      expect(result).toEqual({ telefoneLeadingZero: { value: '01199999999' } });
    });
  });

  describe('completeTelefoneValidation', () => {
    it('deve retornar null para valor vazio', () => {
      control.value = '';
      const result = TelefoneValidator.completeTelefoneValidation(control);
      expect(result).toBeNull();
    });

    it('deve aceitar telefone válido completo', () => {
      control.value = '11999999999';
      const result = TelefoneValidator.completeTelefoneValidation(control);
      expect(result).toBeNull();
    });

    it('deve rejeitar telefone com letras', () => {
      control.value = '1199999999a';
      const result = TelefoneValidator.completeTelefoneValidation(control);
      expect(result).toEqual({ nonNumericTelefone: { value: '1199999999a' } });
    });

    it('deve rejeitar telefone com comprimento incorreto', () => {
      control.value = '119999999';
      const result = TelefoneValidator.completeTelefoneValidation(control);
      expect(result).toEqual({
        telefoneWrongLength: {
          actualLength: 9,
          minLength: 10,
          maxLength: 11,
        },
      });
    });

    it('deve rejeitar telefone com DDD inválido', () => {
      control.value = '10999999999';
      const result = TelefoneValidator.completeTelefoneValidation(control);
      expect(result).toEqual({ invalidDDD: { ddd: 10, value: '10999999999' } });
    });

    it('deve rejeitar telefone com zero no início', () => {
      control.value = '01199999999';
      const result = TelefoneValidator.completeTelefoneValidation(control);
      expect(result).toEqual({ invalidDDD: { ddd: 1, value: '01199999999' } });
    });
  });

  describe('celular', () => {
    it('deve retornar null para valor vazio', () => {
      control.value = '';
      const result = TelefoneValidator.celular(control);
      expect(result).toBeNull();
    });

    it('deve aceitar celular com 11 dígitos', () => {
      control.value = '11999999999';
      const result = TelefoneValidator.celular(control);
      expect(result).toBeNull();
    });

    it('deve rejeitar celular com 10 dígitos', () => {
      control.value = '1199999999';
      const result = TelefoneValidator.celular(control);
      expect(result).toEqual({
        celularWrongLength: {
          actualLength: 10,
          expectedLength: 11,
        },
      });
    });
  });

  describe('telefoneFixo', () => {
    it('deve retornar null para valor vazio', () => {
      control.value = '';
      const result = TelefoneValidator.telefoneFixo(control);
      expect(result).toBeNull();
    });

    it('deve aceitar telefone fixo com 10 dígitos', () => {
      control.value = '1199999999';
      const result = TelefoneValidator.telefoneFixo(control);
      expect(result).toBeNull();
    });

    it('deve rejeitar telefone fixo com 11 dígitos', () => {
      control.value = '11999999999';
      const result = TelefoneValidator.telefoneFixo(control);
      expect(result).toEqual({
        telefoneFixoWrongLength: {
          actualLength: 11,
          expectedLength: 10,
        },
      });
    });
  });
});
