/* @vite-ignore */
import { CommonModule, TitleCasePipe, isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID, effect, input, signal } from '@angular/core';
import { PDFProgressData, PDFDocumentProxy, PdfViewerModule } from 'ng2-pdf-viewer';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pdf-viewer',
  standalone: true,
  imports: [
    CommonModule,
    PdfViewerModule,
    TitleCasePipe,
    FormsModule,
  ],
  templateUrl: './pdf-viewer.component.html',
  styleUrl: './pdf-viewer.component.css'
})
export class PdfViewerComponent implements OnInit {

  pdfSrc = input.required<string>();
  storageKey = input.required<string>();
  storePage = input.required<number>();

  page = signal<number>(1);
  pagesRendered = signal<number>(0);
  totalPages = signal<number>(0);
  isLoaded = signal<boolean>(false);
  progressData!: PDFProgressData;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    effect(() => {
      this.savePageToLocalStorage(this.page());
    })
  }

  ngOnInit() {
    this.page.set(this.storePage());
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

  afterLoadComplete(pdfData: PDFDocumentProxy) {
    const savedPage = this.getPageFromLocalStorage();
    this.page.set(savedPage > pdfData.numPages ? pdfData.numPages : savedPage); // Ensure valid page number
    this.totalPages.set(pdfData.numPages);
    this.isLoaded.set(true);
  }

  pageRendered = (e: CustomEvent) => {
    this.pagesRendered.update(value => value + 1);
    if (this.pagesRendered() === this.totalPages()) {
      this.isLoaded.set(true);
    }
  };

  onProgress(progressData: PDFProgressData) {
    this.progressData = progressData;
    this.isLoaded.set(progressData.loaded >= progressData.total);
  }

  getInt(value: number): number {
    return Math.round(value);
  }

  savePageToLocalStorage(pageNumber: number) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.storageKey(), pageNumber.toString());
    }
  }

  getPageFromLocalStorage(): number {
    const savedPage = localStorage.getItem(this.storageKey());
    return savedPage ? +savedPage : 1; // Default to page 1 if no saved page found
  }
}
