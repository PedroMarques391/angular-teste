import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCoinComponent } from './create-coin.component';

describe('CreateCoinComponent', () => {
  let component: CreateCoinComponent;
  let fixture: ComponentFixture<CreateCoinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateCoinComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateCoinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
