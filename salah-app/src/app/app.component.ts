import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { ThemeSelectorService } from './service/theme.service';
import { AutoUpdateService } from './service/auto-update.service';
import { ScrollTopComponent } from './shared/scroll-top/scroll-top.component';
import { SettingsComponent } from './settings/settings.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    MenuComponent,
    SettingsComponent,
    ScrollTopComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  isMenuVisible = signal<boolean>(false);
  isSettingsVisible = signal<boolean>(false);

  constructor(
    private autoUpdateService: AutoUpdateService
  ) { }

  ngOnInit(): void {
    this.autoUpdateService.checkForUpdate();
  }

  toggleMenu() {
    this.isMenuVisible.update(value => !value);
  }

  toggleSettings() {
    this.isSettingsVisible.update(value => !value);
  }

}
