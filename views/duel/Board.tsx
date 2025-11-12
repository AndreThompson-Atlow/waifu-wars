
import React from 'react';
import { CardData } from '../../types';
import Card from '../../components/ui/Card';
import CardBack from '../../components/ui/CardBack';

interface BoardProps {
    isPlayer?: boolean;
    deck: (CardData | null)[];
    discard: (CardData | null)[];
    extraDeck: (CardData | null)[];
    banished: (CardData | null)[];
    units: (CardData | null)[];
    onCardHover: (card: CardData | null) => void;
}

const Board: React.FC<BoardProps> = ({
    isPlayer = false,
    deck,
    discard,
    extraDeck,
    banished,
    units,
    onCardHover
}) => {
    const discardTopCard = discard.length > 0 ? discard[discard.length - 1] : null;
    const unitZones = Array(3).fill(null).map((_, i) => units[i] || null);

    const renderZone = (type: string, card: CardData | null) => {
        const isEmpty = !card;
        const isUnitZone = type === 'unit';
        const isDiscard = type === 'discard';
        const isFaceDown = ['deck', 'extraDeck', 'banished'].includes(type);

        if (isUnitZone) {
            return <Card card={card} />;
        } else if (isDiscard) {
            return isEmpty ? <div className="w-full h-full bg-black/10 rounded-xl" /> : <Card card={card} />;
        } else if (isFaceDown) {
            return isEmpty ? <div className="w-full h-full bg-black/10 rounded-xl" /> : <CardBack />;
        }
        return <div className="w-full h-full bg-black/10 rounded-xl" />;
    };

    const playerZoneTypes = ['banished', 'extraDeck', 'unit', 'unit', 'unit', 'deck', 'discard'];
    const opponentZoneTypes = ['discard', 'deck', 'unit', 'unit', 'unit', 'extraDeck', 'banished'];
    const zoneTypes = isPlayer ? playerZoneTypes : opponentZoneTypes;

    const playerZoneCards = [
        banished.length > 0 ? ({} as CardData) : null,
        extraDeck.length > 0 ? ({} as CardData) : null,
        ...unitZones,
        deck.length > 0 ? ({} as CardData) : null,
        discardTopCard
    ];

    const opponentZoneCards = [
        discardTopCard,
        deck.length > 0 ? ({} as CardData) : null,
        ...unitZones,
        extraDeck.length > 0 ? ({} as CardData) : null,
        banished.length > 0 ? ({} as CardData) : null,
    ];

    const zones = isPlayer ? playerZoneCards : opponentZoneCards;

    return (
        <div className="h-full w-full flex justify-center items-center gap-4 p-1">
            {zones.map((card, index) => {
                const zoneType = zoneTypes[index];
                const isFaceDownZone = ['deck', 'extraDeck', 'banished'].includes(zoneType);

                return (
                    <div 
                        key={index} 
                        className="w-32 h-48"
                        onMouseEnter={() => onCardHover(isFaceDownZone ? null : card)}
                        onMouseLeave={() => onCardHover(null)}
                    >
                        {renderZone(zoneType, card)}
                    </div>
                )
            })}
        </div>
    );
};

export default Board;
