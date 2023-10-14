import React from "react";
import { useEffect, useState } from "react";
import axios from "./api/axios";
import Card from "./Card";

function ItemList() {
    let [data, setData] = useState([]);
    console.log(data);
    useEffect(() => {
        axios
            .get("/donations/")
            .then((res) => {
                setData(res.data);
            })
            .catch((err) => console.log(err));
    }, []);
    return (
        <>
            <input type="text" placeholder="Search" className="border-2 p-2"/>
            <div className="grid gap-y-4 grid-cols-5 items-center place-items-center">
                {data.map((item) => (
                    <Card key={item.d_id} {...item} />
                ))}
            </div>
        </>
    );
}

export default ItemList;
