import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "./api/axios";

export default function Updateprofile() {
    const [userData, setUserData] = useState({
        first_name: "",
        last_name: "",
        bio: "",
        profile_picture: null,
    });
    const navigate = useNavigate();
    const handleChange = (e) => {
        if (e.target.type === "file") {
            // Handle file input
            setUserData({ ...userData, profile_picture: e.target.files[0] });
        } else {
            // Handle text input
            setUserData({ ...userData, [e.target.name]: e.target.value });
        }
    };
    const handleSubmit = (e) => {
        const formData = new FormData();
        formData.append("first_name", userData.first_name);
        formData.append("last_name", userData.last_name);
        formData.append("bio", userData.bio);
        formData.append("profile_picture", userData.profile_picture);
        e.preventDefault();
        axios
            .post("/accounts/profile/update", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((res) => {
                console.log(res);
                navigate("/profile");
            })
            .catch((err) => console.log(err));
    };
    return (
        <>
            <div className="flex flex-col items-center py-20 md:py-10">
                <h1 className="text-3xl text-blue font-bold py-9  font-poppins">
                    Update Profile
                </h1>
                <form
                    onSubmit={(e) => handleSubmit(e)}
                    className="w-80 flex flex-col gap-4"
                >
                    <input
                        className="border-blue border-b-2 w-full py-1.5 focus:outline-none text-blue placeholder:text-gray-400 sm:text-sm sm:leading-6"
                        required
                        type="text"
                        name="first_name"
                        value={userData.first_name}
                        onChange={(e) => handleChange(e)}
                        placeholder="Enter your first Name"
                    />
                    <input
                        className="border-blue border-b-2 w-full py-1.5 focus:outline-none text-blue placeholder:text-gray-400 sm:text-sm sm:leading-6"
                        required
                        type="text"
                        name="last_name"
                        value={userData.last_name}
                        onChange={(e) => handleChange(e)}
                        placeholder="Enter your last Name"
                    />
                    <textarea
                        className="border-blue resize border-b-2 w-full py-1.5 focus:outline-none text-blue placeholder:text-gray-400 sm:text-sm sm:leading-6"
                        required
                        type="textarea"
                        rows="4 "
                        name="bio"
                        value={userData.bio}
                        onChange={(e) => handleChange(e)}
                        placeholder="Enter your Bio"
                    />

                    <input
                        class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-point"
                        type="file"
                        name="profile_picture"
                        onChange={(e) => handleChange(e)}
                    />
                    <button
                        type="submit"
                        className="flex items-center justify-center rounded-md py-2 text-sm text-white bg-blue w-full"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </>
    );
}
