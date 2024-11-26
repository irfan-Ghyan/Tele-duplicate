'use client';

import { useState, useEffect } from 'react';

const PlanSelectorVip = ({ onPlanChange }) => {
  // Initialize the selected plan as "platinum" by default
  const [selectedPlan, setSelectedPlan] = useState('platinum');

  // Trigger the default duration when the component mounts
  useEffect(() => {
    onPlanChange("60 mins");
  }, [onPlanChange]);

  const handlePlanChange = (plan) => {
    setSelectedPlan(plan);

    let duration = "";
    switch (plan) {
      case "platinum":
        duration = "60 mins";
        break;
      default:
        duration = "60 mins";
    }
    onPlanChange(duration); 
  };

  return (
    <div>
      <form className="flex mt-[27px] gap-x-2">
        <label className="button-slanted w-[200px] h-[55px] px-4 py-4 bg-opacity-50 buton  font-jura font-bold hover:text-[#c09e5f] transition duration-300 rounded-tl-lg rounded-br-lg hover:border-0 ">
          <input
            type="radio"
            name="plan"
            value="platinum"
            checked={selectedPlan === 'platinum'}
            onChange={() => handlePlanChange('platinum')}
            className="button-slanted-content form-radio text-[#c09e5f] transition duration-150 ease-in-out w-[17px] h-[17px]  form-radio border-2 border-black bg-transparent  focus:ring-0  "
          />
          <span className="ml-2 font-jura font-normal md:font-bold">60 Mins</span>
        </label>
      </form>
    </div>
  );
};

export default PlanSelectorVip;
