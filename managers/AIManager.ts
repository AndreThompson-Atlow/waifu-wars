
import { DuelState, TurnPhase } from '../types';
import { gameManager } from './GameManager';

class AIManager {
    takeTurn(duelState: DuelState): DuelState {
        let newState = { ...duelState };

        switch(newState.phase) {
            case 'summon':
                newState = this.executeSummonPhase(newState);
                break;
            case 'pre-combat':
                newState = this.executePreCombatPhase(newState);
                break;
            case 'combat':
                newState = this.executeCombatPhase(newState);
                break;
        }
        
        // If the AI is done with its actions for the current phase, advance to the next one.
        if (newState.activePlayerId === newState.opponent.id) {
             newState = gameManager.advancePhase(newState);
        }

        return newState;
    }

    private executeSummonPhase(duelState: DuelState): DuelState {
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
    
    private executePreCombatPhase(duelState: DuelState): DuelState {
        // For now, the AI will just advance to the combat phase.
        // Future logic for spells and equipment will go here.
        return duelState;
    }

    private executeCombatPhase(duelState: DuelState): DuelState {
        let stateAfterAttacks = { ...duelState };

        for (let i = 0; i < stateAfterAttacks.opponent.board.units.length; i++) {
            const attacker = stateAfterAttacks.opponent.board.units[i];
            if (attacker && attacker.canAttack) {
                const targetIndex = stateAfterAttacks.player.board.units.findIndex(unit => unit !== null);

                if (targetIndex !== -1) {
                    stateAfterAttacks = gameManager.attack(stateAfterAttacks, stateAfterAttacks.opponent.id, i, targetIndex);
                } else {
                    stateAfterAttacks = gameManager.attack(stateAfterAttacks, stateAfterAttacks.opponent.id, i, null);
                }
            }
        }
        return stateAfterAttacks;
    }
}

export const aiManager = new AIManager();
