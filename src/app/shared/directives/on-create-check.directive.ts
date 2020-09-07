import { Directive, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[appOnCreateCheck]'
})
export class OnCreateCheckDirective {
  @Output() appOnCreateCheck: EventEmitter<any> = new EventEmitter<any>();
  constructor() { }

  ngOnInit() {      
    this.appOnCreateCheck.emit();
  }

}
