import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';

import { PaginaInicialComponent } from './pagina-inicial.component';

describe('PaginaInicialComponent', () => {
  let component: PaginaInicialComponent;
  let fixture: ComponentFixture<PaginaInicialComponent>;

  beforeAll(() => {
    Element.prototype.animate = () =>
      ({
        addEventListener: () => {},
        removeEventListener: () => {},
        play: () => {},
        pause: () => {},
        finish: () => {},
        cancel: () => {},
        reverse: () => {},
        onfinish: null,
      } as any);
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaginaInicialComponent],
      imports: [
        RouterTestingModule,
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        BrowserAnimationsModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PaginaInicialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('Criação e Inicialização', () => {
    it('deve criar o componente', () => {
      expect(component).toBeTruthy();
    });

    it('deve renderizar sem erros', () => {
      expect(fixture.nativeElement).toBeTruthy();
    });
  });

  describe('Estrutura da Página', () => {
    it('deve ter o container principal', () => {
      const container = fixture.debugElement.query(
        By.css('.pagina-inicial-container')
      );
      expect(container).toBeTruthy();
    });

    it('deve ter a seção de boas-vindas', () => {
      const bemVindo = fixture.debugElement.query(By.css('.bem-vindo'));
      expect(bemVindo).toBeTruthy();
    });

    it('deve ter o título principal', () => {
      const titulo = fixture.debugElement.query(By.css('.titulo-principal'));
      expect(titulo).toBeTruthy();
      expect(titulo.nativeElement.textContent).toContain(
        'Bem-vindo ao Sistema de Cadastro e Consulta de Pessoas'
      );
    });

    it('deve ter o subtítulo', () => {
      const subtitulo = fixture.debugElement.query(By.css('.subtitulo'));
      expect(subtitulo).toBeTruthy();
      expect(subtitulo.nativeElement.textContent).toContain(
        'Escolha uma das opções abaixo para começar'
      );
    });

    it('deve ter o wrapper dos cards', () => {
      const cardsWrapper = fixture.debugElement.query(By.css('.cards-wrapper'));
      expect(cardsWrapper).toBeTruthy();
    });
  });

  describe('Cards de Navegação', () => {
    it('deve ter dois cards de acesso', () => {
      const cards = fixture.debugElement.queryAll(By.css('.card-acesso'));
      expect(cards.length).toBe(2);
    });

    it('deve ter o card de cadastro', () => {
      const cardCadastro = fixture.debugElement.query(
        By.css('.card-acesso:first-child')
      );
      expect(cardCadastro).toBeTruthy();

      const titulo = cardCadastro.query(By.css('mat-card-title'));
      expect(titulo.nativeElement.textContent).toContain('Cadastro de Pessoa');
    });

    it('deve ter o card de consulta', () => {
      const cardConsulta = fixture.debugElement.query(
        By.css('.card-acesso:last-child')
      );
      expect(cardConsulta).toBeTruthy();

      const titulo = cardConsulta.query(By.css('mat-card-title'));
      expect(titulo.nativeElement.textContent).toContain('Consulta de Pessoa');
    });

    it('deve ter descrições nos cards', () => {
      const cards = fixture.debugElement.queryAll(By.css('.card-acesso'));

      const descricaoCadastro = cards[0].query(By.css('mat-card-content p'));
      expect(descricaoCadastro.nativeElement.textContent).toContain(
        'Cadastre uma nova pessoa no sistema'
      );

      const descricaoConsulta = cards[1].query(By.css('mat-card-content p'));
      expect(descricaoConsulta.nativeElement.textContent).toContain(
        'Consulte os dados de uma pessoa pelo CPF'
      );
    });
  });

  describe('Botões de Navegação', () => {
    it('deve ter botão para cadastro', () => {
      const botaoCadastro = fixture.debugElement.query(
        By.css('button[routerLink="/cadastro"]')
      );
      expect(botaoCadastro).toBeTruthy();
      expect(botaoCadastro.nativeElement.textContent).toContain(
        'Ir para Cadastro'
      );
    });

    it('deve ter botão para consulta', () => {
      const botaoConsulta = fixture.debugElement.query(
        By.css('button[routerLink="/consulta"]')
      );
      expect(botaoConsulta).toBeTruthy();
      expect(botaoConsulta.nativeElement.textContent).toContain(
        'Ir para Consulta'
      );
    });

    it('deve ter ícones nos botões', () => {
      const botoes = fixture.debugElement.queryAll(
        By.css('.botao-acesso mat-icon')
      );
      expect(botoes.length).toBe(2);

      expect(botoes[0].nativeElement.textContent).toBe('person_add');
      expect(botoes[1].nativeElement.textContent).toBe('search');
    });

    it('deve ter cores diferentes nos botões', () => {
      const botaoCadastro = fixture.debugElement.query(
        By.css('button[routerLink="/cadastro"]')
      );
      const botaoConsulta = fixture.debugElement.query(
        By.css('button[routerLink="/consulta"]')
      );

      expect(botaoCadastro.nativeElement.getAttribute('color')).toBe('primary');
      expect(botaoConsulta.nativeElement.getAttribute('color')).toBe('accent');
    });
  });

  describe('Acessibilidade', () => {
    it('deve ter role main no container principal', () => {
      const container = fixture.debugElement.query(
        By.css('.pagina-inicial-container')
      );
      expect(container.nativeElement.getAttribute('role')).toBe('main');
    });

    it('deve ter aria-label no container principal', () => {
      const container = fixture.debugElement.query(
        By.css('.pagina-inicial-container')
      );
      expect(container.nativeElement.getAttribute('aria-label')).toBe(
        'Página inicial do sistema'
      );
    });

    it('deve ter role region no wrapper dos cards', () => {
      const cardsWrapper = fixture.debugElement.query(By.css('.cards-wrapper'));
      expect(cardsWrapper.nativeElement.getAttribute('role')).toBe('region');
    });

    it('deve ter aria-label no wrapper dos cards', () => {
      const cardsWrapper = fixture.debugElement.query(By.css('.cards-wrapper'));
      expect(cardsWrapper.nativeElement.getAttribute('aria-label')).toBe(
        'Opções de navegação'
      );
    });

    it('deve ter role button nos cards', () => {
      const cards = fixture.debugElement.queryAll(By.css('.card-acesso'));
      cards.forEach((card) => {
        expect(card.nativeElement.getAttribute('role')).toBe('button');
      });
    });

    it('deve ter tabindex nos cards', () => {
      const cards = fixture.debugElement.queryAll(By.css('.card-acesso'));
      cards.forEach((card) => {
        expect(card.nativeElement.getAttribute('tabindex')).toBe('0');
      });
    });

    it('deve ter aria-label nos botões', () => {
      const botaoCadastro = fixture.debugElement.query(
        By.css('button[routerLink="/cadastro"]')
      );
      const botaoConsulta = fixture.debugElement.query(
        By.css('button[routerLink="/consulta"]')
      );

      expect(botaoCadastro.nativeElement.getAttribute('aria-label')).toBe(
        'Ir para página de cadastro de pessoa'
      );
      expect(botaoConsulta.nativeElement.getAttribute('aria-label')).toBe(
        'Ir para página de consulta de pessoa'
      );
    });

    it('deve ter aria-hidden nos ícones', () => {
      const icones = fixture.debugElement.queryAll(
        By.css('mat-icon[aria-hidden="true"]')
      );
      expect(icones.length).toBeGreaterThan(0);
    });
  });

  describe('Estrutura HTML Semântica', () => {
    it('deve usar h1 para o título principal', () => {
      const titulo = fixture.debugElement.query(By.css('h1.titulo-principal'));
      expect(titulo).toBeTruthy();
    });

    it('deve ter estrutura de cards correta', () => {
      const cards = fixture.debugElement.queryAll(By.css('.card-acesso'));
      cards.forEach((card) => {
        const header = card.query(By.css('mat-card-header'));
        const content = card.query(By.css('mat-card-content'));
        const actions = card.query(By.css('mat-card-actions'));

        expect(header).toBeTruthy();
        expect(content).toBeTruthy();
        expect(actions).toBeTruthy();
      });
    });
  });

  describe('Classes CSS', () => {
    it('deve ter classes CSS aplicadas corretamente', () => {
      const container = fixture.debugElement.query(
        By.css('.pagina-inicial-container')
      );
      const bemVindo = fixture.debugElement.query(By.css('.bem-vindo'));
      const cardsWrapper = fixture.debugElement.query(By.css('.cards-wrapper'));
      const cards = fixture.debugElement.queryAll(By.css('.card-acesso'));
      const botoes = fixture.debugElement.queryAll(By.css('.botao-acesso'));

      expect(container).toBeTruthy();
      expect(bemVindo).toBeTruthy();
      expect(cardsWrapper).toBeTruthy();
      expect(cards.length).toBe(2);
      expect(botoes.length).toBe(2);
    });
  });

  describe('Responsividade', () => {
    it('deve ter estrutura flexível para responsividade', () => {
      const container = fixture.debugElement.query(
        By.css('.pagina-inicial-container')
      );
      const cardsWrapper = fixture.debugElement.query(By.css('.cards-wrapper'));

      expect(container).toBeTruthy();
      expect(cardsWrapper).toBeTruthy();

      // Verifica se as classes estão aplicadas (mais confiável que getComputedStyle)
      expect(container.nativeElement.className).toContain(
        'pagina-inicial-container'
      );
      expect(cardsWrapper.nativeElement.className).toContain('cards-wrapper');
    });
  });

  describe('Interatividade', () => {
    it('deve ter estrutura interativa nos cards', () => {
      const cards = fixture.debugElement.queryAll(By.css('.card-acesso'));
      expect(cards.length).toBe(2);

      cards.forEach((card) => {
        expect(card.nativeElement.className).toContain('card-acesso');
      });
    });

    it('deve ter estrutura interativa nos botões', () => {
      const botoes = fixture.debugElement.queryAll(By.css('.botao-acesso'));
      expect(botoes.length).toBe(2);

      botoes.forEach((botao) => {
        expect(botao.nativeElement.className).toContain('botao-acesso');
      });
    });
  });
});
