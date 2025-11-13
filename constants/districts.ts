import { District } from '../types';

export const DISTRICTS: Record<string, District> = {
    downtown: {
        id: 'downtown',
        name: 'Downtown',
        description: 'The bustling heart of the city.',
        backgroundImageUrl: './assets/locations/downtown.png',
        locationIds: ['shop', 'arcade'],
    },
    uptown: {
        id: 'uptown',
        name: 'Uptown',
        description: 'A quieter, more residential area.',
        backgroundImageUrl: './assets/locations/uptown.png',
        locationIds: ['park'],
    },
};
