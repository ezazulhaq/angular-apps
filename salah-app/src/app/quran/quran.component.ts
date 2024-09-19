import { Component } from '@angular/core';
import { environment } from '../../environments/environment';
import { QuranLibrary } from '../model/quran-library.model';
import { RouterLink } from '@angular/router';
import { PdfViewerComponent } from '../shared/pdf-viewer/pdf-viewer.component';

@Component({
  selector: 'app-quran',
  standalone: true,
  imports: [
    RouterLink,
    PdfViewerComponent
  ],
  templateUrl: './quran.component.html',
  styleUrl: './quran.component.css',
  host: {
    class: 'prayer-bg'
  }
})
export class QuranComponent {

  quran_library: QuranLibrary[] = [
    {
      name: "Quran Full",
      url: `https://${environment.s3Bucket}/quran_13_liner_color_coded.pdf`,
      storageKey: 'quranPage'
    }
  ];

  pdfSrc = `https://${environment.s3Bucket}/quran_13_liner_color_coded.pdf`;
  storageKey = 'quranPage';

}
