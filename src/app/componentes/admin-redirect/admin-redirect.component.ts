import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-redirect',
  template: '',
})
export class AdminRedirectComponent implements OnInit{
  constructor() { }

  ngOnInit(): void {
    window.location.href = 'https://localhost:1337/admin';
  }

}
