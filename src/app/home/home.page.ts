import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivityCardComponent } from './activity-card.component';
import { Activity, MOOD_OPTIONS, WEATHER_OPTIONS } from '../models/activity.interface';
import { 
  IonContent, 
  IonChip, 
  IonFab, 
  IonFabButton, 
  IonIcon,
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonItem,
  IonLabel,
  IonInput,
  IonSelect,
  IonSelectOption,
  IonTextarea
} from '@ionic/angular/standalone';
import { addOutline } from 'ionicons/icons';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    ActivityCardComponent,
    IonContent,
    IonChip,
    IonFab,
    IonFabButton,
    IonIcon,
    IonModal,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonButton,
    IonItem,
    IonLabel,
    IonInput,
    IonSelect,
    IonSelectOption,
    IonTextarea
  ],
  template: `
    <ion-content>
      <!-- Filter Section -->
      <div class="filter-section">
        <div class="filter-row">
          @for (mood of MOOD_OPTIONS; track mood) {
            <ion-chip 
              [class.selected]="selectedMoods.includes(mood)"
              (click)="toggleMood(mood)">
              {{ mood }}
            </ion-chip>
          }
        </div>
        <div class="filter-row">
          @for (weather of WEATHER_OPTIONS; track weather) {
            <ion-chip 
              [class.selected]="selectedWeather.includes(weather)"
              (click)="toggleWeather(weather)">
              {{ weather }}
            </ion-chip>
          }
        </div>
      </div>

      <!-- Activity Grid -->
      <div class="activity-grid">
        @for (activity of filteredActivities; track activity.id) {
          <app-activity-card [activity]="activity" />
        }
      </div>

      <!-- Add Activity Button -->
      <ion-fab vertical="top" horizontal="end" slot="fixed">
        <ion-fab-button (click)="openAddModal()">
          <ion-icon [icon]="addIcon"></ion-icon>
        </ion-fab-button>
      </ion-fab>

      <!-- Add Activity Modal -->
      <ion-modal [isOpen]="isModalOpen" (didDismiss)="isModalOpen = false">
        <ng-template>
          <ion-header>
            <ion-toolbar>
              <ion-title>Add New Activity</ion-title>
              <ion-buttons slot="end">
                <ion-button (click)="isModalOpen = false">Close</ion-button>
              </ion-buttons>
            </ion-toolbar>
          </ion-header>

          <ion-content>
            <form (ngSubmit)="addActivity()">
              <ion-item>
                <ion-label position="stacked">Title</ion-label>
                <ion-input [(ngModel)]="newActivity.title" name="title" required></ion-input>
              </ion-item>

              <ion-item>
                <ion-label position="stacked">Mood</ion-label>
                <ion-select [(ngModel)]="newActivity.mood" name="mood" multiple="true" required>
                  @for (mood of MOOD_OPTIONS; track mood) {
                    <ion-select-option [value]="mood">
                      {{ mood }}
                    </ion-select-option>
                  }
                </ion-select>
              </ion-item>

              <ion-item>
                <ion-label position="stacked">Weather</ion-label>
                <ion-select [(ngModel)]="newActivity.weather" name="weather" multiple="true" required>
                  @for (weather of WEATHER_OPTIONS; track weather) {
                    <ion-select-option [value]="weather">
                      {{ weather }}
                    </ion-select-option>
                  }
                </ion-select>
              </ion-item>

              <ion-item>
                <ion-label position="stacked">Travel Distance</ion-label>
                <ion-input [(ngModel)]="newActivity.travelDistance" name="travelDistance" required></ion-input>
              </ion-item>

              <ion-item>
                <ion-label position="stacked">Cost</ion-label>
                <ion-input [(ngModel)]="newActivity.cost" name="cost" required></ion-input>
              </ion-item>

              <ion-item>
                <ion-label position="stacked">Image URL</ion-label>
                <ion-input [(ngModel)]="newActivity.images[0]" name="imageUrl" required></ion-input>
              </ion-item>

              <ion-item>
                <ion-label position="stacked">External URL</ion-label>
                <ion-input [(ngModel)]="newActivity.externalUrl" name="externalUrl" required></ion-input>
              </ion-item>

              <ion-item>
                <ion-label position="stacked">Notes</ion-label>
                <ion-textarea [(ngModel)]="newActivity.notes" name="notes" required></ion-textarea>
              </ion-item>

              <ion-button expand="block" type="submit" class="ion-margin">
                Add Activity
              </ion-button>
            </form>
          </ion-content>
        </ng-template>
      </ion-modal>
    </ion-content>
  `,
  styles: [`
    .filter-section {
      padding: 16px;
      background: var(--ion-color-primary);
    }

    .filter-row {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-bottom: 8px;

      &:last-child {
        margin-bottom: 0;
      }
    }

    ion-chip {
      --background: white;
      &.selected {
        --background: var(--ion-color-accent);
      }
    }

    .activity-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 16px;
      padding: 16px;
    }
  `]
})
export class HomePage {
  activities: Activity[] = [];
  filteredActivities: Activity[] = [];
  selectedMoods: string[] = [];
  selectedWeather: string[] = [];
  isModalOpen = false;
  MOOD_OPTIONS = MOOD_OPTIONS;
  WEATHER_OPTIONS = WEATHER_OPTIONS;
  addIcon = addOutline;

  newActivity: Activity = this.getEmptyActivity();

  constructor() {
    // Load activities from localStorage
    const stored = localStorage.getItem('activities');
    this.activities = stored ? JSON.parse(stored) : [];
    this.filteredActivities = [...this.activities];
  }

  private getEmptyActivity(): Activity {
    return {
      id: this.activities?.length + 1 || 1,
      title: '',
      mood: [],
      weather: [],
      travelDistance: '',
      cost: '',
      images: [''],
      externalUrl: '',
      notes: ''
    };
  }

  toggleMood(mood: string) {
    const index = this.selectedMoods.indexOf(mood);
    if (index === -1) {
      this.selectedMoods.push(mood);
    } else {
      this.selectedMoods.splice(index, 1);
    }
    this.filterActivities();
  }

  toggleWeather(weather: string) {
    const index = this.selectedWeather.indexOf(weather);
    if (index === -1) {
      this.selectedWeather.push(weather);
    } else {
      this.selectedWeather.splice(index, 1);
    }
    this.filterActivities();
  }

  filterActivities() {
    this.filteredActivities = this.activities.filter(activity => {
      const matchesMood = this.selectedMoods.length === 0 || 
        activity.mood.some(mood => this.selectedMoods.includes(mood));
      const matchesWeather = this.selectedWeather.length === 0 || 
        activity.weather.some(weather => this.selectedWeather.includes(weather));
      return matchesMood && matchesWeather;
    });
  }

  openAddModal() {
    this.newActivity = this.getEmptyActivity();
    this.isModalOpen = true;
  }

  addActivity() {
    if (this.validateActivity()) {
      this.activities.push({ ...this.newActivity });
      localStorage.setItem('activities', JSON.stringify(this.activities));
      this.filterActivities();
      this.isModalOpen = false;
    }
  }

  validateActivity(): boolean {
    return !!(
      this.newActivity.title &&
      this.newActivity.mood.length &&
      this.newActivity.weather.length &&
      this.newActivity.travelDistance &&
      this.newActivity.cost &&
      this.newActivity.images[0] &&
      this.newActivity.externalUrl &&
      this.newActivity.notes
    );
  }
}