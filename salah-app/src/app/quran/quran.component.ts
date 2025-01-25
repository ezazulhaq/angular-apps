import { CommonModule } from '@angular/common';
import { Component, computed, OnInit, signal } from '@angular/core';
import { SupabaseService } from '../service/supabase.service';
import { RouterLink } from '@angular/router';
import { Surah } from '../model/surah.model';
import { ListHomeComponent } from '../shared/skeleton/list-home/list-home.component';

@Component({
    selector: 'app-quran',
    imports: [
        CommonModule,
        RouterLink,
        ListHomeComponent
    ],
    templateUrl: './quran.component.html',
    styleUrl: './quran.component.css',
    host: {
        class: 'app-bg'
    }
})
export class QuranComponent implements OnInit {

    surahList = signal<Surah[]>([]);

    isAscending = signal<boolean>(true);

    constructor(private readonly supabaseService: SupabaseService) { }

    ngOnInit(): void {
        this.getSurahList();
    }

    getSurahList = computed(() => {
        this.supabaseService.getSurahList().subscribe(
            {
                next: (data: any) => {
                    this.surahList.set(data.data);
                }
            }
        );
    });

    toggleSort() {
        this.isAscending.set(!this.isAscending());
        this.surahList.set(
            this.surahList().sort(
                (a, b) => {
                    const comparison = a.surah_id - b.surah_id;
                    return this.isAscending() ? comparison : -comparison;
                }
            )
        );
    }
}
