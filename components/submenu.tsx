"use client"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import DynamicImage from "./dynamicImage"
import { useEffect, useState } from "react";
import { NavItemModel } from "@/app/data/_models/nav.item.model";
import Image from "next/image";
import Link from "next/link";
import { useUserContext } from "@/app/contexts/userContext";
import MenusHandler from "@/app/data/_helpers/menus-handler";
import { usePathname } from "next/navigation";

const Submenu = () => {
    const pathName = usePathname();
    const { userData, logoutHandler } = useUserContext();
    const [submenuOpen, setSubmenuOpen] = useState(false);

    const [dropdownMenu, setDropdownMenu] = useState<NavItemModel[]>([]);

    const onClickLogout = () => {
        logoutHandler();
        setSubmenuOpen(false);
    }

    useEffect(() => {
        if (userData?.accountType) {

            setDropdownMenu(MenusHandler.getSubMenu(userData?.accountType, pathName));

        }
    }, [pathName, userData?.accountType])
    return (
        <DropdownMenu onOpenChange={(val: boolean) => setSubmenuOpen(val)} open={submenuOpen} >
            <DropdownMenuTrigger>
                <div className=' w-[40px] h-[40px] flex-none  rounded-full overflow-hidden border   border-gray-100/20 bg-regular'>
                    <DynamicImage
                        alt='User Image'
                        src={userData?.profileImage ?? '/svgs/user.svg'}
                        fallbackImage='/svgs/user.svg'
                    />

                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className=" min-w-40">


                {dropdownMenu?.map((link, index) => {
                    return <DropdownMenuItem onClick={() => setSubmenuOpen(false)} key={index}>
                        <Link href={link?.path}>
                            {link?.label}
                        </Link>
                    </DropdownMenuItem>
                })}
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <button onClick={onClickLogout} className='  text-secondary  flex items-center gap-2  '>
                        <Image src='/svgs/logout.svg' alt='logout' width={20} height={20} />
                        Sign Out
                    </button>
                </DropdownMenuItem>


            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default Submenu