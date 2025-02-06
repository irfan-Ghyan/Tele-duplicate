
import { useState } from 'react';

const PlanSelector = ({ onPlanChange }) => {
  const [selectedPlan, setSelectedPlan] = useState('bronze');

  const handlePlanChange = (plan) => {
    setSelectedPlan(plan);
    let duration = 20; 

    switch (plan) {
      case 'bronze':
        duration = 20;
        break;
      case 'silver':
        duration = 40;
        break;
      case 'gold':
        duration = 60;
        break;
      default:
        duration = 20;
    }

    onPlanChange(duration);
  };

  return (
    <div>
      <form className="flex flex-col md:flex-row lg:flex-row xl:flex-row mt-[27px] gap-2">
        {['bronze', 'silver', 'gold'].map((plan) => (
          <label
            key={plan}
            className={`button-slanted w-full h-auto px-4 py-4 font-jura font-bold text-[#c09e5f] transition duration-300 rounded-tl-lg rounded-br-lg ${
              selectedPlan === plan
                ? 'active-duration bg-gradient-to-r to-[#063828] from-[#002718]'
                : 'bg-opacity-50 border-[1px] border-[#063828] text-[#063828] hover:text-[#c09e5f] hover:bg-gradient-to-r to-[#063828] from-[#002718]'
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
              {plan === 'bronze' ? '20 Mins' : plan === 'silver' ? '40 Mins' : '60 Mins'}
            </span>
          </label>
        ))}
      </form>
    </div>
  );
};

export default PlanSelector;

