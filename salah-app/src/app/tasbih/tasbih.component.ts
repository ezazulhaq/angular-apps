import { Component, inject } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { Subscription } from 'rxjs';
import { Tasbih } from '../model/tasbih.model';
import { TasbihService } from '../service/tasbih.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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
  },
  animations: [
    trigger(
      'countAnimation',
      [
        transition(
          ':increment',
          [
            style(
              {
                transform: 'scale(1.2)',
                color: '#4CAF50'
              }
            ),
            animate(
              '300ms ease-out',
              style(
                {
                  transform: 'scale(1)',
                  color: '*'
                }
              )
            )
          ]
        )
      ]
    )
  ]
})
export class TasbihComponent {

  private tasbihService = inject(TasbihService);

  tasbihs: Tasbih[] = [];
  selectedTasbihId: string = '1';
  selectedTasbih?: Tasbih;
  isVibrationEnabled: boolean = true;
  isCountingComplete: boolean = false;

  private subscription: Subscription = new Subscription();

  constructor() { }

  ngOnInit(): void {
    this.subscription.add(
      this.tasbihService.getTasbihList().subscribe(tasbihs => {
        this.tasbihs = tasbihs;
        this.updateSelectedTasbih();
      })
    );

    // Load user preferences from localStorage
    const vibrationPref = localStorage.getItem('tasbih_vibration');
    this.isVibrationEnabled = vibrationPref ? JSON.parse(vibrationPref) : true;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  updateSelectedTasbih(): void {
    this.selectedTasbih = this.tasbihs.find(t => t.id === this.selectedTasbihId);
    this.isCountingComplete = this.selectedTasbih ?
      this.selectedTasbih.count >= this.selectedTasbih.targetCount : false;
  }

  onTasbihSelect(id: string): void {
    this.selectedTasbihId = id;
    this.updateSelectedTasbih();
  }

  increment(): void {
    if (!this.selectedTasbih) return;

    this.tasbihService.incrementCount(this.selectedTasbihId);

    // Provide haptic feedback if enabled and available
    if (this.isVibrationEnabled && 'vibrate' in navigator) {
      navigator.vibrate(20);
    }

    // Check if target count is reached
    this.updateSelectedTasbih();
    if (this.selectedTasbih && this.selectedTasbih.count === this.selectedTasbih.targetCount) {
      this.isCountingComplete = true;
      if (this.isVibrationEnabled && 'vibrate' in navigator) {
        navigator.vibrate([100, 50, 100]);
      }
    }
  }

  resetCounter(): void {
    if (this.selectedTasbihId) {
      this.tasbihService.resetCount(this.selectedTasbihId);
      this.isCountingComplete = false;
    }
  }

  toggleVibration(): void {
    this.isVibrationEnabled = !this.isVibrationEnabled;
    localStorage.setItem('tasbih_vibration', JSON.stringify(this.isVibrationEnabled));
  }

  getCompletionPercentage(): number {
    if (!this.selectedTasbih || this.selectedTasbih.targetCount === 0) return 0;
    return (this.selectedTasbih.count / this.selectedTasbih.targetCount) * 100;
  }

}
