import { Component, signal } from '@angular/core';
import { SupabaseService } from '../../service/supabase.service';
import { ActivatedRoute } from '@angular/router';
import { Translation } from '../../model/translation.model';

@Component({
  selector: 'app-ayah',
  standalone: true,
  imports: [],
  templateUrl: './ayah.component.html',
  styleUrl: './ayah.component.css',
  host: {
    class: 'app-bg'
  }
})
export class AyahComponent {

  surahNumber!: string;
  surahName!: string;
  surahName_ar!: string;

  ayahs = signal<Translation[]>([]);

  constructor(
    private supabaseService: SupabaseService,
    private route: ActivatedRoute) {
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
          console.log(data.data);
          this.ayahs.set(data.data);
        }
      }
    );
  }

}
