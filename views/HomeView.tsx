
import React from 'react';
import { Location, View } from '../types';

interface HomeViewProps {
    location: Location;
    onNavigate: (view: View) => void;
}

const HomeView: React.FC<HomeViewProps> = ({ location, onNavigate }) => {
    return (
        <div className="h-full bg-cover bg-center" style={{ backgroundImage: `url(${location.backgroundImageUrl})` }}>
            <div className="h-full bg-black/60 backdrop-blur-sm p-8 flex items-center justify-center">
                <div className="flex flex-col items-center gap-4 text-center">
                    <h1 className="text-5xl font-black text-white" style={{ textShadow: '2px 2px 4px #000000' }}>Your Room</h1>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                         <button onClick={() => onNavigate('collection')} className="bg-purple-600 hover:bg-purple-500 text-white font-bold py-3 px-6 rounded-lg transition-colors shadow-lg">View Collection</button>
                         <button onClick={() => onNavigate('deckSelection')} className="bg-teal-600 hover:bg-teal-500 text-white font-bold py-3 px-6 rounded-lg transition-colors shadow-lg">Build Decks</button>
                         <button onClick={() => alert('Customize Room not implemented yet.')} className="bg-orange-600 hover:bg-orange-500 text-white font-bold py-3 px-6 rounded-lg transition-colors shadow-lg">Customize Room</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomeView;