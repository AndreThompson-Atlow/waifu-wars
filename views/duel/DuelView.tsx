
import React, { useState } from 'react';
import { DuelState, CardData } from '../../types';
import Board from './Board';
import PlayerHand from './PlayerHand';

import CardDetails from './CardDetails';
import { gameManager } from '../../managers/GameManager';
import { BoardUnit } from '../../types';

interface DuelViewProps {
    initialDuelState: DuelState;
    onDuelEnd: (result: 'win' | 'lose') => void;
}

const DuelView: React.FC<DuelViewProps> = ({ initialDuelState, onDuelEnd }) => {
    const [duel, setDuel] = useState<DuelState>(initialDuelState);
    const [hoveredCard, setHoveredCard] = useState<CardData | null>(null);
    const [selectedUnitIndex, setSelectedUnitIndex] = useState<number | null>(null);

    const player = duel.player;
    const opponent = duel.opponent;

    const handleCardHover = (cardId: string | null) => {
        if (cardId) {
            const cardData = gameManager.getCardData(cardId);
            setHoveredCard(cardData);
        } else {
            setHoveredCard(null);
        }
    };

    const handleHandCardClick = (cardId: string) => {
        if (duel.activePlayerId !== player.id) return;
        const card = gameManager.getCardData(cardId);
        if (!card) return;

        if (card.type === 'unit') {
            if (duel.phase === 'summon' && !player.hasSummonedUnitThisTurn) {
                // For simplicity, auto-play to the first available slot
                const availableSlot = player.board.units.findIndex(u => u === null);
                if (availableSlot !== -1) {
                    const newDuelState = gameManager.playCard(duel, player.id, cardId, availableSlot);
                    setDuel(newDuelState);
                }
            }
        } else {
            if (duel.phase === 'pre-combat') {
                const newDuelState = gameManager.playCard(duel, player.id, cardId, -1);
                setDuel(newDuelState);
            }
        }
    };

    const handleUnitClick = (index: number) => {
        if (duel.activePlayerId !== player.id || duel.phase !== 'combat') return;
        const unit = player.board.units[index];
        if (unit && unit.canAttack) {
            setSelectedUnitIndex(index);
        }
    };

    const handleSlotClick = (index: number) => {
        if (selectedUnitIndex !== null) {
            const newDuelState = gameManager.attack(duel, player.id, selectedUnitIndex, index);
            setDuel(newDuelState);
            setSelectedUnitIndex(null);
        }
    };

    const handlePlayerAttack = () => {
        if (selectedUnitIndex !== null) {
            const newDuelState = gameManager.attack(duel, player.id, selectedUnitIndex, null);
            setDuel(newDuelState);
            setSelectedUnitIndex(null);
        }
    };

    const advancePhase = () => {
        const newDuelState = gameManager.advancePhase(duel);
        setDuel(newDuelState);
    }

    const mapBoardUnits = (units: (any | null)[]): (BoardUnit | null)[] => {
        return units.map(unit => {
            if (!unit) return null;
            const card = gameManager.getCardData(unit.cardId);
            if (!card) return null;
            return {
                card: card,
                canAttack: unit.canAttack
            };
        });
    };

    const getHighlightedUnitIndices = () => {
        if (duel.activePlayerId === player.id && duel.phase === 'combat') {
            return player.board.units.map((u, i) => u && u.canAttack ? i : -1).filter(i => i !== -1);
        }
        if (duel.activePlayerId === opponent.id && duel.phase === 'combat') {
            return opponent.board.units.map((u, i) => u && u.canAttack ? i : -1).filter(i => i !== -1);
        }
        return [];
    }

    const canAttack = gameManager.canPlayerAttack(duel, duel.player.id);

    return (
        <div className="w-full h-screen bg-gray-800 flex flex-col justify-between items-center p-4 font-sans text-white relative">
            <div className="absolute top-4 right-4 z-10">
                <PlayerInfo player={opponent} />
            </div>

            <Board
                isPlayer={false}
                deck={opponent.board.deck.map(id => gameManager.getCardData(id))}
                discard={opponent.board.discard.map(id => gameManager.getCardData(id))}
                extraDeck={opponent.board.extraDeck.map(id => gameManager.getCardData(id))}
                banished={opponent.board.banished.map(id => gameManager.getCardData(id))}
                units={mapBoardUnits(opponent.board.units)}
                onCardHover={(card) => handleCardHover(card ? card.id : null)}
                highlightedUnitIndices={getHighlightedUnitIndices()}
            />

            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center">
                <PhaseIndicator phase={duel.phase} turn={duel.turn} />
                {duel.activePlayerId === player.id && (
                    <div className="mt-2">
                        {duel.phase === 'dawn' && <button onClick={advancePhase} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">Begin Turn</button>}
                        {duel.phase === 'summon' && <button onClick={advancePhase} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">End Summon</button>}
                        {duel.phase === 'pre-combat' && (
                            <button 
                                onClick={advancePhase} 
                                className={`px-4 py-2 text-white rounded ${canAttack ? 'bg-red-500 hover:bg-red-700' : 'bg-gray-500 hover:bg-gray-700'}`}>
                                {canAttack ? 'Enter Combat' : 'End Turn'}
                            </button>
                        )}
                        {duel.phase === 'combat' && <button onClick={advancePhase} className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700">End Combat</button>}
                    </div>
                )}
            </div>

            <Board
                isPlayer={true}
                deck={player.board.deck.map(id => gameManager.getCardData(id))}
                discard={player.board.discard.map(id => gameManager.getCardData(id))}
                extraDeck={player.board.extraDeck.map(id => gameManager.getCardData(id))}
                banished={player.board.banished.map(id => gameManager.getCardData(id))}
                units={mapBoardUnits(player.board.units)}
                onCardHover={(card) => handleCardHover(card ? card.id : null)}
                onUnitClick={handleUnitClick}
                onSlotClick={handleSlotClick}
                highlightedUnitIndices={getHighlightedUnitIndices()}
            />

            <div className="absolute bottom-4 left-4 z-10">
                <PlayerInfo player={player} onAvatarClick={handlePlayerAttack} />
            </div>

            <div className="absolute bottom-24 left-1/2 -translate-x-1/2">
                <PlayerHand 
                    cards={player.hand.map(id => gameManager.getCardData(id)!)} 
                    onCardHover={(card) => handleCardHover(card ? card.id : null)}
                    onCardClick={(card) => handleHandCardClick(card.id)}
                />
            </div>

            {hoveredCard &&
                <div className="absolute left-4 top-1/2 -translate-y-1/2 z-30">
                    <CardDetails card={hoveredCard} />
                </div>
            }
        </div>
    );
};

export default DuelView;
