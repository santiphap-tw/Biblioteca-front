import React, { useState, useEffect } from "react";

const ItemManager = (props) => {

    const [items, setItems] = useState({});
    const [status, setStatus] = useState("FAIL");

    async function fetchItems() {
        const url = "http://localhost:8080/show";
        const type = props.type !== "all" ? "/" + props.type : "";
        const filter = props.filter !== "available" ? "/" + props.filter : "";
        const res = await fetch(url+type+filter);
        res.json().then(res => {
            setStatus(res.status);
            setItems(res.response);
        });
    }

    useEffect(() => {
        fetchItems();
    }, [status]);

    return (
        <div className="ItemManager">
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
                                    <button className="btn btn-success">Check out</button> 
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