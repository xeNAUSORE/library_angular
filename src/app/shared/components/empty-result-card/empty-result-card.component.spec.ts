import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptyResultCardComponent } from './empty-result-card.component';

describe('EmptyResultCardComponent', () => {
  let component: EmptyResultCardComponent;
  let fixture: ComponentFixture<EmptyResultCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmptyResultCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmptyResultCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
