import React, { useState } from "react";

const ItemManager = ({profile, items, update}) => {

    const [message, setMessage] = useState("");

    const doCheckout = async (name) => {
        const res = await fetch("http://localhost:8080/checkout", {
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
        <div className="ItemManager">
            {message !== "" && (alert(message) || true) && setMessage("")}
            <table className="table w-auto mx-auto">
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Information</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.values(items).sort((item_a,item_b) => {
                        if(item_a.available && !item_b.available) return -1;
                        if(!item_a.available && item_b.available) return 1;
                        if(profile && item_a.borrower && item_b.borrower){
                            if(item_a.borrower.id === profile.id && item_b.borrower.id !== profile.id) return -1;
                            if(item_a.borrower.id !== profile.id && item_b.borrower.id === profile.id) return 1;
                        }
                        return 0;
                    }).map(item => 
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
                                <td>{item.available ? profile ?
                                    <button className="btn btn-success" onClick={() => doCheckout(item.title)}>Check out</button> : ""
                                : profile && profile.id === item.borrower.id ? 
                                    <button className="btn btn-danger"  onClick={() => doReturn(item.title)}>Return</button>
                                    : <button className="btn btn-secondary" disabled="1">Not available</button>}</td>
                            </tr>
                        </React.Fragment>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default ItemManager;