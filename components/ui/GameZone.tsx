
import React from 'react';
import CardBack from './CardBack';

interface GameZoneProps {
    name: string;
    count: number;
    onHover?: () => void;
    onClick?: () => void;
}

const GameZone: React.FC<GameZoneProps> = ({ name, count, onHover, onClick }) => {
    return (
        <div 
            className="relative w-20 h-28 flex flex-col items-center justify-center bg-black/50 rounded-lg cursor-pointer group border-2 border-gray-700/50"
            onMouseEnter={onHover}
            onClick={onClick}
        >
            <div className="absolute inset-0 opacity-40 group-hover:opacity-60 transition-opacity">
                <CardBack />
            </div>
            <div className="relative z-10 flex flex-col items-center text-white text-shadow-lg">
                <span className="font-bold text-2xl">{count}</span>
                <span className="text-xs uppercase font-semibold tracking-widest">{name}</span>
            </div>
        </div>
    );
};

export default GameZone;
