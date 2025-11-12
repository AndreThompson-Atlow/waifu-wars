
import React from 'react';
import { CARDS } from '../constants';
import Card from '../components/ui/Card';

interface CollectionViewProps {
    collection: string[];
}

const CollectionView: React.FC<CollectionViewProps> = ({ collection }) => {
    const ownedCards = collection.map(id => CARDS.find(c => c.id === id)).filter(Boolean);

    return (
        <div className="p-8 h-full flex flex-col">
            <h1 className="text-4xl font-bold mb-6 border-b-2 border-indigo-500 pb-2 flex-shrink-0">My Collection</h1>
            <div className="flex-grow overflow-y-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4 pr-2">
                {ownedCards.map(card => card && (
                    <div key={card.id} className="aspect-[2/3]">
                      <Card card={card} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CollectionView;