
import React from 'react';
import { DuelState } from '../types';
import PlayerBoard from './duel/PlayerBoard';
import PlayerHand from './duel/PlayerHand';

interface DuelViewProps {
    duelState: DuelState;
    onEndDuel: () => void;
}

const DuelView: React.FC<DuelViewProps> = ({ duelState, onEndDuel }) => {
    return (
        <div className="h-full w-full flex flex-col bg-cover bg-center p-4 gap-4" style={{ backgroundImage: "url('./assets/ui/duel_background.jpg')" }}>
            {/* Opponent's Side */}
            <PlayerBoard playerState={duelState.opponent} isOpponent={true} />

            {/* Dialogue/Middle area */}
            <div className="flex justify-center items-center h-16">
                 <div className="bg-black/50 backdrop-blur-sm text-center px-6 py-2 rounded-lg border border-gray-600">
                    <p className="italic text-gray-300">Kaito: My turn! I draw!</p>
                </div>
                 <button onClick={onEndDuel} className="absolute right-4 bg-red-700 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg">End Duel (Debug)</button>
            </div>

            {/* Player's Side */}
            <PlayerBoard playerState={duelState.player} isOpponent={false} />

            {/* Player's Hand */}
            <PlayerHand cards={duelState.player.hand} />
        </div>
    );
};

export default DuelView;
