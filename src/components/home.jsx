import React, { useEffect, useState } from "react";
import LoadingScreen from "./loading_screen";
import bg from "../assets/home.png";
import { db } from "../Backend/firebaseconfig";
import { doc, getDoc, getDocs, collection } from "firebase/firestore";
import Typewriter from "typewriter-effect";
import Footer from "./footer";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [totalPlastic, setTotalPlastic] = useState(0);
  const [showTags, setShowTags] = useState(false);
  const [users, setUsers] = useState(0);
  const [agents, setAgents] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docRef = doc(db, "plasticSales", "totalPlastic");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setTotalPlastic(docSnap.data().quantity || 0);
        }
        const querySnapshot = await getDocs(collection(db, "users"));
        setUsers(querySnapshot.size);
        const querySnapshot1 = await getDocs(collection(db, "Agents"));
        setAgents(querySnapshot1.size);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setTimeout(() => setLoading(false), 3000);
      }
    };

    fetchData();
  }, []);

  const plasticTypes = [
    { name: "PETE", href: "https://en.wikipedia.org/wiki/Polyethylene_terephthalate" },
    { name: "HDPE", href: "https://en.wikipedia.org/wiki/High-density_polyethylene" },
    { name: "PVC", href: "https://en.wikipedia.org/wiki/Polyvinyl_chloride" },
    { name: "LDPE", href: "https://en.wikipedia.org/wiki/Low-density_polyethylene" },
    { name: "PP", href: "https://en.wikipedia.org/wiki/Polypropylene" },
    { name: "PS", href: "https://en.wikipedia.org/wiki/Polystyrene" },
    { name: "OTHER", href: "https://en.wikipedia.org/wiki/Plastic_recycling#Other" },
  ];

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <>
      <div className="flex flex-col-reverse md:flex-row min-h-screen items-center justify-between px-4 py-6 transition-colors bg-gradient-to-l from-green-200 to-transparent">
        
        {/* Left Section */}
        <div className="w-full md:w-2/3 flex flex-col items-center md:items-start text-center md:text-left space-y-6">
          <h1 className="text-2xl md:text-4xl font-bold text-green-400" style={{ fontFamily: "Inter, Calibri" }}>
            <Typewriter
              options={{
                strings: ["Reduce Plastic Waste, Save the Planet 🌍"],
                cursor: ">",
                autoStart: true,
                loop: true,
              }}
            />
          </h1>
          <p className="text-lg md:text-xl text-gray-700 font-medium">
            Total Waste Collected by us till Now: <span className="text-green-600">{totalPlastic} Kgs 😃</span>
          </p>

          {/* Learn More Button */}
          <div className="flex flex-col items-center md:items-start">
            <p className="text-lg text-violet-600 font-medium">Learn More About Different Types of Plastic Waste</p>
            <button
              className="w-3/4 md:w-1/3 shadow-md rounded-xl h-12 bg-green-500 text-white mt-4 hover:bg-green-600 transition"
              onClick={() => setShowTags(!showTags)}
            >
              (Tap to View)
            </button>
          </div>

          {/* Plastic Types */}
          {showTags && (
            <div className="flex flex-wrap gap-2 mt-4 justify-center md:justify-start">
              {plasticTypes.map((type, index) => (
                <a
                  key={index}
                  href={type.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 text-white bg-blue-500 rounded-md shadow-md hover:bg-blue-600 transition"
                >
                  {type.name}
                </a>
              ))}
            </div>
          )}

          {/* User & Agent Stats */}
          <div className="flex flex-wrap gap-6 mt-6 justify-center md:justify-start">
            <div className="flex flex-col items-center bg-white shadow-md p-4 rounded-lg border border-green-300 transition hover:shadow-lg">
              <span className="text-2xl font-bold text-green-700">{users}</span>
              <p className="text-sm text-gray-600">Current Users</p>
            </div>
            <div className="flex flex-col items-center bg-white shadow-md p-4 rounded-lg border border-green-300 transition hover:shadow-lg">
              <span className="text-2xl font-bold text-green-900">{agents}</span>
              <p className="text-sm text-gray-600">Agents Across Nation</p>
            </div>
          </div>
        </div>

        {/* Right Section - Image */}
        <div className="w-full md:w-1/3 flex justify-center md:justify-end mt-6 md:mt-0">
          <img src={bg} alt="bg" className="w-2/3 md:w-full max-w-sm" />
        </div>
      </div>

      <Footer />
    </>
  );
}
