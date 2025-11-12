
import React, { useState, useCallback, useMemo } from 'react';
import { GameState, View, LocationId, TimeSlot, DayOfWeek, NPC, Deck, CardData, DistrictId, DuelState } from './types';
import { LOCATIONS, DAYS_OF_WEEK, TIME_SLOTS, NPCS, CARDS, DISTRICTS } from './constants';
import GameHUD from './components/GameHUD';
import LocationView from './views/LocationView';
import HomeView from './views/HomeView';
import CollectionView from './views/CollectionView';
import DeckSelectionView from './views/DeckSelectionView';
import DeckBuilderView from './views/DeckBuilderView';
import DuelView from './views/DuelView';
import ShopView from './views/ShopView';
import DistrictSelectionView from './views/DistrictSelectionView';
import LocationSelectionView from './views/LocationSelectionView';
import CardDeveloperView from './views/CardDeveloperView';

const App: React.FC = () => {
    const [gameState, setGameState] = useState<GameState>({
        currentView: 'cardDeveloperView',
        time: { day: 'Monday', slot: 'Morning' },
        currentLocationId: 'home',
        player: {
            name: 'Player',
            avatarUrl: './assets/duelists/player.png',
            collection: CARDS.slice(0, 50).map(c => c.id),
            decks: [
                { id: 1, name: 'My First Deck', cards: CARDS.slice(0, 20).map(c => c.id) }
            ],
            money: 1000,
            playmats: ['playmat-blue'],
            sleeves: ['sleeve-red'],
        },
        activeDuel: null,
        editingDeckId: null,
        selectedDistrictId: null,
    });

    const navigateTo = (view: View) => {
        setGameState(prev => ({ ...prev, currentView: view }));
    };

    const travelTo = (locationId: LocationId) => {
        const locationType = LOCATIONS[locationId].type;
        const newView = locationType === 'general' ? 'location' : locationType;
        setGameState(prev => ({ ...prev, currentLocationId: locationId, currentView: newView }));
    };
    
    const selectDistrict = (districtId: DistrictId) => {
        setGameState(prev => ({
            ...prev,
            selectedDistrictId: districtId,
            currentView: 'locationSelection'
        }));
    };

    const advanceTime = useCallback(() => {
        setGameState(prev => {
            const currentTimeSlotIndex = TIME_SLOTS.indexOf(prev.time.slot);
            if (currentTimeSlotIndex < TIME_SLOTS.length - 1) {
                return { ...prev, time: { ...prev.time, slot: TIME_SLOTS[currentTimeSlotIndex + 1] } };
            } else {
                const currentDayIndex = DAYS_OF_WEEK.indexOf(prev.time.day);
                const nextDay = DAYS_OF_WEEK[(currentDayIndex + 1) % DAYS_OF_WEEK.length];
                return { ...prev, time: { day: nextDay, slot: 'Morning' } };
            }
        });
    }, []);
    
    const startDuel = (opponent: NPC) => {
        const getCard = (id: string): CardData => CARDS.find(c => c.id === id)!;
        
        const playerDeck = gameState.player.decks[0]?.cards.map(getCard) || [];
        const opponentDeck = opponent.deck.map(getCard);

        setGameState(prev => ({
            ...prev,
            currentView: 'duel',
            activeDuel: {
                player: {
                    ...prev.player,
                    hp: 4000,
                    board: { extra: [], units: [null, null, null], deck: playerDeck, discard: [] },
                    hand: playerDeck.slice(0,3)
                },
                opponent: {
                    ...opponent,
                    hp: 4000,
                    board: { extra: [], units: [null, null, null], deck: opponentDeck, discard: [] },
                    hand: opponentDeck.slice(0,3)
                }
            }
        }));
    };
    
    const startDebugDuel = () => {
        const getCard = (id: string): CardData => CARDS.find(c => c.id === id)!;
        
        const debugDuelState: DuelState = {
            player: {
                name: 'Player',
                avatarUrl: './assets/duelists/player.png',
                hp: 3200,
                hand: [getCard('card_unit_example'), getCard('card_spell_example'), getCard('card_equipment_example'), CARDS[4]],
                board: {
                    extra: [],
                    units: [CARDS[10], null, CARDS[11]],
                    deck: CARDS.slice(20, 40),
                    discard: [CARDS[15]]
                }
            },
            opponent: {
                name: 'Kaito',
                avatarUrl: './assets/duelists/kaito.png',
                hp: 2500,
                hand: [CARDS[50], CARDS[51], CARDS[52]],
                board: {
                    extra: [],
                    units: [CARDS[60], CARDS[61], null],
                    deck: CARDS.slice(80, 100),
                    discard: [CARDS[70]]
                }
            }
        };

        setGameState(prev => ({
            ...prev,
            currentView: 'duel',
            activeDuel: debugDuelState,
        }));
    };

    const endDuel = () => {
        setGameState(prev => ({ ...prev, activeDuel: null, currentView: prev.currentLocationId === 'home' ? 'home' : 'location' }));
    };

    const startDeckEdit = (deckId: number | null) => {
        setGameState(prev => ({ ...prev, editingDeckId: deckId, currentView: 'deckBuilder' }));
    };

    const saveDeck = (deck: Deck) => {
        setGameState(prev => {
            const newDecks = [...prev.player.decks];
            const deckIndex = newDecks.findIndex(d => d.id === deck.id);
            if (deckIndex > -1) {
                newDecks[deckIndex] = deck;
            } else {
                newDecks.push(deck);
            }
            return { ...prev, player: { ...prev.player, decks: newDecks }, editingDeckId: null, currentView: 'deckSelection' };
        });
    };
    
    const currentPeople = useMemo(() => {
        const location = LOCATIONS[gameState.currentLocationId];
        const peopleIds = location.schedule[gameState.time.day]?.[gameState.time.slot] || [];
        return peopleIds.map(id => NPCS[id]);
    }, [gameState.currentLocationId, gameState.time]);

    const renderView = () => {
        const currentLocation = LOCATIONS[gameState.currentLocationId];

        switch (gameState.currentView) {
            case 'location':
                return <LocationView location={currentLocation} people={currentPeople} onStartDuel={startDuel} />;
            case 'home':
                return <HomeView location={currentLocation} onNavigate={navigateTo} />;
            case 'collection':
                return <CollectionView collection={gameState.player.collection} />;
            case 'deckSelection':
                return <DeckSelectionView decks={gameState.player.decks} onEditDeck={startDeckEdit} />;
            case 'deckBuilder':
                return <DeckBuilderView 
                            deckId={gameState.editingDeckId} 
                            allDecks={gameState.player.decks} 
                            collection={gameState.player.collection} 
                            onSave={saveDeck} 
                            onCancel={() => navigateTo('deckSelection')} />;
            case 'duel':
                if (!gameState.activeDuel) return null;
                return <DuelView duelState={gameState.activeDuel} onEndDuel={endDuel} />;
            case 'shop':
                return <ShopView location={currentLocation} />;
            case 'districtSelection':
                return <DistrictSelectionView districts={DISTRICTS} onSelectDistrict={selectDistrict} />;
            case 'locationSelection':
                if (!gameState.selectedDistrictId) return <div>No district selected.</div>;
                const selectedDistrict = DISTRICTS[gameState.selectedDistrictId];
                const districtLocations = selectedDistrict.locationIds.map(id => LOCATIONS[id]);
                return <LocationSelectionView 
                            district={selectedDistrict} 
                            locations={districtLocations} 
                            onTravel={travelTo}
                            onBack={() => navigateTo('districtSelection')} 
                        />;
            case 'cardDeveloperView':
                return <CardDeveloperView />;
            default:
                return <div>Not Found</div>;
        }
    };

    const showHUD = gameState.currentView !== 'duel';

    return (
        <div className="h-full bg-gray-900 text-white flex flex-col">
            {showHUD && (
                <GameHUD 
                    time={gameState.time} 
                    locationName={LOCATIONS[gameState.currentLocationId].name}
                    onAdvanceTime={advanceTime}
                    onNavigate={navigateTo}
                    onTravel={travelTo}
                    onStartDebugDuel={startDebugDuel}
                />
            )}
            <main className="flex-grow overflow-hidden">
                {renderView()}
            </main>
        </div>
    );
};

export default App;
