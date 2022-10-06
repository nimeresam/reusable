import { Directive, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[pasteFromClipboard]'
})
export class PasteFromClipboardDirective {

  @Output('pasteFromClipboard') paste: EventEmitter<string>;

  constructor() { 
    this.paste = new EventEmitter();
  }

  @HostListener('click')
  onClick() {
    navigator.clipboard.readText()
    .then(
      text => {
        this.paste.emit(text);
      }
    ).catch(err => {
      // TODO: show error
    })
  }

}
