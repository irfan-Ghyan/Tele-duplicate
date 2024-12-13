'use client';

import { useState, useEffect } from 'react';

const PlanSelectorVip = ({ onPlanChange }) => {
  const [selectedPlan, setSelectedPlan] = useState('platinum');


  useEffect(() => {
    onPlanChange("120 mins");
  }, [onPlanChange]);

  const handlePlanChange = (plan) => {
    setSelectedPlan(plan);

    let duration = "";
    switch (plan) {
      case "platinum":
        duration = "120 mins";
        break;
      default:
        duration = "120 mins";
    }
    onPlanChange(duration); 
  };

  return (
    <div>
      <form className="flex mt-[27px] gap-x-2">
        <label className="button-slanted w-[200px] h-[55px] px-4 py-4 bg-opacity-50 buton border-[1px] border-[#063828] font-jura font-bold text-[#063828] hover:text-[#c09e5f] hover:bg-gradient-to-r to-[#063828] from-[#002718] transition duration-300 rounded-tl-lg rounded-br-lg hover:border-0">
          <input
            type="radio"
            name="plan"
            value="platinum"
            checked={selectedPlan === 'platinum'}
            onChange={() => handlePlanChange('platinum')}
            className="button-slanted-content form-radio text-[#c09e5f] transition duration-150 ease-in-out w-[17px] h-[17px]"
          />
          <span className="ml-2 font-jura font-normal md:font-bold">120 Mins</span>
        </label>
      </form>
    </div>
  );
};

export default PlanSelectorVip;
