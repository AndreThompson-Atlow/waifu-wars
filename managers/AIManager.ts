
import { DuelState } from '../types';
import { gameManager } from './GameManager';

class AIManager {
    takeTurn(duelState: DuelState): DuelState {
        let newState = { ...duelState };

        // Phase 1: Main (Play a card)
        newState = this.executeMainPhase(newState);

        // Phase 2: Combat (Attack)
        newState = this.executeCombatPhase(newState);

        // Phase 3: End Turn
        newState = gameManager.changePhase(newState, 'end');

        return newState;
    }

    private executeMainPhase(duelState: DuelState): DuelState {
        const playableCard = this.chooseCardToPlay(duelState);
        if (playableCard) {
            const emptySlotIndex = duelState.opponent.board.units.findIndex(u => u === null);
            if (emptySlotIndex !== -1) {
                return gameManager.playCard(duelState, duelState.opponent.id, playableCard, emptySlotIndex);
            }
        }
        return duelState;
    }

    private chooseCardToPlay(duelState: DuelState): string | null {
        // Simple AI: play the first unit card from hand
        return duelState.opponent.hand.find(cardId => {
            const cardData = gameManager.getCardData(cardId);
            return cardData?.type === 'unit';
        }) || null;
    }

    private executeCombatPhase(duelState: DuelState): DuelState {
        let stateAfterAttacks = { ...duelState };
        stateAfterAttacks = gameManager.changePhase(stateAfterAttacks, 'combat');

        for (let i = 0; i < stateAfterAttacks.opponent.board.units.length; i++) {
            const attacker = stateAfterAttacks.opponent.board.units[i];
            if (attacker && attacker.canAttack) {
                // Simple AI: attack the first possible target
                const targetIndex = stateAfterAttacks.player.board.units.findIndex(unit => unit !== null);

                if (targetIndex !== -1) {
                    stateAfterAttacks = gameManager.attack(stateAfterAttacks, stateAfterAttacks.opponent.id, i, targetIndex);
                } else {
                    // Direct attack if no units on player's board
                    stateAfterAttacks = gameManager.attack(stateAfterAttacks, stateAfterAttacks.opponent.id, i, null);
                }
            }
        }
        return stateAfterAttacks;
    }
}

export const aiManager = new AIManager();
