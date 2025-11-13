
import React from 'react';

interface ZoneProps {
    label: string;
    count: number;
    children?: React.ReactNode;
}

const Zone: React.FC<ZoneProps> = ({ label, count, children }) => {
    return (
        <div className="relative aspect-[2/3] w-full bg-black/30 rounded-lg flex flex-col items-center justify-center border-2 border-pink-500/50">
            {children && (
                <div className={`absolute inset-0 ${count > 0 ? 'opacity-100' : 'opacity-0'} transition-opacity`}>
                    {children}
                </div>
            )}
            <div className="relative z-10 flex flex-col items-center text-white text-shadow-lg select-none pointer-events-none">
                <span className="font-bold text-2xl">{count}</span>
                <span className="text-xs uppercase font-semibold tracking-widest">{label}</span>
            </div>
        </div>
    );
};

export default Zone;
