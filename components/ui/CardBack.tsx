
import React from 'react';

const CardBack: React.FC<{ className?: string }> = ({ className }) => {
    return (
        <div className={`w-full h-full rounded-xl overflow-hidden border-2 border-slate-500 shadow-lg shadow-slate-500/10 flex flex-col font-sans ${className}`}>
            <img src="./assets/ui/card_back.png" alt="Card Back" className="w-full h-full object-cover" />
        </div>
    );
};

export default CardBack;
