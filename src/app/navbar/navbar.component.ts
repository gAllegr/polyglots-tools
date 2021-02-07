import { Component } from '@angular/core';

/**
 * Navbar of the application.
 */
@Component({
  selector: 'app-navbar',
  styleUrls: ['./navbar.component.scss'],
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {
  public menuCollapsed: boolean;
  public title: string;

  constructor() {
    this.menuCollapsed = true;
    this.title = 'Polyglots Tools';
  }

  /**
   * Function to toggle the collapsible menu.
   */
  public toogleMenuCollapse(): void {
    this.menuCollapsed = !this.menuCollapsed;
  }
}
