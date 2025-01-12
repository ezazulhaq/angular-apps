import { Component, computed, linkedSignal, OnInit, signal } from '@angular/core';
import { SupabaseService } from '../../service/supabase.service';
import { ActivatedRoute } from '@angular/router';
import { Hadiths } from '../hadith.model';
import { BookmarkService } from '../../service/bookmark.service';

@Component({
  selector: 'app-chapter',
  imports: [],
  templateUrl: './chapter.component.html',
  styleUrl: './chapter.component.css',
  host: {
    class: 'app-bg',
  }
})
export class ChapterComponent implements OnInit {

  chapterId!: string;

  hadiths = signal<Hadiths[]>([]);

  chapterName = signal<string>("");

  bookmarkedHadiths = signal<Set<string>>(new Set()); // Store bookmarked hadith IDs

  constructor(
    private readonly supabaseService: SupabaseService,
    private readonly bookmarkService: BookmarkService,
    private readonly route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.chapterId = params['id'];
    });
  }

  ngOnInit(): void {
    this.supabaseService.getHadithByChapterId(this.chapterId).subscribe(
      {
        next: (data: any) => {
          this.hadiths.set(data.data);
          this.chapterName.set(data.data[0].chapter_name);
        }
      }
    );
  }

  splitChapterName = computed(
    () => {
      const parts = this.chapterName().split('-').map(part => part.trim());

      if (parts.length !== 2) {
        return {
          name_en: this.chapterName(),
          name_ar: ''
        };
      }

      return {
        name_en: parts[0],
        name_ar: parts[1]
      };
    });

  isBookmarked(hadithId: string): boolean {
    return this.bookmarkService.isBookmarked(hadithId);
  }

  toggleBookmark(hadith: Hadiths) {
    this.bookmarkService.toggleBookmark(hadith);
  }

}
