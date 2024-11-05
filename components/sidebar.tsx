"use client"
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ScrollArea } from './ui/scroll-area';

import { useUserContext } from '@/app/contexts/userContext';
import MenusHandler from '@/app/data/_helpers/menus-handler';



const Sidebar = (

) => {
    const pathname = usePathname();
    const { logoutHandler } = useUserContext()

    return (
        <aside
            className={`-translate-x-full bg-background border-r text-base   border-gray-100/20 md:translate-x-0 fixed z-50 inset-y-0 left-0 min-w-64  shadow-md transition-transform transform md:static md:inset-auto md:shadow-none `}
        >


            <div className="flex flex-col h-full">
                <Link className=' flex-none mb-3' href='/admin/dashboard'>
                    <Image className=' w-3/5 mx-auto py-5' src="/svgs/logo.svg" alt="Logo" width={200} height={80} />
                </Link>
                <ScrollArea className=' flex-1'>
                    <div >
                        <nav >
                            {MenusHandler.getSuperAdminMenu().map((link, i) => (
                                <Link key={i} href={link?.path} className={` border-l-2    block transition-all duration-300 px-4 py-2 
                                        ${pathname === link?.path ? `  border-primary text-primary  bg-primary/10` :
                                        "hover:border-primary border-transparent  hover:text-primary  hover:bg-primary/10"}`}>
                                    {link?.label}
                                </Link>
                            ))}

                        </nav>
                    </div>
                </ScrollArea>

                <div className="p-4">
                    <button onClick={logoutHandler} className=' text-secondary  flex items-center gap-2  '>
                        <Image src='/svgs/logout.svg' alt='logout' width={25} height={25} />
                        Sign Out
                    </button>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
