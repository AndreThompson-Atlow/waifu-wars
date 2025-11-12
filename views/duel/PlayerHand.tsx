
import React from 'react';
import { CardData } from '../../types';
import Card from '../../components/ui/Card';
import CardBack from '../../components/ui/CardBack';

interface PlayerHandProps {
    cards: (CardData | null)[];
    isOpponent?: boolean;
}

const PlayerHand: React.FC<PlayerHandProps> = ({ cards, isOpponent = false }) => {
    return (
        <div className={`h-full w-full flex justify-center items-center gap-2 p-1`}>
            {cards.map((card, index) => (
                <div key={index} className="w-32 h-auto aspect-[2/3]">
                    {isOpponent ? <CardBack /> : <Card card={card} />}
                </div>
            ))}
        </div>
    );
};

export default PlayerHand;
