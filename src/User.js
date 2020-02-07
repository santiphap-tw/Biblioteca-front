import React, { useState } from "react";

const UserManager = ({profile, update}) => {

    return (
        <div className="UserManager">
            <div className="my-3 row">
                {!profile && <UserLogin update={update}/>}
                {profile && 
                <div className="col">
                    <UserProfile profile={profile} update={update} />
                </div>}
                {profile && 
                profile.items && 
                profile.items.length > 0 && 
                <div className="col">
                    <RentedItems items={profile.items} update={update} className="col-6"/>
                </div>}
            </div>
        </div>
    );
}

const UserProfile = ({profile, update}) => {

    const doLogout = async () => {
        const res = await fetch("http://localhost:8080/logout", {
            method: 'POST'
        });
        res.json().then(res => {
            if(res.status === "SUCCESS") update();
        });
    };

    return (
        <div className="UserProfile">
            <div className="card mx-auto p-0" style={{ width: 18 + 'rem' }}>
                <div className="card-body text-left px-3 pt-3 pb-0">
                    <p className="text-center font-weight-bold">Member Info</p>
                    <p>ID: {profile.id}</p>
                    <p>Name: {profile.name}</p>
                    <p>Email: {profile.email}</p>
                    <p>Phone: {profile.phone}</p>
                    <p className="text-center">
                        <input type="button" className="btn btn-primary" value="Logout" onClick={doLogout}/>
                    </p>
                </div>
            </div>
        </div>
    );
}

const UserLogin = ({update}) => {
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const doLogin = async () => {
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
            if(res.status === "SUCCESS") update();
            else setMessage(res.response);
        });
    };

    const handleChange = (event) => {
        if(event.target.id === "inputId") setId(event.target.value);
        if(event.target.id === "inputPassword") setPassword(event.target.value);
    }

    return (
        <div className="UserLogin">
            {message !== "" && (alert(message) || true) && setMessage("")}
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
                    </form>
                </div>
            </div>
        </div>
    );
}

const RentedItems = ({items, update}) => {

    const [message, setMessage] = useState("");

    const doReturn = async (name) => {
        const res = await fetch("http://localhost:8080/return", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name
            })
        });
        res.json().then(res => {
            if(res.status === "SUCCESS") update();
            else setMessage(res.response);
        });
    };

    return (
        <div className="RentedItems">
            {message !== "" && (alert(message) || true) && setMessage("")}
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
                                        <button className="btn btn-danger" onClick={() => doReturn(item.title)}>Return</button> 
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