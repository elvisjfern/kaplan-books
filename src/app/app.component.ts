import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'kaplan-books';
  @ViewChild('sidenav') sidenav: MatSidenav;

  handleBlurSidenav(event) {
    this.sidenav.close();
  }
}
