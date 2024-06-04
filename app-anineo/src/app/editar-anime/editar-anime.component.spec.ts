import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarAnimeComponent } from './editar-anime.component';

describe('EditarAnimeComponent', () => {
  let component: EditarAnimeComponent;
  let fixture: ComponentFixture<EditarAnimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditarAnimeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditarAnimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
