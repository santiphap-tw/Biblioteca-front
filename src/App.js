import React, { useState, useEffect } from "react";
import UserManager from './User.js';

function App() {
  return (
    <div className="App">
      <WelcomeMessage />
      <UserManager />
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