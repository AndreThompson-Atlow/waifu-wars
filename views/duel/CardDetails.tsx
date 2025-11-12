
import React from 'react';
import { CardData } from '../../types';
import Card from '../../components/ui/Card';

interface CardDetailsProps {
    card: CardData | null;
}

const CardDetails: React.FC<CardDetailsProps> = ({ card }) => {
    return (
        <div className="w-64 aspect-[2/3]">
            <Card card={card} />
        </div>
    );
};

export default CardDetails;
