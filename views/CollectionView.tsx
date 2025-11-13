
import React, { useState } from 'react';
import { TEST_CARDS } from '../constants/index';
import Card from '../components/ui/Card';
import { CardData, CardType } from '../types';

interface CollectionViewProps {
    collection: string[];
}

const CollectionView: React.FC<CollectionViewProps> = ({ collection }) => {
    const [filter, setFilter] = useState<CardType | 'all'>('all');

    const ownedCards = collection.map(id => TEST_CARDS[id]).filter(Boolean) as CardData[];

    const filteredCards = ownedCards.filter(card => {
        if (filter === 'all') return true;
        return card.type === filter;
    });

    const cardTypes: (CardType | 'all')[] = ['all', 'unit', 'spell', 'equipment'];

    return (
        <div className="flex h-full">
            {/* Sidebar */}
            <div className="w-48 bg-gray-800 p-4 flex-shrink-0">
                <h2 className="text-2xl font-bold mb-4">Filters</h2>
                <ul>
                    {cardTypes.map(type => (
                        <li key={type} className="mb-2">
                            <button
                                onClick={() => setFilter(type)}
                                className={`w-full text-left px-3 py-2 rounded ${filter === type ? 'bg-indigo-600' : 'bg-gray-700 hover:bg-gray-600'}`}
                            >
                                {type.charAt(0).toUpperCase() + type.slice(1)}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Main Content */}
            <div className="p-8 h-full flex flex-col flex-grow">
                <h1 className="text-4xl font-bold mb-6 border-b-2 border-indigo-500 pb-2 flex-shrink-0">My Collection</h1>
                <div className="flex-grow overflow-y-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4 pr-2">
                    {filteredCards.map(card => card && (
                        <div key={card.id} className="aspect-[2/3]">
                            <Card card={card} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CollectionView;
