import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilePlaceCardComponent } from './profile-place-card.component';

describe('ProfilePlaceCardComponent', () => {
  let component: ProfilePlaceCardComponent;
  let fixture: ComponentFixture<ProfilePlaceCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfilePlaceCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfilePlaceCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
