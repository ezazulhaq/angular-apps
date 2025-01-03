import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { SupabaseService } from '../service/supabase.service';
import { RouterLink } from '@angular/router';
import { Surah } from '../model/surah.model';

@Component({
    selector: 'app-quran',
    imports: [
        CommonModule,
        RouterLink,
    ],
    templateUrl: './quran.component.html',
    styleUrl: './quran.component.css',
    host: {
        class: 'app-bg'
    }
})
export class QuranComponent implements OnInit {

    surahList = signal<Surah[]>([]);

    constructor(private readonly supabaseService: SupabaseService) { }

    ngOnInit(): void {
        this.supabaseService.getSurahList().subscribe(
            {
                next: (data: any) => {
                    this.surahList.set(data.data);
                }
            }
        );
    }
}
