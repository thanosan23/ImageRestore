import React, { useState, useEffect } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';


export default function Profile() {

  const user = useUser();

  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);

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
          
        </main>
    )
  );
}