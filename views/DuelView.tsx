
import React from 'react';
import { DuelState } from '../types';

interface DuelViewProps {
    duelState: DuelState;
    onEndDuel: () => void;
}

const DuelView: React.FC<DuelViewProps> = ({ duelState, onEndDuel }) => {
    return (
        <div className="h-full w-full flex flex-col bg-cover bg-center p-4 gap-4" style={{ backgroundImage: "url('./assets/ui/tabletop.png')" }}>
           <button onClick={onEndDuel} className="absolute right-4 bg-red-700 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg">End Duel (Debug)</button>
        </div>
    );
};

export default DuelView;
