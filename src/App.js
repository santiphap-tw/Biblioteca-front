import React, { useState, useEffect } from "react";
import UserManager from './User.js';
import ItemManager from './Items.js';

function App() {
  const  [needUpdate, setUpdate] =  useState(true);
  const  [items, setItems] =  useState({});
  const  [profile, setProfile] =  useState({});

  async function fetchItems() {
    const res = await fetch("http://localhost:8080/show");
    res.json().then(res => {
        setItems(res.response);
    });
  }

  async function fetchProfile() {
    const res = await fetch("http://localhost:8080/profile");
    res.json().then(res => {
        if(res.status === "SUCCESS") setProfile(res.response);
        else setProfile(null);
    });
  }

  useEffect(() => {
    fetchItems();
    fetchProfile();
    setUpdate(false);
  }, [needUpdate]);

  return (
    <div className="App">
      <WelcomeMessage />
      <div className="row">
        <div className="col">
          <ItemManager items={items} update={() => setUpdate(true)} />
        </div>
        <div className="col">
          <UserManager profile={profile} update={() => setUpdate(true)} />
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