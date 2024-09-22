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
    class: 'app-bg'
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
      name: "Para 01 - Alif Lam Meem (الٓمٓ)",
      pdfName: 'para01.pdf',
      storageKey: 'para01Page'
    },
    {
      name: "Para 02 - Sayaqool (سَيَقُولُ)",
      pdfName: 'para02.pdf',
      storageKey: 'para02Page'
    },
    {
      name: "Para 03 - Tilka ar-Rusul (تِلْكَ ٱلرُّسُلُ)",
      pdfName: 'para03.pdf',
      storageKey: 'para03Page'
    },
    {
      name: "Para 04 - Lan Tana Loo (لَن تَنَالُوا۟)",
      pdfName: 'para04.pdf',
      storageKey: 'para04Page'
    },
    {
      name: "Para 05 - Wal Mohsanat (وَٱلْمُحْصَنَٰتُ)",
      pdfName: 'para05.pdf',
      storageKey: 'para05Page'
    },
    {
      name: "Para 06 - La Yuhibbullah (لَا يُحِبُّ ٱللَّهُ)",
      pdfName: 'para06.pdf',
      storageKey: 'para06Page'
    },
    {
      name: "Para 07 - Wa Iza Sami'u (وَإِذَا سَمِعُوا۟)",
      pdfName: 'para07.pdf',
      storageKey: 'para07Page'
    },
    {
      name: "Para 08 - Wa Lau Annana (وَلَوْ أَنَّنَا)",
      pdfName: 'para08.pdf',
      storageKey: 'para08Page'
    },
    {
      name: "Para 09 - Qad Aflaha (قَدْ أَفْلَحَ)",
      pdfName: 'para09.pdf',
      storageKey: 'para09Page'
    },
    {
      name: "Para 10 - Wa A'lamu (وَٱعْلَمُوٓا۟)",
      pdfName: 'para10.pdf',
      storageKey: 'para10Page'
    },
    {
      name: "Para 11 - Ya'tazerun (يَعْتَذِرُونَ)",
      pdfName: 'para11.pdf',
      storageKey: 'para11Page'
    },
    {
      name: "Para 12 - Wa Mamin Da'abat (وَمَا مِن دَآبَّةٍۢ)",
      pdfName: 'para12.pdf',
      storageKey: 'para12Page'
    },
    {
      name: "Para 13 - Wa Ma Ubrioo (وَمَآ أُبَرِّئُ)",
      pdfName: 'para13.pdf',
      storageKey: 'para13Page'
    },
    {
      name: "Para 14 - Rubama (رُّبَمَا)",
      pdfName: 'para14.pdf',
      storageKey: 'para14Page'
    },
    {
      name: "Para 15 - Subhanalladhi (سُبْحَٰنَ ٱلَّذِى)",
      pdfName: 'para15.pdf',
      storageKey: 'para15Page'
    },
    {
      name: "Para 16 - Qal Alam (قَالَ أَلَمْ)",
      pdfName: 'para16.pdf',
      storageKey: 'para16Page'
    },
    {
      name: "Para 17 - Iqtarabat (ٱقْتَرَبَتِ)",
      pdfName: 'para17.pdf',
      storageKey: 'para17Page'
    },
    {
      name: "Para 18 - Qadd Aflaha (قَدْ أَفْلَحَ)",
      pdfName: 'para18.pdf',
      storageKey: 'para18Page'
    },
    {
      name: "Para 19 - Wa Qalalladhina (وَقَالَ ٱلَّذِينَ)",
      pdfName: 'para19.pdf',
      storageKey: 'para19Page'
    },
    {
      name: "Para 20 - Amman Khalaq (أَمَّنْ خَلَقَ)",
      pdfName: 'para20.pdf',
      storageKey: 'para20Page'
    },
    {
      name: "Para 21 - Utlu Ma Oohi (ٱتْلُ مَآ أُوحِىَ)",
      pdfName: 'para21.pdf',
      storageKey: 'para21Page'
    },
    {
      name: "Para 22 - Wa Manyaqnut (وَمَن يَقْنُتْ)",
      pdfName: 'para22.pdf',
      storageKey: 'para22Page'
    },
    {
      name: "Para 23 - Wa Mali (وَمَا لِىَ)",
      pdfName: 'para23.pdf',
      storageKey: 'para23Page'
    },
    {
      name: "Para 24 - Faman Azlam (فَمَنْ أَظْلَمُ)",
      pdfName: 'para24.pdf',
      storageKey: 'para24Page'
    },
    {
      name: "Para 25 - Elahe Yuruddo (إِلَيْهِ يُرَدُّ)",
      pdfName: 'para25.pdf',
      storageKey: 'para25Page'
    },
    {
      name: "Para 26 - Ha Meem (حم)",
      pdfName: 'para26.pdf',
      storageKey: 'para26Page'
    },
    {
      name: "Para 27 - Qala Fama Khatbukum (قَالَ فَمَا خَطْبُكُمْ)",
      pdfName: 'para27.pdf',
      storageKey: 'para27Page'
    },
    {
      name: "Para 28 - Qadd Aflaha (قَدْ أَفْلَحَ)",
      pdfName: 'para28.pdf',
      storageKey: 'para28Page'
    },
    {
      name: "Para 29 - Tabarakalladhi (تَبَٰرَكَ ٱلَّذِى)",
      pdfName: 'para29.pdf',
      storageKey: 'para29Page'
    },
    {
      name: "Para 30 - Amma Yatasa'aloon (عَمَّ يَتَسَآءَلُونَ)",
      pdfName: 'para30.pdf',
      storageKey: 'para30Page'
    }
  ];

}
