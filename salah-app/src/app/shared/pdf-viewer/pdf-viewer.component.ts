import { CommonModule, TitleCasePipe, isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID, effect, input, signal } from '@angular/core';
import { PDFProgressData, PDFDocumentProxy, PdfViewerModule } from 'ng2-pdf-viewer';
import { environment } from '../../../environments/environment';
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

  page = signal<number>(1);
  totalPages = signal<number>(0);
  isLoaded = signal<boolean>(false);
  progressData!: PDFProgressData;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    effect(() => {
      console.log("Effect in Page 1 - ", this.getPageFromLocalStorage())
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
    console.log("This is Page 2 - ", this.page());
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
      localStorage.setItem(this.storageKey(), pageNumber.toString());
    }
  }

  getPageFromLocalStorage(): number {
    if (isPlatformBrowser(this.platformId)) {
      console.log("Get Page From Local Storage - This is Page - ", this.page());
      const savedPage = localStorage.getItem(this.storageKey());
      return savedPage ? +savedPage : 1; // Default to page 1 if no saved page found
    }
    return 1;
  }
}
