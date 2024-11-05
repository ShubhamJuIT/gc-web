'use client'
import { User } from '@/app/data/_models/user';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, } from 'react';
import { Interceptor } from '@/app/data/error.interceptor';
import { AccoutTypesEnum } from '@/app/data/_enums/account.types.enum';



export const RouteGuard = ({ children }: any) => {
    const pathname = usePathname();
    const router = useRouter();

    const user = User;

    useEffect(() => {
        user.init();
        Interceptor.init();
        const accountType = user?.accountType;
        const isLoggedIn = user.isLoggedIn();
        const privatePaths = ["/account", "/admin", "/my-courses", "/study-area", "/checkout", "/payment-status"];

        privatePaths.forEach((path) => {
            if (pathname.startsWith(path) && !isLoggedIn) {
                user.clear();
                router.push('/auth/login');
                return;
            }


        })

        if (pathname.startsWith('/auth') && isLoggedIn) {
            router.push('/');
            return;
        }



        if (accountType === AccoutTypesEnum.STUDENT && (pathname.startsWith('/admin') || pathname.startsWith('/my-courses'))) {
            router.push('/');
            return;
        }

        if (accountType === AccoutTypesEnum.MENTOR && pathname.startsWith('/admin')) {
            router.push('/');
            return;
        }

    }, [pathname, router, user])



    return <>{children}</>;
};