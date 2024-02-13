import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DomainAddComponent } from './domain-add.component';

describe('DomainAddComponent', () => {
  let component: DomainAddComponent;
  let fixture: ComponentFixture<DomainAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DomainAddComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DomainAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
