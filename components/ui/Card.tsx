import React from 'react';
import { CardData, Rarity, MoralAlignment, PhilosophicalAlignment } from '../../types';

interface CardProps {
    card: CardData | null;
    onClick?: () => void;
    className?: string;
}

const RARITY_COLORS: Record<Rarity, {
    border: string;
    shadow: string;
    text: string;
    icon: string;
}> = {
    Common: {
        border: 'border-gray-500/80',
        shadow: 'shadow-gray-500/20',
        text: 'text-gray-200',
        icon: 'text-gray-400',
    },
    Uncommon: {
        border: 'border-green-500/80',
        shadow: 'shadow-green-500/20',
        text: 'text-green-200',
        icon: 'text-green-400',
    },
    Rare: {
        border: 'border-blue-500/80',
        shadow: 'shadow-blue-500/20',
        text: 'text-blue-200',
        icon: 'text-blue-400',
    },
    Legendary: {
        border: 'border-purple-500/80',
        shadow: 'shadow-purple-500/20',
        text: 'text-purple-200',
        icon: 'text-purple-400',
    },
    Mythic: {
        border: 'border-amber-500/80',
        shadow: 'shadow-amber-500/20',
        text: 'text-amber-200',
        icon: 'text-amber-400',
    },
};


// --- Card Type Icons ---
const UnitIcon = () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M11.625 16.5a1.875 1.875 0 100-3.75 1.875 1.875 0 000 3.75z" /><path fillRule="evenodd" d="M5.625 1.5c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0016.5 9h-1.875a1.875 1.875 0 01-1.875-1.875V3.375c0-1.036-.84-1.875-1.875-1.875H5.625zM12.75 11.25a.75.75 0 000 1.5h.375a.75.75 0 000-1.5h-.375zM12 15a.75.75 0 01.75.75v.375a.75.75 0 01-1.5 0v-.375A.75.75 0 0112 15zm-3.75-3.75a.75.75 0 000 1.5h.375a.75.75 0 000-1.5h-.375zM9 15a.75.75 0 01.75.75v.375a.75.75 0 01-1.5 0v-.375A.75.75 0 019 15zm-3.75-3.75a.75.75 0 000 1.5h.375a.75.75 0 000-1.5H5.25zM6 15a.75.75 0 01.75.75v.375a.75.75 0 01-1.5 0v-.375A.75.75 0 016 15z" clipRule="evenodd" /></svg>;
const SpellIcon = () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M11.47 1.72a.75.75 0 011.06 0l3 3a.75.75 0 01-1.06 1.06l-1.72-1.72V7.5h-1.5V4.06L9.53 5.78a.75.75 0 01-1.06-1.06l3-3zM11.25 7.5V15a.75.75 0 001.5 0V7.5h-1.5z" /><path d="M3.75 15a.75.75 0 01.75-.75h15a.75.75 0 010 1.5h-15a.75.75 0 01-.75-.75zM4.5 19.5a.75.75 0 000-1.5h-.75a.75.75 0 000 1.5h.75zM19.5 18a.75.75 0 01.75.75v.75a.75.75 0 01-1.5 0v-.75a.75.75 0 01.75-.75zM14.25 19.5a.75.75 0 000-1.5h-.75a.75.75 0 000 1.5h.75zM9 18a.75.75 0 01.75.75v.75a.75.75 0 01-1.5 0v-.75A.75.75 0 019 18z" /></svg>;
const EquipmentIcon = () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path fillRule="evenodd" d="M12.963 2.286a.75.75 0 00-1.071 1.052A3.75 3.75 0 0115.75 6H18a.75.75 0 01.75.75 1.5 1.5 0 01-1.5 1.5H3.75A1.5 1.5 0 012.25 7.5A.75.75 0 013 6.75h2.25A3.75 3.75 0 019 2.25a.75.75 0 01.75-.75 2.25 2.25 0 012.25 2.25c0 1.152-.821 2.122-1.888 2.235a.75.75 0 01-.612-.928 1.501 1.501 0 00-1.02-1.318.75.75 0 00-1.071 1.052 3.001 3.001 0 012.04 2.638.75.75 0 101.49-.154 1.5 1.5 0 00-1.02-1.318.75.75 0 00-1.071 1.052A3.75 3.75 0 0112 10.5c-1.995 0-3.64-1.548-3.74-3.539a.75.75 0 00-.74-1.011H3.75A3 3 0 00.75 9v.042a.75.75 0 001.5 0V9a1.5 1.5 0 011.5-1.5h15A1.5 1.5 0 0121 9v9a1.5 1.5 0 01-1.5 1.5H3A1.5 1.5 0 011.5 18v-2.25a.75.75 0 00-1.5 0V18a3 3 0 003 3h15a3 3 0 003-3V9a3 3 0 00-3-3h-2.25a.75.75 0 00-.75.75v.054a.75.75 0 001.49.153 3.001 3.001 0 012.04 2.638.75.75 0 101.49-.154A4.501 4.501 0 0018 5.25h-2.25a5.25 5.25 0 00-4.787-4.015z" clipRule="evenodd" /></svg>;

// --- Alignment Icons ---
const GoodIcon = () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-2.625 6c-.54 0-1.024.264-1.313.687a3.75 3.75 0 00-1.125 2.813 3.75 3.75 0 001.125 2.813c.289.423.773.687 1.313.687h5.25c.54 0 1.024-.264 1.313-.687a3.75 3.75 0 001.125-2.813 3.75 3.75 0 00-1.125-2.813A2.625 2.625 0 0014.625 8.25h-5.25z" clipRule="evenodd" /></svg>;
const EvilIcon = () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z" clipRule="evenodd" /></svg>;
const LawIcon = () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM8.25 9.75a.75.75 0 000 1.5h7.5a.75.75 0 000-1.5h-7.5zm.75 4.5a.75.75 0 01.75-.75h6a.75.75 0 010 1.5h-6a.75.75 0 01-.75-.75z" clipRule="evenodd" /></svg>;
const ChaosIcon = () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-2.25 4.5a.75.75 0 011.5 0v3.254c0 .428.168.833.469 1.135l2.25 2.25a.75.75 0 01-1.06 1.06l-2.25-2.25a2.25 2.25 0 00-.659-.66V6.75zm5.25 7.5a.75.75 0 00-1.5 0v-3.254c0-.428-.168-.833-.469-1.135l-2.25-2.25a.75.75 0 001.06-1.06l2.25 2.25c.301.302.469.707.469 1.135V14.25z" clipRule="evenodd" /></svg>;
const NeutralIcon = () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm0 2.25a7.5 7.5 0 100 15 7.5 7.5 0 000-15z" clipRule="evenodd" /></svg>;


const ALIGNMENT_ICONS: Record<MoralAlignment | PhilosophicalAlignment, React.FC> = {
    Good: GoodIcon,
    Evil: EvilIcon,
    Law: LawIcon,
    Chaos: ChaosIcon,
    Neutral: NeutralIcon,
};


const CardLayout: React.FC<{ card: CardData, children: React.ReactNode }> = ({ card, children }) => {
    const colors = RARITY_COLORS[card.rarity];
    return (
        <div className={`w-full h-full bg-slate-900 rounded-lg overflow-hidden border-2 ${colors.border} ${colors.shadow} flex flex-col`}>
            {children}
        </div>
    );
};

const UnitCardLayout: React.FC<{ card: CardData }> = ({ card }) => {
    const colors = RARITY_COLORS[card.rarity];
    const MoralIcon = card.moralAlignment && ALIGNMENT_ICONS[card.moralAlignment];
    const PhilosophicalIcon = card.philosophicalAlignment && ALIGNMENT_ICONS[card.philosophicalAlignment];

    return (
        <CardLayout card={card}>
            <div className="w-full aspect-[4/3] bg-black relative">
                <img src={card.imageUrl} alt={card.name} className="w-full h-full object-cover" />
                <div className="absolute top-1 right-1 flex gap-1">
                    {MoralIcon && <MoralIcon />}
                    {PhilosophicalIcon && <PhilosophicalIcon />}
                </div>
            </div>
            <div className="p-2 flex flex-col flex-grow">
                <h3 className={`font-black text-sm ${colors.text} uppercase tracking-wider truncate`}>{card.name}</h3>
                <div className={`flex items-center gap-1.5 text-xs ${colors.icon} font-bold my-0.5`}>
                    <UnitIcon />
                    <span>UNIT</span>
                </div>
                <p className={`text-xs leading-tight text-slate-300 bg-slate-800/50 p-1.5 rounded-sm border-l-2 ${colors.border} flex-grow`}>{card.description}</p>
            </div>
            <div className={`bg-slate-900/50 mt-auto p-1.5 text-center flex justify-around text-sm font-black text-white`}>
                <span>ATK / <span className={colors.text}>{card.attack}</span></span>
                <span>DEF / <span className={colors.text}>{card.defense}</span></span>
            </div>
        </CardLayout>
    );
}

const SpellCardLayout: React.FC<{ card: CardData }> = ({ card }) => {
    const colors = RARITY_COLORS[card.rarity];

    return (
        <CardLayout card={card}>
            <div className="w-full aspect-[4/3] bg-black">
                <img src={card.imageUrl} alt={card.name} className="w-full h-full object-cover" />
            </div>
            <div className="p-2 flex flex-col flex-grow">
                <h3 className={`font-black text-sm ${colors.text} uppercase tracking-wider truncate`}>{card.name}</h3>
                <div className={`flex items-center gap-1.5 text-xs ${colors.icon} font-bold my-1`}>
                    <SpellIcon />
                    <span>SPELL</span>
                </div>
                <p className={`text-sm text-slate-300 bg-slate-800/50 p-1.5 rounded-sm border-l-2 ${colors.border} flex-grow italic`}>{card.description}</p>
            </div>
        </CardLayout>
    );
}

const EquipmentCardLayout: React.FC<{ card: CardData }> = ({ card }) => {
    const colors = RARITY_COLORS[card.rarity];

    return (
        <CardLayout card={card}>
            <div className="w-full aspect-[4/3] bg-black">
                <img src={card.imageUrl} alt={card.name} className="w-full h-full object-cover" />
            </div>
            <div className="p-2 flex flex-col flex-grow">
                <h3 className={`font-black text-sm ${colors.text} uppercase tracking-wider truncate`}>{card.name}</h3>
                <div className={`flex items-center gap-1.5 text-xs ${colors.icon} font-bold my-1`}>
                    <EquipmentIcon />
                    <span>EQUIPMENT</span>
                </div>
                <p className={`text-sm text-slate-300 bg-slate-800/50 p-1.5 rounded-sm border-l-2 ${colors.border} flex-grow`}>{card.description}</p>
            </div>
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