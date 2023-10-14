import React, { useEffect, useState } from "react";
import axios from "./api/axios";
const NOTIFICATION_URL = "/accounts/notifications";
const ACCEPT_URL = "/donations/approve/";

import Modal from "react-modal";

export default function Noti() {
    if (localStorage.getItem("token")) {
        axios.defaults.headers.common[
            "Authorization"
        ] = `Token ${localStorage.getItem("token")}`;
    }
    const [notifications, setNotifications] = useState([]);
    const [rating, setRating] = useState(0);

    function handleStarClick(value) {
        setRating(value);
    }

    useEffect(() => {
        axios
            .get(NOTIFICATION_URL)
            .then((res) => {
                setNotifications(res.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);
    console.log(notifications);

    const handleOnAccept = (id) => {
        axios
            .get(ACCEPT_URL + id)
            .then((res) => {
                console.log(res);
                alert("Request Accepted");
            })
            .catch((err) => console.log(err));
    };
    let [err, setErr] = useState("");
    useEffect(() => {
        let timer;
        if (err) {
            timer = setTimeout(() => {
                setErr("");
            }, 3000);
        }
        return () => clearTimeout(timer);
    }, [err]);
    const handleRateClick = (id) => {
        id = id.slice(13, id.length);
        id = "donations/" + id;
        axios
            .post(id, { rating: { rating } })
            .then((res) => console.log(res))
            .catch((err) => {
                console.log(err.response.data.msg);
                setErr(err.response.data.msg);
            });
        setRating(0);
    };
    const [modalIsOpen, setModalIsOpen] = useState(false);
    function openModal() {
        setModalIsOpen(true);
    }
    function closeModal() {
        setModalIsOpen(false);
    }

    return (
        <>
            <div className="px-8 py-10 flex flex-col gap-4">
                <h2 className="text-pink font-poppins text-4xl">
                    Your Notifications
                </h2>
                {notifications.map((notification) => (
                    <div
                        key={notification.id}
                        className="bg-white p-5 text-inter rounded-md shadow-xl"
                    >
                        {notification.is_req ? (
                            <div>
                                <h3 className="font-poppins text-2xl text-bold font-blue">
                                    {notification.heading}
                                </h3>
                                <p className="text-md text-blue font-inter pt-2">
                                    {notification.body}
                                </p>
                                <div>
                                    <button
                                        onClick={() =>
                                            handleOnAccept(notification.id)
                                        }
                                        className="bg-pink font-inter p-2 text-md rounded-md text-white mt-3"
                                    >
                                        Accept
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <>
                                {notification.body[0] === "a" ? (
                                    <>
                                        <h3 className="font-poppins text-2xl text-bold font-blue">
                                            {notification.heading}
                                        </h3>
                                        <div>
                                            <button
                                                onClick={openModal}
                                                className="bg-pink font-inter p-2 text-md rounded-md text-white mt-3"
                                            >
                                                Rate
                                            </button>
                                            <Modal
                                                isOpen={modalIsOpen}
                                                onRequestClose={closeModal}
                                                style={{
                                                    overlay: {
                                                        backgroundColor:
                                                            "rgba(0, 0, 0, .25)",
                                                    },
                                                    content: {
                                                        backgroundColor: "#fff",
                                                        borderRadius: "8px",
                                                        padding: "20px",
                                                        maxWidth: "max-content",
                                                        maxHeight:
                                                            "max-content",
                                                        margin: "auto",
                                                    },
                                                }}
                                            >
                                                <div>
                                                    {[1, 2, 3, 4, 5].map(
                                                        (value) => (
                                                            <span
                                                                key={value}
                                                                className={`text-3xl cursor-pointer ${
                                                                    value <=
                                                                    rating
                                                                        ? "text-pink"
                                                                        : "text-gray-400"
                                                                }`}
                                                                onClick={() =>
                                                                    handleStarClick(
                                                                        value
                                                                    )
                                                                }
                                                            >
                                                                &#9733;
                                                            </span>
                                                        )
                                                    )}
                                                    <p>
                                                        Selected rating:{" "}
                                                        {rating}
                                                    </p>
                                                </div>
                                                <button
                                                    onClick={() => {
                                                        handleRateClick(
                                                            notification.body
                                                        );
                                                        closeModal();
                                                    }}
                                                    className="w-full bg-pink font-inter p-2 text-md rounded-md text-white mt-3"
                                                >
                                                    Rate
                                                </button>
                                            </Modal>
                                        </div>
                                    </>
                                ) : (
                                    <div>
                                        <h3 className="font-poppins text-2xl text-bold font-blue">
                                            {notification.heading}
                                        </h3>
                                        <p className="text-md text-blue font-inter pt-2">
                                            {notification.body}
                                        </p>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                ))}
                {err && (
                    <p className="bg-red text-white p-4 rounded-md capitalize">
                        {err}
                    </p>
                )}
            </div>
        </>
    );
}
