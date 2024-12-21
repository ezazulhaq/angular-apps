import { Component, OnInit, signal } from '@angular/core';
import { SupabaseService } from '../../service/supabase.service';
import { ActivatedRoute } from '@angular/router';
import { Hadiths } from '../hadith.model';

@Component({
  selector: 'app-chapter',
  imports: [],
  templateUrl: './chapter.component.html',
  styleUrl: './chapter.component.css',
  host: {
    class: 'app-bg',
  }
})
export class ChapterComponent implements OnInit {

  chapterId!: string;

  hadiths = signal<Hadiths[]>([]);

  constructor(
    private readonly supabaseService: SupabaseService,
    private readonly route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.chapterId = params['id'];
    });
  }

  ngOnInit(): void {
    this.supabaseService.getHadithByChapterId(this.chapterId).subscribe(
      {
        next: (data: any) => {
          this.hadiths.set(data.data);
        }
      }
    );
  }

}
