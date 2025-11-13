
import React from 'react';
import { CardData, BoardUnit } from '../../types';
import Card from '../../components/ui/Card';
import CardBack from '../../components/ui/CardBack';

interface BoardProps {
    isPlayer?: boolean;
    deck: (CardData | null)[];
    discard: (CardData | null)[];
    extraDeck: (CardData | null)[];
    banished: (CardData | null)[];
    units: (BoardUnit | null)[];
    onCardHover: (card: CardData | null) => void;
    onUnitClick?: (index: number) => void;
    onSlotClick?: (index: number) => void;
}

const Zone: React.FC<{
    label: string;
    card?: CardData | null;
    count?: number;
    showBack?: boolean;
    onCardHover: (card: CardData | null) => void;
    onClick?: () => void;
    isUnit?: boolean;
}> = ({ label, card, count, showBack, onCardHover, onClick, isUnit }) => {
    const hasCard = card || (showBack && count && count > 0);

    return (
        <div
            className="h-full aspect-[2/3] relative"
            onMouseEnter={() => onCardHover(showBack ? null : card || null)}
            onMouseLeave={() => onCardHover(null)}
            onClick={onClick}
        >
            {!hasCard ? (
                <div className={`w-full h-full bg-black/30 border-2 border-dashed border-gray-500 rounded-lg flex items-center justify-center p-2 ${onClick ? 'cursor-pointer' : ''}`}>
                    <p className="text-white font-bold text-center text-xs uppercase" style={{ textShadow: '0 0 2px #000' }}>{label}</p>
                </div>
            ) : showBack ? (
                <div className="relative w-full h-full">
                    <CardBack />
                    {count !== undefined && <p className="absolute bottom-1 right-2 text-white font-bold text-lg" style={{ textShadow: '0 0 3px #000' }}>{count}</p>}
                </div>
            ) : (
                <div className={`relative w-full h-full ${onClick ? 'cursor-pointer' : ''}`}>
                    <Card card={card} view="simplified" />
                    {count !== undefined && count > 1 && <p className="absolute bottom-1 right-2 text-white font-bold text-lg" style={{ textShadow: '0 0 3px #000' }}>{count}</p>}
                </div>
            )}
        </div>
    );
};

const Board: React.FC<BoardProps> = ({
    isPlayer = false,
    deck,
    discard,
    extraDeck,
    banished,
    units,
    onCardHover,
    onUnitClick,
    onSlotClick
}) => {
    const discardTopCard = discard.length > 0 ? discard[discard.length - 1] : null;
    const exiledTopCard = banished.length > 0 ? banished[0] : null;
    const unitZones = Array(3).fill(null).map((_, i) => units[i] || null);

    const playerLayout = [
        { label: 'Exile', card: exiledTopCard, count: banished.length },
        { label: 'Extra Deck', showBack: true, count: extraDeck.length },
        ...unitZones.map((unit, i) => ({ label: 'Unit Zone', card: unit ? unit.card : null, isUnit: true, onClick: unit ? () => onUnitClick && onUnitClick(i) : () => onSlotClick && onSlotClick(i) })),
        { label: 'Deck', showBack: true, count: deck.length },
        { label: 'Discard', card: discardTopCard, count: discard.length }
    ];

    const opponentLayout = [
        { label: 'Discard', card: discardTopCard, count: discard.length },
        { label: 'Deck', showBack: true, count: deck.length },
        ...[...unitZones].reverse().map((unit, i) => ({ label: 'Unit Zone', card: unit ? unit.card : null, isUnit: true, onClick: unit ? () => onUnitClick && onUnitClick(i) : undefined })),
        { label: 'Extra Deck', showBack: true, count: extraDeck.length },
        { label: 'Exile', card: exiledTopCard, count: banished.length },
    ];

    const finalLayout = isPlayer ? playerLayout : opponentLayout;

    return (
        <div className="h-full w-full flex justify-center items-center gap-4 p-1">
            {finalLayout.map((zone, index) => (
                <Zone
                    key={index}
                    label={zone.label}
                    card={zone.card}
                    count={zone.count}
                    showBack={zone.showBack}
                    onCardHover={onCardHover}
                    onClick={zone.onClick}
                    isUnit={zone.isUnit}
                />
            ))}
        </div>
    );
};

export default Board;
