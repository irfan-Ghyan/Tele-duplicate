
import { useState } from 'react';

const PlanSelectorVip = ({ onPlanChange }) => {
  const [selectedPlan, setSelectedPlan] = useState('bronze');

  const handlePlanChange = (plan) => {
    setSelectedPlan(plan);
    let duration = 60; 

    switch (plan) {
      case 'bronze':
        duration = 60;
        break;
      case 'silver':
        duration = 90;
        break;
      case 'gold':
        duration = 120;
        break;
      default:
        duration = 60;
    }
   
    onPlanChange(duration);
  };

  return (
    <div>
      <form className="flex flex-col md:flex-row lg:flex-row xl:flex-row mt-[27px] gap-2">
        {['bronze', 'silver', 'gold'].map((plan) => (
          <label
            key={plan}
            className={`button-slanted w-full h-auto px-4 py-4 font-jura font-bold text-[#00352F] transition duration-300 rounded-tl-lg rounded-br-lg ${
              selectedPlan === plan
                ? 'active-duration bg-gradient-to-r to-[#00352F] from-[#00352F]'
                : 'bg-opacity-50 border-[1px] border-[#00352F] text-[#00352F] hover:text-[#c09e5f] hover:bg-gradient-to-r to-[#00352F] from-[#00352F]'
            }`}
          >
            <input
              type="radio"
              name="plan"
              value={plan}
              checked={selectedPlan === plan}
              onChange={() => handlePlanChange(plan)}
              className="form-radio text-[#063828] transition duration-150 ease-in-out w-[17px] h-[17px]"
            />
            <span className="ml-2 font-jura font-normal md:font-bold">
              {plan === 'bronze' ? '60 Mins' : plan === 'silver' ? '90 Mins' : '120 Mins'}
            </span>
          </label>
        ))}
      </form>
    </div>
  );
};

export default PlanSelectorVip;

