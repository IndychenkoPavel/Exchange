import React, { useState, useEffect } from "react";
import axios from "axios";
import transfer from './transfer.png'

const Currency = ({date}) => {
  const [oneCurrecy, setOneCurrecy] = useState("");
  const [twoCurrecy, setTwoCurrecy] = useState("");
  const [oneSelect, setOneSelect] = useState("UAH");
  const [twoSelect, setTwoSelect] = useState("USD");
  const [nowCurrencyUSD, setNowCurrencyUSD] = useState("");
  const [nowCurrencyEUR, setNowCurrencyEUR] = useState("");
  const [currencyWorking, setCurrencyWorking] = useState([]);

  const currencyArr = ["UAH", "USD", "EUR"];
  
  const nowCurrencyFn = async () => {
    const urlUSD = `https://api.exchangerate.host/latest?/source=ecb&base=USD`;
    const urlEUR = `https://api.exchangerate.host/latest?/source=ecb&base=EUR`;
    // api выдает разные значения курса валют при изменении базовой валюты, если делать с одним запросом api тогда курс валют будет отличаться от конвертирумого результата 
    try {
      const responseUSD = await axios.get(urlUSD);
      const responseEUR = await axios.get(urlEUR);
      const resultUSD = responseUSD.data.rates.UAH;
      const resultEUR = responseEUR.data.rates.UAH;
      const fixResultUSD = resultUSD.toFixed(2);
      const fixResultEUR = resultEUR.toFixed(2);
      setNowCurrencyUSD(fixResultUSD);
      setNowCurrencyEUR(fixResultEUR);
      const pushCurrency = [oneSelect, twoSelect]
      setCurrencyWorking(pushCurrency)
    } catch (error) {
      console.error(error);
      alert("возникла ошибка, попробуйте снова");
    }
  };
  nowCurrencyFn();

  useEffect(() => {
    const urlBase = `https://api.exchangerate.host/latest?/source=ecb&base=${oneSelect}`;

    if (oneCurrecy === "") return;

    const dataRes = async () => {
      try {
        const response = await axios.get(urlBase);
          const oneResult = oneCurrecy * response.data.rates[twoSelect];
          const fixOneResualt = oneResult.toFixed(2);
          setTwoCurrecy(fixOneResualt);
          nowCurrencyFn();
      } catch (error) {
        console.error(twoCurrecy);
        alert("возникла ошибка, попробуйте снова");
      }
    };
    dataRes();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [oneCurrecy, twoCurrecy, oneSelect, twoSelect]);

  const reverseFunction = () => {
    const reverseArr = currencyWorking.reverse();
    setOneSelect(reverseArr[0])
    setTwoSelect(reverseArr[1])
  }
  return (
    <form className="form">
      <div className="info-block">
        <div className="date">
        
            {date}
          </div>
        <div className="currency-block">
          USD: {nowCurrencyUSD}, EUR: {nowCurrencyEUR}
        </div>
      </div>
    <div className="form-box">
    <div className="left-block">
        <select
          className="two-select"
          value={oneSelect}
          onChange={(e) => setOneSelect(e.target.value)}
        >
          {currencyArr.map((item, inx) => (
            <option key={inx} className="option-form" value={item}>
              {item}
            </option>
          ))}
        </select>
        <input
          type="text"
          value={oneCurrecy}
          onChange={(e) => setOneCurrecy(e.target.value.replace(/\D/, ""))}
        />
      </div>
      <div className="reverse"
        onClick={reverseFunction}> <img src={transfer} alt="" /> </div>
      <div className="right-block">
        <select
          className="one-select"
          value={twoSelect}
          onChange={(e) => setTwoSelect(e.target.value)}
        >
          {currencyArr.map((item, inx) => (
            <option key={inx} className="option-form" value={item}>
              {item}
            </option>
          ))}
        </select>

        <input
          type="text"
          value={twoCurrecy}
          onChange={(e) => setTwoCurrecy(e.target.value.replace(/\D/, ""))}
        />
      </div>
    </div>


    </form>
  );
};

export default Currency;
