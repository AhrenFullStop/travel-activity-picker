export interface Activity {
    id: number;
    title: string;
    mood: string[];
    weather: string[];
    travelDistance: string;
    cost: string;
    images: string[];
    externalUrl: string;
    notes: string;
    review?: Review;
}

export interface Review {
    // TBD - not implemented in MVP
}

export type MoodType = 'Romantic' | 'Lazy' | 'Active' | 'Quiet' | 'Loud' | 'Nature' | 'Urban' | 'W/Friends' | 'Just Us';
export type WeatherType = 'Rainy' | 'Sunny' | 'Cloudy' | 'Hot' | 'Cold' | 'Windy';

export const MOOD_OPTIONS: MoodType[] = ['Romantic', 'Lazy', 'Active', 'Quiet', 'Loud', 'Nature', 'Urban', 'W/Friends', 'Just Us'];
export const WEATHER_OPTIONS: WeatherType[] = ['Rainy', 'Sunny', 'Cloudy', 'Hot', 'Cold', 'Windy'];