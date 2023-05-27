import React from "react";
import Profile from "../components/profile";
import Navbar from "../components/navbar";

export default function Account() {
    return (
        <>
  
            <Navbar/>

            <main className="min-h screen bg-slate-900">
                <div className=" bg-slate-900 ">
                <h1 class=" px-5 pt-10 pb-10 text-5xl font-bold text-white text-center">My Account </h1>

                      {/* Box2 */}
     
                
    
                </div >
                </main>
            <Profile className={"p-5"}/>
        
            
            
            
            
          
        </>
    );
}