
import { DuelState, PlayerState, UnitInstance } from '../types';
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

        return {
            player: {
                id: playerState.id,
                name: playerState.name,
                avatarUrl: playerState.avatarUrl,
                hp: 10,
                hand: playerDeck.splice(0, 3),
                board: { deck: playerDeck, discard: [], extraDeck: [], banished: [], units: [null, null, null] },
                hasSummonedUnitThisTurn: false,
            },
            opponent: {
                id: opponentNPC.id,
                name: opponentNPC.name,
                avatarUrl: opponentNPC.avatarUrl,
                hp: 10,
                hand: opponentDeck.splice(0, 3),
                board: { deck: opponentDeck, discard: [], extraDeck: [], banished: [], units: [null, null, null] },
                hasSummonedUnitThisTurn: false,
            },
            turn: 1,
            phase: 'main',
            activePlayerId: playerState.id,
        };
    }

    private getPlayer(duelState: DuelState, playerId: string) {
        return duelState.player.id === playerId ? duelState.player : duelState.opponent;
    }
    
    getCardData(cardId: string) {
        return TEST_CARDS[cardId] || null;
    }

    drawCard(duelState: DuelState, playerId: string): DuelState {
        const player = this.getPlayer(duelState, playerId);
        if (player.hand.length >= 4 || player.board.deck.length === 0) {
            return duelState;
        }
        const newDeck = [...player.board.deck];
        const drawnCard = newDeck.shift()!;
        player.hand.push(drawnCard);
        player.board.deck = newDeck;
        return duelState;
    }

    playCard(duelState: DuelState, playerId: string, cardId: string, slotIndex: number): DuelState {
        const player = this.getPlayer(duelState, playerId);
        const cardData = this.getCardData(cardId);

        if (player.hasSummonedUnitThisTurn || !cardData || duelState.phase !== 'main') return duelState;

        const cardInHandIndex = player.hand.indexOf(cardId);
        if (cardInHandIndex === -1 || player.board.units[slotIndex] !== null) return duelState;

        if (cardData.type === 'unit') {
            player.hand.splice(cardInHandIndex, 1);
            const newUnit: UnitInstance = {
                cardId: cardId,
                currentShield: cardData.shield!,
                canAttack: false, // Summoning sickness
            };
            player.board.units[slotIndex] = newUnit;
            player.hasSummonedUnitThisTurn = true;
        }
        return duelState;
    }

    attack(duelState: DuelState, attackerId: string, attackerSlotIndex: number, targetSlotIndex: number | null): DuelState {
        if (duelState.phase !== 'combat') return duelState;

        const attackerPlayer = this.getPlayer(duelState, attackerId);
        const opponentPlayer = attackerId === duelState.player.id ? duelState.opponent : duelState.player;
        const attackerUnit = attackerPlayer.board.units[attackerSlotIndex];

        if (!attackerUnit || !attackerUnit.canAttack) return duelState;

        if (targetSlotIndex === null) {
            if (opponentPlayer.board.units.some(u => u !== null)) return duelState;
            const attackerCardData = this.getCardData(attackerUnit.cardId)!;
            opponentPlayer.hp -= attackerCardData.critical!;
            attackerUnit.canAttack = false;
        } else {
            const targetUnit = opponentPlayer.board.units[targetSlotIndex];
            if (!targetUnit) return duelState;

            const attackerCardData = this.getCardData(attackerUnit.cardId)!;
            const targetCardData = this.getCardData(targetUnit.cardId)!;

            if (attackerCardData.power! > targetCardData.power!) {
                targetUnit.currentShield -= attackerCardData.critical!;
            } else if (targetCardData.power! > attackerCardData.power!) {
                attackerUnit.currentShield -= targetCardData.critical!;
            } else {
                targetUnit.currentShield -= attackerCardData.critical!;
                attackerUnit.currentShield -= targetCardData.critical!;
            }
            
            if (attackerUnit.currentShield <= 0) {
                attackerPlayer.board.discard.push(attackerUnit.cardId);
                attackerPlayer.board.units[attackerSlotIndex] = null;
            }
            if (targetUnit.currentShield <= 0) {
                opponentPlayer.board.discard.push(targetUnit.cardId);
                opponentPlayer.board.units[targetSlotIndex] = null;
            }
            attackerUnit.canAttack = false;
        }

        return duelState;
    }

    endTurn(duelState: DuelState): DuelState {
        if (duelState.activePlayerId === duelState.player.id) {
            if (duelState.phase === 'main') {
                return this.changePhase(duelState, 'combat');
            } else if (duelState.phase === 'combat') {
                return this.changePhase(duelState, 'end');
            }
        }
        return this.executeEndTurn(duelState);
    }

    changePhase(duelState: DuelState, phase: 'main' | 'combat' | 'end'): DuelState {
        duelState.phase = phase;
        if (phase === 'end') {
            return this.executeEndTurn(duelState);
        }
        return duelState;
    }
    
    private executeEndTurn(duelState: DuelState): DuelState {
        const currentPlayer = this.getPlayer(duelState, duelState.activePlayerId);
        currentPlayer.hasSummonedUnitThisTurn = false;

        const nextPlayerId = duelState.activePlayerId === duelState.player.id ? duelState.opponent.id : duelState.player.id;
        duelState.activePlayerId = nextPlayerId;
        
        if (nextPlayerId === duelState.player.id) {
            duelState.turn++;
        }

        const nextPlayer = this.getPlayer(duelState, nextPlayerId);
        nextPlayer.board.units.forEach(unit => {
            if (unit) unit.canAttack = true;
        });

        this.drawCard(duelState, nextPlayerId);
        
        duelState.phase = 'main';

        if (nextPlayerId === duelState.opponent.id) {
            return aiManager.takeTurn(duelState);
        }

        return duelState;
    }
}

export const gameManager = new GameManager();
