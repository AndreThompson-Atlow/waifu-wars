
import React from 'react';
import { DuelPlayerState } from '../../types';
import Card from '../../components/ui/Card';

interface PlayerBoardProps {
    playerState: DuelPlayerState;
    isOpponent: boolean;
}

const Zone: React.FC<{ children?: React.ReactNode; label: string; isOpponent: boolean }> = ({ children, label, isOpponent }) => (
    <div className="relative aspect-square md:aspect-video flex flex-col items-center justify-center">
        <div className="w-full h-full">{children}</div>
        <p className={`absolute -bottom-5 text-xs font-semibold text-white/70 ${isOpponent ? 'hidden' : ''}`}>{label}</p>
    </div>
);

const PlayerBoard: React.FC<PlayerBoardProps> = ({ playerState, isOpponent }) => {
    const orderClass = isOpponent ? 'flex-col-reverse' : 'flex-col';

    return (
        <div className={`flex-1 flex gap-4 ${isOpponent ? 'flex-row-reverse' : 'flex-row'}`}>
            {/* Avatar and Stats */}
            <div className={`flex ${orderClass} items-center justify-center w-32 bg-black/30 p-2 rounded-lg`}>
                <img src={playerState.avatarUrl} alt={playerState.name} className="w-20 h-20 rounded-full border-4 border-red-500"/>
                <div className="text-center">
                    <h3 className="font-bold text-sm truncate">{playerState.name}</h3>
                    <p className="text-lg font-black text-red-400">{playerState.hp}</p>
                </div>
            </div>

            {/* Playmat */}
            <div className="flex-1 bg-pink-800/50 rounded-2xl p-4 border-2 border-pink-500/80 shadow-2xl">
                <div className="grid grid-cols-5 gap-4 h-full">
                    
                    {/* Left side slots */}
                    <div className="flex flex-col justify-center gap-4">
                        <Zone label="Extra" isOpponent={isOpponent}><div className="w-full h-full bg-blue-900/70 border-2 border-dashed border-blue-400 rounded-lg" /></Zone>
                    </div>

                    {/* Center Unit Slots */}
                    <div className="col-span-3 grid grid-cols-3 gap-4">
                        {playerState.board.units.map((unit, i) => <Zone key={i} label={`Unit ${i+1}`} isOpponent={isOpponent}><Card card={unit} /></Zone>)}
                    </div>

                    {/* Right side slots */}
                    <div className="col-start-5 flex flex-col gap-4">
                        <Zone label="Deck" isOpponent={isOpponent}><div className="w-full h-full bg-green-900/70 border-2 border-dashed border-green-400 rounded-lg flex items-center justify-center text-xl font-bold">{playerState.board.deck.length}</div></Zone>
                        <Zone label="Discard" isOpponent={isOpponent}><Card card={playerState.board.discard[0] || null} /></Zone>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlayerBoard;
