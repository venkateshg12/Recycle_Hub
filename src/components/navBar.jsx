import React, { useState } from "react";
import {  Link, useNavigate } from "react-router-dom";
import { auth } from "../Backend/firebaseconfig";
import nav_image from "../assets/recycling.png";
import LoadingScreen from "./loading_screen";
export default function Nav() {
    const [menuopen, setmenuopen] = useState(false);
    const navigate = useNavigate();

    const togglemenu = () => {
        setmenuopen(!menuopen);
    };
    const load = () => {
        setTimeout(() => {
            return <LoadingScreen/>
        }, 3000);
    }

    function logout() {
        auth.signOut().then(() => {
            navigate("/");
        }).catch((error) => {
            console.error("Error signing out: ", error);
        });
    }

    return (
        <div className="flex justify-between md:justify-evenly md:gap-x-12 bg-transparent items-center px-4 shadow-xl" style={{ boxShadow: "rgba(0, 0, 0, 0.1) 0px 20px 25px -5px, rgba(0, 0, 0, 0.04) 0px 10px 10px -5px " ,fontFamily:"Inter"}}>
            <div className="w-1/6 " >
                <Link to="/home"  onClick={load}>
                    <img src={nav_image} className="aspect-video w-1/2 md:w-1/3 h-12 " alt="image" />
                </Link>
            </div>

            <nav className="rounded-md p-2 md:h-1/4 lg:h-12 lg:text-xl w-5/6 justify-evenly items-center hidden md:flex " id="desktop-view">
                <Link to="/home">
                    <button className="text-green-400 rounded-md flex-grow text-center px-2 py-1 hover:bg-green-400 hover:text-black hover:cursor-pointer">Home</button>
                </Link>
                <Link to="/How_we_work">
                    <button className="text-green-400 rounded-md flex-grow text-center px-2 py-1 hover:bg-green-400 hover:text-black hover:cursor-pointer">How We Work</button>
                </Link>
                <Link to="/bys">
                    <button className="text-green-400 rounded-md flex-grow text-center px-2 py-1 hover:bg-green-400 hover:text-black hover:cursor-pointer">Book Your Slot</button>
                </Link>
                <Link to="/user-acc">
                    <button className="text-green-400 rounded-md flex-grow text-center px-2 py-1 hover:bg-green-400 hover:text-black hover:cursor-pointer">Account</button>
                </Link>
            </nav>

            <Link>
                <button className="bg-green-400 rounded-md w-1/3 text-sm md:text-xl md:w-full text-nowrap py-1 px-2 hover:bg-green-300 hidden md:block" onClick={logout}>Log Out</button>
            </Link>

            <button onClick={togglemenu} className="md:hidden text-green-400">
                {menuopen ? <i className="bx bx-x text-5xl relative"></i> : <i className="bx bx-menu text-5xl relative"></i>}
            </button>

            <nav className={`${menuopen ? "flex" : "hidden"} md:hidden fixed top-24 right-0 px-12 h-1/2 bg-transparent z-50 w-screen justify-center transform transition ease-in-out`} id="mobile-nav">
                <div className="flex flex-col gap-y-6 p-4 bg-black opacity-75 w-full text-center rounded-lg">
                    <Link to="/home" onClick={togglemenu}>
                        <button className="text-green-400 rounded-md flex-grow text-center hover:bg-green-400 hover:text-black hover:cursor-pointer">Home</button>
                    </Link>
                    <Link to="/How_we_work" onClick={togglemenu}>
                        <button className="text-green-400 rounded-md flex-grow text-center hover:bg-green-400 hover:text-black hover:cursor-pointer">How We Work</button>
                    </Link>
                    <Link to="/bys" onClick={togglemenu}>
                        <button className="text-green-400 rounded-md flex-grow text-center hover:bg-green-400 hover:text-black hover:cursor-pointer">Book Your Slot</button>
                    </Link>
                    <Link to="/user-acc" onClick={togglemenu}>
                        <button className="text-green-400 rounded-md flex-grow text-center hover:bg-green-400 hover:text-black hover:cursor-pointer">Account</button>
                    </Link>
                    <Link onClick={togglemenu}>
                        <button className="text-green-400 rounded-md w-1/3 text-sm md:text-xl md:w-full text-nowrap py-1 px-2 hover:bg-green-300" onClick={logout}>Log Out</button>
                   </Link>
                </div>
            </nav>
        </div>
    );
}
