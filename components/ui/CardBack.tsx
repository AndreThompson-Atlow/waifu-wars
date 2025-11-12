
import React from 'react';

const CardBack: React.FC = () => {
    return (
        <div className="w-full h-full rounded-xl overflow-hidden border-2 border-slate-500">
            <img src="./assets/cards/card_back.png" alt="Card Back" className="w-full h-full object-cover" />
        </div>
    );
};

export default CardBack;
