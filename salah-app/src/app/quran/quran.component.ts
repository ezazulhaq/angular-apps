import { CommonModule, isPlatformBrowser, TitleCasePipe } from '@angular/common';
import { AfterViewInit, Component, effect, Inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { PDFProgressData, PdfViewerModule } from 'ng2-pdf-viewer';
import { environment } from '../../environments/environment';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-quran',
  standalone: true,
  imports: [
    CommonModule,
    PdfViewerModule,
    TitleCasePipe,
    FormsModule,
  ],
  templateUrl: './quran.component.html',
  styleUrl: './quran.component.css',
  host: {
    class: 'prayer-bg'
  }
})
export class QuranComponent implements OnInit {

  pdfSrc = `https://${environment.s3Bucket}/quran_13_liner_color_coded.pdf`;

  page = signal<number>(1);
  totalPages = signal<number>(0);
  isLoaded = signal<boolean>(false);
  progressData!: PDFProgressData;

  private readonly storageKey = 'quranPage';

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    effect(() => {
      this.savePageToLocalStorage(this.page());
    })
  }

  ngOnInit() {
    console.log("This is Page 1 - ", this.page());
    if (isPlatformBrowser(this.platformId)) {
      const savedPage = this.getPageFromLocalStorage();
      if (savedPage) {
        this.page.set(savedPage);
      }
    }
    console.log("This is Page 2- ", this.page());
  }

  nextPage() {
    if (this.page() >= this.totalPages()) return;
    this.page.update(value => value + 1);
  }

  prevPage() {
    if (this.page() <= 1) return;
    this.page.update(value => value - 1);
  }

  onError(event: any) {
    console.error('Error loading PDF', event);
  }

  afterLoadComplete(pdfData: any) {
    this.page.set(this.getPageFromLocalStorage());
    console.log("After Load Complete - This is Page - ", this.page());
    this.totalPages.set(pdfData.numPages);
    this.isLoaded.set(true);
  }

  onProgress(progressData: PDFProgressData) {
    this.progressData = progressData;
    this.isLoaded.set(progressData.loaded >= progressData.total);
  }

  getInt(value: number): number {
    return Math.round(value);
  }

  savePageToLocalStorage(pageNumber: number) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.storageKey, pageNumber.toString());
    }
  }

  getPageFromLocalStorage(): number {
    if (isPlatformBrowser(this.platformId)) {
      const savedPage = localStorage.getItem(this.storageKey);
      return savedPage ? +savedPage : 1; // Default to page 1 if no saved page found
    }
    return 1;
  }

}
