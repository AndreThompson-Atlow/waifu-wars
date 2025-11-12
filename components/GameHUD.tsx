
import React from 'react';
import { TimeState, View, LocationId } from '../types';
import { ClockIcon, CalendarIcon, MapPinIcon } from './icons/Icons';

interface GameHUDProps {
    time: TimeState;
    locationName: string;
    onAdvanceTime: () => void;
    onNavigate: (view: View) => void;
    onTravel: (locationId: LocationId) => void;
    onStartDebugDuel: () => void;
}

const GameHUD: React.FC<GameHUDProps> = ({ time, locationName, onAdvanceTime, onNavigate, onTravel, onStartDebugDuel }) => {

    return (
        <header className="bg-gray-800/80 backdrop-blur-sm p-2 flex justify-between items-center sticky top-0 z-50 shadow-lg">
            <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1 bg-gray-700/50 px-3 py-1.5 rounded-md">
                    <MapPinIcon className="w-4 h-4 text-cyan-400" />
                    <span>{locationName}</span>
                </div>
                <div className="flex items-center gap-1 bg-gray-700/50 px-3 py-1.5 rounded-md">
                    <CalendarIcon className="w-4 h-4 text-amber-400" />
                    <span>{time.day}</span>
                </div>
                <div className="flex items-center gap-1 bg-gray-700/50 px-3 py-1.5 rounded-md">
                    <ClockIcon className="w-4 h-4 text-purple-400" />
                    <span>{time.slot}</span>
                </div>
            </div>
            <div className="flex items-center gap-2">
                 <button onClick={onStartDebugDuel} className="bg-red-600 hover:bg-red-500 text-white font-bold py-2 px-4 rounded-md transition-colors duration-200 text-sm">Duel Screen</button>
                 <button onClick={() => onNavigate('cardDeveloperView')} className="bg-sky-600 hover:bg-sky-500 text-white font-bold py-2 px-4 rounded-md transition-colors duration-200 text-sm">Card Viewer</button>
                 <button onClick={() => onTravel('home')} className="bg-slate-600 hover:bg-slate-500 text-white font-bold py-2 px-4 rounded-md transition-colors duration-200 text-sm">Home</button>
                 <button onClick={() => onNavigate('districtSelection')} className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2 px-4 rounded-md transition-colors duration-200 text-sm">Explore</button>
                 <button onClick={() => onTravel('shop')} className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2 px-4 rounded-md transition-colors duration-200 text-sm">Shop</button>
                 <button onClick={onAdvanceTime} className="bg-rose-600 hover:bg-rose-500 text-white font-bold py-2 px-4 rounded-md transition-colors duration-200 text-sm">Pass Time</button>
            </div>
        </header>
    );
};

export default GameHUD;
