
import React from 'react';
import { View } from '../types';

interface DebugViewProps {
    onNavigate: (view: View) => void;
    onStartDebugDuel: () => void;
}

const DebugView: React.FC<DebugViewProps> = ({ onNavigate, onStartDebugDuel }) => {
    return (
        <div className="p-8 h-full flex flex-col items-center justify-center bg-gray-900">
            <h1 className="text-5xl font-black mb-8 text-yellow-400">UI Debug Menu</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl">
                <button 
                    onClick={onStartDebugDuel}
                    className="bg-red-600 hover:bg-red-500 text-white font-bold py-4 px-6 rounded-lg transition-colors shadow-lg text-xl"
                >
                    Duel Screen
                </button>
                <button 
                    onClick={() => onNavigate('cardDeveloperView')}
                    className="bg-sky-600 hover:bg-sky-500 text-white font-bold py-4 px-6 rounded-lg transition-colors shadow-lg text-xl"
                >
                    Card Viewer
                </button>
            </div>
        </div>
    );
};

export default DebugView;
