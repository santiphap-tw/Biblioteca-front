import React, { useState, useEffect } from "react";

const UserManager = () => {
    const [isLogin, setLogin] = useState(false);
    const [profile, setProfile] = useState({});

    async function fetchProfile() {
        const res = await fetch("http://localhost:8080/profile");
        res.json().then(res => {
            if (res.status === "FAIL") {
                setLogin(false);
            }
            else {
                setLogin(true);
                setProfile(res.response);
            }
        });
    }

    useEffect(() => {
        fetchProfile();
    }, [isLogin]);

    return (
        <div className="UserManager">
            <div className="my-3">
                {!isLogin && <UserLogin callback={fetchProfile}/>}
                {isLogin && <UserProfile value={profile} callback={fetchProfile} />}
            </div>
        </div>
    );
}

const UserProfile = (parent) => {

    async function doLogout() {
        const res = await fetch("http://localhost:8080/logout", {
            method: 'POST'
        });
        res.json().then(res => {
            if(res.status === "SUCCESS") parent.callback();
        });
    }

    return (
        <div className="UserProfile">
            <div className="card mx-auto p-0" style={{ width: 18 + 'rem' }}>
                <div className="card-body text-left px-3 pt-3 pb-0">
                    <p className="text-center font-weight-bold">Member Info</p>
                    <p>ID: {parent.value.id}</p>
                    <p>Name: {parent.value.name}</p>
                    <p>Email: {parent.value.email}</p>
                    <p>Phone: {parent.value.phone}</p>
                    <p className="text-center">
                        <input type="button" className="btn btn-primary" value="Logout" onClick={doLogout}/>
                    </p>
                </div>
            </div>
        </div>
    );
}

const UserLogin = (parent) => {
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    async function doLogin() {
        const res = await fetch("http://localhost:8080/login", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: id,
                password: password
            })
        });
        res.json().then(res => {
            setMessage(res.response);
            if(res.status === "SUCCESS") parent.callback();
        });
    }

    function handleChange(event) {
        if(event.target.id === "inputId") setId(event.target.value);
        if(event.target.id === "inputPassword") setPassword(event.target.value);
    }

    return (
        <div className="UserLogin">
            <div className="card mx-auto p-0" style={{ width: 18 + 'rem' }}>
                <div className="card-body text-left px-3 pt-3 pb-0">
                    <form>
                        <div className="form-group">
                            <label>ID</label>
                            <input type="text" 
                                className="form-control" 
                                id="inputId" 
                                placeholder="Enter your id" 
                                onChange={handleChange}/>
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" 
                                className="form-control" 
                                id="inputPassword" 
                                placeholder="Enter your password" 
                                onChange={handleChange}/>
                        </div>
                        <p className="text-center">
                            <input type="button" className="btn btn-primary" value="Login" onClick={doLogin}/>
                        </p>
                        <p className="text-center">
                            {message}
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default UserManager;