
import React from 'react';
import { CardData } from '../../types';
import Card from '../../components/ui/Card';
import CardBack from '../../components/ui/CardBack';

interface CardDetailsProps {
    card: CardData | null;
}

const CardDetails: React.FC<CardDetailsProps> = ({ card }) => {
    return (
        <div className="w-64 aspect-[2/3]">
            {card ? <Card card={card} view='full' /> : <CardBack />}
        </div>
    );
};

export default CardDetails;
