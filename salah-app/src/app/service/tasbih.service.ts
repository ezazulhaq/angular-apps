import { Injectable } from '@angular/core';
import { Tasbih } from '../model/tasbih.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TasbihService {

  private readonly STORAGE_KEY = 'tasbih_counters';

  private tasbihListSubject = new BehaviorSubject<Tasbih[]>([]);
  public tasbihList$ = this.tasbihListSubject.asObservable();

  private defaultTasbihs: Tasbih[] = [
    {
      id: '1',
      name: 'Subhan Allah',
      count: 0,
      targetCount: 33,
      arabicText: 'سُبْحَانَ ٱللَّٰهِ',
      transliteration: 'Subhan Allah',
      translation: 'Glory be to Allah',
      category: 'daily'
    },
    {
      id: '2',
      name: 'Alhamdulillah',
      count: 0,
      targetCount: 33,
      arabicText: 'ٱلْحَمْدُ لِلَّٰهِ',
      transliteration: 'Alhamdulillah',
      translation: 'Praise be to Allah',
      category: 'daily'
    },
    {
      id: '3',
      name: 'Allahu Akbar',
      count: 0,
      targetCount: 34,
      arabicText: 'اللَّٰهُ أَكْبَرُ',
      transliteration: 'Allahu Akbar',
      translation: 'Allah is the Greatest',
      category: 'daily'
    }
  ];

  constructor() {
    this.loadFromStorage();
  }

  private loadFromStorage(): void {
    try {
      const storedData = localStorage.getItem(this.STORAGE_KEY);
      if (storedData) {
        const tasbihs = JSON.parse(storedData);
        this.tasbihListSubject.next(tasbihs);
      } else {
        // Initialize with default tasbihs if none exists
        this.tasbihListSubject.next(this.defaultTasbihs);
        this.saveToStorage(this.defaultTasbihs);
      }
    } catch (error) {
      console.error('Error loading tasbihs from storage:', error);
      this.tasbihListSubject.next(this.defaultTasbihs);
    }
  }

  private saveToStorage(tasbihs: Tasbih[]): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(tasbihs));
    } catch (error) {
      console.error('Error saving tasbihs to storage:', error);
    }
  }

  getTasbihList(): Observable<Tasbih[]> {
    return this.tasbihList$;
  }

  getTasbihById(id: string): Tasbih | undefined {
    return this.tasbihListSubject.value.find(tasbih => tasbih.id === id);
  }

  incrementCount(id: string): void {
    const tasbihs = this.tasbihListSubject.value.map(tasbih => {
      if (tasbih.id === id) {
        return { ...tasbih, count: tasbih.count + 1 };
      }
      return tasbih;
    });

    this.tasbihListSubject.next(tasbihs);
    this.saveToStorage(tasbihs);
  }

  resetCount(id: string): void {
    const tasbihs = this.tasbihListSubject.value.map(tasbih => {
      if (tasbih.id === id) {
        return { ...tasbih, count: 0 };
      }
      return tasbih;
    });

    this.tasbihListSubject.next(tasbihs);
    this.saveToStorage(tasbihs);
  }

  addTasbih(tasbih: Tasbih): void {
    const tasbihs = [...this.tasbihListSubject.value, tasbih];
    this.tasbihListSubject.next(tasbihs);
    this.saveToStorage(tasbihs);
  }

  updateTasbih(updatedTasbih: Tasbih): void {
    const tasbihs = this.tasbihListSubject.value.map(tasbih => {
      if (tasbih.id === updatedTasbih.id) {
        return updatedTasbih;
      }
      return tasbih;
    });

    this.tasbihListSubject.next(tasbihs);
    this.saveToStorage(tasbihs);
  }

  deleteTasbih(id: string): void {
    const tasbihs = this.tasbihListSubject.value.filter(tasbih => tasbih.id !== id);
    this.tasbihListSubject.next(tasbihs);
    this.saveToStorage(tasbihs);
  }

}
