import { CommonModule, isPlatformBrowser, TitleCasePipe } from '@angular/common';
import { Component, Inject, PLATFORM_ID, signal } from '@angular/core';
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
export class QuranComponent {

  pdfSrc = `https://${environment.s3Bucket}/quran_13_liner_color_coded.pdf`;

  page = signal<number>(1);
  totalPages = signal<number>(0);
  isLoaded = signal<boolean>(false);
  progressData!: PDFProgressData;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  ngOnInit() {
    this.page.set(this.getPageFromLocalStorage());
  }

  nextPage() {
    if (this.page() >= this.totalPages()) return;

    const currentPage = this.page();
    this.savePageToLocalStorage(currentPage + 1);
    this.page.set(this.getPageFromLocalStorage());
  }

  prevPage() {
    if (this.page() <= 1) return;

    const currentPage = this.page();
    this.savePageToLocalStorage(currentPage - 1);
    this.page.set(this.getPageFromLocalStorage());
  }

  onError(event: any) {
    console.error('Error loading PDF', event);
  }

  afterLoadComplete(pdfData: any) {
    this.page.set(this.getPageFromLocalStorage());
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
      localStorage.setItem('quranPage', pageNumber.toString());
    }
  }

  getPageFromLocalStorage(): number {
    if (isPlatformBrowser(this.platformId)) {
      const savedPage = localStorage.getItem('quranPage');
      return savedPage ? +savedPage : 1; // Default to page 1 if no saved page found
    }
    return 1;
  }

}
