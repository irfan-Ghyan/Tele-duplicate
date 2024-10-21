import React from 'react';

const menuItems = [
  { category: 'WATER', items: [{ name: 'Aqua Panna 50 cl', price: '18' }, { name: 'San Pellegrino 50 cl', price: '18' }] },
  { category: 'PASTRIES & BAKERY', items: [{ name: 'Chocolate Pastry', price: '16' }, { name: 'Cheese Croissant', price: '16' }, { name: 'Butter Croissant', price: '14' }, { name: 'Pastes de Nata', price: '13' }] },
  { category: 'MILKSHAKES', items: [{ name: 'Chocolate', price: '26' }, { name: 'Strawberry', price: '26' }, { name: 'Vanilla', price: '26' }, { name: 'Daily Special', price: '36' }, { name: 'Oreo Vanilla', price: '36' }, { name: 'Caramel Popcorn', price: '36' }, { name: 'Lotus', price: '36' }, { name: 'Bubble Gum', price: '36' }] },
  { category: 'HOT BEVERAGES', items: [{ name: 'Spanish Latte', price: '28' }, { name: 'Caramel Latte', price: '28' }, { name: 'Turkish Coffee', price: '28' }, { name: 'Mocha', price: '28' }, { name: 'Americano', price: '25' }, { name: 'Cappuccino', price: '24' }, { name: 'Latte', price: '24' }, { name: 'Cortado', price: '24' }, { name: 'Espresso Conpana', price: '21' }, { name: 'Espresso Macchiatto', price: '21' }, { name: 'Espresso / Ristretto', price: '19' }, { name: 'Hot Chocolate', price: '18' }] },
  { category: 'ICED COFFEES', items: [{ name: 'Espresso and Caramel Frappe Crème', price: '40' }, { name: 'Frappe Mocha', price: '35' }, { name: 'Iced Latte', price: '25' }, { name: 'Iced Spanish Latte', price: '25' }, { name: 'Iced Americano', price: '25' }] },
  { category: 'MOCKTAILS', items: [{ name: 'Strawberry Mojito', price: '35' }, { name: 'Passion Fruit Mojito', price: '35' }, { name: 'Apple Mojito', price: '35' }, { name: 'Peach Iced Tea', price: '25' }, { name: 'Lemon Iced Tea', price: '25' }, { name: 'Raspberry Iced Tea', price: '25' }, { name: 'Passion Fruit Iced Tea', price: '25' }, { name: 'Sicilian Lemonade', price: '25' }, { name: 'Strawberry Lemonade', price: '25' }] },
  { category: 'PROTEIN SHAKES', items: [{ name: 'Banana', price: '20' }, { name: 'Chocolate', price: '20' }] },
  { category: 'TEA', items: [{ name: 'English Breakfast', price: '22' }, { name: 'Chamomile Tea', price: '22' }, { name: 'Peppermint Tea', price: '22' }, { name: 'Earl Grey', price: '22' }, { name: 'Green Tea', price: '22' }] },
  { category: 'SOFTDRINKS', items: [{ name: 'Red Bull', price: '26' }, { name: 'Sugar Free Red Bull', price: '26' }, { name: 'Coca Cola', price: '18' }, { name: 'Diet Coca Cola', price: '18' }, { name: '7 UP', price: '18' }] },
  { category: 'ADD-ONS', items: [{ name: 'Espresso', price: '8' }, { name: 'Whipped Cream', price: '5' }, { name: 'Syrup', price: '5' }] },
];

const page = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-transparent text-white rounded-lg shadow-lg">
      <h1 className="text-[34px] md:text-[54px] text-white font-black font-orbitron mb-6 text-center">MENU</h1>
      {menuItems.map((section, index) => (
        <div key={index} className="mb-8">
          <h2 className="text-2xl text-white font-black font-orbitron mb-4 border-b border-gray-700 pb-2">{section.category}</h2>
          <div className="grid grid-cols-2 gap-4 px-2 md:px-4 lg:px-8 xl:px-8">
            {section.items.map((item, idx) => (
              <div key={idx} className="flex justify-between px-2 md:px-4 lg:px-8 xl:px-8">
                <span className="text-[14px] text-white font-bold font-jura">{item.name}</span>
                <span className="text-[14px] text-white font-bold font-jura">{item.price}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default page;


