
import React from 'react';
import { CardData } from '../../types';
import Card from '../../components/ui/Card';

interface CardDetailsProps {
    card: CardData | null;
}

const CardDetails: React.FC<CardDetailsProps> = ({ card }) => {
    if (!card) {
        return null;
    }

    return (
        <div className="w-64 h-[448px]">
            <Card card={card} view="full" />
        </div>
    );
};

export default CardDetails;
