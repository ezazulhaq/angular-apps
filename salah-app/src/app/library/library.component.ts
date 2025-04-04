import { Component } from '@angular/core';
import { IslamicLibrary } from '../model/islamic-library.model';
import { Router, RouterLink } from '@angular/router';
import { TitleCasePipe } from '@angular/common';
import { library } from './library.contant';
import { ReplaceUnderlinePipe } from '../pipes/replace-underline.pipe';

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

  islamic_library: IslamicLibrary[] = library;

  constructor(
    private readonly router: Router,
  ) { }

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

  redirectToHome() {
    this.router.navigate(['/home']);
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
