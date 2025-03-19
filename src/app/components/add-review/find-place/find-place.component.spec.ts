import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FindPlaceComponent } from './find-place.component';
import { autoCompletePlace } from '../../../models/AutoCompletePlace';
import { dummyPlace } from '../../../utils/tests/mocks';

describe('FindPlaceComponent', () => {
  let component: FindPlaceComponent;
  let fixture: ComponentFixture<FindPlaceComponent>;

  beforeEach(async () => {
    // Setup a minimal google maps API stub for the child component
    (window as any).google = {
      maps: {
        places: {
          Autocomplete: function (element: HTMLElement, options: Array<string>) {
            return {
              addListener(event: string, listener: Function) {
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
      imports: [FindPlaceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FindPlaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the correct header text', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const header = compiled.querySelector('h1');
    expect(header?.textContent).toContain('Where did you brunch?');
  });

  it('should emit placeSelected event when handlePlaceSelected is called', () => {
    let emittedValue: autoCompletePlace | undefined;
    component.placeSelected.subscribe((place: autoCompletePlace) => {
      emittedValue = place;
    });
    component.handlePlaceSelected(dummyPlace);
    expect(emittedValue).toEqual(dummyPlace);
  });

  it('should forward the placeSelected event from the child component', () => {
    // Assume the child component has a selector 'app-places-autocomplete'
    // and it emits a "placeSelected" event.
    spyOn(component.placeSelected, 'emit');

    // Find the child component in the template.
    const childComponent = fixture.debugElement.query(By.css('app-places-autocomplete'));
    // Simulate the child emitting the "placeSelected" event.
    childComponent.triggerEventHandler('placeSelected', dummyPlace);

    expect(component.placeSelected.emit).toHaveBeenCalledWith(dummyPlace);
  });
});
