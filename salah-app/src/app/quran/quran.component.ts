import { TitleCasePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, computed, OnInit, signal } from '@angular/core';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { PDFDocumentProxy } from 'pdfjs-dist/types/src/display/api';

@Component({
  selector: 'app-quran',
  standalone: true,
  imports: [
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

  page: number = 1;
  totalPages: number = 0;
  isLoaded: boolean = false;

  nextPage() {
    if (this.page >= this.totalPages) return;
    this.page++;
  }

  prevPage() {
    if (this.page <= 1) return;
    this.page--;
  }

  onError(event: any) {
    console.error('Error loading PDF', event);
  }

  afterLoadComplete(pdfData: any) {
    this.totalPages = pdfData.numPages;
    this.isLoaded = true;
  }

}
