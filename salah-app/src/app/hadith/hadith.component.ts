import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SupabaseService } from '../service/supabase.service';
import { HadithChapters } from './hadith.model';

@Component({
  selector: 'app-hadith',
  imports: [
    CommonModule,
    RouterLink,
  ],
  templateUrl: './hadith.component.html',
  styleUrl: './hadith.component.css',
  host: {
    class: 'app-bg'
  }
})
export class HadithComponent {

  chapterList = signal<HadithChapters[]>([]);

  hadithSource = signal<string>("Sahih Bukhari");

  constructor(private readonly supabaseService: SupabaseService) { }

  ngOnInit(): void {
    this.supabaseService.getHadithChaptersFromSource(this.hadithSource())
      .subscribe(
        {
          next: (data: any) => {
            this.chapterList.set(data.data);
          },
          error: (error: any) => console.log(error.error),
          complete: () => console.log("complete")
        }
      );
  }
}
