
import React from 'react';
import { CardData } from '../../types';
import Card from '../../components/ui/Card';

interface PlayerHandProps {
    cards: CardData[];
}

const PlayerHand: React.FC<PlayerHandProps> = ({ cards }) => {
    return (
        <div className="h-48 flex justify-center items-center gap-4 bg-black/30 p-2 rounded-lg">
            {cards.map((card, index) => (
                <div key={index} className="h-full aspect-[2/3] transform hover:-translate-y-4 hover:z-10 transition-transform duration-200">
                    <Card card={card} />
                </div>
            ))}
            {/* Fill empty slots */}
            {Array.from({ length: Math.max(0, 3 - cards.length) }).map((_, index) => (
                <div key={`empty-${index}`} className="h-full aspect-[2/3] bg-gray-800/50 border-2 border-dashed border-gray-600 rounded-lg" />
            ))}
        </div>
    );
};

export default PlayerHand;
