import { Component, input } from '@angular/core';
import { Activity } from '../models/activity.model';
import { CommonModule } from '@angular/common';
import { IonCard } from '@ionic/angular/standalone';

@Component({
  selector: 'app-activity-card',
  standalone: true,
  imports: [CommonModule, IonCard],
  template: `
    <ion-card (click)="openExternalUrl()" class="activity-card">
      <div class="image-container">
        <img [src]="activity().images[0]" 
             [alt]="activity().title"
             (error)="onImageError($event)"
             class="card-image">
        <div class="overlay">
          <h3>{{ activity().title }}</h3>
          <div class="details">
            <span>{{ activity().travelDistance }}</span>
            <span>{{ activity().cost }}</span>
          </div>
        </div>
      </div>
    </ion-card>
  `,
  styles: [`
    .activity-card {
      margin: 0;
      aspect-ratio: 4/3;
      cursor: pointer;
    }

    .image-container {
      position: relative;
      width: 100%;
      height: 100%;
    }

    .card-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .overlay {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      background: rgba(0, 0, 0, 0.8);
      padding: 12px;
      color: white;
    }

    h3 {
      margin: 0 0 8px 0;
      font-size: 16px;
      font-weight: 500;
    }

    .details {
      display: flex;
      justify-content: space-between;
      font-size: 14px;
    }
  `]
})
export class ActivityCardComponent {
  activity = input.required<Activity>();

  openExternalUrl() {
    window.open(this.activity().externalUrl, '_blank');
  }

  onImageError(event: any) {
    event.target.style.backgroundColor = '#CCD5AE';
    event.target.src = ''; // Remove broken image
  }
}