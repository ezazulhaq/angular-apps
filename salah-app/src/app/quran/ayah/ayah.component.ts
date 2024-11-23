import { Component, ElementRef, HostListener, signal, ViewChild } from '@angular/core';
import { SupabaseService } from '../../service/supabase.service';
import { ActivatedRoute } from '@angular/router';
import { Translation } from '../../model/translation.model';
import { FormsModule } from '@angular/forms';

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

  ngAfterViewInit() {
    this.originalOffset = this.stickyCheckbox.nativeElement.offsetTop;
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

}
