import { CommonModule, isPlatformBrowser, TitleCasePipe } from '@angular/common';
import { Component, Inject, PLATFORM_ID, signal } from '@angular/core';
import { PdfViewerModule } from 'ng2-pdf-viewer';

@Component({
  selector: 'app-quran',
  standalone: true,
  imports: [
    CommonModule,
    PdfViewerModule,
    TitleCasePipe
  ],
  templateUrl: './quran.component.html',
  styleUrl: './quran.component.css',
  host: {
    class: 'prayer-bg'
  }
})
export class QuranComponent {

  pdfSrc = "doc/quran_13_line_color_coded.pdf";

  page = signal<number>(1);
  totalPages = signal<number>(0);
  isLoaded = signal<boolean>(false);

  savedPageNumber: number | undefined;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  ngOnInit() {
    this.savedPageNumber = this.getPageFromLocalStorage();
    this.page.set(this.savedPageNumber);
    console.log(this.page());
  }

  nextPage() {
    if (this.page() >= this.totalPages()) return;

    const currentPage = this.page();
    this.page.set(currentPage + 1);
    this.savePageToLocalStorage(currentPage + 1);

    this.savedPageNumber = this.getPageFromLocalStorage();
  }

  prevPage() {
    if (this.page() <= 1) return;

    const currentPage = this.page();
    this.page.set(currentPage - 1);
    this.savePageToLocalStorage(currentPage - 1);

    this.savedPageNumber = this.getPageFromLocalStorage();
  }

  onError(event: any) {
    console.error('Error loading PDF', event);
  }

  afterLoadComplete(pdfData: any) {
    this.page.set(this.getPageFromLocalStorage());
    this.totalPages.set(pdfData.numPages);
    this.isLoaded.set(true);
  }

  savePageToLocalStorage(pageNumber: number) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('currentPage', pageNumber.toString());
    }
  }

  getPageFromLocalStorage(): number {
    if (isPlatformBrowser(this.platformId)) {
      const savedPage = localStorage.getItem('currentPage');
      return savedPage ? +savedPage : 1; // Default to page 1 if no saved page found
    }
    return 1;
  }
}
