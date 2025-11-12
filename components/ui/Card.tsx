
import React from 'react';
import { CardData, Rarity, MoralAlignment, PhilosophicalAlignment, Element, EquipmentType } from '../../types';
import CardBack from './CardBack';

interface CardProps {
    card: CardData | null;
    onClick?: () => void;
    className?: string;
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

const getAlignmentText = (moral?: MoralAlignment, philosophical?: PhilosophicalAlignment) => {
    if (!moral || !philosophical) return null;
    
    let philosophicalText = philosophical.toUpperCase();
    if (philosophical === 'Law') {
        philosophicalText = 'LAWFUL';
    } else if (philosophical === 'Chaos') {
        philosophicalText = 'CHAOTIC';
    }

    return `${philosophicalText} - ${moral.toUpperCase()}`;
}

const UnitCardLayout: React.FC<{ card: CardData }> = ({ card }) => {
    const colors = RARITY_COLORS[card.rarity];
    const alignmentText = getAlignmentText(card.moralAlignment, card.philosophicalAlignment);

    return (
        <CardLayout card={card}>
            <div className={`p-1 ${colors.tag} text-white text-center`}>
                <h3 className={`font-bold text-sm ${colors.name} uppercase`}>{card.name}</h3>
                {alignmentText && (
                    <p className="text-[8px] font-semibold text-slate-300 tracking-wider">{alignmentText}</p>
                )}
            </div>

            <div className="p-1 bg-black/30">
                <div className={`aspect-square w-10/12 mx-auto border-2 ${colors.border} overflow-hidden bg-black`}>
                    <img src={card.imageUrl} alt={card.name} className="w-full h-full object-contain" />
                </div>
            </div>

            <div className="px-1 pb-1 flex-grow flex flex-col">
                {card.traits && (
                    <div className={`py-1 my-1 border-y-2 ${colors.border} text-center`}>
                        <p className={`text-[10px] font-semibold ${colors.text} italic`}>{card.traits.join(' - ')}</p>
                    </div>
                )}
                <div className="bg-slate-900/70 p-1.5 rounded-md flex-grow mt-0.5">
                    <p className="text-[10px] text-slate-200 leading-snug">{card.description}</p>
                </div>
            </div>

            <div className="flex justify-between items-center p-1">
                <div className={`px-2 h-10 rounded-lg ${colors.tag} flex items-center justify-center`}>
                    <p className={`font-black text-base ${colors.name}`}>{`⚔️ ${card.critical ?? 1}`}</p>
                </div>
                <div className={`px-3 h-12 rounded-lg ${colors.tag} flex items-center justify-center`}>
                    <p className={`font-black text-lg ${colors.name}`}>{card.power}</p>
                </div>
                <div className={`px-2 h-10 rounded-lg ${colors.tag} flex items-center justify-center`}>
                    <p className={`font-black text-base ${colors.name}`}>{`🛡️ ${card.shield ?? 0}`}</p>
                </div>
            </div>
        </CardLayout>
    );
}

const SpellCardLayout: React.FC<{ card: CardData }> = ({ card }) => {
    const colors = RARITY_COLORS[card.rarity];
    return (
        <CardLayout card={card}>
            <div className={`p-1 ${colors.tag} text-white text-center`}>
                <h3 className={`font-bold text-sm ${colors.name} uppercase`}>{card.name}</h3>
                {card.element && (
                    <p className="text-[8px] font-semibold text-slate-300 tracking-wider">{card.element.toUpperCase()}</p>
                )}
            </div>

            <div className="p-1 bg-black/30">
                <div className={`aspect-square w-10/12 mx-auto border-2 ${colors.border} overflow-hidden bg-black`}>
                    <img src={card.imageUrl} alt={card.name} className="w-full h-full object-contain" />
                </div>
            </div>

            <div className="px-1 pb-1 flex-grow flex flex-col">
                {card.traits && (
                    <div className={`py-1 my-1 border-y-2 ${colors.border} text-center`}>
                        <p className={`text-[10px] font-semibold ${colors.text} italic`}>{card.traits.join(' - ')}</p>
                    </div>
                )}
                <div className="bg-slate-900/70 p-1.5 rounded-md flex-grow mt-0.5">
                    <p className="text-[10px] text-slate-200 leading-snug italic text-center my-auto">{card.description}</p>
                </div>
            </div>
            <div className="h-14"></div>
        </CardLayout>
    );
}

const EquipmentCardLayout: React.FC<{ card: CardData }> = ({ card }) => {
    const colors = RARITY_COLORS[card.rarity];
    return (
        <CardLayout card={card}>
            <div className={`p-1 ${colors.tag} text-white text-center`}>
                <h3 className={`font-bold text-sm ${colors.name} uppercase`}>{card.name}</h3>
                {card.equipmentType && (
                    <p className="text-[8px] font-semibold text-slate-300 tracking-wider">{card.equipmentType.toUpperCase()}</p>
                )}
            </div>
            <div className="p-1 bg-black/30">
                <div className={`aspect-square w-10/12 mx-auto border-2 ${colors.border} overflow-hidden bg-black`}>
                    <img src={card.imageUrl} alt={card.name} className="w-full h-full object-contain" />
                </div>
            </div>
            <div className="px-1 pb-1 flex-grow flex flex-col">
                {card.traits && (
                    <div className={`py-1 my-1 border-y-2 ${colors.border} text-center`}>
                        <p className={`text-[10px] font-semibold ${colors.text} italic`}>{card.traits.join(' - ')}</p>
                    </div>
                )}
                <div className="bg-slate-900/70 p-1.5 rounded-md flex-grow mt-0.5">
                    <p className="text-[10px] text-slate-200 leading-snug">{card.description}</p>
                </div>
            </div>
            <div className="h-14"></div>
        </CardLayout>
    );
}

const Card: React.FC<CardProps> = ({ card, onClick, className }) => {
    if (!card) {
        return <div className={`border-2 border-dashed border-gray-600 rounded-lg bg-black/20 ${className}`} />;
    }

    const renderCardLayout = () => {
        switch (card.type) {
            case 'unit':
                return <UnitCardLayout card={card} />;
            case 'spell':
                return <SpellCardLayout card={card} />;
            case 'equipment':
                return <EquipmentCardLayout card={card} />;
            default:
                return <UnitCardLayout card={card} />;
        }
    };

    return (
        <div
            className={`relative w-full h-full transform hover:scale-105 transition-transform duration-200 cursor-pointer ${className}`}
            onClick={onClick}
            title={card.name}
        >
            {renderCardLayout()}
        </div>
    );
};

export default Card;
