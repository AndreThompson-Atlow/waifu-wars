
import React from 'react';
import { CardData } from '../../types';
import Card from '../../components/ui/Card';
import CardBack from '../../components/ui/CardBack';

interface PlayerHandProps {
    cards: (CardData | null)[];
    isOpponent?: boolean;
    onCardHover: (card: CardData | null) => void;
    onCardClick?: (card: CardData) => void;
}

const PlayerHand: React.FC<PlayerHandProps> = ({ cards, isOpponent = false, onCardHover, onCardClick }) => {
    return (
        <div className={`h-full w-full flex justify-center items-center gap-2 p-1`}>
            {cards.map((card, index) => (
                <div 
                    key={index} 
                    className={`h-full aspect-[2/3] ${onCardClick && !isOpponent ? 'cursor-pointer' : ''}`}
                    onMouseEnter={() => onCardHover(card)}
                    onMouseLeave={() => onCardHover(null)}
                    onClick={() => onCardClick && card && onCardClick(card)}
                >
                    {isOpponent ? <CardBack /> : (card ? <Card card={card} view='simplified' /> : <div/>)}
                </div>
            ))}
        </div>
    );
};

export default PlayerHand;
