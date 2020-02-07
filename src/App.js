import React, { useState, useEffect } from "react";
import UserManager from './User.js';
import ItemManager from './Items.js';

function App() {
  const  [needUpdate, setUpdate] =  useState(true);

  useEffect(() => {
    setUpdate(false);
  }, [needUpdate]);

  return (
    <div className="App">
      <WelcomeMessage />
      <div className="row">
        <div className="col">
          <ItemManager filter="available" type="all" update={() => setUpdate(true)}  needUpdate={needUpdate} />
        </div>
        <div className="col">
          <UserManager update={() => setUpdate(true)}  needUpdate={needUpdate} />
        </div>
      </div>
    </div>
  );
}

const WelcomeMessage = () => {
  const  [response, setResponse] =  useState({});

  async function fetchData() {
    const res = await fetch("http://localhost:8080");
    res.json().then(res => setResponse(res));
  }

  useEffect(() => {
    fetchData();
  }, [setResponse]);

  return (
    <div className="WelcomeMessage">
      <div className="jumbotron h5 my-3 text-center">
        {response.response}
      </div>
    </div>
  );
}

export default App;