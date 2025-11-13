
import React from 'react';
import { DuelPlayerState } from '../../types';
import Card from '../../components/ui/Card';
import CardBack from '../../components/ui/CardBack';

interface PlayerBoardProps {
    playerState: DuelPlayerState;
    isOpponent: boolean;
}

const Zone: React.FC<{ children?: React.ReactNode; label: string; count?: number; hasCard?: boolean; }> = ({ children, label, count, hasCard }) => (
    <div className="relative aspect-square md:aspect-video h-full flex flex-col items-center justify-center">
        {!hasCard ? (
             <div className="w-full h-full bg-black/30 border-2 border-dashed border-gray-500 rounded-lg flex items-center justify-center">
                <p className="text-white font-bold text-sm uppercase" style={{ textShadow: '0 0 3px #000, 0 0 3px #000' }}>{label}</p>
                {count !== undefined && <p className="absolute bottom-1 right-1 text-white font-bold text-lg">{count}</p>}
            </div>
        ) : children}
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
                    
                    <div className="flex flex-col justify-around gap-4">
                        <Zone label="Extra Deck" hasCard={playerState.board.extra.length > 0} count={playerState.board.extra.length}>
                            {playerState.board.extra.length > 0 && <CardBack />}
                        </Zone>
                        <Zone label="Exile" hasCard={!!playerState.board.exile[0]} count={playerState.board.exile.length}>
                            <Card card={playerState.board.exile[0] || null} view='simplified'/>
                        </Zone>
                    </div>

                    <div className="col-span-3 grid grid-cols-3 gap-4">
                        {playerState.board.units.map((unit, i) => 
                            <Zone key={i} label={`Unit Zone`} hasCard={!!unit}>
                                <Card card={unit} view='simplified' />
                            </Zone>
                        )}
                    </div>

                    <div className="col-start-5 flex flex-col justify-around gap-4">
                        <Zone label="Deck" hasCard={playerState.board.deck.length > 0} count={playerState.board.deck.length}>
                           {playerState.board.deck.length > 0 && <CardBack />}
                        </Zone>
                        <Zone label="Discard" hasCard={!!playerState.board.discard[0]} count={playerState.board.discard.length}>
                            <Card card={playerState.board.discard[0] || null} view='simplified' />
                        </Zone>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlayerBoard;
