import { Directive, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[copyToClipboard]'
})
export class CopyToClipboardDirective {
  @Input('copyToClipboard') text!: string | number | boolean;

  constructor() { }

  @HostListener('click')
  onClick() {
    if (!this.text) return;
    let textarea = document.createElement('textarea');
    textarea.value = this.text + '';
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    textarea.remove();
    // TODO: show snakbar
  }

}
