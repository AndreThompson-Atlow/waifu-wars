
import React from 'react';
import { District, Location, LocationId } from '../types';

interface LocationSelectionViewProps {
    district: District;
    locations: Location[];
    onTravel: (locationId: LocationId) => void;
    onBack: () => void;
}

const LocationSelectionView: React.FC<LocationSelectionViewProps> = ({ district, locations, onTravel, onBack }) => {
    return (
        <div className="h-full bg-cover bg-center" style={{ backgroundImage: `url(${district.backgroundImageUrl})`}}>
            <div className="w-full h-full bg-black/70 backdrop-blur-md p-8 flex flex-col">
                <div className="flex justify-between items-center mb-8 flex-shrink-0">
                    <h1 className="text-5xl font-black">{district.name}</h1>
                    <button onClick={onBack} className="bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-md transition-colors">&larr; Back to Districts</button>
                </div>
                <div className="overflow-y-auto flex-grow">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {locations.map((location) => (
                            <div 
                                key={location.id} 
                                className="bg-gray-800/80 rounded-lg overflow-hidden shadow-lg cursor-pointer transform hover:scale-105 transition-transform duration-300 border border-gray-700 hover:border-cyan-400"
                                onClick={() => onTravel(location.id)}
                            >
                                <img src={location.backgroundImageUrl} alt={location.name} className="w-full h-40 object-cover"/>
                                <div className="p-4">
                                    <h2 className="text-xl font-bold truncate">{location.name}</h2>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LocationSelectionView;
