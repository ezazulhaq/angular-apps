import { Component, computed, effect, input, OnInit, output, signal } from '@angular/core';
import { ThemeSelectorService } from '../service/theme.service';
import { SupabaseService } from '../service/supabase.service';

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

  hadithSources = signal<string[]>([]);

  selectedSource = signal<string>('');

  protected localMenuVisible = signal(false);

  constructor(
    protected themeSelector: ThemeSelectorService,
    private readonly supabaseService: SupabaseService,
  ) {
    effect(
      () => {
        this.localMenuVisible.set(this.settingsVisible());
      }
    );

    this.themeSelector.setSystemTheme();
    this.getSelectedSource();
  }

  ngOnInit(): void {
    this.isThemeDark.set(this.themeSelector.currentTheme() === 'dark');
    this.getHadithSources();

  }

  getSelectedSource() {
    // Load saved hadith source from localStorage
    const savedSource = localStorage.getItem('hadithSource');
    if (savedSource) {
      this.selectedSource.set(savedSource);
    }
    else {
      // Save to localStorage when not stored
      localStorage.setItem('hadithSource', 'Sahih Bhukari');
      this.selectedSource.set('Sahih Bhukari');
    }
  }

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
    this.localMenuVisible.set(false);
    this.settingsClose.emit(false)
  }

  onHadithSourceChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.selectedSource.set(select.value);

    // Save to localStorage when selection changes
    localStorage.setItem('hadithSource', this.selectedSource());
  }

}
