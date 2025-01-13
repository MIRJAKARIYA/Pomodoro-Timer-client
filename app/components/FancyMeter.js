import { useState } from "react";

const FancyMeter = () => {
  const max = 150; // Maximum value
  const [value, setValue] = useState(0); // Current value state

  // Calculate the percentage
  const percentage = Math.min((value / max) * 100, 100);

  // Handle input change
  const handleInputChange = (e) => {
    const inputValue = Math.max(0, Math.min(max, e.target.value)); // Clamp value between 0 and max
    setValue(inputValue);
  };

  return (

        <div
        className=" w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 rounded-full flex items-center justify-center overflow-hidden"
        style={{
          background: `conic-gradient(
            green 0%,
            yellow ${percentage}%,
            lightgray ${percentage}%
          )`,
        }}
      >
  
    </div>
  );
};

export default FancyMeter;
