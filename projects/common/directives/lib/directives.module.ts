import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CopyToClipboardDirective } from './copy-to-clipboard.directive';
import { PasteFromClipboardDirective } from './paste-from-clipboard.directive';
import { ConfirmDirective } from './confirm.directive';
import { MiddleClickDirective } from './middle-click.directive';
import { RightClickDirective } from './right-click.directive';



@NgModule({
  declarations: [
    CopyToClipboardDirective,
    PasteFromClipboardDirective,
    ConfirmDirective,
    MiddleClickDirective,
    RightClickDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CopyToClipboardDirective,
    PasteFromClipboardDirective,
    ConfirmDirective
  ]
})
export class ReusableDirectivesModule { }
