import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetCoinComponent } from './get-coin.component';

describe('GetCoinComponent', () => {
  let component: GetCoinComponent;
  let fixture: ComponentFixture<GetCoinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetCoinComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetCoinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
