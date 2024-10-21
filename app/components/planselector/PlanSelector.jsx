import { useState } from 'react';

const PlanSelector = () => {
  const [selectedPlan, setSelectedPlan] = useState('bronze');

  return (
    <div >
      <form className="flex mt-[27px] gap-x-2">
        <label className="button-slanted w-[330px] h-[55px] px-16 py-4 font-jura font-bold text-white bg-gradient-to-r to-[#7E51F8] from-[#D00746]  transition duration-300 rounded-tl-lg rounded-br-lg hover:border-0">
          <input
            type="radio"
            name="plan"
            value="bronze"
            checked={selectedPlan === 'bronze'}
            onChange={() => setSelectedPlan('bronze')}
            className="text-center button-slanted-content form-radio text-white transition duration-150 ease-in-out w-[17px] h-[17px]"
          />
          <span className="ml-4 font-jura font-normal md:font-bold">Bronze - 45Mins</span>
        </label>
        <label className="button-slanted w-[330px] h-[55px] px-16 py-4 bg-opacity-50 buton border-[1px] border-white font-jura font-bold text-white hover:bg-gradient-to-r hover:to-[#7E51F8] hover:from-[#D00746]  transition duration-300 rounded-tl-lg rounded-br-lg hover:border-0">
          <input
            type="radio"
            name="plan"
            value="silver"
            checked={selectedPlan === 'silver'}
            onChange={() => setSelectedPlan('silver')}
            className="button-slanted-content form-radio text-white transition duration-150 ease-in-out w-[17px] h-[17px]"
          />
          <span className=" ml-4 font-jura font-normal md:font-bold">Silver - 45Mins</span>
        </label>
      </form>
    </div>
  );
};

export default PlanSelector;
