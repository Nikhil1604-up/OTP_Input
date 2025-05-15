import { useEffect, useRef, useState } from "react";
import "./styles.css";

// OTP Input -> only numbers are allowed
// Typing on input box takes me to next input box

const OTP_DIGIT_COUNTS = 5;

export default function App() {
  const [otpInputArray, setOtpInputArray] = useState(
    new Array(OTP_DIGIT_COUNTS).fill("")
  );

  const inputRef = useRef([]);

  useEffect(() => {
    inputRef.current[0]?.focus();
  }, []);

  const handleOtpInputChange = (value, indexToUpdate) => {
    if (isNaN(value)) return;
    const updatedValue = value.trim();
    setOtpInputArray((prev) =>
      prev.map((item, index) =>
        index === indexToUpdate ? updatedValue?.slice(-1) : item
      )
    );

    updatedValue && inputRef.current[indexToUpdate + 1]?.focus();
  };
  const hanldeOtpKeyDown = (e, index) => {
    if (!e.target.value && e.key === "Backspace") {
      inputRef.current[index - 1]?.focus();
    }
  };
  return (
    <div className="App">
      <h1>OTP Input</h1>
      {otpInputArray.map((_, index) => {
        return (
          <input
            ref={(input) => (inputRef.current[index] = input)}
            className="otp-input"
            key={index}
            value={otpInputArray[index]}
            type="text"
            onChange={(e) => handleOtpInputChange(e.target.value, index)}
            onKeyDown={(e) => hanldeOtpKeyDown(e, index)}
          />
        );
      })}
    </div>
  );
}
