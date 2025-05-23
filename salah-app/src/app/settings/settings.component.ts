import { Component, computed, effect, inject, input, OnInit, output, signal } from '@angular/core';
import { AppTheme, ThemeSelectorService } from '../service/theme.service';
import { SupabaseService } from '../service/supabase.service';
import { Translator } from '../model/translation.model';
import { HeaderService } from '../header/header.service';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-settings',
  imports: [],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent implements OnInit {

  headerService = inject(HeaderService);
  authService = inject(AuthService);

  isThemeDark = signal<boolean>(false);

  quranTranslators = signal<Translator[]>([]);

  selectedTranslator = signal<string>('');

  hadithSources = signal<string[]>([]);

  selectedSource = signal<string>('');

  protected localMenuVisible = signal(false);

  constructor(
    protected themeSelector: ThemeSelectorService,
    private readonly supabaseService: SupabaseService,
  ) {
    effect(
      () => {
        this.localMenuVisible.set(this.headerService.isSettingsVisible());
      }
    );

    const theme = localStorage.getItem('theme');
    if (theme) {
      theme === 'dark' ? this.themeSelector.setDarkTheme() : this.themeSelector.setLightTheme();
    }
    else {
      this.themeSelector.setSystemTheme();
    }

    this.getSelectedSource();
  }

  ngOnInit(): void {
    this.isThemeDark.set(this.themeSelector.currentTheme() === 'dark');

    if (this.authService.isLoggedIn()) {
      this.getQuranTranslators();
      this.getHadithSources();
    }
  }

  getSelectedSource() {
    if (this.authService.isLoggedIn())
      return;

    // Load saved hadith source from localStorage
    const savedSource = localStorage.getItem('hadithSource');

    if (savedSource) {
      this.selectedSource.set(savedSource)
      this.supabaseService.hadithSource.set(savedSource);
    }
    else {
      localStorage.setItem('hadithSource', this.supabaseService.hadithSource());
      this.selectedSource.set(this.supabaseService.hadithSource());
    }

    const savedTranslator = localStorage.getItem('quranTranslator');

    if (savedTranslator) {
      this.selectedTranslator.set(savedTranslator);
      this.supabaseService.quranTranslator.set(savedTranslator);
    }
    else {
      localStorage.setItem('quranTranslator', this.supabaseService.quranTranslator());
      this.selectedTranslator.set(this.supabaseService.quranTranslator());
    }
  }

  getQuranTranslators = computed(() => {
    this.supabaseService.getQuranTranslators()
      .subscribe(
        {
          next: (data: any) => {
            this.quranTranslators.set(data.data);
          }
        }
      );
  });

  getHadithSources = computed(() => {
    this.supabaseService.findActiveHadithSources()
      .subscribe(
        {
          next: (data: any) => {
            this.hadithSources.set(data.data.map((item: any) => item.name));
          }
        }
      );
  });

  switchTheme(): void {
    this.isThemeDark.set(!this.isThemeDark());
    if (this.isThemeDark()) {
      this.themeSelector.setDarkTheme();
    } else {
      this.themeSelector.setLightTheme();
    }
  }

  onMenuItemClick() {
    this.headerService.closeSettings();
    //reload page when onMenuItemClick
    window.location.reload();
  }

  onQuranTranslatorChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.selectedTranslator.set(select.value);

    // Save to localStorage when selection changes
    localStorage.setItem('quranTranslator', this.selectedTranslator());
  }

  onHadithSourceChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.selectedSource.set(select.value);

    // Save to localStorage when selection changes
    localStorage.setItem('hadithSource', this.selectedSource());
  }

}
