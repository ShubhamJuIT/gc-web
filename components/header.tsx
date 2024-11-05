'use client'
import Link from "next/link";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import MobileMenu from "./mobile-menu";
import Image from "next/image";
import { useUserContext } from "@/app/contexts/userContext";

import Submenu from "./submenu";
import MenusHandler from "@/app/data/_helpers/menus-handler";




const Header = () => {
    const { userData } = useUserContext();
    const pathName = usePathname();
    const [addNavBorder, setAddNavBorder] = useState<boolean>(false);



    const changeBackground = () => {
        if (window.scrollY >= 50) {
            setAddNavBorder(true);
        } else {
            setAddNavBorder(false);
        }
    };

    useEffect(() => {
        changeBackground();
    }, [])

    useEffect(() => {

        window.addEventListener('scroll', changeBackground);

        return () => {
            window.removeEventListener('scroll', changeBackground);
        };
    }, []);




    return (
        <header className={`fixed  border-b  top-0 left-0 w-full  z-50   ${addNavBorder
            ? " border-regular  transition-all duration-150  bg-background"
            : "   border-transparent"
            }   `}>
            <div className=" py-6">
                <div className=" container">
                    <div className="hidden md:flex  items-center justify-between gap-5">
                        <nav className="flex items-center lg:gap-6 gap-3">
                            {MenusHandler.getCommonWebMenu()?.map((link, index) => {
                                return <Link key={index} className={`whitespace-nowrap  rounded-lg  lg:px-7 px-4 py-2  md:text-base text-sm  font-bold ${pathName === link?.path ? 'bg-primary text-primary-foreground hover:bg-primary/90 ' : 'bg-transparent hover:bg-transparent hover:text-primary text-primary'}`} href={link?.path}>
                                    {link?.label}
                                </Link>
                            })}
                        </nav>
                        {userData ?
                            <Submenu />
                            :
                            <div className=" hidden md:flex items-center gap-3">
                                <Link href="/auth/login">
                                    <Button>Login</Button>
                                </Link>
                                <Link href="/auth/signup">
                                    <Button variant='outline'>Sign Up</Button>
                                </Link>

                            </div>

                        }



                    </div>


                    <div className=" md:hidden  flex justify-between items-center">

                        <Link href='/'>
                            <Image className='w-1/2' src="/svgs/logo.svg" alt="Logo" width={200} height={80} />
                        </Link>

                        <MobileMenu logoRedirectTo="/" >
                            <button id="mobile-menu-button" aria-label="Mobile Menu Button" className=" text-primary  bg-primary/15 p-1 rounded-lg  font-bold">
                                <i className=" text-3xl icon-hamburger"></i>

                            </button>
                        </MobileMenu>

                    </div>


                </div>
            </div>

        </header>
    )
}

export default Header;