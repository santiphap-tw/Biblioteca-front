import React, { useState, useEffect } from "react";

const ItemManager = (props) => {

    const [items, setItems] = useState({});
    const [message, setMessage] = useState("");

    async function fetchItems() {
        const url = "http://localhost:8080/show";
        const type = props.type !== "all" ? "/" + props.type : "";
        const filter = props.filter !== "available" ? "/" + props.filter : "";
        const res = await fetch(url+type+filter);
        res.json().then(res => {
            setItems(res.response);
        });
    }

    async function doCheckout(name) {
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
            if(res.status === "SUCCESS") {
                fetchItems();
                props.update();
            }
            else setMessage(res.response);
        });
    }

    useEffect(() => {
        fetchItems();
    }, [props.needUpdate]);

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
                                <td>{item.available ? 
                                    <button className="btn btn-success" onClick={() => doCheckout(item.title)}>Check out</button> 
                                : ""}</td>
                            </tr>
                        </React.Fragment>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default ItemManager;