
import React from 'react';
import { District, DistrictId } from '../types';

interface DistrictSelectionViewProps {
    districts: Record<DistrictId, District>;
    onSelectDistrict: (districtId: DistrictId) => void;
}

const DistrictSelectionView: React.FC<DistrictSelectionViewProps> = ({ districts, onSelectDistrict }) => {
    return (
        <div className="p-8 h-full flex flex-col">
            <h1 className="text-5xl font-black mb-8 text-center flex-shrink-0">Choose a District</h1>
            <div className="overflow-y-auto flex-grow">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl mx-auto">
                    {Object.values(districts).map((district) => (
                        <div 
                            key={district.id} 
                            className="bg-gray-800 rounded-lg overflow-hidden shadow-lg cursor-pointer transform hover:scale-105 transition-transform duration-300 border border-gray-700"
                            onClick={() => onSelectDistrict(district.id)}
                        >
                            <img src={district.backgroundImageUrl} alt={district.name} className="w-full h-48 object-cover"/>
                            <div className="p-6">
                                <h2 className="text-2xl font-bold text-cyan-400">{district.name}</h2>
                                <p className="text-gray-400 mt-2">{district.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DistrictSelectionView;
