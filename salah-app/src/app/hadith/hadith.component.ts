import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SupabaseService } from '../service/supabase.service';

@Component({
  selector: 'app-hadith',
  imports: [
    CommonModule,
  ],
  templateUrl: './hadith.component.html',
  styleUrl: './hadith.component.css',
  host: {
    class: 'app-bg'
  }
})
export class HadithComponent {
  chapterList = signal<any[]>([]);

  constructor(private readonly supabaseService: SupabaseService) { }

  ngOnInit(): void {
    this.supabaseService.getHadithChaptersFromSource("Sahih Bukhari").subscribe(
      {
        next: (data: any) => {
          this.chapterList.set(data.data);
          console.log(JSON.stringify(data.data, null, 2));
        },
        error: (error: any) => console.log(error.error),
        complete: () => console.log("complete")
      }
    );
  }
}
