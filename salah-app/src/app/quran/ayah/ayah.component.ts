import { Component, ElementRef, HostListener, signal, ViewChild } from '@angular/core';
import { SupabaseService } from '../../service/supabase.service';
import { ActivatedRoute } from '@angular/router';
import { Translation } from '../../model/translation.model';
import { FormsModule } from '@angular/forms';
import { BookmarkService } from '../../service/bookmark.service';
import { BookMarkedSurah } from '../../model/surah.model';

@Component({
  selector: 'app-ayah',
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

  @ViewChild('stickyCheckbox') stickyCheckbox!: ElementRef;
  private originalOffset: number = 0;

  @ViewChild('ayahContainer') ayahContainer!: ElementRef;

  private ayahIdToScrollTo = signal<number | null>(null);

  surahNumber!: string;
  surahName!: string;
  surahName_ar!: string;
  ayahNoParam!: string;

  ayahs = signal<Translation[]>([]);

  isTranslationVisible = signal<boolean>(true);

  constructor(
    private readonly supabaseService: SupabaseService,
    private readonly bookmarkService: BookmarkService,
    private readonly route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.surahNumber = params['surahNumber'];
      this.surahName = params['surahName'];
      this.surahName_ar = params['surahName_ar'];
      this.ayahNoParam = params['ayahNo'];

      if (this.ayahNoParam) {
        this.ayahIdToScrollTo.set(+this.ayahNoParam);
      }
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

  ngAfterViewInit() {
    this.originalOffset = this.stickyCheckbox.nativeElement.offsetTop;

    if (this.ayahIdToScrollTo() !== null) {
      setTimeout(() => {
        this.scrollToHadith(this.ayahIdToScrollTo());
      }, 1000);
    }
  }

  @HostListener('window:scroll', ['$event'])
  handleCheckBoxScroll() {
    const element = this.stickyCheckbox.nativeElement;
    if (window.scrollY >= this.originalOffset) {
      element.classList.add('checkbox-fixed');
    } else {
      element.classList.remove('checkbox-fixed');
    }
  }

  isBookmarked(bookMarkedSurah: BookMarkedSurah): boolean {
    return this.bookmarkService.isBookmarkedAyah(bookMarkedSurah);
  }

  toggleBookmark(bookMarkedSurah: BookMarkedSurah) {
    this.bookmarkService.toggleBookmarkAyah(bookMarkedSurah);
  }

  private scrollToHadith(ayahNo: number | null): void {
    // Find the Ayah by number
    const ayahElement = this.ayahContainer.nativeElement.querySelector(
      `#ayah-${ayahNo}`
    );
    if (ayahElement) {
      const elementPosition = ayahElement.getBoundingClientRect().top + window.pageYOffset;

      window.scrollTo({
        top: elementPosition - 200,
        behavior: 'smooth'
      });
    } else {
      console.warn(`Ayah with Number ${ayahNo} not found.`);
    }
  }

}
