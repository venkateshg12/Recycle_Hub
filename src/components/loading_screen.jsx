import React from "react";
import { Slab } from "react-loading-indicators";

export default function LoadingScreen({isLoading, setIsLoading}) {
    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="flex flex-col items-center">
                <Slab color="#10e527" size="large" text="" textColor="#5f5f5f" />
            </div>
        </div>
    );
}   

