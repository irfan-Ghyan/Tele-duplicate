import React, { useState } from 'react';
import Image from 'next/image';
import closeIcon from '../../../public/assets/images/dome/navbarclose.png';
import dropdownIcon from '../../../public/assets/images/events/dropdown.png'; 

const RaceResultsPopup = ({ onClose }) => {
  const [selectedRace, setSelectedRace] = useState('Bahrain GP');

  // Define race results for each Grand Prix
  const raceResultsData = {
    'Bahrain GP': [
      { position: '1', name: 'Karim Zuhour', fastestLap: '+1 point', points: '58' },
      { position: '2', name: 'Jan Skyvara', fastestLap: '', points: '48' },
      { position: '3', name: 'Nathan Pope', fastestLap: '', points: '41' },
      { position: '4', name: 'Jack Johns', fastestLap: '', points: '34' },
      { position: '5', name: 'Mohamed Abouhadb', fastestLap: '', points: '28' },
      { position: '6', name: 'Joel Nikanor Vuorinen', fastestLap: '', points: '23' },
      { position: '7', name: 'Ibay Amor', fastestLap: '', points: '19' },
    ],
    'Saudi GP': [
      { position: '1', name: 'Nathan Pope', fastestLap: '+1 point', points: '60' },
      { position: '2', name: 'Karim Zuhour', fastestLap: '', points: '55' },
      { position: '3', name: 'Jan Skyvara', fastestLap: '', points: '50' },
      { position: '4', name: 'Joel Nikanor Vuorinen', fastestLap: '', points: '42' },
      { position: '5', name: 'Ibay Amor', fastestLap: '', points: '36' },
      { position: '6', name: 'Jack Johns', fastestLap: '', points: '30' },
      { position: '7', name: 'Mohamed Abouhadb', fastestLap: '', points: '25' },
    ],
    'UAE GP': [
      { position: '1', name: 'Jan Skyvara', fastestLap: '+1 point', points: '62' },
      { position: '2', name: 'Joel Nikanor Vuorinen', fastestLap: '', points: '58' },
      { position: '3', name: 'Karim Zuhour', fastestLap: '', points: '54' },
      { position: '4', name: 'Ibay Amor', fastestLap: '', points: '46' },
      { position: '5', name: 'Nathan Pope', fastestLap: '', points: '40' },
      { position: '6', name: 'Mohamed Abouhadb', fastestLap: '', points: '33' },
      { position: '7', name: 'Jack Johns', fastestLap: '', points: '27' },
    ],
  };

  // Set the race results based on the selected option
  const handleRaceChange = (e) => {
    setSelectedRace(e.target.value);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-[#11072C] p-8 relative w-[960px] h-[705px]">
        <h2 className="font-bold text-[20px] lg:text-[34px] text-white font-orbitron text-center">
          Race Results
        </h2>
        <button onClick={onClose} className="absolute top-2 right-2">
          <Image src={closeIcon} alt="Close" width={24} height={24} />
        </button>
        <div className="text-center mt-[26px] mb-[12px] relative">
          <select
            value={selectedRace}
            onChange={handleRaceChange}
            className="w-full text-white border border-white border-opacity-15 bg-transparent font-orbitron py-2 px-2 appearance-none cursor-pointer"
          >
            <option value="Bahrain GP" className="text-[#130a2c] hover:bg-[#7E51F8]">
              R1 Bahrain GP
            </option>
            <option value="Saudi GP" className="text-[#11072C] hover:bg-[#7E51F8]">
              R1 Saudi GP
            </option>
            <option value="UAE GP" className="text-[#11072C] hover:bg-[#7E51F8]">
              R1 UAE GP
            </option>
          </select>
          {/* Add the dropdown icon image inside the dropdown container */}
          <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
            <Image src={dropdownIcon} alt="Dropdown Icon" width={16} height={16} />
          </div>
        </div>
        <table className="w-full text-left text-[14px] lg:text-[18px] my-4 text-white font-jura mt-[12px]">
          <thead className="bg-[#7d7082]">
            <tr>
              <th className="px-4 py-2">Position</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Fastest Lap</th>
              <th className="px-4 py-2">Points</th>
            </tr>
          </thead>
          <tbody>
            {raceResultsData[selectedRace]?.map((result, index) => (
              <tr key={index}>
                <td className="border border-[#11072C] px-4 py-2 bg-[#A72AEB]">{result.position}</td>
                <td className="border border-[#11072C] px-4 py-2 bg-[#23124F]">{result.name}</td>
                <td className="border border-[#11072C] px-4 py-2 bg-[#23124F]">{result.fastestLap}</td>
                <td className="border border-[#11072C] px-4 py-2 bg-[#23124F]">{result.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RaceResultsPopup;
