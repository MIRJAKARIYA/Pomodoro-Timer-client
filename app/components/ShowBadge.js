import React from "react";

const ShowBadge = ({badges}) => {
  const badgeImages = [
    "https://i.ibb.co.com/GCNZkTZ/day-3-removebg-preview.png",
    "https://i.ibb.co.com/2Z5xR08/day-7-removebg-preview.png",
    "https://i.ibb.co.com/V24SDDQ/day-10-removebg-preview.png",
    "https://i.ibb.co.com/8YHsrfK/day-15-removebg-preview.png",
    "https://i.ibb.co.com/bsMG3X3/day-20-removebg-preview.png",
    "https://i.ibb.co.com/KKCg3H8/day-25-removebg-preview.png",
    "https://i.ibb.co.com/KsbQwhH/day-30-removebg-preview.png"
  ];
  console.log(badges)

  const result = Object.entries(badges)
    .map(([key, value], index) => (value === 1 ? { [key]: badgeImages[index] } : null))
    .filter((item) => item !== null);
    console.log(result)

  return     <div className="  h-[200px] flex items-center  md:left-[38%] top-[20%] p-6 absolute">
  
  <div className="flex gap-6">
    {result.map((item, index) => {
      const [key, image] = Object.entries(item)[0]; // Extract key and image
      return (
        <div
          key={index}
          className="bg-white border rounded-lg shadow-md hover:shadow-lg transition transform hover:-translate-y-1 overflow-hidden"
        >
          <img src={image} alt={key} className="w-full h-32 object-cover border-b" />
          <p className="text-center text-lg font-semibold text-gray-700 p-4">{key}</p>
        </div>
      );
    })}
  </div>
</div>;
};

export default ShowBadge;
