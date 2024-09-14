import { TitleCasePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PdfViewerModule } from 'ng2-pdf-viewer';

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


  onError(event: any) {
    console.error('Error loading PDF', event);
  }

}
