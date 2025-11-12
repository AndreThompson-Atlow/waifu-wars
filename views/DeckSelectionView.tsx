
import React from 'react';
import { Deck } from '../types';

interface DeckSelectionViewProps {
    decks: Deck[];
    onEditDeck: (deckId: number | null) => void;
}

const MAX_DECKS = 10;

const DeckSelectionView: React.FC<DeckSelectionViewProps> = ({ decks, onEditDeck }) => {
    return (
        <div className="p-8 max-w-4xl mx-auto h-full flex flex-col">
            <h1 className="text-4xl font-bold mb-6 border-b-2 border-teal-500 pb-2 flex-shrink-0">Select a Deck</h1>
            <div className="overflow-y-auto flex-grow pr-2">
                <div className="space-y-4">
                    {decks.map(deck => (
                        <div key={deck.id} className="bg-gray-800 p-4 rounded-lg flex justify-between items-center shadow-md">
                            <div>
                                <h2 className="text-xl font-semibold">{deck.name}</h2>
                                <p className="text-gray-400">{deck.cards.length} cards</p>
                            </div>
                            <button onClick={() => onEditDeck(deck.id)} className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded transition-colors">
                                Edit
                            </button>
                        </div>
                    ))}
                    {decks.length < MAX_DECKS && (
                        <button onClick={() => onEditDeck(null)} className="w-full bg-green-700 hover:bg-green-600 text-white font-bold py-3 rounded-lg transition-colors border-2 border-dashed border-green-500">
                            + Create New Deck
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DeckSelectionView;
