// import { useState } from 'react';

// const PlanSelector = () => {
//   const [selectedPlan, setSelectedPlan] = useState('bronze');

//   return (
//     <div >
//       <form className="flex mt-[27px] gap-x-2">
//         <label className="button-slanted w-[200px] h-[55px] px-4 py-4 font-jura font-bold text-[#c09e5f] bg-gradient-to-r to-[#063828] from-[#002718] transition duration-300 rounded-tl-lg rounded-br-lg hover:border-0">
//           <input
//             type="radio"
//             name="plan"
//             value="bronze"
//             checked={selectedPlan === '20min'}
//             onChange={() => setSelectedPlan('20min')}
//             className="text-center button-slanted-content form-radio text-[#063828] transition duration-150 ease-in-out w-[17px] h-[17px]"
//           />
//           <span className="ml-2 font-jura font-normal md:font-bold">20 Mins</span>
//         </label>
//         <label className="button-slanted w-[200px] h-[55px] px-4 py-4  bg-opacity-50 buton border-[1px] border-[#063828] font-jura font-bold text-[#063828] hover:text-[#c09e5f] hover:bg-gradient-to-r to-[#063828] from-[#002718] transition duration-300 rounded-tl-lg rounded-br-lg hover:border-0">
//           <input
//             type="radio"
//             name="plan"
//             value="silver"
//             checked={selectedPlan === '40min'}
//             onChange={() => setSelectedPlan('40min')}
//             className="button-slanted-content form-radio text-[#c09e5f] transition duration-150 ease-in-out w-[17px] h-[17px]"
//           />
//           <span className=" ml-2 font-jura font-normal md:font-bold">40 Mins</span>
//         </label>
//         <label className="button-slanted w-[200px] h-[55px] px-4 py-4  bg-opacity-50 buton border-[1px] border-[#063828] font-jura font-bold text-[#063828] hover:text-[#c09e5f] hover:bg-gradient-to-r to-[#063828] from-[#002718] transition duration-300 rounded-tl-lg rounded-br-lg hover:border-0">
//           <input
//             type="radio"
//             name="plan"
//             value="silver"
//             checked={selectedPlan === '60min'}
//             onChange={() => setSelectedPlan('60min')}
//             className="button-slanted-content form-radio text-[#c09e5f] transition duration-150 ease-in-out w-[17px] h-[17px]"
//           />
//           <span className=" ml-2 font-jura font-normal md:font-bold">60 Mins</span>
//         </label>
//         <label className="button-slanted w-[200px] h-[55px] px-4 py-4  bg-opacity-50 buton border-[1px] border-[#063828] font-jura font-bold text-[#063828] hover:text-[#c09e5f] hover:bg-gradient-to-r to-[#063828] from-[#002718] transition duration-300 rounded-tl-lg rounded-br-lg hover:border-0">
//           <input
//             type="radio"
//             name="plan"
//             value="silver"
//             checked={selectedPlan === '120min'}
//             onChange={() => setSelectedPlan('120min')}
//             className="button-slanted-content form-radio text-[#c09e5f] transition duration-150 ease-in-out w-[17px] h-[17px]"
//           />
//           <span className="ml-2 font-jura font-normal md:font-bold">120 Mins</span>
//         </label>
//       </form>
//     </div>
//   );
// };

// export default PlanSelector;



import { useState } from 'react';

const PlanSelector = ({ onPlanChange }) => {
  const [selectedPlan, setSelectedPlan] = useState('bronze');

  const handlePlanChange = (plan) => {
    setSelectedPlan(plan);
    // Call the parent component's function to update the duration
    let duration = "";
    switch (plan) {
      case "bronze":
        duration = "20 mins";
        break;
      case "silver":
        duration = "40 mins";
        break;
      case "gold":
        duration = "60 mins";
        break;
      case "platinum":
        duration = "120 mins";
        break;
      default:
        duration = "20 mins"; // default value
    }
    onPlanChange(duration); // Pass the selected duration to the parent component
  };

  return (
    <div>
      <form className="flex mt-[27px] gap-x-2">
        <label className="button-slanted w-[200px] h-[55px] px-4 py-4 font-jura font-bold text-[#c09e5f] bg-gradient-to-r to-[#063828] from-[#002718] transition duration-300 rounded-tl-lg rounded-br-lg hover:border-0">
          <input
            type="radio"
            name="plan"
            value="bronze"
            checked={selectedPlan === 'bronze'}
            onChange={() => handlePlanChange('bronze')}
            className="text-center button-slanted-content form-radio text-[#063828] transition duration-150 ease-in-out w-[17px] h-[17px]"
          />
          <span className="ml-2 font-jura font-normal md:font-bold">20 Mins</span>
        </label>
        <label className="button-slanted w-[200px] h-[55px] px-4 py-4 bg-opacity-50 buton border-[1px] border-[#063828] font-jura font-bold text-[#063828] hover:text-[#c09e5f] hover:bg-gradient-to-r to-[#063828] from-[#002718] transition duration-300 rounded-tl-lg rounded-br-lg hover:border-0">
          <input
            type="radio"
            name="plan"
            value="silver"
            checked={selectedPlan === 'silver'}
            onChange={() => handlePlanChange('silver')}
            className="button-slanted-content form-radio text-[#c09e5f] transition duration-150 ease-in-out w-[17px] h-[17px]"
          />
          <span className=" ml-2 font-jura font-normal md:font-bold">40 Mins</span>
        </label>
        <label className="button-slanted w-[200px] h-[55px] px-4 py-4 bg-opacity-50 buton border-[1px] border-[#063828] font-jura font-bold text-[#063828] hover:text-[#c09e5f] hover:bg-gradient-to-r to-[#063828] from-[#002718] transition duration-300 rounded-tl-lg rounded-br-lg hover:border-0">
          <input
            type="radio"
            name="plan"
            value="gold"
            checked={selectedPlan === 'gold'}
            onChange={() => handlePlanChange('gold')}
            className="button-slanted-content form-radio text-[#c09e5f] transition duration-150 ease-in-out w-[17px] h-[17px]"
          />
          <span className=" ml-2 font-jura font-normal md:font-bold">60 Mins</span>
        </label>
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

export default PlanSelector;
