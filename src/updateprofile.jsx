import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "./api/axios";

export default function Updateprofile() {
    
        return (
            <>
                <div className="flex flex-col items-center py-20 md:py-10">
                    <h1 className="text-3xl text-blue font-bold py-9  font-poppins">
                       Update Profile
                    </h1>
                    <div className="w-80 flex flex-col gap-4">

                    <input
                                className= "border-blue border-b-2 w-full py-1.5 focus:outline-none text-blue placeholder:text-gray-400 sm:text-sm sm:leading-6"
                                required
                                type="text"
                                id="firstname"
                                name="firstname"
                                placeholder="Enter your first Name"
                                
                            />
                    <input
                                className= "border-blue border-b-2 w-full py-1.5 focus:outline-none text-blue placeholder:text-gray-400 sm:text-sm sm:leading-6"
                                required
                                type="text"
                                id="lastname"
                                name="lastname"
                                placeholder="Enter your last Name"
                                
                            />
                    <textarea
                                className= "border-blue resize border-b-2 w-full py-1.5 focus:outline-none text-blue placeholder:text-gray-400 sm:text-sm sm:leading-6"
                                required
                                type="textarea"
                                rows='4 '
                                id="lastname"
                                name="lastname"
                                placeholder="Enter your Bio"
                                
                            />
                    

                        <input class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-point" id="file_input" type="file"/>
                        <button
                                type="submit"
                                className="flex items-center justify-center rounded-md py-2 text-sm text-white bg-blue w-full"
                            >Submit</button>
                    </div>
                </div>
            </>
        );
    }


 