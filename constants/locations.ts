import { Location } from '../types';

export const LOCATIONS: Record<string, Location> = {
    home: {
        id: 'home',
        name: 'Your Apartment',
        backgroundImageUrl: './assets/locations/home.png',
        schedule: {},
        events: [],
        type: 'home',
    },
    shop: {
        id: 'shop',
        name: 'Card Shop',
        backgroundImageUrl: './assets/locations/card_shop.png',
        schedule: {
            Monday: { Morning: ['npc_shopkeeper'], Afternoon: ['npc_shopkeeper'], Evening: ['npc_shopkeeper'] },
            Tuesday: { Morning: ['npc_shopkeeper'], Afternoon: ['npc_shopkeeper'], Evening: ['npc_shopkeeper'] },
            Wednesday: { Morning: ['npc_shopkeeper'], Afternoon: ['npc_shopkeeper'], Evening: ['npc_shopkeeper'] },
            Thursday: { Morning: ['npc_shopkeeper'], Afternoon: ['npc_shopkeeper'], Evening: ['npc_shopkeeper'] },
            Friday: { Morning: ['npc_shopkeeper', 'npc_rival'], Afternoon: ['npc_shopkeeper'], Evening: ['npc_shopkeeper', 'npc_pro_player'] },
            Saturday: { Morning: ['npc_shopkeeper'], Afternoon: ['npc_shopkeeper', 'npc_collector'], Evening: ['npc_shopkeeper'] },
            Sunday: { Morning: ['npc_shopkeeper'], Afternoon: ['npc_shopkeeper'], Evening: [] },
        },
        events: [],
        type: 'shop',
        inventory: {
            packs: [{ id: 'pack_1', name: 'First Edition', price: 100, imageUrl: '' }],
            singles: [],
        }
    },
    park: {
        id: 'park',
        name: 'Central Park',
        backgroundImageUrl: './assets/locations/park.png',
        schedule: {
            Monday: { Afternoon: ['npc_casual_player'] },
            Wednesday: { Afternoon: ['npc_casual_player'] },
            Saturday: { Morning: ['npc_casual_player', 'npc_rival'], Afternoon: ['npc_casual_player'] },
        },
        events: [],
        type: 'general',
    },
    arcade: {
        id: 'arcade',
        name: 'The Arcade',
        backgroundImageUrl: './assets/locations/arcade.png',
        schedule: {
            Friday: { Evening: ['npc_gamer'] },
            Saturday: { Evening: ['npc_gamer', 'npc_rival'] },
        },
        events: [],
        type: 'general',
    }
};