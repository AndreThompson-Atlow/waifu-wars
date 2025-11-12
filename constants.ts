
import { CardData, NPC, Location, LocationId, DayOfWeek, TimeSlot, District, DistrictId, Rarity } from './types';

export const DAYS_OF_WEEK: DayOfWeek[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
export const TIME_SLOTS: TimeSlot[] = ['Morning', 'Afternoon', 'Evening'];

export const CARDS: CardData[] = [
    {
        id: 'card_unit_example',
        name: 'Valiant Adventurer',
        type: 'unit',
        rarity: 'Rare',
        moralAlignment: 'Good',
        philosophicalAlignment: 'Law',
        imageUrl: `./assets/cards/adventurer.png`,
        description: 'A brave warrior who explores the unknown, ready to face any danger.',
        attack: 1800,
        defense: 1200,
    },
    {
        id: 'card_spell_example',
        name: 'Fireball',
        type: 'spell',
        rarity: 'Uncommon',
        imageUrl: `./assets/cards/fireball.png`,
        description: 'Deal 800 damage to one target unit. A classic choice for any aspiring pyromancer.',
    },
    {
        id: 'card_equipment_example',
        name: 'Light Armor',
        type: 'equipment',
        rarity: 'Common',
        imageUrl: `./assets/cards/light_armor.png`,
        description: 'Equip to any Unit. It gains 600 DEF. This armor is light but surprisingly durable.',
    },
    ...Array.from({ length: 97 }, (_, i) => ({
        id: `card_${i + 4}`,
        name: `Cyber Knight #${i + 4}`,
        type: 'unit' as const,
        rarity: 'Common',
        moralAlignment: 'Neutral',
        philosophicalAlignment: 'Neutral',
        imageUrl: `./assets/cards/cyber_knight_${i + 4}.png`,
        description: 'A futuristic warrior clad in shimmering armor.',
        attack: 1000 + Math.floor(Math.random() * 1500),
        defense: 1000 + Math.floor(Math.random() * 1500),
    }))
];

export const NPCS: Record<string, NPC> = {
    'npc_rival': {
        id: 'npc_rival',
        name: 'Kaito',
        avatarUrl: './assets/duelists/kaito.png',
        deck: CARDS.slice(20, 40).map(c => c.id),
        dialogue: {
            intro: "You think you have what it takes? Show me!",
            win: "Hmph. A lucky win.",
            lose: "As expected. You're not ready."
        }
    },
    'npc_friend': {
        id: 'npc_friend',
        name: 'Yuna',
        avatarUrl: './assets/duelists/yuna.png',
        deck: CARDS.slice(40, 60).map(c => c.id),
        dialogue: {
            intro: "Hey! Let's have a fun duel!",
            win: "That was a great game!",
            lose: "Wow, you're really strong!"
        }
    },
    'npc_shopkeeper': {
        id: 'npc_shopkeeper',
        name: 'Mr. Stan',
        avatarUrl: './assets/duelists/mr_stan.png',
        deck: CARDS.slice(60, 80).map(c => c.id),
        dialogue: {
            intro: "Want to test some of the new cards? I won't go easy on you!",
            win: "Haha! The new stock is powerful!",
            lose: "You've got a good eye for strategy."
        }
    }
};

export const LOCATIONS: Record<LocationId, Location> = {
    home: {
        id: 'home',
        name: 'Your Room',
        backgroundImageUrl: './assets/locations/your_room.jpg',
        schedule: {},
        events: [],
        type: 'home',
    },
    shop: {
        id: 'shop',
        name: 'Card Shop "Nexus"',
        backgroundImageUrl: './assets/locations/card_shop.jpg',
        schedule: {
            Monday: { Morning: ['npc_shopkeeper'], Afternoon: ['npc_shopkeeper', 'npc_rival'], Evening: ['npc_shopkeeper'] },
            Tuesday: { Morning: ['npc_shopkeeper'], Afternoon: ['npc_shopkeeper', 'npc_friend'], Evening: ['npc_shopkeeper'] },
            Wednesday: { Morning: ['npc_shopkeeper'], Afternoon: ['npc_shopkeeper'], Evening: ['npc_shopkeeper'] },
            Thursday: { Morning: ['npc_shopkeeper'], Afternoon: ['npc_shopkeeper', 'npc_rival'], Evening: ['npc_shopkeeper'] },
            Friday: { Morning: ['npc_shopkeeper'], Afternoon: ['npc_shopkeeper', 'npc_friend'], Evening: ['npc_shopkeeper', 'npc_rival'] },
            Saturday: { Morning: ['npc_shopkeeper','npc_friend'], Afternoon: ['npc_shopkeeper', 'npc_rival', 'npc_friend'], Evening: ['npc_shopkeeper'] },
            Sunday: { Morning: ['npc_shopkeeper'], Afternoon: ['npc_shopkeeper'], Evening: [] },
        },
        events: [],
        type: 'shop',
        inventory: {
            packs: [
                { id: 'pack_cyber', name: 'Cybernetic Dawn', price: 500, imageUrl: './assets/ui/pack_cyber.png' },
                { id: 'pack_dragon', name: 'Dragon\'s Roar', price: 500, imageUrl: './assets/ui/pack_dragon.png' },
            ],
            singles: [
                { id: CARDS[5].id, name: CARDS[5].name, price: 350, imageUrl: CARDS[5].imageUrl },
                { id: CARDS[12].id, name: CARDS[12].name, price: 400, imageUrl: CARDS[12].imageUrl },
                { id: CARDS[28].id, name: CARDS[28].name, price: 200, imageUrl: CARDS[28].imageUrl },
                { id: CARDS[35].id, name: CARDS[35].name, price: 500, imageUrl: CARDS[35].imageUrl },
                { id: CARDS[42].id, name: CARDS[42].name, price: 250, imageUrl: CARDS[42].imageUrl },
                { id: CARDS[55].id, name: CARDS[55].name, price: 600, imageUrl: CARDS[55].imageUrl },
                { id: CARDS[61].id, name: CARDS[61].name, price: 150, imageUrl: CARDS[61].imageUrl },
                { id: CARDS[73].id, name: CARDS[73].name, price: 450, imageUrl: CARDS[73].imageUrl },
            ],
            decks: [
                { id: 'deck_starter_cyber', name: 'Cyber Starter Deck', price: 2500, imageUrl: './assets/ui/deck_cyber.png' },
                { id: 'deck_starter_dragon', name: 'Dragonic Starter Deck', price: 2500, imageUrl: './assets/ui/deck_dragon.png' },
            ],
            sleeves: [
                { id: 'sleeve_red', name: 'Glossy Red Sleeves', price: 200, imageUrl: './assets/ui/sleeve_red.png' },
                { id: 'sleeve_blue', name: 'Matte Blue Sleeves', price: 200, imageUrl: './assets/ui/sleeve_blue.png' },
            ],
            playmats: [
                { id: 'playmat_forest', name: 'Forest Playmat', price: 800, imageUrl: './assets/ui/playmat_forest.png' },
            ]
        }
    },
    park: {
        id: 'park',
        name: 'Central Park',
        backgroundImageUrl: './assets/locations/central_park.jpg',
        schedule: {
            Monday: { Afternoon: ['npc_friend'] },
            Tuesday: {},
            Wednesday: { Afternoon: ['npc_rival'] },
            Thursday: { Evening: ['npc_friend'] },
            Friday: {},
            Saturday: { Morning: ['npc_friend'], Afternoon: ['npc_rival', 'npc_friend']},
            Sunday: { Morning: ['npc_friend'], Afternoon: ['npc_friend'], Evening: ['npc_rival'] },
        },
        events: [],
        type: 'general',
    },
    arcade: {
        id: 'arcade',
        name: 'Gamer\'s Alley Arcade',
        backgroundImageUrl: './assets/locations/arcade.jpg',
        schedule: {
            Monday: { Evening: ['npc_rival'] },
            Tuesday: { Evening: ['npc_friend'] },
            Wednesday: {},
            Thursday: { Evening: ['npc_friend'] },
            Friday: { Afternoon: ['npc_rival'], Evening: ['npc_friend', 'npc_rival'] },
            Saturday: { Afternoon: ['npc_friend'], Evening: ['npc_rival'] },
            Sunday: { Afternoon: ['npc_friend'] },
        },
        events: [],
        type: 'general',
    }
};

export const DISTRICTS: Record<DistrictId, District> = {
    downtown: {
        id: 'downtown',
        name: 'Downtown',
        description: 'The bustling heart of the city, full of shops and places to hang out.',
        backgroundImageUrl: './assets/locations/dist_downtown.jpg',
        locationIds: ['shop', 'park']
    },
    uptown: {
        id: 'uptown',
        name: 'Uptown',
        description: 'A quieter area with entertainment spots and high-end stores.',
        backgroundImageUrl: './assets/locations/dist_uptown.jpg',
        locationIds: ['arcade']
    }
};
