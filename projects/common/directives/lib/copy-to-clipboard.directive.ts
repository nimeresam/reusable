import { Directive, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[copyToClipboard]',
  standalone: true
})
export class CopyToClipboardDirective {
  @Input() text!: string | number | boolean;

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
