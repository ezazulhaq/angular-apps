import { Component } from '@angular/core';
import { QuranLibrary } from '../model/quran-library.model';
import { RouterLink } from '@angular/router';
import { PdfViewerComponent } from '../shared/pdf-viewer/pdf-viewer.component';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-quran',
  standalone: true,
  imports: [
    TitleCasePipe,
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
      name: "Qur'an Full",
      pdfName: 'quran_13_liner_color_coded.pdf',
      storageKey: 'quranPage'
    },
    {
      name: "Para 01",
      pdfName: 'para01.pdf',
      storageKey: 'para01Page'
    },
    {
      name: "Para 02",
      pdfName: 'para02.pdf',
      storageKey: 'para02Page'
    },
    {
      name: "Para 03",
      pdfName: 'para03.pdf',
      storageKey: 'para03Page'
    },
    {
      name: "Para 04",
      pdfName: 'para04.pdf',
      storageKey: 'para04Page'
    },
    {
      name: "Para 05",
      pdfName: 'para05.pdf',
      storageKey: 'para05Page'
    },
    {
      name: "Para 06",
      pdfName: 'para06.pdf',
      storageKey: 'para06Page'
    },
    {
      name: "Para 07",
      pdfName: 'para07.pdf',
      storageKey: 'para07Page'
    },
    {
      name: "Para 08",
      pdfName: 'para08.pdf',
      storageKey: 'para08Page'
    },
    {
      name: "Para 09",
      pdfName: 'para09.pdf',
      storageKey: 'para09Page'
    },
    {
      name: "Para 10",
      pdfName: 'para10.pdf',
      storageKey: 'para10Page'
    },
    {
      name: "Para 11",
      pdfName: 'para11.pdf',
      storageKey: 'para11Page'
    },
    {
      name: "Para 12",
      pdfName: 'para12.pdf',
      storageKey: 'para12Page'
    },
    {
      name: "Para 13",
      pdfName: 'para13.pdf',
      storageKey: 'para13Page'
    },
    {
      name: "Para 14",
      pdfName: 'para14.pdf',
      storageKey: 'para14Page'
    },
    {
      name: "Para 15",
      pdfName: 'para15.pdf',
      storageKey: 'para15Page'
    },
    {
      name: "Para 16",
      pdfName: 'para16.pdf',
      storageKey: 'para16Page'
    },
    {
      name: "Para 17",
      pdfName: 'para17.pdf',
      storageKey: 'para17Page'
    },
    {
      name: "Para 18",
      pdfName: 'para18.pdf',
      storageKey: 'para18Page'
    },
    {
      name: "Para 19",
      pdfName: 'para19.pdf',
      storageKey: 'para19Page'
    },
    {
      name: "Para 20",
      pdfName: 'para20.pdf',
      storageKey: 'para20Page'
    },
    {
      name: "Para 21",
      pdfName: 'para21.pdf',
      storageKey: 'para21Page'
    },
    {
      name: "Para 22",
      pdfName: 'para22.pdf',
      storageKey: 'para22Page'
    },
    {
      name: "Para 23",
      pdfName: 'para23.pdf',
      storageKey: 'para23Page'
    },
    {
      name: "Para 24",
      pdfName: 'para24.pdf',
      storageKey: 'para24Page'
    },
    {
      name: "Para 25",
      pdfName: 'para25.pdf',
      storageKey: 'para25Page'
    },
    {
      name: "Para 26",
      pdfName: 'para26.pdf',
      storageKey: 'para26Page'
    },
    {
      name: "Para 27",
      pdfName: 'para27.pdf',
      storageKey: 'para27Page'
    },
    {
      name: "Para 28",
      pdfName: 'para28.pdf',
      storageKey: 'para28Page'
    },
    {
      name: "Para 29",
      pdfName: 'para29.pdf',
      storageKey: 'para29Page'
    },
    {
      name: "Para 30",
      pdfName: 'para30.pdf',
      storageKey: 'para30Page'
    }
  ];

}
