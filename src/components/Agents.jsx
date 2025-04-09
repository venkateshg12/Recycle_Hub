import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import Agent_cards from "./Agent_cards";

export function Agents() {
  const { state } = useLocation();
  const selectedCity = state?.city || "";
  const [agents, setAgents] = useState([]);

  useEffect(() => {
    const fetchAgents = async () => {
      const db = getFirestore();
      const agentCollection = collection(db, "Agents");
      const agentQuery = query(
        agentCollection,
        where("City", "==", selectedCity.toUpperCase())
      );
      const agentSnapshot = await getDocs(agentQuery);
      const agentList = agentSnapshot.docs.map((doc) => doc.data());
    
      setAgents(agentList);
    };
    if (selectedCity) {
      fetchAgents();
    }
  }, [selectedCity]);

  return (
    <div>
         <center className="mt-12 cardfont"><h1>Agents in {selectedCity}</h1></center>
      <ul className="">
        {agents.map((agent, index) => (
          <Agent_cards key={index} agent={agent} />
        ))}
      </ul>
    </div>
  );
}
