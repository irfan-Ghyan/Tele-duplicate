import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import closeIcon from '../../../public/assets/images/dome/navbarclose.png';

const StandingsPopup = ({ onClose }) => {
  const [standings, setStandings] = useState([
    { no: 'R1', name: 'Jack Johns', results: [34, 65, 58, 62, 53, 58, 73,], total: '734' },
    { no: 'R2', name: 'Moeen Haitham AlSarraj', results: [0, 55, 66, 52, 61, 66,63], total: '734' },
    { no: 'R3', name: 'Nathan Pope', results: [41,48, 50, 27, 45, 43, 0], total: '634' },
    { no: 'R4', name: 'karim Zuhour', results: [58, 41, 43, 32, 38, 0, 26], total: '372'},
    { no: 'R5', name: 'Mohamed Abounhadb', results: [28, 0, 24, 38, 19, 37, 0], total: '232'},
    { no: 'R6', name: 'Joel nikanor vuorinen', results: [23, 18, 14, 45, 27, 32, 14], total: '200'},
    { no: 'R7', name: 'Jan Skyvara', results: [48, 26, 20, 0, 0, 17, 0], total: '197'},
    { no: 'R8', name: 'Ibay Amor', results: [19, 30, 11, 19, 32, 4, 20], total: '158'},
  ]);

  // Example to fetch data (uncomment and modify according to your API)
  // useEffect(() => {
  //   fetch('your-api-url')
  //     .then(response => response.json())
  //     .then(data => setStandings(data))
  //     .catch(error => console.error('Error fetching data: ', error));
  // }, []);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-[#11072C] p-8 relative w-[960px] h-[705px]">
        <button onClick={onClose} className="absolute top-2 right-2">
          <Image src={closeIcon} alt="Close" width={24} height={24} />
        </button>
        <h2 className="font-bold text-[20px] lg:text-[34px] text-white font-orbitron text-center">Standings</h2>
        <table className="w-full text-left text-[14px] lg:text-[18px] my-4 text-white font-jura">
          <thead className='bg-[#7d7082]'>
            <tr>
              <th className="px-4 py-2">No#</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Bahrain GP</th>
              <th className="px-4 py-2">Saudi GP</th>
              <th className="px-4 py-2">Aus GP</th>
              <th className="px-4 py-2">Jap GP</th>
              <th className="px-4 py-2">China GP</th>
              <th className="px-4 py-2">Miami GP</th>
              <th className="px-4 py-2">Monaco GP</th>
              <th className="px-4 py-2">TOTAL POINTS</th>
            </tr>
          </thead>
          <tbody>
            {standings.map((entry, index) => (
              <tr key={index}>
                <td className="border border-[#11072C] px-4 py-2 bg-[#A72AEB]">{entry.no}</td>
                <td className="border border-[#11072C] px-4 py-2 bg-[#23124F]">{entry.name}</td>
                {entry.results.map((result, idx) => (
                  <td key={idx} className="border border-[#11072C] px-4 py-2 bg-[#23124F]">{result}</td>
                ))}
                <td className="border border-[#11072C] px-4 py-2 bg-[#A72AEB]">{entry.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StandingsPopup;
