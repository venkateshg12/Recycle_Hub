import React, { useState } from "react";
import "../App.css";
import { db } from "../Backend/firebaseconfig";
import { getDoc, doc, setDoc } from "firebase/firestore";

export default function Agent_cards({ agent }) {

  const handleBookSlot = async () => {
    const inputQuantity = prompt(
      "Enter the plastic quantity you want to sell us"
    );

    if (!inputQuantity || isNaN(inputQuantity)) {
      alert("Please enter a valid quantity.");
      return;
    }

    const newQuantity = parseInt(inputQuantity);

    try {
      const docRef = doc(db, "plasticSales", "totalPlastic"); // Reference to the document
      const docSnap = await getDoc(docRef);

      let updatedQuantity = newQuantity;

      if (docSnap.exists()) {
        const existingData = docSnap.data();
        updatedQuantity += existingData.quantity || 0; // Ensure existing value is valid
        
      }

      await setDoc(docRef, { quantity: updatedQuantity });
      

      alert(
        `You have successfully booked a slot for ${newQuantity} kg of plastic.`
        
      );
      if (window.confirm("Ok your order is accepted and check the agent location")) {
        window.location.href = "/location";
      }
    
    } catch (error) {
      console.error("Error updating Firestore:", error);
      alert("Failed to update the plastic quantity.");
    }
  };

  return (
    <div className="items-center flex flex-wr p flex-col h-1/4 m-2 md:min-w-screen transition-colors bg-gradient-to-l from-green-200 to-transparent">
      <div className="flex md:w-1/2 md:m-2  justify-center items-center gap-x-2 mt-2 border rounded-xl shadow-md">
        <div className="aspect-square flex h-[150px] justify-center items-center">
          <img
            src={agent.image}
            alt={`${agent.name}`}
            className="rounded-full aspect-square border"
          />
        </div>
        <div className="flex flex-col justify-evenly md:px-4 md:py-2 text-sm md:text-md cardfont">
          <h1>{agent.name}</h1>
          <h2>{agent.City}</h2>
          <h3>{agent.mobile}</h3>
          <h4>{agent.email}</h4>
          <div className="flex gap-x-4 w-44 md:w-80 text-sm md:text-md">
            <button
              className="border border-black flex rounded-md hover:bg-green-400 w-1/2 justify-center"
              onClick={handleBookSlot}
            >
              Book slot
            </button>
            <button className="border border-black flex rounded-md hover:bg-green-400 w-1/2 justify-center">
              View Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
