import { CommonModule } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
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

  hadithSource = signal<string>('');

  bookMarkDetails = signal<HadithDetails[]>([]);

  constructor(
    private readonly router: Router,
    private readonly supabaseService: SupabaseService,
    private readonly bookMarkService: BookmarkService
  ) { }

  ngOnInit(): void {
    this.hadithSource.set(this.supabaseService.hadithSource());
    this.getChaptersFromSource();
    this.getBookmarkedHadiths();
  }

  redirectToHome() {
    this.router.navigate(['/home']);
  }

  getChaptersFromSource = computed(() => {
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
  });

  getBookmarkedHadiths = computed(() => {
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
  });

}
