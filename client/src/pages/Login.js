import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
import axios from "axios";


function Login()  {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const loginUser = async () => {
        const userObj = {
            password,
            email
        };
        console.log(userObj);
        try 
        {
            const response = await axios.post('/api/auth/login', userObj);
            toast.dismiss();
            if (response.data.success) 
            {
                toast.success(response.data.message);
                localStorage.setItem("user", response.data.data);
                navigate("/");
            } 
            else {
              toast.error(response.data.message);
            }
        } 
        catch (error) 
        {
            toast.dismiss();
            toast.error("Something went wrong");
        }
    };

    return (
        <div className="flex justify-center items-center h-screen space-x-40">
            <div className="w-[400px] flex space-y-5 flex-col shadow-lg border border-gray-300">
                <h1 className="font-semibold text-2xl text-white bg-primary p-5 rounded-b-full text-center">
                    Welcome Back To Auth System</h1>

                    <input
                        type="text"
                        className="py-1 px-3 border-2 border-secondary focus:outline-none w-full"
                        placeholder="email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />
                    <input
                        type="password"
                        className="py-1 px-3 border-2 border-secondary focus:outline-none w-full"
                        placeholder="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />

                    <div className="flex justify-between items-end">
                        <Link className="underline text-primary" to="/register">
                            Click Here To Register
                        </Link>


                        <button
                            className="py-1 px-5 text-white bg-primary"
                            onClick={loginUser}>
                            LOGIN
                        </button>
                    </div>
                </div>
            </div>

    );
}

export default Login;