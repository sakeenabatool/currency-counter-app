import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import useCurrencyInfo from "./component/hooks/useCurrencyInfo";
import { InputBox } from "./component/index.js";
function App() {
  const [amount, setAmount] = useState(0);
  const [from, setFrom] = useState("usd");
  const [to, setTo] = useState("pkr");
  const [convertedAmount, setConvertedAmount] = useState(0);
  const swap = () => {
    setFrom(to);
    setTo(from);
    setConvertedAmount(amount);
    setAmount(convertedAmount);
  };
  const currencyInfo = useCurrencyInfo(from);
  const options = Object.keys(currencyInfo);
  const convert = () => {
    const result = amount * currencyInfo[to];
    setConvertedAmount(Number(result.toFixed(2)));
  };
  return (
    <div
      className="fixed inset-0 w-screen h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage:
          "url('https://images.pexels.com/photos/534216/pexels-photo-534216.jpeg')",
      }}
    >
      <div className="flex items-center justify-center h-full bg-black/50">
        <div className="w-full">
          <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                convert();
              }}
            >
              <div className="w-full">
                <InputBox
                  label="from"
                  amount={amount}
                  onAmountChange={(amount) => setAmount(amount)}
                  onCurrencyChange={(currency) => setFrom(currency)}
                  currencyOptions={options}
                  selectedCurrency={from}
                />
              </div>
              <div className="relative flex justify-center -my-4">
                <button onClick={swap} className=" text-white px-2 py-0.5">
                  Swap
                </button>
              </div>
              <div className="w-full mb-1">
                <InputBox
                  label="to"
                  amount={convertedAmount}
                  onAmountChange={(convertedAmount) =>
                    setConvertedAmount(convertedAmount)
                  }
                  onCurrencyChange={(currency) => setTo(currency)}
                  currencyOptions={options}
                  selectedCurrency={to}
                />
              </div>
              <button className=" text-white w-full m-1 px-5" type="submit">
                Convert
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
