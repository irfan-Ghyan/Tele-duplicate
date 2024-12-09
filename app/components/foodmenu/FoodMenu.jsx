import React from "react";

const FoodMenu = () => {
    const menuItems = [
        { id: 1, name: "Mansaf", description: "Traditional Jordanian dish with lamb and yogurt sauce.", price: "20 SAR" },
        { id: 2, name: "Kabsa", description: "Saudi rice dish with meat, spices, and vegetables.", price: "25 SAR" },
        { id: 3, name: "Shawarma", description: "Grilled meat served with garlic sauce and pita bread.", price: "15 SAR" },
        { id: 4, name: "Baklava", description: "Sweet pastry filled with nuts and honey.", price: "10 SAR" },
        { id: 5, name: "Hummus", description: "Creamy chickpea dip served with olive oil and pita.", price: "12 SAR" },
        { id: 6, name: "Falafel", description: "Deep-fried balls made from ground chickpeas or fava beans.", price: "8 SAR" },
        { id: 7, name: "Tabbouleh", description: "Lebanese salad with parsley, tomatoes, and bulgur.", price: "14 SAR" },
        { id: 8, name: "Fattoush", description: "Levantine salad with toasted bread and fresh vegetables.", price: "14 SAR" },
        { id: 9, name: "Kunafa", description: "Sweet cheese pastry soaked in syrup.", price: "18 SAR" },
        { id: 10, name: "Mandi", description: "Yemeni dish of spiced rice and meat cooked underground.", price: "30 SAR" },
        { id: 11, name: "Sambousek", description: "Pastry filled with spiced meat or cheese.", price: "10 SAR" },
        { id: 12, name: "Warak Enab", description: "Grape leaves stuffed with rice and meat.", price: "15 SAR" },
        { id: 13, name: "Mutabbal", description: "Smoky eggplant dip with tahini and olive oil.", price: "12 SAR" },
        { id: 14, name: "Kebabs", description: "Grilled meat skewers served with rice or bread.", price: "22 SAR" },
        { id: 15, name: "Umm Ali", description: "Egyptian bread pudding with nuts and raisins.", price: "16 SAR" },
        { id: 16, name: "Maqlooba", description: "Upside-down rice dish with vegetables and meat.", price: "28 SAR" },
        { id: 17, name: "Shakshuka", description: "Poached eggs in spiced tomato and pepper sauce.", price: "18 SAR" },
        { id: 18, name: "Luqaimat", description: "Sweet fried dough balls drizzled with syrup.", price: "8 SAR" },
        { id: 19, name: "Fatayer", description: "Baked pastries with spinach, cheese, or meat filling.", price: "10 SAR" },
        { id: 20, name: "Koshari", description: "Egyptian dish of rice, lentils, and pasta with tomato sauce.", price: "20 SAR" },
        { id: 21, name: "Freekeh", description: "Roasted green wheat cooked with meat or chicken.", price: "22 SAR" },
        { id: 22, name: "Basbousa", description: "Sweet semolina cake soaked in syrup.", price: "10 SAR" },
        { id: 23, name: "Qatayef", description: "Sweet stuffed pancakes filled with nuts or cream.", price: "12 SAR" },
        { id: 24, name: "Muhammara", description: "Red pepper and walnut dip with olive oil.", price: "12 SAR" },
        { id: 25, name: "Harira", description: "Moroccan soup with lentils, chickpeas, and tomatoes.", price: "18 SAR" },
      ];
      

  return (
    <div className="bg-[#c09e5f]">
      <div className="overflow-x-auto">
        <table className="table-auto w-full text-left border border-[#002718]">
          <thead className="bg-[#002718] text-[#c09e5f]">
            <tr>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Description</th>
              <th className="px-4 py-2">Price</th>
            </tr>
          </thead>
          <tbody>
            {menuItems.map((item) => (
              <tr key={item.id} className="hover:bg-[#c09e5f]">
                <td className="border px-4 py-2">{item.id}</td>
                <td className="border px-4 py-2">{item.name}</td>
                <td className="border px-4 py-2">{item.description}</td>
                <td className="border px-4 py-2">{item.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FoodMenu;
