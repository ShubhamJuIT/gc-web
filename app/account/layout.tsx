'use client'
import Link from 'next/link';
import React, { ReactNode, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { useUserContext } from '../contexts/userContext';
import { NavItemModel } from '../data/_models/nav.item.model';
import MenusHandler from '../data/_helpers/menus-handler';
import SimpleLoader from '@/components/simple-loader';
import { User } from '../data/_models/user';
import { AccoutTypesEnum } from '../data/_enums/account.types.enum';





const AccountLayout = ({ children }: {
    children: ReactNode;
}) => {
    const { logoutHandler, } = useUserContext();
    const [navList, setNavList] = useState<NavItemModel[]>([]);
    const pathname = usePathname();

    useEffect(() => {
        if (User?.isLoggedIn() && User?.accountType) {
            setNavList(MenusHandler.getAccountMenu(User?.accountType as AccoutTypesEnum));
        }
    }, []);
    return (
        <section className="lg:mb-20 md:mb-16 sm:mb-14 mb-12" >
            <div className="container">
                <div className='md:pt-32  pt-28  '>
                    <div className="grid md:grid-cols-12 lg:gap-16 md:gap-12 gap-7 ">
                        <div className=' md:col-span-4   lg:text-2xl text-xl font-light  '>
                            <ul className="   flex flex-col  lg:gap-7 md:gap-5 gap-4 bg-regular/50 rounded-2xl  lg:p-9 md:p-8 p-7  ">
                                {navList.map((link) => (
                                    <li key={link.path}>
                                        <Link
                                            href={link.path}
                                            className={`${pathname === link.path ? ' text-primary font-semibold' : ''}   flex justify-between items-center  hover:text-primary    transition-all`}
                                        >

                                            <span className="flex items-center gap-2">
                                                {link.label}
                                            </span>
                                        </Link>
                                    </li>
                                ))}

                            </ul>
                            <div className='lg:pl-9 md:pl-8 pl-7 pt-6'>
                                <button onClick={logoutHandler} className=' text-secondary  flex items-center gap-2  '>
                                    <Image src='/svgs/logout.svg' alt='logout' width={25} height={25} />
                                    Sign Out
                                </button>
                            </div>

                        </div>

                        <div className="md:col-span-8">
                            {children}
                        </div>
                    </div>
                </div >

            </div >
        </section >
    );
};

export default AccountLayout;
