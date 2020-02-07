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
                {isLogin && profile.items && profile.items.length > 0 && <RentedItems value={profile} callback={fetchProfile} />}
            </div>
        </div>
    );
}

const UserProfile = (props) => {

    async function doLogout() {
        const res = await fetch("http://localhost:8080/logout", {
            method: 'POST'
        });
        res.json().then(res => {
            if(res.status === "SUCCESS") props.callback();
        });
    }

    return (
        <div className="UserProfile">
            <div className="card mx-auto p-0" style={{ width: 18 + 'rem' }}>
                <div className="card-body text-left px-3 pt-3 pb-0">
                    <p className="text-center font-weight-bold">Member Info</p>
                    <p>ID: {props.value.id}</p>
                    <p>Name: {props.value.name}</p>
                    <p>Email: {props.value.email}</p>
                    <p>Phone: {props.value.phone}</p>
                    <p className="text-center">
                        <input type="button" className="btn btn-primary" value="Logout" onClick={doLogout}/>
                    </p>
                </div>
            </div>
        </div>
    );
}

const UserLogin = (props) => {
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
            if(res.status === "SUCCESS") props.callback();
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

const RentedItems = (props) => {

    const items = props.value.items;

    return (
        <div className="RentedItems">
            <table className="table w-auto mx-auto my-3">
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Information</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.values(items).map(item => 
                        <React.Fragment key={item.title}>
                            <tr>
                                <td>{item.title}</td>
                                <td>
                                    {Object.entries(item)
                                        .filter(([key, value]) => key !== "title" && key !== "available" && key !== "borrower")
                                        .map(([key, value]) => 
                                            <React.Fragment key={key}>
                                                <p className="m-0 small"><i>{key}</i>: {value}</p>
                                            </React.Fragment>
                                    )}
                                </td>
                                <td>{
                                        <button className="btn btn-danger">Return</button> 
                                    }
                                </td>
                            </tr>
                        </React.Fragment>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default UserManager;