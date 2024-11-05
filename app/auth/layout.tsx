"use client"
import Image from 'next/image';
import { ReactNode } from 'react'
import { usePathname } from 'next/navigation';
import Link from 'next/link';

const AuthLayout = ({ children }: { children: ReactNode; }) => {
    const pathname = usePathname();
    return (
        <section className='h-screen'>
            <div className=' grid md:grid-cols-12 h-full  '>
                <div className=' lg:col-span-5 md:col-span-6 bg-regular/50 '>
                    <div className=" relative pb-10 xl:pt-40  lg:pt-36 md:pt-32 pt-28 md:px-12 px-6 flex justify-center  items-center h-full ">
                        <Link className=" absolute top-[3%] left-[4%]" href='/'>
                            <Image className='  md:w-10/12 w-[60%]' src="/svgs/logo.svg" alt="Logo" width={200} height={80} />
                        </Link>

                        <div className=" w-full">
                            <h1 className='mb-3 lg:text-5xl text-4xl text-center  font-bold  -tracking-[2.5px]'><span className=' text-secondary font-light'>Esports</span> <span className=' text-primary'>ACADEMY</span> </h1>
                            <p className=' md:text-2xl text-xl font-light md:mb-10 mb-8 text-center'>
                                {pathname === '/auth/signup' ? 'Thank you for joining us. Please register by completing the information below' : 'Welcome Back, Please login to your account.'}
                            </p>
                            <div className=" sm:max-w-[380px] mx-auto">
                                {children}
                            </div>

                        </div>
                    </div>

                </div>
                <div className=' relative lg:col-span-7 md:col-span-6  h-full md:pb-0 pb-[80%]'>
                    <Image className=' object-cover' fill src='/images/auth-img.png' alt='User wearing headphones and cheering on his winning' />
                </div>
            </div>
        </section>
    )
}

export default AuthLayout