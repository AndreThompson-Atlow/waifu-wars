import { NPC } from '../types';

export const NPCS: Record<string, NPC> = {
    npc_shopkeeper: {
        id: 'npc_shopkeeper',
        name: 'Shopkeeper',
        avatarUrl: './assets/duelists/npc_shopkeeper.png',
        deck: [],
        dialogue: {
            intro: 'Welcome to the shop! What can I get for you?',
            win: 'Heh, not bad.',
            lose: 'Maybe next time.',
        }
    },
    npc_rival: {
        id: 'npc_rival',
        name: 'Rival',
        avatarUrl: './assets/duelists/npc_rival.png',
        deck: ['card_1', 'card_2', 'card_3', 'card_4', 'card_5', 'card_6', 'card_7', 'card_8', 'card_9', 'card_10'],
        dialogue: {
            intro: 'You again? Ready to lose?',
            win: 'Too easy.',
            lose: 'Hmph. Lucky.',
        }
    },
    npc_pro_player: {
        id: 'npc_pro_player',
        name: 'Pro Player',
        avatarUrl: './assets/duelists/npc_pro_player.png',
        deck: [],
        dialogue: {
            intro: 'You think you have what it takes? Show me.',
            win: 'As expected.',
            lose: 'Interesting...',
        }
    },
    npc_collector: {
        id: 'npc_collector',
        name: 'Collector',
        avatarUrl: './assets/duelists/npc_collector.png',
        deck: [],
        dialogue: {
            intro: 'My collection is my life. Care to see it?',
            win: 'My cards are pristine.',
            lose: 'A minor setback.',
        }
    },
    npc_casual_player: {
        id: 'npc_casual_player',
        name: 'Casual Player',
        avatarUrl: './assets/duelists/npc_casual_player.png',
        deck: [],
        dialogue: {
            intro: 'Just here for a fun game!',
            win: 'Good game!',
            lose: 'Good game!',
        }
    },
    npc_gamer: {
        id: 'npc_gamer',
        name: 'Gamer',
        avatarUrl: './assets/duelists/npc_gamer.png',
        deck: [],
        dialogue: {
            intro: 'l33t hax0r skills incoming.',
            win: 'GG EZ.',
            lose: 'Reported for hacking.',
        }
    }
};