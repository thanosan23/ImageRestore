import React from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import Link from "next/link";
import Image from "next/image";


const Navbar = () => {

    const { user, error, isLoading } = useUser();
    return (
        <>
        <div className={"bg-gray-900"}>
                    {/* Navbar */}
                    <nav className={" w-[100%] flex flex-row justify-between items-center sticky bg-gray "}> 
                    {/* Logo */}
                    <div href="flex">
                        <Link href="/" className="align-top font-bold text-2xl px-1 md:px-16 text-slate-50">
                            <div className="flex flex-row gap-3 px-8">
                            <Image src="/logo.svg" alt="Logo" className={"align-top"} width={25} height={25}></Image>
                            ImageRestore
                            </div>
                        </Link>
                    </div>
                    {/* UL Elements*/}
                    <ul className={"flex items-center justify-center p-5 md:p-10 font-bold pr-4 "}> 
                    <div className={"gap-2 md:gap-10 flex flex-row pr-2 md:pr-5 text-slate-50"}>
                        <li><button className=" hover: text-slate-50 font-thin rounded hover:transform hover:-translate-y-1 hover: transition duration-300 "><Link href="/">Home</Link></button></li>
                        <li><button id="page1" className="hover: text-slate-50 font-thin rounded hover:transform hover:-translate-y-1 hover: transition duration-300 "><Link href="/pricing">Pricing</Link></button></li>
                        { user && (
                            <li><button id="page1" className="hover: text-slate-50 font-thin rounded hover:transform hover:-translate-y-1 hover: transition duration-300 "><Link href="/account">Account</Link></button> </li>
                        )}
                        <li><button id="page1" className="hover: text-slate-50 font-thin rounded hover:transform hover:-translate-y-1 hover: transition duration-300 "><Link href="/contact">Contact</Link></button></li>
                        {user && (
                            <li><Link href="/api/auth/logout"><button id="page1" className=" bg-slate-50 pl-5 pr-5 px-4 py-1 translate-x-5 font-bold hover: text-black rounded hover:transform hover:-translate-y-1 hover: transition duration-300 "><span className={"text-sm"}>Logout</span></button></Link></li>  
                        )}
                        {!user && (
                            <li><Link href="/api/auth/login"><button id="page1" className=" bg-slate-50 pl-5 pr-5 px-4 py-1 translate-x-5 font-bold hover: text-black rounded hover:transform hover:-translate-y-1 hover: transition duration-300 "><span className={"text-sm"}>Login</span></button></Link></li>  
                        )}
                    </div>
                    </ul>
                </nav>
        </div>
        </>
    );
}

export default Navbar;