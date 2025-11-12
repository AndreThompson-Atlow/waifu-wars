import React from 'react';
import { CardData } from '../../types';

interface CardProps {
    card: CardData | null;
    onClick?: () => void;
    className?: string;
}

// --- Card Type Icons ---
const UnitIcon = () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M11.625 16.5a1.875 1.875 0 100-3.75 1.875 1.875 0 000 3.75z" /><path fillRule="evenodd" d="M5.625 1.5c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0016.5 9h-1.875a1.875 1.875 0 01-1.875-1.875V3.375c0-1.036-.84-1.875-1.875-1.875H5.625zM12.75 11.25a.75.75 0 000 1.5h.375a.75.75 0 000-1.5h-.375zM12 15a.75.75 0 01.75.75v.375a.75.75 0 01-1.5 0v-.375A.75.75 0 0112 15zm-3.75-3.75a.75.75 0 000 1.5h.375a.75.75 0 000-1.5h-.375zM9 15a.75.75 0 01.75.75v.375a.75.75 0 01-1.5 0v-.375A.75.75 0 019 15zm-3.75-3.75a.75.75 0 000 1.5h.375a.75.75 0 000-1.5H5.25zM6 15a.75.75 0 01.75.75v.375a.75.75 0 01-1.5 0v-.375A.75.75 0 016 15z" clipRule="evenodd" /></svg>;
const SpellIcon = () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M11.47 1.72a.75.75 0 011.06 0l3 3a.75.75 0 01-1.06 1.06l-1.72-1.72V7.5h-1.5V4.06L9.53 5.78a.75.75 0 01-1.06-1.06l3-3zM11.25 7.5V15a.75.75 0 001.5 0V7.5h-1.5z" /><path d="M3.75 15a.75.75 0 01.75-.75h15a.75.75 0 010 1.5h-15a.75.75 0 01-.75-.75zM4.5 19.5a.75.75 0 000-1.5h-.75a.75.75 0 000 1.5h.75zM19.5 18a.75.75 0 01.75.75v.75a.75.75 0 01-1.5 0v-.75a.75.75 0 01.75-.75zM14.25 19.5a.75.75 0 000-1.5h-.75a.75.75 0 000 1.5h.75zM9 18a.75.75 0 01.75.75v.75a.75.75 0 01-1.5 0v-.75A.75.75 0 019 18z" /></svg>;
const EquipmentIcon = () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path fillRule="evenodd" d="M12.963 2.286a.75.75 0 00-1.071 1.052A3.75 3.75 0 0115.75 6H18a.75.75 0 01.75.75 1.5 1.5 0 01-1.5 1.5H3.75A1.5 1.5 0 012.25 7.5A.75.75 0 013 6.75h2.25A3.75 3.75 0 019 2.25a.75.75 0 01.75-.75 2.25 2.25 0 012.25 2.25c0 1.152-.821 2.122-1.888 2.235a.75.75 0 01-.612-.928 1.501 1.501 0 00-1.02-1.318.75.75 0 00-1.071 1.052 3.001 3.001 0 012.04 2.638.75.75 0 101.49-.154 1.5 1.5 0 00-1.02-1.318.75.75 0 00-1.071 1.052A3.75 3.75 0 0112 10.5c-1.995 0-3.64-1.548-3.74-3.539a.75.75 0 00-.74-1.011H3.75A3 3 0 00.75 9v.042a.75.75 0 001.5 0V9a1.5 1.5 0 011.5-1.5h15A1.5 1.5 0 0121 9v9a1.5 1.5 0 01-1.5 1.5H3A1.5 1.5 0 011.5 18v-2.25a.75.75 0 00-1.5 0V18a3 3 0 003 3h15a3 3 0 003-3V9a3 3 0 00-3-3h-2.25a.75.75 0 00-.75.75v.054a.75.75 0 001.49.153 3.001 3.001 0 012.04 2.638.75.75 0 101.49-.154A4.501 4.501 0 0018 5.25h-2.25a5.25 5.25 0 00-4.787-4.015z" clipRule="evenodd" /></svg>;


// --- Layout Components for each Card Type ---

const UnitCardLayout: React.FC<{card: CardData}> = ({ card }) => (
    <div className="w-full h-full bg-slate-900 rounded-lg overflow-hidden border-2 border-red-500/80 shadow-lg shadow-red-500/20 flex flex-col">
        {/* Art Box */}
        <div className="w-full aspect-square bg-black">
            <img src={card.imageUrl} alt={card.name} className="w-full h-full object-cover" />
        </div>
        
        {/* Info Box */}
        <div className="p-2 flex flex-col flex-grow">
            <h3 className="font-black text-sm text-red-200 uppercase tracking-wider truncate">{card.name}</h3>
            <div className="flex items-center gap-1.5 text-xs text-red-400 font-bold my-0.5">
                <UnitIcon />
                <span>UNIT</span>
            </div>
            <p className="text-[11px] leading-tight text-slate-300 bg-slate-800/50 p-1.5 rounded-sm border-l-2 border-red-500/80 flex-grow">{card.description}</p>
        </div>
        
        {/* Stats Box */}
        <div className="bg-red-900/50 mt-auto p-1.5 text-center flex justify-around text-sm font-black text-white">
            <span>ATK / <span className="text-red-300">{card.attack}</span></span>
            <span>DEF / <span className="text-red-300">{card.defense}</span></span>
        </div>
    </div>
);

const SpellCardLayout: React.FC<{card: CardData}> = ({ card }) => (
    <div className="w-full h-full bg-slate-900 rounded-lg overflow-hidden border-2 border-indigo-500/80 shadow-lg shadow-indigo-500/20 flex flex-col">
        <div className="w-full aspect-square bg-black">
            <img src={card.imageUrl} alt={card.name} className="w-full h-full object-cover" />
        </div>
        <div className="p-2 flex flex-col flex-grow">
            <h3 className="font-black text-sm text-indigo-200 uppercase tracking-wider truncate">{card.name}</h3>
            <div className="flex items-center gap-1.5 text-xs text-indigo-400 font-bold my-1">
                <SpellIcon />
                <span>SPELL</span>
            </div>
            <p className="text-xs text-slate-300 bg-slate-800/50 p-1.5 rounded-sm border-l-2 border-indigo-500/80 flex-grow italic">{card.description}</p>
        </div>
    </div>
);

const EquipmentCardLayout: React.FC<{card: CardData}> = ({ card }) => (
    <div className="w-full h-full bg-slate-900 rounded-lg overflow-hidden border-2 border-amber-500/80 shadow-lg shadow-amber-500/20 flex flex-col">
        <div className="w-full aspect-square bg-black">
            <img src={card.imageUrl} alt={card.name} className="w-full h-full object-cover" />
        </div>
        <div className="p-2 flex flex-col flex-grow">
            <h3 className="font-black text-sm text-amber-200 uppercase tracking-wider truncate">{card.name}</h3>
            <div className="flex items-center gap-1.5 text-xs text-amber-400 font-bold my-1">
                <EquipmentIcon />
                <span>EQUIPMENT</span>
            </div>
            <p className="text-xs text-slate-300 bg-slate-800/50 p-1.5 rounded-sm border-l-2 border-amber-500/80 flex-grow">{card.description}</p>
        </div>
    </div>
);

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