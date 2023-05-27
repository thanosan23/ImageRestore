import React from "react";
import Navbar from "../components/navbar"
import { FaGithubSquare } from "react-icons/fa";

import { IoIosMailUnread } from "react-icons/io";

const iconStyle = {
  color: "white",
  // additional CSS properties if needed
};



export default function Contact() {
  return (
    <>
        <Navbar/>
        <div className={"min-h-screen bg-slate-900"}>
            <div className={"flex flex-col justify-center item-center text-center"}>
                <div className={"flex flex-col"}>
                <h2 className={"text-white font-bold text-3xl p-5"}>Contact Us</h2>
                </div>
                <div>
                <div className="flex items-center gap-12 px-10 justify-center">
                <div className="flex flex-col justify-center w-full max-w-sm mb-5 p-12 space-y-6 bg-slate-700 rounded-lg shadow-lg ">
                  <h2 className="text-white font-bold text-xl">Roshan</h2>
                  <div className="flex flex-row align-middle items-center">
                    <div>
                      <a href="https://github.co/ForceDrift"><FaGithubSquare size={50} style={iconStyle} className="hover:-translate-y-1 transition-all"/></a>
                    </div>
                    <div className="p-5 text-white">
                      <p>ForceDrift</p>
                    </div>
                  </div>
                  <div className="flex align-middle items-center">
                    <div>
                      <div><a href="mailto:roshaniruku@gmail.com"><IoIosMailUnread size={50} style={iconStyle} className="flex flex-row hover:-translate-y-1 transition-all"/></a></div>
                    </div>
                  
                  <p className={"p-5 text-white"}><a href="mailto:roshaniruku@gmail.com" className={"underline"}>roshaniruku@gmail.com</a></p>
                  </div>
                       {/* Implement */}

                       

                </div>
                  {/* Implement */}
                <div className="flex flex-col justify-center w-full max-w-sm mb-5 p-12 space-y-6 bg-slate-700 rounded-lg shadow-lg ">
                  <h2 className="text-white font-bold text-xl">Thanosan</h2>
                  <div className="flex flex-row align-middle items-center">
                    <div>
                      <a href="https://github.co/thanosan23"><FaGithubSquare size={50} style={iconStyle} className="hover:-translate-y-1 transition-all"/></a>
                    </div>
                    <div className="p-5 text-white">
                      <p>thanosan23</p>
                    </div>
                  </div>
                  <div className="flex align-middle items-center">
                    <div>
                      <div><a href="mailto:thanosan.23@gmail.com"><IoIosMailUnread size={50} style={iconStyle} className="flex flex-row hover:-translate-y-1 transition-all"/></a></div>
                    </div>
                  
                  <p className={"p-5 text-white"}><a href="mailto:p.thanosan23@gmail.com" className={"underline"}>p.thanosan23@gmail.com</a></p>
                  </div>
                    
                       {/* Implement */}

                       
                </div>
                  {/* Implement */}
                {/* <div className="flex flex-col justify-center w-full max-w-sm mb-5 p-12 space-y-6 bg-slate-700 rounded-lg shadow-lg ">
                  <div className="flex flex-row align-middle items-center">
                    <div>
                      <a href="https://github.co/ForceDrift"><FaGithubSquare size={50} style={iconStyle} className="hover:-translate-y-1 transition-all"/></a>
                    </div>
                    <div className="p-5 text-white">
                      <p>ForceDrift</p>
                    </div>
                  </div>
                  <div className="flex align-middle items-center">
                    <div>
                      <div><a href="mailto:roshaniruku@gmail.com"><IoIosMailUnread size={50} style={iconStyle} className="flex flex-row hover:-translate-y-1 transition-all"/></a></div>
                    </div>
                  
                  <p className={"p-5 text-white"}><a href="mailto:roshaniruku@gmail.com" className={"underline"}>roshaniruku@gmail.com</a></p>
                  </div>

                </div> */}
                </div>
                </div>
            </div>
        </div>
    </>
  );
}
