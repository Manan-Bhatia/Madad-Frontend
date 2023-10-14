import React from "react";
import { useEffect, useState } from "react";
import axios from "./api/axios";
import Card from "./Card";

function ItemList() {
    let [data, setData] = useState([]);
    let [searchData, setSearchData] = useState([]);
    useEffect(() => {
        axios
            .get("/donations/")
            .then((res) => {
                setData(res.data);
            })
            .catch((err) => console.log(err));
    }, []);
    useEffect(() => {
        const itemNames = data.map((item) => item.item_name);
        setSearchData(itemNames);
    }, [data]);
    let [matchingItems, setMatchingItems] = useState([]);
    function searchItems(inputValue) {
        const matching = searchData.filter((item) =>
            item.toLowerCase().includes(inputValue.toLowerCase().trim())
        );
        setMatchingItems(matching);
    }
    return (
        <>
            <input
                type="text"
                placeholder="Search"
                className="border-2 p-2"
                onChange={(e) => {
                    searchItems(e.target.value);
                }}
            />
            <div className="grid gap-y-4 grid-cols-5 items-center place-items-center">
                {matchingItems.length > 1
                    ? data.map((item) => {
                          matchingItems.map((matchingItem) => {
                              if (item === matchingItem)
                                  return <Card key={item.d_id} {...item} />;
                          });
                      })
                    : data.map((item) => <Card key={item.d_id} {...item} />)}
            </div>
        </>
    );
}

export default ItemList;
