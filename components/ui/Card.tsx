
import React from 'react';
import { CardData, Rarity } from '../../types';

interface CardProps {
    card: CardData | null;
    onClick?: () => void;
    className?: string;
    view?: 'full' | 'simplified';
}

const RARITY_COLORS: Record<Rarity, { border: string; shadow: string; text: string; name: string; tag: string }> = {
    Common: { border: 'border-gray-500', shadow: 'shadow-gray-500/10', text: 'text-gray-300', name: 'text-white', tag: 'bg-gray-600' },
    Uncommon: { border: 'border-green-600', shadow: 'shadow-green-600/20', text: 'text-green-200', name: 'text-green-100', tag: 'bg-green-700' },
    Rare: { border: 'border-blue-500', shadow: 'shadow-blue-500/20', text: 'text-blue-200', name: 'text-blue-100', tag: 'bg-blue-600' },
    Legendary: { border: 'border-purple-500', shadow: 'shadow-purple-500/30', text: 'text-purple-200', name: 'text-purple-100', tag: 'bg-purple-700' },
    Mythic: { border: 'border-amber-500', shadow: 'shadow-amber-500/40', text: 'text-amber-200', name: 'text-amber-100', tag: 'bg-amber-600' },
};

const CardLayout: React.FC<{ card: CardData, children: React.ReactNode }> = ({ card, children }) => {
    if (!card || !card.rarity) {
        return <div className="w-full h-full bg-slate-800 rounded-xl overflow-hidden border-2 border-red-500"><p className='text-white'>Invalid Card Data</p></div>;
    }
    const colors = RARITY_COLORS[card.rarity];
    return (
        <div className={`w-full h-full bg-slate-800 rounded-xl overflow-hidden border-2 ${colors.border} shadow-lg ${colors.shadow} flex flex-col font-sans`}>
            {children}
        </div>
    );
};

const UnitCardLayout: React.FC<{ card: CardData, view: 'full' | 'simplified' }> = ({ card, view }) => {
    const colors = RARITY_COLORS[card.rarity];
    const isSimplified = view === 'simplified';

    return (
        <CardLayout card={card}>
            <div className={`p-1 ${colors.tag} text-white text-center`}>
                <h3 className={`font-bold text-sm ${colors.name} uppercase truncate`}>{card.name}</h3>
            </div>

            <div className="relative bg-black/30">
                <div className={`aspect-square w-full border-y-2 ${colors.border} overflow-hidden bg-black`}>
                    <img src={card.imageUrl} alt={card.name} className="w-full h-full object-cover" />
                </div>
                {card.traits && (
                    <div className="absolute bottom-1 w-full text-center px-1">
                        <p className={`text-white font-semibold italic truncate ${isSimplified ? 'text-[9px]' : 'text-xs'}`} style={{ textShadow: '0 0 3px #000, 0 0 3px #000' }}>
                            {card.traits.join(' - ')}
                        </p>
                    </div>
                )}
            </div>

            {view === 'full' && (
                 <div className="px-1 pb-1 flex-grow flex flex-col mt-1">
                    <div className="bg-slate-900/70 p-1.5 rounded-md flex-grow ">
                        <p className="text-[10px] text-slate-200 leading-snug">{card.description}</p>
                    </div>
                </div>
            )}

            <div className={`flex justify-between items-center mt-auto ${isSimplified ? 'p-0.5' : 'p-1'}`}>
                <div className={`rounded-lg ${colors.tag} flex items-center justify-center ${isSimplified ? 'h-7 px-1' : 'h-10 px-2'}`}>
                    <p className={`font-black ${colors.name} ${isSimplified ? 'text-[10px]' : 'text-base'}`}>{`⚔️ ${card.critical ?? 1}`}</p>
                </div>
                <div className={`rounded-lg ${colors.tag} flex items-center justify-center ${isSimplified ? 'h-9 px-1.5' : 'h-12 px-3'}`}>
                    <p className={`font-black ${colors.name} ${isSimplified ? 'text-sm' : 'text-lg'}`}>{card.power}</p>
                </div>
                <div className={`rounded-lg ${colors.tag} flex items-center justify-center ${isSimplified ? 'h-7 px-1' : 'h-10 px-2'}`}>
                    <p className={`font-black ${colors.name} ${isSimplified ? 'text-[10px]' : 'text-base'}`}>{`🛡️ ${card.shield ?? 0}`}</p>
                </div>
            </div>
        </CardLayout>
    );
}

const SpellCardLayout: React.FC<{ card: CardData, view: 'full' | 'simplified' }> = ({ card, view }) => {
    const colors = RARITY_COLORS[card.rarity];
    const isSimplified = view === 'simplified';

    return (
        <CardLayout card={card}>
            <div className={`p-1 ${colors.tag} text-white text-center`}>
                <h3 className={`font-bold text-sm ${colors.name} uppercase truncate`}>{card.name}</h3>
            </div>

            <div className="relative bg-black/30">
                <div className={`aspect-square w-full border-y-2 ${colors.border} overflow-hidden bg-black`}>
                    <img src={card.imageUrl} alt={card.name} className="w-full h-full object-cover" />
                </div>
                {card.traits && (
                    <div className="absolute bottom-1 w-full text-center px-1">
                        <p className={`text-white font-semibold italic truncate ${isSimplified ? 'text-[9px]' : 'text-xs'}`} style={{ textShadow: '0 0 3px #000, 0 0 3px #000' }}>
                            {card.traits.join(' - ')}
                        </p>
                    </div>
                )}
            </div>

            {view === 'full' ? (
                <div className="px-1 pb-1 flex-grow flex flex-col mt-1">
                    <div className="bg-slate-900/70 p-1.5 rounded-md flex-grow flex">
                        <p className="text-[10px] text-slate-200 leading-snug italic text-center m-auto">{card.description}</p>
                    </div>
                </div>
            ) : (
                <div className="px-1 pb-1 flex-grow flex flex-col mt-1">
                    <div className="bg-slate-900/70 rounded-md flex-grow flex overflow-hidden">
                        <p className="text-[7px] text-slate-400 leading-none italic text-center m-auto p-1">{card.description}</p>
                    </div>
                </div>
            )}
            <div className={`mt-auto ${view === 'full' ? 'h-14' : 'h-4'}`}></div>
        </CardLayout>
    );
}

const EquipmentCardLayout: React.FC<{ card: CardData, view: 'full' | 'simplified' }> = ({ card, view }) => {
    const colors = RARITY_COLORS[card.rarity];
    const isSimplified = view === 'simplified';

    return (
        <CardLayout card={card}>
            <div className={`p-1 ${colors.tag} text-white text-center`}>
                <h3 className={`font-bold text-sm ${colors.name} uppercase truncate`}>{card.name}</h3>
            </div>
            <div className="relative bg-black/30">
                <div className={`aspect-square w-full border-y-2 ${colors.border} overflow-hidden bg-black`}>
                    <img src={card.imageUrl} alt={card.name} className="w-full h-full object-cover" />
                </div>
                {card.traits && (
                    <div className="absolute bottom-1 w-full text-center px-1">
                        <p className={`text-white font-semibold italic truncate ${isSimplified ? 'text-[9px]' : 'text-xs'}`} style={{ textShadow: '0 0 3px #000, 0 0 3px #000' }}>
                            {card.traits.join(' - ')}
                        </p>
                    </div>
                )}
            </div>
            {view === 'full' && (
                <div className="px-1 pb-1 flex-grow flex flex-col mt-1">
                    <div className="bg-slate-900/70 p-1.5 rounded-md flex-grow">
                        <p className="text-[10px] text-slate-200 leading-snug">{card.description}</p>
                    </div>
                </div>
            )}
            <div className={`mt-auto ${view === 'full' ? 'h-14' : 'h-4'}`}></div>
        </CardLayout>
    );
}

const Card: React.FC<CardProps> = ({ card, onClick, className, view = 'full' }) => {
    if (!card) {
        return <div className={`border-2 border-dashed border-gray-600 rounded-lg bg-black/20 ${className}`} />;
    }

    const renderCardLayout = () => {
        switch (card.type) {
            case 'unit':
                return <UnitCardLayout card={card} view={view} />;
            case 'spell':
                return <SpellCardLayout card={card} view={view} />;
            case 'equipment':
                return <EquipmentCardLayout card={card} view={view} />;
            default:
                return <UnitCardLayout card={card} view={view} />;
        }
    };

    return (
        <div
            className={`relative h-full w-full transition-transform duration-200 cursor-pointer ${className}`}
            onClick={onClick}
            title={card.name}
        >
            {renderCardLayout()}
        </div>
    );
};

export default Card;
