import { CpfValidator } from './cpf.validator';

describe('CpfValidator', () => {
  let control: any;

  beforeEach(() => {
    control = {
      value: '',
      hasError: jest.fn(),
      errors: null,
    };
  });

  describe('validCpf', () => {
    it('deve retornar null para valor vazio', () => {
      control.value = '';
      const result = CpfValidator.validCpf(control);
      expect(result).toBeNull();
    });

    it('deve aceitar CPF válido', () => {
      control.value = '52998224725'; // CPF válido
      const result = CpfValidator.validCpf(control);
      expect(result).toBeNull();
    });

    it('deve aceitar CPF com formatação', () => {
      control.value = '529.982.247-25';
      const result = CpfValidator.validCpf(control);
      expect(result).toBeNull();
    });

    it('deve rejeitar CPF com formato inválido', () => {
      control.value = '1234567890'; // Menos de 11 dígitos
      const result = CpfValidator.validCpf(control);
      expect(result).toEqual({ invalidCpfFormat: { value: '1234567890' } });
    });

    it('deve rejeitar CPF com todos os dígitos iguais', () => {
      control.value = '11111111111';
      const result = CpfValidator.validCpf(control);
      expect(result).toEqual({ cpfAllSameDigits: { value: '11111111111' } });
    });

    it('deve rejeitar CPF com dígitos verificadores incorretos', () => {
      control.value = '12345678901'; // CPF inválido
      const result = CpfValidator.validCpf(control);
      expect(result).toEqual({ invalidCpfDigits: { value: '12345678901' } });
    });
  });

  describe('numericOnly', () => {
    it('deve retornar null para valor vazio', () => {
      control.value = '';
      const result = CpfValidator.numericOnly(control);
      expect(result).toBeNull();
    });

    it('deve aceitar CPF apenas com números', () => {
      control.value = '52998224725';
      const result = CpfValidator.numericOnly(control);
      expect(result).toBeNull();
    });

    it('deve rejeitar CPF com formatação (não aceita caracteres especiais)', () => {
      control.value = '529.982.247-25';
      const result = CpfValidator.numericOnly(control);
      expect(result).toEqual({ nonNumericCpf: { value: '529.982.247-25' } });
    });

    it('deve rejeitar CPF com letras', () => {
      control.value = '5299822472a';
      const result = CpfValidator.numericOnly(control);
      expect(result).toEqual({ nonNumericCpf: { value: '5299822472a' } });
    });
  });

  describe('exactLength', () => {
    it('deve retornar null para valor vazio', () => {
      control.value = '';
      const result = CpfValidator.exactLength(control);
      expect(result).toBeNull();
    });

    it('deve aceitar CPF com 11 dígitos', () => {
      control.value = '52998224725';
      const result = CpfValidator.exactLength(control);
      expect(result).toBeNull();
    });

    it('deve aceitar CPF formatado com 11 dígitos', () => {
      control.value = '529.982.247-25';
      const result = CpfValidator.exactLength(control);
      expect(result).toBeNull();
    });

    it('deve rejeitar CPF com menos de 11 dígitos', () => {
      control.value = '1234567890';
      const result = CpfValidator.exactLength(control);
      expect(result).toEqual({
        cpfWrongLength: {
          actualLength: 10,
          expectedLength: 11,
        },
      });
    });

    it('deve rejeitar CPF com mais de 11 dígitos', () => {
      control.value = '123456789012';
      const result = CpfValidator.exactLength(control);
      expect(result).toEqual({
        cpfWrongLength: {
          actualLength: 12,
          expectedLength: 11,
        },
      });
    });
  });

  describe('completeCpfValidation', () => {
    it('deve retornar null para valor vazio', () => {
      control.value = '';
      const result = CpfValidator.completeCpfValidation(control);
      expect(result).toBeNull();
    });

    it('deve aceitar CPF válido completo', () => {
      control.value = '52998224725';
      const result = CpfValidator.completeCpfValidation(control);
      expect(result).toBeNull();
    });

    it('deve rejeitar CPF com letras', () => {
      control.value = '5299822472a';
      const result = CpfValidator.completeCpfValidation(control);
      expect(result).toEqual({ nonNumericCpf: { value: '5299822472a' } });
    });

    it('deve rejeitar CPF com comprimento incorreto', () => {
      control.value = '1234567890';
      const result = CpfValidator.completeCpfValidation(control);
      expect(result).toEqual({
        cpfWrongLength: {
          actualLength: 10,
          expectedLength: 11,
        },
      });
    });

    it('deve rejeitar CPF inválido', () => {
      control.value = '12345678901';
      const result = CpfValidator.completeCpfValidation(control);
      expect(result).toEqual({ invalidCpfDigits: { value: '12345678901' } });
    });
  });
});
