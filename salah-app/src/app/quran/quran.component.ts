import { Component } from '@angular/core';
import { PdfViewerComponent } from "../shared/pdf-viewer/pdf-viewer.component";
import { environment } from '../../environments/environment';

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
