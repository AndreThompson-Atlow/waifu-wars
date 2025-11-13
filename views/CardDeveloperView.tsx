
import React from 'react';
import Card from '../components/ui/Card';
import { TEST_CARDS } from '../constants/index';
import { CardData } from '../types';

const CardDeveloperView: React.FC = () => {
    const cardsToShow: CardData[] = [
        Object.values(TEST_CARDS).find(c => c.type === 'unit')!,
        Object.values(TEST_CARDS).find(c => c.type === 'spell')!,
        Object.values(TEST_CARDS).find(c => c.type === 'equipment')!,
    ];

    return (
        <div className="p-8 h-full flex flex-col flex-grow bg-gray-900">
            <h1 className="text-4xl font-bold mb-6 border-b-2 border-indigo-500 pb-2 flex-shrink-0 text-white">Card Style Guide</h1>
            <div className="flex-grow overflow-y-auto grid grid-cols-1 md:grid-cols-3 gap-8 pr-2">
                {cardsToShow.map(card => card && (
                    <div key={card.id}>
                        <h2 className="text-2xl font-bold text-center mb-2 capitalize text-white">{card.type} Card</h2>
                        <div className="aspect-[2/3] max-w-xs mx-auto">
                            <Card card={card} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CardDeveloperView;
