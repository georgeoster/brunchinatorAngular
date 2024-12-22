import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlacesAutocompleteComponent } from './places-autocomplete.component';

describe('FindPlaceComponent', () => {
  let component: PlacesAutocompleteComponent;
  let fixture: ComponentFixture<PlacesAutocompleteComponent>;

  beforeEach(async () => {
    (window as any).google = {
      maps: {
        places: {
          Autocomplete: function (element:HTMLElement, options:Array<string>) {
            return {
              addListener(event:string, listener:Function) {
                console.log('listener added')
              },
              getPlace() {
                return 'test value';
              }
            };
          }
        }
      }
    };
    await TestBed.configureTestingModule({
      imports: [PlacesAutocompleteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlacesAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
