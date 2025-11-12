
import React, { useState } from 'react';
import { Location, ShopInventory } from '../types';

type ShopTab = keyof ShopInventory;

interface ShopViewProps {
    location: Location;
}

const ShopView: React.FC<ShopViewProps> = ({ location }) => {
    const inventory = location.inventory || {};
    const availableTabs = Object.keys(inventory) as ShopTab[];
    const [activeTab, setActiveTab] = useState<ShopTab>(availableTabs[0]);

    const renderTabContent = () => {
        if (!activeTab || !inventory[activeTab]) {
            return <p className="text-gray-400">No items in this category.</p>;
        }

        const items = inventory[activeTab] || [];
        const title = activeTab.charAt(0).toUpperCase() + activeTab.slice(1);

        return (
            <div>
                <h2 className="text-3xl font-bold mb-4">{title}</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {items.map((item) => (
                        <div key={item.id} className="bg-gray-800 rounded-lg p-4 text-center group cursor-pointer border border-gray-700 hover:border-cyan-400 transition-colors">
                            <img src={item.imageUrl} alt={item.name} className="w-full h-40 object-cover rounded-md mb-3 bg-gray-700" />
                            <h3 className="font-semibold group-hover:text-cyan-400 truncate">{item.name}</h3>
                            <p className="text-yellow-400 font-bold">{item.price} G</p>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <div className="p-8 max-w-7xl mx-auto h-full flex flex-col">
            <h1 className="text-5xl font-black mb-8 flex-shrink-0">{location.name}</h1>
            <div className="flex gap-2 mb-6 border-b border-gray-700 flex-shrink-0">
                {availableTabs.map(tab => (
                    <TabButton 
                        key={tab}
                        name={tab.charAt(0).toUpperCase() + tab.slice(1)} 
                        tab={tab} 
                        activeTab={activeTab} 
                        setActiveTab={setActiveTab} 
                    />
                ))}
            </div>
            <div className="flex-grow overflow-y-auto pr-2">
                {renderTabContent()}
            </div>
        </div>
    );
};

interface TabButtonProps {
    name: string;
    tab: ShopTab;
    activeTab: ShopTab;
    setActiveTab: (tab: ShopTab) => void;
}

const TabButton: React.FC<TabButtonProps> = ({ name, tab, activeTab, setActiveTab }) => {
    const isActive = activeTab === tab;
    return (
        <button 
            onClick={() => setActiveTab(tab)}
            className={`py-2 px-4 font-semibold rounded-t-lg transition-colors ${isActive ? 'bg-indigo-600 text-white' : 'bg-gray-800 hover:bg-gray-700 text-gray-400'}`}
        >
            {name}
        </button>
    )
}

export default ShopView;
