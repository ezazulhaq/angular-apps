import { Component, computed, effect, inject, linkedSignal, OnInit, signal } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { Tasbih } from '../model/tasbih.model';
import { TasbihService } from '../service/tasbih.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tasbih',
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './tasbih.component.html',
  styleUrl: './tasbih.component.css',
  host: {
    class: 'app-bg'
  }
})
export class TasbihComponent implements OnInit {

  private tasbihService = inject(TasbihService);
  private router = inject(Router);

  tasbihs = signal<Tasbih[]>([]);
  selectedTasbihId = signal<string>('1');
  selectedTasbih = linkedSignal(() => this.tasbihs().find(t => t.id === this.selectedTasbihId()));
  isVibrationEnabled: boolean = true;
  isCountingComplete: boolean = false;

  constructor() {
    this.tasbihs.set(this.tasbihService.tasbihList());

    effect(() => {
      this.tasbihs.set(this.tasbihService.tasbihList());
      this.selectedTasbih.set(this.tasbihs().find(t => t.id === this.selectedTasbihId()));
    });
  }

  ngOnInit(): void {
    this.updateSelectedTasbih();

    // Load user preferences from localStorage
    const vibrationPref = localStorage.getItem('tasbih_vibration');
    this.isVibrationEnabled = vibrationPref ? JSON.parse(vibrationPref) : true;
  }

  redirectToHome() {
    this.router.navigate(['/home']);
  }

  updateSelectedTasbih(): void {
    this.isCountingComplete = this.selectedTasbih()
      ? this.selectedTasbih()!.count >= this.selectedTasbih()!.targetCount
      : false;
  }

  onTasbihSelect(id: string): void {
    this.selectedTasbihId.set(id);
    this.updateSelectedTasbih();
  }

  increment(): void {
    if (!this.selectedTasbih) return;

    this.tasbihService.incrementCount(this.selectedTasbihId());

    // Provide haptic feedback if enabled and available
    if (this.isVibrationEnabled && 'vibrate' in navigator) {
      navigator.vibrate(20);
    }

    // Check if target count is reached
    this.updateSelectedTasbih();
    if (this.selectedTasbih && this.selectedTasbih()!.count === this.selectedTasbih()!.targetCount) {
      this.isCountingComplete = true;
      if (this.isVibrationEnabled && 'vibrate' in navigator) {
        navigator.vibrate([100, 50, 100]);
      }
    }
  }

  resetCounter(): void {
    if (this.selectedTasbihId) {
      this.tasbihService.resetCount(this.selectedTasbihId());
      this.isCountingComplete = false;
    }
  }

  toggleVibration(): void {
    this.isVibrationEnabled = !this.isVibrationEnabled;
    localStorage.setItem('tasbih_vibration', JSON.stringify(this.isVibrationEnabled));
  }

  getCompletionPercentage(): number {
    if (!this.selectedTasbih() || this.selectedTasbih()!.targetCount === 0) return 0;
    return (this.selectedTasbih()!.count / this.selectedTasbih()!.targetCount) * 100;
  }

}
