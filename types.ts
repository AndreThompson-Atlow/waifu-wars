export type View = 'home' | 'location' | 'collection' | 'deckBuilder' | 'deckSelection' | 'duel' | 'shop' | 'districtSelection' | 'locationSelection' | 'cardDeveloperView';
export type LocationId = 'home' | 'shop' | 'park' | 'arcade';
export type TimeSlot = 'Morning' | 'Afternoon' | 'Evening';
export type DayOfWeek = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
export type DistrictId = 'downtown' | 'uptown';
export type CardType = 'unit' | 'spell' | 'equipment';
export type Rarity = 'Common' | 'Uncommon' | 'Rare' | 'Legendary' | 'Mythic';
export type MoralAlignment = 'Good' | 'Neutral' | 'Evil';
export type PhilosophicalAlignment = 'Law' | 'Neutral' | 'Chaos';
export type Element = 'Infernal' | 'Voltaic' | 'Aqua' | 'Frost' | 'Gale' | 'Terra' | 'Umbral' | 'Radiant';
export type EquipmentType = 'Weapon' | 'Armor' | 'Accessory';

export interface District {
    id: DistrictId;
    name: string;
    description: string;
    backgroundImageUrl: string;
    locationIds: LocationId[];
}
export interface CardData {
    id: string;
    name:string;
    imageUrl: string;
    description: string;
    type: CardType;
    rarity: Rarity;
    power?: number;
    traits?: string[];
    moralAlignment?: MoralAlignment;
    philosophicalAlignment?: PhilosophicalAlignment;
    element?: Element;
    equipmentType?: EquipmentType;
}

export interface Deck {
    id: number;
    name: string;
    cards: string[];
}

export interface Player {
    name: string;
    avatarUrl: string;
    collection: string[];
    decks: Deck[];
    money: number;
    playmats: string[];
    sleeves: string[];
}

export interface NPC {
    id: string;
    name: string;
    avatarUrl: string;
    deck: string[];
    dialogue: {
        intro: string;
        win: string;
        lose: string;
    }
}

export interface ShopItem {
    id: string;
    name: string;
    price: number;
    imageUrl: string;
}

export interface ShopInventory {
    packs?: ShopItem[];
    singles?: ShopItem[];
    decks?: ShopItem[];
    sleeves?: ShopItem[];
    playmats?: ShopItem[];
}

export interface Location {
    id: LocationId;
    name: string;
    backgroundImageUrl: string;
    schedule: Partial<Record<DayOfWeek, Partial<Record<TimeSlot, string[]>>>>;
    events: any[]; // Placeholder for events
    type: 'general' | 'shop' | 'home';
    inventory?: ShopInventory;
}

export interface TimeState {
    day: DayOfWeek;
    slot: TimeSlot;
}

export interface BoardState {
    extra: CardData[];
    units: (CardData | null)[];
    deck: CardData[];
    discard: CardData[];
}

export interface DuelPlayerState {
    name: string;
    avatarUrl: string;
    hp: number;
    board: BoardState;
    hand: CardData[];
}

// A partial NPC is needed for the player's side in a duel
type PartialNpc = Partial<Omit<NPC, 'id' | 'deck' | 'dialogue'>>;

export interface DuelState {
    player: DuelPlayerState;
    opponent: DuelPlayerState & PartialNpc;
}

export interface GameState {
    currentView: View;
    time: TimeState;
    currentLocationId: LocationId;
    player: Player;
    activeDuel: DuelState | null;
    editingDeckId: number | null; // null for a new deck
    selectedDistrictId: DistrictId | null;
}