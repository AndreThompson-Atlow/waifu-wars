
import React, { useState, useEffect } from 'react';
import { Deck, CardData } from '../types';
import { TEST_CARDS } from '../constants/index';
import Card from '../components/ui/Card';

interface DeckBuilderViewProps {
    deckId: number | null;
    allDecks: Deck[];
    collection: string[];
    onSave: (deck: Deck) => void;
    onCancel: () => void;
}

const DeckBuilderView: React.FC<DeckBuilderViewProps> = ({ deckId, allDecks, collection, onSave, onCancel }) => {
    const [deck, setDeck] = useState<Deck>({
        id: deckId ?? Date.now(),
        name: `New Deck ${allDecks.length + 1}`,
        cards: []
    });

    useEffect(() => {
        if (deckId) {
            const existingDeck = allDecks.find(d => d.id === deckId);
            if (existingDeck) {
                setDeck(existingDeck);
            }
        }
    }, [deckId, allDecks]);

    const ownedCards = collection.map(id => TEST_CARDS[id]).filter(Boolean);

    const addCard = (cardId: string) => {
        if (deck.cards.length < 60) { // Max deck size
            setDeck(prev => ({ ...prev, cards: [...prev.cards, cardId] }));
        }
    };

    const removeCard = (index: number) => {
        setDeck(prev => ({ ...prev, cards: prev.cards.filter((_, i) => i !== index) }));
    };

    return (
        <div className="flex h-full p-4 gap-4 bg-gray-900">
            {/* Collection */}
            <div className="w-2/3 bg-gray-800 p-4 rounded-lg flex flex-col">
                <h2 className="text-2xl font-bold mb-4">Collection ({ownedCards.length})</h2>
                <div className="flex-grow overflow-y-auto pr-2 grid grid-cols-4 lg:grid-cols-6 gap-2">
                    {ownedCards.map(card => (
                        <div key={card.id} className="aspect-[2/3]">
                            <Card card={card} onClick={() => addCard(card.id)} />
                        </div>
                    ))}
                </div>
            </div>

            {/* Deck */}
            <div className="w-1/3 bg-gray-800 p-4 rounded-lg flex flex-col">
                <input 
                    type="text" 
                    value={deck.name} 
                    onChange={e => setDeck(prev => ({...prev, name: e.target.value}))} 
                    className="w-full bg-gray-700 text-white p-2 rounded-md text-2xl font-bold mb-4"
                />
                <h3 className="mb-2 text-lg">Deck ({deck.cards.length} / 60)</h3>
                <div className="flex-grow overflow-y-auto pr-2 bg-gray-900/50 p-2 rounded-md space-y-1">
                    {deck.cards.map((cardId, index) => {
                        const card = TEST_CARDS[cardId]!;
                        return (
                            <div key={index} onClick={() => removeCard(index)} className="flex items-center justify-between p-1 bg-gray-700 rounded cursor-pointer hover:bg-red-800 transition-colors">
                                <span className="truncate">{card.name}</span>
                            </div>
                        )
                    })}
                </div>
                <div className="mt-4 flex gap-4">
                    <button onClick={() => onSave(deck)} className="flex-1 bg-green-600 hover:bg-green-500 text-white font-bold py-2 rounded">Save</button>
                    <button onClick={onCancel} className="flex-1 bg-red-600 hover:bg-red-500 text-white font-bold py-2 rounded">Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default DeckBuilderView;