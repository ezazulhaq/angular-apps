import { Component } from '@angular/core';
import { IslamicLibrary } from '../model/islamic-library.model';
import { RouterLink } from '@angular/router';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-library',
  imports: [
    TitleCasePipe,
    RouterLink,
  ],
  templateUrl: './library.component.html',
  styleUrl: './library.component.css',
  host: {
    class: 'app-bg'
  }
})
export class LibraryComponent {

  islamic_library: IslamicLibrary[] = [
    {
      name: "Qur'an Full",
      pdfName: 'quran_13_liner_color_coded.pdf',
      category: 'quran',
      storageKey: 'quranPage'
    },
    {
      name: "Para 01 - Alif Lam Meem (الٓمٓ)",
      pdfName: 'para01.pdf',
      category: 'quran',
      storageKey: 'para01Page'
    },
    {
      name: "Para 02 - Sayaqool (سَيَقُولُ)",
      pdfName: 'para02.pdf',
      category: 'quran',
      storageKey: 'para02Page'
    },
    {
      name: "Para 03 - Tilka ar-Rusul (تِلْكَ ٱلرُّسُلُ)",
      pdfName: 'para03.pdf',
      category: 'quran',
      storageKey: 'para03Page'
    },
    {
      name: "Para 04 - Lan Tana Loo (لَن تَنَالُوا۟)",
      pdfName: 'para04.pdf',
      category: 'quran',
      storageKey: 'para04Page'
    },
    {
      name: "Para 05 - Wal Mohsanat (وَٱلْمُحْصَنَٰتُ)",
      pdfName: 'para05.pdf',
      category: 'quran',
      storageKey: 'para05Page'
    },
    {
      name: "Para 06 - La Yuhibbullah (لَا يُحِبُّ ٱللَّهُ)",
      pdfName: 'para06.pdf',
      category: 'quran',
      storageKey: 'para06Page'
    },
    {
      name: "Para 07 - Wa Iza Sami'u (وَإِذَا سَمِعُوا۟)",
      pdfName: 'para07.pdf',
      category: 'quran',
      storageKey: 'para07Page'
    },
    {
      name: "Para 08 - Wa Lau Annana (وَلَوْ أَنَّنَا)",
      pdfName: 'para08.pdf',
      category: 'quran',
      storageKey: 'para08Page'
    },
    {
      name: "Para 09 - Qad Aflaha (قَدْ أَفْلَحَ)",
      pdfName: 'para09.pdf',
      category: 'quran',
      storageKey: 'para09Page'
    },
    {
      name: "Para 10 - Wa A'lamu (وَٱعْلَمُوٓا۟)",
      pdfName: 'para10.pdf',
      category: 'quran',
      storageKey: 'para10Page'
    },
    {
      name: "Para 11 - Ya'tazerun (يَعْتَذِرُونَ)",
      pdfName: 'para11.pdf',
      category: 'quran',
      storageKey: 'para11Page'
    },
    {
      name: "Para 12 - Wa Mamin Da'abat (وَمَا مِن دَآبَّةٍۢ)",
      pdfName: 'para12.pdf',
      category: 'quran',
      storageKey: 'para12Page'
    },
    {
      name: "Para 13 - Wa Ma Ubrioo (وَمَآ أُبَرِّئُ)",
      pdfName: 'para13.pdf',
      category: 'quran',
      storageKey: 'para13Page'
    },
    {
      name: "Para 14 - Rubama (رُّبَمَا)",
      pdfName: 'para14.pdf',
      category: 'quran',
      storageKey: 'para14Page'
    },
    {
      name: "Para 15 - Subhanalladhi (سُبْحَٰنَ ٱلَّذِى)",
      pdfName: 'para15.pdf',
      category: 'quran',
      storageKey: 'para15Page'
    },
    {
      name: "Para 16 - Qal Alam (قَالَ أَلَمْ)",
      pdfName: 'para16.pdf',
      category: 'quran',
      storageKey: 'para16Page'
    },
    {
      name: "Para 17 - Iqtarabat (ٱقْتَرَبَتِ)",
      pdfName: 'para17.pdf',
      category: 'quran',
      storageKey: 'para17Page'
    },
    {
      name: "Para 18 - Qadd Aflaha (قَدْ أَفْلَحَ)",
      pdfName: 'para18.pdf',
      category: 'quran',
      storageKey: 'para18Page'
    },
    {
      name: "Para 19 - Wa Qalalladhina (وَقَالَ ٱلَّذِينَ)",
      pdfName: 'para19.pdf',
      category: 'quran',
      storageKey: 'para19Page'
    },
    {
      name: "Para 20 - Amman Khalaq (أَمَّنْ خَلَقَ)",
      pdfName: 'para20.pdf',
      category: 'quran',
      storageKey: 'para20Page'
    },
    {
      name: "Para 21 - Utlu Ma Oohi (ٱتْلُ مَآ أُوحِىَ)",
      pdfName: 'para21.pdf',
      category: 'quran',
      storageKey: 'para21Page'
    },
    {
      name: "Para 22 - Wa Manyaqnut (وَمَن يَقْنُتْ)",
      pdfName: 'para22.pdf',
      category: 'quran',
      storageKey: 'para22Page'
    },
    {
      name: "Para 23 - Wa Mali (وَمَا لِىَ)",
      pdfName: 'para23.pdf',
      category: 'quran',
      storageKey: 'para23Page'
    },
    {
      name: "Para 24 - Faman Azlam (فَمَنْ أَظْلَمُ)",
      pdfName: 'para24.pdf',
      category: 'quran',
      storageKey: 'para24Page'
    },
    {
      name: "Para 25 - Elahe Yuruddo (إِلَيْهِ يُرَدُّ)",
      pdfName: 'para25.pdf',
      category: 'quran',
      storageKey: 'para25Page'
    },
    {
      name: "Para 26 - Ha Meem (حم)",
      pdfName: 'para26.pdf',
      category: 'quran',
      storageKey: 'para26Page'
    },
    {
      name: "Para 27 - Qala Fama Khatbukum (قَالَ فَمَا خَطْبُكُمْ)",
      pdfName: 'para27.pdf',
      category: 'quran',
      storageKey: 'para27Page'
    },
    {
      name: "Para 28 - Qadd Aflaha (قَدْ أَفْلَحَ)",
      pdfName: 'para28.pdf',
      category: 'quran',
      storageKey: 'para28Page'
    },
    {
      name: "Para 29 - Tabarakalladhi (تَبَٰرَكَ ٱلَّذِى)",
      pdfName: 'para29.pdf',
      category: 'quran',
      storageKey: 'para29Page'
    },
    {
      name: "Para 30 - Amma Yatasa'aloon (عَمَّ يَتَسَآءَلُونَ)",
      pdfName: 'para30.pdf',
      category: 'quran',
      storageKey: 'para30Page'
    }
  ];

  ngOnInit() {
    this.addPageToLibraryItems();
    const islamic_library = localStorage.getItem('islamic_library');
    if (!islamic_library) {
      this.islamic_library = this.islamic_library
        .map(
          item => {
            return { ...item, page: 1, totalPage: 0 };
          }
        );
      localStorage.setItem('islamic_library', JSON.stringify(this.islamic_library));
    }
  }

  addPageToLibraryItems() {
    this.islamic_library = this.islamic_library
      .map(
        item => {
          const storedPage = localStorage.getItem(item.storageKey!);
          const page = storedPage ? +storedPage : 1;
          return { ...item, page };
        }
      );
  }

  getCategories() {
    return [...new Set(this.islamic_library.map(item => item.category))];
  }

  getCategoryItems(category: string) {
    return this.islamic_library.filter(item => item.category === category);
  }

}
