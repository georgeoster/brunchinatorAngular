import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'brunch-text-input',
  imports: [FormsModule],
  templateUrl: './text-input.component.html',
  styleUrl: './text-input.component.css'
})
export class TextInputComponent {

  @Input() text:string = '';
  @Output() textChange = new EventEmitter<string>();
  @Input() placeholder:string = ''
}
