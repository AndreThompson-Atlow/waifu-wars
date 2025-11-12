import React from 'react';
import Card from '../components/ui/Card';
import { CARDS } from '../constants';
import { CardData } from '../types';

const CardDeveloperView: React.FC = () => {
    const cardsToShow: CardData[] = [
        CARDS.find(c => c.type === 'unit')!,
        CARDS.find(c => c.type === 'spell')!,
        CARDS.find(c => c.type === 'equipment')!,
    ];

    return (
        <div className="p-8 h-full flex flex-col bg-gray-900">
            <h1 className="text-4xl font-bold mb-2 border-b-2 border-sky-500 pb-2 flex-shrink-0">Card Developer Viewer</h1>
            <p className="mb-6 text-gray-400">This screen displays one example of each card type for UI development.</p>
            <div className="flex-grow overflow-y-auto flex justify-center items-center gap-8">
                {cardsToShow.map(card => (
                    <div 
                      key={card.id} 
                      className="w-80 h-[520px]"
                    >
                      <Card card={card} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CardDeveloperView;
