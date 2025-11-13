
import React, { useState } from 'react';
import { CardData, DuelState } from '../types';
import { CARDS } from '../constants';
import PlayerHand from './duel/PlayerHand';
import Board from './duel/Board';
import CardDetails from './duel/CardDetails';

interface DuelViewProps {
    duelState: DuelState;
    onEndDuel: () => void;
}

const DuelView: React.FC<DuelViewProps> = ({ duelState, onEndDuel }) => {
    const [hoveredCard, setHoveredCard] = useState<CardData | null>(null);

    const adventurerCard = CARDS.find(c => c.id === 'card_unit_example');
    const fireballCard = CARDS.find(c => c.id === 'card_spell_example');
    const armorCard = CARDS.find(c => c.id === 'card_equipment_example');

    const playerHand = [adventurerCard, fireballCard, armorCard].filter(Boolean) as CardData[];
    const opponentHand = [null, null, null];

    const playerBoard = {
        deck: [armorCard].filter(Boolean) as CardData[],
        discard: [fireballCard].filter(Boolean) as CardData[],
        extraDeck: [] as CardData[],
        banished: [] as CardData[],
        units: [adventurerCard, null, null] as (CardData | null) [],
    };

    const opponentBoard = {
        deck: [armorCard].filter(Boolean) as CardData[],
        discard: [] as CardData[],
        extraDeck: [] as CardData[],
        banished: [armorCard].filter(Boolean) as CardData[],
        units: [null, adventurerCard, null] as (CardData | null) [],
    };

    return (
        <div className="h-full w-full relative bg-cover bg-center" style={{ backgroundImage: "url('./assets/ui/tabletop.png')" }}>
            {/* Game Zones */}
            <div className="absolute inset-0 flex flex-col p-4">
                <div className="h-[20%]">
                    <PlayerHand cards={opponentHand} isOpponent={true} onCardHover={setHoveredCard} />
                </div>
                <div className="h-[30%]">
                    <Board {...opponentBoard} onCardHover={setHoveredCard} />
                </div>
                <div className="h-[30%]">
                    <Board {...playerBoard} isPlayer={true} onCardHover={setHoveredCard} />
                </div>
                <div className="h-[20%]">
                    <PlayerHand cards={playerHand} onCardHover={setHoveredCard} />
                </div>
            </div>

            {/* UI Overlays */}
            <div className="absolute top-4 right-4 z-10">
                <div className="flex flex-col-reverse items-center justify-center w-40 bg-black/30 p-2 rounded-lg">
                    <img src="./assets/duelists/player_avatar_2.png" alt={duelState.opponent.name} className="w-24 h-24 rounded-full border-4 border-red-500"/>
                    <div className="text-center">
                        <h3 className="font-bold text-lg">{duelState.opponent.name}</h3>
                        <p className="text-xl font-black text-red-400">{duelState.opponent.hp}</p>
                    </div>
                </div>
            </div>

            <div className="absolute bottom-4 left-4 z-10">
                <div className="flex flex-col items-center justify-center w-40 bg-black/30 p-2 rounded-lg">
                    <img src="./assets/duelists/player_avatar_1.png" alt={duelState.player.name} className="w-24 h-24 rounded-full border-4 border-blue-500"/>
                    <div className="text-center">
                        <h3 className="font-bold text-lg">{duelState.player.name}</h3>
                        <p className="text-xl font-black text-green-400">{duelState.player.hp}</p>
                    </div>
                </div>
            </div>
            
            <div className="absolute bottom-4 right-4 flex flex-col items-end gap-2 z-20">
                <button className="bg-blue-700 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg">End Turn</button>
                <button onClick={onEndDuel} className="bg-red-700 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg">Concede</button>
            </div>
            
            <div onMouseLeave={() => setHoveredCard(null)} className="absolute top-4 left-2 z-10">
                <CardDetails card={hoveredCard} />
            </div>
        </div>
    );
};

export default DuelView;
