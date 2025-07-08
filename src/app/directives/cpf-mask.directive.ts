import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appCpfMask]',
  standalone: true,
})
export class CpfMaskDirective {
  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event'])
  onInput(event: InputEvent) {
    const input = event.target as HTMLInputElement;
    let value = input.value.replace(/\D/g, ''); // Remove caracteres não numéricos

    // Limita a 11 dígitos
    if (value.length > 11) {
      value = value.substring(0, 11);
    }

    // Aplica a máscara
    if (value.length > 0) {
      value = value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    }

    // Atualiza o valor do input
    input.value = value;

    // Dispara evento de input para atualizar o ngModel
    input.dispatchEvent(new Event('input'));
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    // Permite apenas números, backspace, delete, tab, escape, enter
    const allowedKeys = [
      'Backspace',
      'Delete',
      'Tab',
      'Escape',
      'Enter',
      'ArrowLeft',
      'ArrowRight',
      'ArrowUp',
      'ArrowDown',
    ];

    const isNumber = /[0-9]/.test(event.key);
    const isAllowedKey = allowedKeys.includes(event.key);

    if (!isNumber && !isAllowedKey) {
      event.preventDefault();
    }
  }

  @HostListener('paste', ['$event'])
  onPaste(event: ClipboardEvent) {
    event.preventDefault();
    const pastedText = event.clipboardData?.getData('text/plain') || '';
    const numericValue = pastedText.replace(/\D/g, '').substring(0, 11);

    if (numericValue.length > 0) {
      const formattedValue = numericValue.replace(
        /(\d{3})(\d{3})(\d{3})(\d{2})/,
        '$1.$2.$3-$4'
      );
      const input = event.target as HTMLInputElement;
      input.value = formattedValue;
      input.dispatchEvent(new Event('input'));
    }
  }
}
