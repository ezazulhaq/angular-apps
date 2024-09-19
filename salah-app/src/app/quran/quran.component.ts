import { CommonModule, isPlatformBrowser, TitleCasePipe } from '@angular/common';
import { Component, effect, Inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { PDFDocumentProxy, PDFProgressData, PdfViewerModule } from 'ng2-pdf-viewer';
import { environment } from '../../environments/environment';
import { FormsModule } from '@angular/forms';
import { PdfViewerComponent } from "../shared/pdf-viewer/pdf-viewer.component";

@Component({
  selector: 'app-quran',
  standalone: true,
  imports: [
    PdfViewerComponent
  ],
  templateUrl: './quran.component.html',
  styleUrl: './quran.component.css',
  host: {
    class: 'prayer-bg'
  }
})
export class QuranComponent {

  pdfSrc = `https://${environment.s3Bucket}/quran_13_liner_color_coded.pdf`;
  storageKey = 'quranPage';

}
