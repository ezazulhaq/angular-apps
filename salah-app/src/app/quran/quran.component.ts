import { CommonModule, TitleCasePipe } from '@angular/common';
import { Component, signal } from '@angular/core';
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
    this.totalPages.set(pdfData.numPages);
    this.isLoaded.set(true);
  }

}
