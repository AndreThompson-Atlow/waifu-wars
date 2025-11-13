
import React from 'react';
import { CardData } from '../../types';
import Card from '../../components/ui/Card';
import CardBack from '../../components/ui/CardBack';

interface PlayerHandProps {
    cards: (CardData | null)[];
    isOpponent?: boolean;
    onCardHover: (card: CardData | null) => void;
}

const PlayerHand: React.FC<PlayerHandProps> = ({ cards, isOpponent = false, onCardHover }) => {
    return (
        <div className={`h-full w-full flex justify-center items-center gap-2 p-1`}>
            {cards.map((card, index) => (
                <div 
                    key={index} 
                    className={`h-full aspect-[2/3]`}
                    onMouseEnter={() => onCardHover(card)}
                    onMouseLeave={() => onCardHover(null)}
                >
                    {isOpponent ? <CardBack /> : <Card card={card} view='simplified' />}
                </div>
            ))}
        </div>
    );
};

export default PlayerHand;
