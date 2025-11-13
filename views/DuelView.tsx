
import React, { useState } from 'react';
import { CardData, DuelState, TurnPhase } from '../types';
import { TEST_CARDS } from '../constants';
import PlayerHand from './duel/PlayerHand';
import Board from './duel/Board';
import CardDetails from './duel/CardDetails';

interface DuelViewProps {
    duelState: DuelState;
    onEndDuel: () => void;
    onPlayCard: (cardId: string, slotIndex: number) => void;
    onAdvancePhase: () => void;
    onUnitAttack: (attackerIndex: number, targetIndex: number | null) => void;
}

const DuelView: React.FC<DuelViewProps> = ({ duelState, onEndDuel, onPlayCard, onAdvancePhase, onUnitAttack }) => {
    const [hoveredCard, setHoveredCard] = useState<CardData | null>(null);
    const [selectedCardId, setSelectedCardId] = useState<string | null>(null);
    const [selectingTarget, setSelectingTarget] = useState<number | null>(null); // Attacker's index

    const getCardData = (cardId: string | null): CardData | null => cardId ? TEST_CARDS[cardId] || null : null;

    const player = duelState.player;
    const opponent = duelState.opponent;

    const isPlayerTurn = duelState.activePlayerId === player.id;

    const playerHand = player.hand.map(getCardData) as CardData[];
    const opponentHand = Array(opponent.hand.length).fill(null);
    
    const playerBoardUnits = player.board.units.map(unit => unit ? { ...unit, card: getCardData(unit.cardId) } : null);
    const opponentBoardUnits = opponent.board.units.map(unit => unit ? { ...unit, card: getCardData(unit.cardId) } : null);

    const playerBoard = {
        deck: player.board.deck.map(getCardData) as CardData[],
        discard: player.board.discard.map(getCardData) as CardData[],
        extraDeck: player.board.extraDeck.map(getCardData) as CardData[],
        banished: player.board.banished.map(getCardData) as CardData[],
        units: playerBoardUnits as any, 
    };

    const opponentBoard = {
        deck: opponent.board.deck.map(getCardData) as CardData[],
        discard: opponent.board.discard.map(getCardData) as CardData[],
        extraDeck: opponent.board.extraDeck.map(getCardData) as CardData[],
        banished: opponent.board.banished.map(getCardData) as CardData[],
        units: opponentBoardUnits as any,
    };

    const handleCardClickInHand = (card: CardData) => {
        if (!isPlayerTurn || duelState.phase !== 'summon' || player.hasSummonedUnitThisTurn) return;
        setSelectedCardId(card.id);
    };

    const handleSlotClickOnBoard = (slotIndex: number) => {
        if (selectedCardId) {
            onPlayCard(selectedCardId, slotIndex);
            setSelectedCardId(null);
        }
    };

    const handleUnitClickOnPlayerBoard = (unitIndex: number) => {
        if (!isPlayerTurn || duelState.phase !== 'combat') return;
        const unit = player.board.units[unitIndex];
        if (unit && unit.canAttack) {
            const opponentHasUnits = opponent.board.units.some(u => u !== null);
            if (opponentHasUnits) {
                setSelectingTarget(unitIndex);
            } else {
                onUnitAttack(unitIndex, null);
            }
        }
    };

    const handleUnitClickOnOpponentBoard = (targetIndex: number) => {
        if (selectingTarget === null) return;
        onUnitAttack(selectingTarget, targetIndex);
        setSelectingTarget(null);
    };

    const handleCancelAttack = () => {
        setSelectingTarget(null);
    }

    const opponentUnitIndices = opponentBoardUnits.map((unit, index) => unit ? index : -1).filter(index => index !== -1);
    const highlightedIndices = selectingTarget !== null ? opponentUnitIndices : [];
    
    const getPhaseButtonText = (phase: TurnPhase) => {
        switch (phase) {
            case 'summon': return 'Enter Pre-Combat';
            case 'pre-combat': return 'Enter Combat';
            case 'combat': return 'End Turn';
            default: return '';
        }
    }

    return (
        <div className="h-full w-full relative bg-cover bg-center" style={{ backgroundImage: "url('./assets/ui/tabletop.png')" }}>
            {/* Game Zones */}
            <div className="absolute inset-0 flex flex-col p-4">
                <div className="h-[20%]">
                    <PlayerHand cards={opponentHand} isOpponent={true} onCardHover={setHoveredCard} />
                </div>
                <div className="h-[30%]">
                    <Board {...opponentBoard} onCardHover={setHoveredCard} onUnitClick={handleUnitClickOnOpponentBoard} highlightedUnitIndices={highlightedIndices}/>
                </div>
                <div className="h-[30%]">
                    <Board {...playerBoard} isPlayer={true} onCardHover={setHoveredCard} onSlotClick={handleSlotClickOnBoard} onUnitClick={handleUnitClickOnPlayerBoard} />
                </div>
                <div className="h-[20%]">
                    <PlayerHand cards={playerHand} onCardHover={setHoveredCard} onCardClick={handleCardClickInHand} />
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
                <div className="bg-black/50 p-2 rounded-lg text-white text-center">
                    <p className="font-bold">Turn {duelState.turn}</p>
                    <p>{isPlayerTurn ? 'Your Turn' : "Opponent's Turn"}</p>
                    <p className="uppercase font-bold text-yellow-300">{duelState.phase} Phase</p>
                </div>
                {isPlayerTurn && selectingTarget === null && ['summon', 'pre-combat', 'combat'].includes(duelState.phase) &&
                    <button onClick={onAdvancePhase} className="bg-green-700 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg">
                        {getPhaseButtonText(duelState.phase)}
                    </button>
                }
                 {isPlayerTurn && selectingTarget !== null &&
                    <button onClick={handleCancelAttack} className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg">Cancel Attack</button>
                }
                <button onClick={onEndDuel} className="bg-red-700 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg">Concede</button>
            </div>

            <div onMouseLeave={() => setHoveredCard(null)} className="absolute top-4 left-2 z-10">
                <CardDetails card={hoveredCard} />
            </div>
        </div>
    );
};

export default DuelView;
