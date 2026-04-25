import { Component, Input, Output, EventEmitter, HostListener, ElementRef } from '@angular/core';

@Component({
  selector: 'app-selector',
  templateUrl: './selector.component.html',
  styleUrls: ['./selector.component.css']
})
export class SelectComponent {

  @Input() options: any[] = [];
  @Input() selected: any;

  @Output() selectionChange = new EventEmitter<any>();

  constructor(private eRef: ElementRef) {}

  @HostListener('document:click', ['$event'])
  clickOutside(event: Event) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.isOpen = false;
    }
  }

  isOpen = false;

  toggle() {
    this.isOpen = !this.isOpen;
  }

  selectOption(option: string) {
    this.selected = option;
    this.selectionChange.emit(option);
    this.isOpen = false;
  }
}
