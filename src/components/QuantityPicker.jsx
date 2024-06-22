import React, { useState } from 'react';

const QuantityPicker = ({ min, max, value, setValue}) => {
  const [disableDec, setDisableDec] = useState(true);
  const [disableInc, setDisableInc] = useState(false);

  const increment = () => {
    const plusState = value + 1;
    if (value < max) {
      setValue(plusState);
      setDisableDec(false);
    }
    if (value === max - 1) {
      setDisableInc(true);
    }
    if (value === min) {
      setDisableDec(false);
    }
  };

  const decrement = () => {
    const minusState = value - 1;
    if (value > min) {
      setValue(minusState);
      if (value === min + 1) {
        setDisableDec(true);
      }
    } else {
      setValue(min);
    }
    if (value === max) {
      setDisableInc(false);
    }
  };

  return (
    <span className="quantity-picker">
      <button
        className={`${disableDec ? 'mod-disable ' : ''}quantity-modifier modifier-left`}
        onClick={decrement}
        disabled={disableDec}
      >
        &ndash;
      </button>
      <input
        className="quantity-display"
        type="text"
        value={value}
        readOnly
      />
      <button
        className={`${disableInc ? 'mod-disable ' : ''}quantity-modifier modifier-right`}
        onClick={increment}
        disabled={disableInc}
      >
        &#xff0b;
      </button>
    </span>
  );
};

export default QuantityPicker;
