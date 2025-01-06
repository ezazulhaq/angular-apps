import { Component, effect, input, OnInit, output, signal } from '@angular/core';
import { ThemeSelectorService } from '../service/theme.service';

@Component({
  selector: 'app-settings',
  imports: [],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent implements OnInit {

  settingsVisible = input.required<boolean>();
  settingsClose = output<boolean>();

  isThemeDark = signal<boolean>(false);

  protected localMenuVisible = signal(false);

  constructor(
    protected themeSelector: ThemeSelectorService
  ) {
    effect(
      () => {
        this.localMenuVisible.set(this.settingsVisible());
      }
    );

    this.themeSelector.setSystemTheme();
  }

  ngOnInit(): void {
    this.isThemeDark.set(this.themeSelector.currentTheme() === 'dark');
  }

  switchTheme(): void {
    this.isThemeDark.set(!this.isThemeDark());
    if (this.isThemeDark()) {
      this.themeSelector.setDarkTheme();
    } else {
      this.themeSelector.setLightTheme();
    }
  }

  onMenuItemClick() {
    this.localMenuVisible.set(false);
    this.settingsClose.emit(false)
  }

}
