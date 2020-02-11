import React, { useState, useEffect } from "react";
import UserManagement from './User.js';
import ItemManagement from './Items.js';

const App = () => {
  const  [needUpdate, setUpdate] =  useState(true);
  const  [items, setItems] =  useState({});
  const  [profile, setProfile] =  useState({});

  const fetchItems = async () => {
    const res = await fetch("http://localhost:8080/show/all");
    res.json().then(res => {
        setItems(res.response);
    }).catch(err => {});
  };

  const fetchProfile = async () => {
    const res = await fetch("http://localhost:8080/profile");
    res.json().then(res => {
        if(res.status === "SUCCESS") setProfile(res.response);
        else setProfile(null);
    }).catch(err => {});
  };

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
          <ItemManagement profile={profile} items={items} update={() => setUpdate(true)} />
        </div>
        <div className="col">
          <UserManagement profile={profile} update={() => setUpdate(true)} />
        </div>
      </div>
    </div>
  );
}

const WelcomeMessage = () => {
  const  [response, setResponse] =  useState({});

  const fetchData = async () => {
    const res = await fetch("http://localhost:8080");
    res.json().then(res => setResponse(res))
    .catch(err => {});
  };

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