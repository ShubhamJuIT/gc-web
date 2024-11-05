'use client'

import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTrigger,
} from "@/components/ui/sheet"
import Image from "next/image"
import Link from "next/link"
import React, { useEffect, useState } from "react"
import { Button } from "./ui/button"
import { usePathname } from "next/navigation"
import { useUserContext } from "@/app/contexts/userContext"
import { NavItemModel } from "@/app/data/_models/nav.item.model"
import MenusHandler from "@/app/data/_helpers/menus-handler"



const MobileMenu = (props: {
    children: React.ReactNode,
    logoRedirectTo: string
}) => {
    const [open, setOpen] = useState<boolean>(false);
    const [navList, setNavList] = useState<NavItemModel[]>([]);
    const { userData, logoutHandler } = useUserContext();
    const pathname = usePathname();

    const onClickLogout = () => {
        logoutHandler();
        setOpen(false);
    }
    useEffect(() => {
        if (userData?.accountType) {

            setNavList(MenusHandler.getMobileMenu(userData?.accountType, pathname))
        } else {
            setNavList(MenusHandler.getMobileMenu())
        }
    }, [pathname, userData?.accountType])
    return (
        <Sheet open={open} onOpenChange={setOpen} >
            <SheetTrigger asChild>
                {props?.children}
            </SheetTrigger>
            <SheetContent className=" px-0   border-gray-100/20" side='left'>
                <SheetHeader className=" border-b border-gray-100/20 ">
                    <Link className=" pl-4 pb-4" onClick={() => setOpen(false)} href={props?.logoRedirectTo}>
                        <Image className=' w-1/2  ' src="/svgs/logo.svg" alt="Logo" width={200} height={80} />
                    </Link>
                </SheetHeader>

                <div className=" text-lg font-medium my-4 ">


                    {navList?.map((link, i) => {
                        return <Link onClick={() => setOpen(false)} key={i} href={link?.path} className={` border-l-2    block transition-all duration-300 px-4 py-2 
                            ${pathname === link?.path ? `  border-primary text-primary  bg-primary/10` :
                                "hover:border-primary border-transparent  hover:text-primary  hover:bg-primary/10"}`}>
                            {link?.label}
                        </Link>
                    })}


                </div>
                <div >
                    {userData ?
                        <>
                            <button onClick={onClickLogout} className='pl-4  text-secondary  flex items-center gap-2  '>
                                <Image src='/svgs/logout.svg' alt='logout' width={25} height={25} />
                                Sign Out
                            </button>
                        </>
                        : <div className="px-4">
                            <Link href="/auth/login">

                                <Button onClick={() => setOpen(false)} className=" w-full mb-4" size='sm'>Login</Button>
                            </Link>
                            <Link href="/auth/signup">

                                <Button onClick={() => setOpen(false)} variant='outline' size='sm' className=" w-full ">Signup</Button>
                            </Link>
                        </div>}



                </div>


            </SheetContent>
        </Sheet>

    )
}

export default MobileMenu;