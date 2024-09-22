import { Component, HostListener, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PrayerTimesComponent } from './prayer-times/prayer-times.component';
import { MenuComponent } from './mobile/menu/menu.component';
import { ThemeSelectorService } from './service/theme.service';
import { AutoUpdateService } from './service/auto-update.service';

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

  isMenuVisible = signal<boolean>(true);
  private lastScrollPosition = signal<number>(0);
  private scrollThreshold = 5; // Adjust this value as needed

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

  @HostListener('window:scroll', [])
  onWindowScrollMenu() {
    const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop;

    // Check if we're at the top of the page
    if (currentScrollPosition === 0) {
      this.isMenuVisible.set(true);
      this.lastScrollPosition.set(currentScrollPosition);
      return;
    }

    // Only trigger hide/show if we've scrolled more than the threshold
    if (Math.abs(currentScrollPosition - this.lastScrollPosition()) > this.scrollThreshold) {
      if (currentScrollPosition < this.lastScrollPosition()) {
        // Scrolling up
        this.isMenuVisible.set(true);
      } else {
        // Scrolling down
        this.isMenuVisible.set(false);
      }
      this.lastScrollPosition.set(currentScrollPosition);
    }
  }
}
