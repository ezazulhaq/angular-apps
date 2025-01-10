import { Component, computed, ElementRef, HostListener, OnInit, signal, ViewChild } from '@angular/core';
import { SupabaseService } from '../../service/supabase.service';
import { ActivatedRoute } from '@angular/router';
import { Hadiths } from '../hadith.model';

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

  @ViewChild('stickyTitle') stickyTitle!: ElementRef;
  private originalOffset: number = 0;

  chapterId!: string;

  hadiths = signal<Hadiths[]>([]);

  chapterName = signal<string>("");

  constructor(
    private readonly supabaseService: SupabaseService,
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

  ngAfterViewInit() {
    this.originalOffset = this.stickyTitle.nativeElement.offsetTop;
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

}
