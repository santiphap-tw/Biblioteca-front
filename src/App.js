import React, { useState, useEffect } from "react";
import './App.css';

function App() {
  return (
    <div className="App">
      <WelcomeMessage />
    </div>
  );
}

const WelcomeMessage = () => {
  const  [error, setError] =  useState(false);
  const  [response, setResponse] =  useState({});

  async function fetchData() {
    const res = await fetch("http://localhost:8080");
    res.json()
      .then(res => setResponse(res))
      .catch(err => setError(err));
  }

  useEffect(() => {
    fetchData();
  });

  return (
    <div className="WelcomeMessage">
      <div class="jumbotron h5 my-3">
        {response.response}
      </div>
    </div>
  );
}

export default App;
