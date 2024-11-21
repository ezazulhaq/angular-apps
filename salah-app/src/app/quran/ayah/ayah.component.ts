import { Component, effect, signal } from '@angular/core';
import { SupabaseService } from '../../service/supabase.service';
import { ActivatedRoute } from '@angular/router';
import { Translation } from '../../model/translation.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ayah',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './ayah.component.html',
  styleUrl: './ayah.component.css',
  host: {
    class: 'app-bg',
  }
})
export class AyahComponent {

  surahNumber!: string;
  surahName!: string;
  surahName_ar!: string;

  ayahs = signal<Translation[]>([]);

  isTranslationVisible = signal<boolean>(true);

  constructor(
    private readonly supabaseService: SupabaseService,
    private readonly route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.surahNumber = params['surahNumber'];
      this.surahName = params['surahName'];
      this.surahName_ar = params['surahName_ar'];
    });
  }

  ngOnInit(): void {
    this.supabaseService.getSurahTranslation("en", +this.surahNumber, "ahmedraza").subscribe(
      {
        next: (data: any) => {
          this.ayahs.set(data.data);
        }
      }
    );
  }

}
