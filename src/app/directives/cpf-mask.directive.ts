import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appCpfMask]',
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
    // Permite teclas de atalho (Ctrl, Cmd, etc.)
    if (event.ctrlKey || event.metaKey) {
      return; // Permite todas as combinações com Ctrl/Cmd
    }

    // Permite apenas números, backspace, delete, tab, escape, enter e setas
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
      'Home',
      'End',
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

    // Remove caracteres não numéricos
    const numericValue = pastedText.replace(/\D/g, '');

    // Limita a 11 dígitos
    const limitedValue = numericValue.substring(0, 11);

    if (limitedValue.length > 0) {
      let formattedValue = limitedValue;

      // Aplica a máscara apenas se tiver 11 dígitos
      if (limitedValue.length === 11) {
        formattedValue = limitedValue.replace(
          /(\d{3})(\d{3})(\d{3})(\d{2})/,
          '$1.$2.$3-$4'
        );
      } else if (limitedValue.length >= 9) {
        // Aplica máscara parcial para 9 ou 10 dígitos
        formattedValue = limitedValue.replace(
          /(\d{3})(\d{3})(\d{3})/,
          '$1.$2.$3'
        );
      } else if (limitedValue.length >= 6) {
        // Aplica máscara parcial para 6 ou mais dígitos
        formattedValue = limitedValue.replace(/(\d{3})(\d{3})/, '$1.$2');
      } else if (limitedValue.length >= 3) {
        // Aplica máscara parcial para 3 ou mais dígitos
        formattedValue = limitedValue.replace(/(\d{3})/, '$1.');
      }

      const input = event.target as HTMLInputElement;
      input.value = formattedValue;

      // Dispara eventos para atualizar o ngModel
      input.dispatchEvent(new Event('input', { bubbles: true }));
      input.dispatchEvent(new Event('change', { bubbles: true }));
    }
  }

  @HostListener('drop', ['$event'])
  onDrop(event: DragEvent) {
    event.preventDefault();

    const droppedText = event.dataTransfer?.getData('text/plain') || '';

    // Remove caracteres não numéricos
    const numericValue = droppedText.replace(/\D/g, '');
    const limitedValue = numericValue.substring(0, 11);

    if (limitedValue.length > 0) {
      let formattedValue = limitedValue;

      if (limitedValue.length === 11) {
        formattedValue = limitedValue.replace(
          /(\d{3})(\d{3})(\d{3})(\d{2})/,
          '$1.$2.$3-$4'
        );
      }

      const input = event.target as HTMLInputElement;
      input.value = formattedValue;
      input.dispatchEvent(new Event('input', { bubbles: true }));
      input.dispatchEvent(new Event('change', { bubbles: true }));
    }
  }
}
