import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaginaInicialComponent } from './pagina-inicial.component';
import { MatCardModule } from '@angular/material/card';

describe('PaginaInicialComponent', () => {
  let component: PaginaInicialComponent;
  let fixture: ComponentFixture<PaginaInicialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaginaInicialComponent],
      imports: [MatCardModule],
    }).compileComponents();

    fixture = TestBed.createComponent(PaginaInicialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });
});
