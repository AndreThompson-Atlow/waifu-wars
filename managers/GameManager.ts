import { DuelState, PlayerState, UnitInstance, TurnPhase, CardData, DuelPlayerState } from '../types';
import { NPCS, TEST_CARDS } from '../constants/index';
import { aiManager } from './AIManager';

class GameManager {
    private shuffle(deck: string[]): string[] {
        const shuffledDeck = [...deck];
        for (let i = shuffledDeck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledDeck[i], shuffledDeck[j]] = [shuffledDeck[j], shuffledDeck[i]];
        }
        return shuffledDeck;
    }

    createDuel(playerState: PlayerState, opponentId: string): DuelState {
        const opponentNPC = NPCS[opponentId];
        const playerDeck = this.shuffle(playerState.decks[0].cards);
        const opponentDeck = this.shuffle(opponentNPC.deck);

        let initialState: DuelState = {
            player: {
                id: playerState.id,
                name: playerState.name,
                avatarUrl: playerState.avatarUrl,
                hp: 10,
                hand: [],
                board: { deck: playerDeck, discard: [], extraDeck: [], banished: [], units: [null, null, null] },
                hasSummonedUnitThisTurn: false,
            },
            opponent: {
                id: opponentNPC.id,
                name: opponentNPC.name,
                avatarUrl: opponentNPC.avatarUrl,
                hp: 10,
                hand: [],
                board: { deck: opponentDeck, discard: [], extraDeck: [], banished: [], units: [null, null, null] },
                hasSummonedUnitThisTurn: false,
            },
            turn: 1,
            phase: 'dawn',
            activePlayerId: playerState.id,
        };

        for (let i = 0; i < 3; i++) {
            initialState = this.drawCard(initialState, playerState.id);
            initialState = this.drawCard(initialState, opponentId);
        }

        return this.dawn(initialState);
    }

    private getPlayer(duelState: DuelState, playerId: string): DuelPlayerState {
        return duelState.player.id === playerId ? duelState.player : duelState.opponent;
    }

    getCardData(cardId: string): CardData | null {
        return TEST_CARDS[cardId] || null;
    }

    private updatePlayerState(duelState: DuelState, playerId: string, newPlayerState: DuelPlayerState): DuelState {
        if (duelState.player.id === playerId) {
            return { ...duelState, player: newPlayerState };
        } else {
            return { ...duelState, opponent: newPlayerState };
        }
    }

    drawCard(duelState: DuelState, playerId: string): DuelState {
        const player = this.getPlayer(duelState, playerId);
        if (player.hand.length >= 4 || player.board.deck.length === 0) {
            return duelState;
        }

        const newDeck = [...player.board.deck];
        const drawnCard = newDeck.shift()!;
        const newHand = [...player.hand, drawnCard];
        const newBoard = { ...player.board, deck: newDeck };
        const newPlayer = { ...player, hand: newHand, board: newBoard };

        return this.updatePlayerState(duelState, playerId, newPlayer);
    }

    playCard(duelState: DuelState, playerId: string, cardId: string, slotIndex: number): DuelState {
        const player = this.getPlayer(duelState, playerId);
        const cardData = this.getCardData(cardId);
        if (!cardData) return duelState;

        const cardInHandIndex = player.hand.indexOf(cardId);
        if (cardInHandIndex === -1 || player.board.units[slotIndex] !== null) return duelState;

        let newPlayerState: DuelPlayerState;

        if (cardData.type === 'unit') {
            if (duelState.phase !== 'summon' || player.hasSummonedUnitThisTurn) return duelState;
            
            const newHand = player.hand.filter((c, i) => i !== cardInHandIndex);
            const newUnits = [...player.board.units];
            newUnits[slotIndex] = { cardId, currentShield: cardData.shield!, canAttack: true };
            const newBoard = { ...player.board, units: newUnits };
            newPlayerState = { ...player, hand: newHand, board: newBoard, hasSummonedUnitThisTurn: true };

        } else if (cardData.type === 'spell' || cardData.type === 'equipment') {
            if (duelState.phase !== 'pre-combat') return duelState;

            const newHand = player.hand.filter((c, i) => i !== cardInHandIndex);
            const newDiscard = [...player.board.discard, cardId];
            const newBoard = { ...player.board, discard: newDiscard };
            newPlayerState = { ...player, hand: newHand, board: newBoard };

        } else {
            return duelState;
        }
        
        return this.updatePlayerState(duelState, playerId, newPlayerState);
    }

    attack(duelState: DuelState, attackerId: string, attackerSlotIndex: number, targetSlotIndex: number | null): DuelState {
        if (duelState.phase !== 'combat' || duelState.turn === 1) return duelState;

        const attackerPlayer = this.getPlayer(duelState, attackerId);
        const opponentPlayer = attackerId === duelState.player.id ? duelState.opponent : duelState.player;
        const attackerUnit = attackerPlayer.board.units[attackerSlotIndex];

        if (!attackerUnit || !attackerUnit.canAttack) return duelState;

        let newAttackerPlayerState = { ...attackerPlayer };
        let newOpponentPlayerState = { ...opponentPlayer };
        let newAttackerUnit = { ...attackerUnit, canAttack: false };

        if (targetSlotIndex === null) {
            if (opponentPlayer.board.units.some(u => u !== null)) return duelState;
            const attackerCardData = this.getCardData(attackerUnit.cardId)!;
            newOpponentPlayerState = { ...newOpponentPlayerState, hp: newOpponentPlayerState.hp - attackerCardData.critical! };
        } else {
            const targetUnit = opponentPlayer.board.units[targetSlotIndex];
            if (!targetUnit) return duelState;

            const attackerCardData = this.getCardData(attackerUnit.cardId)!;
            const targetCardData = this.getCardData(targetUnit.cardId)!;
            let newTargetUnit = { ...targetUnit };

            if (attackerCardData.power! > targetCardData.power!) {
                newTargetUnit.currentShield -= attackerCardData.critical!;
            } else if (targetCardData.power! > attackerCardData.power!) {
                newAttackerUnit.currentShield -= targetCardData.critical!;
            } else {
                newTargetUnit.currentShield -= attackerCardData.critical!;
                newAttackerUnit.currentShield -= targetCardData.critical!;
            }
            
            const newOpponentUnits = [...newOpponentPlayerState.board.units];
            const newOpponentDiscard = [...newOpponentPlayerState.board.discard];
            if (newTargetUnit.currentShield <= 0) {
                newOpponentDiscard.push(newTargetUnit.cardId);
                newOpponentUnits[targetSlotIndex] = null;
            }
            newOpponentPlayerState = { ...newOpponentPlayerState, board: { ...newOpponentPlayerState.board, units: newOpponentUnits, discard: newOpponentDiscard } };
        }

        const newAttackerUnits = [...newAttackerPlayerState.board.units];
        const newAttackerDiscard = [...newAttackerPlayerState.board.discard];
        if (newAttackerUnit.currentShield <= 0) {
            newAttackerDiscard.push(newAttackerUnit.cardId);
            newAttackerUnits[attackerSlotIndex] = null;
        } else {
            newAttackerUnits[attackerSlotIndex] = newAttackerUnit;
        }
        newAttackerPlayerState = { ...newAttackerPlayerState, board: { ...newAttackerPlayerState.board, units: newAttackerUnits, discard: newAttackerDiscard } };

        const newDuelState = this.updatePlayerState(duelState, attackerId, newAttackerPlayerState);
        return this.updatePlayerState(newDuelState, opponentPlayer.id, newOpponentPlayerState);
    }

    canPlayerAttack(duelState: DuelState, playerId: string): boolean {
        const player = this.getPlayer(duelState, playerId);
    
        if (duelState.turn === 1) {
            return false;
        }
    
        // The player can attack if and only if at least one of their units can attack.
        // This single check correctly implies that they have units.
        return player.board.units.some(u => u && u.canAttack);
    }

    advancePhase(duelState: DuelState): DuelState {
        const activePlayerId = duelState.activePlayerId;
        let newPhase: TurnPhase;

        switch (duelState.phase) {
            case 'dawn':
                newPhase = 'summon';
                break;
            case 'summon':
                newPhase = 'pre-combat';
                break;
            case 'pre-combat':
                if (!this.canPlayerAttack(duelState, activePlayerId)) {
                    newPhase = 'dusk';
                    return this.dusk({ ...duelState, phase: newPhase });
                }
                newPhase = 'combat';
                break;
            case 'combat':
                newPhase = 'dusk';
                return this.dusk({ ...duelState, phase: newPhase });
            default:
                return duelState;
        }

        const newState = { ...duelState, phase: newPhase };

        if (activePlayerId === newState.opponent.id) {
            return aiManager.takeTurn(newState);
        }

        return newState;
    }
    
    private dawn(duelState: DuelState): DuelState {
        const newState = this.drawCard(duelState, duelState.activePlayerId);
        return this.advancePhase(newState);
    }
    
    private dusk(duelState: DuelState): DuelState {
        return this.endTurn(duelState);
    }
    
    public endTurn(duelState: DuelState): DuelState {
        const currentPlayer = this.getPlayer(duelState, duelState.activePlayerId);
        const newCurrentPlayerState = { ...currentPlayer, hasSummonedUnitThisTurn: false };
        let newDuelState = this.updatePlayerState(duelState, duelState.activePlayerId, newCurrentPlayerState);

        const nextPlayerId = newDuelState.activePlayerId === newDuelState.player.id ? newDuelState.opponent.id : newDuelState.player.id;
        const nextPlayer = this.getPlayer(newDuelState, nextPlayerId);
        
        const newUnits = nextPlayer.board.units.map(unit => unit ? { ...unit, canAttack: true } : null);
        const newNextPlayerBoard = { ...nextPlayer.board, units: newUnits };
        const newNextPlayerState = { ...nextPlayer, board: newNextPlayerBoard };
        newDuelState = this.updatePlayerState(newDuelState, nextPlayerId, newNextPlayerState);
        
        newDuelState.activePlayerId = nextPlayerId;
        if (nextPlayerId === newDuelState.player.id) {
            newDuelState.turn++;
        }
        newDuelState.phase = 'dawn';
        
        return this.dawn(newDuelState);
    }
}

export const gameManager = new GameManager();
