import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearAnimesComponent } from './crear-animes.component';

describe('CrearAnimesComponent', () => {
  let component: CrearAnimesComponent;
  let fixture: ComponentFixture<CrearAnimesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CrearAnimesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CrearAnimesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
