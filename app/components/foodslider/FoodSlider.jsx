import { useState } from "react";

const panelsData = [
  { title: "Mocktails", image: "/assets/images/dome/pic-101.jpg" },
  { title: "Cocktails", image: "/assets/images/dome/pic-102.jpg" },
  { title: "Juices", image: "/assets/images/dome/slide1.png" },
  { title: "Coffee", image: "/assets/images/dome/pic-101.jpg" },
  { title: "Smoothies", image: "/assets/images/dome/pic-101.jpg" },

];

export default function FoodSlider() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="containerp">
      {panelsData.map((panel, index) => (
        <div
          key={index}
          className={`panel ${index === activeIndex ? "active" : ""}`}
          style={{ backgroundImage: `url(${panel.image})` }}
          onClick={() => setActiveIndex(index)}
        >
          <h3>{panel.title}</h3>
        </div>
      ))}
    </div>
  );
}
