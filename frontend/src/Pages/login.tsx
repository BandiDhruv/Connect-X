import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Login: React.FC = () => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const navigate=useNavigate();
    const handleLogin = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/api/users/login", {
                username: username,
                password: password
            });
            console.log("Login successful:", response.data);
            navigate('/');
            // Optionally, you can redirect the user to another page upon successful login
        } catch (error) {
            console.error("Login error:", error);
            // Handle login error here, e.g., display an error message to the user
        }
    };

    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <div className="w-full max-w-xs">
                <form
                    className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
                    onSubmit={handleLogin}
                >
                    <h2 className="text-2xl mb-4">Login</h2>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            UserName:
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Password:
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit"
                        >
                            Login
                        </button>
                    </div>
                </form>
            </div>
            <div>
                new user sign up <button onClick={()=>{navigate("/signup")}}>singup</button>
            </div>
        </div>
    );
};
