import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MondongoComponent } from './mondongo.component';

describe('MondongoComponent', () => {
  let component: MondongoComponent;
  let fixture: ComponentFixture<MondongoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MondongoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MondongoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
