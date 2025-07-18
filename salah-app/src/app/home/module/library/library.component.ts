import { Component, signal } from '@angular/core';
import { IslamicLibrary } from '../../../model/islamic-library.model';
import { Router, RouterLink } from '@angular/router';
import { TitleCasePipe } from '@angular/common';
import { ReplaceUnderlinePipe } from '../../../pipes/replace-underline.pipe';
import { LibraryService } from '../../../service/library.service';

@Component({
  selector: 'app-library',
  imports: [
    TitleCasePipe,
    ReplaceUnderlinePipe,
    RouterLink,
  ],
  templateUrl: './library.component.html',
  styleUrl: './library.component.css',
  host: {
    class: 'app-bg'
  }
})
export class LibraryComponent {

  islamic_library = signal<IslamicLibrary[]>([]);

  constructor(
    private readonly router: Router,
    private readonly libraryService: LibraryService,
  ) { }

  ngOnInit() {
    this.libraryService.getIslamicLibrary().subscribe(
      {
        next: data => {
          this.islamic_library.set(data);
        },
        error: error => {
          console.error(error);
        }
      }
    );
  }

  redirectToHome() {
    this.router.navigate(['/home']);
  }

  getCategories() {
    return [...new Set(this.islamic_library().map(item => item.category))];
  }

  getCategoryItems(category: string) {
    return this.islamic_library().filter(item => item.category === category);
  }

}
