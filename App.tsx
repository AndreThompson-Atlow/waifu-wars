
import React, { useState, useCallback, useMemo } from 'react';
import { GameState, View, LocationId, TimeSlot, DayOfWeek, NPC, Deck, CardData, DistrictId, DuelState } from './types';
import { LOCATIONS, DAYS_OF_WEEK, TIME_SLOTS, NPCS, CARDS, DISTRICTS, TEST_CARDS } from './constants/index';
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
import { gameManager } from './managers/GameManager';

const App: React.FC = () => {
    const [gameState, setGameState] = useState<GameState>({
        currentView: 'districtSelection',
        time: { day: 'Monday', slot: 'Morning' },
        currentLocationId: 'home',
        player: {
            id: 'player',
            name: 'Player',
            avatarUrl: './assets/duelists/player_avatar_1.png',
            collection: Object.keys(TEST_CARDS),
            decks: [
                { id: 1, name: 'My First Deck', cards: Object.keys(TEST_CARDS) }
            ],
            money: 1000,
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
    
    const startDuel = (opponentId: string) => {
        const duel = gameManager.createDuel(gameState.player, opponentId);
        setGameState(prev => ({
            ...prev,
            currentView: 'duel',
            activeDuel: duel
        }));
    };

    const endDuel = () => {
        setGameState(prev => ({ ...prev, activeDuel: null, currentView: prev.currentLocationId === 'home' ? 'home' : 'location' }));
    };

    const handlePlayCard = (cardId: string, slotIndex: number) => {
        if (!gameState.activeDuel) return;
        const newDuelState = gameManager.playCard(gameState.activeDuel, gameState.player.id, cardId, slotIndex);
        setGameState(prev => ({ ...prev, activeDuel: { ...newDuelState } }));
    };

    const handleEndTurn = () => {
        if (!gameState.activeDuel) return;
        const newDuelState = gameManager.endTurn(gameState.activeDuel);
        setGameState(prev => ({ ...prev, activeDuel: { ...newDuelState } }));
    };

    const handleUnitAttack = (attackerIndex: number, targetIndex: number | null) => {
        if (!gameState.activeDuel) return;
        const newDuelState = gameManager.attack(gameState.activeDuel, gameState.player.id, attackerIndex, targetIndex);
        setGameState(prev => ({ ...prev, activeDuel: { ...newDuelState } }));
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
                return <LocationView location={currentLocation} people={currentPeople} onStartDuel={(npc) => startDuel(npc.id)} />;
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
                return <DuelView 
                            duelState={gameState.activeDuel} 
                            onEndDuel={endDuel} 
                            onPlayCard={handlePlayCard} 
                            onEndTurn={handleEndTurn}
                            onUnitAttack={handleUnitAttack}
                        />;
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
                    onStartDebugDuel={() => startDuel('npc_rival')} // Example: always duel rival
                />
            )}
            <main className="flex-grow overflow-hidden">
                {renderView()}
            </main>
        </div>
    );
};

export default App;
