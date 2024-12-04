import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'brunch-button',
  imports: [NgClass],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css'
})
export class ButtonComponent {

  @Input() title: string = 'button';
  @Input() showBorder: boolean = true;

  @Output('buttonClick') buttonClick: EventEmitter<any> = new EventEmitter();

  clickHandler(){
    this.buttonClick.emit();
  }

}
