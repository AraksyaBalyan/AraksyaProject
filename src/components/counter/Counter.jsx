import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  const handleIncrement = () => {
    setCount(count + 1);
  };

  const handleDecrement = () => {
    setCount(count - 1);
  };

  let counterText;
  if (count < 0) {
    counterText = "Negative";
  } else if (count > 0) {
    counterText = "Positive";
  } else {
    counterText = "Zero";
  }

  return (
    <div>
      <button onClick={handleIncrement}>+</button>
      <span>{count}</span>
      <button onClick={handleDecrement}>-</button>
      <div>{counterText}</div>
    </div>
  );
}

export default Counter;