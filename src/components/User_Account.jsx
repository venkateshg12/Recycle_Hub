    import React from "react";
    import { useState, useRef,useEffect } from "react";
    import {db, auth} from "../Backend/firebaseconfig";
    import { getDoc, doc, setDoc, getFirestore,updateDoc, arrayUnion } from "firebase/firestore";
    export default function User_acc() {
        const [mobile, setMobile] = useState("");
        const [name, setName] = useState("");
        const [email, setEmail] = useState("");
        const [City, setAddress] = useState("");
        const [image,setImage]  = useState("");
        const db = getFirestore(); 
    
        const handleEditName= async () => {
            const newName = prompt("Enter new name:");
            if (newName) {
                setName(newName);
                const userDoc = doc(db, "users", auth.currentUser.uid);
                await setDoc(userDoc, { name: newName }, { merge: true });
            }
        };
    
        const handleEditMobile = async () => {
            const newMobile = prompt("Enter new mobile number:");
            if (newMobile) {
                setMobile(newMobile);
                const userDoc = doc(db, "users", auth.currentUser.uid);
                await setDoc(userDoc, { mobile: newMobile }, { merge: true });
            }
        };
        const handleEditEmail = async ()=>{
            const newmail = prompt("Enter new mail");
            if(newmail){
                setEmail(newmail);
                const userDoc = doc(db, "users", auth.currentUser.uid);
                await setDoc(userDoc, { email: newmail }, { merge: true }); 
            }
        };
        const handleEditAddress = async ()=>{
            let newAddress = prompt("Enter new address");
            if(newAddress){
                newAddress = newAddress.toLocaleUpperCase();
                setAddress(newAddress);
                const userDoc = doc(db, "users", auth.currentUser.uid);
                await setDoc(userDoc, { City: newAddress }, { merge: true });
                await  updateDoc(doc(db, "Cities", "Locations"), { Cities_Array: arrayUnion(newAddress) }); 
                
            }
        };
        const handleImageChange = async (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onloadend = async () => {
                    setImage(reader.result);
                    const userDoc = doc(db, "users", auth.currentUser.uid);
                    await setDoc(userDoc, { image: reader.result }, { merge: true });        // You can also upload the image to your backend here
                };
                reader.readAsDataURL(file);
            }
        };
        useEffect(() => {
            const fetchUserData = async () => {
                const userDoc = doc(db, "users", auth.currentUser.uid);
                const agentDoc = doc(db, "Agents", auth.currentUser.uid);
                const userSnap = await getDoc(userDoc);
                const agentSnap = await getDoc(agentDoc);
        
                if (userSnap.exists()) {
                    setName(userSnap.data().name);
                    setMobile(userSnap.data().mobile);
                    setEmail(userSnap.data().email);
                    setAddress(userSnap.data().City);
                    setImage(userSnap.data().image);
                } else if (agentSnap.exists()) {
                    setName(agentSnap.data().name);
                    setMobile(agentSnap.data().mobile);
                    setEmail(agentSnap.data().email);
                    setAddress(agentSnap.data().City);
                    setImage(agentSnap.data().image);
                } else {
                    console.log("User not found in either collection");
                }
            };
        
            fetchUserData();
        }, []);
        

   

        return (
            <div className="h-screen flex flex-col items-center transition-colors bg-gradient-to-l from-green-200 to-transparent">
                <div className=" w-full md:w-1/2 md:mt-4 flex md:justify-evenly">
                    <div className="w-2/3 md:w-1/2 lg:w-1/3 flex justify-center items-center relative">
                        <img className="border border-black aspect-square relative rounded-full w-1/2 md:w-2/3 z-0 object-cover" src={image } alt="User" />
                        <button className="absolute bottom-2 md:bottom-5 right-12 z-2 cursor-pointer">
                            <i className='bx bx-edit text-2xl md:text-3xl text-green-500 cursor-pointer'></i>
                            <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={handleImageChange} />
                        </button>
                    </div>
                    <div className="w-5/6 md:w-1/2 flex flex-col items-center justify-center" style={{fontFamily:"Inter"}}>
                        <div className="text-orange-400 md:text-xl lg:text-2xl" id="userAccName" >Hello {name}</div>
                        <div className="text-black-400 md:text-md lg:text-xl" id="userName">{name}</div>
                        <div className="flex mt-2 w-full h-1/3 items-center justify-evenly">
                            <div className="flex flex-col items-center cursor-pointer">
                                <i className='bx bxs-package text-xl md:text-xl lg:text-3xl'></i>
                                <h2 className="text-sm">Orders</h2>
                            </div>
                            <div className="flex flex-col items-center cursor-pointer">
                                <i className='bx bxs-wallet-alt text-xl md:text-xl lg:text-3xl'></i>
                                <h2 className="text-sm">Wallet</h2>
                            </div>
                            <div className="flex flex-col items-center cursor-pointer">
                                <i className='bx bx-qr text-xl md:text-xl lg:text-3xl'></i>
                                <h2 className="text-sm">Scanner</h2>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="h-3/4 w-3/4 md:w-1/2 mt-2 flex flex-col gap-y-2" style={{ fontFamily: 'Inter' }}>
                    <div className="flex w-full h-1/6 justify-around items-center" id="details">
                        <div className="flex flex-col w-full md:w-1/2">
                            <h2 className="text-xl font-semibold" style={{ fontFamily: 'Bagel Fat One, sans-serif' }}>Name</h2>
                            <p className="text-xl " id="User_name">{name}</p>
                        </div>
                        <button className="text-xl italic bg-green-400 text-black w-1/4 h-fit rounded-md" onClick={handleEditName}><i className='bx bx-edit' id="edit"></i></button>
                    </div>
                    <div className="flex h-1/6 justify-around items-center" id="details">
                        <div className="flex flex-col w-full md:w-1/2">
                            <h2 className="text-xl font-semibold" style={{ fontFamily: 'Bagel Fat One, sans-serif' }}>Mobile</h2>
                            <p className="text-xl ">{mobile}</p>
                        </div>
                        <button className="text-xl italic bg-green-400 text-black w-1/4 h-fit rounded-md" onClick={handleEditMobile}><i className='bx bx-edit'></i></button>
                    </div>
                    <div className="flex h-1/6 justify-around items-center" id="details">
                        <div className="flex flex-col w-full md:w-1/2">
                            <h2 className="text-xl font-semibold" style={{ fontFamily: 'Bagel Fat One, sans-serif' }}>Email</h2>
                            <p className="text-xl">{email}</p>
                        </div>
                        <button className="text-xl italic bg-green-400 text-black w-1/4 h-fit rounded-md" onClick={handleEditEmail}><i className='bx bx-edit'></i></button>
                    </div>
                    
                    <div className="flex h-1/6 justify-around items-center" id="details">
                        <div className="flex flex-col w-full md:w-1/2">
                            <h2 className="text-xl font-semibold" style={{ fontFamily: 'Bagel Fat One, sans-serif' }}>City</h2>
                            <p className="text-md ">{City}</p>
                        </div>
                        <button className="text-xl italic bg-green-400 text-black w-1/4 h-fit rounded-md" onClick={handleEditAddress}><i className='bx bx-edit'></i></button>
                    </div>
                

                </div>
            </div>
        );
    }