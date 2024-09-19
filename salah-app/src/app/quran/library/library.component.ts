import { Component } from '@angular/core';
import { environment } from '../../../environments/environment';
import { PdfViewerComponent } from "../../shared/pdf-viewer/pdf-viewer.component";

@Component({
  selector: 'app-reader',
  standalone: true,
  imports: [PdfViewerComponent],
  templateUrl: './library.component.html',
  styleUrl: './library.component.css'
})
export class LibraryComponent {
  
  pdfSrc = `https://${environment.s3Bucket}/quran_13_liner_color_coded.pdf`;
  storageKey = 'quranPage';

}
