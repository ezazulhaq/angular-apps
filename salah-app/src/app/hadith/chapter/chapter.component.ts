import { AfterViewInit, Component, computed, effect, ElementRef, HostListener, OnInit, signal, ViewChild } from '@angular/core';
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
export class ChapterComponent implements OnInit, AfterViewInit {

  @ViewChild('stickyTitle') stickyTitle!: ElementRef;
  private originalOffset: number = 0;

  @ViewChild('hadithContainer') hadithContainer!: ElementRef;

  private hadithIdToScrollTo = signal<number | null>(null);

  chapterId!: string;
  hadithNoParam!: number;

  hadiths = signal<Hadiths[]>([]);

  chapterName = signal<string>("");

  bookmarkedHadiths = signal<Set<string>>(new Set()); // Store bookmarked hadith IDs

  constructor(
    private readonly supabaseService: SupabaseService,
    private readonly bookmarkService: BookmarkService,
    private readonly route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.chapterId = params['id'];
      this.hadithNoParam = params['hadithNo'];

      if (this.hadithNoParam) {
        this.hadithIdToScrollTo.set(+this.hadithNoParam);
      }
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

  ngAfterViewInit() {
    this.originalOffset = this.stickyTitle.nativeElement.offsetTop;

    if (this.hadithIdToScrollTo() !== null) {
      setTimeout(() => {
        this.scrollToHadith(this.hadithIdToScrollTo());
      }, 1000);
    }
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

  @HostListener('window:scroll', ['$event'])
  handleTitleScroll() {
    const element = this.stickyTitle.nativeElement;
    if (window.scrollY >= this.originalOffset + 300) {
      element.classList.remove('app-title');
      element.classList.add('app-title-stick');
    } else {
      element.classList.add('app-title');
      element.classList.remove('app-title-stick');
    }
  }

  isBookmarked(hadithId: string): boolean {
    return this.bookmarkService.isBookmarked(hadithId);
  }

  toggleBookmark(hadith: Hadiths) {
    this.bookmarkService.toggleBookmark(hadith);
  }

  private scrollToHadith(hadithId: number | null): void {
    // Find the hadith by id
    const hadithElement = this.hadithContainer.nativeElement.querySelector(
      `#hadith-${hadithId}`
    );
    if (hadithElement) {
      hadithElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    } else {
      console.warn(`Hadith with ID ${hadithId} not found.`);
    }
  }

}
