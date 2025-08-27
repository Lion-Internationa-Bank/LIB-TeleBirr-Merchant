import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  currentYear
  
  constructor() { }

  ngOnInit() {
    this.currentYear = new Date().getFullYear();
  }
}
