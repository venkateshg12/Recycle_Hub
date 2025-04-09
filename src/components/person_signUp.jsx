import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc, updateDoc, arrayUnion } from "firebase/firestore"; // Make sure to import Firestore functions
import { auth } from "../Backend/firebaseconfig"; // Import auth from firebaseconfig
import { useEffect } from "react";
import { useNavigate} from "react-router-dom";
export default function SignUp() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [mobile, setMobile] = useState("");
    const [error, setError] = useState("");
    const [name, setName] = useState("");
    const [City, setCity] = useState("");
    const [message, setMessage] = useState("");
    const db = getFirestore(); // Initialize Firestore
    const navigate = useNavigate();
    const signUp = async (e) => {
        e.preventDefault();
        setError(null);
        setMessage("");
        let c = City.toLocaleUpperCase();
        // Validate input fields
        if (!email || !password || !mobile) {
            setError("Please fill all the fields");
            alert("Please fill all the fields");
            setEmail("");
            setMobile("");  
            setName("");
            setCity("");
            return;
        }
        if (password.length < 6) {
            setError("Password should be at least 6 characters");
            alert("Password should be at least 6 characters");
            setPassword("");
            return;
        }
        try {
            // Create user with email and password
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            const userDocRef = doc(db, "users", user.uid);
            const existingUser = await getDoc(userDocRef);
            if (existingUser.exists()) {
                setError("User already exists");
            } else {
            // Save user data in Firestore
            if (document.getElementById('user_or_agent').value === "user") {
                await setDoc(doc(db, "users", user.uid), {
                    email: email,
                    mobile: mobile,
                    Role: "user",
                    name: name,
                    City: c,
                    createdAt: new Date()
                });
            }
            else{
                await setDoc(doc(db, "Agents", user.uid), {
                    email: email,
                    mobile: mobile,
                    Role: "agent",
                    name: name,
                    City: c,
                    createdAt: new Date()
                });
                updateDoc(doc(db, "Cities", "Locations"), { Cities_Array: arrayUnion(c) }); 
            }

            setMessage("User created successfully!");
            setEmail("");
            setPassword("");    
            setMobile(""); 
            setName("");
            setCity("");
            navigate("/home") 
        }
        } catch (err) {
            console.log("Error in creating user:", err);
            setError(err.message);
        }
    };

    useEffect(() => {
        const password_visible = document.getElementById('password_visible');
        const togglePasswordVisibility=()=>{
            const password = document.getElementById('signup_password');
            if(password.type === 'password'){
                password.type = 'text';
                password_visible.classList.remove('bx-show');
                password_visible.classList.add('bx-hide');
            }else{
                password.type = 'password';
                password_visible.classList.remove('bx-hide');
                password_visible.classList.add('bx-show');
            }
        };
        password_visible.addEventListener('click',togglePasswordVisibility);
        return () => {
            password_visible.removeEventListener('click',togglePasswordVisibility);
        };  
    },[]);
    

    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="flex flex-col md:w-1/2 px-4 py-4 space-y-8 items-center">
                <h1 className="text-2xl md:text-5xl text-green-400" style={{ fontFamily: 'Bagel Fat One, sans-serif' }}>Sign Up Here</h1>

                <div className="w-full md:w-1/2 flex relative">
                    <input 
                        id="email" 
                        type="email" 
                        placeholder="mail" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                        className="border border-black w-full md:px-4 py-2  rounded-md text-center  md:text-start" 
                    />
                    <i className='bx bx-user absolute top-2 right-2 text-2xl font-bold text-green-400'></i>
                </div>
                <div className="w-full md:w-1/2 flex relative">
                    <input 
                        id="name" 
                        type="tel" 
                        placeholder="Name" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)}  
                        required 
                        className="border border-black md:px-4 py-2 w-full text-center md:text-start rounded-md" 
                    />
                </div>
                <div className="w-full md:w-1/2 flex relative">
                    <input 
                        id="mobile" 
                        type="tel" 
                        placeholder="mobile number" 
                        value={mobile} 
                        onChange={(e) => setMobile(e.target.value)}  
                        required 
                        className="border border-black md:px-4 py-2 w-full text-center md:text-start rounded-md" 
                    />
                    <i className='bx bx-dialpad text-green-400 absolute top-1 font-bold right-2 text-2xl'></i>
                </div>
                <div className="w-full md:w-1/2 flex relative">
                        <input 
                    id="City" 
                    type="text" 
                    placeholder="Kailash" 
                    value={City} 
                    onChange={(e) => setCity(e.target.value)} 
                    required 
                    className="border border-black md:px-4 py-2 w-full  text-center md:text-start rounded-md" 
                />
                </div>
                <div className="w-full md:w-1/2 flex relative">
                        <input 
                    id="signup_password" 
                    type="password" 
                    placeholder="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                    className="border border-black md:px-4 py-2 w-full  text-center md:text-start rounded-md" 
                />
                <i className='bx bx-show top-1 right-2 absolute text-2xl font-bold text-green-400 cursor-pointer' id="password_visible"></i>
                </div>
                <select className="w-1/2 rounded-md border border-black" id="user_or_agent">
                    <option value="user">User</option>
                    <option value="agent">Agent</option>
                </select>
                <button 
                    id="signUp" 
                    type="submit" 
                    onClick={signUp} // Attach the signUp function to the button
                    className="text-md w-1/2 md:text-xl bg-green-400 md:w-1/3 lg:w-1/6 rounded-md p-1 font-bold"
                >
                    Sign Up
                </button>

                {error && <div className="text-red-500">{error}</div>}  
                {/* {message && <div className="text-green-500">{message}</div>} */}
                
                <div className="w-full md:w-1/2 flex items-center">
                    <hr className="border border-black flex-grow" />
                    <h2 className="text-md px-2">Or</h2>
                    <hr className="border border-black flex-grow" />
                </div>

                <div className="flex space-x-4 justify-center w-1/2">
                    <button className="text-center px-4 py-2 rounded-full text-3xl">
                        <i
                            className="bx bxl-google"
                            style={{
                                background: 'linear-gradient(-220deg, #EA4335 30%, #FBBC05 50%, #4285F4 66%, #34A853 55%)',
                                WebkitBackgroundClip: 'text',
                                color: 'transparent',
                            }}
                        ></i>
                    </button>
                    <button className="text-center px-4 py-2 rounded-full text-3xl">
                        <i className='bx bxl-facebook text-blue-800'></i>
                    </button>
                    <button className="text-center px-4 py-2 rounded-full text-3xl">
                        <i className='bx bxl-twitter text-blue-400'></i>
                    </button>
                </div>
            </div>
        </div>
    );
}