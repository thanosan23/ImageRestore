import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar"
import { FaBeer } from 'react-icons/fa';
import { VscCheck } from "react-icons/vsc";
import { RxCrossCircled } from "react-icons/rx";

import checkout from "./Checkout";
import { useUser } from "@auth0/nextjs-auth0/client";

import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';


export default function Pricing() {

  const user = useUser();

  const [open, setOpen] = useState(false);

  const [userInfo, setUserInfo] = useState(null);

  const getUserInfo = async (email) => {
    let response = await fetch("http://localhost:3000/api/getUserInfo", {
        method: "POST",
        body: JSON.stringify({ email : email }),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
        },
    });
    setUserInfo(await response.json());
  }

  useEffect(() => {
      const userData = JSON.stringify(user.user);
      let email = null;
      if(userData != undefined) {
          email = JSON.parse(userData).email;
          getUserInfo(email);
      } 
  }, [])

  const [checked, setChecked] = useState(false);
  
  const handleToggle = () => {
    setChecked(!checked);
  };

  return (
    <>
      <Navbar />
      <div className="screen bg-slate-900 flex-row">
        <h1 className="px-5 pt-10 text-5xl font-bold text-white bg-slate-900 text-center">
          Pricing Plans
        </h1>
        <h2 className="px-5 pt-10 text-2xl font-bold text-gray-500 text-center font">
          Unlock the True Potential of ImageRestore
        </h2>
        {/* Monthly/Yearly Pricing */}
        <div className="flex items-center justify-center p-10 m-10 gap-10 text-white">
          <h1>Bill Monthly </h1>
          <span>
             {/* Insert Toggle Button */}
            <div className="relative inline-block">
              <button
                className={`relative z-10 inline-flex items-center justify-center w-12 h-6 px-1 py-1 bg-gray-300 rounded-full cnursor-pointer focus:outline-none`}
                onClick={handleToggle}
              >
                <span
                  className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 ease-in-out ${
                    checked ? 'transform translate-x-6' : ''
                  }`}
                ></span>
              </button>
              <span
                className={`absolute left-0 right-0 w-12 h-6 bg-slate-900 opacity-0 rounded-full transition-transform duration-300 ease-in-out ${
                  checked ? 'transform translate-x-8' : ''
                }`}
              ></span>
            </div>
           </span>
  
          <h1>Bill Yearly</h1>
        </div>
        {/* Pricing Tiers */}
        <div className="flex items-center gap-12 px-10 justify-center  ">

        {/* Must be logged in modal */}
        <div className="hidden">
          <Modal open={open} onClose={() => setOpen(false)} center>
            <h2 className={"font-bold"}>Login</h2>
              <p className={""}>
              Must be logged in to purchase a subscription!
              </p>
          </Modal>
        </div>

          
    {/* Box1 */}
    <div className=" border-dashed border-2 border-gray-300 flex flex-col w-full max-w-sm mb-5 p-12 space-y-6  rounded-lg shadow  -md ">
            <div>
              {/* Price */}
              {!checked && (
                <h1 className="text-3xl font-bold text-white">
                $5<span className="text-gray-400 text-2xl font-thin">/month</span>
                </h1>
              )}
                {checked && (
                <h1 className="text-3xl font-bold text-white">
                $55<span className="text-gray-400 text-2xl font-thin">/yearly</span>
                </h1>
              )}
            </div>
            <div>
              {/* Description */}
              <div className="pt-4 text-2xl text-white">
                <h1>Tier 1</h1>
                <h2 className="text-white text-base pt-4">
                  All the basics for businesses that are just getting started.
                </h2>
                <div>
                  <div className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></div>
                 {/* What you get */}
                 <div className="flex flex-col">
                    <div>
                    <div className="flex flex-row items-start ">
                      <VscCheck className="text-green-500" />
                      <h1 className="pb-2 pl-2 text-base flex justify-center ">50 Images monthly</h1>
                    </div>

                    <div className="flex flex-row items-start ">
                      <VscCheck className="text-green-500" />
                      <h1 className="pb-2 pl-2 text-base flex justify-center ">Any Resolution</h1>
                    </div>

                    <div className="flex flex-row items-start ">
                      <VscCheck className="text-green-500" />
                      <h1 className="pb-2 pl-2 text-base flex justify-center ">HDR Image Denoising</h1>
                    </div>

                    <div className="flex flex-row items-start ">
                      <RxCrossCircled className="text-red-500" />
                      <h1 className="pb-2 pl-2 text-base flex justify-center ">Unlimited Image Generation</h1>
                    </div>

                      
                  </div> 

                    
                  </div>
                </div>
              </div>
            </div>
            
            {/* Button */}

            <button onClick={(async () => {
              {user.user != null && (
                  await checkout({
                    lineItems: [
                      {
                        price: ((!checked) ? "price_1NCOvjDLS22qxcZIuPmqIlFi" : "price_1NCPGODLS22qxcZI3Bv6ZJ7w"),
                        quantity: 1
                      }
  
                    ]
                  }, user.user.email, 1)
                
              )}
              {user.user == null && (
                setOpen(true)
              )}
            })}
              className="mt-auto h-12 w-full rounded-lg py-2 text-sm font-semibold text-black text-center bg-white hover:bg-slate-900 hover:text-white hover:border-dashed hover:border-2 border-gray-300"
              type="button"
            >
              Purchase
            </button>
            
          </div>
          {/* End of Box1 */}
      





              {/* Box2 */}
        <div className="flex flex-col w-full max-w-sm mb-5 p-12 space-y-6 bg-white rounded-lg shadow-lg shadow-white">
            {/* Shadow */}
            
            <div>
              {/* Price */}
              {!checked && (
                <h1 className="text-3xl font-bold">
                $10<span className="text-gray-400 text-2xl font-thin">/month</span>
                </h1>
              )}
              {checked && (
                <h1 className="text-3xl font-bold text-black">
                $110<span className="text-gray-400 text-2xl font-thin">/yearly</span>
                </h1>
              )}
             
            </div>
            <div>
              {/* Description */}
              <div className="pt-4 text-2xl">
                <h1>Tier 2</h1>
                <h2 className="text-gray-400 text-base pt-4">
                   For frequent users that need up to 200 images per month.
                </h2>
                <div>
                  <div className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></div>
                 {/* What you get */}
                 <div className="flex flex-col">
                    <div>
                    <div className="flex flex-row items-start ">
                      <VscCheck className="text-green-500" />
                      <h1 className="pb-2 pl-2 text-base flex justify-center ">200 Images</h1>
                      </div>
                      <div className="flex flex-row items-start ">
                      <VscCheck className="text-green-500" />
                      <h1 className="pb-2 pl-2 text-base flex justify-center ">Any Resolution</h1>
                    </div>

                    <div className="flex flex-row items-start ">
                      <VscCheck className="text-green-500" />
                      <h1 className="pb-2 pl-2 text-base flex justify-center ">HDR Image Denoising</h1>
                    </div>
                      <div className="flex flex-row items-start ">
                      <RxCrossCircled className="text-red-500" />
                      <h1 className="pb-2 pl-2 text-base flex justify-center ">Unlimited Image Generation</h1>
                    </div>
                      
                  </div> 

                    
                  </div>
                </div>
              </div>
            </div>
            
            {/* Button */}
            <button onClick={( async () => {
              {user.user != null && (
                await checkout({
                  lineItems: [
                    {
                      price: ((!checked) ? "price_1NCOwsDLS22qxcZIrdmcBhHC" : "price_1NCPKcDLS22qxcZIllLrtsFW"),
                      quantity: 1
                    }
  
                  ]
                }, user.user.email, 2)
              )}
              {user.user == null && (
                setOpen(true)
              )}

            })}
              className="mt-auto h-12 w-full rounded-lg py-2 text-sm font-semibold text-white text-center bg-black hover:bg-white hover:text-white hover:border-dashed hover:border-2 border-gray-300"
              type="button"
            >
              Purchase
            </button>
           
          </div>
          {/* End of Box2 */}
         
             {/* Box3 */}
        <div className=" border-dashed border-2 border-gray-300 flex flex-col w-full max-w-sm mb-5 p-12 space-y-6  rounded-lg shadow-md ">
            <div>
              {/* Price */}
              {!checked && (
                <h1 className="text-3xl font-bold text-white">
                  $15<span className="text-gray-400 text-2xl font-thin">/month</span>
                </h1>
              )}
                {checked && (
                <h1 className="text-3xl font-bold text-white">
                $170<span className="text-gray-400 text-2xl font-thin">/yearly</span>
                </h1>
              )}
            
            </div>
            <div>
              {/* Description */}
              <div className="pt-4 text-2xl text-white">
                <h1>Tier 3</h1>
                <h2 className="text-white text-base pt-4">
                  For large corporations & Large Image packages
                </h2>
                <div>
                  <div className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></div>
                 {/* What you get */}
                 <div className="flex flex-col">
                    <div>
                    <div className="flex flex-row items-start ">
                      <VscCheck className="text-green-500" />
                      <h1 className="pb-2 pl-2 text-base flex justify-center ">Unlimited Image Generation</h1>
                      </div>
                      <div className="flex flex-row items-start ">
                      <VscCheck className="text-green-500" />
                      <h1 className="pb-2 pl-2 text-base flex justify-center ">Any Resolution</h1>
                    </div>

                    <div className="flex flex-row items-start ">
                      <VscCheck className="text-green-500" />
                      <h1 className="pb-2 pl-2 text-base flex justify-center ">HDR Image Denoising</h1>
                    </div>


                    <div className="flex flex-row items-start ">
                      <VscCheck className="text-green-500" />
                      <h1 className="pb-2 pl-2 text-base flex justify-center ">4K Imagery</h1>
                      </div>
                      
                  </div> 

                    
                  </div>
                </div>
              </div>
            </div>
            
            {/* Button */}
            <button onClick={(async () => {
              {user.user != null && (
                await checkout({
                  lineItems: [
                    {
                      price: ((!checked) ? "price_1NCACIDLS22qxcZIM4LVHniu" : "price_1NCPLoDLS22qxcZI7t9Rp0W2"),
                      quantity: 1
                    }
  
                  ]
                }, user.user.email, 3)
              )}
              {user.user == null && (
                setOpen(true)
              )}

            })}
              className="mt-auto h-12 w-full rounded-lg py-2 text-sm font-semibold text-black text-center bg-white hover:bg-slate-900 hover:text-white hover:border-dashed hover:border-2 border-gray-300"
              type="button"
            >
              Purchase
            </button>
              
          </div>
          {/* End of Box3 */}
          <div>


          </div>






        
        </div>
      </div>
    </>
  );
}
