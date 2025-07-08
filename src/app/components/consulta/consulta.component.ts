import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { PessoasService } from '../../services/pessoas.service';
import { IPessoa } from '../../interfaces/pessoa.interface';
import { CpfMaskDirective } from '../../directives/cpf-mask.directive';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.scss'],
})
export class ConsultaComponent {
  cpf: string = '';
  pessoaEncontrada: IPessoa | null = null;
  carregando: boolean = false;

  constructor(
    private pessoasService: PessoasService,
    private dialog: MatDialog
  ) {}

  buscarPorCpf(): void {
    if (!this.cpf || this.cpf.trim() === '') {
      this.abrirModalErro('Por favor, informe um CPF válido.');
      return;
    }

    // Remove caracteres não numéricos (pontos e hífen)
    const cpfNumerico = this.cpf.replace(/\D/g, '');

    if (cpfNumerico.length !== 11) {
      this.abrirModalErro('CPF deve conter 11 dígitos.');
      return;
    }

    this.carregando = true;
    this.pessoaEncontrada = null;

    // Busca todas as pessoas e filtra por CPF
    this.pessoasService.getPessoas().subscribe({
      next: (pessoas) => {
        const pessoa = pessoas.find((p) => p.cpf === cpfNumerico);
        if (pessoa) {
          this.pessoaEncontrada = pessoa;
        } else {
          this.abrirModalErro('CPF não encontrado na base de dados.');
        }
        this.carregando = false;
      },
      error: (error) => {
        console.error('Erro ao buscar pessoa:', error);
        this.abrirModalErro('Erro ao buscar dados. Tente novamente.');
        this.carregando = false;
      },
    });
  }

  limparBusca(): void {
    this.cpf = '';
    this.pessoaEncontrada = null;
  }

  abrirModalErro(mensagem: string): void {
    // Por enquanto, vamos usar um alert simples
    // Depois criaremos o componente de modal
    alert(mensagem);
  }

  formatarCpf(cpf: string): string {
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  }

  formatarTelefone(telefone: string): string {
    if (telefone.length === 11) {
      return telefone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    }
    return telefone;
  }
}
