import { Component, effect, inject } from '@angular/core';
import { HeaderService } from './header.service';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  headerService = inject(HeaderService);

  toggleMenu() {
    this.headerService.toggleMenu();
  }

  toggleSettings() {
    this.headerService.toggleSettings();
  }

}