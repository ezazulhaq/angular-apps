import { CommonModule } from '@angular/common';
import { Component, computed, effect, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { SupabaseService } from '../service/supabase.service';
import { HadithChapters, HadithDetails } from './hadith.model';
import { ListHomeComponent } from '../shared/skeleton/list-home/list-home.component';
import { BookmarkService } from '../service/bookmark.service';
import { computeMsgId } from '@angular/compiler';

@Component({
  selector: 'app-hadith',
  imports: [
    CommonModule,
    RouterLink,
    ListHomeComponent,
  ],
  templateUrl: './hadith.component.html',
  styleUrl: './hadith.component.css',
  host: {
    class: 'app-bg'
  }
})
export class HadithComponent {

  chapterList = signal<HadithChapters[]>([]);

  hadithSource = computed(() => this.supabaseService.hadithSource());

  bookMarkDetails = signal<HadithDetails[]>([]);

  constructor(
    private readonly router: Router,
    private readonly supabaseService: SupabaseService,
    private readonly bookMarkService: BookmarkService
  ) {
    effect(() => {
      console.log(`Hadith Source Home: ${this.hadithSource()}`);
      this.getChaptersFromSource();
      this.getBookmarkedHadiths();
    });
  }

  ngOnInit(): void {
    // Initial data loading is handled by the effect
  }

  redirectToHome() {
    this.router.navigate(['/home']);
  }

  private getChaptersFromSource() {
    console.log("getChaptersFromSource function called");
    this.supabaseService.getHadithChaptersFromSource()
      .subscribe(
        {
          next: (data: any) => {
            this.chapterList.set(data.data);
          },
          error: (error: any) => console.log(error.error),
          complete: () => console.log("hadith chapters loaded")
        }
      );
  };

  private getBookmarkedHadiths() {
    console.log("getBookmarkedHadiths function called");
    const hadith_ids: string[] = this.bookMarkService.getBookmarkedHadiths();

    this.supabaseService.getHadithDetailsFromId(hadith_ids)
      .subscribe(
        {
          next: (data: any) => {
            const hadithDetails = data.data
              .filter((hadith: HadithDetails) => hadith.source_name === this.hadithSource())
              .sort((a: any, b: any) => {
                return b.hadith_no - a.hadith_no;
              });
            this.bookMarkDetails.set(hadithDetails);
          },
          error: (error: any) => console.log(error.error),
          complete: () => console.log("complete hadith details")
        });
  };
}
