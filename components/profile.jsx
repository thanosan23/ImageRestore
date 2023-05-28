import React, { useState, useEffect } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';

import Stripe from 'stripe';

import emailjs from '@emailjs/browser'

export default function Profile() {

  const user = useUser();

  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  const getUserInfo = async (email) => {
    let response = null;
    console.log(process.env.DEPLOYMENT);
    if(process.env.DEPLOYMENT == "Debug") {
      response = await fetch("http://localhost:3000/api/getUserInfo", {
        method: "POST",
        body: JSON.stringify({ email : email }),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
        },
      });
    } else {
      response = await fetch("https://image-restore-sand.vercel.app/api/getUserInfo", {
        method: "POST",
        body: JSON.stringify({ email : email }),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
        },
      });
    }
    setUserInfo(await response.json());
  }

  useEffect(() => {
      const userData = JSON.stringify(user.user);
      let email = null;
      if(userData != undefined) {
          email = JSON.parse(userData).email;
          getUserInfo(email);
          setLoading(false);
      } 
  }, [])

 
  if(user.isLoading || loading) {
    return (
    <div className={"min-h-screen bg-slate-900"}>
      <p className={"text-white flex justify-center"}>
        Loading Account Information...
      </p>
    </div>
    )
  }
  let subscription = "";
  if(!loading && userInfo != null) {
    if(userInfo["subscription"] == -1) subscription = "Free Tier";
    else if(userInfo["subscription"] == 1) subscription = "Tier 1";
    else if(userInfo["subscription"] == 2) subscription = "Tier 2";
    else if(userInfo["subscription"] == 3) subscription = "Tier 3";
  }
  

  return (
    
    user && (
        <main className={"bg-slate-900 min-h-screen"}>
          <div className={"flex justify-center align-middle items-center text-center"}>
            <div className={"flex-col bg-slate-700 p-5"}>
              <p className={"text-white"}>
                <span className={"font-bold"}>Email:</span> {user.user.email}
              </p>
              {userInfo && (
              <p className={"text-white"}>
              <span className={"font-bold"}>Subscription:</span> {subscription}
              </p>                
              )}
            </div>
          </div>
          <div></div>
          {userInfo == null || userInfo["subscription"] != -1 && (
            <div className={"flex justify-center p-5"}>
            <button 
                className="mt-auto h-12 w-20 flex justify-center align-middle items-rounded-lg py-2 text-sm rounded-all font-semibold text-black text-center bg-white hover:bg-slate-900 hover:text-white hover:border-dashed hover:border-2 border-gray-300"
                type="button"
                onClick={async () => {
                    const stripe = Stripe(process.env.NEXT_PUBLIC_API_KEY);
                    const refund = await stripe.refunds.create({
                      payment_intent: userInfo["paymentIntent"]
                    })
                    const sendEmail = async (email) => {
                      var templateParams = {
                        email: email,
                        to_name: email,
                        chosen_subscription: (userInfo["subscription"] == 1 ? "Tier 1" : (userInfo["subscription"] == 2 ? "Tier 2" :userInfo["subscription"] == 3 ? "Tier 3" : ""))
                      }
                      await emailjs.send(process.env.EMAILJS_SERVICE, 'template_uumuz73', templateParams, process.env.EMAILJS_KEY).then((response) => {
                        console.log(response)
                      })
                    };
                    console.log(userInfo["email"])
                    sendEmail(userInfo["email"]);
                    if(process.env.DEPLOYMENT == 'Debug') {
                      await fetch("http://localhost:3000/api/resetUser", {
                        method: "POST",
                        body: JSON.stringify({ email : userInfo["email"] }),
                        headers: {
                            Accept: "application/json, text/plain, */*",
                            "Content-Type": "application/json",
                        },
                      });
                    } else {
                      await fetch("https://image-restore-sand.vercel.app/api/resetUser", {
                        method: "POST",
                        body: JSON.stringify({ email : userInfo["email"] }),
                        headers: {
                            Accept: "application/json, text/plain, */*",
                            "Content-Type": "application/json",
                        },
                      });
                    }
                    
                }}
            >
                Refund</button>
            </div>
        )}
        </main>
    )
  );
}