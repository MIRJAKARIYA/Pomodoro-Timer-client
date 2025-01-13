import React, { useState } from 'react';
import "./strepper.css";
const Strepper = ({data}) => {
const steps = Array.from({ length: 30 }, (_, i) => i + 1);
console.log(steps)
const arr=[3,7,10,15,20,25,30]
    return (
        <>
        
      <div className="flex justify-between ">
        {steps?.map((step, i) => (
          <div
            key={i}
            className={`step-item ${step<=data?.currentStreak && "active"}`}
          >
            <div className={`step`}>
              {step}
            </div>
            <p className="text-gray-500 invisible">{step}</p>
          </div>
        ))}
      </div>

    </>
    );
};

export default Strepper;