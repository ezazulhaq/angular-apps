import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PrayerTimesComponent } from './prayer-times/prayer-times.component';
import { MenuComponent } from './menu/menu.component';
import { ThemeSelectorService } from './service/theme.service';
import { AutoUpdateService } from './service/auto-update.service';
import { ChatbotComponent } from "./chatbot/chatbot.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    PrayerTimesComponent,
    MenuComponent,
    ChatbotComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  isThemeDark = signal<boolean>(false);

  isMenuVisible = signal<boolean>(false);

  constructor(
    protected themeSelector: ThemeSelectorService,
    private autoUpdateService: AutoUpdateService
  ) {
    this.themeSelector.setSystemTheme();
  }

  switchTheme(): void {
    this.isThemeDark.set(!this.isThemeDark());
    if (this.isThemeDark()) {
      this.themeSelector.setDarkTheme();
    } else {
      this.themeSelector.setLightTheme();
    }
  }

  ngOnInit(): void {
    this.isThemeDark.set(this.themeSelector.currentTheme() === 'dark');
    this.autoUpdateService.checkForUpdate();
  }

  toggleMenu() {
    this.isMenuVisible.update(value => !value);
  }

}
