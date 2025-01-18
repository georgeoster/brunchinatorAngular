import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaceUserCardComponent } from './place-user-card.component';

describe('PlaceUserCardComponent', () => {
  let component: PlaceUserCardComponent;
  let fixture: ComponentFixture<PlaceUserCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlaceUserCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlaceUserCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
