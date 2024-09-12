import { Component, OnInit, computed, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PrayerTimesComponent } from './prayer-times/prayer-times.component';
import { MenuComponent } from './mobile/menu/menu.component';
import { ThemeSelectorService } from './service/theme.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    PrayerTimesComponent,
    MenuComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  isThemeDark = signal<boolean>(false);

  constructor(protected themeSelector: ThemeSelectorService) {
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
  }
}
