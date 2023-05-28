import React, { useEffect } from "react";

import { Uploader } from "uploader"; 
import { UploadDropzone } from "react-uploader";

import { useState } from "react"; 

import Typewriter from 'typewriter-effect';

import Image from "next/image";
import Link from "next/link";

import { ColorRing } from "react-loader-spinner";

import Navbar from "./navbar";

import { useUser } from "@auth0/nextjs-auth0/client";

import { ImgComparisonSlider } from '@img-comparison-slider/react';

import { saveAs } from "file-saver";

import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';



const uploader = Uploader({
    apiKey: "free"
});



const Main = ({users}) => {
    const options = { 
        maxFileCount: 1,
        mimeTypes: ["image/jpeg", "image/png", "image/jpg"],
        editor: { images: { crop: false } },
        styles: { colors: { } }
     };

    const [ originalPhoto, setOriginalPhoto ] = useState(null);
    const [ loading, setLoading ] = useState(true);
    const [ restoredPhoto, setRestoredPhoto ] = useState(null);

    const user = useUser();

    const [userInfo, setUserInfo] = useState(null);
    const [addedUser, setAddedUser] = useState(false);


    const [open, setOpen] = useState(false);

    const addUser = async (email) => {
        if(process.env.DEPLOYMENT == 'Debug') {
            await fetch("http://localhost:3000/api/addUser", {
                method: "POST",
                body: JSON.stringify({ email : email }),
                headers: {
                    Accept: "application/json, text/plain, */*",
                    "Content-Type": "application/json",
                },
            });
        } else {
            await fetch("https://image-restore-sand.vercel.app/api/addUser", {
                method: "POST",
                body: JSON.stringify({ email : email }),
                headers: {
                    Accept: "application/json, text/plain, */*",
                    "Content-Type": "application/json",
                },
            });
        }
    }

    const getUserInfo = async (email) => {
        let response = null;
        if(process.env.DEPLOYMENT == 'Debug') {
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
        if(!addedUser) {
            if(userData != undefined) {
                email = JSON.parse(userData).email;
                if(users != null && users != undefined && !users.includes(email)) {
                    addUser(email);
                    setAddedUser(true);
                    getUserInfo(email);
                } else {
                    getUserInfo(email);
                }
            } 
        }
    }, [])

    const Uploader = () => (
        <UploadDropzone
            uploader={uploader}
            options={options}
            onUpdate={async (file) => {
                if (file.length !== 0) {


                    let userInfo = await fetch("/api/getUserInfo", {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ email : user.user.email }),
                    });

                    userInfo = await userInfo.json();

                    if(
                        (userInfo.subscription == -1 && userInfo.imagesRestored <= 5) || 
                        (userInfo.subscription == 1 && userInfo.imagesRestored <= 50) || 
                        (userInfo.subscription == 2 && userInfo.imagesRestore <= 200) || 
                        (userInfo.subscription == 3) 
                    ) {
                        setLoading(true);

                        let link = file[0].fileUrl.replace("raw", "thumbnail");
                        setOriginalPhoto(link);

                        await fetch("/api/editUserGenerated", {
                            method: "POST",
                            headers: {
                              "Content-Type": "application/json",
                            },
                            body: JSON.stringify({ email : user.user.email }),
                        })

                        const res = await fetch("/api/restore", {
                            method: "POST",
                            headers: {
                              "Content-Type": "application/json",
                            },
                            body: JSON.stringify({ url: link }),
                        });
                        let restoredPhoto = await res.json();
                        restoredPhoto = restoredPhoto["url"];
                        setRestoredPhoto(restoredPhoto);
                        
                        saveAs(restoredPhoto, restoredPhoto.substring(restoredPhoto.lastIndexOf('/') + 1));
    
                        setLoading(false);
                        
                    } else {
                        setOpen(true);
                    }
                    
                }
            }}
            width="624px"
            height="300px"  
        />
    );
      
    return (
        <>
            <main className="min-h-screen bg-gray-900">
            <div className={""}>
                <Navbar/>

            {user.user != undefined && (
                <div className={"flex flex-col justify-center text-center align-middle pt-10"}>
                
                    <h1 className={"font-bold text-4xl text-white"}>Image Restoration</h1>
                    <div className="flex justify-center text center align-middle p-1">
                        <h2 className={"text-lg p-2 text-white"}>
                            <Typewriter 
                                options={{
                                    strings: ['Restore your old memories', 'Unblur your images', 'Recover degraded images'],
                                    autoStart: true,
                                    loop: true,
                                }}
                            />
                        </h2>
                    </div>
                    <div className="hidden">
                        <Modal open={open} onClose={() => setOpen(false)} center>
                            <h2 className={"font-bold"}>Surpassed Limit</h2>
                            <p className={""}>.
                            Surpassed number of images! For more images, upgrade to a better subscription.
                            </p>
                        </Modal>
                    </div>
                    <div className={"flex justify-center py-10 pb-8"}>
                        <Uploader/>
                    </div>
                    {originalPhoto && (
                        <div className={"flex justify-center pb-8 flex-row"}>
                            <Image
                                src={originalPhoto}
                                width={248}
                                height={248}
                                className={"rounded-lg"}
                                alt="Original Photo"
                            />
                            {loading && (
                                <div className={"flex justify-center text-center items-center px-5"}>
                                    <ColorRing
                                        visible={true}
                                        height="80"
                                        width="80"
                                        ariaLabel="blocks-loading"
                                        wrapperStyle={{}}
                                        wrapperClass="blocks-wrapper"
                                        colors={['#fff', '#fff', '#fff', '#fff', '#fff']}
                                    />
                                </div>
                            )}
                            {restoredPhoto && (
                                <div className={"flex justify-center text-center items-center px-5"}>
                                    <Image
                                        src={restoredPhoto}
                                        width={248}
                                        height={248}
                                        className={"rounded-lg"}
                                        alt="Restored Photo"
                                    />
                                </div>
                            )}
                        </div>
                    )}
                </div>
            )}

            {user.user == undefined && (
                <div className={"flex flex-col justify-center text-center align-middle pt-10"}>
                
                    <h1 className={"font-bold text-4xl text-white"}>Image Restoration</h1>
                    <div className="flex flex-col justify-center text center items-center align-middle p-1">
                        <h2 className={"text-lg p-2 text-white text-1xl"}>
                            Effortless AI Image Restoration
                        </h2>
                        <div className={"flex justify-center p-5"}>
                            <Link href="/api/auth/signup"><button className={"bg-white px-5 py-2 rounded-2xl hover:-translate-y-1 transition-all font-bold"}>Sign Up To Get Started</button></Link>

                        </div>
                        <div className={"flex flex-col w-[75%] justify-center text-center items-center p-5"}>
                            <div>
                            <ImgComparisonSlider className={"rounded-2xl"}>
                                <img slot="first" src="/initialImage.png" />
                                <img slot="second" src="/finalImage.jpg" />
                            </ImgComparisonSlider>
                            </div>
                      
                        </div>

                    </div>
                </div>
            )}
            </div>
            <div className="flex flex-col justify-center text-center gap-2 break-word mt-10">
                <h2 className={"text-white font-bold text-3xl"}>How it works</h2>
                <p className={"text-gray-300 text-1xl"}>A Simple 2-Step Process to Restore Your Images</p>
                <div className={"flex flex-row justify-center align-center items-center text-left pt-5 gap-5"}>
                    <Image alt="upload image" src="/upload.png" width={400} height={400}></Image>
                    <div className="flex flex-col gap-2">
                    <div className={"bg-gray-300 w-[15%] rounded-lg py-2"}>
                        <p className={"font-bold text-center"}>1</p>
                    </div>
                    <h3 className={"text-white font-bold text-2xl"}>Input Your Image</h3>
                    <p className={"text-white"}>To get started, simply input the image.</p>
                    </div>
                </div>
                <div className="flex justify-center">
                    <Image alt="seperator image" src="/seperator.svg" width={400} height={400}></Image>
                </div>
                <div className={"flex flex-row justify-center align-center items-center text-left gap-5 pb-5"}>
                    <div className="flex flex-col gap-2">
                    <div className={"bg-gray-300 w-[15%] rounded-lg py-2"}>
                        <p className={"font-bold text-center"}>2</p>
                    </div>
                    <h3 className={"text-white font-bold text-2xl"}>Voila! A restored image!</h3>
                    <div>
                        <p className={"text-white break-words"}>Our AI tool has restored your image!</p>
                    </div>
                    </div>
                    <Image src="/endProduct.png" alt="end product" width={400} height={400}></Image>

                </div>
            </div>
            </main>
        </>
    )
}

export default Main;