import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { ThemeSelectorService } from './service/theme.service';
import { AutoUpdateService } from './service/auto-update.service';
import { ScrollTopComponent } from './shared/scroll-top/scroll-top.component';
import { SettingsComponent } from './settings/settings.component';
import { HeaderComponent } from './header/header.component';
import { HeaderService } from './header/header.service';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    HeaderComponent,
    MenuComponent,
    SettingsComponent,
    ScrollTopComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  headerService = inject(HeaderService);

  constructor(
    private autoUpdateService: AutoUpdateService,
    protected themeSelector: ThemeSelectorService,
  ) {
    const theme = localStorage.getItem('theme');
    if (theme) {
      theme === 'dark' ? this.themeSelector.setDarkTheme() : this.themeSelector.setLightTheme();
    }
    else {
      this.themeSelector.setSystemTheme();
    }
  }

  ngOnInit(): void {
    this.autoUpdateService.checkForUpdate();
  }

}
