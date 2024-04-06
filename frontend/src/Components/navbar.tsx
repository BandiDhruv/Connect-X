import{useState,useEffect}from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface User {
    username:string;
    _id: string;
    email: string;
}

export const Navbar = () =>{
    const [authenticated, setAuthenticated] = useState<boolean>(false);
    const [user, setUser] = useState<User | null>(null);
    const navigate=useNavigate();
    useEffect(() => {
        const fetchAuthenticatedUser = async () => {
            try {
                const response = await axios.get<User>(`http://localhost:5000/api/users/`);
                if(response.status===210)setAuthenticated(true);
                console.log(authenticated);

            } catch (error) {
                console.error("Error fetching authenticated user:", error);
            }
        };

        fetchAuthenticatedUser();
    });
    const handleLogout = async ()=>{
        try{
            const response=await axios.post(`http://localhost:5000/api/users/logout`);
            if(response.status===200)console.log("success");
            else console.log("no success");
        }catch(e){
            console.error(e);
        }
    }
    return (
        <div className="w-full bg-white h-[8%] flex justify-end items-center px-4">
            {authenticated ? (
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleLogout}>
                    Logout
                </button>
            ) : (
                <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={()=>navigate("/login")}>
                    Login
                </button>
            )}
        </div>
    );
}