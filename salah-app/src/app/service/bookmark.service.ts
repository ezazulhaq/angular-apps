import { Injectable, signal } from '@angular/core';
import { Hadiths } from '../hadith/hadith.model';

@Injectable({
  providedIn: 'root'
})
export class BookmarkService {
  private bookmarkedHadiths = signal<Set<string>>(new Set());

  constructor() {
    this.loadFromStorage();
  }

  isBookmarked(hadithId: string): boolean {
    return this.bookmarkedHadiths().has(hadithId);
  }

  toggleBookmark(hadith: Hadiths) {
    this.bookmarkedHadiths.update(bookmarked => {
      const newBookmarked = new Set(bookmarked);
      if (newBookmarked.has(hadith.id)) {
        newBookmarked.delete(hadith.id);
      } else {
        newBookmarked.add(hadith.id);
      }
      return newBookmarked;
    });
    this.saveToStorage();
  }

  getBookmarkedHadiths(): string[] {
    const saved = localStorage.getItem('bookmarkedHadiths');
    if (saved) {
      try {
        const bookmarks = JSON.parse(saved);
        return Array.isArray(bookmarks) ? bookmarks : [];
      } catch (error) {
        console.error('Error parsing bookmarks:', error);
        return [];
      }
    }
    return [];
  }

  private saveToStorage() {
    localStorage.setItem('bookmarkedHadiths',
      JSON.stringify(Array.from(this.bookmarkedHadiths())));
  }

  private loadFromStorage() {
    try {
      const saved = localStorage.getItem('bookmarkedHadiths');
      if (saved) {
        // Parse the JSON and ensure we have an array before creating Set
        const savedArray = JSON.parse(saved);
        if (Array.isArray(savedArray)) {
          this.bookmarkedHadiths.set(new Set(savedArray));
        } else {
          this.bookmarkedHadiths.set(new Set());
        }
      }
    } catch (error) {
      console.error('Error loading bookmarks:', error);
      this.bookmarkedHadiths.set(new Set());
    }
  }
}
