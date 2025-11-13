
export type View = 'home' | 'location' | 'collection' | 'deckBuilder' | 'deckSelection' | 'duel' | 'shop' | 'districtSelection' | 'locationSelection' | 'cardDeveloperView';
export type LocationId = 'home' | 'shop' | 'park' | 'arcade';
export type TimeSlot = 'Morning' | 'Afternoon' | 'Evening';
export type DayOfWeek = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
export type DistrictId = 'downtown' | 'uptown';
export type CardType = 'unit' | 'spell' | 'equipment';
export type Rarity = 'Common' | 'Uncommon' | 'Rare' | 'Legendary' | 'Mythic';
export type MoralAlignment = 'Good' | 'Neutral' | 'Evil';
export type PhilosophicalAlignment = 'Law' | 'Neutral' | 'Chaos';
export type Element = 'Metallic' | 'Infernal' | 'Voltaic' | 'Aqua' | 'Frost' | 'Gale' | 'Terra' | 'Umbral' | 'Radiant';
export type EquipmentType = 'Weapon' | 'Armor' | 'Accessory';
export type TurnPhase = 'dawn' | 'summon' | 'pre-combat' | 'combat' | 'dusk';

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
    critical?: number;
    shield?: number;
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

export interface PlayerState {
    id: string;
    name: string;
    avatarUrl: string;
    collection: string[];
    decks: Deck[];
    money: number;
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
    events: any[];
    type: 'general' | 'shop' | 'home';
    inventory?: ShopInventory;
}

export interface TimeState {
    day: DayOfWeek;
    slot: TimeSlot;
}

export interface UnitInstance {
    cardId: string;
    currentShield: number;
    canAttack: boolean;
}

export interface BoardState {
    deck: string[];
    discard: string[];
    extraDeck: string[];
    banished: string[];
    units: (UnitInstance | null)[];
}

export interface DuelPlayerState {
    id: string;
    name: string;
    avatarUrl: string;
    hp: number;
    hand: string[];
    board: BoardState;
    hasSummonedUnitThisTurn: boolean;
}

export interface DuelState {
    player: DuelPlayerState;
    opponent: DuelPlayerState;
    turn: number;
    phase: TurnPhase;
    activePlayerId: string;
}

export interface GameState {
    currentView: View;
    time: TimeState;
    currentLocationId: LocationId;
    player: PlayerState;
    activeDuel: DuelState | null;
    editingDeckId: number | null;
    selectedDistrictId: DistrictId | null;
}

// Board units hold the card's original data and any temporary in-duel properties. 
export interface BoardUnit {
    card: CardData;
    canAttack: boolean;
}
