
import React from 'react';
import { CARDS } from '../constants';
import Card from '../components/ui/Card';
import { CardData } from '../types';

const CardDeveloperView: React.FC = () => {
    const cardIdsToShow = ['card_unit_example', 'card_spell_example', 'card_equipment_example'];
    const cardsToShow = cardIdsToShow.map(id => CARDS.find(c => c.id === id)).filter(Boolean) as CardData[];

    return (
        <div className="p-8 h-full flex flex-col bg-gray-900">
            <h1 className="text-4xl font-bold mb-2 border-b-2 border-sky-500 pb-2 flex-shrink-0">Card Developer Viewer</h1>
            <p className="mb-6 text-gray-400">This screen displays one example of each card type for UI development.</p>
            <div className="flex-grow overflow-y-auto flex justify-center items-center gap-8">
                {cardsToShow.map(card => (
                    <div 
                      key={card.id} 
                      className="w-64 h-96"
                    >
                      <Card card={card} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CardDeveloperView;
