import React from "react";
import Currency  from "./Currency";


function App() {
  const date = new Date().toLocaleString();

  return (

    <div className="App">
      <h2 className="title">КОНВЕРТЕР ВАЛЮТ</h2>
      <Currency date={date}/>
    </div>
  );
}

export default App;
