import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";


export const Layout = ({ children }) => {

    const navigate = useNavigate();
    const { logoutUser, user, isLoggedIn } = useAuth()
    const [drawerOpen, setDrawerOpen] = useState(false);
    useEffect(() => {
        if (!isLoggedIn) {
            navigate("/login")
        }
    }, [])

    const toggleDrawer = (open) => () => {
        setDrawerOpen(open);
    };
    const handleLogout = () => {
        logoutUser()
        navigate("/login")
    }
    return (


        <div >
            <nav className="bg-gray-800 p-4 sm:px-4 lg:px-32">
                <div className="flex justify-between items-center">
                    <div>
                        <img
                            src="/logo.png"
                            alt="logo"
                            className="h-10 cursor-pointer"
                            onClick={() => navigate("/")}
                        />
                    </div>
                    <div className="md:hidden">
                        <button onClick={toggleDrawer(true)} className="text-white">
                            ☰
                        </button>
                    </div>
                    <div className="hidden md:flex space-x-6 text-white">
                        <Link to="/" className="hover:text-gray-400">Home</Link>
                        <Link to="/search" className="hover:text-gray-400">Search</Link>
                        {
                            user.role == "admin" && <Link to="/admin" className="hover:text-gray-400">Admin</Link>
                        }
                        <button onClick={handleLogout} className="hover:text-gray-400">Sign Out</button>
                    </div>
                </div>
                {drawerOpen && (
                    <div className="absolute top-0 left-0 w-full bg-gray-900 p-4 md:hidden ">
                        <button onClick={toggleDrawer(false)} className="text-white text-lg w-full text-right">×</button>
                        <div className="flex flex-col space-y-4 mt-4 text-white">
                            <Link to="/" onClick={() => toggleDrawer(false)} className="hover:text-gray-400">Home</Link>
                            <Link to="/search" onClick={() => toggleDrawer(false)} className="hover:text-gray-400">Search</Link>
                            {
                                user.role == "admin" && <Link to="/admin" onClick={() => toggleDrawer(false)} className="hover:text-gray-400">Admin</Link>
                            }
                            <button onClick={() => { handleLogout(); toggleDrawer(false); }} className="hover:text-gray-400">Sign Out</button>
                        </div>
                    </div>
                )}
            </nav>
            <div className="sm:px-4 lg:px-32">
                {children}
            </div>

        </div>
    );
};