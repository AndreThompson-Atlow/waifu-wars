
import React, { useState } from 'react';
import { Location, NPC } from '../types';
import Modal from '../components/ui/Modal';

interface LocationViewProps {
    location: Location;
    people: NPC[];
    onStartDuel: (opponent: NPC) => void;
}

const LocationView: React.FC<LocationViewProps> = ({ location, people, onStartDuel }) => {
    const [selectedNpc, setSelectedNpc] = useState<NPC | null>(null);

    const handleNpcInteraction = (action: 'talk' | 'trade' | 'duel') => {
        if (!selectedNpc) return;
        if (action === 'duel') {
            onStartDuel(selectedNpc);
        } else {
            alert(`${action} with ${selectedNpc.name} is not implemented yet.`);
        }
        setSelectedNpc(null);
    };

    return (
        <div className="h-full bg-cover bg-center" style={{ backgroundImage: `url(${location.backgroundImageUrl})` }}>
            <div className="h-full bg-black/60 backdrop-blur-sm p-8 flex flex-col md:flex-row justify-between gap-8">
                <div className="w-full md:w-1/4">
                    <div className="bg-gray-800/80 p-4 rounded-lg">
                        <h2 className="text-2xl font-bold border-b border-gray-600 pb-2 mb-4">People Here</h2>
                        {people.length > 0 ? (
                            <ul className="space-y-2">
                                {people.map(person => (
                                    <li key={person.id} onClick={() => setSelectedNpc(person)} className="flex items-center gap-4 p-2 bg-gray-700/50 hover:bg-gray-600/50 rounded-md cursor-pointer transition-colors">
                                        <img src={person.avatarUrl} alt={person.name} className="w-12 h-12 rounded-full border-2 border-cyan-400" />
                                        <span className="font-semibold">{person.name}</span>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-gray-400">No one is around.</p>
                        )}
                    </div>
                </div>
                <div className="w-full md:w-1/4">
                     <div className="bg-gray-800/80 p-4 rounded-lg">
                        <h2 className="text-2xl font-bold border-b border-gray-600 pb-2 mb-4">Events</h2>
                         <p className="text-gray-400">No events currently.</p>
                     </div>
                </div>

                <Modal isOpen={!!selectedNpc} onClose={() => setSelectedNpc(null)} title={`Interact with ${selectedNpc?.name}`}>
                    <div className="flex flex-col space-y-3">
                        <button onClick={() => handleNpcInteraction('talk')} className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded transition-colors">Talk</button>
                        <button onClick={() => handleNpcInteraction('trade')} className="w-full bg-green-600 hover:bg-green-500 text-white font-bold py-2 px-4 rounded transition-colors">Trade</button>
                        <button onClick={() => handleNpcInteraction('duel')} className="w-full bg-red-600 hover:bg-red-500 text-white font-bold py-2 px-4 rounded transition-colors">Duel</button>
                    </div>
                </Modal>
            </div>
        </div>
    );
};

export default LocationView;