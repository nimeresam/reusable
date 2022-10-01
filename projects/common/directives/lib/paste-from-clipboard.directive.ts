import { Directive, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Directive({
  selector: '[pasteFromClipboard]',
  standalone: true
})
export class PasteFromClipboardDirective {

  @Input() control?: FormControl;
  @Output() paste: EventEmitter<string>;

  constructor() { 
    this.paste = new EventEmitter();
  }

  @HostListener('click')
  onClick() {
    navigator.clipboard.readText()
    .then(
      text => {
        this.control?.setValue(text);
        this.paste.emit(text);
      }
    ).catch(err => {
      // TODO: show error
    })
  }

}
